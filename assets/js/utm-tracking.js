(function() {
  const domain = 'https://autoxata.mk.ua';

  // 1️⃣ Получаем все UTM-параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {};
  urlParams.forEach((value, key) => {
    if (key.startsWith('utm_')) utms[key] = value;
  });

  // 2️⃣ Сохраняем UTM в localStorage
  if (Object.keys(utms).length) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');

    // 3️⃣ Если в URL нет UTM, добавляем их
    if (Object.keys(savedUtms).length) {
      const currentUrl = new URL(window.location.href);
      let changed = false;
      for (const param in savedUtms) {
        if (!currentUrl.searchParams.has(param)) {
          currentUrl.searchParams.set(param, savedUtms[param]);
          changed = true;
        }
      }
      if (changed) window.history.replaceState({}, '', currentUrl.href);
    }

    // 4️⃣ Функция для генерации URL с правильным языком и UTM
    function generateUrl(href) {
      const url = new URL(href, domain);
      const isRU = window.location.pathname.startsWith('/ru/');

      // Если текущая страница на RU и ссылка внутренняя
      if (isRU && url.origin === domain && !url.pathname.startsWith('/ru/')) {
        url.pathname = url.pathname === '/' ? '/ru/' : '/ru' + url.pathname;
      }

      // Если текущая страница на UA и ссылка начинается с /ru/, убрать /ru
      if (!isRU && url.pathname.startsWith('/ru/')) {
        url.pathname = url.pathname.replace(/^\/ru/, '') || '/';
      }

      // Добавляем все UTM
      for (const param in savedUtms) {
        url.searchParams.set(param, savedUtms[param]);
      }

      return url.href;
    }

    // 5️⃣ Подставляем UTM во все внутренние ссылки
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      link.href = generateUrl(href);
    });

    // 6️⃣ Переключение языка
    document.querySelectorAll('.lang-switch').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();

        const currentPath = window.location.pathname;
        let newPath;

        if (link.dataset.lang === 'ru') {
          newPath = currentPath.startsWith('/ru/') ? currentPath : (currentPath === '/' ? '/ru/' : '/ru' + currentPath);
        } else {
          newPath = currentPath.startsWith('/ru/') ? currentPath.replace(/^\/ru/, '') || '/' : currentPath;
        }

        window.location.href = generateUrl(newPath);
      });
    });
  });
})();
