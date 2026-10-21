import type { Metadata } from "next";
import Hero from "@/components/Hero";
import EditionsSection from "@/components/Editions";
import Intelligence from "@/components/Intelligence";
import { FinalCTA, Modules, Services, Steps } from "@/components/HomeSections";

export const metadata: Metadata = {
  title: { absolute: "grosumoERP — GST billing software, cloud or offline (free software)" },
  description:
    "GST billing software and shop ERP for India. Offline edition: billing software that works without internet — software free forever, ₹1,999/yr AMC. Cloud edition: ₹9,999/yr, access from anywhere.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Modules />
      <EditionsSection />
      <Intelligence />
      <Steps />
      <Services />
      <FinalCTA />
    </>
  );
}
