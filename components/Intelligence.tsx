import { MessageCircle } from "lucide-react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { CheckItem, Container, Eyebrow, SectionHeading } from "./ui";

/* ---------- Visuals (all sample data) ---------- */

const stockClasses = [
  { label: "Fast", items: 412, tone: "bg-emerald/10 text-emerald" },
  { label: "Slow", items: 37, tone: "bg-amber/10 text-amber" },
  { label: "Dead", items: 9, tone: "bg-coral/10 text-coral" },
  { label: "Overstock", items: 14, tone: "bg-soft text-brandink" },
];

const stuckByCategory = [
  { category: "Kitchenware", value: 82400 },
  { category: "Steel utensils", value: 54600 },
  { category: "Glassware", value: 28900 },
  { category: "Plastics", value: 14100 },
];

function SleepingStock() {
  const max = Math.max(...stuckByCategory.map(c => c.value));
  return (
    <div className="w-full">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Idle 60+ days</p>
          <p className="font-mono text-3xl font-medium text-coral">₹1.8L</p>
        </div>
        <p className="text-right text-xs text-slate">Capital stuck, by category</p>
      </div>
      <ul className="mt-5 grid grid-cols-4 gap-2">
        {stockClasses.map(c => (
          <li key={c.label} className={`rounded-xl px-1 py-2 text-center ${c.tone}`}>
            <p className="truncate text-[11px] font-medium">{c.label}</p>
            <p className="font-mono text-sm font-medium">{c.items}</p>
          </li>
        ))}
      </ul>
      <ul className="mt-5 space-y-3" aria-label="Capital stuck in slow stock, by category">
        {stuckByCategory.map(c => (
          <li key={c.category}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">{c.category}</span>
              <span className="font-mono text-ink">₹{c.value.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-wash">
              <div className="h-full rounded-full bg-coral" style={{ width: `${(c.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 35 days of sample day-close net income (+) / loss (–) in ₹ thousands, Monday-first.
const days = [
  4.2, 6.1, 3.8, 5.5, 8.9, 11.2, 2.1, 3.9, -1.4, 4.7, 6.3, 9.8, 12.4, 1.6, 5.2, 4.4, -2.8, 6.9, 10.1, 13.0, 2.4, 4.8, 5.6, 3.1,
  7.4, 9.2, 14.1, -0.9, 5.9, 6.7, 4.2, 8.1, 10.6, 12.8, 3.3,
];

function DayCloseCalendar() {
  const maxGain = Math.max(...days);
  const maxLoss = Math.abs(Math.min(...days));
  return (
    <div className="mx-auto w-full max-w-sm">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-faint">Day close · net income</p>
      <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] text-faint">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5" role="img" aria-label="Day close calendar: most days closed with net income, three with a loss">
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
              title={`Net ${gain ? "income" : "loss"} ₹${Math.abs(v).toFixed(1)}k`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-emerald" /> Net income
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-coral" /> Net loss
        </span>
        <span className="font-mono">32 / 35 days up</span>
      </div>
    </div>
  );
}

const overdue = [
  { party: "Ganesh Provisions", amount: 18400, due: "2 Oct", late: 25 },
  { party: "Sri Sai Kirana", amount: 9650, due: "11 Oct", late: 16 },
  { party: "Annapurna Stores", amount: 4280, due: "20 Oct", late: 7 },
];

function OverdueList() {
  const total = overdue.reduce((s, o) => s + o.amount, 0);
  return (
    <div className="w-full">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-faint">Overdue · {overdue.length} customers</p>
        <p className="font-mono text-3xl font-medium text-ink">
          <CountUp value={total} prefix="₹" format="inr" />
        </p>
      </div>
      <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
        {overdue.map(o => (
          <li key={o.party} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink">{o.party}</p>
              <p className="text-xs text-slate">
                Due {o.due} · <span className="text-coral">{o.late} days late</span>
              </p>
            </div>
            <span className="font-mono text-sm text-ink">₹{o.amount.toLocaleString("en-IN")}</span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-brandink">
              <MessageCircle className="size-3" aria-hidden /> Remind
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Rows ---------- */

const rows = [
  {
    eyebrow: "Sleeping stock",
    title: "Find the money sleeping on your shelves",
    body: "Every item is ranked fast, slow, dead or overstock — slow means no sale in 60 days — with the capital stuck in each category, so you can discount, return or stop re-ordering.",
    points: ["Fast, slow, dead and overstock ranking", "Capital stuck, by category"],
    visual: <SleepingStock />,
  },
  {
    eyebrow: "Day close",
    title: "Know how every day closed",
    body: "The day close tallies sales, payments by mode, refunds, cost of goods and expenses — so you see the day's net income, not just the cash in the drawer.",
    points: ["Payments by mode, refunds and expenses", "Net income for every day"],
    visual: <DayCloseCalendar />,
  },
  {
    eyebrow: "Customer credit",
    title: "Credit (udhaar) under control",
    body: "Every credit bill carries a due date. The overdue list shows who's late, and a WhatsApp reminder goes with one tap.",
    points: ["A due date on every credit bill", "A WhatsApp reminder with one tap"],
    visual: <OverdueList />,
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
