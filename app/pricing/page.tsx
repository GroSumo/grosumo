import { Nav, Footer, PageHero, WA_LINK } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata = { title: "Pricing — grosumoERP" };

const INCLUDED = [
  "All 18 modules — POS, billing, stock, accounts, everything",
  "Unlimited bills, items and customers",
  "GST-compliant invoicing",
  "Automatic daily backups on your machine",
  "Phone & mobile access on your shop Wi-Fi",
  "Free help migrating from Tally, Vyapar or Excel"
];

const FAQ: [string, string][] = [
  ["What does the ₹1,999/yr AMC include?", "The Annual Maintenance Contract covers three things: software updates (every new feature and fix), support (phone and mobile help when you're stuck), and your license renewal so the software keeps running. It's the same ₹1,999/yr for founding members and standard customers alike."],
  ["What does \"lifetime free subscription\" mean?", "The ₹2,999/yr subscription is the licence fee for the software itself. Founding 1000 members never pay it — not the first year, not ever. You still pay the ₹1,999/yr AMC to stay updated and supported, but the subscription is ₹0 for the life of your shop. That's ₹2,999 saved every single year, forever."],
  ["What happens after the 1,000 founding slots are gone?", "The Founding 1000 offer closes for good — no extensions, no second batch. New shops after that pay the standard ₹2,999/yr subscription plus the ₹1,999/yr AMC. Anyone who claimed a founding slot keeps their lifetime-free subscription regardless."],
  ["Do I need the internet?", "No. Billing, stock and accounts run fully offline. Internet is only used for optional extras like WhatsApp sharing or emailing a backup."],
  ["What happens if I let the AMC lapse?", "Your data is always yours — it lives on your machine and stays readable. There's a grace period after expiry, so you're never locked out overnight. Renew the AMC to resume updates and support."],
  ["Are grosumo services included?", "Services — CA & accounting, legal, marketing — are separate and optional. Because they work from your ERP's clean books, they're faster and cheaper than starting from a shoebox of bills."],
  ["What do I need to run it?", "A regular Windows PC or laptop at the shop. Installation takes about ten minutes."]
];

export default function Pricing() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="Pricing"
        title="One price. And the first 1,000 shops"
        accent="never pay it."
        sub="One license per shop: ₹2,999/yr subscription plus ₹1,999/yr AMC. Claim a Founding 1000 slot and the subscription is ₹0 for life — you only ever pay the AMC."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-page px-6 py-20">
          <div className="mx-auto grid max-w-[840px] items-stretch gap-5 md:grid-cols-2">
            {/* Founding 1000 */}
            <Reveal delay={90}>
              <div className="card relative h-full border-brand p-8 text-center ring-1 ring-brand">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Limited — first 1,000 shops only
                </span>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                  Founding 1000
                </div>
                <div className="mt-3 text-[38px] font-bold leading-none text-brand">
                  ₹0 subscription for life
                </div>
                <div className="mt-2 font-mono text-[13px] text-slate">just ₹1,999/yr AMC</div>
                <p className="mt-4 text-[14px] leading-relaxed text-slate">
                  The first 1,000 shops never pay the ₹2,999 subscription — not this
                  year, not ever. Only the yearly AMC that keeps you updated and
                  supported.
                </p>
                <ul className="mt-5 space-y-2 text-left text-[14px] text-slate">
                  {[
                    "₹0 subscription — for the life of your shop",
                    "₹1,999/yr AMC: updates, support, licence renewal",
                    "Every one of the 18 modules included"
                  ].map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <span className="mt-[2px] font-bold text-brand">✓</span> {x}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-green mt-6 w-full"
                >
                  Claim founding slot
                </a>
              </div>
            </Reveal>
            {/* Standard */}
            <Reveal delay={180}>
              <div className="card h-full p-8 text-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                  Standard
                </div>
                <div className="mt-3 text-[38px] font-bold leading-none">
                  ₹2,999<span className="text-[20px] font-medium text-slate">/yr</span>
                </div>
                <div className="mt-2 font-mono text-[13px] text-slate">+ ₹1,999/yr AMC</div>
                <p className="mt-4 text-[14px] leading-relaxed text-slate">
                  Subscription plus AMC once the founding slots are gone. Still one
                  price per shop, still offline, still yours.
                </p>
                <ul className="mt-5 space-y-2 text-left text-[14px] text-slate">
                  {[
                    "₹2,999/yr subscription (licence for the software)",
                    "₹1,999/yr AMC: updates, support, licence renewal",
                    "Every one of the 18 modules included"
                  ].map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <span className="mt-[2px] font-bold text-brand">✓</span> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-8 text-center">
            <p className="font-mono text-[13px] text-brand">
              Founding members save ₹2,999 every single year — forever.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-[760px]">
            <div className="card p-8">
              <div className="text-[17px] font-bold">Every plan includes</div>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[14.5px] text-slate">
                    <span className="mt-[2px] font-bold text-brand">✓</span> {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="mt-10 text-center">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-green">Claim your founding slot</a>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.15em] text-slate">
              grosumo services (CA · legal · marketing) priced separately — ask us
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-wash">
        <div className="mx-auto max-w-[780px] px-6 py-20">
          <Reveal className="text-center">
            <span className="eyebrow text-brand">Questions</span>
            <h2 className="h-display mt-4 text-[clamp(28px,4vw,42px)]">Fair questions, straight answers.</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="card overflow-hidden !rounded-xl">
                <summary className="cursor-pointer list-none px-6 py-5 text-[15.5px] font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                </summary>
                <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
