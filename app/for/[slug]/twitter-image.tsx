import { getAllDocs } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "grosumoERP — billing & stock software for your shop";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllDocs("for").map(d => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getAllDocs("for").find(d => d.slug === slug);
  return renderOgImage({ eyebrow: "For your business", title: doc?.title });
}
