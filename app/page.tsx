import { Nav, Footer } from "@/components/ui";
import {
  HomeHero,
  FoundingCounter,
  StatBand,
  SuiteGrid,
  IntelligenceRows,
  OfflineBand,
  ServicesBand,
  PricingTeaser,
  FinalCTA
} from "@/components/home";

export default function Home() {
  return (
    <main>
      <Nav />
      <HomeHero />
      <FoundingCounter />
      <StatBand />
      <SuiteGrid />
      <IntelligenceRows />
      <OfflineBand />
      <ServicesBand />
      <PricingTeaser />
      <FinalCTA />
      <Footer />
    </main>
  );
}
