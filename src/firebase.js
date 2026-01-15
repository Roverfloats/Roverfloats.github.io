import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0bAcaNIqBe7GJ0wOeJ1Ae-f9_8ASO50g",
  authDomain: "private-project-61fcc.firebaseapp.com",
  projectId: "private-project-61fcc",
  storageBucket: "private-project-61fcc.firebasestorage.app",
  messagingSenderId: "1059875875459",
  appId: "1:1059875875459:web:9494aec88bbcff79e009b6",
  measurementId: "G-EJBERH389P"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
// Firebase exporteren
export const db = getFirestore(app);
// Timestamp exporteren
export { Timestamp };