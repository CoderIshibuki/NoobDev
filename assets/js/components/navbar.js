// assets/js/components/navbar.js
import { auth } from '../firebase/config.js';
import { logoutUser } from '../firebase/auth.js';

export function renderNavbar() {
    // 1. Render HTML (Lưu ý các đường dẫn bắt đầu bằng dấu /)
    const navHTML = `
        <div class="nav-left">
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
            <div class="logo">&lt;NoobDev/&gt;</div>
        </div>
        <div class="nav-links">
            <a href="/index.html">Home</a>
            <a href="/pages/about.html">About</a>
            <a href="/pages/tips.html">Tips</a>
            <a href="/pages/faq.html">FAQ</a>
            <a href="/pages/typing.html">Typing</a>
            
            <div id="auth-section" class="auth-section">
                <div class="loading-spinner">...</div> 
            </div>
        </div>
    `;

    const navElement = document.querySelector('nav');
    if (navElement) navElement.innerHTML = navHTML;

    // 2. Logic Mobile Menu (Toggle)
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

    // 3. Lắng nghe trạng thái đăng nhập để đổi nút Login/Avatar
    auth.onAuthStateChanged((user) => {
        const authDiv = document.getElementById('auth-section');
        if (!authDiv) return;

        if (user) {
            // A. Đã đăng nhập: Hiện Avatar + Menu dropdown
            // Lấy chữ cái đầu làm avatar nếu không có ảnh
            const firstLetter = user.displayName ? user.displayName.charAt(0).toUpperCase() : "U";
            // Avatar giả lập (nếu muốn làm upload ảnh thật cần logic Storage phức tạp hơn)
            const avatarHtml = `<div class="user-avatar-circle">${firstLetter}</div>`;

            authDiv.innerHTML = `
                <div class="user-profile-nav" id="userProfileNav">
                    <div class="user-info-group">
                        ${avatarHtml}
                        <div class="user-name">${user.displayName}</div>
                    </div>
                    
                    <div class="profile-dropdown-nav">
                        <a href="/dashboard.html">🏠 Dashboard</a>
                        <a href="/pages/typing.html">⌨️ Practice</a>
                        <a href="/pages/settings.html">⚙️ Settings</a>
                        <div class="divider"></div>
                        <a href="#" id="btn-logout-nav" style="color: #ff6b6b;">🚪 Logout</a>
                    </div>
                </div>
            `;

            // Sự kiện Logout
            document.getElementById('btn-logout-nav').addEventListener('click', async (e) => {
                e.preventDefault();
                await logoutUser();
                window.location.href = "/login.html";
            });

            // Sự kiện Toggle Dropdown
            const userNav = document.getElementById('userProfileNav');
            userNav.addEventListener('click', () => {
                userNav.classList.toggle('active');
            });

        } else {
            // B. Chưa đăng nhập: Hiện nút Login
            authDiv.innerHTML = `<a href="/login.html" class="login-btn">Login</a>`;
        }
    });

    // 4. Highlight link đang active (Để biết mình đang ở trang nào)
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        // So sánh đường dẫn tương đối
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}