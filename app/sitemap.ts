import type { MetadataRoute } from "next";
import { getAllDocs, type Collection } from "@/lib/content";
import { SITE_URL, languagesFor } from "@/lib/seo";

// Marketing site only — the cloud app (its own subdomain) is never listed here.
// /blog, /docs and /case-studies are noindex "coming soon" pages and stay out until they have content.
type Freq = "weekly" | "monthly" | "yearly";
const routes: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/offline", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cloud", priority: 0.9, changeFrequency: "monthly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.6, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const alternates = (path: string) => ({
  languages: Object.fromEntries(Object.entries(languagesFor(path)).map(([lang, p]) => [lang, url(p)])),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  const guides = getAllDocs("guides");
  const forPages = getAllDocs("for");

  const pages: MetadataRoute.Sitemap = routes.map(r => ({
    url: url(r.path),
    lastModified: r.path === "/guides" && guides[0] ? guides[0].updated : buildTime,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: alternates(r.path),
  }));

  // /for is listed once it has at least one published page (it's noindex while empty).
  if (forPages.length) {
    pages.push({ url: url("/for"), lastModified: forPages[0].updated, changeFrequency: "weekly", priority: 0.7, alternates: alternates("/for") });
  }

  const docs = (collection: Collection, list: typeof guides, priority: number): MetadataRoute.Sitemap =>
    list.map(d => {
      const path = `/${collection}/${d.slug}`;
      return { url: url(path), lastModified: d.updated, changeFrequency: "monthly", priority, alternates: alternates(path) };
    });

  return [...pages, ...docs("guides", guides, 0.7), ...docs("for", forPages, 0.7)];
}
