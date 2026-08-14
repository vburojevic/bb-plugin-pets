// Achievements — computed from the XP ledger, never stored. Pure module.

export interface AchievementInput {
  totalsBySource: Record<string, { count: number; xp: number }>;
  stageIndex: number;
  pettedCount: number;
  denSize: number;
  /** Hours (local) at which XP events occurred, deduped. */
  activeHours: number[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
}

export function computeAchievements(input: AchievementInput): Achievement[] {
  const turns = input.totalsBySource["turn-completed"]?.count ?? 0;
  const shipped = input.totalsBySource["thread-archived"]?.count ?? 0;
  const failures = input.totalsBySource["thread-failed"]?.count ?? 0;
  const nightOwl = input.activeHours.some((hour) => hour >= 0 && hour < 5);
  return [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Earn any XP at all.",
      earned: turns + shipped + failures > 0,
    },
    {
      id: "century",
      title: "Century",
      description: "100 completed turns.",
      earned: turns >= 100,
    },
    {
      id: "ship-it",
      title: "Ship It",
      description: "10 threads archived.",
      earned: shipped >= 10,
    },
    {
      id: "scar-tissue",
      title: "Scar Tissue",
      description: "25 failures survived. Builds character.",
      earned: failures >= 25,
    },
    {
      id: "evolved",
      title: "Glow Up",
      description: "Reach Sprout stage.",
      earned: input.stageIndex >= 1,
    },
    {
      id: "elder",
      title: "Elder Statescreature",
      description: "Reach Elder stage.",
      earned: input.stageIndex >= 3,
    },
    {
      id: "devoted",
      title: "Devoted",
      description: "Petted 50 times.",
      earned: input.pettedCount >= 50,
    },
    {
      id: "night-shift",
      title: "Night Shift",
      description: "XP earned between midnight and 5am.",
      earned: nightOwl,
    },
    {
      id: "full-house",
      title: "Full House",
      description: "Three pets in the den.",
      earned: input.denSize >= 3,
    },
  ];
}
