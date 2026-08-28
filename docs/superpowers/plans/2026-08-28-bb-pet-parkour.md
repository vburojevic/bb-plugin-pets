# BB Pet Parkour Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Give the overlay pet one safe, smooth, playful movement system that can walk, jump, drop, replan around BB chrome, and serve every existing movement mode without covering interactive UI.

**Architecture:** Keep geometry and route solving DOM-free in `overlay/parkour.ts`, intent arbitration and motion execution DOM-free in `overlay/parkour-controller.ts`, and BB element discovery plus cached measurement in `overlay/bb-terrain.ts`. `Overlay.tsx` becomes the integration shell: it submits typed intents, advances the controller from cached snapshots, and applies returned position/pose effects.

**Tech Stack:** TypeScript, React refs/effects, browser DOM observers, Node's built-in test runner, esbuild plugin build.

**Spec:** `docs/superpowers/specs/2026-08-28-bb-pet-parkour-design.md`

## Global Constraints

- Treat all positions as pet-feet coordinates in viewport CSS pixels.
- Never call `getBoundingClientRect()` from the animation-frame movement path.
- Keep the viewport floor as a valid fallback even when DOM discovery fails.
- Inflate protected UI by pet bounds before planning; controls, dialogs, editors, menus, tabs, popovers, tooltips, and resizers always win.
- Preserve drag/toss, missions, fetch, treats, director acts, ceremonies, naps, sound preferences, reduced motion, persistence, and generation cleanup.
- Cap surveyed candidates and graph nodes. Survey dirty terrain at most four times per second.
- Add behavior through tests first and commit each completed task independently.

---

## Task 1: Build normalized parkour terrain geometry

**Files:**

- Create: `overlay/parkour.ts`
- Create: `test/parkour.test.ts`

**Step 1: Write the failing geometry tests**

Cover floor fallback, viewport clipping, inflated exclusions, overlapping/nested exclusion merging, span subtraction, minimum landing width, stable IDs, and one-pixel hysteresis.

```ts
import { strict as assert } from "node:assert";
import test from "node:test";
import {
  buildTerrainSnapshot,
  resolveSupport,
  type TerrainInput,
} from "../overlay/parkour.ts";

const base: TerrainInput = {
  generation: 1,
  viewport: { width: 900, height: 700 },
  pet: { width: 48, height: 72, clearance: 6 },
  platforms: [{ id: "panel", kind: "panel", rect: { left: 100, top: 400, right: 700, bottom: 620 } }],
  exclusions: [{ id: "button", kind: "control", rect: { left: 330, top: 360, right: 410, bottom: 420 }, focused: false }],
};

test("subtracts pet-inflated controls from a platform", () => {
  const terrain = buildTerrainSnapshot(base);
  assert.deepEqual(
    terrain.platforms.find((platform) => platform.id === "panel")?.spans,
    [{ left: 106, right: 276 }, { left: 464, right: 694 }],
  );
});

test("always resolves a floor support", () => {
  const terrain = buildTerrainSnapshot({ ...base, platforms: [], exclusions: [] });
  assert.equal(resolveSupport(terrain, 450, 0)?.platformId, "floor");
});
```

**Step 2: Run the focused test and confirm RED**

Run: `node --experimental-strip-types --test test/parkour.test.ts`

Expected: failure because `overlay/parkour.ts` does not exist.

**Step 3: Implement the terrain contract**

Export these stable types and functions:

```ts
export type Rect = { left: number; top: number; right: number; bottom: number };
export type PlatformKind = "floor" | "composer" | "panel" | "structural";
export type ExclusionKind = "control" | "editor" | "dialog" | "menu" | "popover" | "tooltip" | "resizer" | "tab" | "focused" | "unknown";
export type TerrainInput = {
  generation: number;
  viewport: { width: number; height: number };
  pet: { width: number; height: number; clearance: number };
  platforms: Array<{ id: string; kind: PlatformKind; rect: Rect }>;
  exclusions: Array<{ id: string; kind: ExclusionKind; rect: Rect; focused: boolean }>;
};
export type SafeSpan = { left: number; right: number };
export type TerrainPlatform = {
  id: string;
  kind: PlatformKind;
  elevation: number;
  spans: SafeSpan[];
};
export type TerrainSnapshot = {
  generation: number;
  viewport: TerrainInput["viewport"];
  pet: TerrainInput["pet"];
  platforms: TerrainPlatform[];
  exclusions: Rect[];
};

export function buildTerrainSnapshot(input: TerrainInput, previous?: TerrainSnapshot): TerrainSnapshot;
export function resolveSupport(snapshot: TerrainSnapshot, feetCenterX: number, elevation: number): { platformId: string; elevation: number; span: SafeSpan } | null;
export function projectToSafePoint(snapshot: TerrainSnapshot, point: FeetPoint): FeetPoint;
```

