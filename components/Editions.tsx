import Link from "next/link";
import { Check, Cloud, HardDrive } from "lucide-react";
import Reveal from "./Reveal";
import { CheckItem, Container, Eyebrow, SectionHeading, WhatsAppButton } from "./ui";
import { BOTH_EDITIONS_INCLUDE, PRICE, WA_CLOUD_LINK, WA_OFFLINE_LINK } from "@/lib/site";

export const OFFLINE_POINTS = [
  "Runs on your own Windows PC",
  "Works with zero internet",
  "Your data never leaves your machine",
  "Automatic local daily backups",
  "All modules included",
];

export const CLOUD_POINTS = [
  "Access from anywhere, on any device",
  "Use it on several devices at once",
  "Automatic cloud backups",
  "Data hosted in India",
  "Always up to date · all modules included",
];

export function EditionCards({ showAnchors = false }: { showAnchors?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Offline — highlighted */}
      <Reveal className="h-full">
        <article
          id={showAnchors ? "offline" : undefined}
          className="relative flex h-full scroll-mt-28 flex-col rounded-2xl border-2 border-brand bg-white p-7 shadow-lift sm:p-9"
        >
          <span className="absolute -top-3.5 left-7 rounded-full bg-brand px-3.5 py-1 text-[13px] font-bold text-white shadow-brand sm:left-9">
            Software free
          </span>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
              <HardDrive className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ink">Offline edition</h3>
              <p className="text-sm text-slate">On your PC. No internet needed.</p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm font-medium text-slate">Software</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl headline tabular-nums text-ink">{PRICE.offlineSoftware}</span>
              <span className="text-base font-semibold text-brand">forever</span>
            </p>
            <p className="mt-2 text-[15px] text-slate">
              + <span className="font-mono font-medium text-ink">{PRICE.offlineAmc}</span>/yr AMC — updates, support and license renewal
            </p>
          </div>

          <ul className="mt-7 flex-1 space-y-3 text-ink">
            {OFFLINE_POINTS.map(p => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>

          <WhatsAppButton href={WA_OFFLINE_LINK} className="mt-8 w-full">
            Start free on WhatsApp
          </WhatsAppButton>
        </article>
      </Reveal>

      {/* Cloud */}
      <Reveal delay={80} className="h-full">
        <article
          id={showAnchors ? "cloud" : undefined}
          className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
              <Cloud className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ink">Cloud edition</h3>
              <p className="text-sm text-slate">Anywhere, any device.</p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm font-medium text-slate">All-in</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl headline tabular-nums text-ink">{PRICE.cloud}</span>
              <span className="text-base font-semibold text-slate">/yr</span>
            </p>
            <p className="mt-2 text-[15px] text-slate">Hosting, backups, updates and support included</p>
          </div>

          <ul className="mt-7 flex-1 space-y-3 text-ink">
            {CLOUD_POINTS.map(p => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>

          <WhatsAppButton href={WA_CLOUD_LINK} variant="secondary" className="mt-8 w-full">
            Ask about Cloud on WhatsApp
          </WhatsAppButton>
        </article>
      </Reveal>
    </div>
  );
}

export function BothInclude() {
  return (
    <Reveal className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <Eyebrow>Both editions include</Eyebrow>
      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {BOTH_EDITIONS_INCLUDE.map(item => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function EditionsSection() {
  return (
    <section id="editions" className="scroll-mt-20 bg-wash py-20 sm:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="Choose your edition"
          title="Same ERP."
          accent="Two ways to run it."
          intro="Keep everything on your own PC with the free Offline edition, or let us host it in India and open it from anywhere with Cloud. Every module comes with both."
        />
        <div className="mx-auto mt-14 max-w-5xl">
          <EditionCards />
          <BothInclude />
          <p className="mt-6 text-center text-sm text-slate">
            Not sure which one fits?{" "}
            <Link href="/pricing#compare" className="font-semibold text-brand hover:underline">
              Compare the editions side by side
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
