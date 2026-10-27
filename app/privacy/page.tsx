import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Grosumo handles your information in the Offline and Cloud editions of grosumoERP.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy"
      accent="Policy"
      intro="Your data, your choice — cloud or your own PC."
      sections={[
        {
          heading: "Offline edition",
          body: "Your business data — bills, items, customers and accounts — is stored on your own computer. It is not sent to Grosumo. You can download a full backup to your machine any time, or turn on a scheduled encrypted backup to your own email. We only receive information you choose to share with us, for example when you ask for support.",
        },
        {
          heading: "Cloud edition",
          body: "Your business data is stored on servers located in India so you can reach it from any device. We use it only to run the service for you, keep backups and provide support. We do not sell your data.",
        },
        {
          heading: "When you contact us",
          body: "If you message us on WhatsApp, email or call, we keep your name, phone number, email and the details you share so we can help you and manage your subscription or AMC.",
        },
        {
          heading: "Your rights",
          body: "You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it, subject to what we must keep for legal and tax purposes.",
        },
      ]}
    />
  );
}
