import {getApps, initializeApp} from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import {get, getDatabase, ref} from "firebase/database";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || ""
};
import {set} from "firebase/database";
import {v4 as uuid} from "uuid";
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

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

//function wait(duration) {
//  return new Promise(resolve => {
//    setTimeout(resolve, duration);
//  });
//}

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, user => {
    callback(user ?? null);
  });
}

export default async function getJapitemsFromFirebase() {
  //wait(2000)
  try {
    const japitemsRef = ref(database, "japitems"); // 'japitems' 경로에서 데이터를 읽음
    const snapshot = await get(japitemsRef);
    if (snapshot.exists()) {
      return snapshot.val(); // 데이터를 반환
    } else {
      return []; // 데이터가 없으면 빈 배열 반환
    }
  } catch (error) {
    console.error("Error fetching japitems from Firebase:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}
type Product = {
  title: string;
  price: string;
  options: string;
  [key: string]: any;
};
export async function addNewProduct(product: Product, image: string) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(",")
  });
}
