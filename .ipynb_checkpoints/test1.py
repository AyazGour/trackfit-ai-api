import cv2
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    return angle if angle <= 180 else 360 - angle

def get_landmark_coordinates(landmarks, landmark_name):
    return [landmarks[landmark_name.value].x, landmarks[landmark_name.value].y]

def biceps_workout():
    cap = cv2.VideoCapture(0)
    counter, stage = 0, None
    
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            frame = cv2.flip(frame, 1)  # Flip the image horizontally
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                
                # Left Arm
                left_shoulder = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER)
                left_elbow = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ELBOW)
                left_wrist = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_WRIST)
                left_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
                
                # Right Arm
                right_shoulder = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.RIGHT_SHOULDER)
                right_elbow = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.RIGHT_ELBOW)
                right_wrist = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.RIGHT_WRIST)
                right_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)
                
                # Visualize angles
                cv2.putText(image, str(int(left_angle)), tuple(np.multiply(left_elbow, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)
                cv2.putText(image, str(int(right_angle)), tuple(np.multiply(right_elbow, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)
                
                # Curl counter logic for left arm
                if left_angle > 160:
                    stage = "down"
                if left_angle < 30 and stage == 'down':
                    stage = "up"
                    counter += 1
                    print(f"Reps: {counter}")
                
                # Display counter on screen
                cv2.rectangle(image, (0, 0), (150, 50), (0, 0, 0), -1)
                cv2.putText(image, f'Reps: {counter}', (10, 35),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                     mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                     mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))
            
            cv2.imshow('Biceps Workout Tracker', image)
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    biceps_workout()
