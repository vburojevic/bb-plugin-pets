// Pixel-perfect post-processing — pure pngjs, no deps.
//
// General image models paint "pixel art" at 1024px: soft shading, a wobbly
// fake pixel grid, thousands of colors. This module snaps that output to the
// real thing: per-frame baseline alignment (kills inter-frame wobble),
// nearest-neighbor downscale to native sprite resolution, and median-cut
// palette quantization shared across a whole strip so every frame uses the
// same colors. Also: magenta chroma-keying for models that cannot output
// transparency (gpt-image-2 dropped `background: transparent`).
import { PNG } from "pngjs";

const ALPHA_SOLID = 128;

function alphaAt(png: PNG, x: number, y: number): number {
  return png.data[(png.width * y + x) * 4 + 3]!;
}

interface ContentBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
  /** Horizontal anchor: centroid of the bottom quarter of the content (the
   * feet) — stable when arms, tails, or props extend sideways, unlike the
   * bbox center. */
  anchorX: number;
}

function boxIn(png: PNG, x0: number, x1: number): ContentBox | null {
  let left = -1;
  let right = -1;
  let top = -1;
  let bottom = -1;
  for (let y = 0; y < png.height; y++) {
    for (let x = x0; x < x1; x++) {
      if (alphaAt(png, x, y) >= ALPHA_SOLID) {
        if (top === -1) top = y;
        bottom = y;
        if (left === -1 || x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (top === -1) return null;
  const feetTop = bottom - Math.max(1, Math.floor((bottom - top) * 0.25));
  let sum = 0;
  let count = 0;
  for (let y = feetTop; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (alphaAt(png, x, y) >= ALPHA_SOLID) {
        sum += x;
        count++;
      }
    }
  }
  const anchorX = count > 0 ? sum / count : (left + right) / 2;
  return { left, right, top, bottom, anchorX };
}

/**
 * Find each frame's content. Preferred: segment by empty column gaps (models
 * place copies unevenly, and a "walking" character often drifts across its
 * cell — fixed quarter slicing then cuts characters and shows fragments of
 * neighbours). Fallback when segmentation doesn't find exactly `frames`
 * clusters: fixed cells with per-cell bounds.
 */
function detectFrameBoxes(png: PNG, frames: number): ContentBox[] {
  const occupied: boolean[] = new Array(png.width).fill(false);
  for (let x = 0; x < png.width; x++) {
    for (let y = 0; y < png.height; y += 2) {
      if (alphaAt(png, x, y) >= ALPHA_SOLID) {
        occupied[x] = true;
        break;
      }
    }
  }
  // Runs of occupied columns, merging gaps smaller than ~1.5% of width.
  const minGap = Math.max(3, Math.floor(png.width * 0.015));
  const runs: { start: number; end: number }[] = [];
  let runStart = -1;
  let gap = 0;
  for (let x = 0; x < png.width; x++) {
    if (occupied[x]) {
      if (runStart === -1) runStart = x;
      gap = 0;
    } else if (runStart !== -1) {
      gap++;
      if (gap >= minGap) {
        runs.push({ start: runStart, end: x - gap });
        runStart = -1;
        gap = 0;
      }
    }
  }
  if (runStart !== -1) runs.push({ start: runStart, end: png.width - 1 });

  // Merge the closest neighbours until we are down to `frames` clusters
  // (sparkles/confetti can split a frame into more than one run).
  while (runs.length > frames) {
    let best = 0;
    let bestGap = Number.POSITIVE_INFINITY;
    for (let i = 0; i < runs.length - 1; i++) {
      const g = runs[i + 1]!.start - runs[i]!.end;
      if (g < bestGap) {
        bestGap = g;
        best = i;
      }
    }
    runs[best] = { start: runs[best]!.start, end: runs[best + 1]!.end };
    runs.splice(best + 1, 1);
  }

  // Touching characters (a trailing tail overlapping the neighbour) leave us
  // with fewer runs than frames. Split the widest runs at their thinnest
  // column — never fall back to fixed slicing, which is what smears a tail
  // from one frame onto the opposite edge of the next.
  if (runs.length > 0 && runs.length < frames) {
    const columnWeight = (x: number): number => {
      let weight = 0;
      for (let y = 0; y < png.height; y++) {
        if (alphaAt(png, x, y) >= ALPHA_SOLID) weight++;
      }
      return weight;
    };
    while (runs.length < frames) {
      let widest = 0;
      for (let i = 1; i < runs.length; i++) {
        if (runs[i]!.end - runs[i]!.start > runs[widest]!.end - runs[widest]!.start) widest = i;
      }
      const run = runs[widest]!;
      const span = run.end - run.start;
      if (span < 8) break; // nothing sensible left to split
      // Search the middle 70% of the run for the least-occupied column.
      let cut = -1;
      let cutWeight = Number.POSITIVE_INFINITY;
      const from = run.start + Math.floor(span * 0.15);
      const to = run.end - Math.floor(span * 0.15);
      for (let x = from; x <= to; x++) {
        const w = columnWeight(x);
        if (w < cutWeight) {
          cutWeight = w;
          cut = x;
        }
      }
      if (cut <= run.start || cut >= run.end) break;
      runs.splice(widest, 1, { start: run.start, end: cut }, { start: cut + 1, end: run.end });
    }
  }

  if (runs.length === frames) {
    const boxes = runs.map((run) => boxIn(png, run.start, run.end + 1));
    if (boxes.every(Boolean)) return boxes as ContentBox[];
  }
  // Last resort: fixed slicing.
  const cellW = Math.floor(png.width / frames);
  return Array.from({ length: frames }, (_, i) => {
    const box = boxIn(png, i * cellW, (i + 1) * cellW);
    return (
      box ?? {
        left: i * cellW,
        right: (i + 1) * cellW - 1,
        top: 0,
        bottom: png.height - 1,
        anchorX: i * cellW + cellW / 2,
      }
    );
  });
}

/**
 * Rebuild a strip as uniform cells with every frame re-anchored: feet
 * centered horizontally, bottoms on one shared baseline. This is what makes
 * model-generated walk cycles loop cleanly — the model animates the
 * character travelling across the canvas, and without re-anchoring the loop
 * snaps it back to the far side.
 */
export function normalizeFrames(png: PNG, frames: number): PNG {
  const boxes = detectFrameBoxes(png, frames);
  const maxW = Math.max(...boxes.map((b) => b.right - b.left + 1));
  const maxH = Math.max(...boxes.map((b) => b.bottom - b.top + 1));
  const cellW = Math.ceil(maxW * 1.18);
  const cellH = Math.ceil(maxH * 1.06) + 2;
  const out = new PNG({ width: cellW * frames, height: cellH });
  boxes.forEach((box, i) => {
    const w = box.right - box.left + 1;
    const h = box.bottom - box.top + 1;
    // Place so the feet anchor lands at the cell center, clamped inside.
    const anchorOffset = box.anchorX - box.left;
    let dx = Math.round(i * cellW + cellW / 2 - anchorOffset);
    dx = Math.max(i * cellW, Math.min(dx, (i + 1) * cellW - w));
    const dy = cellH - 2 - h;
    PNG.bitblt(png, out, box.left, box.top, w, h, dx, Math.max(0, dy));
  });
  return out;
}

/** Nearest-neighbor resample (samples pixel centers). */
export function nearestResize(png: PNG, width: number, height: number): PNG {
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    const sy = Math.min(png.height - 1, Math.floor(((y + 0.5) / height) * png.height));
    for (let x = 0; x < width; x++) {
      const sx = Math.min(png.width - 1, Math.floor(((x + 0.5) / width) * png.width));
      const si = (png.width * sy + sx) * 4;
      const di = (width * y + x) * 4;
      out.data[di] = png.data[si]!;
      out.data[di + 1] = png.data[si + 1]!;
      out.data[di + 2] = png.data[si + 2]!;
      out.data[di + 3] = png.data[si + 3]! >= ALPHA_SOLID ? 255 : 0;
    }
  }
  return out;
}

interface Box {
  pixels: number[]; // indices into data/4
  ranges: [number, number, number]; // r,g,b spread
}

function boxRanges(png: PNG, pixels: number[]): [number, number, number] {
  let minR = 255;
  let maxR = 0;
  let minG = 255;
  let maxG = 0;
  let minB = 255;
  let maxB = 0;
  for (const p of pixels) {
    const i = p * 4;
    const r = png.data[i]!;
    const g = png.data[i + 1]!;
    const b = png.data[i + 2]!;
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    if (g < minG) minG = g;
    if (g > maxG) maxG = g;
    if (b < minB) minB = b;
    if (b > maxB) maxB = b;
  }
  return [maxR - minR, maxG - minG, maxB - minB];
}

/**
 * Median-cut palette over all opaque pixels, then snap every opaque pixel to
 * its nearest palette entry. Alpha is binary already (nearestResize).
 */
export function quantizePalette(png: PNG, maxColors = 24): PNG {
  const opaque: number[] = [];
  for (let p = 0; p < png.width * png.height; p++) {
    if (png.data[p * 4 + 3]! > 0) opaque.push(p);
  }
  if (opaque.length === 0) return png;

  let boxes: Box[] = [{ pixels: opaque, ranges: boxRanges(png, opaque) }];
  while (boxes.length < maxColors) {
    // split the box with the largest channel spread
    let bestIndex = -1;
    let bestSpread = 0;
    for (let i = 0; i < boxes.length; i++) {
      const spread = Math.max(...boxes[i]!.ranges);
      if (spread > bestSpread && boxes[i]!.pixels.length > 1) {
        bestSpread = spread;
        bestIndex = i;
      }
    }
    if (bestIndex === -1 || bestSpread === 0) break;
    const box = boxes[bestIndex]!;
    const channel = box.ranges.indexOf(Math.max(...box.ranges));
    box.pixels.sort((a, b) => png.data[a * 4 + channel]! - png.data[b * 4 + channel]!);
    const mid = Math.floor(box.pixels.length / 2);
    const left = box.pixels.slice(0, mid);
    const right = box.pixels.slice(mid);
    boxes.splice(
      bestIndex,
      1,
      { pixels: left, ranges: boxRanges(png, left) },
      { pixels: right, ranges: boxRanges(png, right) },
    );
  }

  const palette = boxes.map((box) => {
    let r = 0;
    let g = 0;
    let b = 0;
    for (const p of box.pixels) {
      const i = p * 4;
      r += png.data[i]!;
      g += png.data[i + 1]!;
      b += png.data[i + 2]!;
    }
    const n = Math.max(1, box.pixels.length);
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n)] as const;
  });

  for (const p of opaque) {
    const i = p * 4;
    const r = png.data[i]!;
    const g = png.data[i + 1]!;
    const b = png.data[i + 2]!;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let c = 0; c < palette.length; c++) {
      const [pr, pg, pb] = palette[c]!;
      const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = c;
      }
    }
    const [pr, pg, pb] = palette[best]!;
    png.data[i] = pr;
    png.data[i + 1] = pg;
    png.data[i + 2] = pb;
  }
  return png;
}

