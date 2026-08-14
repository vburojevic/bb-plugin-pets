// Server-side sprite generation — hatch/evolve pipelines.
//
// Two engines:
// - OpenAI gpt-image (heroes, drafts, and strips when RD is absent). Learned
//   live: models miscount multi-row grids but handle one row of 4; the model
//   paints a near-opaque glow halo (flood-fill from borders removes it); and
//   gpt-image-2 dropped `background: transparent`, so a magenta chroma-key
//   path kicks in automatically when the API rejects transparency.
// - Retro Diffusion (strips, when an rdpk- key is configured): purpose-built
//   pixel art — true grid, real palettes, native resolution, 8-frame
//   animations via rd_advanced_animation styles with the (quantized) hero as
//   the identity frame.
//
// All gpt output can be post-processed to true pixel resolution (pixelPerfect)
// via src/quantize.ts.
import { PNG } from "pngjs";
import { SPRITE_STATES, type SpriteAtlas, type SpriteState } from "./atlas.ts";
import {
  keyChromaMarker,
  keyMagenta,
  keySolidBackground,
  pixelateSingle,
  pixelateStrip,
} from "./quantize.ts";

export const STYLE =
  "chunky retro pixel-art style, like a 32x32 video game sprite scaled up with crisp square pixels, clean silhouette, no anti-aliasing halos";

const STATE_PROMPTS: Record<SpriteState, { prompt: string; fps: number; loop: boolean }> = {
  idle: {
    prompt:
      "standing relaxed idle animation: frame 1 neutral stance, frame 2 slight squash as it breathes in, frame 3 back to neutral, frame 4 eyes closed mid-blink",
    fps: 3,
    loop: true,
  },
  walk: {
    prompt:
      "walk cycle facing right, walking IN PLACE like on a treadmill — the body stays fixed at the center of its cell while only the legs and arms move: frame 1 contact step, frame 2 push off with slight rise, frame 3 passing pose, frame 4 opposite contact step",
    fps: 7,
    loop: true,
  },
  think: {
    prompt:
      "thinking animation: looking up thoughtfully tapping chin with a stubby arm, tiny thought sparks appearing above its head, sparks growing frame by frame",
    fps: 4,
    loop: true,
  },
  waiting: {
    prompt:
      "impatient waiting animation: arms crossed, tapping foot, glancing sideways, frame 4 a small exasperated huff",
    fps: 3,
    loop: true,
  },
  celebrate: {
    prompt:
      "celebration animation: crouching then jumping with joy, arms up, a few tiny confetti pixels around it at the peak",
    fps: 6,
    loop: false,
  },
  sad: {
    prompt:
      "sad animation: posture drooping lower each frame, head down, a single pixel sweat-drop appearing",
    fps: 3,
    loop: false,
  },
  sleep: {
    prompt:
      "sleeping animation: curled up on the ground, eyes closed, small pixel Z shapes rising and drifting up frame by frame",
    fps: 2,
    loop: true,
  },
  wave: {
    prompt:
      "friendly greeting animation: standing and waving one arm, arm up in frames 1 and 3, arm down in frames 2 and 4, smiling",
    fps: 5,
    loop: false,
  },
  point: {
    prompt:
      "pointing animation: one arm extended upward and outward pointing at something above, looking the same direction, small excited bounce across frames, other arm at its side",
    fps: 4,
    loop: true,
  },
  love: {
    prompt:
      "affection animation: blushing with happy closed eyes, small pixel hearts appearing and rising, gentle wiggle left and right",
    fps: 5,
    loop: true,
  },
  dig: {
    prompt:
      "digging animation: crouched, front limbs digging at the ground, small dirt pixels flying up behind",
    fps: 7,
    loop: true,
  },
  run: {
    prompt:
      "run cycle facing right, running IN PLACE like on a treadmill — leaning forward, legs cycling fast: contact, gather, extension, flight phase",
    fps: 12,
    loop: true,
  },
  jump: {
    prompt:
      "vertical hop animation: crouch, spring upward with limbs tucked, peak in the air, land back down",
    fps: 8,
    loop: false,
  },
  startled: {
    prompt:
      "startled animation: sudden jump back, wide eyes, small alarm lines above head, settling into a worried stance",
    fps: 8,
    loop: false,
  },
  sit: {
    prompt: "sitting animation: settled on the ground relaxed, subtle breathing, one slow blink",
    fps: 3,
    loop: true,
  },
  stretch: {
    prompt: "stretch animation: arms up overhead stretching, a big yawn, relaxing back down",
    fps: 5,
    loop: false,
  },
  dance: {
    prompt: "dance animation: bouncing side to side rhythmically, arms swinging, happy face",
    fps: 7,
    loop: true,
  },
  grumpy: {
    prompt:
      "grumpy animation: arms crossed tight, frowning, a small pixel storm cloud above its head, one foot stomp",
    fps: 4,
    loop: true,
  },
};

