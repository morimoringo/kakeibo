import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqfJWHuoK2Fhs8AOfivHcvOGMVLrddW4",
  authDomain: "kakeibo-e9a91.firebaseapp.com",
  projectId: "kakeibo-e9a91",
  storageBucket: "kakeibo-e9a91.firebasestorage.app",
  messagingSenderId: "531535783564",
  appId: "1:531535783564:web:be72a420aab85b32e37da9",
  measurementId: "G-J2FEX9769L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const kakeiboRef = doc(db, "kakeibo", "main");

export async function backupToFirebase() {
  await setDoc(kakeiboRef, {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    recurringExpenses:
      JSON.parse(localStorage.getItem("recurringExpenses")) || [],
    backupDate: new Date().toISOString(),
  });
}

export async function restoreFromFirebase() {
  const snapshot = await getDoc(kakeiboRef);

  if (!snapshot.exists()) {
    throw new Error("Firebaseにバックアップがありません。");
  }

  return snapshot.data();
}
