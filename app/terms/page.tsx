import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Offline and Cloud editions of grosumoERP.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      accent="Service"
      intro="The key terms for using grosumoERP, in plain language."
      sections={[
        {
          heading: "Offline edition",
          body: "The Offline edition software is provided free of charge. The annual maintenance contract (AMC, ₹1,999 per year plus applicable taxes) covers updates, support and licence renewal. If the AMC is not renewed, the software continues to run and your data remains yours; updates and support stop, and after a grace period features that depend on an active licence may pause until renewal.",
        },
        {
          heading: "Cloud edition",
          body: "The Cloud edition is a yearly subscription (₹9,999 per year plus applicable taxes) that includes hosting in India, backups, updates and support for the subscription period.",
        },
        {
          heading: "Your data",
          body: "You own your business data in both editions. On request, we will help you export it or move it between the Offline and Cloud editions.",
        },
        {
          heading: "Fair use",
          body: "Use grosumoERP for lawful business purposes only. You are responsible for the accuracy of the bills, tax rates and filings you make with it.",
        },
      ]}
    />
  );
}
