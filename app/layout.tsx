import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "grosumoERP — Your shop is already telling you what to do",
  description:
    "grosumoERP turns every bill into business intelligence — cash rotation, daily profit or deficit, dead stock, credit exposure — all on your own machine, no cloud required. Free for your first year.",
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
