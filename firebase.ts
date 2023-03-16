// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdOmp9HUSKmFU-bDN6b-ywEiskhPK3qGI",
  authDomain: "gpt-firebase-app.firebaseapp.com",
  projectId: "gpt-firebase-app",
  storageBucket: "gpt-firebase-app.appspot.com",
  messagingSenderId: "276295036845",
  appId: "1:276295036845:web:0704257f2c6e18a408bb24",
  measurementId: "G-P2WQZRC3X9"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
