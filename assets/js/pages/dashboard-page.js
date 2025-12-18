/* --- FILE: assets/js/pages/dashboard-page.js --- */
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Theo dõi trạng thái đăng nhập
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // 1. Cập nhật lời chào
            const welcomeMsg = document.querySelector('.content h1');
            if (welcomeMsg) {
                welcomeMsg.innerText = `Welcome back, ${user.displayName}!`;
            }
            
            // 2. (Tùy chọn) Load thống kê cá nhân từ Firestore nếu cần
            // loadUserStats(user.uid); 

        } else {
            // Nếu chưa đăng nhập, đá về trang login
            window.location.href = "/login.html";
        }
    });
});