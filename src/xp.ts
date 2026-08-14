// XP engine — pure functions, no bb imports, unit-testable in isolation.

export interface Stage {
  index: number;
  name: string;
  /** Inclusive XP floor for this stage. */
  minXp: number;
  /** Short flavor used in bubbles and the den. */
  epithet: string;
}

export const STAGES: readonly Stage[] = [
  { index: 0, name: "Hatchling", minXp: 0, epithet: "fresh out of the shell" },
  { index: 1, name: "Sprout", minXp: 300, epithet: "getting the hang of it" },
  { index: 2, name: "Adult", minXp: 1200, epithet: "a seasoned professional" },
  { index: 3, name: "Elder", minXp: 3500, epithet: "has seen some merges" },
  { index: 4, name: "Mythic", minXp: 8000, epithet: "beyond code review" },
];

export type XpSource =
  | "turn-completed"
  | "thread-archived"
  | "thread-failed"
  | "petted"
  | "daily-greeting";

export const XP_AMOUNTS: Record<XpSource, number> = {
  "turn-completed": 10,
  "thread-archived": 15,
  "thread-failed": 2,
  petted: 1,
  "daily-greeting": 20,
};

/** Cooldown between petting XP awards. Pets accept affection continuously;
 * the ledger does not. */
export const PET_COOLDOWN_MS = 5 * 60 * 1000;

export function stageForXp(xp: number): Stage {
  let current = STAGES[0]!;
  for (const stage of STAGES) {
    if (xp >= stage.minXp) current = stage;
  }
  return current;
}

/** The next stage above `xp`, or null at the top. */
export function nextStageFor(xp: number): Stage | null {
  for (const stage of STAGES) {
    if (xp < stage.minXp) return stage;
  }
  return null;
}

/** Local-date key (server time) for daily-bonus dedupe. */
export function dayKey(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
