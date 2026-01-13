// assets/js/pages/login-pages.js
import { 
    loginUser, 
    registerUser, 
    loginWithSocial, 
    signUpWithSocial 
} from '../firebase/auth.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- HIỆU ỨNG SAO NỀN (Giữ nguyên của bạn) ---
    createStarsDirectly();

    // ==========================================
    // 1. XỬ LÝ FORM ĐĂNG NHẬP (EMAIL/PASS)
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const pass = loginForm.querySelector('input[type="password"]').value;
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Checking...";
            btn.disabled = true;

            const result = await loginUser(email, pass);
            if (result.success) {
                window.location.href = "dashboard.html";
            } else {
                alert(result.message);
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // ==========================================
    // 2. XỬ LÝ FORM ĐĂNG KÝ (EMAIL/PASS)
    // ==========================================
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const inputs = signupForm.querySelectorAll('input');
            const name = inputs[0].value;
            const email = inputs[1].value;
            const pass = inputs[2].value;
            const btn = signupForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Creating...";
            btn.disabled = true;

            const result = await registerUser(name, email, pass);
            if (result.success) {
                alert("Tạo tài khoản thành công! Đang chuyển hướng...");
                window.location.href = "dashboard.html";
            } else {
                alert(result.message);
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // ==========================================
    // 3. XỬ LÝ SOCIAL BUTTONS (QUAN TRỌNG)
    // ==========================================

    // --- NHÓM LOGIN (Khắt khe) ---
    setupSocialBtn('login-google', 'google', 'login');
    setupSocialBtn('login-fb', 'facebook', 'login');
    setupSocialBtn('login-github', 'github', 'login');

    // --- NHÓM SIGNUP (Thoải mái) ---
    setupSocialBtn('signup-google', 'google', 'signup');
    setupSocialBtn('signup-fb', 'facebook', 'signup');
    setupSocialBtn('signup-github', 'github', 'signup');

});

// Hàm gắn sự kiện chung cho gọn code
function setupSocialBtn(elementId, socialType, mode) {
    const btn = document.getElementById(elementId);
    if (!btn) return; // Nếu không tìm thấy nút thì bỏ qua

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Hiệu ứng nút bấm (optional)
        btn.style.opacity = "0.5";
        
        let result;
        if (mode === 'login') {
            result = await loginWithSocial(socialType);
        } else {
            result = await signUpWithSocial(socialType);
        }

        btn.style.opacity = "1"; // Trả lại độ sáng

        if (result.success) {
            // Thành công -> Vào Dashboard
            if(result.message) alert(result.message);
            window.location.href = "dashboard.html";
        } else {
            // Thất bại -> Hiện lỗi
            alert("Lỗi: " + result.message);
        }
    });
}

// Hàm tạo sao (Copy lại để đảm bảo không mất background)
function createStarsDirectly() {
    const container = document.getElementById('starsContainer');
    if(!container) return;
    container.innerHTML = '';
    for(let i=0; i<600; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const s = Math.random() * 2 + 1;
        star.style.width = s + 'px'; star.style.height = s + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}