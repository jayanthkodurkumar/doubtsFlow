// Import the functions you need from the SDKs you need
console.warn = function () {};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMj19fFzJ39idEQ-NNegJSXSA-_k84wM0",
  authDomain: "doubtsflow.firebaseapp.com",
  projectId: "doubtsflow",
  storageBucket: "doubtsflow.appspot.com",
  messagingSenderId: "1039216558637",
  appId: "1:1039216558637:web:34b1cbee47eadf1a97aea4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
