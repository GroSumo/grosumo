import { Cloud, HardDrive } from "lucide-react";
import Intelligence from "@/components/Intelligence";
import { FinalCTA, MODULES } from "@/components/HomeSections";
import Reveal from "@/components/Reveal";
import { ButtonLink, CheckItem, Container, PageHeader, SectionHeading } from "@/components/ui";
import { pageMetadata, softwareApplicationNode } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

export const metadata = pageMetadata({
  title: "Product: GST billing, stock & accounts",
  description: "GST billing, stock, purchases, accounts, customer credit and reports in one shop ERP for India. Run it offline on your PC or in the cloud.",
  path: "/product",
});

const details: Record<string, string[]> = {
  "GST billing": ["CGST / SGST / IGST calculated automatically", "HSN codes and tax rates per item", "Print, PDF or WhatsApp the bill", "Cash, UPI and credit sales"],
  Stock: ["Stock updates with every sale and purchase", "Low-stock alerts", "Stock value at cost", "Sleeping-stock report"],
  Purchases: ["Supplier bills and returns", "Supplier dues and payments", "Purchase price history", "Input GST captured for reports"],
  Accounts: ["Cash and bank books", "Expense tracking", "Customer and supplier dues", "Day close shows net income after cost of goods and expenses"],
  "Customer credit": ["Due date on every credit bill", "Overdue list of who's late", "A WhatsApp reminder with one tap"],
  Reports: ["Sales and profit reports", "GST reports for filing", "Stock and movement reports", "Export for your CA"],
};

export default function ProductPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: "Product", path: "/product" }]} nodes={[softwareApplicationNode()]} />
      <PageHeader
        eyebrow="grosumoERP"
        title="Everything your shop runs on,"
        accent="in one ERP"
        intro="Billing, stock, purchases, accounts and customer credit — all connected, so every bill updates everything else. The same product whether you run it offline or in the cloud."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Modules" title="Every module,"
            accent="in both editions" />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {MODULES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 2) * 60} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate">{desc}</p>
                  <ul className="mt-5 grid gap-2.5 text-ink sm:grid-cols-2">
                    {details[title]?.map(p => (
                      <CheckItem key={p}>{p}</CheckItem>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="border-t border-line">
        <Intelligence />
      </div>

      <section className="bg-wash py-20 sm:py-28">
        <Container className="max-w-5xl">
          <SectionHeading center eyebrow="Two editions" title="Run it"
            accent="where it suits you" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: HardDrive,
                title: "Offline",
                price: "Software free · ₹1,999/yr AMC",
                body: "Installed on your Windows PC. Bill with zero internet, keep every record on your own machine. Download a full backup any time; optional scheduled encrypted email backup.",
              },
              {
                icon: Cloud,
                title: "Cloud",
                price: "₹9,999/yr all-in",
                body: "Open it from the shop, home or on the road, on any device. Hosted in India. Download a full backup any time; optional scheduled encrypted email backup.",
              },
            ].map(({ icon: Icon, title, price, body }) => (
              <Reveal key={title} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{title} edition</h3>
                  <p className="mt-1 font-mono text-sm text-brandink">{price}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/pricing">Compare editions</ButtonLink>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
