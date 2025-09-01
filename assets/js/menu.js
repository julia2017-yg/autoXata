 document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.ltn__utilize-toggle');
    const mobileMenu = document.querySelector('#ltn__utilize-mobile-menu');
    const closeBtn = document.querySelector('.ltn__utilize-mobile-menu-close-btn');
    const overlay = document.querySelector('.ltn__utilize-overlay');
    const body = document.body;

    if (toggleBtn && mobileMenu && closeBtn && overlay) {
      toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        mobileMenu.classList.add('ltn__utilize-open');
        closeBtn.style.display = 'flex';
        overlay.style.display = 'block';
        body.classList.add('no-scroll'); // блокируем прокрутку
      });

      function closeMenu() {
        mobileMenu.classList.remove('ltn__utilize-open');
        closeBtn.style.display = 'none';
        overlay.style.display = 'none';
        body.classList.remove('no-scroll'); // разблокируем прокрутку
      }

      closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);
    }


  });