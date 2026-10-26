import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { Container, PageHeader } from "@/components/ui";
import { SUPPORT_EMAIL, SUPPORT_PHONE, WA_LINK } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

export const metadata = pageMetadata({
  title: "Contact grosumo — WhatsApp, email, Kadapa",
  description: "Talk to the grosumoERP team on WhatsApp or email. Start with the free Offline edition or the Cloud edition at ₹9,999/yr.",
  path: "/contact",
});

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: "Start a chat", href: WA_LINK },
  { icon: Mail, label: "Email", value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
  { icon: Phone, label: "Phone", value: SUPPORT_PHONE },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9 AM – 6 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Let's get your business"
        accent="running"
        intro="WhatsApp is the fastest way to reach us. Tell us a little about your business and which edition you're considering."
      />
      <section className="bg-wash py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <ul className="space-y-3">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-faint">{label}</span>
                    <span className="block text-[15px] font-semibold text-ink">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-colors hover:border-brand"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
