/* assets/js/pages/tips.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Chạy hàm tạo sao
    createStarsDirectly();
    
    // 2. Chạy logic cuộn trang
    initSmoothScrollAndHighlight();
});

// --- HÀM TẠO SAO TRỰC TIẾP ---
function createStarsDirectly() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const container = document.getElementById('starsContainer');
    
    // Kiểm tra xem tìm thấy thẻ chứa sao không
    if(!container) {
        console.error("❌ Lỗi: Không tìm thấy id='starsContainer' trong file HTML");
        return;
    }

    console.log("✨ Đang tạo sao...");
    container.innerHTML = ''; // Xóa sao cũ nếu có

    // Tăng số lượng sao lên 400
    const starCount = 200; 

    for(let i=0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random vị trí
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // Random kích thước (lớn hơn chút để dễ nhìn)
        const size = Math.random() * 3 + 1; 
        // Random độ trễ lấp lánh
        const delay = Math.random() * 4;

        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        
        // Random độ mờ để tự nhiên hơn
        star.style.opacity = Math.random() * 0.7 + 0.3;

        container.appendChild(star);
    }
}

// --- LOGIC CUỘN TRANG (GIỮ NGUYÊN) ---
function initSmoothScrollAndHighlight() {
    const tocLinks = document.querySelectorAll('.faq-toc a');
    
    tocLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                document.querySelectorAll('.faq-card').forEach(card => card.classList.remove('active-highlight'));
                targetElement.classList.add('active-highlight');
                
                tocLinks.forEach(l => l.classList.remove('active-link'));
                this.classList.add('active-link');
            }
        });
    });
}