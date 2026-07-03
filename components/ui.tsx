import Link from "next/link";

export const WHATSAPP_NUMBER = "918106140617"; // country code + number, no + or spaces

/** Build a wa.me deep-link with a prefilled message. */
export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Founding 1000 claim — the default CTA across the site
export const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi grosumo! I want to claim my Founding 1000 slot for grosumoERP."
)}`;

// Non-founding contexts (e.g. services enquiries)
export const WA_LINK_SERVICES = waLink(
  "Hi grosumo! I'd like to know more about your services."
);

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-linedark bg-abyss/90 text-fog backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-page items-center justify-between px-6">
        <Link href="/" className="flex items-baseline text-[21px] font-light tracking-tight">
          <span
            aria-hidden
            className="relative top-[4px] mr-[2px] inline-block h-[24px] w-[24px] rotate-45 rounded-full border-[2.5px] border-mint border-t-transparent"
          />
          rosumo<b className="font-semibold text-mint">ERP</b>
        </Link>
        <div className="hidden items-center gap-8 text-[14.5px] font-medium text-haze md:flex">
          <Link href="/product" className="hover:text-mint">Product</Link>
          <Link href="/pricing" className="hover:text-mint">Pricing</Link>
          <Link href="/services" className="hover:text-mint">Services</Link>
          <Link href="/contact" className="hover:text-mint">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden text-[14px] font-medium text-haze hover:text-mint md:block">
            Talk to us
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="btn btn-solid !px-5 !py-2.5 !text-[14px]"
          >
            Claim founding slot
          </a>
        </div>
      </div>
    </nav>
  );
}

const FOOT: [string, [string, string][]][] = [
  ["Product", [["Overview", "/product"], ["Sell & bill", "/product#sell"], ["Stock & purchases", "/product#stock"], ["Accounts & reports", "/product#money"], ["Pricing", "/pricing"]]],
  ["Services", [["Accounting & CA", "/services"], ["Legal & registrations", "/services"], ["Marketing & design", "/services"]]],
  ["Company", [["Contact", "/contact"], ["About grosumo", "/contact"], ["Privacy", "#"], ["Terms", "#"]]]
];

export function Footer() {
  return (
    <footer className="bg-abyss text-fog">
      <div className="mx-auto max-w-page px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline text-[20px] font-light">
              <span
                aria-hidden
                className="relative top-[4px] mr-[2px] inline-block h-[22px] w-[22px] rotate-45 rounded-full border-[2.5px] border-mint border-t-transparent"
              />
              rosumo<b className="font-semibold text-mint">ERP</b>
            </div>
            <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-haze">
              The complete business suite for Indian SMEs and MSMEs — billing,
              stock, accounts and insight, running on your own machine. Built by
              grosumo, Kadapa, Andhra Pradesh.
            </p>
            <p className="mt-4 font-mono text-[13px] text-mint">hello@grosumo.com</p>
          </div>
          {FOOT.map(([h, items]) => (
            <div key={h}>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-haze">{h}</div>
              <ul className="space-y-2.5 text-[14px]">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-fog/80 hover:text-mint">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-linedark pt-6 font-mono text-[12px] text-haze">
          <span>© 2026 grosumo. All rights reserved.</span>
          <span>Made in India 🇮🇳 · Your data stays on your machine</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  sub
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
}) {
  return (
    <header className="hero-dark relative text-fog">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-page px-6 pb-20 pt-16 text-center md:pt-20">
        <span className="eyebrow text-mint">{eyebrow}</span>
        <h1 className="h-display mx-auto mt-5 max-w-[760px] text-[clamp(36px,5.4vw,60px)]">
          {title} {accent && <span className="h-accent text-mint">{accent}</span>}
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[17.5px] leading-relaxed text-haze">{sub}</p>
      </div>
    </header>
  );
}
