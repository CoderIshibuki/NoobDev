/* assets/js/about.js */

// --- 1. STAR GENERATION (Hiệu ứng sao cho trang About) ---
function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
    // Xóa sao cũ nếu có để tránh trùng
    container.innerHTML = ''; 

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 4;
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        container.appendChild(star);
    }
}

// --- 2. TYPING EFFECT (Hiệu ứng gõ chữ tiêu đề) ---
const textToType = "We are NoobDev.";
const typingElement = document.getElementById('typing-text');
let typeIndex = 0;

function typeWriter() {
    if (!typingElement) return;
    
    if (typeIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    } else {
        typingElement.innerHTML += '<span class="cursor">&nbsp;</span>';
    }
}

// --- 3. INITIALIZE ---
window.addEventListener('load', () => {
    createStars();
    // Đợi 0.5s rồi mới bắt đầu gõ chữ
    setTimeout(typeWriter, 500);
});

// LƯU Ý: Đã xóa toàn bộ logic Menu và Language ở đây 
// để dùng chung trong file script.js (tránh xung đột).