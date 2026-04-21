# BirBir Component Contracts

## Purpose
Этот документ фиксирует BirBir-specific слой source of truth поверх `General Library`.

Его задача:
- перестать чинить одни и те же визуальные и behavioral баги по кругу
- собирать новые экраны только из канонических контрактов
- заранее понимать, где правка должна жить: в токенах, в компоненте, в экранном паттерне или в поведении

## Source Of Truth Stack
Порядок принятия решений всегда такой:

1. `General Library` для базовых компонентов, text styles, variables и icon primitives
2. `BirBir / Source of Truth` page в Figma для exact BirBir variants and states
3. `docs/birbir/source-of-truth.json` для machine mapping
4. Этот документ для implementation and QA rules
5. Конкретный target frame экрана

Правило:
- если компонент не зафиксирован в `BirBir / Source of Truth`, он не считается production-ready каноном для новых экранов

## Figma Page Structure
На странице `BirBir / Source of Truth` должны быть только четыре зоны:

1. `00 Foundations`
   - color aliases
   - typography aliases
   - spacing / radius / shadow
2. `10 Canonical Components`
   - exact BirBir variants из `General Library`
3. `20 Screen Patterns`
   - header shells, page shells, empty states, filter layouts, cards
4. `90 Reference Only`
   - legacy / exploratory / old variants

Нельзя смешивать `Reference Only` с canonical contracts.

## Required Preflight
Перед сборкой любого нового экрана или большого изменения:

1. Зафиксировать target node и убедиться, что это не legacy
2. Подтвердить, что target node реально читается через Figma inspection tools
3. Если target node не читается:
   - немедленно остановить visual implementation
   - сообщить пользователю, что Figma недоступна
   - не придумывать layout, spacing, copy или screen-specific blocks
   - запросить screenshot/export exact frame или восстановление доступа
4. Разложить экран на contracts
5. Для каждого contract найти binding в `source-of-truth.json`
6. Если binding нет:
   - сначала добавить canonical variant в Figma page
   - потом добавить entry в `source-of-truth.json`
   - только потом собирать экран
7. Классифицировать изменение:
   - `screen-specific`
   - `component-contract`
   - `token/foundation`
   - `behavioral`

Правило эскалации:
- если правка повторяется хотя бы на 2 экранах, она не должна жить как локальный override

Hard-stop rule:
- unreadable Figma node never authorizes guessed UI
- `screen-specific` visual work without readable source of truth запрещён
- допустимы только non-visual технические изменения, пока source of truth не восстановлен

## Breakage Clusters We Already Know
Это повторяющиеся типы поломок, которые нужно проверять в первую очередь:

- spacing / gutters / safe-area drift
- разные паттерны для одной сущности на home / results / detail
- локальные override поверх общего компонента
- путаница между full-screen page и bottomsheet
- chip text logic и selected logic
- badge text / icon drift
- range picker touch math и Safari behavior
- empty-state padding drift
- disabled states, которых не должно быть
- смешение legacy frame и target frame
- дублирующиеся функции и скрытые переопределения в giant JS/CSS

## Canonical Contracts
Ниже список контрактов, которые считаются первыми обязательными.

