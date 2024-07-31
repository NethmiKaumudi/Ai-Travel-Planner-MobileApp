// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWKaShZUn8taT1xeav1u2Sv6eP-kyGBsw",
  authDomain: "mobile-app-ai-travel-planner.firebaseapp.com",
  projectId: "mobile-app-ai-travel-planner",
  storageBucket: "mobile-app-ai-travel-planner.appspot.com",
  messagingSenderId: "841664431483",
  appId: "1:841664431483:web:80348056dddf9cc85f29de",
  measurementId: "G-89TV6QYWMR",
};

// Initialize Firebase

// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
