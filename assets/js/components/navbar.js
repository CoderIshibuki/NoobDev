// assets/js/components/navbar.js
import { auth } from '../firebase/config.js';
import { logoutUser } from '../firebase/auth.js';

export function renderNavbar() {
    // 1. Render khung HTML cơ bản
    const navHTML = `
        <div class="nav-left">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo">&lt;NoobDev/&gt;</div>
        </div>
        
        <div class="nav-links">
            <a href="/index.html">Home</a>
            <a href="/pages/about.html">About</a>
            <a href="/pages/tips.html">Tips</a>
            <a href="/pages/faq.html">FAQ</a>
            <a href="/pages/typing.html">Typing</a>
            
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
                            <a href="/index.html"><i class="fas fa-home"></i> Dashboard</a>
                            <a href="/pages/typing.html"><i class="fas fa-keyboard"></i> Practice</a>
                            <a href="/pages/settings.html"><i class="fas fa-cog"></i> Settings</a>
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
            authDiv.innerHTML = `<a href="/login.html" class="nav-login-btn">Login</a>`;
        }
    });

    // 4. Highlight Active Link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links > a').forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}