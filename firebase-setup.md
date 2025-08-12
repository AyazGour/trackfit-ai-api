# Firebase Setup Guide for TrackFit AI

## 📋 Prerequisites
- Node.js installed on your computer
- A Google account
- Firebase CLI installed globally: `npm install -g firebase-tools`

## 🔥 Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Create a project"**
3. **Project Details**:
   - Project name: `trackfit-ai`
   - Project ID: `trackfit-ai` (must be unique)
4. **Google Analytics**: Enable (recommended)
5. **Analytics account**: Choose existing or create new
6. **Click "Create project"**

## 🔐 Step 2: Set Up Authentication

1. **In Firebase Console** → **Authentication** → **Get started**
2. **Sign-in method** tab → **Enable these providers**:
   - ✅ **Email/Password**
   - ✅ **Google** (optional, for social login)
   - ✅ **Anonymous** (for guest users)

## 🗄️ Step 3: Set Up Firestore Database

1. **Firestore Database** → **Create database**
2. **Start in test mode** (we'll add security rules later)
3. **Choose location**: `us-central1` (or closest to your users)
4. **Click "Done"**

### Database Structure:
```
/users/{userId}
/workouts/{workoutId}
/nutrition/{nutritionId}
/nutrition-chats/{chatId}
/bmi-history/{bmiId}
/orders/{orderId}
/trainer-bookings/{bookingId}
/products/{productId}
/trainers/{trainerId}
/exercises/{exerciseId}
```

## 📁 Step 4: Set Up Firebase Storage

1. **Storage** → **Get started**
2. **Start in test mode**
3. **Choose location**: Same as Firestore
4. **Click "Done"**

### Storage Structure:
```
/profile-pictures/{userId}
/food-images/{userId}/{timestamp}
/exercise-images/{fileName}
/product-images/{fileName}
/trainer-images/{fileName}
/workout-media/{userId}/{fileName}
```

## 🌐 Step 5: Register Web App

1. **Project Overview** → **Add app** → **Web (</>)**
2. **App nickname**: `TrackFit AI Web`
3. **✅ Set up Firebase Hosting**
4. **Register app**
5. **Copy the Firebase config object**

### Your Firebase Config:
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

## 📦 Step 6: Install Dependencies

Run in your project directory:
```bash
npm init -y
npm install firebase
npm install -g firebase-tools
```

## ⚙️ Step 7: Configure Firebase in Your Project

1. **Update `firebase-config.js`** with your actual config
2. **Login to Firebase CLI**: `firebase login`
3. **Initialize Firebase**: `firebase init`
   - Choose: Firestore, Storage, Hosting
   - Select your project: `trackfit-ai`
   - Firestore rules: `firestore.rules`
   - Storage rules: `storage.rules`
   - Public directory: `.` (current directory)

## 🔒 Step 8: Deploy Security Rules

1. **Upload Firestore rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Upload Storage rules**:
   ```bash
   firebase deploy --only storage
   ```

## 🚀 Step 9: Deploy Your App

```bash
firebase deploy --only hosting
```

## 📊 Step 10: Set Up Analytics (Optional)

1. **Analytics** → **Dashboard**
2. **Enable Google Analytics**
3. **Configure events** for user interactions

## 🔧 Step 11: Environment Variables

Create `.env` file:
```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=trackfit-ai.firebaseapp.com
FIREBASE_PROJECT_ID=trackfit-ai
FIREBASE_STORAGE_BUCKET=trackfit-ai.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 🎯 Step 12: Test Your Setup

1. **Open your app**
2. **Try registering a new user**
3. **Check Firestore** → Users collection should have new document
4. **Try uploading an image**
5. **Check Storage** → Should see uploaded files

## 📱 Step 13: Enable PWA Features

1. **Add to manifest.json**:
   ```json
   {
     "gcm_sender_id": "103953800507"
   }
   ```

2. **Enable FCM** (Firebase Cloud Messaging) for push notifications

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS errors**: Enable web origins in Firebase Console
2. **Permission denied**: Check Firestore security rules
3. **Storage upload fails**: Verify storage rules and file size limits
4. **Auth not working**: Check API key and auth domain

### Debugging:
- Use Firebase Console → **Usage** tab to monitor API calls
- Check browser console for detailed error messages
- Use Firebase Emulator Suite for local testing

## 🔄 Development vs Production

### Development:
- Use Firebase Emulators for local testing
- Test mode for Firestore and Storage rules

### Production:
- Implement proper security rules
- Enable monitoring and alerts
- Set up backup strategies

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Security](https://firebase.google.com/docs/storage/security)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

## ✅ Next Steps

1. Populate products and trainers data
2. Implement real-time updates
3. Add push notifications
4. Set up analytics tracking
5. Implement offline capabilities 