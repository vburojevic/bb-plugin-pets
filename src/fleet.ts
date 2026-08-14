// Fleet state — the live view of what the user's agents are doing, maintained
// server-side (so it works with zero windows open and feeds the CLI too).
// Pure module: the store is plain data + reducers, unit-testable without bb.

export type FleetStatus = "active" | "idle" | "failed";

export interface FleetThread {
  id: string;
  projectId: string;
  title: string;
  status: FleetStatus;
  /** Blocked on the user: a pending approval or question. */
  waiting: boolean;
  updatedAt: number;
}

/** Aggregate mood priority: waiting > failed > active > idle. */
export type FleetMood = "waiting" | "failed" | "active" | "idle";

export interface FleetSnapshot {
  mood: FleetMood;
  counts: { active: number; waiting: number; failed: number; total: number };
  threads: FleetThread[];
}

export function toFleetStatus(threadStatus: string): FleetStatus {
  switch (threadStatus) {
    case "active":
    case "starting":
    case "stopping":
      return "active";
    case "error":
      return "failed";
    default:
      return "idle";
  }
}

export function snapshot(threads: Map<string, FleetThread>): FleetSnapshot {
  const list = [...threads.values()];
  const counts = {
    active: list.filter((t) => t.status === "active").length,
    waiting: list.filter((t) => t.waiting).length,
    failed: list.filter((t) => t.status === "failed").length,
    total: list.length,
  };
  const mood: FleetMood =
    counts.waiting > 0
      ? "waiting"
      : counts.failed > 0
        ? "failed"
        : counts.active > 0
          ? "active"
          : "idle";
  // Ship only the threads the overlay can act on (non-idle first, capped) so
  // realtime payloads stay small on big installs.
  const interesting = list
    .filter((t) => t.status !== "idle" || t.waiting)
    .sort((a, b) => a.updatedAt - b.updatedAt)
    .slice(0, 50);
  return { mood, counts, threads: interesting };
}

/** The thread that most deserves attention: waiting > failed > oldest running. */
export function neediest(threads: FleetThread[]): FleetThread | null {
  const waiting = threads.filter((t) => t.waiting).sort((a, b) => a.updatedAt - b.updatedAt);
  if (waiting[0]) return waiting[0];
  const failed = threads.filter((t) => t.status === "failed").sort((a, b) => a.updatedAt - b.updatedAt);
  if (failed[0]) return failed[0];
  const active = threads.filter((t) => t.status === "active").sort((a, b) => a.updatedAt - b.updatedAt);
  return active[0] ?? null;
}
