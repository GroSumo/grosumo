import type { Metadata } from "next";
import { Check, ChevronDown, Minus } from "lucide-react";
import { BothInclude, EditionCards } from "@/components/Editions";
import { FinalCTA } from "@/components/HomeSections";
import Reveal from "@/components/Reveal";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { PRICE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editions & pricing — free offline billing software or cloud at ₹9,999/yr",
  description:
    "Offline edition: GST billing software that works without internet — software free forever, pay only ₹1,999/yr AMC. Cloud edition: ₹9,999/yr all-in, data hosted in India. Compare both editions.",
};

type Cell = string | boolean;

const comparison: { feature: string; offline: Cell; cloud: Cell }[] = [
  { feature: "Price", offline: `Software ${PRICE.offlineSoftware} + ${PRICE.offlineAmc}/yr AMC`, cloud: `${PRICE.cloud}/yr all-in` },
  { feature: "Where your data lives", offline: "On your own PC", cloud: "Secure servers in India" },
  { feature: "Internet required", offline: "No — works fully offline", cloud: "Yes" },
  { feature: "Access from anywhere", offline: false, cloud: true },
  { feature: "Use on multiple devices", offline: "On the PC it's installed on", cloud: "Any device with a browser" },
  { feature: "Backups", offline: "Automatic daily backups on your PC", cloud: "Automatic cloud backups" },
  { feature: "Updates", offline: "Included with AMC", cloud: "Automatic, always up to date" },
  { feature: "Modules included", offline: "All modules", cloud: "All modules" },
  { feature: "Bills, items & customers", offline: "Unlimited", cloud: "Unlimited" },
  { feature: "GST invoicing & reports", offline: true, cloud: true },
  { feature: "WhatsApp sharing", offline: true, cloud: true },
  { feature: "Support", offline: "WhatsApp & phone, with AMC", cloud: "WhatsApp & phone, included" },
  { feature: "Runs on", offline: "Windows PC", cloud: "Any modern browser" },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto size-5 text-brand" strokeWidth={3} aria-label="Yes" />;
  if (value === false) return <Minus className="mx-auto size-5 text-faint" aria-label="No" />;
  return <span>{value}</span>;
}

const faq = [
  {
    q: "Is the offline software really free?",
    a: "Yes — the software is free, forever, for everyone. There is no licence fee and no per-bill or per-user charge. The only charge is the ₹1,999/yr AMC.",
  },
  {
    q: "What does the AMC cover?",
    a: "The annual maintenance contract (₹1,999/yr) covers software updates, support from our team on WhatsApp and phone, and your yearly licence renewal.",
  },
  {
    q: "What happens if I don't renew the AMC?",
    a: "The offline software keeps working and your data stays yours, on your PC. You'll miss new updates and support. After a grace period, features that depend on an active licence pause until you renew — your bills and records are never locked away from you.",
  },
  {
    q: "What's included in the Cloud price?",
    a: "₹9,999/yr covers everything: hosting in India, automatic cloud backups, updates and support. There's no separate AMC for Cloud.",
  },
  {
    q: "Can I switch between editions later?",
    a: "Yes. You can move from Offline to Cloud, or Cloud to Offline, whenever it suits you — we help you move your data across.",
  },
  {
    q: "Do both editions support GST?",
    a: "Yes. Both editions include GST-compliant invoicing and GST reports. The features are the same — only where the software runs is different.",
  },
  {
    q: "What do I need to run the offline edition?",
    a: "A Windows PC. No internet connection is needed for day-to-day billing; you only need it to download updates.",
  },
  {
    q: "Can I bring my data from my current billing app or spreadsheets?",
    a: "Yes. We help you bring in your items, customers and opening balances when we set you up.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Editions & pricing"
        title="Free on your PC, or"
        accent="₹9,999/yr in the cloud"
        intro="Two editions of the same ERP. Every module, unlimited bills — the only difference is where it runs."
      />

      <section className="bg-wash py-16 sm:py-24">
        <Container className="max-w-5xl">
          <EditionCards showAnchors />
          <BothInclude />
          <p className="mt-6 text-center text-sm text-slate">Prices are per business, per year. Applicable GST extra.</p>
        </Container>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <Container className="max-w-5xl">
          <SectionHeading center eyebrow="Compare" title="Offline vs Cloud,"
            accent="side by side" />
          <Reveal className="mt-12 overflow-x-auto rounded-2xl border border-line shadow-card">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <caption className="sr-only">Comparison of the Offline and Cloud editions</caption>
              <thead>
                <tr className="bg-wash">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-slate">
                    Feature
                  </th>
                  <th scope="col" className="w-[32%] px-5 py-4 text-center">
                    <span className="block text-base font-bold text-ink">Offline</span>
                    <span className="mt-0.5 block text-xs font-semibold text-brandink">Software free</span>
                  </th>
                  <th scope="col" className="w-[32%] px-5 py-4 text-center">
                    <span className="block text-base font-bold text-ink">Cloud</span>
                    <span className="mt-0.5 block text-xs font-semibold text-slate">All-in</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(row => (
                  <tr key={row.feature} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 font-medium text-ink">
                      {row.feature}
                    </th>
                    <td className="bg-soft/40 px-5 py-4 text-center text-slate">
                      <CellValue value={row.offline} />
                    </td>
                    <td className="px-5 py-4 text-center text-slate">
                      <CellValue value={row.cloud} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-wash py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title="Questions about"
            accent="editions & pricing" />
          <div className="mt-12 space-y-3">
            {faq.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-line bg-white shadow-card open:shadow-lift">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-ink">
                  {q}
                  <ChevronDown className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate">
            Still have a question? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-brandink hover:underline">
              {SUPPORT_EMAIL}
            </a>{" "}
            or message us on WhatsApp.
          </p>
        </Container>
      </section>

      <FinalCTA title="Start free today." accent="Upgrade to Cloud whenever you like." />
    </>
  );
}
