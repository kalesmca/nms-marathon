// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDG7RUqxZT4w1d2VqSZ8eUAmKy-FETiE9o',
  authDomain: 'nms-marathon.firebaseapp.com',
  projectId: 'nms-marathon',
  storageBucket: 'nms-marathon.appspot.com',
  messagingSenderId: '358803937260',
  appId: '1:358803937260:web:2f24183c50703281d952c9',
  measurementId: 'G-LDMNJLK8KN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
