import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSiRPGsymzU7YjD73PFRv65x6vyHCIQqI",
  authDomain: "aethra-c6bbe.firebaseapp.com",
  projectId: "aethra-c6bbe",
  storageBucket: "aethra-c6bbe.firebasestorage.app",
  messagingSenderId: "617389030658",
  appId: "1:617389030658:web:fbfcbcd79f0c39a142561b",
  measurementId: "G-EM20TN7XTJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
