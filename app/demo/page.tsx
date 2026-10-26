import { Info, Layers } from "lucide-react";
import CopyField from "./CopyField";
import DemoOptions from "./DemoOptions";
import PageSchema from "@/components/PageSchema";
import Reveal from "@/components/Reveal";
import { CheckItem, Container, PageHeader, WhatsAppButton } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { DEMO, WA_TALK_LINK } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Live demo — desktop & mobile",
  description: "Try grosumoERP live on your PC or phone: the full desktop ERP and the mobile view share one sample shop. GST bills, stock, udhaar. No sign-up, no card.",
  path: "/demo",
});

const TRY: { text: string; view: "desktop" | "mobile" }[] = [
  { text: "Raise a GST bill at the POS", view: "desktop" },
  { text: "Check today's profit on the dashboard", view: "desktop" },
  { text: "Check a customer's udhaar before giving more credit", view: "mobile" },
  { text: "Look up an item's stock from the shop floor", view: "mobile" },
  { text: "Compare fast-moving and sleeping stock", view: "desktop" },
  { text: "Close the day", view: "desktop" },
];

export default function DemoPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: "Live demo", path: "/demo" }]} />
      <PageHeader
        eyebrow="Live demo"
        title="Try grosumoERP"
        accent="right now"
        intro="A live demo account with a sample shop — open the full ERP on your PC or the mobile view on your phone. No sign-up, no card."
      />

      <section className="bg-wash py-16 sm:py-24">
        <Container className="max-w-5xl space-y-6">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold tracking-tight text-ink">Demo login</h2>
              <p className="mt-1 text-sm text-slate">Same login for both views. Copy these, then open the demo below in a new tab.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <CopyField label="Username" value={DEMO.username} />
                <CopyField label="Password" value={DEMO.password} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <DemoOptions />
          </Reveal>

          <Reveal delay={100}>
            <div className="flex gap-3 rounded-2xl border border-brand/20 bg-soft p-5 sm:p-6">
              <Layers className="mt-0.5 size-5 shrink-0 text-brandink" aria-hidden />
              <div>
                <h2 className="font-bold tracking-tight text-ink">Same shop, two screens</h2>
                <p className="mt-1 leading-relaxed text-slate">
                  The desktop and mobile views share one database. A bill raised on the phone shows on the desktop dashboard instantly — on the
                  shop&apos;s Wi-Fi for the Offline edition, anywhere for Cloud.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold tracking-tight text-ink">What to try</h2>
              <ol className="mt-5 grid gap-x-8 gap-y-3 text-ink md:grid-cols-2">
                {TRY.map(t => (
                  <CheckItem key={t.text}>
                    {t.text} <span className="text-faint">({t.view})</span>
                  </CheckItem>
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
