import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, Container, Eyebrow, WhatsAppButton } from "@/components/ui";
import { getGuide, getGuideSlugs, getRelatedGuides } from "@/lib/guides";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuideSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const meta = pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${slug}`, type: "article" });
  return {
    ...meta,
    keywords: guide.keywords,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: guide.date, modifiedTime: guide.updated },
  };
}

const formatDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${slug}`;
  const related = getRelatedGuides(slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            title: guide.title,
            description: guide.description,
            path,
            datePublished: guide.date,
            dateModified: guide.updated,
            keywords: guide.keywords,
          }),
          breadcrumbLd(crumbs),
        ]}
      />

      <article className="bg-white pb-20 pt-28 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate">
              {crumbs.map((c, i) => (
                <li key={c.path} className="inline-flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 text-faint" aria-hidden />}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="hover:text-brandink">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <header className="mt-8 max-w-3xl">
            <Eyebrow>Guide</Eyebrow>
            <h1 className="mt-5 text-4xl headline text-ink sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate">{guide.description}</p>
            <p className="mt-5 font-mono text-xs text-faint">
              By the grosumo team · Published <time dateTime={guide.date}>{formatDate(guide.date)}</time>
              {guide.updated !== guide.date && (
                <>
                  {" "}
                  · Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
                </>
              )}
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0">
              {guide.toc.length > 1 && (
                <nav aria-label="On this page" className="mb-10 rounded-2xl border border-line bg-wash p-6 lg:hidden">
                  <p className="text-sm font-bold text-ink">On this page</p>
                  <TocList toc={guide.toc} />
                </nav>
              )}

              <div className="guide-prose" dangerouslySetInnerHTML={{ __html: guide.html }} />

              {guide.faq.length > 0 && (
                <section aria-labelledby="faq" className="mt-14">
                  <h2 id="faq" className="text-2xl headline text-ink sm:text-3xl">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6">
                    <Faq items={guide.faq} />
                  </div>
                </section>
              )}
            </div>

            {guide.toc.length > 1 && (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-24 rounded-2xl border border-line bg-wash p-6">
                  <p className="text-sm font-bold text-ink">On this page</p>
                  <TocList toc={guide.toc} />
                </nav>
              </aside>
            )}
          </div>

          {/* Closing CTA */}
          <section aria-labelledby="guide-cta" className="mt-16 rounded-3xl bg-gradient-to-br from-deep to-[#0B3A66] px-6 py-12 text-center sm:px-12">
            <h2 id="guide-cta" className="text-2xl headline text-white sm:text-3xl">
              Run your shop on <span className="text-mint">grosumoERP</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Offline edition: software free, ₹1,999/yr AMC. Cloud edition: ₹9,999/yr all-in. Every module in both.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/pricing" variant="light">
                Compare editions & pricing
              </ButtonLink>
              <WhatsAppButton variant="ghostDark">Start free on WhatsApp</WhatsAppButton>
            </div>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related" className="mt-16">
              <h2 id="related" className="text-2xl headline text-ink">
                Related guides
              </h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`/guides/${r.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand"
                    >
                      <span className="text-base font-bold tracking-tight text-ink">{r.title}</span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-slate">{r.description}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandink">
                        Read guide <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>
    </>
  );
}

function TocList({ toc }: { toc: { id: string; text: string; depth: 2 | 3 }[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm">
      {toc.map(t => (
        <li key={t.id} className={t.depth === 3 ? "pl-4" : ""}>
          <a href={`#${t.id}`} className="text-slate hover:text-brandink">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
