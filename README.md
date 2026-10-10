# 爬塔

《爬塔》是一款网页端单人牌组构筑（DBG）地牢爬行游戏，简体中文。

**在线游玩**：[Bilibili Toy](https://www.bilibili.com/toy/pata/index.html)

本项目是 [Slay the Web](https://github.com/oskarrough/slaytheweb) 的简体中文修改版。
本仓库即该修改版的完整源码。

## 与上游的关系

- 上游项目：[oskarrough/slaytheweb](https://github.com/oskarrough/slaytheweb)（AGPL-3.0）
- 上游版本：v0.25.0，以提交 `chore: import slaytheweb upstream` 原样导入
- 玩法灵感来自 Mega Crit 的 [Slay the Spire](https://www.megacrit.com/)。
  本项目未使用其任何美术或文本资源，与其无隶属关系，未获其授权或背书。

**许可**：AGPL-3.0。本修改版同样以 AGPL-3.0 发布，你可以查看、修改并再分发。

改动清单见 [NOTICE.md](./NOTICE.md)。概要：

1. **汉化**——卡牌、怪物、能力、界面、手册、教学全部译为简体中文。
   逻辑标识符（卡牌 `name`、效果 `type`/`target`、`powers` 键名等）保持英文，
   中文名存放在 `zh` 字段，由 `src/i18n.js` 在展示层取用，因此上游测试全部通过。
2. **移除外部依赖**——删除 Sentry 错误上报、对局上报接口、Heliotrope 商业字体引用。
3. **替换素材**——移除未获授权的电影截图与画作，改用自行绘制的楼层背景。
4. **适配静态托管**——构建产物改为相对路径，以适配子目录挂载。

## 构建

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run build:toy     # 构建到 dist/，并在仓库根目录生成源码压缩包
npm run dev           # 本地开发服务器
npm test              # 运行测试
```

产物是纯静态文件，可直接部署到任意静态托管或子目录。

## 目录

- `src/content` — 卡牌、怪物、地牢的**数据**
- `src/game` — 与界面无关的游戏逻辑（状态、动作、条件、能力）
- `src/ui` — 界面层（Astro + Preact + web components）
- `public` — 静态资源
- `tests` — 游戏逻辑测试
- `scripts/pack-source.mjs` — 打包 AGPL 源码交付物

架构说明见 [DOCUMENTATION.md](./DOCUMENTATION.md)。

## 上游参考

<details>
<summary>Slay the Spire 相关的模组工具与资料</summary>

- [Slay the Spire Wiki](https://slay-the-spire.fandom.com/wiki/Slay_the_Spire_Wiki)
- [SlayTheSpireModding](https://alexdriedger.github.io/SlayTheSpireModding/)
- [Is Every Seed Winnable?](https://forgottenarbiter.github.io/Is-Every-Seed-Winnable/)
- [BaseMod](https://github.com/daviscook477/BaseMod)
- [StSLib](https://github.com/kiooeht/StSLib/wiki/Power-Hooks)
- [A history of roguelite deck building games](https://pollywog.games/rgdb/)

</details>

### 开放素材

- [32rogues](public/images/characters/32rogues/LICENSE.txt) — Copyright 2024 Seth Boyles
- [game-icons.net](https://game-icons.net/) — CC BY 3.0
- [fromoldbooks.org](https://www.fromoldbooks.org/)、[oldbookart.com](https://www.oldbookart.com/) — 公有领域古籍扫描
- 楼层背景图为本项目自行绘制
