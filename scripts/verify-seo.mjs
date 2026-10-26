#!/usr/bin/env node
// SEO smoke test for the built or live site.
//
//   npm run build && npm run start      # in one terminal
//   npm run verify:seo                  # checks http://localhost:3000
//   npm run verify:seo https://www.grosumo.com
//
// Fetches every URL in sitemap.xml plus /blog, prints a table, and checks robots.txt.
// Exits 1 if any page is missing a canonical or og:image, exceeds the title/description limits,
// contains the "XXXXX" placeholder, doesn't have exactly one <h1>, or robots.txt lacks the Disallow lines.

const CANONICAL_HOST = "https://www.grosumo.com";
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const EXTRA_PATHS = ["/blog"];
const REQUIRED_DISALLOW = ["/api/", "/app/", "/login", "/signin", "/signup"];

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const headers = { "User-Agent": "grosumo-verify-seo", "Cache-Control": "no-cache" };

const decode = s =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const chars = s => Array.from(s).length;
const pick = (html, re) => html.match(re)?.[1];

async function get(path) {
  const res = await fetch(base + path, { headers, redirect: "follow" });
  return { status: res.status, body: await res.text() };
}

async function checkPage(path) {
  const { status, body } = await get(path);
  const head = body.slice(0, body.indexOf("</head>") + 7);
  const title = decode(pick(head, /<title>(.*?)<\/title>/) ?? "");
  const desc = pick(head, /<meta name="description" content="(.*?)"\/?>/);
  const canonical = pick(head, /<link rel="canonical" href="(.*?)"\/?>/) ?? "";
  const ogImage = pick(head, /<meta property="og:image" content="(.*?)"\/?>/) ?? "";
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  const hasPlaceholder = body.includes("XXXXX");
  const expectedCanonical = `${CANONICAL_HOST}${path === "/" ? "" : path}`;

  const problems = [];
  if (status !== 200) problems.push(`HTTP ${status}`);
  if (!title) problems.push("no title");
  else if (chars(title) > TITLE_MAX) problems.push(`title ${chars(title)} > ${TITLE_MAX}`);
  if (desc === undefined) problems.push("no meta description");
  else if (chars(decode(desc)) > DESCRIPTION_MAX) problems.push(`description ${chars(decode(desc))} > ${DESCRIPTION_MAX}`);
  if (!canonical) problems.push("no canonical");
  else if (canonical !== expectedCanonical) problems.push(`canonical should be ${expectedCanonical}`);
  if (!ogImage) problems.push("no og:image");
  if (hasPlaceholder) problems.push('contains "XXXXX"');
  if (h1 !== 1) problems.push(`${h1} <h1>`);

  return {
    url: path,
    title: title ? chars(title) : "-",
    desc: desc === undefined ? "-" : chars(decode(desc)),
    canonical: canonical.replace(CANONICAL_HOST, "") || (canonical ? "/" : "MISSING"),
    ogImage: ogImage ? ogImage.replace(CANONICAL_HOST, "").replace(/\?.*$/, "") : "MISSING",
    xxxxx: hasPlaceholder ? "YES" : "no",
    h1Count: h1,
    problems,
  };
}

function printTable(rows) {
  const cols = [
    ["url", "url"],
    ["title", "title len"],
    ["desc", "desc len"],
    ["canonical", "canonical"],
    ["ogImage", "og:image"],
    ["xxxxx", 'has "XXXXX"'],
    ["h1Count", "h1 count"],
  ];
  const width = cols.map(([k, label]) => Math.max(label.length, ...rows.map(r => String(r[k]).length)));
  const line = cells => cells.map((c, i) => String(c).padEnd(width[i])).join(" | ");
  console.log(line(cols.map(([, label]) => label)));
  console.log(width.map(w => "-".repeat(w)).join("-|-"));
  for (const r of rows) console.log(line(cols.map(([k]) => r[k])));
}

async function checkRobots() {
  const { status, body } = await get("/robots.txt");
  const groups = body.split(/\n\s*\n/).filter(g => /user-agent:/i.test(g));
  const missing = groups
    .map(g => ({
      agent: g.match(/user-agent:\s*(.+)/i)?.[1].trim(),
      lacking: REQUIRED_DISALLOW.filter(d => !new RegExp(`^disallow:\\s*${d.replace(/[/]/g, "\\/")}\\s*$`, "im").test(g)),
    }))
    .filter(g => g.lacking.length);
  const problems = [];
  if (status !== 200) problems.push(`HTTP ${status}`);
  if (!groups.length) problems.push("no User-Agent groups");
  for (const g of missing) problems.push(`${g.agent} lacks Disallow ${g.lacking.join(", ")}`);
  if (!/^sitemap:\s*\S+/im.test(body)) problems.push("no Sitemap line");
  return { groups: groups.length, problems };
}

const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) {
  console.error(`Could not fetch ${base}/sitemap.xml (HTTP ${sitemap.status})`);
  process.exit(1);
}
const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const p of EXTRA_PATHS) if (!paths.includes(p)) paths.push(p);

console.log(`Checking ${paths.length} pages on ${base}\n`);
const rows = [];
for (const p of paths) rows.push(await checkPage(p));
printTable(rows);

const robots = await checkRobots();
console.log(`\nrobots.txt: ${robots.groups} user-agent groups — ${robots.problems.length ? "FAIL" : "all have the required Disallow lines"}`);

const failures = rows.filter(r => r.problems.length);
for (const r of failures) console.log(`FAIL ${r.url}: ${r.problems.join("; ")}`);
for (const p of robots.problems) console.log(`FAIL robots.txt: ${p}`);

const ok = !failures.length && !robots.problems.length;
console.log(`\n${ok ? "PASS" : "FAIL"} — ${rows.length - failures.length}/${rows.length} pages pass, robots.txt ${robots.problems.length ? "fails" : "passes"}`);
process.exit(ok ? 0 : 1);
