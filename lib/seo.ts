import type { Metadata } from "next";
import { COMPANY, SOCIAL_LINKS, SUPPORT_EMAIL, WHATSAPP_NUMBER } from "./site";

export const SITE_URL = "https://www.grosumo.com";
export const SITE_NAME = "grosumoERP";
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "grosumoERP — GST billing & inventory software, cloud or offline" };

// Last content update for routes without their own date (used by the sitemap).
export const SITE_UPDATED = "2026-10-25";

/**
 * Locales. Only enabled ones are emitted as hreflang alternates, so adding Telugu or Hindi later is:
 * build the /te or /hi routes, then flip `enabled`.
 */
export const LOCALES = [
  { hreflang: "en-IN", prefix: "", enabled: true },
  { hreflang: "te-IN", prefix: "/te", enabled: false },
  { hreflang: "hi-IN", prefix: "/hi", enabled: false },
] as const;

export function languagesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) if (l.enabled) languages[l.hreflang] = `${l.prefix}${path}`;
  languages["x-default"] = path;
  return languages;
}

/**
 * Per-page metadata: "<title> | grosumoERP" (keep `title` ≤ 47 chars so the whole thing stays ≤ 60),
 * description ≤ 155 chars, canonical, hreflang, Open Graph and Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path, languages: languagesFor(path) },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- JSON-LD (schema.org) ---------- */

const ORG_ID = `${SITE_URL}/#organization`;
const absolute = (path: string) => `${SITE_URL}${path}`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "grosumo",
    legalName: COMPANY,
    url: SITE_URL,
    logo: absolute("/logo.png"),
    email: SUPPORT_EMAIL,
    ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: SUPPORT_EMAIL,
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
        areaServed: "IN",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export const FEATURE_LIST = [
  "GST billing with CGST, SGST and IGST",
  "Stock and inventory management",
  "Purchases and supplier dues",
  "Accounts: cash, bank, expenses and ledgers",
  "Customer credit and receivables aging",
  "Sales, profit, stock and GST reports",
  "Share bills and payment reminders on WhatsApp",
  "Offline edition works without internet, with local daily backups",
  "Cloud edition with access from any device and data hosted in India",
];

export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "grosumoERP",
    url: SITE_URL,
    image: absolute("/logo.png"),
    description:
      "GST billing and inventory software for Indian shops, available as a Cloud edition (₹9,999/yr) or an Offline edition where the software is free and you pay ₹1,999/yr AMC.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, Web",
    featureList: FEATURE_LIST,
    publisher: { "@id": ORG_ID },
    offers: [
      {
        "@type": "Offer",
        name: "Offline edition",
        url: absolute("/offline"),
        price: "0",
        priceCurrency: "INR",
        description: "Software free forever; annual maintenance contract (AMC) ₹1,999 per year for updates, support and licence renewal.",
        priceSpecification: [
          { "@type": "UnitPriceSpecification", name: "Software licence", price: "0", priceCurrency: "INR" },
          {
            "@type": "UnitPriceSpecification",
            name: "Annual maintenance contract (AMC)",
            price: "1999",
            priceCurrency: "INR",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" },
          },
        ],
      },
      {
        "@type": "Offer",
        name: "Cloud edition",
        url: absolute("/cloud"),
        price: "9999",
        priceCurrency: "INR",
        description: "All-in yearly subscription: hosting in India, cloud backups, updates and support.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "9999",
          priceCurrency: "INR",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" },
        },
      },
    ],
  };
}

export type QA = { q: string; a: string };

export function faqLd(faq: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function articleLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absolute(path),
    url: absolute(path),
    image: absolute(OG_IMAGE.url),
    datePublished,
    dateModified,
    inLanguage: "en-IN",
    keywords: keywords.join(", "),
    author: { "@type": "Organization", name: "grosumo team", url: SITE_URL },
    publisher: { "@id": ORG_ID },
  };
}
