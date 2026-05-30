import { image, navItems, site } from "./content.js";

const getActiveSection = () => {
  const page = document.body.dataset.page || "home";

  if (page.startsWith("article")) return "articles";
  if (page.startsWith("scenario")) return "scenarios";

  return page;
};

const createLogo = (theme) => {
  const logoFile = theme === "light"
    ? "a04ae635-5b30-493f-9b73-b176401be58d 21.png"
    : "a04ae635-5b30-493f-9b73-b176401be58d 2.png";

  return `
    <a class="brand" href="/" aria-label="На главную">
      <img src="${image(logoFile)}" alt="">
      <span>
        <strong>${site.title}</strong>
        <small>${site.subtitle}</small>
      </span>
    </a>
  `;
};

const createNavLinks = (activeSection, extraClass = "") => navItems
  .map((item) => {
    const isActive = item.match === activeSection ? " is-active" : "";
    return `<a class="nav-link${isActive}${extraClass}" href="${item.href}">${item.label}</a>`;
  })
  .join("");

export const mountHeader = () => {
  const target = document.querySelector("[data-site-header]");
  if (!target) return;

  const theme = document.body.dataset.headerTheme || "dark";
  const mode = document.body.dataset.headerMode || "overlay";
  const activeSection = getActiveSection();

  target.innerHTML = `
    <header class="site-header site-header--${theme} site-header--${mode}" data-header>
      <div class="container site-header__inner">
        ${createLogo(theme)}
        <nav class="site-nav" aria-label="Основная навигация">
          ${createNavLinks(activeSection)}
        </nav>
        <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="mobile-panel" data-mobile-panel>
        <nav class="mobile-nav" aria-label="Мобильная навигация">
          ${createNavLinks(activeSection, " nav-link--mobile")}
        </nav>
      </div>
    </header>
  `;
};

export const mountFooter = () => {
  const target = document.querySelector("[data-site-footer]");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__spacer" aria-hidden="true"></div>
        <div class="footer-column">
          <h2>Навигация</h2>
          <a href="/">Главная</a>
          <a href="/articles">Статьи</a>
          <a href="/materials">Материалы</a>
          <a href="/scenarios">Сценарии</a>
          <a href="/contacts">Контакты</a>
        </div>
        <div class="footer-column">
          <h2>Полезное</h2>
          <a href="/articles">Блог-гайд</a>
          <a href="/materials">Файлы</a>
          <a href="/#gallery">Галерея</a>
        </div>
        <div class="footer-column">
          <h2>Контакты</h2>
          <p>${site.region}</p>
          <a href="${site.telegramUrl}" target="_blank" rel="noreferrer">Написать в Telegram</a>
          <a href="mailto:${site.email}">Написать на почту</a>
        </div>
      </div>
    </footer>
  `;
};

export const initMobileMenu = () => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-mobile-panel]");

  if (!header || !toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

export const mountChrome = () => {
  mountHeader();
  mountFooter();
  initMobileMenu();
};
