import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";
import { faqLd, type QA } from "@/lib/seo";

/** Accessible FAQ list with matching FAQPage JSON-LD. */
export default function Faq({ items }: { items: QA[] }) {
  return (
    <>
      <JsonLd data={faqLd(items)} />
      <div className="space-y-3">
        {items.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl border border-line bg-white shadow-card open:shadow-lift">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-ink">
              {q}
              <ChevronDown className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate">{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
