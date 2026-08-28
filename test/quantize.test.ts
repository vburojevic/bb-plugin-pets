// Pixel post-processing pipeline (src/quantize.ts). Fixtures are tiny PNGs
// built programmatically with pngjs — no binary assets in the repo.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PNG } from "pngjs";
import {
  keyChromaMarker,
  keySolidBackground,
  keySolidBackgroundCells,
  nearestResize,
  quantizePalette,
} from "../src/quantize.ts";

type RGBA = [number, number, number, number];

function makePng(width: number, height: number, fill: RGBA): PNG {
  const png = new PNG({ width, height });
  for (let p = 0; p < width * height; p++) {
    png.data[p * 4] = fill[0];
    png.data[p * 4 + 1] = fill[1];
    png.data[p * 4 + 2] = fill[2];
    png.data[p * 4 + 3] = fill[3];
  }
  return png;
}

function setPx(png: PNG, x: number, y: number, rgba: RGBA): void {
  const i = (png.width * y + x) * 4;
  png.data[i] = rgba[0];
  png.data[i + 1] = rgba[1];
  png.data[i + 2] = rgba[2];
  png.data[i + 3] = rgba[3];
}

function getPx(png: PNG, x: number, y: number): RGBA {
  const i = (png.width * y + x) * 4;
  return [png.data[i]!, png.data[i + 1]!, png.data[i + 2]!, png.data[i + 3]!];
}

function alphaAt(png: PNG, x: number, y: number): number {
  return png.data[(png.width * y + x) * 4 + 3]!;
}

function fillRect(png: PNG, x0: number, y0: number, x1: number, y1: number, rgba: RGBA): void {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) setPx(png, x, y, rgba);
}

function distinctColors(png: PNG): Set<string> {
  const seen = new Set<string>();
  for (let p = 0; p < png.width * png.height; p++) {
    if (png.data[p * 4 + 3]! === 0) continue;
    seen.add(`${png.data[p * 4]},${png.data[p * 4 + 1]},${png.data[p * 4 + 2]}`);
  }
  return seen;
}

describe("keyChromaMarker", () => {
  it("clears exact FF00FF transparency markers", () => {
    const png = makePng(2, 1, [255, 0, 255, 255]);
    keyChromaMarker(png);
    assert.equal(alphaAt(png, 0, 0), 0);
    assert.equal(alphaAt(png, 1, 0), 0);
  });

  it("clears near-magenta compression fringe inside the tight band", () => {
    const png = makePng(3, 1, [0, 0, 0, 255]);
    setPx(png, 0, 0, [240, 20, 240, 255]); // exactly on the band edges
    setPx(png, 1, 0, [250, 5, 255, 255]);
    setPx(png, 2, 0, [255, 0, 244, 255]);
    keyChromaMarker(png);
    assert.equal(alphaAt(png, 0, 0), 0);
    assert.equal(alphaAt(png, 1, 0), 0);
    assert.equal(alphaAt(png, 2, 0), 0);
  });

  it("spares legitimate pinks/purples such as rgb(200,80,200)", () => {
    const png = makePng(4, 1, [0, 0, 0, 255]);
    setPx(png, 0, 0, [200, 80, 200, 255]);
    setPx(png, 1, 0, [239, 0, 255, 255]); // r just below the band
    setPx(png, 2, 0, [255, 21, 255, 255]); // g just above the band
    setPx(png, 3, 0, [255, 0, 239, 255]); // b just below the band
    keyChromaMarker(png);
    for (let x = 0; x < 4; x++) assert.equal(alphaAt(png, x, 0), 255, `pixel ${x} should survive`);
  });

  it("leaves rgb bytes untouched — it only edits alpha", () => {
    const png = makePng(1, 1, [255, 0, 255, 255]);
    keyChromaMarker(png);
    assert.deepEqual(getPx(png, 0, 0), [255, 0, 255, 0]);
  });
});

