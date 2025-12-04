document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initMobileMenu();
    initAllDropdowns();
    initLanguage();
});

/* --- 1. DROPDOWN HANDLER --- */
function initAllDropdowns() {
    const userNav = document.getElementById('userProfileNav');
    if (userNav) {
        userNav.onclick = function(e) {
            e.stopPropagation();
            document.querySelector('.language-dropdown')?.classList.remove('active');
            this.classList.toggle('active');
        };
    }

    const langBtn = document.getElementById('languageBtn');
    const langContainer = document.querySelector('.language-dropdown');
    if (langBtn && langContainer) {
        langBtn.onclick = function(e) {
            e.stopPropagation();
            document.getElementById('userProfileNav')?.classList.remove('active');
            langContainer.classList.toggle('active');
        };
    }

    document.addEventListener('click', () => {
        userNav?.classList.remove('active');
        langContainer?.classList.remove('active');
    });
}

/* --- 2. FULL TRANSLATION DICTIONARY --- */
const translations = {
    en: {
        // MENU
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing Practice",
        navLogin: "Login", navLanguage: "Language",
        
        // HOME & DASHBOARD
        heroTitle: "Learn Touch Typing for free!",
        heroButton: "Start Learning Now",
        scrollText: "Scroll to explore",
        
        // ABOUT PAGE (Đã bổ sung đầy đủ)
        aboutTitle: "We are NoobDev",
        aboutDesc: "The ultimate platform to master touch typing, built by students for students.",
        missionTitle: "Our Mission",
        missionDesc: "To provide a free, accessible platform for students to improve typing speed.",
        whyTitle: "Why NoobDev?",
        why1: "Interactive Lessons", // Mới thêm
        why2: "Real-time Stats",     // Mới thêm
        why3: "Free Forever",        // Mới thêm
        visionTitle: "Our Vision",
        visionDesc: "We believe typing is a fundamental skill in the digital age.",
        teamTitle: "Meet Our Team",
        techTitle: "Built With",

        // TIPS PAGE
        tipsTitle: "How to type faster",
        tipsSubtitle: "Master the keyboard with these pro techniques",
        tocTitle: "Table of Contents",
        tip1Title: "Correct Sitting Posture",
        tip1Desc: "Keep your back straight, feet flat on the floor, and screen at eye level.",
        tip2Title: "Master the Home Row",
        tip2Desc: "Always return your fingers to the Home Row (ASDF - JKL;) after pressing a key.",
        tip3Title: "Don't Look at Keyboard",
        tip3Desc: "Looking at the screen helps your muscle memory develop much faster.",
        tip4Title: "Use All 10 Fingers",
        tip4Desc: "Stick to the correct finger mapping strictly.",

        // FAQ PAGE
        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Common questions about touch typing.",
        q1: "Is NoobDev really free?",
        a1: "Yes! NoobDev is 100% free to use for everyone.",
        q2: "Do I need an account?",
        a2: "You need an account to use the Typing Practice tool.",
        q3: "WPM Calculation",
        a3: "WPM = (Total Characters / 5) / Minutes.",
        q4: "Layouts",
        a4: "Currently optimized for QWERTY."
    },
    
    vi: {
        // MENU
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Luyện gõ",
        navLogin: "Đăng nhập", navLanguage: "Ngôn ngữ",
        
        // HOME & DASHBOARD
        heroTitle: "Học gõ 10 ngón miễn phí!",
        heroButton: "Bắt đầu học ngay",
        scrollText: "Cuộn để xem thêm",

        // ABOUT PAGE (Đã bổ sung đầy đủ)
        aboutTitle: "Chúng tôi là NoobDev",
        aboutDesc: "Nền tảng tối ưu để làm chủ gõ phím, được xây dựng bởi sinh viên.",
        missionTitle: "Sứ mệnh",
        missionDesc: "Cung cấp nền tảng miễn phí giúp mọi người cải thiện tốc độ gõ.",
        whyTitle: "Tại sao chọn NoobDev?",
        why1: "Bài học tương tác",   // Dịch mới
        why2: "Thống kê thời gian thực", // Dịch mới
        why3: "Miễn phí trọn đời",   // Dịch mới
        visionTitle: "Tầm nhìn",
        visionDesc: "Chúng tôi tin rằng gõ phím là kỹ năng cơ bản trong kỷ nguyên số.",
        teamTitle: "Đội ngũ phát triển",
        techTitle: "Công nghệ sử dụng",

        // TIPS PAGE
        tipsTitle: "Cách gõ phím nhanh hơn",
        tipsSubtitle: "Làm chủ bàn phím với các kỹ thuật chuyên nghiệp",
        tocTitle: "Mục lục",
        tip1Title: "Tư thế ngồi đúng",
        tip1Desc: "Giữ lưng thẳng, chân đặt phẳng trên sàn và màn hình ngang tầm mắt.",
        tip2Title: "Làm chủ hàng phím cơ sở",
        tip2Desc: "Luôn đưa ngón tay về hàng phím cơ sở (ASDF - JKL;) sau khi gõ.",
        tip3Title: "Không nhìn bàn phím",
        tip3Desc: "Nhìn màn hình giúp ghi nhớ vị trí phím nhanh hơn.",
        tip4Title: "Sử dụng đủ 10 ngón",
        tip4Desc: "Tuân thủ nghiêm ngặt quy tắc đặt ngón tay.",

        // FAQ PAGE
        faqTitle: "Câu hỏi thường gặp",
        faqSubtitle: "Những thắc mắc phổ biến về gõ phím.",
        q1: "NoobDev có miễn phí không?",
        a1: "Có! NoobDev hoàn toàn miễn phí cho tất cả mọi người.",
        q2: "Tôi có cần tài khoản không?",
        a2: "Bạn cần tài khoản để sử dụng tính năng Luyện tập.",
        q3: "Cách tính WPM?",
        a3: "WPM = (Tổng số ký tự / 5) / Số phút.",
        q4: "Hỗ trợ bàn phím nào?",
        a4: "Hiện tại tối ưu cho QWERTY."
    }
};

function initLanguage() {
    let currentLang = localStorage.getItem('language') || 'en';
    applyLanguage(currentLang);

    document.querySelectorAll('.language-option').forEach(opt => {
        opt.onclick = function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            applyLanguage(lang);
            // Đóng menu sau khi chọn
            document.querySelector('.language-dropdown').classList.remove('active');
        };
    });
}

function applyLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang] && translations[lang][key]) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translations[lang][key];
            else el.innerText = translations[lang][key];
        }
    });
    
    const btn = document.getElementById('languageBtn');
    if(btn) btn.innerHTML = (lang === 'vi' ? 'Tiếng Việt' : 'Language') + ' <span class="dropdown-arrow">▼</span>';
}

/* --- 3. CÁC HIỆU ỨNG KHÁC --- */
function initStars() {
    const container = document.getElementById('starsContainer');
    if(!container) return;
    container.innerHTML = ''; 
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

function initMobileMenu() {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('sideMenu');
    if(btn && menu) {
        btn.onclick = function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
        };
        document.addEventListener('click', (e) => {
            if(!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.remove('active');
        });
    }
}