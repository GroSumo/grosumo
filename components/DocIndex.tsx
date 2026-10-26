import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTION_LABEL } from "./DocPage";
import PageSchema from "./PageSchema";
import { Container, PageHeader } from "./ui";
import { getAllDocs, type Collection } from "@/lib/content";
import { itemListNode } from "@/lib/seo";

const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Card grid of every published doc in a collection (newest update first), with an ItemList schema node. */
export default function DocIndex({
  collection,
  eyebrow,
  title,
  accent,
  intro,
  empty,
}: {
  collection: Collection;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  empty: string;
}) {
  const section = COLLECTION_LABEL[collection];
  const docs = getAllDocs(collection);

  return (
    <>
      <PageSchema
        crumbs={[{ name: "Home", path: "/" }, { name: section.name, path: section.path }]}
        nodes={[itemListNode(section.path, docs.map(d => ({ name: d.title, path: `${section.path}/${d.slug}` })))]}
      />
      <PageHeader eyebrow={eyebrow} title={title} accent={accent} intro={intro} />
      <section className="bg-wash py-16 sm:py-24">
        <Container>
          {docs.length === 0 ? (
            <p className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center text-slate shadow-card">{empty}</p>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {docs.map(d => (
                <li key={d.slug}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                    <p className="font-mono text-xs text-faint">
                      Updated <time dateTime={d.updated}>{formatDate(d.updated)}</time>
                    </p>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-ink">
                      <Link href={`${section.path}/${d.slug}`} className="hover:text-brandink">
                        {d.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{d.description}</p>
                    <Link
                      href={`${section.path}/${d.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brandink hover:underline"
                      aria-label={`Read: ${d.title}`}
                    >
                      Read more <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
