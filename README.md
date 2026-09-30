# VRChat 改模资源库 / VRChat Modding Resource Hub

<!-- dwgx-banner:BEGIN -->
<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner.svg?t=ad58d1fc3eb0" />
  <source media="(prefers-color-scheme: light)" srcset="docs/assets/banner-light.svg?t=ad58d1fc3eb0" />
  <img src="docs/assets/banner.svg?t=ad58d1fc3eb0" width="100%" alt="vrc-mod-guide — VRChat 改模资源库 · 中文教程 / 素体衣装 / 视频，含 B站与 reddit 本地存档" />
</picture>

<br/>

JavaScript · none · ★4

[issues](https://github.com/dwgx/vrc-mod-guide/issues)

</div>
<!-- dwgx-banner:END -->


> 中文 VRChat 改模资源一站聚合 —— 拿 AI 跑了两天自己爬出来的东西。
>
> A one-stop Chinese-language resource hub for VRChat avatar/model modding.

## Overview / 概述

A zero-dependency, single-page static site that aggregates Chinese-language VRChat modding resources in one place: environment setup, model uploading, optimization, avatar bases, clothing, community docs. Each resource entry carries a credibility tag (`high` / `mid` / `low`). Also includes 1473 Bilibili video metadata snapshots and 1039 Reddit post Wayback Machine archive pointers — insurance against original posts getting deleted.

纯静态、无构建、无依赖的单页网站，把 VRChat 改模需要的中文资源聚到一处：环境搭建、模型上传、优化、素体衣装、社区文档。每条资源带可信度标记（`high` / `mid` / `low`）。内置 1473 条 B 站视频元数据快照和 1039 条 reddit 帖子的 wayback 存档指针，原帖删了照样能看。适合想入门或整理 VRChat 改模资料、又不想到处翻链接的中文用户。

**Live site / 在线访问**: <https://dwgx.github.io/vrc-mod-guide/>

## Features / 功能

- **Resource database / 资源数据库** — Videos, avatar bases (BASES), clothing (CLOTHES), worlds (WORLD), platforms (PLATFORM), community docs (COMM), tools (TOOLS), articles (ARTICLES), advanced topics (ADVANCED). Each entry has a `verify` credibility field.
- **60 original Chinese tutorials / 60 篇原创中文教程** — Full text embedded in-page (not external links), stored in `guides.js`.
- **Credibility tagging / 可信度标记** — `high` = official or verified alive; `mid` = search confirms existence, not individually checked; `low` = product ID or author pending verification.
- **Bilibili video snapshots / B 站视频快照** — 1473 entries verified via official view API, with title, uploader, duration, play count, description, cover URL (`archive-bili.json`).
- **Reddit archive pointers / reddit 存档指针** — 1039 entries, Wayback Machine archive existence + URL only, no body text scraped (`archive-reddit.json`). Original deleted? Still accessible via archive.
- **Frontend search & filter / 前端搜索过滤** — In-page search box and category filter buttons, pure client-side rendering, works offline.
- **Cover mapping / 封面映射** — `covers.js` provides cover images per resource (Bilibili official cover URLs; Booth items link only, no redistribution of creator artwork).

## Tech Stack / 技术栈

- Pure static frontend: single `index.html` with inline CSS + JS. No framework, no bundler, no npm.
- Data loaded as plain `.js` files via `<script src>`: `data.js`, `covers.js`, `guides.js`.
- Scraping scripts: Python 3 standard library only (`urllib`, `json`), zero third-party packages.
  - `_archive_bili.py` — Bilibili `web-interface/view` official API, with rate limiting and resume support.
  - `_archive_reddit.py` — Wayback CDX API, fetches latest `statuscode:200` archive timestamp + URL.
- Hosting: GitHub Pages.

## Project Structure / 项目结构

```
vrc-mod-guide/
├── index.html            # Single-page site, inline styles & logic
├── data.js               # Resource DB: VIDEOS/BASES/CLOTHES/WORLD/PLATFORM/COMM/... with verify field
├── guides.js             # 60 original Chinese tutorials (window.GUIDES)
├── covers.js             # Cover URL mapping (window.COVERS)
├── archive-bili.json     # 1473 Bilibili video metadata snapshots
├── archive-reddit.json   # 1039 Reddit Wayback archive pointers
├── ARCHIVE.md            # Human-readable archive summary table
├── _archive_bili.py      # Bilibili scraper (official API)
├── _archive_reddit.py    # Reddit Wayback scraper (CDX API)
└── .gitignore
```

## Getting Started / 快速开始

No build step required. / 无需构建。

**View online / 在线看**: Open <https://dwgx.github.io/vrc-mod-guide/>

**Run locally / 本地运行**:

```bash
git clone https://github.com/dwgx/vrc-mod-guide.git
cd vrc-mod-guide
python -m http.server 8000
# Open http://localhost:8000/
```

(`index.html` loads `.js` files via `<script src>`, so a local server is more reliable than `file://`.)

## Usage / 使用方法

### Re-running archive scrapers / 重新抓取存档

The scraping scripts read local input files (BV ID list / Reddit URL list) that are gitignored.

<!-- TODO: confirm input file preparation — scripts read `_allbv.txt` (one BVID per line) and `_allreddit.txt` (one Reddit URL per line), not included in repo, prepare them yourself -->

```bash
# Bilibili metadata snapshot -> archive-bili.json (reads _allbv.txt)
python _archive_bili.py

# Reddit Wayback pointers -> archive-reddit.json (reads _allreddit.txt)
python _archive_reddit.py
```

Both scripts support resume (skip already-fetched entries) and have built-in rate limiting.

两个脚本均支持断点续跑（已有结果跳过），带请求间隔限流。

### Data format / 数据结构

Resource entries in `data.js`:

```js
{ t:"标题", ch:"频道/UP", id:"视频ID", url:"链接", tag:"分类", v:"high" }
```

`v` / `verify`: credibility — `high` / `mid` / `low`.

## Status / 状态

Active personal project. Content sourced from public web searches and official APIs.

个人项目，活跃维护中。内容来自公开联网检索与官方 API。

## License / 许可证

No LICENSE file in the repository. All rights reserved by the author.

仓库未包含 LICENSE 文件，版权归作者所有。

<!-- TODO: 若需开放使用，补充 LICENSE 文件 -->
