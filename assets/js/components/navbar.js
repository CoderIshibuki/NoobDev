// assets/js/components/navbar.js
import { auth } from '../firebase/config.js';
import { logoutUser } from '../firebase/auth.js';
import { translations } from '../data/translations.js';

export function renderNavbar() {
    // 1. Xác định ngôn ngữ và đường dẫn
    const lang = localStorage.getItem('language') || 'en';
    const t = translations[lang] || translations['en'];
    const isVi = lang === 'vi';

    // Kiểm tra xem đang ở trang con (pages/) hay trang chủ (root)
    const isInPages = window.location.pathname.includes('/pages/');
    const rootPath = isInPages ? '../' : './';
    const pagesPath = isInPages ? './' : './pages/';

    // Định nghĩa đường dẫn chuẩn
    const p = {
        home: `${rootPath}index.html`,
        about: `${pagesPath}about.html`,
        tips: `${pagesPath}tips.html`,
        faq: `${pagesPath}FAQ.html`,
        typing: `${pagesPath}typing.html`,
        login: `${rootPath}login.html`,
        settings: `${pagesPath}settings.html`
    };

    // 2. Render khung HTML
    const navHTML = `
        <div class="nav-left">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <a href="${p.home}" class="logo" style="text-decoration: none; color: white;">&lt;NoobDev/&gt;</a>
        </div>
        
        <div class="nav-links">
            <a href="${p.home}">${t.navHome}</a>
            <a href="${p.about}">${t.navAbout}</a>
            <a href="${p.tips}">${t.navTips}</a>
            <a href="${p.faq}">${t.navFAQ}</a>
            <a href="${p.typing}">${t.navTyping}</a>
            
            <div class="lang-menu-container">
                <button class="lang-menu-btn" id="langMenuBtn">
                    <i class="fas fa-globe"></i>
                    <span class="lang-text">${isVi ? 'Tiếng Việt' : 'English'}</span>
                    <i class="fas fa-chevron-down arrow-icon"></i>
                </button>
                <div class="lang-dropdown" id="langDropdown">
                    <a href="#" data-lang="en" class="${!isVi ? 'active' : ''}">English</a>
                    <a href="#" data-lang="vi" class="${isVi ? 'active' : ''}">Tiếng Việt</a>
                </div>
            </div>
            
            <div id="auth-section" class="auth-wrapper">
                <div class="loading-spinner">...</div> 
            </div>
        </div>
    `;

    const navElement = document.querySelector('nav');
    if (navElement) navElement.innerHTML = navHTML;

    // 2. Logic Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    if(menuToggle && sideMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideMenu.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                sideMenu.classList.remove('active');
            }
        });
    }

    // 3. Xử lý đổi ngôn ngữ (Dropdown)
    const langBtn = document.getElementById('langMenuBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
            langBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
            }
        });

        langDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = e.target.getAttribute('data-lang');
                if (selectedLang && selectedLang !== lang) {
                    localStorage.setItem('language', selectedLang);
                    location.reload();
                }
                langDropdown.classList.remove('show');
            });
        });
    }

    // 3. Xử lý User Login/Logout
    auth.onAuthStateChanged((user) => {
        const authDiv = document.getElementById('auth-section');
        if (!authDiv) return;

        if (user) {
            // --- TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP ---
            
            // 1. Xử lý Avatar: Ưu tiên ảnh upload -> sau đó đến chữ cái đầu
            let avatarHTML = '';
            if (user.photoURL) {
                avatarHTML = `<img src="${user.photoURL}" alt="Avatar" class="nav-avatar-img">`;
            } else {
                const firstLetter = user.displayName ? user.displayName.charAt(0).toUpperCase() : "U";
                avatarHTML = `<div class="nav-avatar-text">${firstLetter}</div>`;
            }

            // 2. Render HTML mới (Dạng nút bấm gọn gàng)
            authDiv.innerHTML = `
                <div class="user-menu-container">
                    <button class="user-menu-btn" id="userMenuBtn">
                        <span class="nav-username">${user.displayName || 'User'}</span>
                        ${avatarHTML}
                        <i class="fas fa-chevron-down arrow-icon"></i>
                    </button>
                    
                    <div class="user-dropdown" id="userDropdown">
                        <div class="dropdown-header">
                            <span class="greeting">Signed in as</span>
                            <span class="email">${user.email}</span>
                        </div>
                        <div class="dropdown-links">
                            <a href="${p.home}"><i class="fas fa-home"></i> Dashboard</a>
                            <a href="${p.typing}"><i class="fas fa-keyboard"></i> Practice</a>
                            <a href="${p.settings}"><i class="fas fa-cog"></i> Settings</a>
                            <div class="divider"></div>
                            <a href="#" id="btn-logout-nav" class="logout-item"><i class="fas fa-sign-out-alt"></i> Logout</a>
                        </div>
                    </div>
                </div>
            `;

            // 3. Sự kiện Click Dropdown
            const btn = document.getElementById('userMenuBtn');
            const dropdown = document.getElementById('userDropdown');
            const logoutBtn = document.getElementById('btn-logout-nav');

            // Toggle menu
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
                btn.classList.toggle('active');
            });

            // Đóng menu khi click ra ngoài
            document.addEventListener('click', (e) => {
                if (!authDiv.contains(e.target)) {
                    dropdown.classList.remove('show');
                    btn.classList.remove('active');
                }
            });

            // Xử lý Logout
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await logoutUser();
                window.location.href = "/login.html";
            });

        } else {
            // --- TRƯỜNG HỢP CHƯA ĐĂNG NHẬP ---
            authDiv.innerHTML = `<a href="${p.login}" class="nav-login-btn">${t.navLogin}</a>`;
        }
    });

    // 4. Highlight Active Link
    const currentPath = window.location.pathname.split('/').pop(); // Lấy tên file cuối cùng
    document.querySelectorAll('.nav-links > a').forEach(link => {
        if(link.getAttribute('href').includes(currentPath) && currentPath !== '') {
            link.classList.add('active');
        }
    });
}