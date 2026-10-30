---
title: 个人网站 GEO 实践：让 ChatGPT、Perplexity 引用你的内容
published: 2026-10-22T16:00:00+08:00
pinned: true
draft: false
description: GEO（生成式引擎优化）不是玄学。以这个网站的真实配置为例，拆解 AI 爬虫矩阵、llms.txt、结构化数据和内容策略的完整落地。
tags: [GEO, SEO, AI]
---
越来越多的人通过 ChatGPT、Perplexity、豆包获取信息，而不是 Google。让你的内容被这些 AI 引擎**引用**，就是 GEO（Generative Engine Optimization，生成式引擎优化）要解决的问题。

我自己在做 GEO 方向的产品（一个生成式推荐优化工作台），这个网站本身就是我的方法论的试验田。这篇文章拆解真实配置，所有代码你都可以在这个站的[仓库](https://github.com/luoruihuan/luoruihuan.top)里找到。

## 先搞清楚：AI 引擎的爬虫矩阵

这是 GEO 最容易踩坑的地方。每家 AI 公司都有**多个爬虫**，职责不同，而且 **robots.txt 的规则组不继承通配符**——你给 `User-agent: *` 放行了，不等于放行了它们。

| 类别 | User-Agent | 作用 | 策略 |
| --- | --- | --- | --- |
| 搜索/引用 | `OAI-SearchBot` | ChatGPT 搜索引用 | 放行 |
| 搜索/引用 | `Claude-SearchBot` | Claude 搜索引用 | 放行 |
| 搜索/引用 | `PerplexityBot` | Perplexity 引用 | 放行 |
| 搜索/引用 | `Googlebot` | Google + AI Overviews | 放行 |
| 训练 | `GPTBot` | OpenAI 模型训练 | 个人站建议放行 |
| 训练 | `ClaudeBot` | Anthropic 模型训练 | 个人站建议放行 |
| 训练 | `Google-Extended` | Gemini 训练 | 个人站建议放行 |

关键区分：**搜索爬虫**决定你能否被 AI 答案引用；**训练爬虫**决定你的内容进入模型语料。个人站我全部放行——被引用和被学习都是曝光。

落地成 `robots.txt`（这个站的真实配置，由 [robots.txt.ts](https://github.com/luoruihuan/luoruihuan.top/blob/main/src/pages/robots.txt.ts) 动态生成）：

```txt
# AI 搜索与引用爬虫
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# AI 训练爬虫
User-agent: GPTBot
Allow: /

# ...其余逐个声明，不要依赖通配
```

## llms.txt：做不做？

`llms.txt` 是 Answer.AI 在 2024 年提出的约定：站点根目录放一个 Markdown 文件，告诉 AI 你的网站是什么、有哪些重要内容。

诚实的现状：**Google 官方明确表示忽略它**，OpenAI 和 Anthropic 也没有官方文档承认读取它。但 Perplexity 等引擎的态度更开放，而且它的成本极低——一个静态文件而已。

我的选择：做。这是这个站的 [llms.txt](/llms.txt)，本质是「给 AI 看的站点地图 + 简介」。即使暂时没引擎读它，也零副作用。

## 技术层：让 AI 读得到你的内容

比 robots.txt 更基础的问题：**AI 爬虫多数不执行 JavaScript**。如果你的正文在 React 客户端渲染里，很多 AI 爬虫看到的是空页面。

这也是我选 Astro 做这个站的原因：构建产物是纯静态 HTML，正文直接在 HTML 源码里。验证方法很简单：

```bash
curl -s https://luoruihuan.top | grep -c "技术派罗恩"
# 输出 > 0 说明正文对爬虫可见
```

其余技术项一并列出：

- **sitemap.xml**：带准确的 `lastmod`，不要全站统一时间戳
- **RSS**：AI 引擎和聚合器都爱它
- **JSON-LD 结构化数据**：`Person`、`Article`、`BreadcrumbList`，描述页面里真实存在的可见内容
- **OG / Twitter 卡片**：被分享时的门面
- **真实 404**、**canonical URL**、**可见的发布/修改日期**

## 内容层：Google 官方口径说了什么

Google 的 [AI 功能优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)值得细读，核心观点可以浓缩成一句：

> **独特的一手经验 > 二手总结。**

- 第一人称的实操复盘（「我这样做，结果是 X」）比「7 个技巧」式水文更容易被 AI 引用——因为 AI 训练数据里后者已经泛滥
- 结构清晰：标题、段落、列表，让内容「可切片」
- 别为了关键词堆砌变体文章，Google 的 scaled content abuse 政策会收拾你

这篇文章本身就在践行这一点：爬虫矩阵的坑（通配符不继承）是我在真实配置里踩的，不是抄来的。

## 总结

GEO 的技术部分（爬虫矩阵、静态化、结构化数据）是一小时的活；真正决定被引用的是**持续输出值得引用的一手内容**。

技术是杠杆，内容是本金。这个站两者都有，接下来交给时间。

