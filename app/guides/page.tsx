import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { getAllGuides } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides: GST Billing & Shop Software",
  description: "Plain-language guides for Indian shop owners: GST invoices, offline vs cloud billing software, stock and customer credit.",
  path: "/guides",
});

const formatDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function GuidesPage() {
  const guides = getAllGuides();
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Practical guides for"
        accent="running your shop"
        intro="GST billing, stock and customer credit, explained simply — plus how to choose between cloud and offline software."
      />
      <section className="bg-wash py-16 sm:py-24">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map(g => (
              <li key={g.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                  <p className="font-mono text-xs text-faint">
                    Updated <time dateTime={g.updated}>{formatDate(g.updated)}</time>
                  </p>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-ink">
                    <Link href={`/guides/${g.slug}`} className="hover:text-brandink">
                      {g.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{g.description}</p>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brandink hover:underline"
                    aria-label={`Read: ${g.title}`}
                  >
                    Read guide <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
