// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuaAYKZ-tBaGmRrwqrCjXK5MQ2J7xSpQM",
  authDomain: "fir-auth-754b9.firebaseapp.com",
  projectId: "fir-auth-754b9",
  storageBucket: "fir-auth-754b9.appspot.com",
  messagingSenderId: "982453327557",
  appId: "1:982453327557:web:62e53019016fd2e3e442ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };
