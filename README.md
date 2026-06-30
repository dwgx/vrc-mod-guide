# VRChat 改模资源库

拿 AI 跑了两天自己爬出来的东西。

VRChat 改模 / 改模型相关的中文资源聚合：环境搭建、模型上传、优化、素体衣装、社区文档，全部联网真实检索，每条资源带可信度标记。外加 1473 条 B 站视频和 1039 条 reddit 帖子的本地存档（防原帖删档）。

## 在线访问

GitHub Pages: https://dwgx.github.io/vrc-mod-guide/

## 内容

| 文件 | 说明 |
|------|------|
| `index.html` | 单页网站（无依赖，纯静态） |
| `data.js` | 资源数据库：视频 / 素体 / 衣装 / 世界 / 平台 / 社区文档，带 `verify` 可信度字段（high/mid/low） |
| `guides.js` | 60 篇原创中文教程正文 |
| `covers.js` | 生成的封面 |
| `archive-bili.json` | 1473 条 B 站视频文本快照（标题 / UP / 时长 / 播放 / 简介 / 封面，官方 API 核实，0 删档） |
| `archive-reddit.json` | 1039 条 reddit wayback 存档指针（95% 有存档，原帖删了存档链接仍可访问） |
| `ARCHIVE.md` | 存档的可读汇总表 |
| `_archive_bili.py` / `_archive_reddit.py` | 抓取脚本 |

## 可信度标记

- `high` 官方 / 已核实存活
- `mid` 搜索真实返回，未逐页核实
- `low` 商品号 / 作者待核实

## 说明

资源来自公开联网检索，B 站为官方 API 元数据，reddit 仅存 archive.org 存档指针，不抓正文。Booth 商品只放链接和生成封面，不下载作者原图。内容可能随时间变动，以各站实际页面为准。
