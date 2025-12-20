// assets/js/main.js

// 1. Import các thành phần
import { renderNavbar } from './components/navbar.js';
import { initStars } from './ui/effects.js';
import { initLanguage } from './ui/language.js';

// 2. Chạy khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 App Started");

    // Hiển thị Menu
    renderNavbar();

    // Tạo hiệu ứng nền
    initStars();

    // Cài đặt ngôn ngữ
    initLanguage();
});