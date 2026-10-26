import { buildGraph, type Crumb } from "@/lib/seo";

/**
 * The page's single schema.org JSON-LD graph, rendered server-side.
 * Omit `crumbs` on the home page only (it gets WebSite instead of BreadcrumbList).
 * `<` is escaped so content can't close the script tag.
 */
export default function PageSchema({ crumbs, nodes }: { crumbs?: Crumb[]; nodes?: Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph({ crumbs, nodes })).replace(/</g, "\\u003c") }}
    />
  );
}