Clip malformed rectangles, reject tiny/offscreen platforms, inflate exclusions by half pet width horizontally and pet height vertically plus clearance, merge overlaps, and subtract covered intervals. Reuse the previous rounded geometry when every edge changes by at most two pixels.

**Step 4: Run the focused tests and confirm GREEN**

Run: `node --experimental-strip-types --test test/parkour.test.ts`

**Step 5: Commit**

```bash
git add overlay/parkour.ts test/parkour.test.ts
git commit -m "feat: add normalized pet terrain geometry"
```

---

## Task 2: Add deterministic graph planning and arc validation

**Files:**

- Modify: `overlay/parkour.ts`
- Modify: `test/parkour.test.ts`

**Step 1: Add failing planner tests**

Test walk-only, jump-up, jump-down, controlled drop, multi-platform detours, unreachable goals, nearest-safe projection, obstacle-at-apex rejection, landing clearance, route invalidation after platform removal, deterministic tie-breaking, and seeded autonomous variation limited to routes within 10% of optimal.

```ts
test("plans a validated jump over a protected obstacle", () => {
  const route = planRoute(snapshot, { x: 80, elevation: 0 }, { x: 620, elevation: 180 }, {
    intent: "explicit",
    seed: 7,
    playful: false,
  });
  assert.ok(route);
  assert.deepEqual(route.segments.map((segment) => segment.kind), ["walk", "jump", "walk"]);
  assert.equal(validateRoute(snapshot, route), true);
});
```

**Step 2: Confirm RED**

Run: `node --experimental-strip-types --test test/parkour.test.ts`

Expected: missing planner exports.

**Step 3: Implement bounded graph construction and shortest-path search**

```ts
export type FeetPoint = { x: number; elevation: number; platformId?: string };
export type WalkSegment = { kind: "walk"; from: FeetPoint; to: FeetPoint; durationMs: number };
export type JumpSegment = { kind: "jump"; from: FeetPoint; to: FeetPoint; durationMs: number; vx: number; vy: number; gravity: number };
export type DropSegment = { kind: "drop"; from: FeetPoint; to: FeetPoint; durationMs: number; vx: number; gravity: number };
export type RouteSegment = WalkSegment | JumpSegment | DropSegment;
export type PlannedRoute = { generation: number; cost: number; goal: FeetPoint; segments: RouteSegment[] };

export function planRoute(
  snapshot: TerrainSnapshot,
  start: FeetPoint,
  goal: FeetPoint,
  options: { intent: MovementIntentKind; seed: number; playful: boolean },
): PlannedRoute | null;
export function validateRoute(snapshot: TerrainSnapshot, route: PlannedRoute, fromSegment?: number): boolean;
```

Generate nodes only at starts, goals, safe-span endpoints, and useful projections. Cap platforms, spans, and nodes with exported constants. Construct walk edges on a span, solve jump edges with one shared ballistic equation, sample the rendered-bounds envelope against inflated exclusions, and create drops only when the landing interval is clear. Use deterministic A* tie-breaking by total cost then node ID. Use the fastest route for missions; for autonomous movement, seeded choice may select only candidates with `cost <= best.cost * 1.10`.

**Step 4: Add the adversarial performance test**

Build a capped layout with more candidates than accepted, assert caps, and use `performance.now()` to assert planning under 8 ms after one warm-up. Keep the assertion focused on algorithm work, not DOM discovery.

**Step 5: Run tests and typecheck**

Run:

```bash
node --experimental-strip-types --test test/parkour.test.ts
npx tsc --noEmit
```

**Step 6: Commit**

```bash
git add overlay/parkour.ts test/parkour.test.ts
git commit -m "feat: plan safe pet parkour routes"
```

---

