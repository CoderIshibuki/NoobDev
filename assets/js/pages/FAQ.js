/* assets/js/pages/FAQ.js */
import { translations } from '../data/translations.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tạo sao trực tiếp (Đảm bảo có sao)
    createStarsDirectly();

    // 2. Các logic khác
    initLanguage();
    initSmoothScrollAndHighlight();
});

// --- HÀM TẠO SAO TRỰC TIẾP ---
function createStarsDirectly() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const container = document.getElementById('starsContainer');
    if(!container) return;

    container.innerHTML = ''; 
    const starCount = 200; // Số lượng sao nhiều

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