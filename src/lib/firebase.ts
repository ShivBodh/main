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

const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY';

if (!isFirebaseConfigured) {
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.error("!!! FIREBASE IS NOT CONFIGURED! PLEASE ADD YOUR CREDENTIALS TO the .env FILE !!!");
  console.error("!!! You can find your credentials in your Firebase project settings.             !!!");
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  
  // Provide dummy objects to prevent the app from crashing.
  // Authentication will not work until you configure your credentials.
  const createDummyAuth = (): Auth => ({
    currentUser: null,
    onAuthStateChanged: (observer: any): Unsubscribe => {
      observer(null);
      return () => {}; // Return an empty unsubscribe function
    },
    signInWithPopup: () => Promise.reject(new Error("Firebase not configured. Please check your .env file.")),
    signOut: () => Promise.resolve(),
  } as unknown as Auth);

  app = getApps().length ? getApp() : ({ options: {} } as FirebaseApp);
  auth = createDummyAuth();

} else {
  // Initialize Firebase
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
}

export { app, auth, googleProvider, facebookProvider };