## Task 3: Add priority-aware movement execution

**Files:**

- Create: `overlay/parkour-controller.ts`
- Create: `test/parkour-controller.test.ts`
- Modify: `overlay/parkour.ts`

**Step 1: Write failing controller tests**

Test intent priority, safe grounded preemption, walking acceleration/braking, 80-120 ms anticipation, exact planned jump arc, landing tolerance, drop behavior, moving/removed landing support, blocked retry backoff, arrival notification, and reduced-motion stepped transitions.

```ts
test("a mission preempts roaming at the next grounded point", () => {
  const controller = createParkourController({ seed: 9 });
  controller.submit({ id: "roam", kind: "roaming", goal: { x: 700, elevation: 0 } });
  controller.tick(frame(0), terrain);
  controller.submit({ id: "mission", kind: "mission", goal: { x: 120, elevation: 180 } });
  const result = controller.tick(frame(16), terrain);
  assert.equal(result.activeIntent?.id, "mission");
  assert.equal(result.phase, "anticipating");
});
```

**Step 2: Confirm RED**

Run: `node --experimental-strip-types --test test/parkour-controller.test.ts`

**Step 3: Implement the controller API**

```ts
export type MovementIntentKind = "mission" | "fetch" | "treat" | "explicit" | "tour" | "director" | "roaming";
export type MovementIntent = {
  id: string;
  kind: MovementIntentKind;
  goal: FeetPoint;
  resolveGoal?: () => FeetPoint | null;
  playful?: boolean;
};
export type MotionPhase = "idle" | "walking" | "anticipating" | "jumping" | "dropping" | "landing" | "blocked";
export type MotionFrame = {
  now: number;
  dtMs: number;
  position: FeetPoint;
  velocityX: number;
  reducedMotion: boolean;
};
export type MotionResult = {
  position: FeetPoint;
  velocityX: number;
  phase: MotionPhase;
  direction: -1 | 1;
  activeIntent: MovementIntent | null;
  event?: "takeoff" | "land" | "arrive" | "blocked";
};

export function createParkourController(options: { seed: number }): {
  submit(intent: MovementIntent): void;
  cancel(id?: string): void;
  invalidate(): void;
  tick(frame: MotionFrame, terrain: TerrainSnapshot): MotionResult;
  dispose(): void;
};
```

Keep the module independent of DOM, React, sound, sprites, and timers. The caller turns controller events into animation/sound/particle effects. Revalidate before takeoff; after airborne invalidation, finish a safe arc or fall through `resolveSupport`. On route failure, move to the closest reachable point once and retry only after invalidation or exponential backoff capped at two seconds.

**Step 4: Run focused tests and typecheck**

Run:

```bash
node --experimental-strip-types --test test/parkour-controller.test.ts test/parkour.test.ts
npx tsc --noEmit
```

**Step 5: Commit**

```bash
git add overlay/parkour.ts overlay/parkour-controller.ts test/parkour-controller.test.ts
git commit -m "feat: add shared pet movement controller"
```

---

## Task 4: Build the BB terrain survey adapter

**Files:**

- Create: `overlay/bb-terrain.ts`
- Create: `test/bb-terrain.test.ts`

**Step 1: Write failing adapter tests with injected DOM ports**

Use small fake `ElementLike`, `ObserverLike`, clock, and viewport ports rather than jsdom. Test semantic classification, hidden/tiny/offscreen rejection, focused courtesy margins, narrow BB selector hints, dirty-only 250 ms throttling, mutation/resize/focus invalidation, segment probe exclusions, candidate caps, and disposal.

```ts
test("semantic controls are protected even without BB class names", () => {
  const candidate = element({ tagName: "BUTTON", role: null, rect: rect(300, 200, 380, 240) });
  assert.equal(classifyElement(candidate), "exclusion");
});

test("does not measure more than four times per second", () => {
  const survey = createBbTerrainSurvey(fakePorts());
  survey.invalidate("mutation");
  survey.snapshot(petBounds, 0);
  survey.invalidate("resize");
  survey.snapshot(petBounds, 100);
  assert.equal(measureCalls, 1);
});
```

**Step 2: Confirm RED**

Run: `node --experimental-strip-types --test test/bb-terrain.test.ts`

**Step 3: Implement classification, measurement, and lifecycle**

