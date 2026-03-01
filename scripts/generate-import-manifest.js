#!/usr/bin/env node

/**
 * Generate an import manifest mapping GitHub issues → device-config YAMLs → Rust impls.
 *
 * Usage: node scripts/generate-import-manifest.js
 * Output: data/import-manifest.json
 *
 * Requires: gh CLI authenticated with access to buttplugio repos
 */

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CONFIG_DIR = path.join(ROOT, "data", "device-config");
const RUST_IMPL_DIR = path.resolve(
  ROOT,
  "../buttplug/crates/buttplug_server/src/device/protocol_impl"
);
const PROTOCOLS_DIR = path.join(ROOT, "stpihkal", "protocols");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[-_\s.]+/g, "")
    .replace(/['']/g, "")
    .replace(/protocol$/i, "")
    .replace(/documentation$/i, "")
    .trim();
}

function gh(...args) {
  return execFileSync("gh", args, {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });
}

/** Fetch open issues from a repo, excluding PRs and dependabot bumps. */
function fetchIssues(repo) {
  const raw = gh(
    "api",
    `repos/buttplugio/${repo}/issues?state=open&per_page=100`,
    "--paginate"
  );
  // gh api --paginate concatenates JSON arrays, so we may get ][, fix that:
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const fixed = "[" + raw.replace(/\]\s*\[/g, ",") + "]";
    parsed = JSON.parse(fixed).flat();
  }
  return parsed
    .filter((i) => !i.pull_request)
    .filter((i) => !/^Bump /i.test(i.title))
    .map((i) => ({
      repo,
      number: i.number,
      title: i.title,
      state: i.state,
      labels: (i.labels || []).map((l) => l.name),
      url: i.html_url,
    }));
}

function listFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(
      (f) => f.endsWith(ext) && !f.startsWith("mod.") && !f.startsWith("_")
    )
    .map((f) => f.replace(ext, ""));
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/** List existing protocol doc pages as normalized names. */
function existingDocs() {
  const docs = new Set();
  for (const brand of listDirs(PROTOCOLS_DIR)) {
    if (brand.startsWith("_")) continue;
    const brandDir = path.join(PROTOCOLS_DIR, brand);
    for (const f of fs.readdirSync(brandDir)) {
      if (f.endsWith(".md") && f !== "index.md") {
        docs.add(normalize(f.replace(".md", "")));
        // Also add with brand prefix
        docs.add(normalize(brand + f.replace(".md", "")));
      }
    }
  }
  return docs;
}

// ---------------------------------------------------------------------------
// Fuzzy matching
// ---------------------------------------------------------------------------

/** Extract likely protocol name from issue title. */
function extractProtocolName(title) {
  return title
    .replace(/^Document\s+/i, "")
    .replace(/^Add\s+(documentation\s+for\s+(the\s+)?)?/i, "")
    .replace(/\s+protocol(\s+specs?)?$/i, "")
    .replace(/\s+documentation$/i, "")
    .trim();
}

