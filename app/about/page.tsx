import { FinalCTA } from "@/components/HomeSections";
import Reveal from "@/components/Reveal";
import { Container, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — Shop ERP Made in India",
  description: "Grosumo builds grosumoERP, GST billing and shop ERP software made in India, available as a Cloud edition or a free Offline edition.",
  path: "/about",
});

const values = [
  { title: "Your data, your choice", desc: "Keep it on your own PC or in our India-hosted cloud. Switch later if your needs change — we help you move." },
  { title: "Built for India", desc: "GST billing, customer credit and WhatsApp sharing — designed around how Indian shops actually run." },
  { title: "Honest pricing", desc: "The offline software is free. You pay only for AMC or Cloud hosting. No per-user or per-bill charges." },
  { title: "People, not tickets", desc: "Setup and support happen on WhatsApp and phone, with a team that understands small business." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Grosumo"
        title="Software for the shops that"
        accent="keep India running"
        intro="Small and growing businesses deserve software that's simple, affordable and works on their terms — with or without the internet."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-3xl headline text-ink">
              Why we <span className="text-brandink">exist</span>
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate sm:text-lg">
              <p>
                Most business software is built for large companies with IT teams and big budgets. Small businesses get cut-down versions — too
                complex, too expensive, or dependent on an internet connection that isn&apos;t always there.
              </p>
              <p>
                grosumoERP is designed for how Indian shops and small businesses really work: GST-ready billing, stock and customer credit in one
                place, and the freedom to run it offline on your own PC or in the cloud.
              </p>
              <p>We&apos;re a team from Kadapa, Andhra Pradesh, building software that every Indian business can afford to use.</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 60} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-wash p-6">
                  <span className="block size-2.5 rounded-full bg-brand" aria-hidden />
                  <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
