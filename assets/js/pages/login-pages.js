// assets/js/pages/login-pages.js
import { 
    loginUser, 
    registerUser, 
    loginWithSocial, 
    signUpWithSocial,
    resetPassword // <--- Import hàm này
} from '../firebase/auth.js';
import { translations } from '../data/translations.js';

document.addEventListener('DOMContentLoaded', () => {

    createStarsDirectly();
    const lang = localStorage.getItem('language') || 'en';
    applyLoginLanguage(lang);

    // ==========================================
    // 0. XỬ LÝ CHUYỂN TAB QUÊN MẬT KHẨU
    // ==========================================
    const forgotLink = document.getElementById('forgotPassLink');
    const backLink = document.getElementById('backToLoginLink');
    const loginForm = document.getElementById('loginForm');
    const resetForm = document.getElementById('resetForm');
    const authTabs = document.getElementById('authTabs');

    // Chuyển sang Reset Password
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            authTabs.style.display = 'none'; 
            resetForm.classList.add('active');
        });
    }

    // Quay lại Login
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetForm.classList.remove('active');
            authTabs.style.display = 'flex'; // Hiện lại tab
            loginForm.classList.add('active');
        });
    }

    // ==========================================
    // 1. XỬ LÝ RESET PASSWORD (MỚI)
    // ==========================================
    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInp = resetForm.querySelector('input[type="email"]');
            const btn = resetForm.querySelector('button');
            const originalText = btn.innerText;

            if (!emailInp.value) {
                alert("Vui lòng nhập email!");
                return;
            }

            btn.innerText = "Đang gửi...";
            btn.disabled = true;

            const result = await resetPassword(emailInp.value);

            alert(result.message);
            
            btn.innerText = originalText;
            btn.disabled = false;

            if (result.success) {
                // Thành công thì quay về trang Login cho user đăng nhập
                backLink.click();
            }
        });
    }

    // ==========================================
    // 2. XỬ LÝ FORM ĐĂNG NHẬP
    // ==========================================
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInp = loginForm.querySelector('input[type="email"]');
            const passInp = loginForm.querySelector('input[type="password"]');
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;

            if (!emailInp.value || !passInp.value) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            btn.innerText = "Đang kiểm tra...";
            btn.disabled = true;

            const result = await loginUser(emailInp.value, passInp.value);
            
            if (result.success) {
                localStorage.setItem('isLoggedIn', 'true'); 
                window.location.href = "index.html";
            } else {
                alert(result.message);
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // ==========================================
    // 3. XỬ LÝ FORM ĐĂNG KÝ
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

            if (!name || !email || !pass) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            btn.innerText = "Đang tạo...";
            btn.disabled = true;

            const result = await registerUser(name, email, pass);
            
            if (result.success) {
                alert("Tạo tài khoản thành công! Đang đăng nhập...");
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "index.html";
            } else {
                alert(result.message);
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // ==========================================
    // 4. XỬ LÝ SOCIAL BUTTONS
    // ==========================================
    setupSocialBtn('login-google', 'google', 'login');
    setupSocialBtn('login-fb', 'facebook', 'login');
    setupSocialBtn('login-github', 'github', 'login');
    setupSocialBtn('signup-google', 'google', 'signup');
    setupSocialBtn('signup-fb', 'facebook', 'signup');
    setupSocialBtn('signup-github', 'github', 'signup');
});

// Hàm gắn sự kiện chung
function setupSocialBtn(elementId, socialType, mode) {
    const btn = document.getElementById(elementId);
    if (!btn) return;

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalOpacity = btn.style.opacity || "1";
        btn.style.opacity = "0.5";
        btn.style.pointerEvents = "none";
        
        let result;
        if (mode === 'login') {
            result = await loginWithSocial(socialType);
        } else {
            result = await signUpWithSocial(socialType);
        }

        btn.style.opacity = originalOpacity;
        btn.style.pointerEvents = "auto";

        if (result.success) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "index.html";
        } else {
            alert(result.message);
        }
    });
}

function createStarsDirectly() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const container = document.getElementById('starsContainer');
    if(!container) return;
    container.innerHTML = '';
    for(let i=0; i<200; i++) {
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

function applyLoginLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Titles
    const titles = document.querySelectorAll('.form-title');
    if(titles[0]) titles[0].innerText = t.loginTitle;
    if(titles[1]) titles[1].innerText = t.signupTitle;

    // Placeholders
    document.querySelectorAll('input[type="email"]').forEach(i => i.placeholder = t.emailPlaceholder);
    document.querySelectorAll('input[type="password"]').forEach(i => i.placeholder = t.passPlaceholder);
    document.querySelectorAll('input[type="text"]').forEach(i => i.placeholder = t.namePlaceholder);

    // Buttons
    const loginBtn = document.querySelector('#loginForm button');
    if(loginBtn) loginBtn.innerText = t.btnLogin;
    
    const signupBtn = document.querySelector('#signupForm button');
    if(signupBtn) signupBtn.innerText = t.btnSignup;
    
    // Links
    const forgot = document.getElementById('forgotPassLink');
    if(forgot) forgot.innerText = t.forgotPass;
}