(function() {
  // 1️⃣ Получаем все UTM-параметры с текущего URL
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

  // 3️⃣ При загрузке страницы — подставляем UTM ко всем внутренним ссылкам
  document.addEventListener('DOMContentLoaded', () => {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');
    if (Object.keys(savedUtms).length === 0) return;

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');

      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.startsWith(window.location.origin)) {
        const targetUrl = new URL(href, window.location.origin);
        for (const param in savedUtms) {
          targetUrl.searchParams.set(param, savedUtms[param]);
        }
        link.href = targetUrl.href;
      }
    });
  });
})();
