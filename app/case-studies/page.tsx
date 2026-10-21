import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Stories from businesses running on grosumoERP.",
};

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      eyebrow="Case studies"
      title="Customer stories, coming soon"
      body="We'll publish real stories here only with our customers' permission. Want to hear how grosumoERP could work for your business? Ask us."
    />
  );
}
