// Shared renderer core for the two surfaces that draw the pet: the floating
// overlay (Overlay.tsx) and the in-panel habitat (Habitat.tsx).
//
// Both surfaces run the same sprite contract — same play modes, same frame
// stepping, same idle-anchored character sizing, same emotion vocabulary — but
// used to carry hand-synced copies of it, so every renderer fix had to be
// applied twice. Everything in here is the byte-identical part; the parts that
// legitimately differ per surface (directors, physics tuning, terrain, sound
// wiring) stay in their own files.
import { resolveState, type AtlasStateSpec, type SpriteState } from "../src/atlas.ts";

/** Transition poses must not restart: sleep plays once then loops only its tail
 *  (the breathing lives there); sit plays once and holds its final frame. */
export const PLAY_MODES: Partial<
  Record<SpriteState, { mode: "holdLast" } | { mode: "tailLoop"; tailFraction: number }>
> = {
  sleep: { mode: "tailLoop", tailFraction: 0.5 },
  sit: { mode: "holdLast" },
};

/**
 * The shared frame-index contract. `raw` is the already-incremented monotonic
 * frame counter since the current state began; `renderedState` is the RESOLVED
 * state actually being drawn, so a fallback pose obeys the play mode of the
 * state it stands in for.
 */
export function nextFrame(
  raw: number,
  spec: { frames: number; loop: boolean },
  renderedState: SpriteState,
): number {
  const pm = PLAY_MODES[renderedState];
  if (!pm || raw < spec.frames) {
    return pm && raw < spec.frames
      ? raw
      : spec.loop
        ? raw % spec.frames
        : Math.min(raw, spec.frames - 1);
  }
  if (pm.mode === "holdLast") return spec.frames - 1;
  const tailLen = Math.max(1, Math.round(spec.frames * pm.tailFraction));
  const tailStart = spec.frames - tailLen;
  return tailStart + ((raw - spec.frames) % tailLen);
}

/** Plain-language read-out of the current sprite state (opt-in setting). */
export const EMOTION_LABELS: Record<SpriteState, string> = {
  idle: "😌 content",
  walk: "🚶 wandering",
  run: "🏃 hustling",
  think: "🤔 thinking",
  waiting: "⏳ waiting on you",
  celebrate: "🎉 celebrating",
  sad: "😞 down",
  grumpy: "😾 grumpy",
  sleep: "💤 asleep",
  wave: "👋 hello",
  point: "👉 look",
  love: "❤️ loved",
  dig: "⛏️ working",
  jump: "⬆️ boing",
  startled: "😳 startled",
  sit: "🪑 perched",
  stretch: "🙆 stretching",
  dance: "🕺 dancing",
};

/** Just the shape of a pet atlas this module needs — structurally satisfied by
 *  both `SpriteAtlas` and the rpc-derived atlas view. */
export interface AtlasLike {
  states: Record<string, AtlasStateSpec>;
}

/**
 * Character-normalized display size for one tick.
 *
 * Normalized ONCE, against the IDLE pose: one uniform pixel scale per pet.
 * Measuring the CURRENT pose instead inflated naturally short poses (sleeping,
 * sitting, digging) back up to standing height, so the pet visibly
 * ballooned/shrank whenever a reaction changed state. Anchored to idle, poses
 * differ in height because the POSE differs.
 */
export function charGeometry(
  atlas: AtlasLike,
  spec: AtlasStateSpec,
  srcCellW: number,
  charTarget: number,
): { width: number; height: number } {
  const idleSpec = atlas.states[resolveState(atlas.states, "idle")] ?? spec;
  const refContentH = Math.max(1, idleSpec.contentHeight ?? idleSpec.height);
  const pixelScale = charTarget / refContentH;
  return { width: srcCellW * pixelScale, height: spec.height * pixelScale };
}

export const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
