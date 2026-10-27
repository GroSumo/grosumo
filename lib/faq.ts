import type { QA } from "./seo";

const isFree: QA = {
  q: "Is the offline software really free?",
  a: "Yes — the software is free, forever, for everyone. There is no licence fee and no per-bill or per-user charge. The only charge is the ₹1,999/yr AMC.",
};
const amcCovers: QA = {
  q: "What does the AMC cover?",
  a: "The annual maintenance contract (₹1,999/yr) covers software updates, support from our team on WhatsApp and phone, and your yearly licence renewal.",
};
const noRenewal: QA = {
  q: "What happens if I don't renew the AMC?",
  a: "Your data lives on your own PC in both editions' backups. After the 7-day trial there is a 7-day grace period; after that the software pauses until the licence is renewed. Download a backup before expiry — we recommend the scheduled email backup — and everything is restored on renewal. We're working on keeping backup download available after expiry.",
};
const cloudIncludes: QA = {
  q: "What's included in the Cloud price?",
  a: "₹9,999/yr covers everything: hosting in India, updates and support. There's no separate AMC for Cloud.",
};
const canSwitch: QA = {
  q: "Can I switch between editions later?",
  a: "Yes. You can move from Offline to Cloud, or Cloud to Offline, whenever it suits you — we help you move your data across.",
};
const gst: QA = {
  q: "Do both editions support GST?",
  a: "Yes. Both editions include GST-compliant invoicing and GST reports. The features are the same — only where the software runs is different.",
};
const offlineNeeds: QA = {
  q: "What do I need to run the offline edition?",
  a: "A Windows PC. No internet connection is needed for day-to-day billing; you only need it to download updates.",
};
const bringData: QA = {
  q: "Can I bring my data from my current billing app or spreadsheets?",
  a: "Yes. We help you bring in your items, customers and opening balances when we set you up.",
};

export const PRICING_FAQ: QA[] = [isFree, amcCovers, noRenewal, cloudIncludes, canSwitch, gst, offlineNeeds, bringData];

export const OFFLINE_FAQ: QA[] = [
  isFree,
  amcCovers,
  offlineNeeds,
  {
    q: "Is my data safe if it stays on my PC?",
    a: "Your data never leaves your machine. Download a full backup any time, or turn on the optional scheduled encrypted email backup. Copy backups to a pen drive or second disk regularly so you can restore on a new PC if needed.",
  },
  noRenewal,
  { q: "Can I move to the Cloud edition later?", a: "Yes. When you want access from anywhere, we help you move your data to the Cloud edition." },
];

export const CLOUD_FAQ: QA[] = [
  cloudIncludes,
  {
    q: "Can I use the Cloud edition on my phone?",
    a: "Yes. The Cloud edition runs in a web browser, so you can open it on a phone, tablet, laptop or desktop with an internet connection.",
  },
  { q: "Where is my data stored?", a: "On servers in India. Download a full backup any time; optional scheduled encrypted email backup." },
  { q: "Do I need internet to use it?", a: "Yes — the Cloud edition needs an internet connection. If your counter's internet is unreliable, the Offline edition works with no connection at all." },
  gst,
  { q: "Can I move to the Offline edition later?", a: "Yes. If you'd rather keep everything on your own PC, we help you move your data to the Offline edition." },
];
