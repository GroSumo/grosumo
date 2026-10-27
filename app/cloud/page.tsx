import { CloudUpload, Globe, ShieldCheck, Smartphone } from "lucide-react";
import EditionLanding from "@/components/EditionLanding";
import { CLOUD_FAQ } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { PRICE, WA_CLOUD_LINK } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cloud Billing Software for Indian Shops",
  description: "Cloud GST billing and inventory software you can open from any device. ₹9,999/yr all-in: hosting in India, updates and support.",
  path: "/cloud",
});

export default function CloudPage() {
  return (
    <EditionLanding
      edition="Cloud"
      path="/cloud"
      eyebrow="Cloud edition"
      title="Cloud billing software,"
      accent="anywhere, any device"
      intro="Open grosumoERP in your browser from the shop, at home or on the road. ₹9,999/yr all-in — hosting in India, updates and support."
      price={{
        label: "All-in",
        amount: PRICE.cloud,
        suffix: "/yr",
        note: "Hosting in India, updates and support included. No separate AMC.",
      }}
      ctaHref={WA_CLOUD_LINK}
      ctaLabel="Ask about Cloud on WhatsApp"
      suits={[
        "Owners who check sales and dues away from the shop",
        "Billing on more than one device",
        "Hands-off updates",
        "Shops with a reliable internet connection",
      ]}
      benefits={[
        { icon: Globe, title: "Access from anywhere", desc: "See today's sales, stock and dues from home or on the road." },
        { icon: Smartphone, title: "Any device", desc: "Works in the browser on a phone, tablet, laptop or desktop." },
        { icon: CloudUpload, title: "Backups you control", desc: "Download a full backup any time; optional scheduled encrypted email backup." },
        { icon: ShieldCheck, title: "Hosted in India", desc: "Your business data is stored on servers in India and kept up to date." },
      ]}
      faq={CLOUD_FAQ}
      other={{ href: "/offline", text: "Unreliable internet? See the free Offline edition" }}
    />
  );
}
