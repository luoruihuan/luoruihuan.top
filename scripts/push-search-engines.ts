/**
 * 搜索引擎推送脚本 —— 百度普通收录 API + IndexNow
 *
 * 用法:
 *   npx tsx scripts/push-search-engines.ts <url> [url...]   # 推送指定 URL(新文章发布后用)
 *   npx tsx scripts/push-search-engines.ts --sitemap         # 从线上 sitemap 拉全量推送(存量提交用)
 *   npx tsx scripts/push-search-engines.ts --sitemap --baidu-only
 *
 * 配置(luoruihuan-top/.env,已被 gitignore;也可用环境变量):
 *   BAIDU_PUSH_TOKEN=百度搜索资源平台「资源提交-普通收录-API推送」的 token
 *   INDEXNOW_KEY=public/<key>.txt 文件名里的 key
 *
 * 说明:
 * - 百度接口:http://data.zz.baidu.com/urls,单次上限 2000 条,返回 success/remain/error
 * - IndexNow:一次提交通知 Bing/Yandex/Naver 等(不含 Google 和百度)
 * - 默认失败不中断发布流程(exit 0);传 --strict 时任何渠道失败 exit 1
 * - 重复推送旧链接会被百度统计为浪费配额并可能降额,建议只推新增/更新页面
 */

import { readFileSync } from "node:fs";

const SITE = "https://luoruihuan.top";
const SITEMAP_URL = `${SITE}/sitemap-0.xml`;
const BAIDU_API = "http://data.zz.baidu.com/urls?site=luoruihuan.top";
const INDEXNOW_API = "https://api.indexnow.org/indexnow";

// ---------- .env 加载(无依赖,合并 process.env 优先) ----------
function loadDotEnv(): void {
	try {
		const raw = readFileSync(new URL("../.env", import.meta.url), "utf8");
		for (const line of raw.split("\n")) {
			const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
			if (!m) continue;
			const value = m[2].replace(/^["']|["']$/g, "");
			if (process.env[m[1]] === undefined) process.env[m[1]] = value;
		}
	} catch {
		// 没有 .env 时静默跳过
	}
}

async function collectUrls(args: string[]): Promise<string[]> {
	if (args.includes("--sitemap")) {
		const res = await fetch(SITEMAP_URL, { redirect: "follow" });
		if (!res.ok) throw new Error(`拉取 sitemap 失败: HTTP ${res.status}`);
		const xml = await res.text();
		const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
		if (urls.length === 0) throw new Error("sitemap 里没有解析到 URL");
		return urls;
	}
	const urls = args.filter((a) => !a.startsWith("--"));
	if (urls.length === 0) {
		console.error("用法: push-search-engines.ts <url>... | --sitemap");
		process.exit(1);
	}
	return urls;
}

async function pushBaidu(urls: string[], token: string): Promise<boolean> {
	const chunkSize = 2000; // 百度单次上限
	let ok = true;
	for (let i = 0; i < urls.length; i += chunkSize) {
		const chunk = urls.slice(i, i + chunkSize);
		try {
			const res = await fetch(`${BAIDU_API}&token=${token}`, {
				method: "POST",
				headers: { "Content-Type": "text/plain" },
				body: chunk.join("\n"),
			});
			const data = (await res.json().catch(() => ({}))) as {
				success?: number;
				remain?: number;
				error?: number;
				message?: string;
			};
			if (res.ok && typeof data.success === "number") {
				console.log(
					`✅ 百度: 成功 ${data.success} 条, 今日剩余配额 ${data.remain ?? "?"}`,
				);
			} else {
				ok = false;
				console.error(
					`❌ 百度: HTTP ${res.status} error=${data.error ?? "?"} ${data.message ?? ""}`,
				);
			}
		} catch (err) {
			ok = false;
			console.error(
				`❌ 百度: 请求失败 ${err instanceof Error ? err.message : err}`,
			);
		}
	}
	return ok;
}

async function pushIndexNow(urls: string[], key: string): Promise<boolean> {
	try {
		const res = await fetch(INDEXNOW_API, {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify({
				host: "luoruihuan.top",
				key,
				keyLocation: `${SITE}/${key}.txt`,
				urlList: urls.slice(0, 10000), // IndexNow 单次上限 10000
			}),
		});
		// 200 = 已接收;202 = 首次使用待校验 key;4xx = 失败
		if (res.status === 200 || res.status === 202) {
			console.log(`✅ IndexNow: HTTP ${res.status}(202 表示 key 校验中)`);
			return true;
		}
		console.error(`❌ IndexNow: HTTP ${res.status}`);
		return false;
	} catch (err) {
		console.error(
			`❌ IndexNow: 请求失败 ${err instanceof Error ? err.message : err}`,
		);
		return false;
	}
}

async function main(): Promise<void> {
	loadDotEnv();
	const args = process.argv.slice(2);
	const urls = await collectUrls(args);
	console.log(`📨 待推送 ${urls.length} 条 URL`);

	const baiduToken = process.env.BAIDU_PUSH_TOKEN;
	const indexNowKey = process.env.INDEXNOW_KEY;

	if (!baiduToken && !indexNowKey) {
		console.log(
			"⏭️ 未配置 BAIDU_PUSH_TOKEN / INDEXNOW_KEY(见 luoruihuan-top/.env),跳过推送",
		);
		return;
	}

	let allOk = true;
	if (!baiduToken) {
		console.log("⏭️ 未配置 BAIDU_PUSH_TOKEN,跳过百度");
	} else if (!args.includes("--indexnow-only")) {
		allOk = (await pushBaidu(urls, baiduToken)) && allOk;
	}
	if (!indexNowKey) {
		console.log("⏭️ 未配置 INDEXNOW_KEY,跳过 IndexNow");
	} else if (!args.includes("--baidu-only")) {
		allOk = (await pushIndexNow(urls, indexNowKey)) && allOk;
	}

	if (!allOk && args.includes("--strict")) process.exit(1);
}

main().catch((err) => {
	console.error(`❌ ${err instanceof Error ? err.message : err}`);
	process.exit(1);
});
