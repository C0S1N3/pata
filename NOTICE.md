# NOTICE — 爬塔（Slay the Web 简体中文版）

本仓库是 **Slay the Web** 的修改版，按 GNU Affero 通用公共许可证第 3 版（AGPL-3.0）发布。

- 上游项目：https://github.com/oskarrough/slaytheweb
- 上游版本：v0.25.0（导入提交见 git 历史第一条）
- 上游版权：Copyright (C) oskarrough 及 Slay the Web 贡献者
- 许可证全文：见 `LICENSE`

## 修改说明

修改日期：2026-10-11

上游代码以 `chore: import slaytheweb upstream` 提交原样导入，其后所有改动均为本修改版所有：

1. **汉化**：卡牌名与描述、怪物名、能力与状态、地图、篝火、牌组编辑器、手册、教学引导、
   界面按钮与提示全部译为简体中文。
   逻辑标识符（卡牌 `name`、效果 `type`/`target`、`powers` 键名、房间类型等）**保持英文未动**，
   中文名单独存放在 `zh` 字段，由 `src/i18n.js` 在展示层取用。
2. **移除外部依赖**：删除 Sentry 错误上报（指向上游作者的 Sentry 项目）、
   删除对局上报功能（原会向 `api.slaytheweb.cards` 发送对局数据）、
   删除 Heliotrope 商业字体引用（原先热链上游作者的 CDN）。
3. **替换素材**：移除 7 张未获授权的吉卜力电影截图、1 张夏加尔画作（《在城市上空》，
   仍在版权保护期）及若干来源不明的图片，改为自行绘制的楼层背景。
4. **适配静态托管**：构建产物改为相对路径（`base`/`assetsPrefix` 设为 `./`，
   页面输出为平铺 `.html`），以适配子目录挂载；移除依赖后端服务的统计页与开发调试页。

## 第三方素材

- **32rogues** 像素素材包，Copyright 2024 Seth Boyles。允许用于商业与非商业项目，
  禁止再分发素材包本身，且不得用于 NFT/区块链项目。见
  `public/images/characters/32rogues/LICENSE.txt`。
- **game-icons.net**，CC BY 3.0。
- **fromoldbooks.org**、**oldbookart.com** 的古籍扫描图，属公有领域。
- 楼层背景图为本修改版自行绘制。
- 原版引用的 Heliotrope 字体经 https://mbtype.com/ 商业授权，本修改版未分发该字体，
  改用系统中文字体栈。

## 字体

本修改版不包含任何商业授权字体文件。

## 与 Mega Crit 的关系

玩法灵感来自 Mega Crit 的 Slay the Spire。本修改版未使用其任何美术或文本资源，
与其无隶属关系，未获其授权或背书。
