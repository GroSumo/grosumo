import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage, { docMetadata } from "@/components/DocPage";
import { getDoc, getSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("guides").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc("guides", slug);
  return doc ? docMetadata(doc) : {};
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDoc("guides", slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
