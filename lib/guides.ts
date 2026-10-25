import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import type { QA } from "./seo";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  keywords: string[];
  faq: QA[];
};

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export type Guide = GuideMeta & { html: string; toc: TocItem[] };

// YAML turns bare dates into Date objects; normalise everything to YYYY-MM-DD.
function toDay(value: unknown, fallback: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value) return value.slice(0, 10);
  return fallback;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function readGuideFile(slug: string) {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const date = toDay(data.date, "1970-01-01");
  const meta: GuideMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    updated: toDay(data.updated, date),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    faq: Array.isArray(data.faq) ? data.faq.map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) })) : [],
  };
  return { meta, content };
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));
}

/** All guides, newest first. */
export function getAllGuides(): GuideMeta[] {
  return getGuideSlugs()
    .map(slug => readGuideFile(slug).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getGuide(slug: string): Guide | null {
  if (!getGuideSlugs().includes(slug)) return null;
  const { meta, content } = readGuideFile(slug);

  const toc: TocItem[] = [];
  const md = new Marked({
    renderer: {
      // The page owns the only <h1>, so markdown headings start at h2.
      heading({ tokens, depth, text }: Tokens.Heading) {
        const level = Math.min(Math.max(depth, 2), 4);
        const id = slugify(text);
        if (level === 2 || level === 3) toc.push({ id, text: text.replace(/[*_`]/g, ""), depth: level });
        return `<h${level} id="${id}">${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
    },
  });

  const html = md.parse(content, { async: false });
  return { ...meta, html, toc };
}

/** Up to `limit` other guides, ranked by shared keywords, then recency. */
export function getRelatedGuides(slug: string, limit = 3): GuideMeta[] {
  const all = getAllGuides();
  const current = all.find(g => g.slug === slug);
  if (!current) return [];
  const kw = new Set(current.keywords.map(k => k.toLowerCase()));
  return all
    .filter(g => g.slug !== slug)
    .map(g => ({ g, score: g.keywords.filter(k => kw.has(k.toLowerCase())).length }))
    .sort((a, b) => b.score - a.score || b.g.date.localeCompare(a.g.date))
    .slice(0, limit)
    .map(({ g }) => g);
}
