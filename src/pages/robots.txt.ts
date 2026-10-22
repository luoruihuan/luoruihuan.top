import type { APIRoute } from "astro";

// GEO 爬虫矩阵：搜索/引用类爬虫显式放行（robots 组不继承通配规则，须逐个声明）
const getRobotsTxt = (sitemapURL: URL) => `# AI 搜索与引用爬虫（希望被 AI 引擎引用）
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

# AI 训练爬虫（个人站选择放行，增加内容语料曝光）
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# 其余爬虫
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
