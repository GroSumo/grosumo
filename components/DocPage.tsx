import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Faq from "./Faq";
import PageSchema from "./PageSchema";
import { Container, DemoButton, Eyebrow, WhatsAppButton } from "./ui";
import { getRelated, type Collection, type CtaEdition, type Doc } from "@/lib/content";
import { articleNode, faqNode, pageMetadata, type Crumb } from "@/lib/seo";
import { WA_CLOUD_LINK, WA_LINK, WA_OFFLINE_LINK } from "@/lib/site";

export const COLLECTION_LABEL: Record<Collection, { name: string; path: string; eyebrow: string }> = {
  guides: { name: "Guides", path: "/guides", eyebrow: "Guide" },
  for: { name: "Business types", path: "/for", eyebrow: "For your business" },
};

const CTA: Record<CtaEdition, { title: string; accent: string; body: string; wa: string; waLabel: string }> = {
  offline: {
    title: "Start with the free",
    accent: "Offline edition",
    body: "Software free forever — pay only ₹1,999/yr AMC. Works without internet on your Windows PC, with every module included.",
    wa: WA_OFFLINE_LINK,
    waLabel: "Get Offline on WhatsApp",
  },
  cloud: {
    title: "Run your shop on",
    accent: "grosumoERP Cloud",
    body: "₹9,999/yr all-in: open it on any device, with data hosted in India and updates included.",
    wa: WA_CLOUD_LINK,
    waLabel: "Ask about Cloud on WhatsApp",
  },
  both: {
    title: "Run your shop on",
    accent: "grosumoERP",
    body: "Offline edition: software free, ₹1,999/yr AMC. Cloud edition: ₹9,999/yr all-in. Every module in both.",
    wa: WA_LINK,
    waLabel: "Talk to us on WhatsApp",
  },
};

const WORDS_PER_MINUTE = 220;

const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function docMetadata(doc: Doc): Metadata {
  const path = `${COLLECTION_LABEL[doc.collection].path}/${doc.slug}`;
  const meta = pageMetadata({ title: doc.title, description: doc.description, path, type: "article", siteImages: false });
  return {
    ...meta,
    ...(doc.keywords.length ? { keywords: doc.keywords } : {}),
    openGraph: { ...meta.openGraph, type: "article", publishedTime: doc.date, modifiedTime: doc.updated },
  };
}

/** Shared page for guides and /for business-type pages. */
export default function DocPage({ doc }: { doc: Doc }) {
  const section = COLLECTION_LABEL[doc.collection];
  const path = `${section.path}/${doc.slug}`;
  const related = getRelated(doc.collection, doc.slug);
  const cta = CTA[doc.ctaEdition];
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: section.name, path: section.path },
    { name: doc.title, path },
  ];

  return (
    <>
      <PageSchema
        crumbs={crumbs}
        nodes={[
          articleNode({ title: doc.title, description: doc.description, path, datePublished: doc.date, dateModified: doc.updated, keywords: doc.keywords }),
          ...(doc.faq.length ? [faqNode(doc.faq, path)] : []),
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
            <Eyebrow>{doc.collection === "guides" ? `${section.eyebrow} · ${doc.category}` : section.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl headline text-ink sm:text-5xl">{doc.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate">{doc.description}</p>
            <p className="mt-5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-faint">
              Published <time dateTime={doc.date}>{formatDate(doc.date)}</time> · Updated{" "}
              <time dateTime={doc.updated}>{formatDate(doc.updated)}</time> · {doc.words.toLocaleString("en-IN")} words · ~
              {Math.max(1, Math.ceil(doc.words / WORDS_PER_MINUTE))} min read
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0">
              {doc.toc.length > 1 && (
                <nav aria-label="On this page" className="mb-10 rounded-2xl border border-line bg-wash p-6 lg:hidden">
                  <p className="text-sm font-bold text-ink">On this page</p>
                  <TocList toc={doc.toc} />
                </nav>
              )}

              <div className="guide-prose" dangerouslySetInnerHTML={{ __html: doc.html }} />

              {doc.faq.length > 0 && (
                <section aria-labelledby="faq" className="mt-14">
                  <h2 id="faq" className="text-2xl headline text-ink sm:text-3xl">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6">
                    <Faq items={doc.faq} />
                  </div>
                </section>
              )}
            </div>

            {doc.toc.length > 1 && (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-24 rounded-2xl border border-line bg-wash p-6">
                  <p className="text-sm font-bold text-ink">On this page</p>
                  <TocList toc={doc.toc} />
                </nav>
              </aside>
            )}
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related" className="mt-16">
              <h2 id="related" className="text-2xl headline text-ink">
                Related {doc.collection === "guides" ? "guides" : "pages"}
              </h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`${section.path}/${r.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand"
                    >
                      <span className="text-base font-bold tracking-tight text-ink">{r.title}</span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-slate">{r.description}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandink">
                        Read more <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Closing CTA — copy follows the frontmatter's ctaEdition */}
          <section aria-labelledby="doc-cta" className="mt-16 rounded-3xl bg-gradient-to-br from-deep to-[#0B3A66] px-6 py-12 text-center sm:px-12">
            <h2 id="doc-cta" className="text-2xl headline text-white sm:text-3xl">
              {cta.title} <span className="text-mint">{cta.accent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">{cta.body}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <DemoButton variant="light" />
              <WhatsAppButton href={cta.wa} variant="ghostDark">
                {cta.waLabel}
              </WhatsAppButton>
            </div>
            <Link href="/pricing" className="mt-6 inline-block text-sm font-semibold text-mint hover:underline">
              Compare editions & pricing →
            </Link>
          </section>
        </Container>
      </article>
    </>
  );
}

function TocList({ toc }: { toc: { id: string; text: string }[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm">
      {toc.map(t => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="text-slate hover:text-brandink">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
