import { Container, PageHeader } from "./ui";
import { SUPPORT_EMAIL } from "@/lib/site";

export default function LegalPage({
  title,
  accent,
  intro,
  sections,
}: {
  title: string;
  accent: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} accent={accent} intro={intro} />
      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="rounded-2xl border border-brand/20 bg-soft px-5 py-4 text-sm text-deep">
            This is a summary placeholder while our full {`${title} ${accent}`.toLowerCase()} is being finalised. Questions? Write to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <div className="mt-10 space-y-9">
            {sections.map(s => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold tracking-tight text-ink">{s.heading}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
