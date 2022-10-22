// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage'
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbQIzCBIKM9UH2xwH-uOYITjZppCAhrbE",
  authDomain: "museai-7da19.firebaseapp.com",
  projectId: "museai-7da19",
  storageBucket: "museai-7da19.appspot.com",
  messagingSenderId: "792426663423",
  appId: "1:792426663423:web:e2b1dcf08f7c2ef485ebca",
  measurementId: "G-4H57BJ3110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore};