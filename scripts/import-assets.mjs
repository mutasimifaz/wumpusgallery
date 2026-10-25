// Copies your original Wumpus files into public/wumpus/<slug>/<slug>.<ext>.
// Usage:  npm run import -- "C:\path\to\your\old\wumpus\folder"
// Matching is by file name: "Dance.gif", "wumpus_dance.json", "on-my-way.png" ... (case/spaces/symbols ignored).
import { readdir, readFile, copyFile, mkdir } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) { console.log('Usage: npm run import -- "<folder with your old gif/png/json files>"'); process.exit(1); }
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const list = JSON.parse(await readFile(join(root, "src/data/wumpuses.json"), "utf8"));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

async function walk(d) {
  const out = [];
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules") out.push(...await walk(p)); } else out.push(p);
  }
  return out;
}
const files = (await walk(src)).filter((f) => [".gif", ".png", ".json"].includes(extname(f).toLowerCase()));
const keyOf = (w) => norm(w.name);
let copied = 0; const missing = [];
for (const w of list) {
  for (const ext of [".gif", ".png", ".json"]) {
    const k = keyOf(w);
    const cands = files.filter((f) => extname(f).toLowerCase() === ext);
    // exact name match first, then "contains" (prefer shortest file name)
    const hit = cands.find((f) => norm(basename(f, ext)) === k)
      || cands.filter((f) => norm(basename(f, ext)).includes(k)).sort((a, b) => a.length - b.length)[0];
    if (!hit) { missing.push(`${w.name}${ext}`); continue; }
    const dest = join(root, "public/wumpus", w.slug, `${w.slug}${ext}`);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(hit, dest); copied++;
  }
}
console.log(`Copied ${copied} of ${list.length * 3} files.`);
if (missing.length) console.log("No match for:", missing.join(", "));
