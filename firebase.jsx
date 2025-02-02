// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa6TE8sduluMNP7e-BG2dNxOJ4oOQuWYY",
  authDomain: "authentication-eac30.firebaseapp.com",
  projectId: "authentication-eac30",
  storageBucket: "authentication-eac30.firebasestorage.app",
  messagingSenderId: "504904496995",
  appId: "1:504904496995:web:a88f446f6fab87fb7bc556"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
