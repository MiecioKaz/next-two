import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyDpN4Uq4CBaxvpamEiaVeGI4h8giPSSixc",
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "polpets.firebaseapp.com",
  projectId: "polpets",
  storageBucket: "polpets.appspot.com",
  messagingSenderId: "204751613159",
  // appId: "1:204751613159:web:fa2e5a3515dbc90f6b4642",
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
