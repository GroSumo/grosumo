import { getAllDocs } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "grosumoERP guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllDocs("guides").map(d => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getAllDocs("guides").find(d => d.slug === slug);
  return renderOgImage({ eyebrow: "Guide", title: doc?.title });
}
