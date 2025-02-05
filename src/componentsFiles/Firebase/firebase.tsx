import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FREBASE_AUTH_DMOMAIN,
  projectId: import.meta.env.VITE_APP_FREBASE_PTOJECTID,
  storageBucket: import.meta.env.VITE_APP_FREBASE_STORAGE_BUCKET,
  messagingSenderId: "790390897966",
  appId: "1:790390897966:web:d002f3c983d6fc00fc0ebf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)