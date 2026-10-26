import { Check, Minus } from "lucide-react";
import { BothInclude, EditionCards } from "@/components/Editions";
import Faq from "@/components/Faq";
import { FinalCTA } from "@/components/HomeSections";
import Reveal from "@/components/Reveal";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { PRICING_FAQ } from "@/lib/faq";
import { faqNode, pageMetadata, softwareApplicationNode } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";
import { PRICE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pricing: offline free + AMC, cloud ₹9,999/yr",
  description: "Offline edition: software free, ₹1,999/yr AMC. Cloud: ₹9,999/yr all-in. All modules, unlimited bills. Compare both editions side by side.",
  path: "/pricing",
});

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


export default function PricingPage() {
  return (
    <>
      <PageSchema
        crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        nodes={[softwareApplicationNode(), faqNode(PRICING_FAQ, "/pricing")]}
      />
      <PageHeader
        eyebrow="Editions & pricing"
        title="Free on your PC, or"
        accent="₹9,999/yr in the cloud"
        intro="Two editions of the same ERP. Every module, unlimited bills — the only difference is where it runs."
      />

      <section className="bg-wash py-16 sm:py-24">
        <Container className="max-w-5xl">
          <h2 className="sr-only">Choose an edition</h2>
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
          <div className="mt-12">
            <Faq items={PRICING_FAQ} />
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