function fuzzyMatch(needle, candidates) {
  const n = normalize(needle);
  const matches = [];
  for (const c of candidates) {
    const cn = normalize(c);
    if (cn === n) {
      matches.push({ name: c, score: 1.0 });
    } else if (cn.includes(n) || n.includes(cn)) {
      const score =
        Math.min(n.length, cn.length) / Math.max(n.length, cn.length);
      matches.push({ name: c, score: Math.max(0.5, score) });
    } else {
      // Check word overlap
      const nWords = n
        .replace(/[^a-z0-9]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
      const cWords = cn
        .replace(/[^a-z0-9]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
      const overlap = nWords.filter((w) =>
        cWords.some((cw) => cw.includes(w) || w.includes(cw))
      );
      if (overlap.length > 0) {
        const score =
          overlap.length / Math.max(nWords.length, cWords.length);
        if (score >= 0.3) matches.push({ name: c, score: score * 0.8 });
      }
    }
  }
  matches.sort((a, b) => b.score - a.score);
  return matches[0] || null;
}

function confidence(configMatch, rustMatch) {
  const cs = configMatch?.score || 0;
  const rs = rustMatch?.score || 0;
  const best = Math.max(cs, rs);
  if (best >= 0.8) return "high";
  if (best >= 0.5) return "medium";
  if (best > 0) return "low";
  return "none";
}

/** Infer brand slug from protocol name. */
function inferBrand(protocolName) {
  const lower = protocolName.toLowerCase();
  // Map of known brand keywords → brand slugs
  const brandMap = {
    lovense: "lovense",
    kiiroo: "kiiroo",
    "we-vibe": "we-vibe",
    wevibe: "we-vibe",
    mysteryvibe: "mysteryvibe",
    vorze: "vorze",
    erostek: "erostek",
    "et-312": "erostek",
    et312: "erostek",
    "estim systems": "estim-systems",
    "2b": "estim-systems",
    fleshlight: "fleshlight",
    "f-machine": "f-machine",
    imtoy: "imtoy",
    nobra: "nobra",
    tcode: "tcode",
    prettylove: "prettylove",
    "pretty love": "prettylove",
    vibratissimo: "vibratissimo",
    lelo: "lelo",
    svakom: "svakom",
    satisfyer: "satisfyer",
    hismith: "hismith",
    galaku: "galaku",
    tryfun: "tryfun",
    "magic motion": "magic-motion",
    magicmotion: "magic-motion",
    meese: "meese",
    libo: "libo",
    cueme: "cueme",
    aneros: "aneros",
    ankni: "ankni",
    cowgirl: "cowgirl",
    "hot octopuss": "hot-octopuss",
    fredorch: "fredorch",
    mannuo: "mannuo",
    sensee: "sensee",
    sakuraneko: "sakuraneko",
    synchro: "synchro",
    "pink punch": "pink-punch",
    wetoy: "wetoy",
    lovedistance: "love-distance",
    "love distance": "love-distance",
    perifit: "perifit",
    nexus: "nexus",
    sexverse: "sexverse",
    bkk: "bkk",
    petrainer: "petrainer",
    petroom: "petroom",
    sportdog: "sportdog",
    oriori: "oriori",
    "possible kiss": "possible-kiss",
    hgod: "hgod",
    htk: "htk",
    picobong: "picobong",
    realov: "realov",
    zalo: "zalo",
    kgoal: "kgoal",
    vibease: "vibease",
    sistalk: "sistalk",
    foreo: "foreo",
    lioness: "lioness",
    joyhub: "joyhub",
    fox: "fox",
    "je joue": "jejoue",
    jejoue: "jejoue",
    monsterpub: "monsterpub",
    motorbunny: "motorbunny",
    patoo: "patoo",
    cachito: "cachito",
    deepsire: "deepsire",
    "rough beast": "rough-beast",
    "next level racing": "next-level-racing",
    "godrej": "godrej",
    "agui": "agui",
    blissmakers: "blissmakers",
    jeusn: "jeusn",
    syncbot: "syncbot",
    yiciyuan: "yiciyuan",
    muse: "muse",
    "love spouse": "muse",
    pavlok: "pavlok",
    "scream labs": "scream-labs",
  };
  for (const [keyword, slug] of Object.entries(brandMap)) {
    if (lower.includes(keyword)) return slug;
  }
  // Fall back to first word
  const firstWord = protocolName
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  return firstWord || "unknown";
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log("Fetching issues from buttplugio/stpihkal...");
  const stpihkalIssues = fetchIssues("stpihkal");
  console.log(`  Found ${stpihkalIssues.length} issues`);

  console.log("Fetching issues from buttplugio/docs.buttplug.io...");
  const docsIssues = fetchIssues("docs.buttplug.io").filter(
    (i) =>
      i.labels.some((l) => /protocol|stpihkal|device/i.test(l)) ||
      /protocol|document/i.test(i.title)
  );
  console.log(`  Found ${docsIssues.length} relevant issues`);

  const allIssues = [...stpihkalIssues, ...docsIssues];

  console.log("Loading device-config files...");
  const configFiles = listFiles(CONFIG_DIR, ".yml");
  console.log(`  Found ${configFiles.length} config files`);

  console.log("Loading Rust impl files...");
  const rustFiles = listFiles(RUST_IMPL_DIR, ".rs");
  console.log(`  Found ${rustFiles.length} Rust files`);

  console.log("Loading existing docs...");
  const existing = existingDocs();
  console.log(`  Found ${existing.size} existing doc pages`);

  const manifest = [];

  for (const issue of allIssues) {
    const protocolName = extractProtocolName(issue.title);
    const brand = inferBrand(protocolName);
    const slug = slugify(protocolName);

    const configMatch = fuzzyMatch(protocolName, configFiles);
    const rustMatch = fuzzyMatch(protocolName, rustFiles);

    // Check if already documented
    const normName = normalize(protocolName);
    const normSlug = normalize(slug);
    const existingDoc =
      existing.has(normName) ||
      existing.has(normSlug) ||
      existing.has(normalize(brand + protocolName));

    const conf = confidence(configMatch, rustMatch);

    manifest.push({
      repo: issue.repo,
      number: issue.number,
      title: issue.title,
      url: issue.url,
      protocol_name: protocolName,
      slug,
      brand,
      config_ref: configMatch && configMatch.score >= 0.4 ? configMatch.name + ".yml" : null,
      config_score: configMatch ? Math.round(configMatch.score * 100) / 100 : 0,
      rust_impl: rustMatch && rustMatch.score >= 0.4 ? rustMatch.name + ".rs" : null,
      rust_score: rustMatch ? Math.round(rustMatch.score * 100) / 100 : 0,
      confidence: conf,
      existing_doc: existingDoc,
      skip: existingDoc,
      notes: existingDoc ? "Already documented" : "",
    });
  }

  // Sort: non-skipped first, then by confidence desc
  const order = { high: 0, medium: 1, low: 2, none: 3 };
  manifest.sort((a, b) => {
    if (a.skip !== b.skip) return a.skip ? 1 : -1;
    return (order[a.confidence] || 3) - (order[b.confidence] || 3);
  });

  // Write manifest
  const outPath = path.join(ROOT, "data", "import-manifest.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${manifest.length} entries to ${outPath}`);

  // Summary
  const total = manifest.length;
  const skipped = manifest.filter((m) => m.skip).length;
  const active = total - skipped;
  const byConf = {};
  for (const m of manifest.filter((m) => !m.skip)) {
    byConf[m.confidence] = (byConf[m.confidence] || 0) + 1;
  }
  console.log(`\nSummary:`);
  console.log(`  Total issues: ${total}`);
  console.log(`  Already documented (skip): ${skipped}`);
  console.log(`  To import: ${active}`);
  console.log(`  By confidence: ${JSON.stringify(byConf)}`);
}

main();
