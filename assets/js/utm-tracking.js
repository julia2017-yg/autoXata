(function() {
  // 1️⃣ Получаем все UTM-параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {};

  urlParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utms[key] = value;
    }
  });

  // 2️⃣ Сохраняем UTM в localStorage текущего домена
  if (Object.keys(utms).length > 0) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');

    // ✅ 2.1 Если в URL нет UTM, но они есть в localStorage — добавляем их в адрес
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

    // 3️⃣ Подставляем UTM во все внутренние ссылки
    if (Object.keys(savedUtms).length > 0) {
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        // только внутренние ссылки
        if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.startsWith(window.location.origin)) {
          const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
          const targetUrl = new URL(href, base);

          for (const param in savedUtms) {
            targetUrl.searchParams.set(param, savedUtms[param]);
          }

          link.href = targetUrl.href;
        }
      });
    }

    // 4️⃣ Переключение языка — корректно сохраняем путь и UTM
    document.querySelectorAll('.lang-switch').forEach(link => {
      link.addEventListener('click', e => {
        if (Object.keys(savedUtms).length === 0) return;

        e.preventDefault();

        const href = link.getAttribute('href'); // берём ссылку прямо из меню
        let newPath = href;

        if (link.dataset.lang === "ru") {
          if (!href.startsWith("/ru/")) {
            newPath = "/ru" + (href.startsWith("/") ? href : "/" + href);
          }
        } else {
          newPath = href.replace(/^\/ru/, "") || "/";
        }

        const targetUrl = new URL(newPath, window.location.origin);

        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }

        window.location.href = targetUrl.href;
      });
    });
  });
})();
