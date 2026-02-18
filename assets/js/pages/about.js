/* --- LƯU TẠI: assets/js/pages/about.js --- */

// --- 1. TYPING EFFECT ---
const textToType = "We are NoobDev.";
const typingElement = document.getElementById('typing-text');
let typeIndex = 0;

function typeWriter() {
    if (!typingElement) return;
    
    if (typeIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100); // Tốc độ gõ
    } else {
        // Thêm con trỏ nhấp nháy sau khi gõ xong
        typingElement.innerHTML += '<span class="cursor">&nbsp;</span>';
    }
}

// --- 2. STAR GENERATION (Nếu script.js chưa có) ---
function createStars() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const container = document.getElementById('starsContainer');
    if (!container || container.innerHTML !== "") return; // Tránh tạo trùng

    const starCount = 200;
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
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(star);
    }
}

// --- 3. INITIALIZE ---
window.addEventListener('load', () => {
    createStars();
    // Đợi 0.5s rồi mới bắt đầu gõ chữ
    setTimeout(typeWriter, 500);
});