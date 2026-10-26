import DocIndex from "@/components/DocIndex";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides for Indian Shop Owners",
  description: "Plain-language guides for Indian shop owners: GST invoices, offline vs cloud billing software, stock and customer credit.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <DocIndex
      collection="guides"
      eyebrow="Guides"
      title="Guides for"
      accent="Indian shop owners"
      intro="GST billing, stock and customer credit, explained simply — plus how to choose between cloud and offline software."
      empty="New guides are on the way. Check back soon."
    />
  );
}
