// Composer terrain for the floating overlay.
//
// A composer near the top of the window (bb's new-thread page) is entirely out
// of the pet's reach, so it is not terrain at all: the pet walks under it on
// the floor instead of hovering in mid-air at the climb limit. A composer that
// reaches down into reach stays a ledge even when a long draft makes it taller
// than the limit; terrainAt clamps its height.

export interface LedgeBand {
  left: number;
  right: number;
  top: number;
}

/**
 * Turns composer input rects into ledge bands: each visual card is
 * approximated by expanding the input's own rect (the card's padding and
 * border live outside the textarea). An input whose bottom edge sits more
 * than `maxElevation` px above the bottom of the viewport is dropped.
 */
export function ledgeBands(
  rects: readonly { left: number; right: number; top: number; bottom: number }[],
  viewportHeight: number,
  maxElevation: number,
): LedgeBand[] {
  const bands: LedgeBand[] = [];
  for (const rect of rects) {
    if (viewportHeight - rect.bottom > maxElevation) continue;
    bands.push({ left: rect.left - 12, right: rect.right + 12, top: rect.top - 10 });
  }
  return bands;
}
