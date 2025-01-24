import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBrFfOELyuu51wSC1vfGqC4LULE9hhhJ5A",
    authDomain: "shrishesha4.firebaseapp.com",
    projectId: "shrishesha4",
    storageBucket: "shrishesha4.firebasestorage.app",
    messagingSenderId: "1066466188153",
    appId: "1:1066466188153:web:b88776360477c867adada8",
    measurementId: "G-3S6LVYBZRF"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);