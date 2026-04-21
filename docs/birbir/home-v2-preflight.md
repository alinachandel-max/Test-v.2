# Home V2 Preflight

Использовано перед сборкой `birbir-home-screen-v2.html` и переключателя версии главной.

## Meta

- screen name: `Home v2`
- product goal: сохранить legacy-главную и добавить отдельную обновлённую версию, доступную через профиль
- target Figma file: `BirBir-App`
- target node id: `56138:98770`
- this is legacy or canonical: `screen-specific preview entry`
- owner: Codex implementation

## Change Routing

- primary route for new layout: `screen-specific`
- secondary route for profile toggle + persist state: `behavioral`

Если правка повторится ещё на экранах вне `profile-screen.html` и `home`-entry, её нужно будет вытащить в отдельный reusable contract.

## Contracts Used

| Screen Block | Component Key | Bound in source-of-truth | Figma node id | Notes |
| --- | --- | --- | --- | --- |
| header / hero shell | local `home_v2_shell` | no | `56138:98770` | одноразовый экранный layout |
| search row | `search_header_shell` | no | `56138:98770` | reused existing `.search` / `.search-field` |
| banners rail | local + existing `banner-scroll` | no | `56138:98770` | reused autoplay contract |
| chips row | category chips | no | `56138:98770` | reused existing `.category-strip` / `.chip` |
| content block 1 | quick links | no | `56138:98770` | local screen-specific cards |
| content block 2 | `feed/cards` | no | `56138:98770` | reused existing home feed renderer |
| footer / CTA | `tabbar` | yes | n/a | shared bottom nav |
| overlays | none in v1 scope | n/a | n/a | search/results/detail intentionally not ported |

## New Bindings Needed

- new contract key: none in code
- should live in: `BirBir / Source of Truth`
- reason: Figma node exists, but MCP did not return metadata/context during implementation
- reusable or one-off: one-off for now

## High-Risk QA

- [x] safe area / top white strip
- [x] page gutters `16`
- [ ] chip typography and selected state
- [ ] full-screen vs bottomsheet pattern
- [ ] range picker touch / Safari
- [x] badges text / icon parity
- [ ] empty / error / loading states
- [x] CTA / footer behavior
- [x] static demo vs runtime renderer parity

## Acceptance Notes

- what must match 1:1: version toggle behavior, legacy home preservation, reused component contracts
- what is allowed to stay approximate: unique decorative layout blocks of v2 while Figma MCP is unavailable
- which edge cases must be demoed: reload after switching versions, return to profile, transition from v2 back to legacy
- what should be checked on iPhone Safari: `localStorage`, bottom tabbar, safe area padding, no layout jump between profile and v2 home
