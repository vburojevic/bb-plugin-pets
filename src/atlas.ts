// Sprite atlas contract — shared by server (generation/validation) and app
// (rendering). Pure data, importable from both bundles.
//
// v2: one horizontal 4-frame strip PNG per state (generated independently,
// validated independently, bottom-aligned by the renderer), instead of a
// single grid sheet — image models miscount 32-cell grids but handle one
// row of 4 reliably.

/** Animation states, each backed by its own strip. */
export const SPRITE_STATES = [
  "idle",
  "walk",
  "think",
  "waiting",
  "celebrate",
  "sad",
  "sleep",
  "wave",
  "point",
  "love",
  "dig",
  "run",
  "jump",
  "startled",
  "sit",
  "stretch",
  "dance",
  "grumpy",
] as const;

export type SpriteState = (typeof SPRITE_STATES)[number];

/** Tiered animation packs — how many states a pet's artwork covers. */
export type AnimationPack = "essential" | "expanded" | "deluxe";

export const ANIMATION_PACKS: Record<AnimationPack, readonly SpriteState[]> = {
  essential: SPRITE_STATES.slice(0, 9),
  expanded: SPRITE_STATES.slice(0, 14),
  deluxe: SPRITE_STATES.slice(0, 18),
};

export function statesForPack(pack: string): readonly SpriteState[] {
  return ANIMATION_PACKS[pack as AnimationPack] ?? ANIMATION_PACKS.expanded;
}

/**
 * What to play when a state was never generated (pet on a smaller pack, or
 * older artwork). First present entry wins; "idle" is the universal floor.
 */
export const STATE_FALLBACKS: Partial<Record<SpriteState, readonly SpriteState[]>> = {
  point: ["wave"],
  love: ["celebrate"],
  dig: ["think"],
  run: ["walk"],
  jump: ["celebrate"],
  startled: ["sad"],
  sit: ["idle"],
  stretch: ["wave"],
  dance: ["celebrate"],
  grumpy: ["sad"],
};

export function resolveState(states: Record<string, unknown>, desired: SpriteState): SpriteState {
  if (desired in states) return desired;
  for (const candidate of STATE_FALLBACKS[desired] ?? []) {
    if (candidate in states) return candidate;
  }
  if ("idle" in states) return "idle";
  const first = Object.keys(states)[0] as SpriteState | undefined;
  return first ?? "idle";
}

export interface AtlasStateSpec {
  frames: number;
  fps: number;
  loop: boolean;
  /** Strip pixel size (all frames side by side, already cropped). */
  width: number;
  height: number;
  /** Character bbox within one cell (max across frames), when known. */
  contentWidth?: number;
  contentHeight?: number;
}

export interface SpriteAtlas {
  version: 2;
  states: Record<SpriteState, AtlasStateSpec>;
}

export function isSpriteState(value: string): value is SpriteState {
  return (SPRITE_STATES as readonly string[]).includes(value);
}

/** Placeholder atlas for pets whose artwork is missing on disk. */
export function fallbackAtlas(): SpriteAtlas {
  const states = {} as Record<SpriteState, AtlasStateSpec>;
  for (const state of ANIMATION_PACKS.essential) {
    states[state] = { frames: 4, fps: 4, loop: true, width: 1536, height: 512 };
  }
  return { version: 2, states };
}
