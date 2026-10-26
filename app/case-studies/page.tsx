import ComingSoon from "@/components/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description: "Stories from businesses running on grosumoERP. Coming soon.",
  path: "/case-studies",
  noindex: true,
});

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      path="/case-studies"
      eyebrow="Case studies"
      title="Customer stories,"
      accent="coming soon"
      body="We'll publish real stories here only with our customers' permission. Want to hear how grosumoERP could work for your business? Ask us."
    />
  );
}
