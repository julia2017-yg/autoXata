document.addEventListener('DOMContentLoaded', () => {
  const { parse, compareDesc, isValid } = dateFns;
  const ukLocale = dateFnsLocaleUk;

  const container = document.querySelector('.ltn__blog-list-wrap');
  if (!container) return;

  const articles = Array.from(container.querySelectorAll('.ltn__blog-item'));

  const parsedArticles = articles.map(article => {
    const dateEl = article.querySelector('.ltn__blog-date');
    if (!dateEl) return null;

    // Берём текст после иконки
    let dateText = '';
    dateEl.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        dateText += node.textContent.trim() + ' ';
      }
    });
    dateText = dateText.trim();

    // Парсим дату: формат 'd MMMM, yyyy' - например, "21 Березня, 2025"
    const date = parse(dateText, 'd MMMM, yyyy', new Date(), { locale: ukLocale });
    if (!isValid(date)) return null;

    return { article, date };
  }).filter(Boolean);

  // Сортируем по убыванию даты
  parsedArticles.sort((a, b) => compareDesc(a.date, b.date));

  // Вставляем статьи заново в нужном порядке
  parsedArticles.forEach(({ article }) => container.appendChild(article));
});
