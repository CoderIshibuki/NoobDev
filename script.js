// Translation dictionary
const translations = {
    en: {
        navGetStarted: "Get Started",
        navSchool: "School Edition",
        navStore: "Store",
        navLanguage: "Language",
        navLogin: "Login",
        menuAbout: "About",
        menuTips: "Tips",
        menuFaq: "FAQ",
        menuContact: "Contact",
        heroTitle: "Learn Touch Typing for free!",
        heroSubtitle: "Master keyboard skills with our interactive typing lessons",
        heroButton: "Start Learning Now",
        scrollText: "Scroll to explore",
        welcomeMessage: "Welcome to NoobDev! Let's start learning touch typing!",
        comingSoon: "section coming soon!"
    },
    vi: {
        navGetStarted: "Bắt Đầu",
        navSchool: "Phiên Bản Trường Học",
        navStore: "Cửa Hàng",
        navLanguage: "Ngôn Ngữ",
        navLogin: "Đăng Nhập",
        menuAbout: "Giới Thiệu",
        menuTips: "Mẹo",
        menuFaq: "Câu Hỏi Thường Gặp",
        menuContact: "Liên Hệ",
        heroTitle: "Học Đánh Máy Mù Miễn Phí!",
        heroSubtitle: "Làm chủ kỹ năng bàn phím với bài học đánh máy tương tác",
        heroButton: "Bắt Đầu Học Ngay",
        scrollText: "Cuộn để khám phá",
        welcomeMessage: "Chào mừng đến với NoobDev! Hãy bắt đầu học đánh máy!",
        comingSoon: "phần sắp ra mắt!"
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
    // Initialize language
    translatePage(currentLanguage);

    // Create stars
    const starsContainer = document.getElementById('starsContainer');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 2 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 4 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });
    }

    // Language dropdown
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

    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const message = translations[currentLanguage].welcomeMessage;
                alert(message);
            }
        });
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});