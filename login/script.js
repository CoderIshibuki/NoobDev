function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  document.body.appendChild(starsContainer);
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = Math.random() * 2 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
  }
}

// Gọi hàm tạo sao khi trang load
document.addEventListener('DOMContentLoaded', createStars);
// Thêm vào file script.js
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  document.body.appendChild(starsContainer);
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = Math.random() * 2 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createStars();
  
  // Code JavaScript gốc của bạn ở đây
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const forgotLink = document.getElementById('forgotLink');
  const backToSignIn = document.getElementById('backToSignIn');
  const container = document.getElementById('container');

  signUpButton.addEventListener('click', () => {
    container.classList.remove("forgot-panel-active");
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove("forgot-panel-active");
    container.classList.remove("right-panel-active");
  });

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add("forgot-panel-active");
  });

  backToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove("forgot-panel-active");
  });
});