/**
 * Retro Diffusion animation mapping. The always-visible loops (walk, idle)
 * get RD's maximum 16 frames — same per-call price, twice the smoothness;
 * Hermes ships 8 frames per state, so this is deliberately past parity.
 */
const RD_ACTIONS: Record<
  SpriteState,
  { style: string; prompt: string; fps: number; frames: 4 | 6 | 8 | 10 | 12 | 16 }
> = {
  idle: {
    style: "rd_advanced_animation__idle",
    prompt: "standing relaxed, breathing gently, occasional blink",
    fps: 8,
    frames: 16,
  },
  walk: {
    style: "rd_advanced_animation__walking",
    prompt: "walking toward the right",
    fps: 20,
    frames: 16,
  },
  think: {
    style: "rd_advanced_animation__custom_action",
    prompt: "looking up thoughtfully, tapping chin, small thought sparks above head",
    fps: 8,
    frames: 8,
  },
  waiting: {
    style: "rd_advanced_animation__custom_action",
    prompt: "arms crossed, tapping foot impatiently, glancing sideways",
    fps: 7,
    frames: 8,
  },
  celebrate: {
    style: "rd_advanced_animation__jump",
    prompt: "joyful celebratory jump with arms up",
    fps: 12,
    frames: 8,
  },
  sad: {
    style: "rd_advanced_animation__custom_action",
    prompt: "drooping sadly, head hanging down, deflating posture",
    fps: 6,
    frames: 8,
  },
  sleep: {
    style: "rd_advanced_animation__custom_action",
    prompt: "curled up asleep on the ground, gentle breathing, small Z shapes rising",
    fps: 5,
    frames: 8,
  },
  wave: {
    style: "rd_advanced_animation__custom_action",
    prompt: "waving one arm in friendly greeting, smiling",
    fps: 10,
    frames: 8,
  },
  point: {
    style: "rd_advanced_animation__custom_action",
    prompt: "pointing upward and outward excitedly with one arm extended",
    fps: 9,
    frames: 8,
  },
  love: {
    style: "rd_advanced_animation__custom_action",
    prompt: "blushing happily, small hearts rising around it, gentle wiggle",
    fps: 7,
    frames: 8,
  },
  dig: {
    style: "rd_advanced_animation__custom_action",
    prompt: "digging at the ground with front limbs, dirt pixels flying",
    fps: 9,
    frames: 8,
  },
  run: {
    style: "rd_advanced_animation__custom_action",
    prompt: "running fast toward the right, leaning forward",
    fps: 24,
    frames: 16,
  },
  jump: {
    style: "rd_advanced_animation__jump",
    prompt: "a simple vertical hop in place",
    fps: 10,
    frames: 8,
  },
  startled: {
    style: "rd_advanced_animation__custom_action",
    prompt: "startled jump-back with wide eyes and alarm lines, then a worried stance",
    fps: 9,
    frames: 8,
  },
  sit: {
    style: "rd_advanced_animation__custom_action",
    prompt: "sitting down on the ground, relaxed, breathing gently",
    fps: 5,
    frames: 8,
  },
  stretch: {
    style: "rd_advanced_animation__custom_action",
    prompt: "stretching arms overhead and yawning, then relaxing",
    fps: 7,
    frames: 8,
  },
  dance: {
    style: "rd_advanced_animation__custom_action",
    prompt: "dancing side to side rhythmically with arms swinging",
    fps: 10,
    frames: 16,
  },
  grumpy: {
    style: "rd_advanced_animation__custom_action",
    prompt: "grumpy with arms crossed, frowning, a tiny storm cloud overhead",
    fps: 5,
    frames: 8,
  },
};

export const STAGE_MODIFIERS: Record<number, string> = {
  1: "slightly larger and sturdier than before, with a tiny green leaf sprout on top of its head",
  2: "grown-up and confident, a little taller, with a small brown adventurer's satchel across its body",
  3: "elderly and wise, with tiny round glasses and a few pale whisker strands, standing calm and dignified",
  4: "mythic and radiant, with a small floating golden crown above its head and a few gentle golden sparkle pixels around it",
};

