"use client";
import { useSyncExternalStore } from "react";
import { ArrowRight, Monitor, Smartphone } from "lucide-react";
import { DEMO } from "@/lib/site";

const SMALL = "(max-width: 767px)";

const VIEWS = [
  {
    key: "desktop",
    Icon: Monitor,
    title: "Desktop — full ERP",
    line: "Billing counter, stock, purchases, accounts, reports — everything. Best on a laptop or PC.",
    cta: "Open desktop demo",
    href: DEMO.url,
  },
  {
    key: "mobile",
    Icon: Smartphone,
    title: "Mobile view",
    line: "GST bills for standard and variant items, printed to Bluetooth on Android — plus today's sales, customer dues and stock lookup.",
    cta: "Open mobile demo",
    href: DEMO.mobileUrl,
  },
] as const;

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(SMALL);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// Viewport only — no user-agent sniffing. The server doesn't know the width (null), so the first paint
// uses CSS breakpoints for order and the "Recommended" label; after hydration the DOM order is swapped too,
// so keyboard focus order matches what's on screen.
function useSmallScreen(): boolean | null {
  return useSyncExternalStore<boolean | null>(subscribe, () => window.matchMedia(SMALL).matches, () => null);
}

// "small"/"wide" = recommended only at that breakpoint (pre-hydration); booleans once the width is known.
type Rec = boolean | "small" | "wide";
const BADGE: Record<string, string> = {
  true: "inline-flex",
  false: "hidden",
  small: "inline-flex md:hidden",
  wide: "hidden md:inline-flex",
};
const FRAME: Record<string, string> = {
  true: "border-2 border-brand shadow-lift",
  false: "border-2 border-line shadow-card",
  small: "border-2 border-brand shadow-lift md:border-line md:shadow-card",
  wide: "border-2 border-line shadow-card md:border-brand md:shadow-lift",
};

export default function DemoOptions() {
  const small = useSmallScreen();
  const views = small ? [VIEWS[1], VIEWS[0]] : VIEWS;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {views.map(({ key, Icon, title, line, cta, href }) => {
        const rec: Rec = small === null ? (key === "mobile" ? "small" : "wide") : small === (key === "mobile");
        return (
          <div
            key={key}
            className={`flex flex-col rounded-2xl bg-white p-7 sm:p-8 ${FRAME[String(rec)]} ${small === null && key === "mobile" ? "max-md:order-first" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className={`${BADGE[String(rec)]} items-center rounded-full bg-soft px-3 py-1 text-xs font-bold text-brandink`}>
                Recommended on this device
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-slate">{line}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brandink px-6 py-3.5 text-base font-bold text-white shadow-brand transition-colors hover:bg-brand-dark"
            >
              {cta} <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
            </a>
            <p className="mt-3 truncate text-center font-mono text-xs text-faint select-all">{href.replace("https://", "")}</p>
          </div>
        );
      })}
    </div>
  );
}
