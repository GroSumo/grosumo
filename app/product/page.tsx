import { Nav, Footer, PageHero, WA_LINK } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/home";

export const metadata = { title: "Product — grosumoERP" };

const GROUPS: { id: string; cat: string; blurb: string; mods: [string, string][] }[] = [
  {
    id: "sell",
    cat: "Sell & bill",
    blurb: "Everything between \"how much?\" and money in the drawer.",
    mods: [
      ["POS billing", "Fast counter billing with GST rates per line, discounts, and cash/UPI/card split payments. Built for queues."],
      ["GST invoices", "Compliant invoices printed or shared on WhatsApp in one click, with proper books written underneath."],
      ["Quotations", "Professional quotes that convert to invoices the moment the customer says yes — no re-entry."],
      ["Returns & exchanges", "Reversals that put stock back and correct the ledger automatically, every time."]
    ]
  },
  {
    id: "stock",
    cat: "Stock & purchases",
    blurb: "Know what's on the shelf, what it cost, and when to reorder.",
    mods: [
      ["Inventory", "A live item catalog where every sale, purchase and return updates stock instantly."],
      ["Purchases & suppliers", "Supplier bills, outstanding dues and full purchase history against every item."],
      ["Stock transfers", "Move stock between locations with a clean trail of what went where."],
      ["Adjustments", "When the physical count disagrees, adjust with a reason — audited, not erased."]
    ]
  },
  {
    id: "money",
    cat: "Accounts & insight",
    blurb: "Real books, closed daily — and read like an analyst.",
    mods: [
      ["Double-entry accounts", "Journals, ledgers and a general ledger with built-in integrity checks. Your CA gets books, not a shoebox."],
      ["Day close", "Cash, UPI and card tallied every evening. Profit or deficit, known tonight."],
      ["Expenses & commissions", "Every rupee out — rent, salaries, staff commissions — categorised and counted."],
      ["Reports & insights", "Sales, stock, profit and rotation reports on demand, shareable to WhatsApp."]
    ]
  },
  {
    id: "people",
    cat: "Customers & team",
    blurb: "The relationships that keep the shop running.",
    mods: [
      ["Customer ledgers", "Credit (udhaar) tracked per customer, aged by the day, with pending statements to WhatsApp."],
      ["Leads", "Enquiries and follow-ups that don't slip through."],
      ["Employees", "Staff records and commission tracking in the same system."],
      ["Backups & license", "Automatic daily local backups, one-click restore, and offline license activation."]
    ]
  }
];

export default function Product() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="The product"
        title="Eighteen modules."
        accent="One system."
        sub="Every module shares one database on your machine — so a sale updates stock, books and customer ledgers in the same second. No sync, no integrations, no internet."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-page space-y-20 px-6 py-20">
          {GROUPS.map((g, gi) => (
            <div key={g.id} id={g.id}>
              <Reveal>
                <span className="eyebrow text-brand">{`0${gi + 1}`} · {g.cat}</span>
                <h2 className="h-display mt-3 text-[clamp(26px,3.4vw,40px)]">{g.blurb}</h2>
              </Reveal>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {g.mods.map(([t, d], i) => (
                  <Reveal key={t} delay={i * 70}>
                    <div className="card h-full p-6">
                      <div className="text-[16px] font-bold">{t}</div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate">{d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-wash">
        <div className="mx-auto max-w-page px-6 py-20">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <span className="eyebrow text-brand">A day with grosumoERP</span>
            <h2 className="h-display mt-4 text-[clamp(28px,4vw,44px)]">
              Morning shutter to <span className="h-accent text-brand">evening close.</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-[980px] gap-5 md:grid-cols-3">
            {[
              ["9:30 AM", "Open", "Yesterday's close is on the dashboard. Two items hit reorder level overnight — the purchase order is one click."],
              ["All day", "Sell", "Bills fly at the counter — GST, discounts, credit — while stock, ledgers and customer accounts update themselves."],
              ["9:00 PM", "Close", "Cash, UPI and card tallied. Today's profit on screen. Backup done automatically. Shutter down."]
            ].map(([t, h, d], i) => (
              <Reveal key={h} delay={i * 90}>
                <div className="card h-full p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">{t}</div>
                  <div className="mt-1 text-[20px] font-bold">{h}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-green">Claim founding slot</a>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
