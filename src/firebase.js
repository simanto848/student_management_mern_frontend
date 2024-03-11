// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-7763f.firebaseapp.com",
  projectId: "ecommerce-7763f",
  storageBucket: "ecommerce-7763f.appspot.com",
  messagingSenderId: "62052492882",
  appId: "1:62052492882:web:a9738189f19f2e4482218b",
  measurementId: "G-5T0ZF3XY60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
