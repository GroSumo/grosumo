import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Everything is crawlable except API and any app/login paths. Search engines and AI crawlers are welcome.
const DISALLOW = ["/api/", "/app/", "/login", "/signin", "/signup"];

// A crawler with its own group ignores the "*" group, so each named group repeats the same rules.
const NAMED_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: DISALLOW }, ...NAMED_BOTS.map(userAgent => ({ userAgent, allow: "/", disallow: DISALLOW }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
