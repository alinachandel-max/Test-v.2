# BirBir Prototype Build Playbook

Цель: быстро собирать кликабельные HTML-прототипы BirBir 1:1 с Figma, не теряя накопленные решения и не пересобирая каждый компонент заново.

## Главный Принцип

Для BirBir-прототипов не запускаем Lazyweb по умолчанию. Он не помогает в задачах, где источник правды уже есть в Figma. Рабочий путь: exact Figma node -> локальная библиотека -> локальные assets -> быстрая browser QA.

Если пользователь явно просит внешние референсы, тогда можно отдельно использовать research-инструменты. Для обычной сборки/правок BirBir UI - нет.

## Где Что Лежит

### Runtime Repo

`/Users/a.plotnikova/Desktop/Проекты/Test-v.2`

Это канонический каталог для HTML-прототипа, assets, `prototype-library` и GitHub Pages.

### Support Repo

`/Users/a.plotnikova/Desktop/Проекты/BirBir`

Там лежат правила, аналитика, support-доки и контекст. Runtime HTML/CSS/JS туда не складывать.

### Основные Экраны

- `index.html` - входная ссылка и главный экран.
- `seller-cabinet-screen.html` - кабинет продавца, открывается из таббара `Продажа`.
- `posting-flow-screen.html` - flow постановки, открывается из `+ Поставить объявление`.
- `profile-screen.html` - профиль и служебные переключатели.
- `birbir-home-screen.html`, `birbir-home-screen-v2.html` - варианты главной / reference screens.

### Библиотека

- `prototype-library/birbir-prototype-library.css` - общие стили, компоненты, layout patterns.
- `prototype-library/birbir-prototype-library.js` - runtime renderers, карточки, таббар, общая логика.
- `prototype-library/posting-flow.js` - состояние и разметка flow постановки.
- `prototype-library/posting-flow-fixes.css` - scoped правки постановки, пока не вынесены в общий контракт.
- `prototype-library/icon-source-svg/` - локальные SVG-иконки.

Если компонент используется повторно, он должен жить в библиотеке, а не как новая экранная копия.

## Как Стартовать Новый Проект

Минимальный переносимый набор:

1. Скопировать `prototype-library/`.
2. Скопировать нужные `assets/` подпапки или весь `assets/`, если проект должен открыть все текущие flow.
3. Скопировать стартовые HTML-файлы:
   - `index.html`
   - `seller-cabinet-screen.html`
   - `posting-flow-screen.html`
   - `profile-screen.html`
4. Скопировать `docs/birbir/`.
5. Проверить, что в новом `index.html` все flow доступны кликами, без отдельной разводящей страницы.
6. Поднять локальный сервер и проверить static refs.

Не переносить случайные `.DS_Store`, временные screenshots, short-lived Figma URLs и старые one-off variants, если они уже заменены library-компонентом.

## Figma Source

- BirBir App: `BPlqeBZM6wfvNTTeMDcu9f`
- General Library: `AUYmz4Daj3yFLfK13Q5pM4`
- BirBir Source of Truth page: `56932:78348`

Перед визуальной реализацией:

1. Открыть exact node из ссылки пользователя.
2. Получить `get_design_context`.
3. Получить `get_screenshot`.
4. Если это большой section, найти конкретный frame/child node.
5. Если node не читается, остановить visual implementation и сказать об этом.

Нельзя строить экран "примерно" по памяти.

## Полезные Node ID

- Главная: `60198:188334`
- Home recent search cards: `60318:99525`
- Home collections rail: `60198:190935`
- Home product card: `60198:190957`
- Кабинет продавца / продажа: `63820:177665`
- Техническая область status bar: `63820:177843`
- Постановка section: `62749:109022`
- Фото empty: `62749:109300`
- Фото после выбора: `62759:153161`
- Категория: `62778:115762`
- Цена: `62785:114831`
- Место сделки: `62786:113158`
- Контакты: `63820:126973`
- Success animation: `63780:197113`
- Posting title style: `62608:87234` -> `24/29`, `700`, letter-spacing `0`

