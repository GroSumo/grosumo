import { BarChart3, BookOpen, Calculator, HandCoins, Megaphone, Package, Receipt, Scale, Share2, ShoppingCart } from "lucide-react";
import Reveal from "./Reveal";
import { Container, SectionHeading, WhatsAppButton } from "./ui";
import { WA_TALK_LINK, waLink } from "@/lib/site";

export const MODULES = [
  { icon: Receipt, title: "GST billing", desc: "Fast GST invoices with CGST, SGST and IGST worked out for you. Print, save as PDF or share." },
  { icon: Package, title: "Stock", desc: "Live stock levels, low-stock alerts and stock value — updated with every bill and purchase." },
  { icon: ShoppingCart, title: "Purchases", desc: "Record supplier bills, track what you owe and keep purchase prices current." },
  { icon: BookOpen, title: "Accounts", desc: "Cash, bank, expenses and party ledgers kept in step with your bills — no double entry by hand." },
  { icon: HandCoins, title: "Customer credit", desc: "Credit limits, dues and payment history for every customer, with reminders that go out on WhatsApp." },
  { icon: BarChart3, title: "Reports", desc: "Sales, profit, stock and GST reports ready when you or your CA need them." },
];

export function Modules() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Everything in one place"
          title="The whole shop, in one platform"
          intro="Stop juggling your current billing app, a stock register and spreadsheets. grosumoERP keeps them in one system that talks to itself."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 3) * 60} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-5">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-mint p-6 sm:flex-row sm:items-center">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
              <Share2 className="size-5" aria-hidden />
            </span>
            <p className="text-[15px] text-muted">
              <span className="font-semibold text-ink">WhatsApp sharing everywhere.</span> Send bills, statements and payment reminders straight
              from the app — your customers already use it.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const services = [
  {
    icon: Calculator,
    title: "Accounting & CA",
    desc: "Bookkeeping help, GST return filing and year-end support from qualified professionals who can work directly off your grosumoERP data.",
    msg: "Hi Grosumo, I'd like to know about your Accounting & CA services.",
  },
  {
    icon: Scale,
    title: "Legal",
    desc: "Business registrations, licences and everyday agreements, handled by legal professionals we work with.",
    msg: "Hi Grosumo, I'd like to know about your Legal services.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Get found locally: Google Business profile, WhatsApp catalogues and simple campaigns to bring customers back.",
    msg: "Hi Grosumo, I'd like to know about your Marketing services.",
  },
];

export function Services() {
  return (
    <section className="bg-mint py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Beyond software"
          title="Help with the rest of the business"
          intro="Software is one part of running a business. When you need a hand with the books, the paperwork or getting the word out, we can connect you."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, msg }, i) => (
            <Reveal key={title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{desc}</p>
                <a
                  href={waLink(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-sm font-semibold text-brand hover:underline"
                >
                  Ask on WhatsApp →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const steps = [
  { n: "01", title: "Message us on WhatsApp", desc: "Tell us about your business and pick Offline or Cloud. Not sure? We'll help you choose." },
  {
    n: "02",
    title: "We set it up with you",
    desc: "We install it on your PC or open your cloud account, and bring in items and customers from your current billing app or spreadsheets.",
  },
  { n: "03", title: "Make your first bill", desc: "Start billing the same day. We stay a WhatsApp message away while your team settles in." },
];

export function Steps() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading center eyebrow="Get running" title="Up and billing in three steps" />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="h-full">
              <div className="relative h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="font-mono text-sm font-medium text-brand">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton />
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA({
  title = "Your data, your choice — cloud or your own PC.",
  body = "Start with the free Offline edition today, or go Cloud for ₹9,999/yr. Either way, it's one WhatsApp message to get going.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-deep px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.28),transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton variant="light" className="px-7 py-3.5" />
            <WhatsAppButton href={WA_TALK_LINK} variant="ghostDark" className="px-7 py-3.5">
              Talk to us
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
