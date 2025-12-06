/* --- LƯU TẠI: assets/js/script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initMobileMenu();
    initDropdowns(); // Xử lý menu user và ngôn ngữ
    initLanguage();
});

/* --- 1. XỬ LÝ MENU DROPDOWN (User & Language) --- */
function initDropdowns() {
    const userBtn = document.getElementById('userProfileNav');
    const langBtn = document.getElementById('languageBtn');
    
    // Menu User
    if (userBtn) {
        // Xóa sự kiện cũ (nếu có) để tránh trùng lặp
        const newBtn = userBtn.cloneNode(true);
        userBtn.parentNode.replaceChild(newBtn, userBtn);
        
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Đóng menu ngôn ngữ nếu đang mở
            document.querySelector('.language-dropdown')?.classList.remove('active');
            // Toggle menu user
            newBtn.classList.toggle('active');
        });
    }

    // Menu Ngôn ngữ
    if (langBtn) {
        // Xóa sự kiện cũ
        const newLangBtn = langBtn.cloneNode(true);
        langBtn.parentNode.replaceChild(newLangBtn, langBtn);

        const langContainer = document.querySelector('.language-dropdown');
        
        newLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Đóng menu user nếu đang mở
            document.getElementById('userProfileNav')?.classList.remove('active');
            // Toggle menu ngôn ngữ
            if(langContainer) langContainer.classList.toggle('active');
        });
    }

    // Đóng tất cả khi click ra ngoài
    document.addEventListener('click', () => {
        document.getElementById('userProfileNav')?.classList.remove('active');
        document.querySelector('.language-dropdown')?.classList.remove('active');
        
        // Đóng cả minigame dropdown (nếu có)
        document.querySelector('.minigame-dropdown')?.classList.remove('active');
    });
}

/* --- 2. XỬ LÝ MENU MOBILE --- */
function initMobileMenu() {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('sideMenu');
    if(btn && menu) {
        // Clone để xóa event cũ
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if(!menu.contains(e.target) && !newBtn.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }
}

/* --- 3. HIỆU ỨNG SAO (STARS) --- */
function initStars() {
    const container = document.getElementById('starsContainer');
    if(!container) return;
    
    // Chỉ tạo sao nếu chưa có (tránh tạo chồng chéo khi load lại)
    if(container.innerHTML.trim() === "") {
        for(let i=0; i<100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random()*100 + '%';
            star.style.top = Math.random()*100 + '%';
            star.style.width = Math.random()*2+1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random()*4 + 's';
            container.appendChild(star);
        }
    }
}

/* --- 4. ĐA NGÔN NGỮ (GIỮ NGUYÊN) --- */
// ... (Bạn giữ nguyên phần code dịch thuật ở dưới như cũ) ...
const translations = {
    en: {
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing",
        navLogin: "Login", navLanguage: "Language",
        heroTitle: "Learn Touch Typing for free!", heroButton: "Start Learning Now"
    },
    vi: {
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Luyện gõ",
        navLanguage: "Ngôn ngữ", navLogin: "Đăng nhập",
        heroTitle: "Học gõ 10 ngón miễn phí!", heroButton: "Bắt đầu ngay"
    }
};

function initLanguage() {
    let currentLang = localStorage.getItem('language') || 'en';
    applyLanguage(currentLang);

    document.querySelectorAll('.language-option').forEach(opt => {
        opt.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            applyLanguage(lang);
            document.querySelector('.language-dropdown').classList.remove('active');
        });
    });
}

function applyLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}