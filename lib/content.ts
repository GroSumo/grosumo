import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Element, Root } from "hast";
import { toString } from "hast-util-to-string";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { QA } from "./seo";

/** Markdown collections: content/guides/*.md and content/for/*.md. Files starting with "_" are templates and never published. */
export type Collection = "guides" | "for";
export type CtaEdition = "offline" | "cloud" | "both";

export type DocMeta = {
  collection: Collection;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  keywords: string[];
  faq: QA[];
  related: string[];
  ctaEdition: CtaEdition;
  /** Shown in the eyebrow pill as "Guide · <category>". */
  category: string;
};

export type TocItem = { id: string; text: string };
export type Doc = DocMeta & { html: string; toc: TocItem[]; words: number };

const dirFor = (c: Collection) => path.join(process.cwd(), "content", c);

// YAML turns bare dates into Date objects; normalise to YYYY-MM-DD.
function toDay(value: unknown, fallback: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value) return value.slice(0, 10);
  return fallback;
}

function readFile(collection: Collection, file: string) {
  const raw = fs.readFileSync(path.join(dirFor(collection), file), "utf8");
  const { data, content } = matter(raw);
  const date = toDay(data.date, new Date().toISOString().slice(0, 10));
  const cta = String(data.ctaEdition ?? "both");
  const meta: DocMeta = {
    collection,
    slug: String(data.slug ?? file.replace(/\.md$/, "")),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date,
    updated: toDay(data.updated, date),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    faq: Array.isArray(data.faq) ? data.faq.map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) })) : [],
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    ctaEdition: cta === "offline" || cta === "cloud" ? cta : "both",
    category: String(data.category ?? "Guides"),
  };
  return { meta, content };
}

function publishedFiles(collection: Collection): string[] {
  const dir = dirFor(collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".md") && !f.startsWith("_"));
}

/** Published docs in a collection, most recently updated first. */
export function getAllDocs(collection: Collection): DocMeta[] {
  return publishedFiles(collection)
    .map(f => readFile(collection, f).meta)
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title));
}

export function getSlugs(collection: Collection): string[] {
  return getAllDocs(collection).map(d => d.slug);
}

/** Collects the h2 headings (after rehype-slug has given them ids) for the table of contents. */
function collectToc(toc: TocItem[]) {
  return () => (tree: Root) => {
    const walk = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        if (child.tagName === "h2" && typeof child.properties.id === "string") {
          toc.push({ id: child.properties.id, text: toString(child) });
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

/** The page owns the only <h1>, so any "#" heading in markdown is demoted to h2. */
function demoteH1() {
  return (tree: Root) => {
    const walk = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        if (child.tagName === "h1") child.tagName = "h2";
        walk(child);
      }
    };
    walk(tree);
  };
}

const isElement = (node: Root["children"][number] | undefined): node is Element => node?.type === "element";

/**
 * Template structure, applied to the top level of every doc:
 * - the first <p> becomes the opening callout;
 * - if the next block is exactly "**Key takeaways**" followed by a list, both are grouped into one box;
 * - tables are wrapped so they scroll sideways on narrow screens.
 */
function structureDoc() {
  return (tree: Root) => {
    const blocks = tree.children;
    const nextElement = (from: number) => {
      for (let i = from; i < blocks.length; i++) if (isElement(blocks[i])) return i;
      return -1;
    };

    const first = blocks.findIndex(n => isElement(n) && n.tagName === "p");
    if (first !== -1) {
      const lead = blocks[first] as Element;
      lead.properties.className = ["guide-callout"];

      const label = nextElement(first + 1);
      const list = label === -1 ? -1 : nextElement(label + 1);
      const p = blocks[label] as Element | undefined;
      // The paragraph must be nothing but **Key takeaways** — a lone <strong> with that text.
      const parts = p?.tagName === "p" ? p.children.filter(c => c.type !== "text" || c.value.trim()) : [];
      const isLabel = parts.length === 1 && isElement(parts[0]) && parts[0].tagName === "strong" && toString(parts[0]) === "Key takeaways";
      if (isLabel && list !== -1 && (blocks[list] as Element).tagName === "ul") {
        const box: Element = {
          type: "element",
          tagName: "div",
          properties: { className: ["guide-takeaways"] },
          children: blocks.slice(label, list + 1) as Element["children"],
        };
        blocks.splice(label, list - label + 1, box);
      }
    }

    for (let i = 0; i < blocks.length; i++) {
      const node = blocks[i];
      if (isElement(node) && node.tagName === "table") {
        blocks[i] = { type: "element", tagName: "div", properties: { className: ["guide-table"] }, children: [node] };
      }
    }
  };
}

/** Counts words in the rendered body (before heading anchors add their "#"). */
function countWords(out: { words: number }) {
  return () => (tree: Root) => {
    out.words = toString(tree).split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  };
}

export async function getDoc(collection: Collection, slug: string): Promise<Doc | null> {
  const file = publishedFiles(collection).find(f => readFile(collection, f).meta.slug === slug);
  if (!file) return null;
  const { meta, content } = readFile(collection, file);

  const toc: TocItem[] = [];
  const stats = { words: 0 };
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(demoteH1)
      .use(structureDoc)
      .use(countWords(stats))
      .use(rehypeSlug)
      .use(collectToc(toc))
      .use(rehypeAutolinkHeadings, {
        behavior: "append",
        properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
        content: { type: "text", value: "#" },
      })
      .use(rehypeStringify)
      .process(content),
  );

  return { ...meta, html, toc, words: stats.words };
}

/** Frontmatter `related` slugs first, then other docs sharing keywords, then the most recent. */
export function getRelated(collection: Collection, slug: string, limit = 3): DocMeta[] {
  const all = getAllDocs(collection);
  const current = all.find(d => d.slug === slug);
  if (!current) return [];
  const picked = current.related.map(s => all.find(d => d.slug === s)).filter((d): d is DocMeta => !!d && d.slug !== slug);
  const kw = new Set(current.keywords.map(k => k.toLowerCase()));
  const rest = all
    .filter(d => d.slug !== slug && !picked.includes(d))
    .map(d => ({ d, score: d.keywords.filter(k => kw.has(k.toLowerCase())).length }))
    .sort((a, b) => b.score - a.score || b.d.updated.localeCompare(a.d.updated))
    .map(({ d }) => d);
  return [...picked, ...rest].slice(0, limit);
}
