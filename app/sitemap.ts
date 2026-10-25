import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { SITE_UPDATED, SITE_URL, languagesFor } from "@/lib/seo";

// Marketing site only — the cloud app (its own subdomain) is never listed here.
// "Coming soon" pages (docs, blog, case studies) are noindex and left out until they have content.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/offline", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cloud", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

const absoluteLanguages = (path: string) =>
  Object.fromEntries(Object.entries(languagesFor(path)).map(([lang, p]) => [lang, `${SITE_URL}${p === "/" ? "" : p}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map(r => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: SITE_UPDATED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: { languages: absoluteLanguages(r.path) },
  }));

  const guides = getAllGuides().map(g => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: absoluteLanguages(`/guides/${g.slug}`) },
  }));

  return [...pages, ...guides];
}
