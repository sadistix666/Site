# Дед Мороз: опыт, советы, практика

Статический фронтенд-проект по готовому макету. Используются только HTML, CSS и JS без фреймворков. Сейчас проект собирается как локальная рабочая версия; `vercel.json` оставлен как заготовка на потом для чистых URL `/articles/:slug` и `/scenarios/:slug`.

## Команды

```bash
npm run dev
npm run build
```

`npm run dev` запускает локальный сервер на `http://localhost:4173`.
`npm run build` проверяет наличие обязательных страниц, ассетов и базовых настроек деплоя.

## Структура

```text
.
├── index.html
├── articles/
│   ├── index.html
│   └── post.html
├── scenarios/
│   ├── index.html
│   └── post.html
├── materials/
│   └── index.html
├── contacts/
│   └── index.html
├── public/
│   └── assets/
│       ├── images/
│       └── mockups/
├── src/
│   ├── css/styles.css
│   └── js/
│       ├── components.js
│       ├── content.js
│       └── main.js
├── scripts/
│   ├── check-site.mjs
│   └── dev-server.mjs
└── vercel.json
```

## Где что менять

- Общие цвета, сетка 12 колонок, типографика, адаптив и hover-состояния: `src/css/styles.css`.
- Шапка, меню, футер и общие ссылки: `src/js/components.js`.
- Тексты, карточки статей, сценарии, материалы, контакты и пути к изображениям: `src/js/content.js`.
- Главная страница: `index.html` и блоки рендера в `src/js/main.js`.
- Каталог статей: `articles/index.html`, детальная статья: `articles/post.html`.
- Каталог сценариев: `scenarios/index.html`, детальный сценарий: `scenarios/post.html`.
- Материалы: `materials/index.html`.
- Контакты: `contacts/index.html`.
- PNG из макета: `public/assets/images/`.
- Полные экспортированные макеты для сверки: `public/assets/mockups/`.

## Деплой позже

1. Загрузите проект в GitHub.
2. Импортируйте репозиторий в Vercel.
3. Framework Preset: `Other`.
4. Build Command: `npm run build`.
5. Output Directory оставьте пустым или `.`.

Чистые адреса `/articles/s-chego-nachat-pervye-shagi` и `/scenarios/domashnii-standart` уже подготовлены через `vercel.json`, но публикация сейчас не выполняется.
