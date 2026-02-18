/* assets/js/main.js */
import { renderNavbar } from './components/navbar.js';
import { initLanguage } from './ui/language.js';

// Hàm tạo sao (có thể import từ file effects.js hoặc viết trực tiếp nếu đơn giản)
function initStars() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const container = document.getElementById('starsContainer');
    if(!container) return;
    
    container.innerHTML = '';
    const starCount = 200; // Số lượng sao

    for(let i=0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1; 
        const delay = Math.random() * 5;

        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        
        container.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Main App Started");
    renderNavbar();   // Hiển thị menu
    initStars();      // Hiển thị sao
    initLanguage();   // Cài đặt ngôn ngữ
});