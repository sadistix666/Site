import {
  articles,
  benefits,
  contacts,
  gallery,
  image,
  materials,
  routeCards,
  scenarios,
  timeline
} from "./content.js";
import { mountChrome } from "./components.js";

const bySelector = (selector) => document.querySelector(selector);

const articleCatalogOrder = [
  "s-chego-nachat-pervye-shagi",
  "kostyum-i-boroda",
  "rekvizit-bez-peregruza",
  "kak-prosit-otzyv",
  "pervoe-znakomstvo",
  "posle-vyezda"
];

const homeArticleOrder = [
  "s-chego-nachat-pervye-shagi",
  "kostyum-i-boroda",
  "pervoe-znakomstvo",
  "rekvizit-bez-peregruza"
];

const pickArticles = (order) => order
  .map((slug) => articles.find((article) => article.slug === slug))
  .filter(Boolean);

const getSlugFromPath = (section) => {
  const params = new URLSearchParams(window.location.search);
  const paramSlug = params.get("slug");
  const parts = window.location.pathname.split("/").filter(Boolean);
  const lastPart = parts.at(-1) || "";

  if (paramSlug) return paramSlug;
  if (lastPart === section || lastPart === "post" || lastPart === "post.html") return "";

  return decodeURIComponent(lastPart.replace(".html", ""));
};

