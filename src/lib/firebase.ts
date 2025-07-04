import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBGj2TGscv3kJgb0SC8ZS912ZtQ9pGIRcM",
  authDomain: "sdhan-suite.firebaseapp.com",
  projectId: "sdhan-suite",
  storageBucket: "sdhan-suite.appspot.com",
  messagingSenderId: "540744813374",
  appId: "1:540744813374:web:77568c9e9de991231efa6f",
  measurementId: "G-99T2Z8JEES"
};

// Initialize Firebase
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);

// Initialize analytics only on the client
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
      if (supported) {
          getAnalytics(app);
      }
  });
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
