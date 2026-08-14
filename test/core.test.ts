// Shared renderer core (overlay/core.ts): frame stepping and idle-anchored
// character geometry.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SPRITE_STATES, type AtlasStateSpec } from "../src/atlas.ts";
import { charGeometry, nextFrame, EMOTION_LABELS, PLAY_MODES } from "../overlay/core.ts";

const spec = (frames: number, loop: boolean) => ({ frames, loop });

describe("nextFrame — plain states", () => {
  it("wraps a looping state (raw 5, frames 4 -> 1)", () => {
    assert.equal(nextFrame(5, spec(4, true), "walk"), 1);
    assert.equal(nextFrame(0, spec(4, true), "walk"), 0);
    assert.equal(nextFrame(3, spec(4, true), "walk"), 3);
    assert.equal(nextFrame(4, spec(4, true), "walk"), 0);
    assert.equal(nextFrame(9, spec(4, true), "walk"), 1);
  });

  it("clamps a non-looping, non-mode state at the last frame", () => {
    assert.equal(nextFrame(2, spec(4, false), "celebrate"), 2);
    assert.equal(nextFrame(3, spec(4, false), "celebrate"), 3);
    assert.equal(nextFrame(4, spec(4, false), "celebrate"), 3);
    assert.equal(nextFrame(100, spec(4, false), "celebrate"), 3);
  });
});

describe("nextFrame — sleep (tailLoop)", () => {
  it("plays 0..n-1 once, then loops the last half (frames = 8)", () => {
    const s = spec(8, true);
    for (let raw = 0; raw <= 7; raw++) {
      assert.equal(nextFrame(raw, s, "sleep"), raw, `raw ${raw} plays through`);
    }
    assert.equal(nextFrame(8, s, "sleep"), 4);
    assert.equal(nextFrame(9, s, "sleep"), 5);
    assert.equal(nextFrame(10, s, "sleep"), 6);
    assert.equal(nextFrame(11, s, "sleep"), 7);
    assert.equal(nextFrame(12, s, "sleep"), 4);
  });

  it("never replays the lie-down frames after the first pass", () => {
    const s = spec(8, true);
    for (let raw = 8; raw < 200; raw++) {
      assert.ok(nextFrame(raw, s, "sleep") >= 4, `raw ${raw} stays in the tail`);
    }
  });

  it("tail is at least one frame even for a tiny strip", () => {
    const s = spec(1, true);
    assert.equal(nextFrame(0, s, "sleep"), 0);
    assert.equal(nextFrame(5, s, "sleep"), 0);
    // frames = 3 -> tailLen = round(1.5) = 2, tailStart = 1
    assert.equal(nextFrame(3, spec(3, true), "sleep"), 1);
    assert.equal(nextFrame(4, spec(3, true), "sleep"), 2);
    assert.equal(nextFrame(5, spec(3, true), "sleep"), 1);
  });

  it("ignores spec.loop — the mode decides", () => {
    assert.equal(nextFrame(8, spec(8, false), "sleep"), 4);
  });
});

describe("nextFrame — sit (holdLast)", () => {
  it("plays once then holds the final frame", () => {
    const s = spec(4, true);
    assert.deepEqual([0, 1, 2, 3].map((r) => nextFrame(r, s, "sit")), [0, 1, 2, 3]);
    assert.equal(nextFrame(4, s, "sit"), 3);
    assert.equal(nextFrame(50, s, "sit"), 3);
  });
});

describe("nextFrame — fallback poses obey the RENDERED state's mode", () => {
  it("a sit request rendered as idle loops instead of holding", () => {
    // sit -> idle via STATE_FALLBACKS; the caller passes the rendered name.
    assert.equal(nextFrame(5, spec(4, true), "idle"), 1);
    assert.notEqual(nextFrame(5, spec(4, true), "idle"), nextFrame(5, spec(4, true), "sit"));
    assert.equal(nextFrame(5, spec(4, true), "sit"), 3);
  });

  it("a state rendered AS sleep tail-loops even though it isn't sleep itself", () => {
    assert.equal(nextFrame(8, spec(8, true), "sleep"), 4);
    assert.equal(nextFrame(8, spec(8, true), "walk"), 0);
  });

  it("only sleep and sit carry play modes", () => {
    assert.deepEqual(Object.keys(PLAY_MODES).sort(), ["sit", "sleep"]);
  });
});

describe("charGeometry — idle-anchored scaling", () => {
  const s = (height: number, contentHeight?: number): AtlasStateSpec => ({
    frames: 4,
    fps: 4,
    loop: true,
    width: height * 4,
    height,
    contentHeight,
  });

  it("derives one pixel scale from idle's contentHeight, whatever the current pose", () => {
    const atlas = {
      states: {
        idle: s(64, 40),
        sleep: s(64, 18),
        stretch: s(64, 60),
      },
    };
    const target = 80; // 80 / 40 = 2x
    const forIdle = charGeometry(atlas, atlas.states.idle, 64, target);
    const forSleep = charGeometry(atlas, atlas.states.sleep, 64, target);
    const forStretch = charGeometry(atlas, atlas.states.stretch, 64, target);
    assert.deepEqual(forIdle, { width: 128, height: 128 });
    assert.deepEqual(forSleep, forIdle, "short pose must not balloon back to idle height");
    assert.deepEqual(forStretch, forIdle, "tall pose must not shrink");
  });

  it("scales height with the CURRENT spec height and width with the source cell", () => {
    const atlas = { states: { idle: s(64, 32) } };
    const short = { ...s(48, 10) };
    // scale = 96 / 32 = 3
    assert.deepEqual(charGeometry(atlas, short, 20, 96), { width: 60, height: 144 });
  });

  it("falls back to the strip height when idle has no contentHeight", () => {
    const atlas = { states: { idle: s(50) } };
    assert.deepEqual(charGeometry(atlas, atlas.states.idle, 10, 100), { width: 20, height: 100 });
  });

  it("anchors on the resolved first state when idle is missing entirely", () => {
    const atlas = { states: { walk: s(64, 50), sleep: s(64, 10) } };
    // resolveState falls through to the first key (walk) -> scale = 100/50 = 2
    assert.deepEqual(charGeometry(atlas, atlas.states.sleep, 30, 100), { width: 60, height: 128 });
  });

  it("falls back to the passed spec when the atlas has no states at all", () => {
    const only = s(40, 20);
    assert.deepEqual(charGeometry({ states: {} }, only, 10, 60), { width: 30, height: 120 });
  });

  it("never divides by zero for a degenerate contentHeight", () => {
    const atlas = { states: { idle: s(64, 0) } };
    const geom = charGeometry(atlas, atlas.states.idle, 16, 48);
    assert.ok(Number.isFinite(geom.width) && Number.isFinite(geom.height));
    assert.deepEqual(geom, { width: 16 * 48, height: 64 * 48 });
  });
});

describe("EMOTION_LABELS", () => {
  it("labels every sprite state exactly once", () => {
    assert.deepEqual(Object.keys(EMOTION_LABELS).sort(), [...SPRITE_STATES].sort());
    assert.equal(new Set(Object.values(EMOTION_LABELS)).size, SPRITE_STATES.length);
  });
});
