/* assets/js/pages/home.js */
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { translations } from '../data/translations.js';
import { renderNavbar } from '../components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tạo hiệu ứng sao (nếu chưa có trong main.js hoặc muốn custom riêng)
    // Nếu main.js đã gọi initStars() thì không cần gọi lại ở đây.
    
    // 2. Xử lý trạng thái nút bấm dựa trên đăng nhập
    handleHeroButton();
    
    // 3. Dịch giao diện
    renderNavbar(); // Sử dụng hàm chuẩn từ component
    
    const lang = localStorage.getItem('language') || 'en';
    applyHomeLanguage(lang);
});

function applyHomeLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Dịch Navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if(link.href.includes('index.html')) link.innerText = t.navHome;
        if(link.href.includes('about.html')) link.innerText = t.navAbout;
        if(link.href.includes('tips.html')) link.innerText = t.navTips;
        if(link.href.includes('FAQ.html')) link.innerText = t.navFAQ;
        if(link.href.includes('typing.html')) link.innerText = t.navTyping;
    });

    // Dịch Hero Section
    const heroTitle = document.querySelector('.hero h1');
    if(heroTitle) heroTitle.innerText = t.heroTitle;
    
    const heroSub = document.querySelector('.hero p');
    if(heroSub) heroSub.innerText = t.heroSubtitle;
    
    const heroBtn = document.getElementById('heroCta');
    if(heroBtn) heroBtn.innerText = t.heroCta;
}

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
            btn.href = "login.html";
        }
    });
}