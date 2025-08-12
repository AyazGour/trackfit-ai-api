// Firebase Configuration for TrackFit AI
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVPuhe5rSc6Iud3cxEWBJwSaf7WJCRYHY",
  authDomain: "trackfit-ai-web.firebaseapp.com",
  projectId: "trackfit-ai-web",
  storageBucket: "trackfit-ai-web.firebasestorage.app",
  messagingSenderId: "896812555309",
  appId: "1:896812555309:web:f3101f9d910e9295ec2ca4",
  measurementId: "G-W6MC72KWW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// For development - connect to emulators (uncomment if using Firebase emulators)
/*
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
*/

export default app; 