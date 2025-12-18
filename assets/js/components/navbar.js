// assets/js/components/navbar.js
import { auth } from '../firebase/config.js';
import { logoutUser } from '../firebase/auth.js';

export function renderNavbar() {
    // HTML khung sườn của Navbar
    console.log("Navbar đang được render..."); 
    const navHTML = `
        <div class="nav-left"><div class="logo">NoobDev</div></div>
        <div class="nav-links">
            <a href="/index.html" id="link-home">Home</a>
            <a href="/pages/about.html">About</a>
            <a href="/pages/tips.html">Tips</a>
            <a href="/pages/faq.html">FAQ</a>
            <a href="/pages/typing.html">Typing</a>
            
            <div id="auth-section" class="auth-section">
                <div class="loading-spinner" style="color:white">...</div> 
            </div>
        </div>
        <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
    `;

    // 1. Chèn HTML vào thẻ <nav>
    const navElement = document.querySelector('nav');
    if (navElement) navElement.innerHTML = navHTML;

    // 2. Lắng nghe trạng thái đăng nhập (Real-time)
    auth.onAuthStateChanged((user) => {
        const authDiv = document.getElementById('auth-section');
        if (!authDiv) return;

        if (user) {
            // --- TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP ---
            // Lấy chữ cái đầu của tên để làm Avatar tạm nếu chưa có ảnh
            const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U';
            const avatarSrc = user.photoURL || `https://ui-avatars.com/api/?name=${initial}&background=random`;

            authDiv.innerHTML = `
                <div class="user-profile-nav" id="userProfileNav">
                    <div class="user-info">
                        <span class="u-name">${user.displayName}</span>
                        <img src="${avatarSrc}" class="u-avatar" alt="Avatar">
                    </div>
                    
                    <div class="profile-dropdown-nav">
                        <a href="/dashboard.html">🏠 Dashboard</a>
                        <a href="/pages/settings.html">⚙️ Settings</a>
                        <div class="divider"></div>
                        <a href="#" id="btn-logout-nav" style="color: #ff6b6b;">🚪 Logout</a>
                    </div>
                </div>
            `;

            // Gắn sự kiện Logout
            document.getElementById('btn-logout-nav').addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
            });

            // Gắn sự kiện Click để mở Dropdown
            const userNav = document.getElementById('userProfileNav');
            userNav.addEventListener('click', () => {
                userNav.classList.toggle('active');
            });

        } else {
            // --- TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP ---
            authDiv.innerHTML = `<a href="/login.html" class="login-btn">Login</a>`;
        }
    });

    // 3. Highlight link đang active (Ví dụ đang ở trang Home thì Home sáng lên)
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}