document.addEventListener('DOMContentLoaded', () => {
  const months = {
    "Січня": 0, "Лютого": 1, "Березня": 2, "Квітня": 3, "Травня": 4, "Червня": 5,
    "Липня": 6, "Серпня": 7, "Вересня": 8, "Жовтня": 9, "Листопада": 10, "Грудня": 11
  };

  // Находим контейнер со статьями
  const container = document.querySelector('.ltn__blog-list-wrap');
  if (!container) return;

  // Получаем все статьи
  const articles = Array.from(container.querySelectorAll('.ltn__blog-item'));

  const parsedArticles = articles.map(article => {
    const dateEl = article.querySelector('.ltn__blog-date');
    if (!dateEl) return null;

    const dateText = dateEl.textContent.trim().replace(/\s+/g, ' '); 
    // Ожидание формата "1 Лютого, 2025"
    const match = dateText.match(/(\d+)\s+([А-Яа-яЇїІіЄєҐґ]+),\s+(\d{4})/);
    if (!match) return null;

    const [, day, monthName, year] = match;
    const timestamp = new Date(
      parseInt(year),
      months[monthName],
      parseInt(day)
    ).getTime();

    return { article, timestamp };
  }).filter(Boolean);

  // Сортируем по убыванию даты
  parsedArticles.sort((a, b) => b.timestamp - a.timestamp);

  // Очищаем контейнер и вставляем заново
  parsedArticles.forEach(({ article }) => container.appendChild(article));
});
