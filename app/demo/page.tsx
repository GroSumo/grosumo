import { ArrowRight, Info } from "lucide-react";
import CopyField from "./CopyField";
import PageSchema from "@/components/PageSchema";
import Reveal from "@/components/Reveal";
import { CheckItem, Container, PageHeader, WhatsAppButton } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { DEMO, WA_TALK_LINK } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Live demo — try grosumoERP now",
  description: "Open a live grosumoERP demo with a sample shop: GST bills, stock, customer credit and reports already filled in. No sign-up, no card.",
  path: "/demo",
});

const TRY = [
  "Raise a GST bill at the POS",
  "Check today's profit on the dashboard",
  "Open a customer's credit (udhaar) ledger",
  "Compare fast-moving and sleeping stock",
  "Close the day",
];

export default function DemoPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: "Live demo", path: "/demo" }]} />
      <PageHeader
        eyebrow="Live demo"
        title="Try grosumoERP"
        accent="right now"
        intro="A live demo account with a sample shop — bills, stock, customers and reports already filled in. No sign-up, no card."
      />

      <section className="bg-wash py-16 sm:py-24">
        <Container className="grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border-2 border-brand bg-white p-7 shadow-lift sm:p-9">
              <h2 className="text-xl font-bold tracking-tight text-ink">Demo login</h2>
              <p className="mt-1 text-sm text-slate">Copy these, then open the demo in a new tab.</p>
              <div className="mt-6 space-y-3">
                <CopyField label="URL" value={DEMO.url} />
                <CopyField label="Username" value={DEMO.username} />
                <CopyField label="Password" value={DEMO.password} />
              </div>
              <a
                href={DEMO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brandink px-6 py-4 text-base font-bold text-white shadow-brand transition-colors hover:bg-brand-dark"
              >
                Open the demo <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold tracking-tight text-ink">What to try</h2>
              <ol className="mt-5 space-y-3 text-ink">
                {TRY.map(t => (
                  <CheckItem key={t}>{t}</CheckItem>
                ))}
              </ol>
              <p className="mt-8 flex gap-2.5 rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm leading-relaxed text-ink">
                <Info className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                This is a shared demo account. Data resets regularly, so don&apos;t enter real customer details.
              </p>
            </div>
          </Reveal>
        </Container>

        <Container className="mt-12 max-w-5xl text-center">
          <p className="text-lg font-bold tracking-tight text-ink">Ready for your own?</p>
          <WhatsAppButton href={WA_TALK_LINK} variant="secondary" className="mt-4">
            Talk to us on WhatsApp
          </WhatsAppButton>
        </Container>
      </section>
    </>
  );
}
