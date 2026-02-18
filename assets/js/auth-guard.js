import { auth } from './firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/**
 * Hàm bắt buộc đăng nhập.
 * Gọi hàm này ở đầu file JS của trang cần bảo vệ.
 */
export function requireAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Lưu lại trang hiện tại để redirect lại sau khi login (nếu cần)
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            // Chuyển hướng về trang đăng nhập (Giả sử file hiện tại ở /pages/ nên cần ../)
            window.location.href = '../login.html'; 
        }
    });
}