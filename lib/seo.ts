import type { Metadata } from "next";
import { COMPANY, SOCIAL_LINKS, SUPPORT_EMAIL, SUPPORT_PHONE_E164 } from "./site";

export const SITE_URL = "https://www.grosumo.com";
export const SITE_NAME = "grosumoERP";
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;
export const SITE_OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "grosumoERP — GST billing, stock & accounts, cloud or offline" };

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
 * OG/Twitter images: the site-wide app/opengraph-image + twitter-image routes. Next replaces a parent's whole
 * `openGraph` object when a page sets its own, so they're referenced explicitly here. Pages with their own image
 * files (guides, /for) pass `siteImages: false` and let those files win.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  noindex = false,
  siteImages = true,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
  siteImages?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  // Fail the build rather than ship a title or description search engines will truncate.
  const len = (s: string) => Array.from(s).length;
  if (len(fullTitle) > TITLE_MAX) throw new Error(`[seo] ${path}: title is ${len(fullTitle)} chars (max ${TITLE_MAX}): "${fullTitle}"`);
  if (len(description) > DESCRIPTION_MAX) throw new Error(`[seo] ${path}: description is ${len(description)} chars (max ${DESCRIPTION_MAX})`);
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
      ...(siteImages ? { images: [SITE_OG_IMAGE] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(siteImages ? { images: [SITE_OG_IMAGE.url.replace("opengraph", "twitter")] } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- JSON-LD nodes (schema.org). Pages combine them into one @graph via <PageSchema>. ---------- */

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

type Node = Record<string, unknown>;

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY,
    alternateName: "grosumo",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 640, height: 640 },
    email: SUPPORT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kadapa",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SUPPORT_PHONE_E164,
      contactType: "sales",
      email: SUPPORT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "te", "hi"],
    },
    sameAs: SOCIAL_LINKS,
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export const FEATURE_LIST = [
  "GST billing",
  "Quotations",
  "Inventory",
  "Purchases",
  "Returns",
  "Double-entry accounts",
  "Day close",
  "Customer credit (udhaar)",
  "Expenses",
  "Reports",
  "WhatsApp sharing",
];

export function softwareApplicationNode(): Node {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "grosumoERP",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    description:
      "GST billing, stock and accounts software for Indian shops, available as a Cloud edition (₹9,999/yr) or an Offline edition where the software is free and you pay ₹1,999/yr AMC. Both editions include all modules.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, Web, Android, iOS",
    featureList: FEATURE_LIST,
    publisher: { "@id": ORG_ID },
    offers: [
      {
        "@type": "Offer",
        name: "Offline edition",
        url: absolute("/offline"),
        price: 0,
        priceCurrency: "INR",
        description: "Software free; ₹1,999/yr AMC for updates, support and license renewal",
      },
      {
        "@type": "Offer",
        name: "Cloud edition",
        url: absolute("/cloud"),
        price: 9999,
        priceCurrency: "INR",
        description: "All-inclusive yearly subscription: hosting in India, cloud backups, updates and support",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 9999,
          priceCurrency: "INR",
          unitText: "YEAR",
          billingIncrement: 1,
        },
      },
    ],
  };
}

export type QA = { q: string; a: string };

export function faqNode(faq: QA[], path: string): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(path)}#faq`,
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(crumbs: Crumb[]): Node {
  const last = crumbs[crumbs.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(last.path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  };
}

export function itemListNode(path: string, items: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    "@id": `${absolute(path)}#list`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absolute(it.path),
    })),
  };
}

export function articleNode({
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
}): Node {
  return {
    "@type": "Article",
    "@id": `${absolute(path)}#article`,
    headline: title,
    description,
    mainEntityOfPage: absolute(path),
    url: absolute(path),
    image: `${absolute(path)}/opengraph-image`,
    datePublished,
    dateModified,
    inLanguage: "en-IN",
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** One JSON-LD document per page: Organization once, plus WebSite on home, BreadcrumbList elsewhere, plus page nodes. */
export function buildGraph({ crumbs, nodes = [] }: { crumbs?: Crumb[]; nodes?: Node[] }) {
  const isHome = !crumbs;
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), ...(isHome ? [websiteNode()] : [breadcrumbNode(crumbs)]), ...nodes],
  };
}
