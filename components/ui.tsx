import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  primary: "bg-brandink text-white shadow-brand hover:bg-brand-dark",
  secondary: "border-2 border-line bg-white text-ink hover:border-brand hover:text-brandink",
  light: "bg-white text-deep hover:bg-soft",
  ghostDark: "border-2 border-white/25 text-white hover:border-mint hover:text-mint",
} as const;

type Variant = keyof typeof variants;

// Filled buttons carry the "→"; outlined ones stay quiet.
const showsArrow = (v: Variant) => v === "primary" || v === "light";

/** CTA that opens WhatsApp in a new tab. */
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
      {children}
      {showsArrow(variant) && <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />}
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
      {showsArrow(variant) && <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />}
    </Link>
  );
}

/** Rounded-full soft-blue label used for eyebrows and badges. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-soft px-3.5 py-1 text-[13.5px] font-semibold text-brandink ${className}`}>
      {children}
    </span>
  );
}

/** Near-black headline with only its final phrase in brand blue. */
export function Accented({ title, accent }: { title: React.ReactNode; accent?: React.ReactNode }) {
  return (
    <>
      {title}
      {accent && (
        <>
          {" "}
          <span className="text-brandink">{accent}</span>
        </>
      )}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl headline text-ink sm:text-[2.6rem]">
        <Accented title={title} accent={accent} />
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{intro}</p>}
    </div>
  );
}

export function CheckItem({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] leading-snug">
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
          tone === "light" ? "bg-white/15 text-mint" : "bg-soft text-brand"
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

/** Standard interior-page header: plain white, centred. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Container className="text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl headline text-ink sm:text-[3.4rem]">
          <Accented title={title} accent={accent} />
        </h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate">{intro}</p>}
      </Container>
    </section>
  );
}
