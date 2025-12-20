// assets/js/ui/language.js
const translations = {
    en: { navHome: "Home", navAbout: "About", /* ... */ },
    vi: { navHome: "Trang chủ", navAbout: "Giới thiệu", /* ... */ }
};

export function initLanguage() {
    // Logic lấy ngôn ngữ từ localStorage và apply (từ script.js cũ)
    const lang = localStorage.getItem('language') || 'en';
    applyLanguage(lang);
}

export function applyLanguage(lang) {
    // Logic dịch text (từ script.js cũ)
    const t = translations[lang];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(t[key]) el.innerText = t[key];
    });
}