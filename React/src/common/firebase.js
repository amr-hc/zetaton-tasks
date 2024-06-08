// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMjUE9iTi03ga83qyPwOjwui4cLRfe5Mg",
  authDomain: "images-project-s.firebaseapp.com",
  projectId: "images-project-s",
  storageBucket: "images-project-s.appspot.com",
  messagingSenderId: "88194397377",
  appId: "1:88194397377:web:6d2211087df78e1fe55040"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);