// assets/js/pages/login-page.js
import { loginUser, registerUser } from '../firebase/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. XỬ LÝ ĐĂNG NHẬP
    const loginForm = document.querySelector('.sign-in-container form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Lấy value từ input (bạn cần thêm id hoặc querySelector name)
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const btn = loginForm.querySelector('button');

            btn.innerText = "Signing in...";
            const result = await loginUser(email, password);
            
            if (result.success) {
                window.location.href = "/dashboard.html"; // Chuyển trang
            } else {
                alert("Login Failed: " + result.message);
                btn.innerText = "Sign In";
            }
        });
    }

    // 2. XỬ LÝ ĐĂNG KÝ
    const signupForm = document.querySelector('.sign-up-container form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signupForm.querySelector('input[name="name"]').value; // Dựa vào name attribute cũ
            const email = signupForm.querySelector('input[name="email"]').value;
            const password = signupForm.querySelector('input[name="password"]').value;
            const btn = signupForm.querySelector('button');

            btn.innerText = "Creating Account...";
            const result = await registerUser(name, email, password);

            if (result.success) {
                alert("Account created! Redirecting...");
                window.location.href = "/dashboard.html";
            } else {
                alert("Error: " + result.message);
                btn.innerText = "Sign Up";
            }
        });
    }
});