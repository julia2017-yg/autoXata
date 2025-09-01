(function() {
  // 1️⃣ Получаем все UTM-параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {};

  urlParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utms[key] = value;
    }
  });

  // 2️⃣ Сохраняем UTM в localStorage
  if (Object.keys(utms).length > 0) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');

    // 3️⃣ Всегда подставляем UTM в URL, если их нет
    if (Object.keys(savedUtms).length > 0) {
      const currentUrl = new URL(window.location.href);
      let changed = false;

      for (const param in savedUtms) {
        if (!currentUrl.searchParams.has(param)) {
          currentUrl.searchParams.set(param, savedUtms[param]);
          changed = true;
        }
      }

      if (changed) {
        window.history.replaceState({}, "", currentUrl.href);
      }
    }

    // 4️⃣ Подставляем UTM во все внутренние ссылки
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Определяем базу для относительных ссылок
      if (
        href.startsWith('/') ||
        href.startsWith('./') ||
        href.startsWith('../') ||
        href.startsWith(window.location.origin)
      ) {
        const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
        const targetUrl = new URL(href, base);

        // Если мы на RU и ссылка внутренняя без /ru/, добавляем /ru/
        if (window.location.pathname.startsWith('/ru/') && !targetUrl.pathname.startsWith('/ru/')) {
          targetUrl.pathname = '/ru' + targetUrl.pathname;
        }

        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }

        link.href = targetUrl.href;
      }
    });

    // 5️⃣ Переключение языка — сохраняем текущую страницу и UTM
    document.querySelectorAll('.lang-switch').forEach(link => {
      link.addEventListener('click', e => {
        if (Object.keys(savedUtms).length === 0) return;

        e.preventDefault();

        let currentPath = window.location.pathname;
        let newPath;

        if (link.dataset.lang === "ru") {
          // 🇷🇺 на русскую → добавляем /ru/ если нет
          if (!currentPath.startsWith("/ru/")) {
            newPath = "/ru" + currentPath;
          } else {
            newPath = currentPath;
          }
        } else {
          // 🇺🇦 на укр → убираем /ru/
          if (currentPath.startsWith("/ru/")) {
            newPath = currentPath.replace(/^\/ru/, "") || "/";
          } else {
            newPath = currentPath;
          }
        }

        const targetUrl = new URL(newPath, window.location.origin);

        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }

        // Переходим на страницу с UTM и правильным языком
        window.location.href = targetUrl.href;
      });
    });
  });
})();
