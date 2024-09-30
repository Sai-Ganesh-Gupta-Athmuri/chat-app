import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT7wt3i6lr1tfU1B6NT3yQO6s9EOi7rJY",
  authDomain: "chat-app-gs-8c27a.firebaseapp.com",
  projectId: "chat-app-gs-8c27a",
  storageBucket: "chat-app-gs-8c27a.appspot.com",
  messagingSenderId: "198605775472",
  appId: "1:198605775472:web:50f2d312385e97a2ac8ab5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);