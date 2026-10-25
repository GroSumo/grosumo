import Hero from "@/components/Hero";
import EditionsSection from "@/components/Editions";
import Intelligence from "@/components/Intelligence";
import { DashboardSection, FinalCTA, Modules, Services, StatBand, Steps, WhyBoth } from "@/components/HomeSections";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, softwareApplicationLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "grosumoERP — GST Billing & Inventory Software | Cloud or Offline",
  description: "GST billing & inventory software for Indian shops. Cloud edition ₹9,999/yr, or Offline edition: software free, pay only ₹1,999/yr AMC.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationLd()} />
      <Hero />
      <StatBand />
      <DashboardSection />
      <Modules />
      <EditionsSection />
      <WhyBoth />
      <Intelligence />
      <Steps />
      <Services />
      <FinalCTA />
    </>
  );
}
