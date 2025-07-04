import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, Auth, Unsubscribe } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Check if the required environment variables are set and not the placeholder values.
const isFirebaseConfigured = 
    firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
    firebaseConfig.authDomain && firebaseConfig.authDomain !== 'YOUR_PROJECT_ID.firebaseapp.com';

if (!isFirebaseConfigured) {
  // If Firebase is not configured, we provide dummy objects to prevent the app from crashing.
  // Authentication will not work, but the rest of the site will be functional.
  const createDummyAuth = (): Auth => ({
    currentUser: null,
    onAuthStateChanged: (observer: any): Unsubscribe => {
      observer(null);
      return () => {}; // Return an empty unsubscribe function
    },
    signInWithPopup: () => Promise.reject(new Error("Firebase is not configured. Please add your credentials to the .env file to enable authentication.")),
    signOut: () => Promise.resolve(),
  } as unknown as Auth);

  app = getApps().length ? getApp() : ({ options: {} } as FirebaseApp);
  auth = createDummyAuth();

} else {
  // Initialize Firebase only if it's configured and not already initialized.
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
}

export { app, auth, googleProvider, facebookProvider };