/**
 * Key out a flat magenta backdrop (for models without native transparency):
 * strongly magenta pixels become transparent; near-magenta fringe on opaque
 * pixels gets desaturated toward its neighbors' hue by the later palette
 * snap, so no explicit defringe pass is needed at sprite resolutions.
 */
export function keyMagenta(png: PNG): PNG {
  for (let p = 0; p < png.width * png.height; p++) {
    const i = p * 4;
    const r = png.data[i]!;
    const g = png.data[i + 1]!;
    const b = png.data[i + 2]!;
    if (r > 150 && b > 150 && g < 110 && Math.abs(r - b) < 90) {
      png.data[i + 3] = 0;
    }
  }
  return png;
}

/**
 * Key out stray pure-magenta transparency-marker pixels: RD emits them from its
 * training convention (rgb(255, 0, 255) means "transparent here"), scattered
 * inside an otherwise correct sheet. The band is deliberately TIGHT — a hair
 * around pure FF00FF so 1-off compression fringe still dies — so legitimate
 * pinks and purples in the character survive untouched. Contrast with
 * `keyMagenta`, whose loose band is correct only for keying gpt's flat magenta
 * backdrop but would punch holes in a pink/purple character.
 *
 * Mutates `png` in place and returns it.
 */
export function keyChromaMarker(png: PNG): PNG {
  for (let p = 0; p < png.width * png.height; p++) {
    const i = p * 4;
    const r = png.data[i]!;
    const g = png.data[i + 1]!;
    const b = png.data[i + 2]!;
    if (r >= 240 && g <= 20 && b >= 240) {
      png.data[i + 3] = 0;
    }
  }
  return png;
}

