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
        heroButton: "Get Started",
        welcomeMessage: "Welcome to NoobDev! Let's start learning typing!",
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
        heroButton: "Bắt Đầu",
        welcomeMessage: "Chào mừng đến với NoobDev! Hãy bắt đầu học đánh máy!",
        comingSoon: "phần sắp ra mắt!"
    }
};

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to translate page
function translatePage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize page with saved language
    translatePage(currentLanguage);

    // Language dropdown functionality
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = languageBtn?.parentElement;
    const languageMenu = document.getElementById('languageMenu');

    if (languageBtn && languageDropdown && languageMenu) {
        // Toggle dropdown
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });

        // Language selection
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = option.getAttribute('data-lang');
                translatePage(selectedLang);
                languageDropdown.classList.remove('active');
            });
        });
    }
    
    // Generate random stars
    const starsContainer = document.getElementById('starsContainer');
    const numStars = 100;

    if (starsContainer) {
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 80}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });

        // Side menu smooth scroll
        document.querySelectorAll('.side-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close the menu
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    const linkText = link.textContent;
                    const comingSoon = translations[currentLanguage].comingSoon;
                    alert(`${linkText} ${comingSoon}`);
                }
            });
        });
    }

    // Smooth scroll on scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // CTA Button click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const message = translations[currentLanguage].welcomeMessage;
            alert(message);
        });
    }

});