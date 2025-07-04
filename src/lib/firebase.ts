import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Function to safely get the Firebase app instance.
function getFirebaseApp(): FirebaseApp | null {
  // Return null if the config is not provided, preventing initialization.
  if (!firebaseConfig.apiKey) {
    return null;
  }
  // Initialize the app if it hasn't been already.
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

// Function to safely get the Firebase auth instance.
function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

// Initialize analytics only on the client and if configured
if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  const app = getFirebaseApp();
  if (app) {
    isSupported().then(supported => {
        if (supported) {
            getAnalytics(app);
        }
    });
  }
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { getFirebaseAuth, googleProvider, facebookProvider };
