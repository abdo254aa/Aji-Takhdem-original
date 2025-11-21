import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAlqZ7lTWOhl2ItE-FMAdHbIXIwXHF2j-o",
  authDomain: "aji-takhdem-463c8.firebaseapp.com",
  projectId: "aji-takhdem-463c8",
  storageBucket: "aji-takhdem-463c8.firebasestorage.app",
  messagingSenderId: "936054973254",
  appId: "1:936054973254:web:36a16afa88d703709b7b47",
  measurementId: "G-4GKGWXTM2Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);