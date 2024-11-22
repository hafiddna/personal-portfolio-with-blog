// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApj890wQHiuaYg8Ji9z2hT0huV_rYs_c0",
    authDomain: "sample-firebase-ai-app-b2f97.firebaseapp.com",
    projectId: "sample-firebase-ai-app-b2f97",
    storageBucket: "sample-firebase-ai-app-b2f97.firebasestorage.app",
    messagingSenderId: "258182546371",
    appId: "1:258182546371:web:52f726ebd814c9d066f376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
