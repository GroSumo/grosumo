import { Accented, Container, Eyebrow, WhatsAppButton } from "./ui";
import { waLink } from "@/lib/site";
import PageSchema from "./PageSchema";

export default function ComingSoon({ eyebrow, path, title, accent, body }: { eyebrow: string; path: string; title: string; accent: string; body: string }) {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: eyebrow, path }]} />
      <section className="bg-white pb-24 pt-36 sm:pt-44">
        <Container className="max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl headline text-ink sm:text-5xl">
            <Accented title={title} accent={accent} />
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-slate">{body}</p>
          <div className="mt-9 flex justify-center">
            <WhatsAppButton href={waLink(`Hi Grosumo, I have a question (${eyebrow}).`)} variant="secondary">
              Ask us on WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </section>
    </>
  );
}
