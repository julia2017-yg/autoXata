document.addEventListener("DOMContentLoaded", () => {
  const currentLang = document.documentElement.lang || "ua";

  document.querySelectorAll(".lang-switch").forEach(link => {
    const lang = link.dataset.lang;

    // подсветка активного языка
    if (lang === currentLang) {
      link.style.color = "#ee253d";
      link.style.pointerEvents = "none";
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();

      let url = window.location.href;
      let newUrl;

      if (lang === "ru") {
        if (url.includes("/ru/")) {
          newUrl = url; // уже на русском
        } else if (/\.[a-zA-Z0-9]+$/.test(window.location.pathname)) {
          // если файл
          let parts = window.location.pathname.split("/");
          let filename = parts.pop();
          newUrl = window.location.origin + parts.join("/") + "/ru/" + filename;
        } else {
          // папка
          newUrl = window.location.origin + window.location.pathname.replace(/\/$/, "") + "/ru/";
        }
      }

      if (lang === "ua") {
        // просто убираем /ru/ из URL
        newUrl = url.replace("/ru/", "/");
      }

      window.location.href = newUrl;
    });
  });
});
