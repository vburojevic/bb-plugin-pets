// Regenerate the bundled starter pet through the REAL plugin pipeline
// (src/spritegen.ts): gpt-image-2 hero (chroma-key fallback) → the essential
// pack of strips with in-place animation prompts → feet-anchored normalization
// → quantization.
// Usage: OPENAI_API_KEY=... node --experimental-strip-types scripts/regen-starter.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ANIMATION_PACKS } from "../src/atlas.ts";
import { generateHero, generateStrips } from "../src/spritegen.ts";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY not set");
  process.exit(1);
}
const outDir = "assets/starter";
mkdirSync(outDir, { recursive: true });

const engines = {
  openai: { apiKey, model: process.env.IMAGE_MODEL ?? "gpt-image-2" },
  rd: null,
  engine: "auto",
  pixelPerfect: true,
};

const description =
  "a small round teal axolotl creature with big friendly dark eyes, pink external gill frills on its head, tiny stubby limbs, soft lighter belly";

console.log(`hero (${engines.openai.model})…`);
const hero = await generateHero(engines, description);
writeFileSync(path.join(outDir, "hero.png"), hero);
console.log("  hero ok");

// The starter ships the essential pack — bigger packs are earned in-app.
const result = await generateStrips(
  engines,
  hero,
  (done, total, state) => console.log(`  ${done}/${total} ${state}`),
  undefined,
  ANIMATION_PACKS.essential,
);
for (const strip of result.strips) {
  writeFileSync(path.join(outDir, `${strip.state}.png`), strip.png);
}
writeFileSync(path.join(outDir, "atlas.json"), JSON.stringify(result.atlas, null, 2));
console.log("done — strips + atlas written");
