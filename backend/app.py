from flask import Flask,jsonify, request
from flask_cors import CORS  
import logging
import yt_dlp
from moviepy.editor import AudioFileClip
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

if not os.path.exists('uploads'):
    os.makedirs('uploads')


# URL of the YouTube video
url = "https://www.youtube.com/watch?v=ZXiruGOCn9s"

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
            
        
        return jsonify({'status': 'true'}), 200

    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)