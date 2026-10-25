import ComingSoon from "@/components/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Docs",
  description: "Help and setup guides for grosumoERP Offline and Cloud editions. Coming soon.",
  path: "/docs",
  noindex: true,
});

export default function DocsPage() {
  return (
    <ComingSoon
      eyebrow="Docs"
      title="Help guides are"
      accent="coming soon"
      body="Step-by-step guides for both editions are being written. Until then, our team answers every question on WhatsApp."
    />
  );
}
