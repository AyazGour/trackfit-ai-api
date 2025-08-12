from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import base64
import io
from PIL import Image
import os

app = Flask(__name__)

# Configure CORS properly for hosted environment
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://trackfit-ai-web.web.app",
            "https://trackfit-ai-web.firebaseapp.com", 
            "http://localhost:8000",
            "http://localhost:5000",
            "http://127.0.0.1:8000",
            "http://127.0.0.1:5000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Handle preflight OPTIONS requests - Flask-CORS will handle the headers automatically
@app.route('/api/start-exercise', methods=['OPTIONS'])
@app.route('/api/process-frame', methods=['OPTIONS'])
@app.route('/api/get-stats', methods=['OPTIONS'])
@app.route('/api/reset-counter', methods=['OPTIONS'])
def handle_options():
    return jsonify({'status': 'ok'})

# Initialize MediaPipe
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

class ExerciseTracker:
    def __init__(self):
        self.pose = mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.counter = 0
        self.stage = None
        self.current_exercise = None
    
    def calculate_angle(self, a, b, c):
        """Calculate angle between three points"""
        a, b, c = np.array(a), np.array(b), np.array(c)
        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)
        return angle if angle <= 180 else 360 - angle
    
    def get_landmark_coordinates(self, landmarks, landmark_name):
        """Get coordinates of a specific landmark"""
        return [landmarks[landmark_name.value].x, landmarks[landmark_name.value].y]
    
    def track_biceps_curl(self, landmarks):
        """Track biceps curl exercise"""
        # Get arm landmarks
        left_shoulder = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER)
        left_elbow = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ELBOW)
        left_wrist = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_WRIST)
        
        # Calculate angle
        angle = self.calculate_angle(left_shoulder, left_elbow, left_wrist)
        
        # Counter logic
        if angle > 160:
            self.stage = "down"
        if angle < 30 and self.stage == 'down':
            self.stage = "up"
            self.counter += 1
        
        return {
            'angle': round(angle, 2),
            'stage': self.stage,
            'reps': self.counter
        }
    
    def track_squats(self, landmarks):
        """Track squats exercise"""
        # Get leg landmarks
        left_hip = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_HIP)
        left_knee = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_KNEE)
        left_ankle = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ANKLE)
        
        # Calculate knee angle
        angle = self.calculate_angle(left_hip, left_knee, left_ankle)
        
        # Counter logic
        if angle > 160:
            self.stage = "up"
        if angle < 110 and self.stage == 'up':
            self.stage = "down"
            self.counter += 1
        
        return {
            'angle': round(angle, 2),
            'stage': self.stage,
            'reps': self.counter
        }
    
    def track_pushups(self, landmarks):
        """Track pushups exercise"""
        # Get arm landmarks
        left_shoulder = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER)
        left_elbow = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ELBOW)
        left_wrist = self.get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_WRIST)
        
        # Calculate angle
        angle = self.calculate_angle(left_shoulder, left_elbow, left_wrist)
        
        # Counter logic for pushups (opposite of curls)
        if angle > 160:
            self.stage = "up"
        if angle < 90 and self.stage == 'up':
            self.stage = "down"
            self.counter += 1
        
        return {
            'angle': round(angle, 2),
            'stage': self.stage,
            'reps': self.counter
        }

# Global tracker instance
tracker = ExerciseTracker()

@app.route('/')
def home():
    return jsonify({
        'message': 'TrackFit AI Exercise Tracking API',
        'status': 'running',
        'cors_enabled': True,
        'allowed_origins': [
            'https://trackfit-ai-web.web.app',
            'https://trackfit-ai-web.firebaseapp.com'
        ],
        'endpoints': [
            '/api/start-exercise',
            '/api/process-frame',
            '/api/get-stats',
            '/api/reset-counter',
            '/test-cors'
        ]
    })

@app.route('/test-cors')
def test_cors():
    """Test CORS endpoint"""
    return jsonify({
        'message': 'CORS test successful',
        'origin': request.headers.get('Origin', 'No origin header'),
        'cors_working': True
    })

@app.route('/api/start-exercise', methods=['POST'])
def start_exercise():
    """Start tracking a specific exercise"""
    data = request.json
    exercise_type = data.get('exercise_type')
    
    if exercise_type not in ['biceps', 'squats', 'pushups']:
        return jsonify({'error': 'Invalid exercise type'}), 400
    
    # Reset counter for new exercise
    tracker.counter = 0
    tracker.stage = None
    tracker.current_exercise = exercise_type
    
    return jsonify({
        'message': f'Started tracking {exercise_type}',
        'exercise_type': exercise_type
    })

@app.route('/api/process-frame', methods=['POST'])
def process_frame():
    """Process a video frame and return exercise data"""
    try:
        # Get base64 image data
        data = request.json
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        image = Image.open(io.BytesIO(image_bytes))
        frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Process with MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = tracker.pose.process(rgb_frame)
        
        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            
            # Track based on current exercise
            if tracker.current_exercise == 'biceps':
                exercise_data = tracker.track_biceps_curl(landmarks)
            elif tracker.current_exercise == 'squats':
                exercise_data = tracker.track_squats(landmarks)
            elif tracker.current_exercise == 'pushups':
                exercise_data = tracker.track_pushups(landmarks)
            else:
                return jsonify({'error': 'No exercise selected'}), 400
            
            return jsonify({
                'success': True,
                'exercise_type': tracker.current_exercise,
                'data': exercise_data,
                'pose_detected': True
            })
        else:
            return jsonify({
                'success': True,
                'exercise_type': tracker.current_exercise,
                'pose_detected': False,
                'message': 'No pose detected'
            })
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get-stats', methods=['GET'])
def get_stats():
    """Get current exercise stats"""
    return jsonify({
        'exercise_type': tracker.current_exercise,
        'total_reps': tracker.counter,
        'current_stage': tracker.stage
    })

@app.route('/api/reset-counter', methods=['POST'])
def reset_counter():
    """Reset the rep counter"""
    tracker.counter = 0
    tracker.stage = None
    
    return jsonify({
        'message': 'Counter reset',
        'reps': tracker.counter
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False) 