const translations = {
    en: {
        navHome: "Home",
        navAbout: "About",
        navTips: "Tips",
        navFAQ: "FAQ",
        navLanguage: "Language",
        navLogin: "Login",
        pageTitle: "Frequently Asked Questions - FAQ",
        pageSubtitle: "Everything you need to know about typing & NoobDev",
        tocTitle: "Table of contents"
    },
    vi: {
        navHome: "Trang chủ",
        navAbout: "Giới thiệu",
        navTips: "Mẹo",
        navFAQ: "Hỏi đáp",
        navLanguage: "Ngôn Ngữ",
        navLogin: "Đăng nhập",
        pageTitle: "Câu Hỏi Thường Gặp - FAQ",
        pageSubtitle: "Mọi thứ bạn cần biết về gõ máy & NoobDev",
        tocTitle: "Nội dung câu hỏi"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function translatePage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize Translations
    translatePage(currentLanguage);

    // 2. Stars Animation
    const starsContainer = document.getElementById('starsContainer');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            const size = Math.random() * 2 + 1 + 'px';
            star.style.width = size;
            star.style.height = size;
            star.style.animationDelay = Math.random() * 4 + 's';
            starsContainer.appendChild(star);
        }
    }
    
    // 3. Language Dropdown Toggle
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            languageDropdown.classList.remove('active');
        });

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                translatePage(lang);
                languageDropdown.classList.remove('active');
            });
        });
    }

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    if(menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });
    }
});