```ts
export type SurveyInvalidation = "mutation" | "resize" | "focus" | "viewport" | "probe";
export type BbTerrainSurvey = {
  snapshot(pet: TerrainInput["pet"], now: number): TerrainSnapshot;
  invalidate(reason: SurveyInvalidation): void;
  probe(route: PlannedRoute): boolean;
  isDirty(): boolean;
  dispose(): void;
};

export function classifyElement(element: ElementLike): "platform" | "exclusion" | "ignore";
export function createBbTerrainSurvey(root: HTMLElement, options?: { debug?: boolean }): BbTerrainSurvey;
```

Prefer semantic exclusions (`button`, `a[href]`, form controls, contenteditable, focused descendants, ARIA dialog/menu/tooltip/tab, draggable splitters) before platform hints. Measure only when dirty and at least 250 ms since the last survey. Keep the last safe snapshot during the throttle window. Attach `MutationObserver`, `ResizeObserver`, `focusin`, `focusout`, `resize`, and DPR-aware media-query invalidation. A bounded segment probe may inject a temporary exclusion and dirty the survey; it runs only while accepting/revalidating a route.

**Step 4: Run focused tests and typecheck**

Run:

```bash
node --experimental-strip-types --test test/bb-terrain.test.ts test/parkour.test.ts
npx tsc --noEmit
```

**Step 5: Commit**

```bash
git add overlay/bb-terrain.ts test/bb-terrain.test.ts
git commit -m "feat: survey safe BB pet terrain"
```

---

## Task 5: Route every overlay movement intent through the controller

**Files:**

- Modify: `overlay/Overlay.tsx`
- Create: `overlay/locomotion-adapter.ts`
- Create: `test/locomotion-adapter.test.ts`

**Step 1: Write failing intent-adapter tests**

Extract intent creation so the existing modes are testable without React or rAF. Verify missions, fetch chase/return, treats, Command/Ctrl-click destinations, onboarding tours, director acts, and roaming each call the same controller port with the correct priority kind. Assert the adapter exposes no direct position mutation.

```ts
test("all locomotion sources submit controller intents", () => {
  const submitted: MovementIntent[] = [];
  const adapter = createLocomotionAdapter({ submit: (intent) => submitted.push(intent), cancel: () => {} });
  adapter.roam({ x: 200, elevation: 0 });
  adapter.mission("thread-1", () => ({ x: 420, elevation: 90 }));
  adapter.fetch("ball-1", { x: 500, elevation: 0 }, "chase");
  adapter.treat("treat-1", { x: 300, elevation: 0 });
  adapter.explicit({ x: 700, elevation: 0 });
  adapter.director("act-1", { x: 100, elevation: 0 });
  assert.deepEqual(submitted.map(({ kind }) => kind), ["roaming", "mission", "fetch", "treat", "explicit", "director"]);
});
```

**Step 2: Confirm RED**

Run: `node --experimental-strip-types --test test/locomotion-adapter.test.ts`

**Step 3: Wire the survey and controller into `Overlay.tsx`**

- Create/dispose the BB survey with the content-script generation.
- Create one controller and adapter ref.
- Replace `composerBands`, `bandAt`, `terrainAt`, `nudgeOffLedge`, `walkTo`, `walkToClear`, and direct `walkTargetRef` writes.
- At each rAF tick, pass cached snapshot plus current feet position to the controller. Apply its returned position, velocity, direction, and phase.
- Convert controller events to existing sprite state, landing squash, particles, and sound with current cooldown/preferences.
- Resolve mission goals beside the live thread row via a closure; never target the row's protected rectangle.
- Replace director polling of `walkTargetRef` with controller arrival/cancel promises.
- Keep drag and free toss authoritative; they cancel or suspend intents.

**Step 4: Prove the old direct path is gone**

Run:

```bash
rg -n "walkTargetRef|composerBands|terrainAt|walkToClear" overlay/Overlay.tsx
```

Expected: no matches.

**Step 5: Run focused and full tests**

Run:

```bash
node --experimental-strip-types --test test/locomotion-adapter.test.ts test/parkour-controller.test.ts test/parkour.test.ts test/bb-terrain.test.ts
npm test
npx tsc --noEmit
```

**Step 6: Commit**

