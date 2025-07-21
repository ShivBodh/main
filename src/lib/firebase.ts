
import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// For the client-side, this is provided by the Next.js environment.
// For the server-side (in production), this is provided by apphosting.yaml.
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY;

// Your web app's Firebase configuration is provided by environment variables.
const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

// Initialize Firebase only if the API key and project ID are provided.
// This prevents errors in environments where the keys are not set, such as during the build process.
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    if (!getApps().length) {
        try {
            app = initializeApp(firebaseConfig);
        } catch (e) {
            console.error("Error initializing Firebase app:", e);
        }
    } else {
        app = getApp();
    }
    
    if (app) {
        auth = getAuth(app);
        db = getFirestore(app);
        googleProvider = new GoogleAuthProvider();
    }
    
} else {
    // This warning is helpful for developers during local development.
    console.warn("Firebase configuration is missing. Firebase features will be disabled.");
}

// Ensure auth and db are exported correctly, even if undefined.
const exportedAuth = auth;
const exportedDb = db;

export { app, exportedAuth as auth, googleProvider, exportedDb as db };
