from flask import Flask,jsonify, request , send_file
from flask_cors import CORS  
import logging
import yt_dlp
from moviepy.editor import AudioFileClip
import os
import whisper
from huggingface_hub import InferenceClient
import json
from graphviz import Digraph
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

if not os.path.exists('uploads'):
    os.makedirs('uploads')

def add_nodes_edges(dot, node, parent=None):
    """Recursively add nodes and edges to the graph."""
    if parent is None:
        # Add the main topic node
        dot.node(node['main_topic'], shape='ellipse', color='blue', style='filled', fillcolor='lightblue', fontsize='14')
    else:
        # Add key point node with summary
        key_node = f"{node['key']}\n({node['resume']})"
        dot.node(key_node, shape='box', style='filled', fillcolor='lightyellow', fontsize='10')
        dot.edge(parent, key_node)
        
    if 'key_points' in node:
        for key_point in node['key_points']:
            add_nodes_edges(dot, key_point, node['main_topic'])

# Function to transcribe audio to text using Whisper
def transcribe_audio_whisper(audio_file_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_file_path)
    return result["text"]



# Function to summarize text using LLaMA
def summarize_text_llama(text, model_name="meta-llama/Meta-Llama-3-8B-Instruct"):
    token = os.getenv('HF_TOKEN')
    if not token:
        raise ValueError("HF_TOKEN not found in environment variables")

    client = InferenceClient(model=model_name, token=token)
    prompt = (
        "Summarize the following text by identifying key points and providing a title and a brief resume for each key point in JSON format. "
        "Include a 'main_topic' field describing the main topic of the text. Exclude the original text from the output.\n"
        "Ensure that the output is strictly valid JSON with no additional text before or after the JSON object.\n"
        "Do not include any explanatory text or phrases like 'Here is the output in JSON format:'.\n "
        "Ensure the response is valid JSON that can be parsed directly.\n\n"
        "The JSON format should look like this:\n"
        '{\n  "main_topic": "Main Topic",\n  "key_points": [\n    {"key": "Key Point 1", "resume": "resume 1"},\n    {"key": "Key Point 2", "resume": "resume 2"},\n    ...\n  ]\n} '
        f"\n{text}"
    )
    
    response = client.text_generation(prompt=prompt, max_new_tokens=2000)
    
    return response



# Function to combine transcription and summarization
def process_audio_file(audio_file_path):
    # Transcribe audio to text
    transcript = transcribe_audio_whisper(audio_file_path)
    
    # Summarize the transcribed text
    summary_json = summarize_text_llama(transcript)

    lines = summary_json.split('\n')
    
    # Remove the first line and join the remaining lines
    new_paragraph = '\n'.join(lines[3:])
    print(new_paragraph)
    return new_paragraph



# Define the options for yt-dlp
ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': 'uploads/audio.%(ext)s',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
}

@app.route('/', methods=['POST'])
def get():
    try:
        data = request.get_json()
        
        link = data.get('link')
        
        if not link:
            return jsonify({'error': 'No link provided'}), 400
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link])

        audio_file_path = "uploads/audio.mp3"
        response = process_audio_file(audio_file_path)
        data = json.loads(response)
        # Create a new directed graph with a circular layout
        dot = Digraph()
        dot.attr(rankdir='LR', nodesep='0.5', ranksep='1.5')

        # Add the main topic node
        dot.node(data['main_topic'], shape='ellipse', color='blue', style='filled', fillcolor='lightblue', fontsize='14')

        # Add key points nodes
        for point in data['key_points']:
            key_node = f"{point['key']}\n({point['resume']})"
            dot.node(key_node, shape='box', style='filled', fillcolor='lightyellow', fontsize='10')
            dot.edge(data['main_topic'], key_node)

        # Add key points nodes
        for point in data['key_points']:
            key_node = f"{point['key']}\n({point['resume']})"
            dot.node(key_node, shape='box', style='filled', fillcolor='lightyellow', fontsize='10')
            dot.edge(data['main_topic'], key_node)

        # Render the graph to a file (e.g., PNG format)
        dot.render('mindmap1', format='png', cleanup=True)

        print("Mind map generated and saved as 'mindmap.png'.")

        
        return jsonify({'status': 'true'}), 200

    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)