document.addEventListener('DOMContentLoaded', () => {
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