"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "./ui";

/**
 * Contact form that opens WhatsApp with a message prefilled from what the
 * visitor typed (name, shop, what they sell). Client component so it can read
 * the live input values.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [phone, setPhone] = useState("");
  const [sells, setSells] = useState("");

  const message =
    "Hi grosumo! I want to claim my Founding 1000 slot for grosumoERP.\n" +
    `Name: ${name.trim() || "—"}\n` +
    `Shop / business: ${shop.trim() || "—"}\n` +
    `We sell: ${sells.trim() || "—"}` +
    (phone.trim() ? `\nPhone / WhatsApp: ${phone.trim()}` : "");

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const fields: [string, string, string, (v: string) => void, string][] = [
    ["Your name", "text", name, setName, "Your name"],
    ["Shop / business name", "text", shop, setShop, "Shop / business name"],
    ["Phone or WhatsApp", "tel", phone, setPhone, "Phone or WhatsApp"]
  ];

  return (
    <div className="card h-full p-8">
      <h2 className="text-[20px] font-bold">Or write to us here</h2>
      <div className="mt-6 space-y-4">
        {fields.map(([label, type, value, set, placeholder]) => (
          <label key={label} className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">{label}</span>
            <input
              type={type}
              value={value}
              onChange={(e) => set(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-wash/50 px-4 py-3 text-[15px] outline-none focus:border-brand"
              placeholder={placeholder}
            />
          </label>
        ))}
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">What do you sell?</span>
          <textarea
            rows={3}
            value={sells}
            onChange={(e) => setSells(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-wash/50 px-4 py-3 text-[15px] outline-none focus:border-brand"
            placeholder="Kirana, apparel, electricals…"
          />
        </label>
        <a href={href} target="_blank" rel="noopener" className="btn btn-green w-full">
          Send to grosumo on WhatsApp
        </a>
        <p className="text-center font-mono text-[11px] uppercase tracking-wider text-slate">
          Opens WhatsApp with your details filled in · we reply within one working day
        </p>
      </div>
    </div>
  );
}