const renderBenefits = () => {
  const target = bySelector("[data-benefits]");
  if (!target) return;

  target.innerHTML = benefits.map((item) => `
    <article class="feature-card">
      <img src="${image(item.icon)}" alt="">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
};

const renderTimeline = () => {
  const target = bySelector("[data-timeline]");
  if (!target) return;

  target.innerHTML = timeline.map((item, index) => `
    <article class="timeline__item">
      <img src="${image(item.icon)}" alt="">
      <span>${index + 1}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
};

const renderRouteCards = () => {
  const target = bySelector("[data-route-cards]");
  if (!target) return;

  target.innerHTML = routeCards.map((item) => `
    <a class="route-card" href="${item.href}" style="--card-image: url('${image(item.image)}')">
      <span>
        <strong>${item.title}</strong>
        <small>${item.text}</small>
        <em>Перейти в раздел</em>
      </span>
    </a>
  `).join("");
};

const articleCard = (article, compact = false) => `
  <article class="article-card${compact ? " article-card--compact" : ""}">
    ${compact ? `<img src="${image(article.cardImage)}" alt="">` : ""}
    <div class="article-card__body">
      <h3>${article.title}</h3>
      <p>${article.lead}</p>
      <div class="article-card__bottom">
        <span>${article.readTime}</span>
        <a class="button button--outline" href="/articles/${article.slug}">Читать</a>
      </div>
    </div>
  </article>
`;

const renderHomeArticles = () => {
  const target = bySelector("[data-home-articles]");
  if (!target) return;

  target.innerHTML = pickArticles(homeArticleOrder).map((article) => articleCard(article, true)).join("");
};

const renderArticleList = () => {
  const target = bySelector("[data-article-list]");
  if (!target) return;

  target.innerHTML = pickArticles(articleCatalogOrder).map((article) => articleCard(article)).join("");
};

const renderFirstArticleDetail = (article) => `
  <div class="container article-layout reveal">
    <header class="article-layout__intro">
      <a class="back-link" href="/articles">Назад к статьям</a>
      <h1>${article.title}</h1>
      <p>${article.lead}</p>
    </header>
    <figure class="article-layout__hero-photo">
      <img src="${image(article.detailImage)}" alt="${article.title}">
    </figure>

    <section class="article-layout__section article-layout__section--first">
      <h2>1. ${article.sections[0].title}</h2>
      <p>${article.sections[0].body}</p>
      <p class="article-layout__subhead">Пригодится, если вы хотите:</p>
      <ul class="icon-list icon-list--snow">
        <li>Порадовать детей и создать сказку</li>
        <li>Получить дополнительный доход в сезон</li>
        <li>Раскрыть творческие способности</li>
        <li>Найти интересное дело на короткий срок</li>
      </ul>
    </section>

    <figure class="article-layout__photo article-layout__photo--left">
      <img src="${image(article.extraImages[0])}" alt="Домашнее поздравление с Дедом Морозом и Снегурочкой">
    </figure>

    <div class="article-layout__side">
      <section class="article-layout__section">
        <h2>2. ${article.sections[1].title}</h2>
        <ol class="number-list">
          ${article.sections[1].list.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </section>
      <section class="article-layout__section">
        <h2>3. ${article.sections[2].title}</h2>
        <ul class="icon-list icon-list--snow">
          ${article.sections[2].list.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    </div>

    <section class="article-layout__section article-layout__errors">
      <h2>4. ${article.sections[3].title}</h2>
      <ul class="icon-list icon-list--cross">
        ${article.sections[3].list.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <figure class="article-layout__photo article-layout__photo--right">
      <img src="${image(article.extraImages[1])}" alt="Фотография после поздравления">
    </figure>

    <section class="article-layout__section article-layout__conclusion">
      <h2>5. Вывод</h2>
      ${article.conclusion.split("\n\n").map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>
  </div>
`;

const renderArticleDetail = () => {
  const target = bySelector("[data-article-detail]");
  if (!target) return;

  const slug = getSlugFromPath("articles");
  const article = articles.find((item) => item.slug === slug) || articles[0];
  document.title = `${article.title} - Дед Мороз`;

  if (article.slug === "s-chego-nachat-pervye-shagi") {
    target.innerHTML = renderFirstArticleDetail(article);
    return;
  }

  target.innerHTML = `
    <div class="container article-detail__grid reveal">
      <header class="article-detail__header">
        <a class="back-link" href="/articles">Назад к статьям</a>
        <h1>${article.title}</h1>
        <p>${article.lead}</p>
      </header>
      <figure class="article-detail__figure">
        <img src="${image(article.detailImage)}" alt="${article.title}">
      </figure>
      <div class="article-detail__content">
        ${article.sections.map((section, index) => `
          <section>
            <h2>${index + 1}. ${section.title}</h2>
            ${section.body ? `<p>${section.body}</p>` : ""}
            ${section.list ? `<ul class="icon-list icon-list--snow">${section.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
          </section>
        `).join("")}
        <section>
          <h2>Вывод</h2>
          <p>Уверенность приходит через подготовку, внимание к деталям и спокойный темп. Начните с простой структуры, а после каждого выезда фиксируйте, что можно улучшить.</p>
        </section>
      </div>
    </div>
  `;
};

const scenarioCard = (scenario) => `
  <article class="scenario-card">
    <h3>${scenario.title}</h3>
    <div class="tag-row">
      <span>${scenario.age}</span>
      <span>${scenario.duration}</span>
      <span>${scenario.format}</span>
    </div>
    <p>${scenario.lead}</p>
    <p class="scenario-card__props">Реквизит: ${scenario.props}</p>
    <div class="scenario-card__actions">
      <a class="button button--primary" href="/scenarios/${scenario.slug}">Открыть</a>
      <a class="button button--outline" href="/materials">Скачать</a>
    </div>
  </article>
`;

const renderScenarioList = () => {
  const target = bySelector("[data-scenario-list]");
  if (!target) return;

  target.innerHTML = scenarios.map((scenario) => scenarioCard(scenario)).join("");
};

const renderScenarioDetail = () => {
  const target = bySelector("[data-scenario-detail]");
  if (!target) return;

  const slug = getSlugFromPath("scenarios");
  const scenario = scenarios.find((item) => item.slug === slug) || scenarios[0];
  document.title = `${scenario.title} - Дед Мороз`;

  target.innerHTML = `
    <div class="container scenario-detail__grid reveal">
      <header class="scenario-detail__header">
        <a class="back-link" href="/scenarios">Назад к сценариям</a>
        <h1>${scenario.title}</h1>
        <p>${scenario.lead}</p>
      </header>
      <aside class="scenario-params">
        <h2>Параметры</h2>
        <p><strong>Возраст:</strong> ${scenario.age}</p>
        <p><strong>Длительность:</strong> ${scenario.duration}</p>
        <p><strong>Формат:</strong> ${scenario.format}</p>
        <p><strong>Реквизит:</strong> ${scenario.props}</p>
      </aside>
      <section class="scenario-steps">
        <h2>Коротко по шагам</h2>
        <ol>
          ${scenario.steps.map((step) => `<li><span>${step}</span></li>`).join("")}
        </ol>
      </section>
      <section class="scenario-table">
        <h2>Регламент по этапам</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Этап</th>
                <th>Цель</th>
                <th>Длительность</th>
                <th>Если ребенок не включается</th>
              </tr>
            </thead>
            <tbody>
              ${(scenario.tableRows || scenario.steps.map((step, index) => [
                step,
                index === 0 ? "Создать ощущение праздника" : "Поддержать спокойный контакт",
                index === 3 ? "3-4 мин" : "2-3 мин",
                index < 2 ? "Замедлить темп и дать время" : "Упростить условия и предложить выбор"
              ])).map((row) => `
                <tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                  <td>${row[2]}</td>
                  <td>${row[3]}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p>${scenario.detailBody || "Сценарий гибкий: адаптируйте порядок реплик под реакцию ребенка, но сохраняйте ясную структуру входа, контакта, активности, подарка и короткого финала."}</p>
      </section>
    </div>
  `;
};

const renderMaterials = () => {
  const target = bySelector("[data-material-list]");
  if (!target) return;

  target.innerHTML = materials.map((item) => `
    <article class="material-card">
      <div>
        <span class="pdf-badge">PDF</span>
        <h3>${item.title}</h3>
      </div>
      <p>${item.text}</p>
      <small>${item.pages}</small>
      <a class="button button--outline" href="#materials-note">Скачать</a>
    </article>
  `).join("");
};

const renderContacts = () => {
  const target = bySelector("[data-contact-list]");
  if (!target) return;

  target.innerHTML = contacts.map((contact) => `
    <a class="contact-card" href="${contact.href}" ${contact.href.startsWith("http") ? "target=\"_blank\" rel=\"noreferrer\"" : ""}>
      <span class="contact-card__icon" aria-hidden="true">
        <img src="${image(contact.icon)}" alt="">
      </span>
      <span>
        <small>${contact.label}</small>
        <strong>${contact.value}</strong>
      </span>
    </a>
  `).join("");
};

const renderGallery = () => {
  const target = bySelector("[data-gallery]");
  if (!target) return;

  target.innerHTML = gallery.map((fileName, index) => `
    <img src="${image(fileName)}" alt="Фотография из галереи ${index + 1}">
  `).join("");
};

const initRevealAnimation = () => {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  items.forEach((item) => observer.observe(item));
};

const init = () => {
  mountChrome();
  renderBenefits();
  renderTimeline();
  renderRouteCards();
  renderHomeArticles();
  renderArticleList();
  renderArticleDetail();
  renderScenarioList();
  renderScenarioDetail();
  renderMaterials();
  renderContacts();
  renderGallery();
  initRevealAnimation();
};

init();
