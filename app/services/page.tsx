import { FinalCTA, Services, SERVICES_INTRO } from "@/components/HomeSections";
import PageSchema from "@/components/PageSchema";
import { PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accounting, Legal & Marketing Services",
  description: "Beyond billing software: help with accounting and GST filing, legal paperwork and local marketing for Indian shops, from Grosumo.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <PageHeader eyebrow="Beyond software" title="Help with the rest" accent="of the business" intro={SERVICES_INTRO} />
      <Services heading={false} className="bg-wash" />
      <FinalCTA />
    </>
  );
}
