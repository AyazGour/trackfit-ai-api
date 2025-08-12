# 🤖 AI Exercise Tracking Usage Guide

## 🚀 How to Use the AI Exercise Tracking System

### ✅ Prerequisites
1. **Python API Server Running**: Make sure your Python API server is running
   ```bash
   python exercise_tracker_api.py
   ```

2. **Web Application**: Open your TrackFit web application in a browser
3. **Camera Access**: Ensure your browser has camera permissions

### 📱 Step-by-Step Usage

#### 1. **Login to Your Account**
   - Create an account or login to save your AI workouts
   - The system requires authentication to save workout data

#### 2. **Navigate to Exercises Page**
   - Click on the "Exercises" tab in the navigation
   - You'll see the new "🤖 AI Exercise Tracking" section

#### 3. **Select Exercise Category**
   - Click on any exercise category card (Arms, Chest, Legs, etc.)
   - The selected card will be highlighted in blue
   - This determines which AI exercise tracking will be used

#### 4. **Enable AI Tracking**
   - Click the "Enable AI Tracking" button
   - Allow camera access when prompted
   - The camera feed will appear in the interface

#### 5. **Start AI Workout**
   - Click "Start AI Workout" to begin tracking
   - Position yourself in front of the camera
   - The system will automatically detect your pose and count reps

#### 6. **Perform Exercises**
   - **Biceps/Arms**: Perform bicep curls facing the camera
   - **Chest**: Perform push-ups (side view works best)
   - **Legs**: Perform squats facing the camera
   - Watch the real-time stats update:
     - **Reps**: Automatic rep counting
     - **Stage**: Current exercise stage (up/down)
     - **Angle**: Joint angle measurement

#### 7. **Monitor Progress**
   - Real-time rep counter
   - Celebration animation for completed reps
   - Stage indicator (up/down)
   - Angle measurement display

#### 8. **Save Your Workout**
   - Click "Save Workout" to store your session
   - Workout data is automatically saved to Firebase
   - Includes reps, duration, and calories burned

#### 9. **Reset or Stop**
   - **Reset Counter**: Clear current rep count
   - **Stop Tracking**: End the AI tracking session

### 🎯 Exercise Mapping

| Category Selected | AI Exercise | Best Camera Position |
|-------------------|-------------|---------------------|
| Arms, Biceps, Triceps | Biceps Curls | Front-facing |
| Chest, Back, Shoulders | Push-ups | Side view |
| Legs, Glutes, Abs, Calves | Squats | Front-facing |

### 💡 Tips for Best Results

#### 🎥 Camera Setup
- **Good lighting**: Face a light source
- **Clear background**: Avoid cluttered backgrounds
- **Stable position**: Keep camera steady
- **Full body in frame**: Make sure your whole body is visible

#### 🏋️ Exercise Performance
- **Controlled movements**: Avoid rushing
- **Full range of motion**: Complete each rep fully
- **Proper form**: Maintain good exercise form
- **Clear view**: Don't block your joints with clothing

#### 📊 Troubleshooting
- **No pose detected**: Check lighting and camera position
- **Inaccurate counting**: Ensure full range of motion
- **Slow response**: Reduce background movement
- **API errors**: Check if Python server is running

### 🎉 Features

#### ✨ Real-Time Tracking
- **Live rep counting**: Automatic exercise detection
- **Form analysis**: Joint angle measurement
- **Visual feedback**: Stage indicators and celebrations
- **Performance metrics**: Duration and calories

#### 💾 Data Storage
- **Firebase integration**: Automatic workout logging
- **Workout history**: Track progress over time
- **AI-marked sessions**: Distinguish AI vs manual workouts
- **Exercise statistics**: Detailed performance data

#### 📱 Mobile Friendly
- **Responsive design**: Works on all devices
- **Touch optimized**: Mobile-friendly interface
- **Haptic feedback**: Vibration on rep completion
- **Gesture controls**: Easy navigation

### 🔧 Advanced Usage

#### 🎮 Custom Exercise Categories
The system automatically maps your selected category to the most appropriate AI exercise:

```javascript
// Exercise mapping in the code
const exerciseMapping = {
    'arms': 'biceps',
    'chest': 'pushups', 
    'legs': 'squats'
};
```

#### 📈 Workout Analytics
AI workouts are marked with special flags:
- `aiTracked: true` in Firebase
- Automatic calorie calculations
- Duration tracking
- Rep accuracy metrics

#### 🔄 Integration with Existing Features
- **BMI Calculator**: Still available
- **Nutrition Chat**: Works alongside AI tracking
- **Store**: Purchase equipment for workouts
- **Trainer Booking**: Combine with professional guidance

### 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Camera not accessible" | Check browser permissions |
| "No pose detected" | Improve lighting, check positioning |
| "API connection failed" | Ensure Python server is running |
| "Inaccurate rep counting" | Perform full range of motion |
| "Slow performance" | Close other applications |

### 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure Python API server is running on port 5000
3. Verify camera permissions are granted
4. Try refreshing the page

---

**🎯 Ready to start your AI-powered fitness journey!**

The AI Exercise Tracking system transforms your regular workout into a high-tech fitness experience with real-time feedback, automatic logging, and precise rep counting. Perfect for home workouts, gym sessions, or anywhere you want accurate exercise tracking! 