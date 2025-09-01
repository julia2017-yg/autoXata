window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader')
  preloader.classList.add('preloader--hidden')
  setTimeout(() => preloader.remove(), 500)
});