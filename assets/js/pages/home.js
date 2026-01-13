/* assets/js/pages/home.js */
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tạo hiệu ứng sao (nếu chưa có trong main.js hoặc muốn custom riêng)
    // Nếu main.js đã gọi initStars() thì không cần gọi lại ở đây.
    
    // 2. Xử lý trạng thái nút bấm dựa trên đăng nhập
    handleHeroButton();
});

function handleHeroButton() {
    const btn = document.getElementById('heroCta');
    if (!btn) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in, updating CTA button...");
            btn.innerText = "Start Typing Now";
            btn.href = "pages/typing.html";
            // Xóa attribute translate để tránh bị ghi đè lại bởi file language.js
            btn.removeAttribute('data-translate');
        } else {
            // Trạng thái mặc định
            btn.innerText = "Start Learning Now";
            btn.href = "pages/login.html";
        }
    });
}