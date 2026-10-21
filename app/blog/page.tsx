import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on GST billing, stock and running a shop in India — from the grosumoERP team.",
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Articles are"
      accent="on the way"
      body="We're writing practical guides on GST billing, stock control and customer credit for Indian shops. Check back soon."
    />
  );
}
