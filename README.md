# BirBir HTML Prototype

Этот репозиторий — рабочий HTML-прототип BirBir.

## Source Of Truth Workflow

Перед любой новой сборкой экрана или большой правкой используем такой порядок:

1. `General Library`
2. Figma page `BirBir / Source of Truth`
3. [docs/birbir/source-of-truth.json](./docs/birbir/source-of-truth.json)
4. [docs/birbir/component-contracts.md](./docs/birbir/component-contracts.md)
5. target frame экрана

Если reusable component не привязан в source of truth, его нельзя silently пересобрать локально как новый one-off variant.

## Обязательные артефакты

- [docs/birbir/README.md](./docs/birbir/README.md)
- [docs/birbir/component-contracts.md](./docs/birbir/component-contracts.md)
- [docs/birbir/source-of-truth.json](./docs/birbir/source-of-truth.json)
- [docs/birbir/screen-preflight-template.md](./docs/birbir/screen-preflight-template.md)

## Правило изменений

Каждая новая правка сначала классифицируется как:

- `screen-specific`
- `component-contract`
- `token/foundation`
- `behavioral`

Если правка повторяется хотя бы на двух экранах, она не должна оставаться локальным override.

## Что считается красной зоной

Это типы поломок, которые нужно проверять первыми:

- safe area / top strip drift
- gutters / spacing drift
- full-screen page vs bottomsheet confusion
- chips text / selected logic drift
- badge text / icon drift
- range picker touch math and Safari behavior
- empty-state padding / grouping drift
- disabled states without product approval
- static HTML examples vs runtime renderer mismatch
- giant JS / CSS duplicate logic

## Быстрый рабочий цикл

1. Открыть `screen-preflight-template.md`
2. Разложить экран на canonical contracts
3. Проверить bindings в `source-of-truth.json`
4. Если binding отсутствует, сначала добавить canonical source в Figma
5. Только потом собирать экран
