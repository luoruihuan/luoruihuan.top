import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://luoruihuan.top/",
    title: "技术派罗恩",
    description:
      "技术派罗恩的个人网站：94 年全栈工程师，10+ 年互联网经验，专注 AI Agent 开发、FDE 与 GEO（生成式引擎优化）。聊 AI 实战、全栈工程、工程师搞钱。",
    author: "技术派罗恩",
    profile: "https://luoruihuan.top",
    ogImage: "default-og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/luoruihuan" },
    { name: "mail", url: "mailto:luoruihuan2015@gmail.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "mail", url: "mailto:?subject=%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0&body=" },
  ],
});
