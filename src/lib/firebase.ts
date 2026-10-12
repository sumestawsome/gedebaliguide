import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForPublicFirestoreAccess00",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "guidebali"}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "guidebali",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "guidebali"}.firebasestorage.app`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inisialisasi Firebase Client App secara singleton
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let db: Firestore;
try {
  db = getFirestore(app);
} catch {
  db = null as any;
}

let auth: Auth | null = null;
try {
  if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyDummyKeyForPublicFirestoreAccess00") {
    auth = getAuth(app);
  }
} catch {
  auth = null;
}

export { app, db, auth, firebaseConfig };
export default app;
