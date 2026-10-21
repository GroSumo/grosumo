"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-mint px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-white";

const editions = ["Offline (free software)", "Cloud", "Not sure yet"];

export default function ContactForm() {
  const [edition, setEdition] = useState(editions[0]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Hi Grosumo, I'd like to get started with grosumoERP.",
      `Name: ${data.get("name") || "-"}`,
      `Business: ${data.get("business") || "-"}`,
      `City: ${data.get("city") || "-"}`,
      `Edition: ${edition}`,
    ];
    const note = String(data.get("message") || "").trim();
    if (note) lines.push(`Note: ${note}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-9">
      <h2 className="text-xl font-bold tracking-tight text-ink">Send us a message on WhatsApp</h2>
      <p className="mt-1.5 text-sm text-muted">We&apos;ll draft the message for you — just press send in WhatsApp.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-muted">
          Your name
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-muted">
          Business name
          <input name="business" autoComplete="organization" className={inputClass} placeholder="Shop or company" />
        </label>
        <label className="block text-sm font-medium text-muted sm:col-span-2">
          City
          <input name="city" autoComplete="address-level2" className={inputClass} placeholder="City" />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-muted">Which edition are you considering?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {editions.map(opt => (
            <button
              key={opt}
              type="button"
              aria-pressed={edition === opt}
              onClick={() => setEdition(opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                edition === opt ? "border-brand bg-brand text-white" : "border-line bg-white text-muted hover:border-brand hover:text-brand"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block text-sm font-medium text-muted">
        Anything else? <span className="font-normal text-faint">(optional)</span>
        <textarea name="message" rows={4} className={`${inputClass} resize-y`} placeholder="What do you sell, how many bills a day, what you use today…" />
      </label>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        <MessageCircle className="size-[18px]" aria-hidden />
        Continue on WhatsApp
      </button>
    </form>
  );
}
