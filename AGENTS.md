# AGENTS.md — 《爬塔》

Slay the Web 的简体中文修改版。网页端单人牌组构筑（DBG）地牢爬行游戏。

- **线上**：Bilibili Toy — https://www.bilibili.com/toy/pata/index.html
- **源码**：https://github.com/C0S1N3/pata（公开，AGPL-3.0）
- **上游**：https://github.com/oskarrough/slaytheweb（v0.25.0，以提交 `chore: import slaytheweb upstream` 原样导入）

上游那份 AGENTS.md 写的「不要 git commit、不要跑 dev server」是给向上游贡献的人看的。
这是自建 fork，**本地提交和跑服务都是正常的**；但**绝不向上游仓库推送任何东西**。

## 命令

本机没有独立安装的 Git/Node，都是便携版：

| 用途 | 路径 |
| --- | --- |
| Node | `C:\coding\node\npm.cmd` |
| gh CLI | `C:\coding\gh\gh.exe` |
| toy CLI | `C:\Users\C0S1N\AppData\Local\Programs\toy\toy.exe` |

```bash
# 构建 + 生成 AGPL 源码包（产物在 dist/ 与仓库根目录 pata-src.zip）
"C:\coding\node\npm.cmd" run build:toy

npm test          # 92 个单元测试
npm run dev       # 本地开发服务器
```

## 汉化架构（改代码前必读）

**卡牌、怪物、能力的 `name` 保持英文不动**——它同时是唯一 ID：牌组按名字引用卡牌、
升级时给 `name` 追加 `+`、`upgradeNameMap` 反查、测试断言都依赖它。
中文名放在独立的 `zh` 字段，由 `src/i18n.js`（`cardName` / `displayName` / `cardTypeLabel`）
在展示层取用。**就地翻译 `name` 会连带打断升级命名机制并让测试全红。**

同理不要翻译 `type` / `target` / `powers` 的键名 / `conditions` / `actions`——都是逻辑值。
CSS 选择器也依赖 `data-card-type` 等属性，只改展示文案。

正因如此，上游 92 个测试全部通过。**改完务必跑 `npm test`。**

## 移动端

Toy 主要跑在 B 站 APP 里，移动端是真·主战场。适配集中在 `src/ui/styles/mobile.css`，
由 `index.css` 最后 `@import` 以便覆盖。两个断点：

- `max-width: 560px` — 手机竖屏：手牌换行两行、顶栏收紧、战斗区上下堆叠、地图节点缩小
- `max-height: 500px` — 手机横屏：手牌脱离文档流固定贴底、菜单压缩

**窄屏读卡靠点击放大**：5 张手牌挤在 390px 里，长描述（巫毒赠礼 30 字）在卡面上
永远排不下——这不是字号问题，继续放大卡牌只会把整手牌推出屏幕。所以：
`dragdrop.js` 把 `onInspect` 挂在 GSAP Draggable 的 `onClick` 上（只在几乎无位移时
触发，「点」看详情与「拖」出牌互不干扰），`game-screen` 的 `.CardInspect` 弹层
（样式在 `overlay.css`）负责展示。弹层内的卡牌（奖励/牌组/图鉴）另有放大规则。

## Bilibili Toy 平台约束

- **上传端只放行白名单扩展名**。同目录同样字节，`.html`/`.jpg`/`.bin`/`.dat` 返回 200，
  而 **`.zip`、`.txt`、无扩展名一律 404**。所以源码压缩包无法随 Toy 分发——AGPL 义务
  改用外链 GitHub 仓库履行。
- **预览路径与正式路径不同**（`/toy/preview/preview_xxx/` vs `/toy/<slug>/`），
  且内容跑在 iframe 里、来自 `www.bilibilitoy.com`。因此
  **构建产物必须用相对路径**：`astro.config.mjs` 里 `base: './'` + `build.assetsPrefix: './'`
  + `build.format: 'file'`（页面输出平铺 `.html`，全站深度为 0）。
  注意 CSS 里的相对路径要写 `../images/`（样式表落在 `_astro/` 下），
  而 JS 运行时设的路径要写 `./images/`（相对文档）。
- **发布是两段式**：`toy create/update <path>` 不带 `--yes` 先出预览，
  人工确认后才加 `--yes` 提交审核。**slug 首次发布后锁死。**
- 当前 toy id `42507610096640`，slug `pata`。改动走
  `toy update 42507610096640 <dist路径>`。

## 素材来源（有版权地雷，别换回去）

上游素材里有 7 张吉卜力电影截图（**带可见版权水印**）、夏加尔《在城市上空》
（保护期到 2055）、若干来源不明图片，以及 mbtype.com 的商业字体 Heliotrope
（仅由作者 CDN 提供）。**这些已全部移除或替换**，改动逐条记在 `NOTICE.md`。

楼层背景是自行生成的 6 张图（原始未裁剪版在 `bg-originals/`）。
开放的第三方素材：32rogues 像素包（Seth Boyles，允许项目内使用、禁止再分发素材包本身）、
game-icons.net（CC BY 3.0）、fromoldbooks.org 与 oldbookart.com 的古籍扫描（公有领域）。

## 验证脚本

`e2e/` 下是 Puppeteer（用系统 Edge 无头驱动）的验证脚本，`shots/` 是截图。
它们是本地工具，已被 git 排除。

```bash
node e2e/mobile.cjs        # 手机两种朝向的布局尺寸
node e2e/dragmobile.cjs    # 触摸拖拽（page.touchscreen）
node e2e/desktop.cjs       # 桌面回归
```

**坑**：验证触摸交互请用 puppeteer 的 `page.touchscreen.tap()/touchStart/touchMove/touchEnd`，
不要用 CDP 裸 `Input.dispatchTouchEvent`——后者在横屏下会莫名失败，会让人误判成产品 bug。

其它已知坑：`?iddqd` 只把怪物打到 1 血不是 0；`endTurn()` 在房间已获胜时提前 return，
所以胜利结算在**杀死怪物的那一刻**就出现，不需要再点结束回合。
