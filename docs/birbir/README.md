# BirBir Source Of Truth

Этот каталог — operational layer между `General Library`, рабочим Figma-файлом BirBir и HTML-прототипом в `Test-v.2`.

Figma page уже создана:
- file: `BirBir-App` (`BPlqeBZM6wfvNTTeMDcu9f`)
- page: `BirBir / Source of Truth`
- page id: `56932:78348`

Файлы:
- [component-contracts.md](./component-contracts.md) — human rules, change routing, QA
- [source-of-truth.json](./source-of-truth.json) — machine-readable bindings для canonical contracts
- [screen-preflight-template.md](./screen-preflight-template.md) — обязательный preflight перед новым экраном

Как использовать:
1. Перед любой новой сборкой экрана открыть `component-contracts.md`
2. Разложить экран на contracts
3. Проверить bindings в `source-of-truth.json`
4. Заполнить `screen-preflight-template.md`
5. Если binding отсутствует, сначала добавить canonical source в Figma, потом обновить JSON, потом собирать экран

Правило:
- если reusable contract не описан здесь, он не должен silently появляться в коде как новый one-off variant
