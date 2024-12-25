import {getApps, initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {get, getDatabase, ref} from "firebase/database";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || "",
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig): getApps()[0];

// Export Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const db = getFirestore(app);

// Function to get japitems from Firebase Realtime Database
//export const getJapItemsFromFirebase = async () => {
//  try {
//    const japitemsRef = ref(database, 'japitems'); // 'japitems' 경로에서 데이터를 읽음
//    const snapshot = await get(japitemsRef);
//    if (snapshot.exists()) {
//      return snapshot.val(); // 데이터를 반환
//    } else {
//      return []; // 데이터가 없으면 빈 배열 반환
//    }
//  } catch (error) {
//    console.error('Error fetching japitems from Firebase:', error);
//    return []; // 에러 발생 시 빈 배열 반환
//  }
//};

export default async function getJapitemsFromFirebase(){
  wait(2000)
  try {
    const japitemsRef = ref(database, 'japitems'); // 'japitems' 경로에서 데이터를 읽음
    const snapshot = await get(japitemsRef);
    if (snapshot.exists()) {
      return snapshot.val(); // 데이터를 반환
    } else {
      return []; // 데이터가 없으면 빈 배열 반환
    }
  } catch (error) {
    console.error('Error fetching japitems from Firebase:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

function wait(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
