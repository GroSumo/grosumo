import { Nav, Footer, PageHero, WA_LINK_SERVICES } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata = { title: "Services — grosumo" };

const LINES: [string, string, string[], string][] = [
  [
    "Accounting & CA services",
    "Your ERP keeps clean double-entry books all year. Our accountants take it from there.",
    ["GST filing, on time, every time", "Bookkeeping review & corrections", "Year-end accounts & compliance", "Tax planning for the business and the owner"],
    "Because we work from your grosumoERP data — not a bag of bills — this is faster and cheaper than a cold engagement."
  ],
  [
    "Legal & registrations",
    "The paperwork of running and growing a business, handled by people who already know yours.",
    ["Company & GST registration", "Shop licenses & renewals", "Agreements, notices & contracts", "Trademarks for your brand"],
    "One team across software, accounts and legal means nothing gets lost between consultants."
  ],
  [
    "Marketing & design",
    "Your sales data says what's moving and what's stuck. We turn that into campaigns.",
    ["Logos, catalogs & packaging", "Social media & WhatsApp campaigns", "Clearance pushes for dead stock", "Local promotions that bring footfall"],
    "Marketing aimed by data beats marketing aimed by guesswork — and your ERP already has the data."
  ]
];

export default function Services() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="grosumo services"
        title="The suite comes"
        accent="with a team."
        sub="grosumoERP shows you what's happening. grosumo's people — accountants, legal professionals, designers and marketers — act on it."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-page space-y-8 px-6 py-20">
          {LINES.map(([title, sub, items, note], i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="card grid gap-8 p-8 md:grid-cols-[1.1fr_1fr] md:p-10">
                <div>
                  <span className="eyebrow text-brand">{`0${i + 1}`}</span>
                  <h2 className="h-display mt-2 text-[clamp(24px,3vw,34px)]">{title}</h2>
                  <p className="mt-3 max-w-[440px] text-[16px] leading-relaxed text-slate">{sub}</p>
                  <p className="mt-4 max-w-[440px] rounded-xl bg-wash p-4 text-[14px] leading-relaxed text-slate">
                    <b className="text-brand">Why with grosumo: </b>{note}
                  </p>
                </div>
                <ul className="grid content-center gap-3">
                  {items.map((x) => (
                    <li key={x} className="flex gap-2.5 rounded-xl border border-line px-4 py-3 text-[14.5px]">
                      <span className="font-bold text-brand">✓</span> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="pt-4 text-center">
            <a href={WA_LINK_SERVICES} target="_blank" rel="noopener" className="btn btn-green">Talk to the team on WhatsApp</a>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