/**
 * Key out a SOLID painted background (Retro Diffusion sometimes fills one in
 * even for transparent input): if at least three corners agree on an opaque
 * color, clear it in two passes. No-op when corners are already transparent
 * or disagree.
 *
 * Pass 1 — border flood fill: flood from the image borders through pixels
 * within `tolerance * 3` (sum of per-channel absolute deltas) of the consensus
 * color. Connectivity-bound, so it only removes background reachable from the
 * edge.
 *
 * Pass 2 — global sweep: background-colored POCKETS fully enclosed by
 * character pixels (the gap between a walking sprite's legs, the hole in a
 * handle) are unreachable by the flood and survive as stray background-colored
 * pixels. So every remaining opaque pixel within a STRICTER threshold —
 * `round(tolerance * 3 * 0.6)`, same L1 metric — is keyed regardless of
 * connectivity. The stricter threshold keeps the unconstrained pass from
 * eating character colors that merely lean toward the background hue.
 *
 * The global pass is SKIPPED when the consensus background is very dark or
 * very desaturated (channel spread < 30 and all channels within 40 of each
 * other): greys and blacks sit too close to legitimate character outline
 * colors for a connectivity-free sweep, and enclosed grey pockets are
 * visually harmless anyway.
 */
export function keySolidBackground(png: PNG, tolerance = 34): PNG {
  const { width: w, height: h, data } = png;
  const cornerAt = (x: number, y: number) => {
    const i = (w * y + x) * 4;
    return { r: data[i]!, g: data[i + 1]!, b: data[i + 2]!, a: data[i + 3]! };
  };
  const corners = [cornerAt(1, 1), cornerAt(w - 2, 1), cornerAt(1, h - 2), cornerAt(w - 2, h - 2)];
  const opaque = corners.filter((c) => c.a > 200);
  if (opaque.length < 3) return png;
  const ref = opaque[0]!;
  const agree = opaque.filter(
    (c) => Math.abs(c.r - ref.r) + Math.abs(c.g - ref.g) + Math.abs(c.b - ref.b) < tolerance * 2,
  );
  if (agree.length < 3) return png;

  const matches = (i: number) => {
    if (data[i * 4 + 3]! === 0) return true; // already clear — traversable
    const dr = Math.abs(data[i * 4]! - ref.r);
    const dg = Math.abs(data[i * 4 + 1]! - ref.g);
    const db = Math.abs(data[i * 4 + 2]! - ref.b);
    return dr + dg + db < tolerance * 3;
  };
  const visited = new Uint8Array(w * h);
  const stack: number[] = [];
  const push = (x: number, y: number) => {
    const i = y * w + x;
    if (visited[i] || !matches(i)) return;
    visited[i] = 1;
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
    if (visited[i]) data[i * 4 + 3] = 0;
  }

  // Pass 2: kill enclosed background pockets the border flood could not reach.
  const spread = Math.max(ref.r, ref.g, ref.b) - Math.min(ref.r, ref.g, ref.b);
  const channelsClose =
    Math.abs(ref.r - ref.g) < 40 && Math.abs(ref.g - ref.b) < 40 && Math.abs(ref.r - ref.b) < 40;
  if (spread < 30 && channelsClose) return png;

  const strictThreshold = Math.round(tolerance * 3 * 0.6);
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3]! === 0) continue;
    const dr = Math.abs(data[i * 4]! - ref.r);
    const dg = Math.abs(data[i * 4 + 1]! - ref.g);
    const db = Math.abs(data[i * 4 + 2]! - ref.b);
    if (dr + dg + db < strictThreshold) data[i * 4 + 3] = 0;
  }
  return png;
}

