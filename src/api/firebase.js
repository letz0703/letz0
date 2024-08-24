import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getFirestore} from "firebase/firestore";

//console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
//console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_DOMAIN);
//console.log("Database URL:", process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);
//console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECTID);
//console.log("Storage Bucket:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
//console.log("App ID:", process.env.NEXT_PUBLIC_FIREBASE_APPID);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const db = getFirestore(app);
