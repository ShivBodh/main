import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sdhan-suite.firebaseapp.com",
  projectId: "sdhan-suite",
  storageBucket: "sdhan-suite.appspot.com",
  messagingSenderId: "540744813374",
  appId: "1:540744813374:web:77568c9e9de991231efa6f",
  measurementId: "G-99T2Z8JEES"
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

// Initialize Firebase only if the API key is provided
if (firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // Initialize analytics only on the client
    if (typeof window !== 'undefined') {
      isSupported().then(supported => {
          if (supported && app) {
              getAnalytics(app);
          }
      });
    }
} else {
    // This warning is helpful for developers.
    console.warn("Firebase API key is not configured. Firebase features will be disabled. Please update your .env file with NEXT_PUBLIC_FIREBASE_API_KEY.");
}


const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
