import { Container, Eyebrow, WhatsAppButton } from "./ui";
import { waLink } from "@/lib/site";

export default function ComingSoon({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-mint pb-24 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,122,94,0.14),transparent)]"
      />
      <Container className="relative max-w-2xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">{body}</p>
        <div className="mt-9 flex justify-center">
          <WhatsAppButton href={waLink(`Hi Grosumo, I have a question (${eyebrow}).`)} variant="secondary">
            Ask us on WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
