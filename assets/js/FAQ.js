/* --- LƯU TẠI: assets/js/pages/FAQ.js --- */

const translations = {
    en: {
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing",
        navLanguage: "Language", navLogin: "Login",
        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Common questions and support",
        tocTitle: "Table of Contents",
        q1Title: "What is a typing test?", q1Desc: "A typing test is a practical test that measures a person's speed and accuracy when typing text.",
        q2Title: "What is a typing test for?", q2Desc: "It checks how fast and accurately someone can type. This is often part of the selection process for jobs requiring computer use.",
        q3Title: "Why practice typing?", q3Desc: "To save time, finish work faster, communicate efficiently, and reduce physical strain on your hands.",
        q4Title: "How long do I need to practice?", q4Desc: "Ideally 10 to 20 minutes a day. Consistent practice with correct technique yields results in 1-3 months.",
        q5Title: "What is WPM?", q5Desc: "WPM stands for “Words Per Minute”. It is the standard unit for measuring typing speed.",
        q6Title: "What are net keystrokes?", q6Desc: "Net keystrokes count only the correct characters typed per minute.",
        q7Title: "What are gross keystrokes?", q7Desc: "Gross keystrokes count all characters typed, whether correct or incorrect (excluding corrections).",
        q8Title: "What are total keystrokes?", q8Desc: "Total keystrokes include every key press, including backspaces and corrections.",
        q9Title: "Accuracy vs Actual Accuracy?", q9Desc: "Accuracy considers only the final text. Actual accuracy considers all mistakes made while typing, even if corrected.",
        q10Title: "What is touch typing?", q10Desc: "A technique where you type without looking at the keyboard, relying on muscle memory and the Home Row (F and J keys).",
        q11Title: "How to practice touch typing?", q11Desc: "Place index fingers on F and J. Use all 10 fingers. Practice pressing keys without looking down using online tools.",
        q12Title: "What is muscle memory?", q12Desc: "When your brain memorizes movement sequences through repetition, allowing you to type automatically without conscious effort.",
        q13Title: "How to type faster?", q13Desc: "Stop looking at the keyboard. Prioritize accuracy over speed. Maintain good posture and consistent rhythm.",
        q14Title: "Average typing speed?", q14Desc: "The global average is around 42 WPM. Professional typists often exceed 100 WPM."
    },
    vi: {
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Gõ phím",
        navLanguage: "Ngôn ngữ", navLogin: "Đăng nhập",
        faqTitle: "Câu hỏi thường gặp",
        faqSubtitle: "Giải đáp thắc mắc và hỗ trợ",
        tocTitle: "Mục lục",
        q1Title: "Bài kiểm tra gõ là gì?", q1Desc: "Là bài kiểm tra đo tốc độ và độ chính xác khi gõ văn bản.",
        q2Title: "Mục đích kiểm tra gõ?", q2Desc: "Để kiểm tra tốc độ gõ của một người, thường dùng trong tuyển dụng.",
        q3Title: "Tại sao nên luyện gõ?", q3Desc: "Lợi ích lớn nhất là tiết kiệm thời gian và giảm mỏi tay khi làm việc.",
        q4Title: "Cần luyện tập bao lâu?", q4Desc: "Lý tưởng nhất là 10-20 phút mỗi ngày để thấy kết quả sau 1-3 tháng.",
        q5Title: "WPM là gì?", q5Desc: "WPM là từ trên phút (Words Per Minute), đơn vị đo tốc độ gõ.",
        q6Title: "Net keystrokes là gì?", q6Desc: "Số ký tự chính xác gõ được trong một phút.",
        q7Title: "Gross keystrokes là gì?", q7Desc: "Tổng số ký tự đã gõ (đúng hoặc sai), không tính sửa lỗi.",
        q8Title: "Total keystrokes là gì?", q8Desc: "Tổng tất cả các phím đã nhấn, bao gồm cả phím xóa và sửa lỗi.",
        q9Title: "Độ chính xác thực tế?", q9Desc: "Độ chính xác tính cả những lần bạn gõ sai và phải xóa đi.",
        q10Title: "Gõ 10 ngón là gì?", q10Desc: "Là kỹ thuật gõ không nhìn bàn phím, dựa vào trí nhớ cơ bắp.",
        q11Title: "Luyện gõ 10 ngón thế nào?", q11Desc: "Đặt tay lên hàng phím cơ sở (F, J) và tập gõ không nhìn xuống.",
        q12Title: "Trí nhớ cơ bắp là gì?", q12Desc: "Là khả năng thực hiện động tác tự động do lặp đi lặp lại nhiều lần.",
        q13Title: "Làm sao gõ nhanh hơn?", q13Desc: "Đừng nhìn phím, tập trung vào độ chính xác trước tốc độ.",
        q14Title: "Tốc độ trung bình là bao nhiêu?", q14Desc: "Trung bình khoảng 42 WPM. Người chuyên nghiệp có thể đạt trên 100 WPM."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initLanguage();
    initSmoothScrollAndHighlight();
});

// --- 1. LANGUAGE LOGIC ---
function initLanguage() {
    const btn = document.getElementById('languageBtn');
    const menu = document.getElementById('languageMenu');
    const userBtn = document.getElementById('userProfileNav');
    const userMenu = document.querySelector('.profile-dropdown-nav');

    let currentLang = localStorage.getItem('language') || 'en';
    applyTranslation(currentLang);
    updateActiveLang(currentLang);

    if(btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
            if(userMenu) userMenu.parentElement.classList.remove('active');
        });
    }

    if(userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userBtn.classList.toggle('active');
            if(menu) menu.classList.remove('active');
        });
    }

    document.querySelectorAll('.language-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = opt.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            applyTranslation(lang);
            updateActiveLang(lang);
            menu.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        if(menu) menu.classList.remove('active');
        if(userBtn) userBtn.classList.remove('active');
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
        if(opt.getAttribute('data-lang') === lang) opt.classList.add('active');
    });
}

// --- 2. SMOOTH SCROLL & HIGHLIGHT ---
function initSmoothScrollAndHighlight() {
    document.querySelectorAll('.faq-toc a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 140; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                document.querySelectorAll('.faq-card').forEach(card => card.classList.remove('active-highlight'));
                targetElement.classList.add('active-highlight');
                setTimeout(() => targetElement.classList.remove('active-highlight'), 2000);
            }
        });
    });
}

// --- 3. STARS ---
function initStars() {
    const container = document.getElementById('starsContainer');
    if(container) {
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