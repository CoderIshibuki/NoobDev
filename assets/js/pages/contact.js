/* /home/ishibuki/Documents/NoobDev/assets/js/pages/contact.js */

// --- INIT EMAILJS ---
(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = function() {
        emailjs.init("c_-yVOB7DLrgVv7YB"); 
    };
    document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo hiệu ứng sao (nếu chưa có trong main.js)
    const starsContainer = document.getElementById('starsContainer');
    if (starsContainer && starsContainer.innerHTML === "") {
        createStars(starsContainer);
    }

    // 2. Xử lý Form Submit
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    const btn = document.querySelector('.send-btn');
    // Lưu text gốc (bao gồm cả icon) để restore sau này
    const originalText = btn.innerHTML;

    // --- VALIDATION ---
    if (!name || !email || !subject || !message) {
        showToast('Please fill all fields!', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Invalid Email Address!', 'error');
        return;
    }

    // --- RATE LIMITING (CHỐNG SPAM) ---
    const lastSent = localStorage.getItem('last_contact_sent');
    const COOLDOWN = 60000; // 60 giây
    if (lastSent && Date.now() - parseInt(lastSent) < COOLDOWN) {
        const remaining = Math.ceil((COOLDOWN - (Date.now() - parseInt(lastSent))) / 1000);
        showToast(`Please wait ${remaining}s before sending again!`, 'error');
        return;
    }
    // ------------------

    // --- SEND VIA EMAILJS ---
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // 2. Dán Service ID và Template ID vào đây
    const serviceID = "service_s3ugzhs";   // Ví dụ: "service_gmail"
    const templateID = "template_00kvdmm"; // Ví dụ: "template_contact_form"

    const params = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    if (window.emailjs) {
        emailjs.send(serviceID, templateID, params)
            .then(() => {
                // Lưu thời gian gửi thành công
                localStorage.setItem('last_contact_sent', Date.now().toString());

                showToast('Message sent successfully!', 'success');
                form.reset();
                
                // Reset nút về ban đầu
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                showToast('Failed to send. Please try again later.', 'error');
                
                // Reset nút về ban đầu
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    } else {
        showToast('Email service not loaded.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Tự động xóa sau 3 giây
    setTimeout(() => {
        toast.classList.add('hiding');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

// Hàm tạo sao (Copy từ about.js nếu cần dùng độc lập)
function createStars(container) {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const s = Math.random() * 2 + 1;
        star.style.width = s + 'px'; star.style.height = s + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        container.appendChild(star);
    }
}
