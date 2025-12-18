// assets/js/firebase/auth.js
import { auth, db } from './config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- 1. ĐĂNG KÝ ---
export async function registerUser(name, email, password) {
    try {
        // Tạo user trên Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Cập nhật tên hiển thị ngay lập tức
        await updateProfile(user, { displayName: name });

        // Lưu thêm thông tin vào Firestore (để sau này làm tính năng User Profile)
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            role: 'member'
        });

        return { success: true, user };
    } catch (error) {
        let msg = error.message;
        if(error.code === 'auth/email-already-in-use') msg = "Email này đã được sử dụng!";
        if(error.code === 'auth/weak-password') msg = "Mật khẩu quá yếu (cần 6 ký tự trở lên).";
        return { success: false, message: msg };
    }
}

// --- 2. ĐĂNG NHẬP ---
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: "Sai email hoặc mật khẩu!" };
    }
}

// --- 3. ĐĂNG XUẤT ---
export async function logoutUser() {
    try {
        await signOut(auth);
        // Sau khi logout, tải lại trang để Navbar cập nhật lại
        window.location.reload(); 
    } catch (error) {
        console.error(error);
    }
}