# TrackFit AI Exercise Tracking API

A Python Flask API for AI-powered exercise tracking using MediaPipe and OpenCV.

## Features

- 🏋️ **Biceps Curl Tracking**
- 🏃 **Squat Tracking** 
- 💪 **Pushup Tracking**
- 📊 **Real-time Rep Counting**
- 🎯 **Pose Detection**

## API Endpoints

- `GET /` - API status
- `POST /api/start-exercise` - Start tracking an exercise
- `POST /api/process-frame` - Process video frame
- `GET /api/get-stats` - Get current stats
- `POST /api/reset-counter` - Reset rep counter

## Deployment

This API is designed to be deployed on Render.com, Railway.app, or Google Cloud Run.

## Local Development

```bash
pip install -r requirements.txt
python app.py
```

## Usage

1. Start an exercise: `POST /api/start-exercise` with `{"exercise_type": "biceps"}`
2. Process frames: `POST /api/process-frame` with base64 image data
3. Get stats: `GET /api/get-stats`
4. Reset counter: `POST /api/reset-counter` 