import Link from "next/link";
import { Reveal, CountUp, ProgressBar } from "./motion";
import { DashboardMock } from "./DashboardMock";
import { WA_LINK } from "./ui";

/* --------------------------- Founding 1000 offer --------------------------- */

// update manually until wired to real data
export const FOUNDING_CLAIMED = 120;
export const FOUNDING_TOTAL = 1000;

/* --------------------------------- Hero --------------------------------- */

export function HomeHero() {
  return (
    <header className="hero-dark relative text-fog">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-page px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-[840px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-linedark bg-white/5 px-4 py-1.5 text-[13px] font-medium text-mint">
            <span className="live-dot h-[7px] w-[7px] rounded-full bg-mint" />
            Founding 1000: lifetime subscription free — {FOUNDING_CLAIMED} claimed
          </span>
          <h1 className="h-display mt-7 text-[clamp(40px,6vw,76px)]">
            One system runs your{" "}
            <span className="h-accent text-mint">whole business.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-relaxed text-haze">
            grosumoERP is the complete business suite for Indian SMEs — billing,
            stock, purchases, accounts and customer credit in one place, turning
            every transaction into insight. And it runs on <b className="text-fog">your</b> machine,
            not the cloud.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-solid">Claim founding slot</a>
            <Link href="/product" className="btn btn-dark-outline">Explore the suite</Link>
          </div>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.15em] text-haze">
            GST billing · Works offline · 10-minute install · Data on your PC
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-14 max-w-[980px] pb-16">
          <DashboardMock />
        </div>
      </div>
    </header>
  );
}

/* ---------------------------- Founding counter ---------------------------- */