describe("keySolidBackground", () => {
  const BG: RGBA = [200, 40, 200, 255];
  const CHAR: RGBA = [20, 180, 30, 255];

  /** 16x16: saturated background, a solid character block, and a 2x2 pocket of
   *  background colour fully enclosed by the character. */
  function sheet(bg: RGBA): PNG {
    const png = makePng(16, 16, bg);
    fillRect(png, 4, 4, 11, 11, CHAR);
    fillRect(png, 7, 7, 8, 8, bg); // enclosed pocket, unreachable from the border
    return png;
  }

  it("flood-clears the border-connected background and keeps the character", () => {
    const png = keySolidBackground(sheet(BG));
    assert.equal(alphaAt(png, 0, 0), 0);
    assert.equal(alphaAt(png, 15, 15), 0);
    assert.equal(alphaAt(png, 3, 8), 0);
    assert.equal(alphaAt(png, 4, 4), 255);
    assert.equal(alphaAt(png, 11, 11), 255);
    assert.deepEqual(getPx(png, 5, 5), CHAR);
  });

  it("second global pass kills an ENCLOSED same-colour pocket", () => {
    const png = keySolidBackground(sheet(BG));
    for (let y = 7; y <= 8; y++) {
      for (let x = 7; x <= 8; x++) {
        assert.equal(alphaAt(png, x, y), 0, `pocket pixel ${x},${y} should be cleared`);
      }
    }
  });

  it("skips the global pass for a grey background, leaving enclosed grey pockets", () => {
    const grey: RGBA = [128, 128, 128, 255];
    const png = keySolidBackground(sheet(grey));
    assert.equal(alphaAt(png, 0, 0), 0, "border grey is still flooded away");
    assert.equal(alphaAt(png, 3, 8), 0);
    for (let y = 7; y <= 8; y++) {
      for (let x = 7; x <= 8; x++) {
        assert.equal(alphaAt(png, x, y), 255, `grey pocket pixel ${x},${y} survives`);
      }
    }
    assert.equal(alphaAt(png, 4, 4), 255);
  });

  it("no-ops when the corners are already transparent", () => {
    const png = makePng(16, 16, [0, 0, 0, 0]);
    fillRect(png, 4, 4, 11, 11, CHAR);
    keySolidBackground(png);
    assert.equal(alphaAt(png, 5, 5), 255);
    assert.equal(alphaAt(png, 0, 0), 0);
  });

  it("no-ops when fewer than three corners agree on a colour", () => {
    const png = makePng(16, 16, BG);
    // Repaint three of the four sampled corners with mutually distant colours.
    setPx(png, 14, 1, [10, 10, 10, 255]);
    setPx(png, 1, 14, [250, 250, 10, 255]);
    setPx(png, 14, 14, [10, 250, 250, 255]);
    keySolidBackground(png);
    assert.equal(alphaAt(png, 8, 8), 255, "background survives untouched");
  });

  it("tolerates near-consensus corners within the agreement band", () => {
    const png = sheet(BG);
    setPx(png, 14, 1, [205, 45, 195, 255]); // L1 delta 15 < tolerance*2
    const out = keySolidBackground(png);
    assert.equal(alphaAt(out, 0, 0), 0);
    assert.equal(alphaAt(out, 5, 5), 255);
  });
});

describe("keySolidBackgroundCells", () => {
  const BG: RGBA = [233, 130, 217, 255];
  const CHAR: RGBA = [20, 180, 30, 255];

  it("cleans painted cells in a mixed strip whose whole-sheet corners disagree", () => {
    const png = makePng(32, 16, [0, 0, 0, 0]);
    fillRect(png, 4, 4, 11, 14, CHAR);
    fillRect(png, 16, 0, 31, 15, BG);
    fillRect(png, 20, 4, 27, 14, CHAR);

    keySolidBackground(png);
    assert.equal(alphaAt(png, 17, 1), 255, "whole-sheet consensus must not trigger");

    keySolidBackgroundCells(png, 16, 16);
    assert.equal(alphaAt(png, 17, 1), 0, "painted frame background is cleared");
    assert.deepEqual(getPx(png, 21, 5), CHAR, "character in the painted frame survives");
    assert.deepEqual(getPx(png, 5, 5), CHAR, "already-transparent frame survives");
  });

  it("leaves incomplete edge cells untouched", () => {
    const png = makePng(18, 16, BG);
    keySolidBackgroundCells(png, 16, 16);
    assert.equal(alphaAt(png, 1, 1), 0);
    assert.deepEqual(getPx(png, 17, 1), BG);
  });

  it("cleans a partially painted cell with two matching opaque edge corners", () => {
    const png = makePng(16, 16, [0, 0, 0, 0]);
    fillRect(png, 8, 0, 15, 15, BG);
    fillRect(png, 6, 4, 11, 14, CHAR);

    keySolidBackgroundCells(png, 16, 16);
    assert.equal(alphaAt(png, 14, 1), 0, "top-right paint is cleared");
    assert.equal(alphaAt(png, 14, 14), 0, "bottom-right paint is cleared");
    assert.deepEqual(getPx(png, 9, 5), CHAR, "character overlapping the painted area survives");
  });

  it("does not mistake two small same-colour corner accents for a backdrop", () => {
    const png = makePng(16, 16, [0, 0, 0, 0]);
    fillRect(png, 5, 4, 10, 13, CHAR);
    setPx(png, 14, 1, BG);
    setPx(png, 14, 14, BG);

    keySolidBackgroundCells(png, 16, 16);
    assert.deepEqual(getPx(png, 14, 1), BG);
    assert.deepEqual(getPx(png, 14, 14), BG);
    assert.deepEqual(getPx(png, 6, 5), CHAR);
  });
});

