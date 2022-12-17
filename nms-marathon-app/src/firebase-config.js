import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG7RUqxZT4w1d2VqSZ8eUAmKy-FETiE9o",
  authDomain: "nms-marathon.firebaseapp.com",
  projectId: "nms-marathon",
  storageBucket: "nms-marathon.appspot.com",
  messagingSenderId: "358803937260",
  appId: "1:358803937260:web:2f24183c50703281d952c9",
  measurementId: "G-LDMNJLK8KN"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
