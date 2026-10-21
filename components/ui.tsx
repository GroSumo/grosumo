import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark",
  secondary: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
  light: "bg-white text-deep hover:bg-brand-soft",
  ghostDark: "border border-white/25 text-white hover:bg-white/10",
} as const;

type Variant = keyof typeof variants;

/** Primary CTA — always opens WhatsApp in a new tab. */
export function WhatsAppButton({
  href = WA_LINK,
  children = "Start free on WhatsApp",
  variant = "primary",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      <MessageCircle className="size-[18px]" aria-hidden />
      {children}
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand ${className}`}>
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

export function CheckItem({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] leading-snug">
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
          tone === "light" ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
        }`}
      >
        <Check className="size-3" strokeWidth={3} aria-hidden />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Standard interior-page header on the light wash. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-mint pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(26,122,94,0.14),transparent)]"
      />
      <Container className="relative text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </Container>
    </section>
  );
}
