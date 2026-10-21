import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Docs",
  description: "Help and setup guides for grosumoERP, Offline and Cloud editions.",
};

export default function DocsPage() {
  return (
    <ComingSoon
      eyebrow="Docs"
      title="Help guides are coming soon"
      body="Step-by-step guides for both editions are being written. Until then, our team answers every question on WhatsApp."
    />
  );
}
