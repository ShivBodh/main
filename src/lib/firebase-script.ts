// This file is for use in server-side scripts ONLY.
// It uses the Firebase Client SDK to interact with Firebase services.
import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// This configuration is shared with the client.
// Ensure that your .env file has the necessary values.
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
let db: Firestore | undefined;

if (firebaseConfig.apiKey) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
} else {
    console.warn("Firebase API key is missing. Scraper cannot connect to Firestore.");
}

export { db };
