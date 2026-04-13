# Screen Preflight Template

Использовать перед сборкой любого нового экрана или крупной переработкой существующего.

## Meta

- screen name:
- product goal:
- target Figma file:
- target node id:
- this is legacy or canonical:
- owner:

## Change Routing

Выбрать один primary route:

- `screen-specific`
- `component-contract`
- `token/foundation`
- `behavioral`

Если change touches 2+ screens, route не может оставаться `screen-specific`.

## Contracts Used

Заполнить для каждого блока экрана.

| Screen Block | Component Key | Bound in source-of-truth | Figma node id | Notes |
| --- | --- | --- | --- | --- |
| header |  | yes/no |  |  |
| chips row |  | yes/no |  |  |
| content block 1 |  | yes/no |  |  |
| content block 2 |  | yes/no |  |  |
| footer / CTA |  | yes/no |  |  |
| overlays |  | yes/no |  |  |

## New Bindings Needed

Если contract отсутствует:

- new contract key:
- should live in:
  - `General Library` variant
  - `BirBir / Source of Truth`
  - both
- reason:
- reusable or one-off:

## High-Risk QA

Отметить, что из этого релевантно экрану:

- [ ] safe area / top white strip
- [ ] page gutters `16`
- [ ] chip typography and selected state
- [ ] full-screen vs bottomsheet pattern
- [ ] range picker touch / Safari
- [ ] badges text / icon parity
- [ ] empty / error / loading states
- [ ] CTA / footer behavior
- [ ] static demo vs runtime renderer parity

## Acceptance Notes

- what must match 1:1:
- what is allowed to stay approximate:
- which edge cases must be demoed:
- what should be checked on iPhone Safari:
