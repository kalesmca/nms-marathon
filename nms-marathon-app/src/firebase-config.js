// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW1xPCeUwId8zxKDNkTNtO_nqgCscq8LU",
  authDomain: "nms-athletics.firebaseapp.com",
  projectId: "nms-athletics",
  storageBucket: "nms-athletics.appspot.com",
  messagingSenderId: "1071168315211",
  appId: "1:1071168315211:web:446b3e3477d234faa452ce",
  measurementId: "G-ZPPWHLS62W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
