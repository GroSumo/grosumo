import Hero from "@/components/Hero";
import EditionsSection from "@/components/Editions";
import Intelligence from "@/components/Intelligence";
import { DashboardSection, FinalCTA, GuidesTeaser, Modules, Services, StatBand, Steps, WhyBoth } from "@/components/HomeSections";
import PageSchema from "@/components/PageSchema";
import { pageMetadata, softwareApplicationNode } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GST billing software, cloud or offline",
  description: "GST billing, stock & accounts for Indian shops. Offline edition: free software + ₹1,999/yr AMC. Cloud: ₹9,999/yr. All modules included.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <PageSchema nodes={[softwareApplicationNode()]} />
      <Hero />
      <StatBand />
      <DashboardSection />
      <Modules />
      <EditionsSection />
      <WhyBoth />
      <Intelligence />
      <Steps />
      <Services />
      <GuidesTeaser />
      <FinalCTA />
    </>
  );
}
