// assets/js/login-animation.js

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
	// Khi bấm Sign Up -> Thêm class để trượt panel sang phải
	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});

	// Khi bấm Sign In -> Xóa class để trượt về vị trí cũ
	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});
}