export class SpriteGenError extends Error {}

export interface SpriteEngines {
  openai: { apiKey: string; model: string };
  rd: { apiKey: string } | null;
  engine: "auto" | "openai" | "retro-diffusion";
  pixelPerfect: boolean;
}

/** The engine strips will actually use for this config. */
export function resolveEngine(engines: SpriteEngines): "retro-diffusion" | "openai" {
  if (engines.engine === "openai") return "openai";
  if (engines.rd) return "retro-diffusion";
  return "openai";
}

// --- OpenAI plumbing ---------------------------------------------------------

async function callImages(
  client: { apiKey: string },
  endpoint: "generations" | "edits",
  payload: Record<string, unknown> | FormData,
  signal?: AbortSignal,
): Promise<Buffer> {
  const isForm = payload instanceof FormData;
  const response = await fetch(`https://api.openai.com/v1/images/${endpoint}`, {
    method: "POST",
    headers: isForm
      ? { authorization: `Bearer ${client.apiKey}` }
      : { authorization: `Bearer ${client.apiKey}`, "content-type": "application/json" },
    body: isForm ? payload : JSON.stringify(payload),
    signal: signal
      ? AbortSignal.any([signal, AbortSignal.timeout(300_000)])
      : AbortSignal.timeout(300_000),
  });
  if (!response.ok) {
    const text = (await response.text()).slice(0, 300);
    throw new SpriteGenError(`images/${endpoint} ${response.status}: ${text}`);
  }
  const json = (await response.json()) as { data?: { b64_json?: string }[] };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new SpriteGenError(`images/${endpoint}: empty response`);
  return Buffer.from(b64, "base64");
}

const TRANSPARENT_UNSUPPORTED = /transparent background is not supported/i;

const MAGENTA_BG =
  "Background: every background pixel is flat solid magenta #FF00FF, completely uniform, edge to edge — the character is the only non-magenta content.";
const TRANSPARENT_BG = "fully transparent background";

/**
 * Alpha strategy per client, discovered at run time: try native transparency;
 * when the model rejects it (gpt-image-2), regenerate on flat magenta and
 * chroma-key it out.
 */
interface AlphaMode {
  transparent: boolean;
}

async function generateWithAlpha(
  client: { apiKey: string; model: string },
  mode: AlphaMode,
  endpoint: "generations" | "edits",
  build: (backgroundLine: string) => Record<string, unknown> | FormData,
  attachBackgroundParam: (payload: Record<string, unknown> | FormData) => void,
  signal?: AbortSignal,
): Promise<PNG> {
  if (mode.transparent) {
    try {
      const payload = build(TRANSPARENT_BG);
      attachBackgroundParam(payload);
      const buffer = await callImages(client, endpoint, payload, signal);
      return PNG.sync.read(buffer);
    } catch (error) {
      if (!(error instanceof SpriteGenError) || !TRANSPARENT_UNSUPPORTED.test(error.message)) {
        throw error;
      }
      mode.transparent = false; // fall through to magenta for this run
    }
  }
  const buffer = await callImages(client, endpoint, build(MAGENTA_BG), signal);
  return keyMagenta(PNG.sync.read(buffer));
}

// --- shared validators (unchanged behavior) ---------------------------------

function alphaAt(png: PNG, x: number, y: number): number {
  return png.data[(png.width * y + x) * 4 + 3]!;
}

function coverage(png: PNG, x0: number, y0: number, x1: number, y1: number): number {
  let opaque = 0;
  let total = 0;
  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      total++;
      if (alphaAt(png, x, y) > 32) opaque++;
    }
  }
  return total === 0 ? 0 : opaque / total;
}

function validateTransparent(png: PNG, label: string): void {
  const { width: w, height: h } = png;
  const corners = [
    coverage(png, 0, 0, Math.floor(w * 0.06), Math.floor(h * 0.09)),
    coverage(png, Math.floor(w * 0.94), 0, w, Math.floor(h * 0.09)),
    coverage(png, 0, Math.floor(h * 0.91), Math.floor(w * 0.06), h),
    coverage(png, Math.floor(w * 0.94), Math.floor(h * 0.91), w, h),
  ];
  if (Math.max(...corners) > 0.05) {
    throw new SpriteGenError(`${label}: background looks painted`);
  }
}

