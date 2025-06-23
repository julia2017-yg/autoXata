(function () {
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  // Сохраняем UTM при первом заходе
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  utmKeys.forEach(k => {
    if (params.has(k)) utms[k] = params.get(k);
  });
  if (Object.keys(utms).length) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  // Добавляем UTM ко всем локальным ссылкам
  function appendUTMToLinks() {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');
    if (!Object.keys(savedUtms).length) return;

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Проверяем: если ссылка локальная
      if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.startsWith(window.location.origin)) {
        const url = new URL(href, window.location.origin);
        for (let k in savedUtms) {
          url.searchParams.set(k, savedUtms[k]);
        }
        link.href = url.href;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', appendUTMToLinks);
})();
