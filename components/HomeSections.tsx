import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Calculator, HandCoins, Megaphone, Package, Receipt, Scale, Share2, ShoppingCart } from "lucide-react";
import CountUp from "./CountUp";
import DashboardMock from "./DashboardMock";
import Reveal from "./Reveal";
import { Container, DemoButton, Eyebrow, SectionHeading, WhatsAppButton } from "./ui";
import { getAllDocs } from "@/lib/content";
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
          title="The whole shop,"
          accent="in one platform"
          intro="Stop juggling your current billing app, a stock register and spreadsheets. grosumoERP keeps them in one system that talks to itself."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 3) * 60} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
                <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-5">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-wash p-6 sm:flex-row sm:items-center">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
              <Share2 className="size-5" aria-hidden />
            </span>
            <p className="text-[15px] text-slate">
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

export const SERVICES_INTRO =
  "Software is one part of running a business. When you need a hand with the books, the paperwork or getting the word out, we can connect you.";

/** Services cards; `heading={false}` when the page already has its own header (e.g. /services). */
export function Services({ heading = true, className = "bg-white" }: { heading?: boolean; className?: string }) {
  return (
    <section className={`${className} py-20 sm:py-28`}>
      <Container>
        {heading && <SectionHeading eyebrow="Beyond software" title="Help with the rest" accent="of the business" intro={SERVICES_INTRO} />}
        {!heading && <h2 className="sr-only">Our services</h2>}
        <div className={`${heading ? "mt-14 " : ""}grid gap-5 md:grid-cols-3`}>
          {services.map(({ icon: Icon, title, desc, msg }, i) => (
            <Reveal key={title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{desc}</p>
                <a
                  href={waLink(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-sm font-semibold text-brandink hover:underline"
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
  { n: "01", title: "Try the demo", desc: "Open the live demo account, make a bill and see the dashboard update — no sign-up needed." },
  { n: "02", title: "Pick your edition", desc: "Offline on your own PC (software free, ₹1,999/yr AMC) or Cloud from anywhere (₹9,999/yr). Not sure? We'll help you choose." },
  {
    n: "03",
    title: "We set you up on WhatsApp",
    desc: "We install it on your PC or open your cloud account, and bring in items and customers from your current billing app or spreadsheets.",
  },
];

export function Steps() {
  return (
    <section className="bg-wash py-20 sm:py-28">
      <Container>
        <SectionHeading center eyebrow="Get running" title="Up and billing" accent="in three steps" />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="h-full">
              <div className="relative h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                <span className="font-mono text-sm font-medium text-brandink">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <DemoButton />
          <WhatsAppButton variant="secondary" />
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA({
  title = "Your data, your choice —",
  accent = "cloud or your own PC.",
  body = "Try the live demo now — no sign-up. Then pick Offline (software free, ₹1,999/yr AMC) or Cloud (₹9,999/yr).",
}: {
  title?: string;
  accent?: string;
  body?: string;
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-deep to-[#0B3A66] px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(7,159,243,0.35),transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl headline text-white sm:text-5xl">
            {title} <span className="text-mint">{accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <DemoButton variant="light" className="px-7 py-3.5" />
            <WhatsAppButton href={WA_TALK_LINK} variant="ghostDark" className="px-7 py-3.5">
              Talk to us on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: 0, prefix: "₹", label: "Offline software, forever" },
  { value: 1999, prefix: "₹", suffix: "/yr", label: "Offline AMC — updates & support" },
  { value: 9999, prefix: "₹", suffix: "/yr", label: "Cloud edition, all-in" },
  { value: MODULES.length, label: "Modules in both editions" },
];

export function StatBand() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="grid grid-cols-2 divide-line py-10 lg:grid-cols-4 lg:divide-x">
        {stats.map(s => (
          <div key={s.label} className="px-4 py-4 text-center lg:py-2">
            <p className="text-3xl headline tabular-nums text-ink sm:text-4xl">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} format="inr" />
            </p>
            <p className="mt-2 text-sm text-slate">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function DashboardSection() {
  return (
    <section className="bg-wash py-20 sm:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="One dashboard"
          title="Your whole business,"
          accent="at a glance"
          intro="Today's sales, profit, money owed to you and stock value — the moment you open the app, in either edition."
        />
        <Reveal className="mx-auto mt-16 max-w-5xl">
          <DashboardMock />
        </Reveal>
      </Container>
    </section>
  );
}

/** Plain, quotable statement of the two-edition offer (kept as simple text on purpose). */
export function WhyBoth() {
  return (
    <section aria-labelledby="why-both" className="bg-wash pb-20 sm:pb-28">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-line bg-white px-6 py-10 text-center shadow-card sm:px-12">
        <h2 id="why-both" className="text-3xl headline text-ink sm:text-[2.6rem]">
          Why <span className="text-brandink">both?</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate sm:text-xl">
          grosumoERP is available as a Cloud edition at ₹9,999 per year and as an Offline edition where the software is free and you pay only
          a ₹1,999 per year AMC. Both editions include all modules, unlimited bills and GST invoicing. You can move between Cloud and Offline
          at any time, and we help you move your data.
        </p>
        </div>
      </Container>
    </section>
  );
}

/** Latest guides above the final CTA; renders nothing until at least one guide is published. */
export function GuidesTeaser() {
  const guides = getAllDocs("guides").slice(0, 3);
  if (guides.length === 0) return null;
  return (
    <section aria-labelledby="home-guides" className="bg-wash py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Guides</Eyebrow>
            <h2 id="home-guides" className="mt-4 text-3xl headline text-ink sm:text-[2.6rem]">
              Guides for <span className="text-brandink">shop owners</span>
            </h2>
          </div>
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brandink hover:underline">
            All guides <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {guides.map(g => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand"
              >
                <span className="text-lg font-bold tracking-tight text-ink">{g.title}</span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{g.description}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandink">
                  Read guide <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
