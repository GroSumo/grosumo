import ComingSoon from "@/components/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Articles on GST billing, stock and running a shop in India, from the grosumoERP team. Coming soon.",
  path: "/blog",
  noindex: true,
});

export default function BlogPage() {
  return (
    <ComingSoon
      path="/blog"
      eyebrow="Blog"
      title="Articles are"
      accent="on the way"
      body="We're writing practical guides on GST billing, stock control and customer credit for Indian shops. Check back soon."
    />
  );
}
