
// Import các thư viện từ CDN (Không cần cài đặt gì cả)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ QUAN TRỌNG: Bạn phải thay thế các dòng bên dưới bằng thông tin của bạn
// Cách lấy: Vào Firebase Console -> Project Settings -> Kéo xuống dưới cùng chọn Web App (</>)
const firebaseConfig = {
  apiKey: "AIzaSyCJ7mbwYLGEBp6_v32aTftiGMFzhXqINVI",
  authDomain: "noobdev-ebc39.firebaseapp.com",
  projectId: "noobdev-ebc39",
  storageBucket: "noobdev-ebc39.firebasestorage.app",
  messagingSenderId: "644450051412",
  appId: "1:644450051412:web:033d538dbe0c6d17c4d4c1",
  measurementId: "G-4B8FQ4B3FB"
};

// Khởi tạo kết nối 1 lần duy nhất
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase đã được kết nối!");

export { auth, db };