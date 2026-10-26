import DocIndex from "@/components/DocIndex";
import { getAllDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Stays out of the index until the first business-type page is published.
export const metadata = pageMetadata({
  title: "Billing & Stock Software by Shop Type",
  description: "How grosumoERP fits your kind of shop: GST billing, stock, accounts and customer credit for different Indian retail and wholesale businesses.",
  path: "/for",
  noindex: getAllDocs("for").length === 0,
});

export default function ForIndexPage() {
  return (
    <DocIndex
      collection="for"
      eyebrow="For your business"
      title="Billing & stock software for"
      accent="every kind of shop"
      intro="See how grosumoERP fits the way your type of shop works — from the counter to the books."
      empty="Pages for specific shop types are on the way. Meanwhile, ask us on WhatsApp how grosumoERP fits your business."
    />
  );
}
