import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "grosumoERP — GST billing & shop ERP, cloud or offline",
    template: "%s | grosumoERP",
  },
  description:
    "One ERP for Indian shops and businesses: GST billing, stock, purchases, accounts and customer credit. Choose the Offline edition — free software, works without internet, pay only ₹1,999/yr AMC — or the Cloud edition at ₹9,999/yr.",
  keywords: [
    "offline billing software",
    "billing software without internet",
    "GST billing software",
    "shop ERP India",
    "cloud billing software",
    "free billing software",
    "inventory and billing software",
  ],
  applicationName: "grosumoERP",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "grosumoERP",
    locale: "en_IN",
    title: "grosumoERP — One ERP. Cloud or offline, your choice.",
    description:
      "GST billing, stock, purchases, accounts and customer credit in one platform. Offline edition: software free, pay only AMC. Cloud edition: ₹9,999/yr all-in.",
  },
};

export const viewport: Viewport = {
  themeColor: "#079FF3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
