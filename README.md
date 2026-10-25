# Pata (爬塔)

Pata is a web-based single-player deck-building (DBG) dungeon crawler, in Simplified Chinese.

**Play online**: [Bilibili Toy](https://www.bilibili.com/toy/pata/index.html)

This project is a Simplified Chinese modification of [Slay the Web](https://github.com/oskarrough/slaytheweb).
This repository is the complete source of that modification.

[简体中文 README](README.zh-CN.md)

## Relationship with upstream

- Upstream project: [oskarrough/slaytheweb](https://github.com/oskarrough/slaytheweb) (AGPL-3.0)
- Upstream version: v0.25.0, imported as-is in the commit `chore: import slaytheweb upstream`
- Gameplay inspired by Mega Crit's [Slay the Spire](https://www.megacrit.com/).
  This project uses none of its art or text assets; it is not affiliated with, nor authorized or endorsed by it.

**License**: AGPL-3.0. This modification is likewise released under AGPL-3.0; you may view, modify and redistribute it.

See [NOTICE.md](./NOTICE.md) for the change list. Summary:

1. **Chinese localization** — cards, monsters, powers, UI, manual and tutorial are all translated into Simplified Chinese.
   Logical identifiers (card `name`, effect `type`/`target`, `powers` keys, etc.) stay English;
   the Chinese names live in `zh` fields, read by `src/i18n.js` at the presentation layer, so every upstream test still passes.
2. **External dependencies removed** — Sentry error reporting, the match-reporting API, and the Heliotrope commercial font reference are gone.
3. **Assets replaced** — unauthorized film screenshots and paintings removed, replaced with self-drawn floor backgrounds.
4. **Adapted for static hosting** — build output now uses relative paths, so it works when mounted in a subdirectory.

## Building

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run build:toy     # build to dist/ and produce a source archive in the repo root
npm run dev           # local dev server
npm test              # run tests
```

The output is pure static files, deployable directly to any static host or subdirectory.

## Directory

- `src/content` — the **data** for cards, monsters and dungeons
- `src/game` — UI-independent game logic (state, actions, conditions, powers)
- `src/ui` — the UI layer (Astro + Preact + web components)
- `public` — static assets
- `tests` — game logic tests
- `scripts/pack-source.mjs` — packages the AGPL source deliverable

See [DOCUMENTATION.md](./DOCUMENTATION.md) for the architecture notes.

## Upstream references

<details>
<summary>Slay the Spire modding tools and resources</summary>

- [Slay the Spire Wiki](https://slay-the-spire.fandom.com/wiki/Slay_the_Spire_Wiki)
- [SlayTheSpireModding](https://alexdriedger.github.io/SlayTheSpireModding/)
- [Is Every Seed Winnable?](https://forgottenarbiter.github.io/Is-Every-Seed-Winnable/)
- [BaseMod](https://github.com/daviscook477/BaseMod)
- [StSLib](https://github.com/kiooeht/StSLib/wiki/Power-Hooks)
- [A history of roguelite deck building games](https://pollywog.games/rgdb/)

</details>

### Open assets

- [32rogues](public/images/characters/32rogues/LICENSE.txt) — Copyright 2024 Seth Boyles
- [game-icons.net](https://game-icons.net/) — CC BY 3.0
- [fromoldbooks.org](https://www.fromoldbooks.org/), [oldbookart.com](https://www.oldbookart.com/) — public-domain scans of antique books
- Floor backgrounds drawn for this project
