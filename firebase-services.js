// Firebase Services for TrackFit AI
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { auth, db, storage } from './firebase-config.js';

// Authentication Services
export class AuthService {
  // Register new user
  static async registerUser(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile
      await updateProfile(user, {
        displayName: userData.fullName
      });
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: userData.fullName,
        createdAt: serverTimestamp(),
        profile: {
          age: userData.age || null,
          gender: userData.gender || null,
          height: userData.height || null,
          weight: userData.weight || null,
          fitnessGoal: userData.fitnessGoal || 'general_fitness',
          activityLevel: userData.activityLevel || 'moderate'
        },
        settings: {
          notifications: true,
          units: 'metric',
          privacy: 'private'
        }
      });
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Login user
  static async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Logout user
  static async logoutUser() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Auth state listener
  static onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
}

// User Data Services
export class UserService {
  // Get user profile
  static async getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Update user profile
  static async updateUserProfile(uid, updates) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Upload profile picture
  static async uploadProfilePicture(uid, file) {
    try {
      const storageRef = ref(storage, `profile-pictures/${uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Update user profile with image URL
      await updateDoc(doc(db, 'users', uid), {
        profilePicture: downloadURL,
        updatedAt: serverTimestamp()
      });
      
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Workout Services
export class WorkoutService {
  // Save workout session
  static async saveWorkoutSession(uid, workoutData) {
    try {
      const workoutRef = await addDoc(collection(db, 'workouts'), {
        uid,
        category: workoutData.category,
        exercises: workoutData.exercises,
        duration: workoutData.duration,
        caloriesBurned: workoutData.caloriesBurned,
        difficulty: workoutData.difficulty,
        completedAt: serverTimestamp(),
        notes: workoutData.notes || ''
      });
      
      return { success: true, id: workoutRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get user workout history
  static async getWorkoutHistory(uid, limitCount = 10) {
    try {
      const q = query(
        collection(db, 'workouts'),
        where('uid', '==', uid),
        orderBy('completedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const workouts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: workouts };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get workout analytics
  static async getWorkoutAnalytics(uid) {
    try {
      const q = query(
        collection(db, 'workouts'),
        where('uid', '==', uid)
      );
      
      const querySnapshot = await getDocs(q);
      const workouts = querySnapshot.docs.map(doc => doc.data());
      
      // Calculate analytics
      const totalWorkouts = workouts.length;
      const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
      const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
      const avgDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;
      
      return {
        success: true,
        data: {
          totalWorkouts,
          totalDuration,
          totalCalories,
          avgDuration,
          workoutsThisWeek: workouts.filter(w => {
            const workoutDate = w.completedAt?.toDate();
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return workoutDate && workoutDate > weekAgo;
          }).length
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Nutrition Services
export class NutritionService {
  // Save food entry
  static async saveFoodEntry(uid, foodData) {
    try {
      const foodRef = await addDoc(collection(db, 'nutrition'), {
        uid,
        foodName: foodData.foodName,
        calories: foodData.calories,
        protein: foodData.protein,
        carbs: foodData.carbs,
        fat: foodData.fat,
        mealType: foodData.mealType, // breakfast, lunch, dinner, snack
        imageUrl: foodData.imageUrl || null,
        loggedAt: serverTimestamp(),
        date: foodData.date || new Date().toISOString().split('T')[0]
      });
      
      return { success: true, id: foodRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Upload food image for analysis
  static async uploadFoodImage(uid, file) {
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `food-images/${uid}/${timestamp}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get nutrition history
  static async getNutritionHistory(uid, date) {
    try {
      const q = query(
        collection(db, 'nutrition'),
        where('uid', '==', uid),
        where('date', '==', date),
        orderBy('loggedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: entries };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Save chat conversation
  static async saveChatMessage(uid, message, isBot = false) {
    try {
      const chatRef = await addDoc(collection(db, 'nutrition-chats'), {
        uid,
        message,
        isBot,
        timestamp: serverTimestamp()
      });
      
      return { success: true, id: chatRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Shopping Services
export class ShoppingService {
  // Save order
  static async createOrder(uid, orderData) {
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        uid,
        items: orderData.items,
        total: orderData.total,
        status: 'pending',
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        createdAt: serverTimestamp(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      });
      
      return { success: true, id: orderRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get user orders
  static async getUserOrders(uid) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: orders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Update order status
  static async updateOrderStatus(orderId, status) {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Trainer Services
export class TrainerService {
  // Book trainer session
  static async bookTrainerSession(uid, bookingData) {
    try {
      const bookingRef = await addDoc(collection(db, 'trainer-bookings'), {
        uid,
        trainerId: bookingData.trainerId,
        trainerName: bookingData.trainerName,
        sessionDate: bookingData.sessionDate,
        sessionTime: bookingData.sessionTime,
        duration: bookingData.duration,
        sessionType: bookingData.sessionType,
        price: bookingData.price,
        status: 'pending',
        notes: bookingData.notes || '',
        createdAt: serverTimestamp()
      });
      
      return { success: true, id: bookingRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get user trainer bookings
  static async getTrainerBookings(uid) {
    try {
      const q = query(
        collection(db, 'trainer-bookings'),
        where('uid', '==', uid),
        orderBy('sessionDate', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: bookings };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Analytics Services
export class AnalyticsService {
  // Save BMI calculation
  static async saveBMICalculation(uid, bmiData) {
    try {
      const bmiRef = await addDoc(collection(db, 'bmi-history'), {
        uid,
        height: bmiData.height,
        weight: bmiData.weight,
        bmi: bmiData.bmi,
        category: bmiData.category,
        calculatedAt: serverTimestamp()
      });
      
      return { success: true, id: bmiRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Get BMI history
  static async getBMIHistory(uid) {
    try {
      const q = query(
        collection(db, 'bmi-history'),
        where('uid', '==', uid),
        orderBy('calculatedAt', 'desc'),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const bmiHistory = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: bmiHistory };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Export all services
export {
  AuthService,
  UserService,
  WorkoutService,
  NutritionService,
  ShoppingService,
  TrainerService,
  AnalyticsService
}; 