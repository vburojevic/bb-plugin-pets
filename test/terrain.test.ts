// Composer terrain (overlay/terrain.ts): which composers count as a ledge.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ledgeBands } from "../overlay/terrain.ts";

const MAX = 270; // LEDGE_MAX in Overlay.tsx: GROUND_PX + 260
const rect = (top: number, bottom = top + 22) => ({ left: 300, right: 900, top, bottom });

describe("ledgeBands", () => {
  it("keeps a composer at the bottom of the window as a ledge, expanded to its card", () => {
    // Thread page, 640 px window: input top at 458 -> band top 448, 192 px up.
    assert.deepEqual(ledgeBands([rect(458)], 640, MAX), [{ left: 288, right: 912, top: 448 }]);
  });

  it("drops a composer entirely out of reach instead of clamping it", () => {
    // New-thread page: input top at 69 -> band top 59, 581 px up.
    assert.deepEqual(ledgeBands([rect(69)], 640, MAX), []);
  });

  it("keeps an input whose bottom is exactly at the limit and drops one a pixel above it", () => {
    assert.equal(ledgeBands([rect(300, 640 - MAX)], 640, MAX).length, 1);
    assert.equal(ledgeBands([rect(300, 640 - MAX - 1)], 640, MAX).length, 0);
  });

  it("keeps a bottom composer whose draft grew taller than the climb limit", () => {
    // Thread page, 640 px window: a long draft lifts the input top to 200 while
    // its bottom stays at 480. terrainAt clamps the height; the band must stay.
    assert.deepEqual(ledgeBands([rect(200, 480)], 640, MAX), [{ left: 288, right: 912, top: 190 }]);
  });

  it("filters per pane, so a high composer in one split pane leaves the other ledge alone", () => {
    const bands = ledgeBands([rect(69), { left: 950, right: 1400, top: 500, bottom: 522 }], 640, MAX);
    assert.deepEqual(bands, [{ left: 938, right: 1412, top: 490 }]);
  });
});
