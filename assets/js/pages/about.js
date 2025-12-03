function createStars() {
    const container = document.getElementById('starsContainer');
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

// --- 2. Typing Effect for Header ---
const textToType = "We are NoobDev.";
const typingElement = document.getElementById('typing-text');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    } else {
        typingElement.innerHTML += '<span class="cursor">&nbsp;</span>';
    }
}

// --- 3. Language Dropdown Logic ---
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.querySelector('.language-dropdown');
const languageOptions = document.querySelectorAll('.language-option');

// Toggle dropdown
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('active');
    }
});

// Handle selection (Visual only)
languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all
        languageOptions.forEach(opt => opt.classList.remove('active-lang'));
        // Add to clicked
        option.classList.add('active-lang');
        // Close menu
        languageDropdown.classList.remove('active');
        
        // Note: Actual translation logic would go here
        console.log('Language selected:', option.getAttribute('data-lang'));
    });
});

// --- 4. Initialize ---
window.addEventListener('load', () => {
    createStars();
    setTimeout(typeWriter, 500);
});

// --- 5. Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 38, 71, 0.95)';
        navLinks.style.padding = '20px';
    }
});