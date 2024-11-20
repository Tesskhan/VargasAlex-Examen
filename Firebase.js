import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCSDKIqEWXfqQVnuHBL8r09knEA91HNfT4",
  authDomain: "to-do-list-app-97ecf.firebaseapp.com",
  projectId: "to-do-list-app-97ecf",
  storageBucket: "to-do-list-app-97ecf.firebasestorage.app",
  messagingSenderId: "11228058009",
  appId: "1:11228058009:web:a5e5bc7e07101b8f338308",
  measurementId: "G-FHB92DZSVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
