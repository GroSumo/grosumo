import { DatabaseBackup, HardDrive, Layers, WifiOff } from "lucide-react";
import EditionLanding from "@/components/EditionLanding";
import { OFFLINE_FAQ } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { PRICE, WA_OFFLINE_LINK } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Offline Billing Software, Free & No Internet",
  description: "GST billing software that works without internet on your Windows PC. Software free forever — pay only ₹1,999/yr AMC. Full backup any time.",
  path: "/offline",
});

export default function OfflinePage() {
  return (
    <EditionLanding
      edition="Offline"
      path="/offline"
      eyebrow="Offline edition"
      title="Billing software that works"
      accent="without internet"
      intro="GST billing, stock and accounts on your own Windows PC. The software is free forever — you pay only ₹1,999/yr AMC for updates, support and licence renewal."
      price={{
        label: "Software",
        amount: PRICE.offlineSoftware,
        suffix: "forever",
        note: `+ ${PRICE.offlineAmc}/yr AMC — updates, support and licence renewal. No per-user or per-bill charges.`,
      }}
      ctaHref={WA_OFFLINE_LINK}
      ctaLabel="Get Offline on WhatsApp"
      suits={[
        "Shops with patchy internet or frequent power cuts",
        "Owners who want their data on their own machine",
        "Billing from a counter PC",
        "Keeping yearly costs as low as possible",
      ]}
      benefits={[
        { icon: WifiOff, title: "Bill with zero internet", desc: "Billing, stock and reports run on your PC, so the counter never waits for a connection." },
        { icon: HardDrive, title: "Your data stays with you", desc: "Every bill and record is stored on your own computer and never leaves it." },
        { icon: DatabaseBackup, title: "Backups you control", desc: "Download a full backup any time; optional scheduled encrypted email backup." },
        { icon: Layers, title: "Every module included", desc: "GST billing, stock, purchases, accounts, customer credit and reports — nothing held back." },
      ]}
      faq={OFFLINE_FAQ}
      other={{ href: "/cloud", text: "Need access from anywhere? See the Cloud edition" }}
    />
  );
}