export function FoundingCounter() {
  const remaining = FOUNDING_TOTAL - FOUNDING_CLAIMED;
  const pct = (FOUNDING_CLAIMED / FOUNDING_TOTAL) * 100;
  return (
    <section className="hero-dark relative text-fog">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-page px-6 pb-24 pt-4">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <span className="eyebrow text-mint">Founding 1000</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.6vw,52px)]">
            The first 1,000 shops never pay for the software.{" "}
            <span className="h-accent text-mint">Ever.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-haze">
            Founding members get grosumoERP&apos;s subscription free for life — pay
            only the ₹1,999/yr AMC that keeps you updated and supported. Once 1,000
            shops are in, this offer is gone for good.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-[640px]">
          <div className="glass p-7 md:p-9">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-mono text-[42px] font-medium leading-none text-mint">
                  <CountUp to={FOUNDING_CLAIMED} />
                  <span className="text-[24px] text-fog/50">
                    {" "}/ {FOUNDING_TOTAL.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 text-[14px] text-haze">founding slots claimed</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[30px] font-medium leading-none text-fog">
                  <CountUp to={remaining} />
                </div>
                <div className="mt-2 text-[13px] text-haze">slots remaining</div>
              </div>
            </div>

            <ProgressBar
              pct={pct}
              className="mt-6 h-[10px] w-full overflow-hidden rounded-full bg-white/10"
              barClassName="h-full rounded-full bg-gradient-to-r from-mint to-emerald"
            />

            <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-haze">
              <span>
                {FOUNDING_CLAIMED} of {FOUNDING_TOTAL.toLocaleString("en-IN")} claimed
              </span>
              <span className="text-mint">lifetime subscription free</span>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener"
              className="btn btn-solid mt-7 w-full"
            >
              Claim your founding slot
            </a>
          </div>
        </Reveal>
      </div>
      {/* fade into white */}
      <div className="h-[110px] w-full bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

/* ------------------------------- Stat band ------------------------------- */

export function StatBand() {
  const stats: [number, string, string, string][] = [
    [18, "", "modules", "in one suite — nothing sold separately"],
    [100, "%", "of your data", "stays on your own machine"],
    [0, "₹", "subscription", "for the first 1,000 shops — free for life"],
    [10, "", "minutes", "from download to your first GST bill"]
  ];
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-page grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
        {stats.map(([n, fix, big, small], i) => (
          <Reveal key={big} delay={i * 80} className="text-center">
            <div className="font-mono text-[44px] font-medium leading-none text-brand">
              {fix === "₹" ? (
                <CountUp to={n} prefix="₹" />
              ) : (
                <CountUp to={n} suffix={fix} />
              )}
            </div>
            <div className="mt-2 text-[15px] font-semibold">{big}</div>
            <div className="mx-auto mt-1 max-w-[190px] text-[13px] text-slate">{small}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Suite grid ------------------------------- */

const SUITE: { cat: string; tint: string; items: [string, string][] }[] = [
  {
    cat: "Sell",
    tint: "#12B981",
    items: [
      ["POS billing", "Fast counter billing with GST, discounts and split payments"],
      ["Quotations", "Send quotes, convert to invoices in one click"],
      ["Returns & exchanges", "Reverse stock and books automatically"]
    ]
  },
  {
    cat: "Stock",
    tint: "#0EA5A0",
    items: [
      ["Inventory", "Live stock with every sale and purchase"],
      ["Purchases & suppliers", "Supplier bills, dues and history"],
      ["Transfers & adjustments", "Multi-location moves with audit trail"]
    ]
  },
  {
    cat: "Money",
    tint: "#F5A623",
    items: [
      ["Accounts & journals", "Real double-entry books with integrity checks"],
      ["Day close", "Cash, UPI and card tallied every evening"],
      ["Expenses & commissions", "Every rupee out, categorised"]
    ]
  },
  {
    cat: "People",
    tint: "#7C6FF0",
    items: [
      ["Customers & credit", "Ledgers and udhaar aged by the day"],
      ["Leads", "Follow-ups that don't slip"],
      ["Reports & WhatsApp", "Insights on demand, shared instantly"]
    ]
  }
];

export function SuiteGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-page px-6 py-24">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="eyebrow text-brand">The suite</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.4vw,50px)]">
            Everything inside. <span className="h-accent text-brand">Nothing extra to buy.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            Billing apps do billing. Accounting apps do accounts. grosumoERP is
            one system where every module already talks to the others — because
            it&apos;s one database, on one machine: yours.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SUITE.map((s, i) => (
            <Reveal key={s.cat} delay={i * 90}>
              <div className="card h-full p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-[10px] w-[10px] rounded-full" style={{ background: s.tint }} />
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-slate">{s.cat}</span>
                </div>
                <div className="space-y-5">
                  {s.items.map(([t, d]) => (
                    <div key={t}>
                      <div className="text-[15.5px] font-semibold">{t}</div>
                      <div className="mt-0.5 text-[13.5px] leading-snug text-slate">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/product" className="btn btn-outline">See the full product →</Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Intelligence rows --------------------------- */

function RotationRing() {
  const stops = [
    { label: "CASH", angle: -90 },
    { label: "STOCK", angle: 0 },
    { label: "SALE", angle: 90 },
    { label: "COLLECT", angle: 180 }
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Capital rotation cycle">
        <circle cx="200" cy="200" r="140" fill="none" stroke="#E3ECE7" strokeWidth="2" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#12B981" strokeWidth="2.5" strokeDasharray="5 10" opacity="0.6" />
        <g className="rotor">
          <circle cx="200" cy="60" r="13" fill="#12B981" style={{ filter: "drop-shadow(0 4px 10px rgba(18,185,129,.5))" }} />
          <text x="200" y="65" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-mono)">₹</text>
        </g>
        {stops.map((s) => {
          const rad = (s.angle * Math.PI) / 180;
          return (
            <g key={s.label}>
              <circle cx={200 + 140 * Math.cos(rad)} cy={200 + 140 * Math.sin(rad)} r="5" fill="#fff" stroke="#0B1512" strokeWidth="1.5" />
              <text
                x={200 + 176 * Math.cos(rad)}
                y={200 + 176 * Math.sin(rad) + 4}
                textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="#5A6B63" letterSpacing="1.5"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <CountUp to={6.2} decimals={1} suffix="×" className="font-mono text-[58px] font-medium leading-none text-brand" />
        <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">rotations / year</span>
      </div>
    </div>
  );
}

const CAL = [1240, 2210, 1890, -640, 2450, 3120, 2280, 1760, -890, 2540, 2980, 2140, 1420, 2680, -1120, 3340, 2470, 1980, 2210, 2760, -430, 2890, 3480, 2050, 1870, 2640, 2320, 2980, 3120, 2440];

function ProfitCal() {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="text-[14.5px] font-semibold">This month, day by day</span>
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate">profit / deficit</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {CAL.map((d, i) => (
          <div
            key={i}
            title={`Day ${i + 1}: ${d < 0 ? "−" : "+"}₹${Math.abs(d).toLocaleString("en-IN")}`}
            className={`flex aspect-square items-center justify-center rounded-md font-mono text-[10px] text-white ${d < 0 ? "bg-coral" : "bg-emerald"}`}
            style={{ opacity: d < 0 ? 1 : 0.45 + Math.min(d / 3500, 0.55) }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[11px] text-slate">
        <span><span className="text-emerald">■</span> profit day</span>
        <span><span className="text-coral">■</span> deficit day</span>
      </div>
    </div>
  );
}

const AGING = [
  { label: "0–15d", amt: "₹21,400", pct: 38 },
  { label: "16–30d", amt: "₹18,600", pct: 33 },
  { label: "31–45d", amt: "₹9,800", pct: 17 },
  { label: "45d+", amt: "₹6,500", pct: 12, red: true }
];

function AgingCard() {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="text-[14.5px] font-semibold">Receivables by age</span>
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate">₹56,300 · 12 customers</span>
      </div>
      <div className="mb-4 flex h-[34px] w-full overflow-hidden rounded-lg">
        {AGING.map((a) => (
          <div key={a.label} className={a.red ? "bg-coral" : "bg-emerald"} style={{ width: `${a.pct}%`, opacity: a.red ? 1 : 0.45 + a.pct / 55 }} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {AGING.map((a) => (
          <div key={a.label}>
            <div className={`font-mono text-[14px] ${a.red ? "text-coral" : ""}`}>{a.amt}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate">{a.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLEEPERS = [
  { name: "Kurti style #07", days: 118, pct: 62 },
  { name: "Steel Tiffin 3-tier", days: 134, pct: 44 },
  { name: "Fancy Torch XL", days: 202, pct: 26 }
];

function DeadStockCard() {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="text-[14.5px] font-semibold">Sleeping stock</span>
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-amber">₹1.8L parked</span>
      </div>
      <div className="space-y-4">
        {SLEEPERS.map((s) => (
          <div key={s.name}>
            <div className="mb-1 flex justify-between text-[13px]">
              <span>{s.name}</span>
              <span className="font-mono text-slate">idle {s.days} days</span>
            </div>
            <div className="h-[7px] w-full overflow-hidden rounded-full bg-wash">
              <div className="h-full rounded-full bg-amber" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ROWS: {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string[];
  visual: React.ReactNode;
}[] = [
  {
    id: "rotation",
    eyebrow: "Working capital",
    title: "See how fast your money",
    accent: "rotates.",
    body: [
      "Every trader knows the word: paisa rotate hona. Cash becomes stock, stock becomes a sale, the sale becomes cash again — and the faster that circle turns, the more one rupee earns in a year.",
      "grosumoERP watches every purchase, sale and collection to show your rotation, which items turn fastest, and where the circle is stuck."
    ],
    visual: <RotationRing />
  },
  {
    id: "profit",
    eyebrow: "Daily truth",
    title: "Know your profit",
    accent: "tonight, not in March.",
    body: [
      "A full drawer can still be a losing day once purchases, expenses and credit are counted. The day close tallies cash, UPI and card — and the double-entry books say whether the day actually earned.",
      "Deficit days stop being a surprise and start being a pattern you can plan around."
    ],
    visual: <ProfitCal />
  },
  {
    id: "stock",
    eyebrow: "Shelf economics",
    title: "Find the cash",
    accent: "sleeping on your shelves.",
    body: [
      "Dead stock is cash wearing a disguise. Every item is ranked by how fast it turns, so you reorder the winners and clear the sleepers before they eat your working capital.",
      "And when it's time to clear them — grosumo's marketing team is one call away."
    ],
    visual: <DeadStockCard />
  },
  {
    id: "credit",
    eyebrow: "Udhaar, managed",
    title: "Track who owes you,",
    accent: "and for how long.",
    body: [
      "Credit keeps customers loyal — until the notebook gets fuzzy. Every credit bill lands in a customer ledger, aged by the day.",
      "Pending statements go to the customer's WhatsApp with the bills attached — politely, before goodwill becomes a write-off."
    ],
    visual: <AgingCard />
  }
];

export function IntelligenceRows() {
  return (
    <section className="bg-wash">
      <div className="mx-auto max-w-page px-6 py-24">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <span className="eyebrow text-brand">Built-in intelligence</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.4vw,50px)]">
            Your customers are already telling you{" "}
            <span className="h-accent text-brand">what to do.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            Every bill is a signal. One invoice looks like paper — a year of
            invoices is the truth about your business. grosumoERP reads it for you.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {ROWS.map((r, i) => (
            <div key={r.id} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <Reveal className="md:[direction:ltr]">
                <span className="eyebrow text-brand">{r.eyebrow}</span>
                <h3 className="h-display mt-3 text-[clamp(26px,3.2vw,38px)]">
                  {r.title} <span className="h-accent text-brand">{r.accent}</span>
                </h3>
                {r.body.map((p) => (
                  <p key={p.slice(0, 20)} className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-slate">{p}</p>
                ))}
              </Reveal>
              <Reveal delay={120} className="md:[direction:ltr]">{r.visual}</Reveal>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center font-mono text-[11.5px] uppercase tracking-[0.15em] text-slate">
          Sample figures shown — yours come from your own bills
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- Offline -------------------------------- */

export function OfflineBand() {
  return (
    <section className="hero-dark relative text-fog">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-page px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-[740px]">
          <span className="eyebrow text-mint">Why offline-first</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.6vw,52px)]">
            Your numbers are your advantage. <span className="h-accent text-mint">Keep them.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[17px] leading-relaxed text-haze">
            Cloud apps put your margins, prices and customer list on someone
            else&apos;s server — and stop working when the internet does. grosumoERP
            runs entirely on your own computer, with automatic daily backups.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["On your PC", "the only copy of your data is the one you own"],
            ["No internet", "needed to bill, stock or close the day"],
            ["No cloud bill", "a simple yearly plan, not a per-seat cloud rent"],
            ["Daily backups", "automatic, local, one-click restore"]
          ].map(([n, l], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="glass h-full p-6">
                <div className="text-[19px] font-bold text-mint">{n}</div>
                <div className="mt-2 text-[13px] leading-snug text-haze">{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Services -------------------------------- */

const SVCS = [
  ["The data says", "Margins thin, GST season near", "grosumo does", "Accounting & CA services", "Bookkeeping review, GST filing and year-end compliance — straight from your ERP books."],
  ["The data says", "₹1.8L of stock is sleeping", "grosumo does", "Marketing & design", "Clearance campaigns, catalogs and social media that move what the data says is stuck."],
  ["The data says", "Growing fast, paperwork piling", "grosumo does", "Legal & registrations", "Licenses, agreements and registrations by people who already know your business."]
];

export function ServicesBand() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-page px-6 py-24">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="eyebrow text-brand">The grosumo advantage</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.4vw,50px)]">
            The suite comes <span className="h-accent text-brand">with a team.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            grosumoERP is built by grosumo — a services platform for SMEs and
            MSMEs. When your numbers point at a problem, our people fix it.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SVCS.map(([e1, finding, e2, fix, how], i) => (
            <Reveal key={fix} delay={i * 90}>
              <div className="card flex h-full flex-col p-6">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-amber">{e1}</span>
                <p className="mt-1.5 text-[19px] font-bold leading-snug">{finding}</p>
                <div className="my-5 border-t border-line" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand">{e2}</span>
                <p className="mt-1.5 text-[15.5px] font-semibold">{fix}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{how}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Pricing teaser ------------------------------ */

export function PricingTeaser() {
  return (
    <section className="bg-wash">
      <div className="mx-auto max-w-page px-6 py-24">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <span className="eyebrow text-brand">Honest pricing</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4.4vw,50px)]">
            One price. And the first 1,000 shops{" "}
            <span className="h-accent text-brand">never pay it.</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-[820px] items-stretch gap-5 md:grid-cols-2">
          {/* Founding 1000 */}
          <Reveal delay={90}>
            <div className="card relative h-full border-brand p-7 text-center ring-1 ring-brand">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Limited — first 1,000 shops only
              </span>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                Founding 1000
              </div>
              <div className="mt-3 text-[34px] font-bold leading-none text-brand">
                ₹0 subscription for life
              </div>
              <div className="mt-2 font-mono text-[13px] text-slate">
                just ₹1,999/yr AMC
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Never pay the ₹2,999 subscription — not this year, not ever. Only the
                yearly AMC for updates &amp; support.
              </p>
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
            <div className="card h-full p-7 text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                Standard
              </div>
              <div className="mt-3 text-[34px] font-bold leading-none">
                ₹2,999<span className="text-[18px] font-medium text-slate">/yr</span>
              </div>
              <div className="mt-2 font-mono text-[13px] text-slate">
                + ₹1,999/yr AMC
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Subscription plus AMC once the founding slots are gone. Still one price
                per shop, still offline, still yours.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-8 text-center">
          <p className="font-mono text-[12.5px] text-brand">
            Founding members save ₹2,999 every single year — forever.
          </p>
          <Link href="/pricing" className="btn btn-green mt-6">See full pricing</Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */

export function FinalCTA() {
  return (
    <section className="hero-dark relative text-fog">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-page px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-[680px]">
          <h2 className="h-display text-[clamp(34px,5vw,58px)]">
            Run the whole business. <span className="h-accent text-mint">Own the whole data.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-[17px] text-haze">
            Install grosumoERP today — by tonight, your first day close will
            tell you something you didn&apos;t know.
          </p>
          <p className="mx-auto mt-4 max-w-[540px] text-[15px] text-mint">
            Founding 1000: the first 1,000 shops pay ₹0 subscription for life — only the
            ₹1,999/yr AMC. Once the slots are gone, this offer is gone for good.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-solid">Claim founding slot</a>
            <Link href="/contact" className="btn btn-dark-outline">Talk to us</Link>
          </div>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.15em] text-haze">
            No credit card · Works offline · Free migration help
          </p>
        </Reveal>
      </div>
    </section>
  );
}
