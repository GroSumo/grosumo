import { Cloud, HardDrive } from "lucide-react";
import DashboardMock from "./DashboardMock";
import Reveal from "./Reveal";
import { Container, Pill, WhatsAppButton } from "./ui";
import { WA_TALK_LINK } from "@/lib/site";

const trust = ["GST-ready invoicing", "Works with zero internet", "Local or India-hosted data", "Made in India"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint via-white to-white pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,122,94,0.16),transparent)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Pill>
              <HardDrive className="size-3.5" aria-hidden /> Offline edition — software free forever
            </Pill>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              One ERP. <span className="text-brand">Cloud or offline</span> — your choice.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              GST billing, stock, purchases, accounts and customer credit in one platform. Go offline and the software is free — you pay only
              a ₹1,999/yr AMC. Or go cloud for ₹9,999/yr, all-in.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton className="w-full px-7 py-3.5 sm:w-auto" />
              <WhatsAppButton href={WA_TALK_LINK} variant="secondary" className="w-full px-7 py-3.5 sm:w-auto">
                Talk to us
              </WhatsAppButton>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {trust.map(t => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-faint">
              <Cloud className="size-3.5" aria-hidden /> Switch between cloud and offline later — we help you move your data.
            </p>
          </Reveal>
        </div>

        <Reveal delay={300} className="mx-auto mt-16 max-w-5xl pb-12 sm:mt-20 sm:pb-16">
          <DashboardMock />
        </Reveal>
      </Container>
    </section>
  );
}
