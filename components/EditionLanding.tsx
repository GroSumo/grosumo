import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Faq from "./Faq";
import PageSchema from "./PageSchema";
import { FinalCTA } from "./HomeSections";
import Reveal from "./Reveal";
import { CheckItem, Container, DemoButton, PageHeader, SectionHeading, WhatsAppButton } from "./ui";
import { BOTH_EDITIONS_INCLUDE } from "@/lib/site";
import { faqNode, softwareApplicationNode, type QA } from "@/lib/seo";

type Props = {
  edition: "Offline" | "Cloud";
  path: "/offline" | "/cloud";
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  price: { label: string; amount: string; suffix: string; note: string };
  ctaHref: string;
  ctaLabel: string;
  suits: string[];
  benefits: { icon: LucideIcon; title: string; desc: string }[];
  faq: QA[];
  other: { href: string; text: string };
};

/** Shared layout for the /offline and /cloud landing pages. */
export default function EditionLanding(p: Props) {
  return (
    <>
      <PageSchema
        crumbs={[{ name: "Home", path: "/" }, { name: `${p.edition} edition`, path: p.path }]}
        nodes={[softwareApplicationNode(), faqNode(p.faq, p.path)]}
      />
      <PageHeader eyebrow={p.eyebrow} title={p.title} accent={p.accent} intro={p.intro} />

      <section aria-labelledby="price" className="bg-wash py-16 sm:py-24">
        <Container className="grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border-2 border-brand bg-white p-7 shadow-lift sm:p-9">
              <h2 id="price" className="text-xl font-bold tracking-tight text-ink">
                What the {p.edition} edition costs
              </h2>
              <p className="mt-6 text-sm font-medium text-slate">{p.price.label}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl headline tabular-nums text-brandink">{p.price.amount}</span>
                <span className="text-base font-semibold text-slate">{p.price.suffix}</span>
              </p>
              <p className="mt-3 flex-1 text-[15px] text-slate">{p.price.note}</p>
              <DemoButton className="mt-8 w-full" />
              <WhatsAppButton href={p.ctaHref} variant="secondary" className="mt-3 w-full">
                {p.ctaLabel}
              </WhatsAppButton>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold tracking-tight text-ink">Best for</h2>
              <ul className="mt-5 space-y-3 text-ink">
                {p.suits.map(s => (
                  <CheckItem key={s}>{s}</CheckItem>
                ))}
              </ul>
              <h3 className="mt-8 text-sm font-bold text-ink">Included, same as every edition</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-slate">
                {BOTH_EDITIONS_INCLUDE.map(i => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={`${p.edition} edition`} title={`Why shops choose`} accent={p.edition} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.benefits.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 4) * 60} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-wash py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title={`${p.edition} edition`} accent="questions" />
          <div className="mt-12">
            <Faq items={p.faq} />
          </div>
          <p className="mt-10 text-center text-[15px] text-slate">
            <Link href={p.other.href} className="inline-flex items-center gap-1.5 font-semibold text-brandink hover:underline">
              {p.other.text} <ArrowRight className="size-4" aria-hidden />
            </Link>
            <span className="mx-2 text-faint">·</span>
            <Link href="/pricing#compare" className="font-semibold text-brandink hover:underline">
              Compare both editions
            </Link>
          </p>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
