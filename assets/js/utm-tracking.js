(function() {
  const domain = 'https://autoxata.mk.ua';

  // 1️⃣ Получаем все UTM-параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {};
  urlParams.forEach((value, key) => {
    if (key.startsWith('utm_')) utms[key] = value;
  });

  // 2️⃣ Сохраняем UTM в localStorage
  if (Object.keys(utms).length > 0) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');

    // 2.1 Если в URL нет UTM, но они есть в localStorage — добавляем их
    if (Object.keys(savedUtms).length > 0) {
      const currentUrl = new URL(window.location.href);
      let changed = false;
      for (const param in savedUtms) {
        if (!currentUrl.searchParams.has(param)) {
          currentUrl.searchParams.set(param, savedUtms[param]);
          changed = true;
        }
      }
      if (changed) window.history.replaceState({}, "", currentUrl.href);
    }

    // 3️⃣ Подставляем UTM во все внутренние ссылки
    if (Object.keys(savedUtms).length > 0) {
      document.querySelectorAll('a[href]').forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        // Всегда формируем абсолютный URL через домен
        const url = new URL(href, domain);

        // Если на RU и ссылка внутренняя без /ru/, добавляем /ru/
        if (window.location.pathname.startsWith('/ru/') && !url.pathname.startsWith('/ru/')) {
          url.pathname = url.pathname === '/' ? '/ru/' : '/ru' + url.pathname;
        }

        // Добавляем UTM
        for (const param in savedUtms) {
          url.searchParams.set(param, savedUtms[param]);
        }

        link.href = url.href;
      });
    }

    // 4️⃣ Переключение языка
    document.querySelectorAll('.lang-switch').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();

        const currentPath = window.location.pathname;
        let newPath;

        if (link.dataset.lang === "ru") {
          newPath = currentPath.startsWith('/ru/') ? currentPath : (currentPath === '/' ? '/ru/' : '/ru' + currentPath);
        } else {
          newPath = currentPath.startsWith('/ru/') ? currentPath.replace(/^\/ru/, '') || '/' : currentPath;
        }

        const targetUrl = new URL(domain + newPath);

        // Подставляем UTM
        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }

        window.location.href = targetUrl.href;
      });
    });
  });
})();
