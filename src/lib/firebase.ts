import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// const firebaseConfig = {
//     apiKey: "AIzaSyApj890wQHiuaYg8Ji9z2hT0huV_rYs_c0",
//     authDomain: "sample-firebase-ai-app-b2f97.firebaseapp.com",
//     projectId: "sample-firebase-ai-app-b2f97",
//     storageBucket: "sample-firebase-ai-app-b2f97.firebasestorage.app",
//     messagingSenderId: "258182546371",
//     appId: "1:258182546371:web:52f726ebd814c9d066f376"
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
