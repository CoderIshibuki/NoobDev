// assets/js/firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCJ7mbwYLGEBp6_v32aTftiGMFzhXqINVI",
  authDomain: "noobdev-ebc39.firebaseapp.com",
  projectId: "noobdev-ebc39",
  storageBucket: "noobdev-ebc39.firebasestorage.app",
  messagingSenderId: "644450051412",
  appId: "1:644450051412:web:033d538dbe0c6d17c4d4c1",
  measurementId: "G-4B8FQ4B3FB"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase Connected!");

export { auth, db };