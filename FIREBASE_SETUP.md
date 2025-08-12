# 🔥 Firebase Setup for TrackFit AI

## Quick Setup Instructions

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Name: `trackfit-ai`
4. Enable Google Analytics
5. Click "Create project"

### 2. Enable Authentication
- Go to Authentication → Get started
- Enable: Email/Password, Google (optional), Anonymous

### 3. Create Firestore Database
- Go to Firestore Database → Create database
- Start in test mode
- Choose location: us-central1

### 4. Enable Storage
- Go to Storage → Get started
- Start in test mode
- Same location as Firestore

### 5. Register Web App
- Project Overview → Add app → Web
- App nickname: "TrackFit AI Web"
- Enable Firebase Hosting
- Copy the config object

### 6. Update Firebase Config
Replace the config in `firebase-config.js` with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "trackfit-ai.firebaseapp.com", 
  projectId: "trackfit-ai",
  storageBucket: "trackfit-ai.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### 7. Database Collections Structure
Your Firestore will have these collections:
- users/{userId}
- workouts/{workoutId}  
- nutrition/{nutritionId}
- orders/{orderId}
- trainer-bookings/{bookingId}
- products/{productId}
- trainers/{trainerId}

### 8. Storage Folders Structure
Your Storage will have these folders:
- profile-pictures/{userId}
- food-images/{userId}/{timestamp}
- product-images/{fileName}
- trainer-images/{fileName}

### 9. Deploy Security Rules
Use the provided `firestore.rules` and `storage.rules` files:
- Firebase Console → Firestore → Rules → Edit rules
- Copy content from firestore.rules
- Do the same for Storage rules

### 10. Test Your Setup
1. Register a new user in your app
2. Check if user appears in Firestore users collection
3. Try uploading a food image
4. Check if image appears in Storage

## Commands to Run

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (optional)
firebase init

# Install dependencies
npm install firebase

# Start local development
firebase serve
```

## Important Notes
- Keep your Firebase config secure
- Don't commit sensitive keys to git
- Use environment variables for production
- Monitor usage in Firebase Console
- Set up billing alerts

Your Firebase project is now ready for TrackFit AI! 🚀 