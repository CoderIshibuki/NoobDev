const translations = {
    en: {
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing",
        navLanguage: "Language", navLogin: "Login",
        pageTitle: "How to type faster - 12 Tips",
        pageSubtitle: "These are some tips for you to improve typing",
        tocTitle: "Table of contents"
    },
    vi: {
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Gõ phím",
        navLanguage: "Ngôn ngữ", navLogin: "Đăng nhập",
        pageTitle: "Làm thế nào để gõ nhanh - 12 mẹo",
        pageSubtitle: "Dưới đây là 1 số mẹo cho bạn cải thiện gõ phím",
        tocTitle: "Mục lục"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initMobileMenu();
    initLanguage();
    initSmoothScrollAndHighlight();
});

// --- 1. STAR GENERATION ---
function initStars() {
    const container = document.getElementById('starsContainer');
    if(container) {
        // TĂNG SỐ LƯỢNG SAO LÊN 600
        for(let i=0; i< 600; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            const size = Math.random() * 2.5 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = Math.random() * 4 + 's';
            star.style.opacity = Math.random() * 0.7 + 0.3;
            container.appendChild(star);
        }
    }
}

// --- 2. MOBILE MENU ---
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    if(menuToggle && sideMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            }
        });
    }
}

// --- 3. LANGUAGE & TRANSLATION ---
function initLanguage() {
    const btn = document.getElementById('languageBtn');
    const dropdown = document.querySelector('.language-dropdown');
    const menu = document.getElementById('languageMenu');
    
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'en'
    let currentLang = localStorage.getItem('language') || 'en';
    applyTranslation(currentLang);
    updateActiveLang(currentLang);

    // Toggle Dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });

    // Handle Language Selection
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài làm đóng dropdown ngay lập tức
            const lang = opt.getAttribute('data-lang');
            currentLang = lang;
            localStorage.setItem('language', lang);
            applyTranslation(lang);
            updateActiveLang(lang);
            dropdown.classList.remove('active'); // Đóng sau khi chọn
        });
    });
}

function applyTranslation(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

function updateActiveLang(lang) {
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('active');
        if(opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        }
    });
}

// --- 4. SCROLL AND HIGHLIGHT LOGIC ---
function initSmoothScrollAndHighlight() {
    document.querySelectorAll('.faq-toc a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Tính toán vị trí cuộn: vị trí element + scroll hiện tại - offset cho header
                // 140px là khoảng offset an toàn để không bị header che mất tiêu đề
                const headerOffset = 140; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                // Thực hiện cuộn mượt
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Xử lý highlight
                // 1. Xóa class active-highlight ở tất cả các card khác
                document.querySelectorAll('.faq-card').forEach(card => card.classList.remove('active-highlight'));
                
                // 2. Thêm class active-highlight vào card được chọn
                targetElement.classList.add('active-highlight');
            }
        });
    });
}