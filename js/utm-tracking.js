(function () {
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const params = new URLSearchParams(window.location.search);
  const utms = {};
  utmKeys.forEach(k => {
    if (params.has(k)) utms[k] = params.get(k);
  });

  if (Object.keys(utms).length > 0) {
    localStorage.setItem('utmParams', JSON.stringify(utms));
  }

  function appendUTMToLinks() {
    const savedUtms = JSON.parse(localStorage.getItem('utmParams') || '{}');
    if (Object.keys(savedUtms).length === 0) return;

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      if (href.startsWith('/') || href.startsWith(window.location.origin)) {
        const url = new URL(href, window.location.origin);
        for (let k in savedUtms) {
          if (!url.searchParams.has(k)) url.searchParams.set(k, savedUtms[k]);
        }
        link.setAttribute('href', url.toString());
      }
    });
  }

  document.addEventListener('DOMContentLoaded', appendUTMToLinks);
})();