function validateStrip(png: PNG, frames: number, label: string): void {
  validateTransparent(png, label);
  const cellWidth = Math.floor(png.width / frames);
  for (let i = 0; i < frames; i++) {
    const c = coverage(png, i * cellWidth, 0, (i + 1) * cellWidth, png.height);
    if (c < 0.015) throw new SpriteGenError(`${label}: cell ${i + 1} looks empty`);
  }
}

/**
 * RD packs characters tightly into cells (feet at the bottom edge), so the
 * corner-transparency heuristic false-positives on wide characters. A truly
 * painted background instead shows up as a mostly-opaque image: measure the
 * overall opaque fraction, plus the per-cell emptiness check.
 */
function validateRdStrip(png: PNG, frames: number, label: string): void {
  let opaque = 0;
  let total = 0;
  for (let y = 0; y < png.height; y += 2) {
    for (let x = 0; x < png.width; x += 2) {
      total++;
      if (alphaAt(png, x, y) > 32) opaque++;
    }
  }
  if (total > 0 && opaque / total > 0.6) {
    throw new SpriteGenError(`${label}: background looks painted (${Math.round((opaque / total) * 100)}% opaque)`);
  }
  const cellWidth = Math.floor(png.width / frames);
  for (let i = 0; i < frames; i++) {
    const c = coverage(png, i * cellWidth, 0, (i + 1) * cellWidth, png.height);
    if (c < 0.015) throw new SpriteGenError(`${label}: cell ${i + 1} looks empty`);
  }
}

function floodDeglow(png: PNG): PNG {
  const { width: w, height: h, data } = png;
  const outside = new Uint8Array(w * h);
  const stack: number[] = [];
  const push = (x: number, y: number) => {
    const i = y * w + x;
    if (outside[i]) return;
    if (data[i * 4 + 3]! >= 250) return;
    outside[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length > 0) {
    const i = stack.pop()!;
    const x = i % w;
    const y = (i - x) / w;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
  for (let i = 0; i < w * h; i++) {
    const a = data[i * 4 + 3]!;
    if (outside[i]) data[i * 4 + 3] = 0;
    else if (a > 0 && a < 250) data[i * 4 + 3] = 255;
  }
  return png;
}

function cropVertical(png: PNG, pad = 12): PNG {
  let minY = png.height;
  let maxY = 0;
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x += 2) {
      if (alphaAt(png, x, y) > 32) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        break;
      }
    }
  }
  minY = Math.max(0, minY - pad);
  maxY = Math.min(png.height - 1, maxY + pad);
  const out = new PNG({ width: png.width, height: maxY - minY + 1 });
  PNG.bitblt(png, out, 0, minY, png.width, out.height, 0, 0);
  return out;
}

async function withRetry<T>(
  attempt: (round: number) => Promise<T>,
  signal?: AbortSignal,
): Promise<T> {
  let lastError: unknown;
  for (let round = 0; round < 3; round++) {
    if (signal?.aborted) throw new SpriteGenError("aborted");
    if (round > 0) await new Promise((resolve) => setTimeout(resolve, round * 3000));
    try {
      return await attempt(round);
    } catch (error) {
      if (signal?.aborted) throw new SpriteGenError("aborted");
      lastError = error;
    }
  }
  throw lastError;
}

function heroPrompt(description: string, backgroundLine: string): string {
  return `A single video game character sprite, centered, on a ${backgroundLine}.
Character: ${description}.
Style: ${STYLE}.
Front-facing, standing, friendly neutral expression, feet at the bottom.
Constraints: exactly one character, nothing else in the image, ${backgroundLine}, no glow, no aura, no vignette, no background lighting, no ground, no shadow, no text, no watermark, no border.`;
}

// --- public: drafts + evolve hero (OpenAI) ----------------------------------

/** One production-quality hero portrait (used by the starter regen script). */
export async function generateHero(
  engines: SpriteEngines,
  description: string,
  signal?: AbortSignal,
): Promise<Buffer> {
  const mode: AlphaMode = { transparent: true };
  const png = await withRetry(async () => {
    const result = await generateWithAlpha(
      engines.openai,
      mode,
      "generations",
      (backgroundLine) => ({
        model: engines.openai.model,
        prompt: heroPrompt(description, backgroundLine),
        size: "1024x1024",
        output_format: "png",
        quality: "high",
        n: 1,
      }),
      (payload) => {
        (payload as Record<string, unknown>).background = "transparent";
      },
      signal,
    );
    validateTransparent(result, "hero");
    return result;
  }, signal);
  return PNG.sync.write(png);
}

