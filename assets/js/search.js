// ====================
// ДАННЫЕ СТАТЕЙ
// ====================
const articles = [
  {
    title: "Де і як перевірити авто за VIN-кодом",
    content: "VIN-код — звичний атрибут продажу авто. Але ті, хто не поглиблювався в автотематику, можуть не до кінця оцінити важливість цих символів. Спеціалісти ...",
    url: "./de-i-yak-pereviryty-avto-za-vin-kodom.html"
  },
  {
    title: "Чому варто купувати авто зі США: головні переваги та ризики",
    content: "Авто зі США часто приваблюють українців доступною ціною та кращою комплектацією. Але чи справді це вигідно, і які ризики варто врахувати ...",
    url: "./chy-varto-kupuvaty-avto-zi-ssha-plyusy-ta-minusy.html"
  },
  {
    title: "Як розмитнити авто в Україні",
    content: "Розмитнення авто — обовʼязний етап при імпорті машини з-за кордону. Але ті, хто стикається з цим уперше, не завжди розуміють порядок дій та можливі витрати...",
    url: "./yak-rozmytnyty-avto-v-ukrayini-pokrokova-instrukcziya.html"
  },
   {
    title: "Найкращі дизельні авто зі США",
    content: "Коли мова заходить про покупку дизельного авто, США не одразу спадають на думку як основний ринок...",
    url: "./najkrashhi-dyzelni-avto.html"
  },
   {
    title: "Електромобіль чи гібрид: що обрати у 2025 році?",
    content: "У 2025 році ринок екологічного транспорту пропонує безліч рішень...",
    url: "./elektromobil-chy-gibryd-shho-obraty-u-2025-roczi.html"
  },
   {
    title: "Найкращі авто для подорожей",
    content: "Найкращі авто для подорожей варто розглянути, особливо якщо ви плануєте далекі відстані...",
    url: "./najkrashhi-avto-dlya-podorozhej-komfort-i-nadijnist-na-daleki-vidstani.html"
  },
   {
    title: "ТОП 10 електромобілів із США",
    content: "Електромобілі стають дедалі популярнішими...",
    url: "./top-10-elektromobiliv-iz-ssha.html"
  },
   {
    title: "Популярні марки авто з США",
    content: "Щороку дедалі більше українців вирішують замовити автомобіль із США...",
    url: "./populyarni-marky-avto-z-ssha.html"
  },
  {
    title: "ТОП-10 найкращих авто для міста",
    content: "Найкращі авто для міста: ТОП-10 практичних моделей...",
    url: "./top-10-najkrashhyh-avto-dlya-mista.html"
  },
  {
    title: "Недорогі спортивні авто з США",
    content: "Мрієш про потужне, стильне та швидке авто...",
    url: "./nedorogi-sportyvni-avto-z-ssha.html"
  },
  {
    title: "Amazon представив найдешевший електрокар у США",
    content: "Slate Automotive зробила значний крок у розвиток автомобільної індустрії...",
    url: "./novyj-elektromobil-vid-amazon-najdeshevshyj-u-ssha.html"
  },
   {
    title: "Аналіз ринку вживаних авто зі США в Україні: статистика та популярні моделі",
    content: "У січні 2025 року українці зареєстрували приблизно 2600 вживаних легкових авто, ввезених зі Сполучених Штатів. Це демонструє незначне зниження попиту – близько 3% у порівнянні з попереднім місяцем. Найбільшу частку серед імпортованих машин зайняли бензинові моделі – 42%. Майже такий самий показник мають електрокари – 41%. Частка гібридів і дизельних авто становить по 6%, а ...",
    url: "./analiz-rynku-vzhyvanyh-avto-zi-ssha.html"
  },
   {
    title: "Найкращі б/у седани. ТОП 10",
    content: "На практиці багато українців стикаються з вибором: який саме седан придбати, щоб він поєднував якість, надійність та довговічність. Не менш важливі й інші характеристики — комфорт під час щоденного використання, економічність у витратах пального та адекватна ціна. Один із варіантів — звернути увагу на топові моделі седанів, доступні для замовлення зі США через офіційний сайт АвтоХата. Тут легко ...",
    url: "./najkrashhi-b-u-sedany-top-10.html"
  },
   {
    title: "Три гібридні седани, здатні подолати понад 320 тисяч км без серйозних поломок",
    content: "На основі численних рейтингів надійності ми відібрали три гібридні седани, які ......",
    url: "./nazvano-try-gibrydni-sedany.html"
  },
   {
    title: "Названо найпопулярніший кросовер світу у 2025 році",
    content: "Tesla Model Y утримала перше місце серед SUV, зібравши 1,09 мільйона продажів за рік. Попри невелике зниження на 1,2% у порівнянні з роком раніше, модель залишається беззаперечним фаворитом покупців. Другу сходинку посіла Toyota RAV4, яка показала позитивну динаміку: понад 1,02 мільйона проданих авто та зростання попиту на 10,7%...",
    url: "./nazvano-najpopulyarnishyj-krosover-svitu.html"
  },
   {
    title: "Флагмани: ТОП-10 найдорожчих електромобілів українського ринку",
    content: "AUTOGEEK проаналізував український ринок та склав рейтинг найдорожчих електрокарів. У списку переважають німецькі бренди, але є і винятки. Одним з них став Rolls-Royce Spectre — перший електричний автомобіль марки, створений на базі Phantom і Cullinan. Його дизайн перегукується з моделлю Wraith, зокрема завдяки фірмовим дверям, що відчиняються проти руху...",
    url: "./flagmany-top-10-najdorozhchyh-elektromobiliv.html"
  },
  {
    title: "Найкращі хетчбеки ТОП 10",
    content: "Хетчбеки користуються популярністю завдяки...",
    url: "./najkrashhi-hetchbeky-top-10.html"
  },
  {
    title: "Який пробіг вважається нормальним для б/у авто",
    content: "При виборі вживаного автомобіля для придбання фахівці рекомендують уважно вивчити інформацію про пробіг...",
    url: "./kakoj-probeg-schitaetsya-normalnym-dlya-b-u-avto.html"
  }
  
];

// ====================
// ІНІЦІАЛІЗАЦІЯ FUSE
// ====================
const fuse = new Fuse(articles, {
  keys: ['title', 'content'],
  threshold: 0.3,
  minMatchCharLength: 2
});

// ====================
// ПОШУК І ВІДОБРАЖЕННЯ
// ====================
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const resultsList = document.getElementById('searchResults');

  if (!searchInput || !resultsList) return; // якщо елементи не знайдено

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    resultsList.innerHTML = '';

    if (query.length > 0) {
      const results = fuse.search(query);
      results.slice(0, 10).forEach(result => {
        const article = result.item;
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${article.url}"
             style="display:block; padding:0.5rem 0; text-decoration:none; color:inherit;">
             ${article.title}
          </a>
        `;
        resultsList.appendChild(li);
      });
    }
  });
});
