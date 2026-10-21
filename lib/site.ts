// Single source of truth for contact details, CTA links and edition pricing.

export const WHATSAPP_NUMBER = "918106140617";

export const WA_DEFAULT_MESSAGE = "Hi Grosumo, I'd like to start with grosumoERP.";

export function waLink(message: string = WA_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_LINK = waLink();
export const WA_OFFLINE_LINK = waLink("Hi Grosumo, I'd like to start with the free Offline edition of grosumoERP.");
export const WA_CLOUD_LINK = waLink("Hi Grosumo, I'd like to start with the Cloud edition of grosumoERP.");
export const WA_TALK_LINK = waLink("Hi Grosumo, I have a few questions about grosumoERP.");

export const SUPPORT_EMAIL = "hello@grosumo.com";
// TODO: replace with the real support phone number.
export const SUPPORT_PHONE = "+91 XXXXX XXXXX";
export const LOCATION = "Kadapa, Andhra Pradesh, India";
export const COMPANY = "Grosumo Technologies Pvt. Ltd.";

export const PRICE = {
  offlineSoftware: "₹0",
  offlineAmc: "₹1,999",
  cloud: "₹9,999",
} as const;

export const BOTH_EDITIONS_INCLUDE = [
  "All modules — billing, stock, purchases, accounts, customer credit",
  "Unlimited bills, items and customers",
  "GST-compliant invoicing",
  "Share bills and reminders on WhatsApp",
  "Sales, profit, stock and GST reports",
];
