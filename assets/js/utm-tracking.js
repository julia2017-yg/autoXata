(function() {
  const domain = 'https://autoxata.mk.ua';

  // 1️⃣ Получаем все UTM-параметры из текущего URL
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

    // 3️⃣ Обновляем URL текущей страницы, если UTM есть в localStorage, но их нет в query
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

    // 4️⃣ Обновляем все внутренние ссылки
    document.querySelectorAll('a[href]').forEach(link => {
      let href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const targetUrl = new URL(href, domain);

      // Если мы на RU и ссылка внутренняя без /ru/, добавляем /ru/
      if (window.location.pathname.startsWith('/ru/') && !targetUrl.pathname.startsWith('/ru/')) {
        targetUrl.pathname = '/ru' + targetUrl.pathname;
      }

      // Добавляем UTM
      for (const param in savedUtms) {
        targetUrl.searchParams.set(param, savedUtms[param]);
      }

      link.href = targetUrl.href;
    });

    // 5️⃣ Переключение языка
    document.querySelectorAll('.lang-switch').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');

        let currentPath = window.location.pathname;
        let newPath;

        if (link.dataset.lang === 'ru') {
          if (!currentPath.startsWith('/ru/')) {
            newPath = currentPath === '/' ? '/ru/' : '/ru' + currentPath;
          } else {
            newPath = currentPath;
          }
        } else {
          if (currentPath.startsWith('/ru/')) {
            newPath = currentPath.replace(/^\/ru/, '') || '/';
          } else {
            newPath = currentPath;
          }
        }

        const targetUrl = new URL(domain + newPath);

        // Добавляем UTM
        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }

        window.location.href = targetUrl.href;
      });
    });
  });
})();