| Component Key | Figma Binding | Library Source | Code Owner | Typography / Tokens | Allowed States | Forbidden Deviations |
| --- | --- | --- | --- | --- | --- | --- |
| `safe_area_top_strip` | pending | BirBir screen pattern | `prototype-library.css` | white top strip, safe-top token | default | серый top strip, локальные градиенты на отдельных экранах |
| `search_header_shell` | pending | BirBir screen pattern | `prototype-library.css` + `birbir-home-screen.html` | gutter `16`, radius `16`, input `body/primary/400` | base, filled, sticky-down, sticky-up | отдельный header per screen без канона |
| `results_filter_chips_row` | pending | BirBir screen pattern | `prototype-library.css` + `birbir-prototype-library.js` | chip gap `6`, text `caption/primary/400`, page gutter `16` | base, compact, selected | разные font-weight, новые paddings без апдейта контракта |
| `results_secondary_row` | pending | BirBir screen pattern | `prototype-library.css` | text `caption/primary/400`, side inset `16` | region, sort | смещение по gutters, иной font token |
| `full_filters_page_shell` | pending | BirBir screen pattern | `prototype-library.css` + `birbir-home-screen.html` | header top spacing, white cards on gray page | default | bottomsheet-style shell, боковые белые полосы |
| `filter_bottomsheet_shell` | pending | BirBir screen pattern | `prototype-library.css` + `birbir-home-screen.html` | bottom-attached, content-height aware, footer safe-area | default, searchable, dual footer | vertical centering, fixed height without content fit |
| `filter_tabs` | pending | General Library variant adapted for BirBir | `prototype-library.css` + `birbir-prototype-library.js` | `caption/primary/400`, chip gap `6` | default, selected | font drift, ad-hoc paddings, non-canonical radii |
| `filter_range_picker` | pending | BirBir interaction pattern | `prototype-library.css` + `birbir-prototype-library.js` | visual inset `16`, bubble on interaction only | default, active, warning, error, keyboard focus | touch math drift, rerender during drag, thumb hit-area mismatch |
| `filter_action_buttons` | pending | General Library button variants | `prototype-library.css` | primary / secondary footer buttons | always-active unless explicitly specified | disabled styles by default, one-off button colors |
| `filter_radio` | `General-library 6007:1041` | General Library | `prototype-library.css` + `birbir-prototype-library.js` | design-system radio contract | default, selected | custom ad-hoc radio geometry |
| `filter_checkbox` | pending | General Library | `prototype-library.css` | checkbox face + centered checkmark | default, selected | drifting checkmark alignment |
| `preview_badges` | `BirBir-App 55604:127307` | BirBir card preview pattern | `birbir-prototype-library.js` + static demos in HTML | first badge with text, others icon-only | default, icon-only | badge text/icon drift between home/results/detail |
| `detail_seller_tags` | `BirBir-App 55604:127305` | BirBir detail pattern | `birbir-home-screen.html` + `prototype-library.css` | green tonal tag, chevron, canonical icons | `ID verified`, `PRO` | `Agency` / `Store` fallback text in detail |
| `results_empty_state` | `BirBir-App 52134:114648` | BirBir screen pattern | `birbir-prototype-library.js` + `prototype-library.css` | two separate white blocks, gap `4` | empty with recommendations | one merged white surface, wrong illustration |
| `results_recommendations_block` | pending | BirBir screen pattern | `prototype-library.css` + `birbir-prototype-library.js` | white card, 6 items, internal padding | empty-state recommendations | cards mixing into empty-text surface |
| `results_product_card` | `BirBir-App 55604:127307` | BirBir card preview pattern | `birbir-prototype-library.js` + `prototype-library.css` | price `heading/secondary/200`, title `caption/primary/400`, meta `caption/secondary/200` | default, discount, badges, installment | layout drift between preview/home/results |
| `old_price_crossed` | inherited from `results_product_card` | BirBir card preview pattern | `prototype-library.css` + `birbir-prototype-library.js` | muted crossed price with preserved font/color | default with old price, default without old price | Safari autodetect blue link, wrong decoration thickness |

## Change Routing Rules
Используем только четыре маршрута изменений:

- `screen-specific`
  - когда правка реально уникальна для одного экрана
- `component-contract`
  - когда правка касается reusable UI pattern
- `token/foundation`
  - когда меняются color / type / spacing / radius / shadow aliases
- `behavioral`
  - когда меняется state logic, routing, drag, filtering, sync, empty logic

Обязательное правило:
- если change routing не выбран заранее, реализация не начинается

## Implementation Rules For This Repo
Для текущего `Test-v.2` репозитория:

- не создавать новые локальные visual variants, если это уже reusable pattern
- не смешивать static HTML examples и runtime renderers без синхронизации
- не менять reusable behavior в одном screen handler, не обновив контракт
- при затрагивании filters, badges, cards, empty-state и seller tags сначала обновлять contract, потом код
- при любом touch-driven компоненте обязательна Safari проверка
- если target Figma frame недоступен, сначала эскалировать проблему пользователю, а не делать guessed fallback

## QA Checklist
### Contract QA
- typography совпадает с contract token
- spacing совпадает с contract token
- icon source совпадает с canonical mapping
- все обязательные states реально существуют
- forbidden deviations отсутствуют

### Screen QA
- target frame не legacy
- экран состоит только из bound contracts
- shell / gutters / CTA / overlays совпадают с contract layer

### Regression QA
- full-screen filters
- bottomsheet filters
- range picker
- empty state
- results product cards
- detail seller tags
- preview badges across home / results / detail
