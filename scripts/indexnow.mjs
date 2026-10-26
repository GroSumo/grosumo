#!/usr/bin/env node
// Submits every URL in the live sitemap to IndexNow (Bing and other participating search engines).
//
//   npm run indexnow
//
// The key is public by design (it's served at /<key>.txt); INDEXNOW_KEY overrides the default.
// Always exits 0 so a failed submission never breaks a deploy.

const HOST = "www.grosumo.com";
const SITE = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY || "7d0b014926924d22b681e86e14b9c043";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const STATUS_MEANING = {
  200: "OK — URLs submitted",
  202: "Accepted — key validation pending",
  400: "Bad request — invalid format",
  403: "Forbidden — key not valid (is the key file live?)",
  422: "Unprocessable — URLs don't belong to the host or don't match the key",
  429: "Too many requests — try again later",
};

async function main() {
  const sitemap = await fetch(`${SITE}/sitemap.xml`, { headers: { "Cache-Control": "no-cache" } });
  if (!sitemap.ok) throw new Error(`sitemap.xml returned HTTP ${sitemap.status}`);
  const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  if (!urlList.length) throw new Error("no <loc> URLs found in sitemap.xml");

  console.log(`IndexNow: submitting ${urlList.length} URLs from ${SITE}/sitemap.xml`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });
  const body = (await res.text()).trim();
  const accepted = res.status === 200 || res.status === 202;
  console.log(`IndexNow: HTTP ${res.status} ${STATUS_MEANING[res.status] ?? res.statusText}${body ? ` — ${body.slice(0, 300)}` : ""}`);
  console.log(accepted ? "IndexNow: accepted" : "IndexNow: not accepted (deploy continues)");
}

main().catch(err => {
  console.log(`IndexNow: skipped — ${err.message}`);
});
