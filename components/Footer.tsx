import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import { COMPANY, LOCATION, SUPPORT_EMAIL, SUPPORT_PHONE, WA_LINK } from "@/lib/site";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/product" },
      { label: "Offline edition", href: "/pricing#offline" },
      { label: "Cloud edition", href: "/pricing#cloud" },
      { label: "Compare editions", href: "/pricing#compare" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo size={26} dark />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/65">
              GST billing, stock, purchases, accounts and customer credit for Indian businesses.
            </p>
            <p className="mt-4 text-[15px] font-semibold text-white">Your data, your choice — cloud or your own PC.</p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/65">
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="size-4" aria-hidden /> {SUPPORT_EMAIL}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone className="size-4" aria-hidden /> {SUPPORT_PHONE}
              </li>
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <MessageCircle className="size-4" aria-hidden /> Chat on WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden /> {LOCATION}
              </li>
            </ul>
          </div>

          {columns.map(col => (
            <div key={col.heading}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            <span aria-hidden className="inline-flex h-3 w-4 flex-col overflow-hidden rounded-[2px]">
              <span className="flex-1 bg-[#FF9933]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
