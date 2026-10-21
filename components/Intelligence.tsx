import { MessageCircle } from "lucide-react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { CheckItem, Container, Eyebrow, SectionHeading } from "./ui";

/* ---------- Visuals (all sample data) ---------- */

function RotationRing() {
  const r = 70;
  const c = 2 * Math.PI * r;
  const pct = 6.2 / 8; // against an 8× yearly goal
  const groups = [
    { label: "Fast movers", value: "11.4×", tone: "text-emerald" },
    { label: "Store average", value: "6.2×", tone: "text-ink" },
    { label: "Slow movers", value: "1.3×", tone: "text-coral" },
  ];
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
      <div className="relative size-44 shrink-0">
        <svg viewBox="0 0 180 180" className="size-full -rotate-90" aria-hidden>
          <circle cx="90" cy="90" r={r} fill="none" stroke="var(--color-soft)" strokeWidth="16" />
          <circle
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${c * pct} ${c}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-medium text-ink">
            <CountUp value={6.2} decimals={1} suffix="×" />
          </span>
          <span className="text-xs text-slate">per year · goal 8×</span>
        </div>
      </div>
      <ul className="w-full max-w-[220px] space-y-3">
        {groups.map(g => (
          <li key={g.label} className="flex items-center justify-between border-b border-line pb-2 text-sm last:border-0">
            <span className="text-slate">{g.label}</span>
            <span className={`font-mono font-medium ${g.tone}`}>{g.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 35 days of sample profit (+) / deficit (–) in ₹ thousands, Monday-first.
const days = [
  4.2, 6.1, 3.8, 5.5, 8.9, 11.2, 2.1, 3.9, -1.4, 4.7, 6.3, 9.8, 12.4, 1.6, 5.2, 4.4, -2.8, 6.9, 10.1, 13.0, 2.4, 4.8, 5.6, 3.1,
  7.4, 9.2, 14.1, -0.9, 5.9, 6.7, 4.2, 8.1, 10.6, 12.8, 3.3,
];

function ProfitCalendar() {
  const maxGain = Math.max(...days);
  const maxLoss = Math.abs(Math.min(...days));
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] text-faint">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5" role="img" aria-label="Calendar heat map: most days profitable, three days in deficit">
        {days.map((v, i) => {
          const gain = v >= 0;
          const strength = gain ? 0.18 + 0.82 * (v / maxGain) : 0.35 + 0.65 * (Math.abs(v) / maxLoss);
          return (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-md font-mono text-[10px]"
              style={{
                background: gain ? `rgba(16,185,129,${strength})` : `rgba(228,87,46,${strength})`,
                color: strength > 0.55 ? "#fff" : "var(--color-ink)",
              }}
              title={`${gain ? "Profit" : "Deficit"} ₹${Math.abs(v).toFixed(1)}k`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-emerald" /> Profit day
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-coral" /> Deficit day
        </span>
        <span className="font-mono">32 / 35 in profit</span>
      </div>
    </div>
  );
}

const sleeping = [
  { item: "Steel tiffin set (3 tier)", days: 142, value: "₹46,800" },
  { item: "Pressure cooker 7L", days: 118, value: "₹38,400" },
  { item: "Non-stick tawa 28cm", days: 104, value: "₹29,750" },
  { item: "Glass jar set (6 pc)", days: 96, value: "₹21,600" },
];

function SleepingStock() {
  return (
    <div className="w-full">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Idle 90+ days</p>
          <p className="font-mono text-3xl font-medium text-coral">₹1.8L</p>
        </div>
        <p className="text-right text-xs text-slate">37 items · top 4 shown</p>
      </div>
      <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
        {sleeping.map(s => (
          <li key={s.item} className="flex items-center gap-3 px-4 py-3">
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{s.item}</span>
            <span className="rounded-full bg-coral/10 px-2 py-0.5 font-mono text-[11px] text-coral">{s.days}d</span>
            <span className="w-20 text-right font-mono text-sm text-ink">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const aging = [
  { bucket: "0–30 days", amount: 186400, color: "bg-emerald" },
  { bucket: "31–60 days", amount: 79600, color: "bg-brand" },
  { bucket: "61–90 days", amount: 35600, color: "bg-amber" },
  { bucket: "90+ days", amount: 41200, color: "bg-coral" },
];

function ReceivablesAging() {
  const total = aging.reduce((s, a) => s + a.amount, 0);
  return (
    <div className="w-full">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Total receivable</p>
          <p className="font-mono text-3xl font-medium text-ink">
            <CountUp value={total} prefix="₹" format="inr" />
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1 text-xs font-semibold text-brand">
          <MessageCircle className="size-3.5" aria-hidden /> Send reminders
        </span>
      </div>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full" role="img" aria-label="Receivables split by age bucket">
        {aging.map(a => (
          <div key={a.bucket} className={a.color} style={{ width: `${(a.amount / total) * 100}%` }} />
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {aging.map(a => (
          <li key={a.bucket} className="rounded-xl border border-line p-3">
            <p className="inline-flex items-center gap-1.5 text-xs text-slate">
              <span className={`size-2 rounded-full ${a.color}`} /> {a.bucket}
            </p>
            <p className="mt-1 font-mono text-sm font-medium text-ink">₹{a.amount.toLocaleString("en-IN")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Rows ---------- */

const rows = [
  {
    eyebrow: "Capital rotation",
    title: "See how hard your stock money is working",
    body: "grosumoERP tracks how many times the money you put into stock comes back as sales. Spot the items that turn fast and the ones that tie up cash.",
    points: ["Rotation by item, category and supplier", "Know where to put your next rupee"],
    visual: <RotationRing />,
  },
  {
    eyebrow: "Daily profit & deficit",
    title: "Every day, profit or loss — at a glance",
    body: "A calendar that colours each day by what you actually made after cost. Deficit days stand out, so you can find out why while it still matters.",
    points: ["Profit worked out per bill, per day", "Tap any day to see what sold"],
    visual: <ProfitCalendar />,
  },
  {
    eyebrow: "Sleeping stock",
    title: "Find the money sleeping on your shelves",
    body: "Items that haven't moved in 60, 90 or 120 days are listed with the cash they're holding — so you can discount, return or stop re-ordering them.",
    points: ["Idle-days filter you can set", "Stock value at cost, always current"],
    visual: <SleepingStock />,
  },
  {
    eyebrow: "Receivables aging",
    title: "Know who owes you, and for how long",
    body: "Customer credit grouped by age, with the oldest dues flagged. Send a polite payment reminder on WhatsApp in one tap.",
    points: ["Party-wise ledger and due dates", "WhatsApp reminders with the bill attached"],
    visual: <ReceivablesAging />,
  },
];

export default function Intelligence() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Business intelligence, built in"
          title="Not just bills."
          accent="Answers."
          intro="The numbers a shop owner actually needs — worked out automatically from the bills you already make, in both editions."
        />

        <div className="mt-16 space-y-20 sm:space-y-28">
          {rows.map((row, i) => (
            <div key={row.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Eyebrow>{row.eyebrow}</Eyebrow>
                <h3 className="mt-4 text-2xl headline text-ink sm:text-3xl">{row.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{row.body}</p>
                <ul className="mt-6 space-y-3 text-ink">
                  {row.points.map(p => (
                    <CheckItem key={p}>{p}</CheckItem>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100} className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex min-h-[300px] items-center rounded-2xl border border-line bg-wash p-6 sm:p-10">
                  <div className="w-full rounded-2xl bg-white p-5 shadow-card sm:p-7">{row.visual}</div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs text-faint">Sample figures for illustration only — your dashboard shows your own data.</p>
      </Container>
    </section>
  );
}