```bash
git add overlay/Overlay.tsx overlay/locomotion-adapter.ts test/locomotion-adapter.test.ts
git commit -m "feat: route overlay pet movement through parkour"
```

---

## Task 6: Integrate object landings, dynamic replanning, and reduced motion

**Files:**

- Modify: `overlay/Overlay.tsx`
- Modify: `overlay/parkour.ts`
- Modify: `overlay/parkour-controller.ts`
- Modify: `test/parkour.test.ts`
- Modify: `test/parkour-controller.test.ts`
- Modify: `test/locomotion-adapter.test.ts`

**Step 1: Add failing regression tests**

Cover balls and treats falling past protected surfaces to the next support, tossed-pet landing rejection on controls, mid-air platform removal, dialog appearance during walking, focus invalidation, one-pixel non-oscillation, blocked curious state, and collision-safe reduced motion.

```ts
test("a falling object ignores protected UI as support", () => {
  const landing = resolveFallingSupport(terrainWithButtonOverFloor, {
    centerX: 360,
    previousElevation: 220,
    nextElevation: -10,
  });
  assert.equal(landing?.platformId, "floor");
});
```

**Step 2: Confirm at least one regression fails before integration**

Run: `node --experimental-strip-types --test test/parkour.test.ts test/parkour-controller.test.ts test/locomotion-adapter.test.ts`

**Step 3: Finish integration**

- Route ball and treat support checks through `resolveFallingSupport`.
- Route tossed-pet landing through the same current snapshot, never a DOM read.
- Revalidate before takeoff and after survey generation changes.
- If a platform disappears mid-air, land on the highest valid support crossed or continue to the floor.
- Add anticipation/landing squash only when reduced motion is off.
- In reduced motion, keep collision ordering but step elevations with static frames and no decorative particles or boing.
- Emit bounded debug events for plan, replan, blocked, takeoff, and landing without logging every frame.

**Step 4: Run all automated gates**

Run:

```bash
npm test
npx tsc --noEmit
bb plugin build .
git diff --check
```

Expected: every command passes.

**Step 5: Commit**

```bash
git add overlay/Overlay.tsx overlay/parkour.ts overlay/parkour-controller.ts test/parkour.test.ts test/parkour-controller.test.ts test/locomotion-adapter.test.ts
git commit -m "fix: make pet landings and replans collision safe"
```

---

## Task 7: Perform live BB QA and finalize documentation

**Files:**

- Modify: `README.md`
- Create: `docs/qa/2026-08-28-pet-parkour.md`
- Add: `docs/qa/2026-08-28-pet-parkour-*.png` or a short capture if the repository already tracks QA media

**Step 1: Build and reload the local plugin**

Run:

```bash
bb plugin build .
bb plugin reload pets
```

Use the exact installed plugin ID returned by `bb plugin list` if it differs from `pets`.

**Step 2: Exercise the live matrix**

In a real BB window, verify wide and narrow viewports with sidebar expanded/collapsed, split panes, right panel and terminal/browser tabs, focused composer, popover/menu, and modal dialog. Exercise roaming, mission, fetch, treat, Command/Ctrl-click, director movement, tossed landing, and reduced motion.

Capture representative evidence for:

- a jump between safe structural surfaces;
- a detour around focused interactive UI;
- waiting safely outside a dialog;
- a dynamic replan after panel/layout change.

Record any unexercised branch explicitly; do not infer visual correctness from unit tests.

**Step 3: Document behavior and QA evidence**

Add a concise README note describing obstacle-aware parkour and reduced-motion behavior. In the QA file, record environment, commit, modes exercised, captures, any observed frame-time issue, automated commands, and deviations.

**Step 4: Re-run final gates after documentation**

Run:

```bash
npm test
npx tsc --noEmit
bb plugin build .
git diff --check
git status --short
```

**Step 5: Commit**

```bash
git add README.md docs/qa/2026-08-28-pet-parkour.md docs/qa/2026-08-28-pet-parkour-*.png
git commit -m "docs: verify pet parkour in BB"
```

## Completion Report

Report:

- commits created and files changed;
- automated test count, TypeScript result, build result, and `git diff --check` result;
- live BB layouts and every movement mode actually exercised;
- evidence paths;
- any acceptance criterion or branch not exercised;
- whether the branch was pushed or released (default: neither without a separate request).
