// Sprite atlas contract (src/atlas.ts): pack tiers and fallback resolution.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ANIMATION_PACKS,
  isSpriteState,
  resolveState,
  SPRITE_STATES,
  STATE_FALLBACKS,
  statesForPack,
  fallbackAtlas,
  type SpriteState,
} from "../src/atlas.ts";

const present = (...states: string[]): Record<string, unknown> =>
  Object.fromEntries(states.map((s) => [s, {}]));

describe("ANIMATION_PACKS", () => {
  it("has the documented tier sizes", () => {
    assert.equal(ANIMATION_PACKS.essential.length, 9);
    assert.equal(ANIMATION_PACKS.expanded.length, 14);
    assert.equal(ANIMATION_PACKS.deluxe.length, 18);
    assert.equal(ANIMATION_PACKS.deluxe.length, SPRITE_STATES.length);
  });

  it("nests as ordered prefixes: essential ⊂ expanded ⊂ deluxe", () => {
    assert.deepEqual(
      ANIMATION_PACKS.expanded.slice(0, ANIMATION_PACKS.essential.length),
      [...ANIMATION_PACKS.essential],
    );
    assert.deepEqual(
      ANIMATION_PACKS.deluxe.slice(0, ANIMATION_PACKS.expanded.length),
      [...ANIMATION_PACKS.expanded],
    );
    for (const pack of Object.values(ANIMATION_PACKS)) {
      for (const state of pack) assert.ok(isSpriteState(state), `${state} is a real state`);
      assert.equal(new Set(pack).size, pack.length, "no duplicates within a pack");
    }
  });

  it("always starts at idle so every pack has the universal floor", () => {
    for (const pack of Object.values(ANIMATION_PACKS)) assert.equal(pack[0], "idle");
  });

  it("statesForPack maps known names and defaults unknown ones to expanded", () => {
    assert.equal(statesForPack("essential"), ANIMATION_PACKS.essential);
    assert.equal(statesForPack("deluxe"), ANIMATION_PACKS.deluxe);
    assert.equal(statesForPack("nonsense"), ANIMATION_PACKS.expanded);
    assert.equal(statesForPack(""), ANIMATION_PACKS.expanded);
  });
});

describe("STATE_FALLBACKS", () => {
  it("only references valid sprite states, on both sides", () => {
    for (const [state, chain] of Object.entries(STATE_FALLBACKS)) {
      assert.ok(isSpriteState(state), `key ${state} is a sprite state`);
      assert.ok(chain && chain.length > 0, `${state} has a non-empty chain`);
      for (const candidate of chain!) {
        assert.ok(isSpriteState(candidate), `${state} -> ${candidate} is a sprite state`);
        assert.notEqual(candidate, state, `${state} does not fall back to itself`);
      }
    }
  });

  it("covers every state outside the essential pack", () => {
    for (const state of SPRITE_STATES.slice(ANIMATION_PACKS.essential.length)) {
      assert.ok(STATE_FALLBACKS[state], `${state} needs a fallback for essential-pack pets`);
    }
  });

  it("every fallback target resolves inside the essential pack", () => {
    const essential = present(...ANIMATION_PACKS.essential);
    for (const state of SPRITE_STATES) {
      const resolved = resolveState(essential, state);
      assert.ok(
        (ANIMATION_PACKS.essential as readonly string[]).includes(resolved),
        `${state} -> ${resolved}`,
      );
    }
  });
});

describe("resolveState", () => {
  it("returns the desired state on a direct hit", () => {
    assert.equal(resolveState(present("idle", "walk", "dig"), "dig"), "dig");
    assert.equal(resolveState(present("walk"), "walk"), "walk");
  });

  it("follows the declared fallback chain (dig -> think)", () => {
    assert.equal(resolveState(present("idle", "think"), "dig"), "think");
    assert.equal(resolveState(present("idle", "walk"), "run"), "walk");
    assert.equal(resolveState(present("idle", "celebrate"), "dance"), "celebrate");
    assert.equal(resolveState(present("idle", "sad"), "grumpy"), "sad");
    assert.equal(resolveState(present("idle", "wave"), "point"), "wave");
  });

  it("falls through to idle when neither the state nor its chain exists", () => {
    assert.equal(resolveState(present("idle", "walk"), "dig"), "idle");
    // `walk` has no fallback entry at all — straight to the idle floor.
    assert.equal(resolveState(present("idle", "think"), "walk"), "idle");
  });

  it("uses the first available key as a last resort when idle is missing", () => {
    assert.equal(resolveState(present("dance", "sleep"), "walk"), "dance");
    // Chain still wins over the first-key resort.
    assert.equal(resolveState(present("dance", "think"), "dig"), "think");
  });

  it("returns idle for a completely empty state map", () => {
    assert.equal(resolveState({}, "walk" as SpriteState), "idle");
  });
});

describe("fallbackAtlas", () => {
  it("covers exactly the essential pack with looping 4-frame specs", () => {
    const atlas = fallbackAtlas();
    assert.equal(atlas.version, 2);
    assert.deepEqual(Object.keys(atlas.states), [...ANIMATION_PACKS.essential]);
    for (const spec of Object.values(atlas.states)) {
      assert.equal(spec.frames, 4);
      assert.equal(spec.loop, true);
    }
  });
});
