// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-57b14.firebaseapp.com",
  projectId: "mern-auth-57b14",
  storageBucket: "mern-auth-57b14.appspot.com",
  messagingSenderId: "387359837253",
  appId: "1:387359837253:web:9582e8f909f389c677a72c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;