export async function generateHeroDrafts(
  engines: SpriteEngines,
  description: string,
  count: number,
  onProgress: (done: number, total: number) => void,
  signal?: AbortSignal,
): Promise<Buffer[]> {
  const mode: AlphaMode = { transparent: true };
  let done = 0;
  return Promise.all(
    Array.from({ length: count }, async (_, index) => {
      const png = await withRetry(async (round) => {
        const result = await generateWithAlpha(
          engines.openai,
          mode,
          "generations",
          (backgroundLine) => ({
            model: engines.openai.model,
            prompt:
              round === 0 && index % 2 === 0
                ? heroPrompt(description, backgroundLine)
                : `${heroPrompt(description, backgroundLine)}\nVariation ${index + 1}: give it a distinct personality.`,
            size: "1024x1024",
            output_format: "png",
            quality: "medium",
            n: 1,
          }),
          (payload) => {
            (payload as Record<string, unknown>).background = "transparent";
          },
          signal,
        );
        validateTransparent(result, "hero draft");
        return result;
      }, signal);
      onProgress(++done, count);
      return PNG.sync.write(png);
    }),
  );
}

export async function evolveHero(
  engines: SpriteEngines,
  hero: Buffer,
  description: string,
  modifier: string,
  signal?: AbortSignal,
): Promise<Buffer> {
  const mode: AlphaMode = { transparent: true };
  const png = await withRetry(async (round) => {
    const result = await generateWithAlpha(
      engines.openai,
      mode,
      "edits",
      (backgroundLine) => {
        const form = new FormData();
        form.append("model", engines.openai.model);
        form.append("image[]", new Blob([new Uint8Array(hero)], { type: "image/png" }), "hero.png");
        form.append(
          "prompt",
          `Redraw the exact same character from the input image, now ${modifier}.
Character: ${description}.
Same species, same face, same colors and palette. Style: ${STYLE}.
Single character centered on a ${backgroundLine}, no glow, no ground, no shadow, no text, no border.${round > 0 ? "\nIMPORTANT: follow the background instruction exactly." : ""}`,
        );
        form.append("size", "1024x1024");
        form.append("output_format", "png");
        form.append("quality", "high");
        return form;
      },
      (payload) => {
        (payload as FormData).append("background", "transparent");
      },
      signal,
    );
    validateTransparent(result, "evolved hero");
    return result;
  }, signal);
  return PNG.sync.write(png);
}

/**
 * A right-facing side-profile variant of the hero, cached by the caller.
 *
 * Retro Diffusion's rd_advanced_animation__* styles animate the input image AS
 * POSED — there is no direction parameter — so a front-facing hero comes back
 * marching at the viewer. Locomotion states (walk, run) feed this variant
 * instead; every other state keeps the front-facing hero.
 */
export async function generateSideHero(
  engines: SpriteEngines,
  hero: Buffer,
  signal?: AbortSignal,
): Promise<Buffer> {
  if (!engines.openai?.apiKey) throw new Error("Side-profile generation needs an OpenAI key.");
  const mode: AlphaMode = { transparent: true };
  const png = await withRetry(async (round) => {
    const result = await generateWithAlpha(
      engines.openai,
      mode,
      "edits",
      (backgroundLine) => {
        const form = new FormData();
        form.append("model", engines.openai.model);
        form.append("image[]", new Blob([new Uint8Array(hero)], { type: "image/png" }), "hero.png");
        form.append(
          "prompt",
          `Redraw this exact character in a full right-facing side profile view. Same character, same pixel-art style, same colors, same proportions. Standing neutral pose, facing right, feet on the ground, whole body visible.
Single character centered on a ${backgroundLine}, no glow, no ground, no shadow, no text, no border.${round > 0 ? "\nIMPORTANT: follow the background instruction exactly." : ""}`,
        );
        form.append("size", "1024x1024");
        form.append("output_format", "png");
        form.append("quality", "high");
        return form;
      },
      (payload) => {
        (payload as FormData).append("background", "transparent");
      },
      signal,
    );
    validateTransparent(result, "side hero");
    return result;
  }, signal);
  return PNG.sync.write(engines.pixelPerfect ? pixelateSingle(png, 64, 24).png : png);
}

