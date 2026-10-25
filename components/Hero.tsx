import { CheckCheck, MessageCircle, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";
import { Accented, ButtonLink, Container, Eyebrow, WhatsAppButton } from "./ui";

const trust = ["All 6 modules included", "No per-user charges"];

// Sample bill — prices exclusive of GST at 5% (2.5% CGST + 2.5% SGST).
const items = [
  { name: "Sunflower Oil 1L", qty: 2, rate: 170 },
  { name: "Basmati Rice 5kg", qty: 1, rate: 695 },
  { name: "Toor Dal 1kg", qty: 2, rate: 158 },
  { name: "Wheat Atta 5kg", qty: 1, rate: 375 },
];

const inr = (n: number, decimals = 0) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

function BillCard() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0); // 1,726
  const gst = subtotal * 0.05; // 86.30
  const total = Math.round(subtotal + gst); // 1,812
  const roundOff = total - (subtotal + gst);

  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
      <div className="flex items-center justify-between bg-deep px-5 py-4">
        <div>
          <p className="text-xs font-semibold text-mint">New bill</p>
          <p className="mt-0.5 font-mono text-sm text-white">INV-2219 · Counter 1</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-mint">
          <span className="size-1.5 rounded-full bg-mint" aria-hidden /> GST ON
        </span>
      </div>

      <ul className="divide-y divide-line px-5">
        {items.map(i => (
          <li key={i.name} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-ink">{i.name}</p>
              <p className="font-mono text-xs text-faint">
                {i.qty} × {inr(i.rate)}
              </p>
            </div>
            <p className="font-mono text-[15px] text-ink">{inr(i.qty * i.rate)}</p>
          </li>
        ))}
      </ul>

      <div className="space-y-1.5 border-t border-line bg-wash px-5 py-3.5 font-mono text-[13px] text-slate">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>{inr(subtotal, 2)}</span>
        </p>
        <p className="flex justify-between">
          <span>CGST 2.5% + SGST 2.5%</span>
          <span>{inr(gst, 2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Round off</span>
          <span>−{inr(Math.abs(roundOff), 2)}</span>
        </p>
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-slate">Total</p>
          <p className="font-mono text-4xl font-medium tracking-tight text-ink">{inr(total)}</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Payment mode">
          {["Cash", "UPI", "Credit"].map(m => (
            <span
              key={m}
              className={`rounded-full border-2 py-2 text-center text-sm font-bold ${
                m === "UPI" ? "border-brand bg-brandink text-white" : "border-line bg-white text-slate"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="overflow-hidden bg-white pb-20 pt-32 sm:pb-24 sm:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
        {/* Text renders immediately (no reveal) so the headline paints as the LCP without waiting for JS. */}
        <div className="text-center lg:text-left">
          <div>
            <Eyebrow>Built for shops across India</Eyebrow>
          </div>
          <div>
            <h1 className="mt-6 text-[2.5rem] headline text-ink sm:text-6xl xl:text-[4.1rem]">
              <Accented title="GST billing, stock & accounts —" accent="cloud or offline" />
            </h1>
          </div>
          <div>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate lg:mx-0">
              One ERP that runs your whole shop. Use it in the cloud from anywhere — or offline on your own PC, where the software is free forever
              and you pay only ₹1,999/yr AMC.
            </p>
          </div>
          <div>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsAppButton className="w-full px-7 py-3.5 sm:w-auto">Start free</WhatsAppButton>
              <ButtonLink href="/pricing" className="w-full px-7 py-3.5 sm:w-auto">
                Compare editions
              </ButtonLink>
            </div>
          </div>
          <div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate lg:justify-start">
              {trust.map(t => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          {/* Soft blue glow behind the bill */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl" />

          {/* Vertical margin reserves room so the floating cards sit outside the bill's text. */}
          <div className="relative md:mb-16 md:mt-20">
            <div className="absolute bottom-[calc(100%-8px)] -left-10 z-20 hidden w-52 rounded-2xl border border-line bg-white p-4 shadow-lift md:block">
              <p className="text-xs font-medium text-slate">Today&apos;s collection</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="font-mono text-xl font-medium text-ink">₹34,760</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-xs font-bold text-emerald">
                  <TrendingUp className="size-3" aria-hidden /> 12%
                </span>
              </div>
            </div>

            <BillCard />

            <div className="absolute -right-8 top-[calc(100%-8px)] z-20 hidden w-[17rem] items-center gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-lift md:flex">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                <MessageCircle className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-ink">Bill sent on WhatsApp</p>
                <p className="font-mono text-[11px] text-faint">INV-2219 · ₹1,812</p>
              </div>
              <CheckCheck className="size-4 shrink-0 text-brand" aria-label="Delivered" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
