import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkPldYUcTQpEChh0sHGh-hWW6a15L7qWs",
  authDomain: "shepherd-391ea.firebaseapp.com",
  projectId: "shepherd-391ea",
  storageBucket: "shepherd-391ea.firebasestorage.app",
  messagingSenderId: "497384605559",
  appId: "1:497384605559:web:f2e7079a1876c779350372"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };