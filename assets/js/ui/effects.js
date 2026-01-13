// assets/js/ui/effects.js
export function initStars() {
    const container = document.getElementById('starsContainer');
    if (container) {
        // Code tạo sao cũ của bạn
        for(let i=0; i< 500; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            // ... (Copy logic random vị trí từ script.js cũ)
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 4 + 's';
            container.appendChild(star);
        }
    }
}