describe("nearestResize", () => {
  it("produces exactly the requested dimensions and buffer size", () => {
    const src = makePng(64, 16, [1, 2, 3, 255]);
    const out = nearestResize(src, 7, 3);
    assert.equal(out.width, 7);
    assert.equal(out.height, 3);
    assert.equal(out.data.length, 7 * 3 * 4);
  });

  it("samples pixel centres (4x4 -> 2x2 picks source columns/rows 1 and 3)", () => {
    const src = makePng(4, 4, [0, 0, 0, 255]);
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) setPx(src, x, y, [x * 10, y * 10, 7, 255]);
    const out = nearestResize(src, 2, 2);
    assert.deepEqual(getPx(out, 0, 0), [10, 10, 7, 255]);
    assert.deepEqual(getPx(out, 1, 0), [30, 10, 7, 255]);
    assert.deepEqual(getPx(out, 0, 1), [10, 30, 7, 255]);
    assert.deepEqual(getPx(out, 1, 1), [30, 30, 7, 255]);
  });

  it("upscaling repeats source pixels without blending", () => {
    const src = makePng(2, 1, [0, 0, 0, 255]);
    setPx(src, 0, 0, [10, 0, 0, 255]);
    setPx(src, 1, 0, [200, 0, 0, 255]);
    const out = nearestResize(src, 4, 1);
    assert.deepEqual(
      [getPx(out, 0, 0)[0], getPx(out, 1, 0)[0], getPx(out, 2, 0)[0], getPx(out, 3, 0)[0]],
      [10, 10, 200, 200],
    );
  });

  it("binarizes alpha at the 128 threshold", () => {
    const src = makePng(3, 1, [9, 9, 9, 255]);
    setPx(src, 0, 0, [9, 9, 9, 127]);
    setPx(src, 1, 0, [9, 9, 9, 128]);
    setPx(src, 2, 0, [9, 9, 9, 0]);
    const out = nearestResize(src, 3, 1);
    assert.equal(alphaAt(out, 0, 0), 0);
    assert.equal(alphaAt(out, 1, 0), 255);
    assert.equal(alphaAt(out, 2, 0), 0);
  });

  it("never samples out of bounds when the target is larger in one axis only", () => {
    const src = makePng(3, 5, [4, 5, 6, 255]);
    const out = nearestResize(src, 9, 2);
    assert.equal(out.width, 9);
    assert.equal(out.height, 2);
    for (let x = 0; x < 9; x++) assert.deepEqual(getPx(out, x, 0), [4, 5, 6, 255]);
  });
});

describe("quantizePalette", () => {
  it("emits at most the requested number of colours", () => {
    const png = makePng(8, 8, [0, 0, 0, 255]);
    for (let p = 0; p < 64; p++) {
      setPx(png, p % 8, Math.floor(p / 8), [(p * 4) % 256, (255 - p * 3) % 256, (p * 7) % 256, 255]);
    }
    assert.ok(distinctColors(png).size > 8, "fixture must start with more colours than the cap");
    quantizePalette(png, 8);
    assert.ok(distinctColors(png).size <= 8, `got ${distinctColors(png).size} colours`);
  });

  it("keeps an already-small palette exact when the cap is generous", () => {
    const png = makePng(4, 4, [10, 20, 30, 255]);
    fillRect(png, 0, 0, 3, 1, [200, 10, 10, 255]);
    fillRect(png, 0, 2, 3, 2, [10, 200, 10, 255]);
    quantizePalette(png, 24);
    assert.deepEqual(
      [...distinctColors(png)].sort(),
      ["10,20,30", "10,200,10", "200,10,10"].sort(),
    );
  });

  it("ignores transparent pixels and returns the same PNG instance", () => {
    const png = makePng(4, 4, [0, 0, 0, 0]);
    const out = quantizePalette(png, 4);
    assert.equal(out, png);
    assert.equal(distinctColors(png).size, 0);
  });

  it("quantizes only opaque pixels, leaving transparent rgb bytes alone", () => {
    const png = makePng(2, 1, [0, 0, 0, 0]);
    setPx(png, 0, 0, [123, 45, 67, 0]);
    setPx(png, 1, 0, [10, 20, 30, 255]);
    quantizePalette(png, 4);
    assert.deepEqual(getPx(png, 0, 0), [123, 45, 67, 0]);
    assert.deepEqual(getPx(png, 1, 0), [10, 20, 30, 255]);
  });
});