/**
 * A targeted edit of an existing draft: one instruction, everything else held
 * fixed. Same machinery as the side-profile pass (transparent-first with the
 * magenta chroma-key fallback). The result stays full-resolution like any other
 * draft — quantization happens later, at commit time.
 */
export async function refineDraft(
  engines: SpriteEngines,
  draft: Buffer,
  instruction: string,
): Promise<Buffer> {
  if (!engines.openai?.apiKey) throw new Error("Refinement needs an OpenAI key.");
  const mode: AlphaMode = { transparent: true };
  const png = await withRetry(async (round) => {
    const result = await generateWithAlpha(
      engines.openai,
      mode,
      "edits",
      (backgroundLine) => {
        const form = new FormData();
        form.append("model", engines.openai.model);
        form.append(
          "image[]",
          new Blob([new Uint8Array(draft)], { type: "image/png" }),
          "draft.png",
        );
        form.append(
          "prompt",
          `Apply this change to the character, keeping everything else identical — same pose, same style, same proportions: ${instruction}.
Single character centered on a ${backgroundLine}, no glow, no ground, no shadow, no text, no border.${round > 0 ? "\nIMPORTANT: follow the background instruction exactly." : ""}`,
        );
        form.append("size", "1024x1024");
        form.append("output_format", "png");
        form.append("quality", "high");
        return form;
      },
      (payload) => {
        (payload as FormData).append("background", "transparent");
      },
    );
    validateTransparent(result, "refined draft");
    return result;
  });
  return PNG.sync.write(png);
}

// --- public: strips ----------------------------------------------------------

export interface GeneratedStrip {
  state: SpriteState;
  png: Buffer;
  width: number;
  height: number;
  frames: number;
  fps: number;
  loop: boolean;
}

export interface StripsResult {
  strips: GeneratedStrip[];
  atlas: SpriteAtlas;
  skipped: { state: SpriteState; reason: string }[];
}

export async function generateStrips(
  engines: SpriteEngines,
  hero: Buffer,
  onProgress: (done: number, total: number, state: SpriteState) => void,
  signal?: AbortSignal,
  states?: readonly SpriteState[],
  sideHero?: Buffer,
): Promise<StripsResult> {
  return resolveEngine(engines) === "retro-diffusion"
    ? rdGenerateStrips(engines.rd!, hero, onProgress, signal, states, sideHero)
    : gptGenerateStrips(engines, hero, onProgress, signal, states);
}

async function gptGenerateStrips(
  engines: SpriteEngines,
  hero: Buffer,
  onProgress: (done: number, total: number, state: SpriteState) => void,
  signal?: AbortSignal,
  states?: readonly SpriteState[],
): Promise<StripsResult> {
  const queue = [...(states ?? SPRITE_STATES)];
  const queueTotal = queue.length;
  const strips: GeneratedStrip[] = [];
  const skipped: { state: SpriteState; reason: string }[] = [];
  let done = 0;
  const heroBlob = new Blob([new Uint8Array(hero)], { type: "image/png" });
  const mode: AlphaMode = { transparent: true };

  const worker = async () => {
    while (queue.length > 0) {
      if (signal?.aborted) throw new SpriteGenError("aborted");
      const state = queue.shift()!;
      const spec = STATE_PROMPTS[state];
      let processed: PNG;
      try {
        processed = await withRetry(async (round) => {
          const png = await generateWithAlpha(
            engines.openai,
            mode,
            "edits",
            (backgroundLine) => {
              const form = new FormData();
              form.append("model", engines.openai.model);
              form.append("image[]", heroBlob, "hero.png");
              form.append(
                "prompt",
                `Using the character from the input image, create a 4-frame pixel-art animation strip of the exact same character.
Layout: one horizontal row of exactly 4 equal cells on the canvas — 4 evenly spaced copies of the character side by side, each centered in its quarter of the image width, all standing on the same baseline near the bottom. The character stays at the SAME horizontal position within each cell — animate in place, never move it across the canvas.
Animation across the 4 frames, left to right: ${spec.prompt}.
Character consistency: same species, same proportions, same colors and palette as the input image. Do not redesign the character.
Style: ${STYLE}.
Constraints: ${backgroundLine}, exactly 4 copies of the character and nothing else, no ground line, no shadows, no grid lines, no borders, no text, no watermark.${round > 0 ? "\nIMPORTANT: exactly 4 copies in one row, each centered in its own quarter; follow the background instruction exactly." : ""}`,
              );
              form.append("size", "1536x1024");
              form.append("output_format", "png");
              form.append("quality", "high");
              return form;
            },
            (payload) => {
              (payload as FormData).append("background", "transparent");
            },
            signal,
          );
          validateStrip(png, 4, state);
          return cropVertical(floodDeglow(png));
        }, signal);
      } catch (error) {
        // One strip losing all its retries must not sink the whole job — skip
        // it and let the caller report what is missing. Aborts still propagate.
        if (signal?.aborted || (error instanceof Error && error.message === "aborted")) throw error;
        skipped.push({
          state,
          reason: error instanceof Error ? error.message : String(error),
        });
        onProgress(++done, queueTotal, state);
        continue;
      }
      let outPng = processed;
      let width = processed.width;
      let height = processed.height;
      if (engines.pixelPerfect) {
        const pixel = pixelateStrip(processed, 4, 64, 24);
        outPng = pixel.png;
        width = pixel.width;
        height = pixel.height;
      }
      strips.push({
        state,
        png: PNG.sync.write(outPng),
        width,
        height,
        frames: 4,
        fps: spec.fps,
        loop: spec.loop,
      });
      onProgress(++done, queueTotal, state);
    }
  };

  await Promise.all(Array.from({ length: 3 }, worker));
  if (strips.length === 0) {
    throw new SpriteGenError(`every strip failed — first error: ${skipped[0]?.reason ?? "unknown"}`);
  }
  return { strips, atlas: atlasFromStrips(strips), skipped };
}

