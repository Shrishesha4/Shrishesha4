import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shrishesha-n.firebaseapp.com",
  projectId: "shrishesha-n",
  storageBucket: "shrishesha-n.firebasestorage.app",
  messagingSenderId: "947201474466",
  appId: "1:947201474466:web:81e4d49ef5bd00c4047cfb",
  measurementId: "G-R4WJP4HS1D"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);