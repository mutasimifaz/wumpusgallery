// Downloads every GIF / PNG / Lottie JSON listed in src/data/wumpuses.json
// into public/wumpus/<slug>/<slug>.<ext>. Already-downloaded files are skipped.
// Run:  npm run assets
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const list = JSON.parse(await readFile(join(root, "src/data/wumpuses.json"), "utf8"));
const ext = { gif: "gif", png: "png", lottie: "json" };

const jobs = list.flatMap((w) =>
  Object.entries(ext).map(([fmt, e]) => ({
    url: w.remote[fmt],
    file: join(root, "public/wumpus", w.slug, `${w.slug}.${e}`),
    label: `${w.name} .${e}`,
  }))
);

const exists = (f) => access(f).then(() => true, () => false);
let ok = 0, skipped = 0, failed = [];

async function run(job) {
  if (await exists(job.file)) { skipped++; return; }
  try {
    const res = await fetch(job.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(job.file), { recursive: true });
    await writeFile(job.file, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", job.label);
  } catch (err) {
    failed.push(job);
    console.log("✗", job.label, "-", err.message);
  }
}

const queue = [...jobs];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await run(queue.shift()); }));
console.log(`\nDone. downloaded ${ok}, skipped ${skipped}, failed ${failed.length}`);
if (failed.length) process.exitCode = 1;
