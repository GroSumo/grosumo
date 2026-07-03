import { Nav, Footer, PageHero } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "Contact — grosumo" };

export default function Contact() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="Contact"
        title="Talk to a person,"
        accent="not a portal."
        sub="Tell us about your shop — what you sell, how you bill today — and we'll set you up with grosumoERP and, if slots remain, your Founding 1000 lifetime-free subscription."
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[980px] gap-8 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <h2 className="text-[20px] font-bold">Reach us directly</h2>
              <div className="mt-6 space-y-5 text-[15px]">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Email</div>
                  <a href="mailto:hello@grosumo.com" className="mt-1 block font-medium text-brand">hello@grosumo.com</a>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">WhatsApp / Phone</div>
                  <a href="https://wa.me/918106140617" target="_blank" rel="noopener" className="mt-1 block font-medium text-brand">+91 81061 40617</a>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Office</div>
                  <div className="mt-1">grosumo · Kadapa, Andhra Pradesh, India</div>
                </div>
              </div>
              <p className="mt-8 rounded-xl bg-wash p-4 text-[13.5px] leading-relaxed text-slate">
                Already on Tally, Vyapar or Excel? Mention it — migration help
                (items, customers, opening balances) is free.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
