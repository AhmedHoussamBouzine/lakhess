FROM python:3.10.12-slim
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt /app/
COPY . /app
RUN pip install -U --no-cache-dir -r requirements.txt
EXPOSE 5005
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host=0.0.0.0", "--port=5005"]
