import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPsRXoFiLxqFuD2PnUxFaHjzANvCQqux0",
  authDomain: "club-ecommerce-1541c.firebaseapp.com",
  projectId: "club-ecommerce-1541c",
  storageBucket: "club-ecommerce-1541c.appspot.com",
  messagingSenderId: "123695890658",
  appId: "1:123695890658:web:8f7f748dc683eb295f5ebb",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
