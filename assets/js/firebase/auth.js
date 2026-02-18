// assets/js/firebase/auth.js
import { auth, db } from './config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification // <--- MỚI: Import hàm xác thực email
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- 1. ĐĂNG KÝ (EMAIL/PASS) ---
export async function registerUser(name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        
        // Gửi email xác thực ngay sau khi đăng ký
        await sendEmailVerification(user);
        
        await saveUserToFirestore(user, name);
        return { success: true, user };
    } catch (error) {
        return { success: false, message: getErrorMessage(error.code) };
    }
}

// --- 2. ĐĂNG NHẬP (EMAIL/PASS) ---
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: getErrorMessage(error.code) };
    }
}

// --- 3. ĐĂNG NHẬP / ĐĂNG KÝ SOCIAL ---
export async function loginWithSocial(providerName) {
    let provider;
    switch(providerName) {
        case 'google':
            provider = new GoogleAuthProvider();
            break;
        case 'facebook':
            provider = new FacebookAuthProvider();
            break;
        case 'github':
            provider = new GithubAuthProvider();
            break;
        default:
            return { success: false, message: "Nhà cung cấp không hỗ trợ." };
    }

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
            await saveUserToFirestore(user, user.displayName || "No Name");
        }

        return { success: true, user: user };
    } catch (error) {
        console.error("Social Error:", error);
        return { success: false, message: getErrorMessage(error.code) };
    }
}

export async function signUpWithSocial(providerName) {
    return await loginWithSocial(providerName);
}

// --- 4. ĐĂNG XUẤT ---
export async function logoutUser() {
    try {
        await signOut(auth);
        window.location.reload(); 
    } catch (error) {
        console.error(error);
    }
}

// --- 5. KHÔI PHỤC MẬT KHẨU (MỚI) ---
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Link đặt lại mật khẩu đã được gửi tới email của bạn. Hãy kiểm tra hộp thư (cả mục Spam)." };
    } catch (error) {
        return { success: false, message: getErrorMessage(error.code) };
    }
}

// --- HELPER: LƯU FIRESTORE ---
async function saveUserToFirestore(user, name) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: user.email,
            photoURL: user.photoURL || "",
            createdAt: new Date().toISOString(),
            role: 'member',
            wpm_best: 0,
            matches_played: 0
        });
    } catch (e) {
        console.error("Lỗi lưu Firestore:", e);
    }
}

// --- HELPER: BÁO LỖI TIẾNG VIỆT ---
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/operation-not-allowed':
            return "Lỗi cấu hình: Chưa bật nhà cung cấp này trong Firebase Console.";
        case 'auth/unauthorized-domain':
            return "Lỗi tên miền: Domain chưa được thêm vào Firebase Console.";
        case 'auth/account-exists-with-different-credential':
            return "Email này đã được dùng cho Google/Facebook. Hãy đăng nhập bằng tài khoản đó.";
        case 'auth/popup-closed-by-user':
            return "Bạn đã đóng cửa sổ đăng nhập.";
        case 'auth/cancelled-popup-request':
            return "Yêu cầu bị hủy do mở nhiều cửa sổ.";
        case 'auth/user-disabled': return "Tài khoản đã bị khóa.";
        case 'auth/user-not-found': return "Email này chưa được đăng ký.";
        case 'auth/wrong-password': return "Sai mật khẩu.";
        case 'auth/invalid-credential': return "Thông tin xác thực không hợp lệ.";
        case 'auth/email-already-in-use': return "Email đã được sử dụng.";
        case 'auth/weak-password': return "Mật khẩu quá yếu.";
        case 'auth/missing-email': return "Vui lòng nhập email.";
        case 'auth/invalid-email': return "Email không hợp lệ.";
        
        default:
            return "Lỗi (" + errorCode + "): Vui lòng thử lại.";
    }
}