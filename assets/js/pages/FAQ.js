/* assets/js/pages/FAQ.js */

// GIỮ NGUYÊN BỘ DỮ LIỆU DỊCH THUẬT (Rất dài, không nên xóa)
const translations = {
    en: {
        navHome: "Home", navAbout: "About", navTips: "Tips", navFAQ: "FAQ", navTyping: "Typing",
        navLanguage: "Language", navLogin: "Login",
        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Common questions regarding typing speed and techniques",
        tocTitle: "Table of Contents",
        q1Title: "What is a typing test?", q1Desc: "A typing test measures a person's speed and accuracy when typing text. It is often used to assess keyboarding skills for jobs or personal improvement.",
        q2Title: "What is a typing test for?", q2Desc: "It helps evaluate your current skill level, track progress over time, and identify areas (like specific keys) where you need improvement.",
        q3Title: "Why practice typing?", q3Desc: "Typing is a fundamental digital skill. Faster typing saves time, boosts productivity, and allows you to capture thoughts as quickly as you think them.",
        q4Title: "How long do I need to practice?", q4Desc: "Consistency beats intensity. 10-15 minutes of focused practice daily is sufficient to see significant improvements within a few weeks.",
        q5Title: "What is WPM?", q5Desc: "WPM stands for 'Words Per Minute'. It is calculated by taking total characters typed divided by 5 (standard word length), then divided by minutes.",
        q6Title: "What are net keystrokes?", q6Desc: "Net keystrokes count only the correct characters typed. Errors are subtracted from the total count.",
        q7Title: "What are gross keystrokes?", q7Desc: "Gross keystrokes count every single key press, including mistakes and backspaces.",
        q8Title: "What are total keystrokes?", q8Desc: "Total keystrokes are all characters, correct or incorrect, that were entered during a typing test. Characters that have been corrected are also counted.",
        q9Title: "Accuracy?", q9Desc: "Accuracy shows how much of the test content was typed correctly. Only the final typed content is taken into account.",
        q10Title: "What is touch typing?", q10Desc: "Touch typing is typing without looking at the keyboard, relying on muscle memory to find keys. This is the most efficient way to type.",
        q11Title: "How to practice?", q11Desc: "Place your fingers on the Home Row (ASDF JKL;) and practice pressing keys without looking.",
        q12Title: "What is muscle memory?", q12Desc: "Muscle memory is the ability to reproduce a movement automatically through repetition without conscious thought.",
        q13Title: "How to type faster?", q13Desc: "1. Don't look at the keyboard. 2. Focus on accuracy first. 3. Maintain good posture. 4. Practice regularly.",
        q14Title: "What is the average typing speed?", q14Desc: "The average typing speed is around 40-50 WPM. Professional typists often reach 70-80 WPM, while advanced competitive typists can exceed 150 WPM."
    },
    vi: {
        navHome: "Trang chủ", navAbout: "Giới thiệu", navTips: "Mẹo", navFAQ: "Hỏi đáp", navTyping: "Gõ phím",
        navLanguage: "Ngôn ngữ", navLogin: "Đăng nhập",
        faqTitle: "Câu hỏi thường gặp",
        faqSubtitle: "Mọi thứ bạn cần biết về gõ phím & NoobDev",
        tocTitle: "Mục lục",
        q1Title: "Kiểm tra đánh máy là gì?", q1Desc: "Kiểm tra đánh máy là một bài kiểm tra thực tế đo tốc độ và độ chính xác của một người khi nhập văn bản.",
        q2Title: "Kiểm tra đánh máy để làm gì?", q2Desc: "Giúp đánh giá kỹ năng hiện tại, theo dõi sự tiến bộ và xác định các điểm yếu cần cải thiện.",
        q3Title: "Tại sao nên tập đánh máy?", q3Desc: "Tiết kiệm thời gian, tăng năng suất làm việc và giúp bạn ghi lại suy nghĩ nhanh chóng hơn.",
        q4Title: "Tôi cần luyện tập bao lâu?", q4Desc: "Chỉ cần 10-15 phút tập trung mỗi ngày là đủ để thấy sự cải thiện rõ rệt sau vài tuần.",
        q5Title: "WPM là gì?", q5Desc: "WPM là 'Từ mỗi phút'. Được tính bằng tổng số ký tự gõ được chia cho 5.",
        q6Title: "Net keystrokes là gì?", q6Desc: "Số lần gõ phím ròng chỉ tính các ký tự gõ đúng.",
        q7Title: "Gross keystrokes là gì?", q7Desc: "Tổng số lần gõ phím tính cả các phím gõ sai và xóa lùi.",
        q8Title: "Total keystrokes là gì?", q8Desc: "Tất cả các lần nhấn phím được thực hiện trong bài kiểm tra.",
        q9Title: "Độ chính xác?", q9Desc: "Tỷ lệ phần trăm nội dung được gõ đúng so với bản gốc.",
        q10Title: "Touch typing là gì?", q10Desc: "Kỹ thuật gõ không nhìn bàn phím, dựa vào trí nhớ cơ bắp (Home Row).",
        q11Title: "Làm thế nào để luyện tập?", q11Desc: "Đặt tay lên hàng phím cơ sở (ASDF JKL;) và tập gõ không nhìn xuống.",
        q12Title: "Trí nhớ cơ bắp là gì?", q12Desc: "Khả năng thực hiện động tác một cách tự động thông qua việc lặp đi lặp lại nhiều lần.",
        q13Title: "Làm thế nào để gõ nhanh hơn?", q13Desc: "1. Đừng nhìn bàn phím. 2. Ưu tiên chính xác hơn tốc độ. 3. Ngồi đúng tư thế.",
        q14Title: "Tốc độ gõ trung bình là bao nhiêu?", q14Desc: "Tốc độ trung bình khoảng 40-50 WPM. Người chuyên nghiệp có thể đạt 70-80 WPM."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tạo sao trực tiếp (Đảm bảo có sao)
    createStarsDirectly();

    // 2. Các logic khác
    initLanguage();
    initSmoothScrollAndHighlight();
});

// --- HÀM TẠO SAO TRỰC TIẾP ---
function createStarsDirectly() {
    const container = document.getElementById('starsContainer');
    if(!container) return;

    container.innerHTML = ''; 
    const starCount = 600; // Số lượng sao nhiều

    for(let i=0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2.5 + 1; 
        const delay = Math.random() * 4;

        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        star.style.opacity = Math.random() * 0.7 + 0.3;

        container.appendChild(star);
    }
}

// --- LANGUAGE LOGIC ---
function initLanguage() {
    let currentLang = localStorage.getItem('language') || 'en';
    applyTranslation(currentLang);
    // (Logic dropdown ngôn ngữ được main.js xử lý một phần, 
    // nhưng nếu cần xử lý riêng ở đây thì giữ nguyên code cũ của bạn)
}

function applyTranslation(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// --- SMOOTH SCROLL ---
function initSmoothScrollAndHighlight() {
    const tocLinks = document.querySelectorAll('.faq-toc a');
    tocLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 140; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                document.querySelectorAll('.faq-card').forEach(card => card.classList.remove('active-highlight'));
                targetElement.classList.add('active-highlight');
                
                tocLinks.forEach(l => l.classList.remove('active-link'));
                this.classList.add('active-link');
            }
        });
    });
}