export interface PixelateResult {
  png: PNG;
  width: number;
  height: number;
}

/**
 * Full treatment for a horizontal N-frame strip: re-anchor every frame
 * (feet-centered, shared baseline), downscale each frame independently to
 * `targetFrameHeight` native pixels, then palette-quantize across the whole
 * strip so all frames share colors.
 */
export function pixelateStrip(
  png: PNG,
  frames: number,
  targetFrameHeight = 64,
  maxColors = 24,
): PixelateResult {
  const aligned = normalizeFrames(png, frames);
  const cellW = Math.floor(aligned.width / frames);
  const scale = targetFrameHeight / aligned.height;
  const outCellW = Math.max(8, Math.round(cellW * scale));
  const out = new PNG({ width: outCellW * frames, height: targetFrameHeight });
  for (let i = 0; i < frames; i++) {
    const cell = new PNG({ width: cellW, height: aligned.height });
    PNG.bitblt(aligned, cell, i * cellW, 0, cellW, aligned.height, 0, 0);
    const small = nearestResize(cell, outCellW, targetFrameHeight);
    PNG.bitblt(small, out, 0, 0, outCellW, targetFrameHeight, i * outCellW, 0);
  }
  quantizePalette(out, maxColors);
  return { png: out, width: out.width, height: out.height };
}

/** Single-frame variant (heroes; also RD's required native-res input). */
export function pixelateSingle(png: PNG, targetHeight = 64, maxColors = 24): PixelateResult {
  const scale = targetHeight / png.height;
  const width = Math.max(8, Math.round(png.width * scale));
  const out = nearestResize(png, width, targetHeight);
  quantizePalette(out, maxColors);
  return { png: out, width, height: targetHeight };
}
