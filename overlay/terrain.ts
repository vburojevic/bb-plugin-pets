// Composer terrain for the floating overlay.
//
// A composer is a ledge only when the pet can reach its top edge. A composer
// near the top of the window (bb's new-thread page) is out of reach, so it is
// not terrain at all: the pet walks under it on the floor instead of hovering
// in mid-air at the climb limit.

export interface LedgeBand {
  left: number;
  right: number;
  top: number;
}

/**
 * Turns composer input rects into ledge bands: each visual card is
 * approximated by expanding the input's own rect (the card's padding and
 * border live outside the textarea), and a band whose top sits more than
 * `maxElevation` px above the bottom of the viewport is dropped.
 */
export function ledgeBands(
  rects: readonly { left: number; right: number; top: number }[],
  viewportHeight: number,
  maxElevation: number,
): LedgeBand[] {
  const bands: LedgeBand[] = [];
  for (const rect of rects) {
    const band = { left: rect.left - 12, right: rect.right + 12, top: rect.top - 10 };
    if (viewportHeight - band.top <= maxElevation) bands.push(band);
  }
  return bands;
}