Этот список не заменяет инспекцию: если пользователь дал новую ссылку, проверяем новую ссылку.

## Assets

Все финальные assets должны быть локальными:

- `assets/category/`
- `assets/home-collections/`
- `assets/home-feed/`
- `assets/posting-flow/`
- `assets/seller-cabinet/`
- `assets/profile/`

Если новые баннеры/картинки выгружены на рабочий стол, забрать их в отдельную подпапку `assets/<screen-or-flow>/`. Не оставлять в коде временные Figma MCP URLs.

## Быстрый Цикл Работы

1. Сначала найти владельца кода через `rg`: класс, компонент, рендерер, asset.
2. Определить тип правки:
   - `screen-specific`
   - `component-contract`
   - `token/foundation`
   - `behavioral`
3. Если правка повторяется на 2+ местах, чинить библиотеку.
4. Перед edit коротко объяснить пользователю, что меняется.
5. Вносить узкие правки через `apply_patch`.
6. Поднять cache version у CSS/JS, если браузер может кешировать.
7. Проверить локально: `curl`, computed styles / screenshot, JS syntax when relevant.

## Подтвержденные UI-Решения

- Не рисовать внутренний iOS status bar `9:41`.
- На главной можно красить browser status area через `theme-color` в розовый; на flow постановки - белый.
- Не добавлять технические верхние полосы на каждую страницу.
- Общий page gutter обычно 16.
- Отступ от sticky header до content в posting shell - 4.
- M-кнопки - 50px высотой, radius 16.
- Bottom CTA - у нижнего края, padding `4px + safe-area`; не должен висеть высоко.
- Искусственную клавиатуру не показывать.
- Для фото: клик по `+` сразу открывает fake gallery; permission alert не нужен.
- В выбранной сетке фото не показывать ошибочный tile, крестик или текст `Ошибка`, если этого нет в Figma.
- В posting flow имя в контактах предзаполнено.
- Обязательное поле в характеристиках сейчас только `Состояние`.
- Ошибки должны совпадать с Figma: цвета, обводки, заливки, без лишнего toast.
- Badge logic: первый бейдж может быть с текстом, остальные - icon-only, если Figma не говорит иначе.
- Seller tabs кроме активного можно временно отключать для стабильного прототипа.

## Posting Success Animation

Источник: video/Figma node `63780:197113`.

Поведение:

1. Первый кадр почти сразу переходит во второй.
2. Зеленая галка увеличивается с bouncy-эффектом.
3. Confetti находится за иконкой, вырастает из-за нее и снова скрывается за ней.
4. Потом появляются promo cards и bottom actions.
5. Toast не нужен.

Assets:

- `assets/posting-flow/success-check.svg`
- `assets/posting-flow/success-confetti.png`
- `assets/posting-flow/success-promo-maxi.png`
- `assets/posting-flow/success-promo-up.png`

## Haptics

Для статического HTML использовать только best-effort:

```js
if (navigator.vibrate) navigator.vibrate(10);
```

Chrome Android может сработать. iOS Safari чаще всего не поддерживает Vibration API, поэтому нельзя обещать, что вибрация будет работать в Safari без native wrapper.

## QA Минимум

- Exact Figma node прочитан.
- Локальная страница открывается.
- Нет битых local asset refs.
- Для CSS: computed styles совпадают с Figma tokens.
- Для JS: `node --check` измененного файла.
- Для mobile: viewport около `390x844`, проверить safe-area и bottom CTA.
- Для публикации: проверить public `index.html` и click-through до нужного flow.

## Публикация

Публичный entry:

`https://alinachandel-max.github.io/Test-v.2/index.html`

Не делать разводящую страницу, если пользователь ее не просит. Все flow должны открываться через сам продукт:

`index.html` -> таббар `Продажа` -> кабинет -> `+ Поставить объявление` -> posting flow.

Если `git push` через HTTPS не работает из-за credentials, не делать destructive reset. Сначала проверить diff и использовать доступный GitHub workflow/connector.