// --- Retro Diffusion ---------------------------------------------------------

const RD_FRAME = 64;

/** Pad/crop a quantized hero onto a square RD input frame, bottom-centered. */
function toRdFrame(png: PNG): PNG {
  const out = new PNG({ width: RD_FRAME, height: RD_FRAME });
  const x = Math.round((RD_FRAME - png.width) / 2);
  const y = RD_FRAME - png.height;
  const sx = Math.max(0, -x);
  const sy = Math.max(0, -y);
  const w = Math.min(png.width - sx, RD_FRAME);
  const h = Math.min(png.height - sy, RD_FRAME);
  PNG.bitblt(png, out, sx, sy, w, h, Math.max(0, x), Math.max(0, y));
  return out;
}

async function callRd(
  apiKey: string,
  body: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<PNG> {
  const response = await fetch("https://api.retrodiffusion.ai/v1/inferences", {
    method: "POST",
    headers: { "X-RD-Token": apiKey, "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: signal
      ? AbortSignal.any([signal, AbortSignal.timeout(180_000)])
      : AbortSignal.timeout(180_000),
  });
  if (!response.ok) {
    const text = (await response.text()).slice(0, 300);
    throw new SpriteGenError(`retro-diffusion ${response.status}: ${text}`);
  }
  const json = (await response.json()) as { base64_images?: string[] };
  const b64 = json.base64_images?.[0];
  if (!b64) throw new SpriteGenError("retro-diffusion: empty response");
  return PNG.sync.read(Buffer.from(b64, "base64"));
}

/** RD returns a spritesheet grid; normalize to one horizontal row. */
function sheetToStrip(sheet: PNG, frameW: number, frameH: number): PNG {
  const cols = Math.max(1, Math.floor(sheet.width / frameW));
  const rows = Math.max(1, Math.floor(sheet.height / frameH));
  const frames = cols * rows;
  const out = new PNG({ width: frameW * frames, height: frameH });
  for (let i = 0; i < frames; i++) {
    const sx = (i % cols) * frameW;
    const sy = Math.floor(i / cols) * frameH;
    PNG.bitblt(sheet, out, sx, sy, frameW, frameH, i * frameW, 0);
  }
  return out;
}

async function rdGenerateStrips(
  rd: { apiKey: string },
  hero: Buffer,
  onProgress: (done: number, total: number, state: SpriteState) => void,
  signal?: AbortSignal,
  states?: readonly SpriteState[],
  sideHero?: Buffer,
): Promise<StripsResult> {
  // RD needs native-res pixel-art input (32–256px) — quantize the hero down.
  const toInputB64 = (source: Buffer): string =>
    PNG.sync.write(toRdFrame(pixelateSingle(PNG.sync.read(source), 56, 24).png)).toString("base64");
  const heroB64 = toInputB64(hero);
  // RD animates the input AS POSED, so locomotion needs a side-profile input;
  // everything else keeps the front-facing hero.
  const LOCOMOTION: readonly SpriteState[] = ["walk", "run"];
  const sideHeroB64 = sideHero ? toInputB64(sideHero) : heroB64;
  const queue = [...(states ?? SPRITE_STATES)];
  const queueTotal = queue.length;
  const strips: GeneratedStrip[] = [];
  const skipped: { state: SpriteState; reason: string }[] = [];
  let done = 0;

  const worker = async () => {
    while (queue.length > 0) {
      if (signal?.aborted) throw new SpriteGenError("aborted");
      const state = queue.shift()!;
      const action = RD_ACTIONS[state];
      let strip: PNG;
      try {
        strip = await withRetry(async () => {
          const sheet = await callRd(
            rd.apiKey,
            {
              prompt: action.prompt,
              prompt_style: action.style,
              width: RD_FRAME,
              height: RD_FRAME,
              input_image: LOCOMOTION.includes(state) ? sideHeroB64 : heroB64,
              num_images: 1,
              frames_duration: action.frames,
              return_spritesheet: true,
            },
            signal,
          );
          // RD occasionally paints a solid background even for transparent
          // input (killed a live job: "idle: background looks painted").
          // RD sometimes emits stray pure-magenta transparency-marker pixels inside the
          // character; key exactly those (tight band, unlike gpt's loose backdrop key).
          const normalized = sheetToStrip(
            keyChromaMarker(keySolidBackground(sheet)),
            RD_FRAME,
            RD_FRAME,
          );
          const frames = Math.floor(normalized.width / RD_FRAME);
          validateRdStrip(normalized, frames, state);
          return normalized;
        }, signal);
      } catch (error) {
        // A strip that burns all its retries is skipped, not fatal — RD's
        // painted-background flake used to kill entire 9-strip jobs.
        if (signal?.aborted || (error instanceof Error && error.message === "aborted")) throw error;
        skipped.push({
          state,
          reason: error instanceof Error ? error.message : String(error),
        });
        onProgress(++done, queueTotal, state);
        continue;
      }
      strips.push({
        state,
        png: PNG.sync.write(strip),
        width: strip.width,
        height: strip.height,
        frames: Math.max(1, Math.floor(strip.width / RD_FRAME)),
        fps: action.fps,
        loop: STATE_PROMPTS[state].loop,
      });
      onProgress(++done, queueTotal, state);
    }
  };

  // Two at a time — RD is credit-metered and rate-limited more tightly.
  await Promise.all(Array.from({ length: 2 }, worker));
  if (strips.length === 0) {
    throw new SpriteGenError(`every strip failed — first error: ${skipped[0]?.reason ?? "unknown"}`);
  }
  return { strips, atlas: atlasFromStrips(strips), skipped };
}

function atlasFromStrips(strips: GeneratedStrip[]): SpriteAtlas {
  const states = {} as SpriteAtlas["states"];
  for (const strip of strips) {
    states[strip.state] = {
      frames: strip.frames,
      fps: strip.fps,
      loop: strip.loop,
      width: strip.width,
      height: strip.height,
      ...contentBoxOf(strip),
    };
  }
  return { version: 2, states };
}

/**
 * The character's own bounding box inside a single cell — the largest per-frame
 * box across the strip. The renderer needs this to size the character rather
 * than the (randomly padded) cell.
 */
function contentBoxOf(strip: GeneratedStrip): { contentWidth?: number; contentHeight?: number } {
  let png: PNG;
  try {
    png = PNG.sync.read(strip.png);
  } catch {
    return {};
  }
  const frames = Math.max(1, Math.floor(strip.frames));
  const cellW = png.width / frames;
  let bestW = 0;
  let bestH = 0;
  for (let f = 0; f < frames; f++) {
    const x0 = Math.floor(f * cellW);
    const x1 = Math.min(png.width, Math.floor((f + 1) * cellW));
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let y = 0; y < png.height; y++) {
      for (let x = x0; x < x1; x++) {
        if (alphaAt(png, x, y) <= 128) continue;
        const rel = x - f * cellW;
        if (rel < minX) minX = rel;
        if (rel > maxX) maxX = rel;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    if (maxX < minX) continue;
    bestW = Math.max(bestW, maxX - minX + 1);
    bestH = Math.max(bestH, maxY - minY + 1);
  }
  if (bestW <= 0 || bestH <= 0) return {};
  return {
    contentWidth: Math.max(1, Math.round(bestW)),
    contentHeight: Math.max(1, Math.round(bestH)),
  };
}
