# BB Pet Parkour Design

Date: 2026-08-28
Status: approved

## Summary

Replace the overlay pet's composer-only elevation logic with one shared,
obstacle-aware parkour system. The pet may use safe structural BB surfaces as
platforms, but must avoid interactive controls, editors, menus, dialogs,
popovers, tooltips, resizers, tab bars, and focused content. Roaming, explicit
destinations, missions, fetch, treats, and director acts all use the same route
controller.

The result should look intentional and playful: eased walking, anticipation,
real jump arcs, safe landings, natural drops, and occasional equivalent-route
variation. It must remain cheap enough for an always-on overlay and degrade to
the current floor behavior when the live DOM cannot be classified safely.

## Goals

- Prevent the rendered pet bounds from covering or crossing protected BB UI.
- Let the pet walk, jump, land, and drop across safe BB surfaces.
- Route every locomotion source through one priority-aware controller.
- Replan smoothly when panels, splits, dialogs, focus, or viewport geometry
  changes.
- Preserve existing missions, fetch, treats, toss physics, preferences,
  animation states, sounds, reduced-motion behavior, and runtime cleanup.
- Keep layout reads bounded and outside the per-frame animation hot path.
- Make route selection and movement mechanics deterministic under unit tests.

## Non-goals

- General web-page navigation outside the BB app shell.
- Pixel-perfect collision against irregular visual outlines; DOM rectangles are
  the collision contract.
- A user-controlled platform game or keyboard jump controls.
- Rebuilding BB layout semantics from private React state.
- Changing pet sprites, atlas generation, XP, fleet state, or server storage.
- Making the Habitat tab inspect BB chrome outside its own stage. Habitat keeps
  its existing bounded-stage behavior; only DOM-free geometry helpers may be
  shared when required to avoid duplicate movement math.

## Architecture

### Pure parkour module

Add `overlay/parkour.ts`, a DOM-free module containing:

- world-model types: viewport, platforms, exclusions, pet bounds, and current
  support surface;
- geometry normalization: clipping, inflation, merging, span subtraction, and
  safe landing-width checks;
- graph construction: walkable span nodes plus walk, jump, and drop edges;
- route planning: a deterministic weighted shortest-path search;
- route validation against a newer terrain snapshot;
- route-execution helpers for acceleration, braking, ballistic arcs, landing,
  dropping, and reduced-motion elevation changes.

The module accepts plain numbers and objects and has no React, DOM, timing,
audio, or persistence dependencies.

### BB DOM survey adapter

Add `overlay/bb-terrain.ts` for BB-specific DOM discovery, classification,
invalidation, and measurement. `overlay/Overlay.tsx` owns its lifecycle and
consumes snapshots but contains no selector/classification rules.

The adapter produces a cached `TerrainSnapshot` and is the only code allowed to
call `getBoundingClientRect()` for parkour. It classifies visible elements into:

- safe platform candidates: structural containers with a stable horizontal
  top and enough landing width, including composer cards and non-interactive
  panel surfaces;
- protected exclusions: native controls, links, editors, contenteditable
  regions, semantic buttons, focused regions, dialogs, menus, popovers,
  tooltips, resizers, tab bars, and their padded bounds;
- ignored decoration: hidden, transparent, pointer-inert, tiny, offscreen, or
  zero-area elements.

Classification uses semantic attributes and geometry before incidental class
names. Existing known BB selectors remain narrow adapter hints, not planner
dependencies. A bounded `elementsFromPoint` probe along proposed segments will
discover unclassified visible interactive content and add temporary exclusions
for that snapshot.

### Route controller

Replace independent direct writes to `walkTargetRef` with one controller that
owns the current movement intent, planned route, segment index, and replan
state. Intent priority remains:

1. pointing mission;
2. fetch return/chase and treat retrieval;
3. explicit user destination and onboarding demonstration;
4. director acts;
5. autonomous roaming.

A higher-priority intent preempts a lower-priority route at the next safe
grounded point. Dragging, toss flight, menus, ceremonies, and user-disabled
movement still freeze or supersede route execution as they do today.

## World Model

Coordinates use viewport CSS pixels. Positions are feet positions: `x` is the
pet's left edge and `yBottom` is elevation above the viewport bottom. The
planner converts to a feet-center point when comparing platforms.

Each platform has:

- stable id derived from semantic role plus rounded geometry;
- horizontal safe span after exclusions and edge padding are subtracted;
- elevation (`window.innerHeight - top`);
- source kind (`floor`, `composer`, `panel`, or `structural`);
- snapshot generation.

The viewport floor is always present. A platform is rejected when it is above
the configured safe height, too narrow for the pet plus landing margin, fully
covered by exclusions, or visually hidden.

Exclusions are inflated by the current rendered pet bounds plus a small motion
clearance. This Minkowski-style expansion lets the planner treat the pet as a
feet point while still protecting its complete sprite rectangle. Focused
controls get a larger courtesy margin.

## Graph and Route Planning

Create graph nodes at safe-span endpoints, useful projection points, the start,
and the goal. Edges are:

- `walk`: two nodes on one continuous safe span;
- `jump`: a validated ballistic arc between spans within horizontal and
  vertical limits;
- `drop`: a controlled descent to a lower span when the horizontal landing
  interval is clear.

Jump validation samples the parabolic envelope against inflated exclusions and
requires a minimum landing span. The executor uses the same solved duration and
velocity, so the visual path is the path the planner validated.

Use Dijkstra or A* with deterministic tie-breaking. Cost combines travel time,
jump count, backtracking, narrow landings, proximity to focused UI, and a small
drop penalty. Missions use the fastest safe route. Autonomous routes add a
bounded, seeded variation among routes whose cost is within 10% of the best,
never choose a materially worse route, and never vary while debugging tests.

Goals inside exclusions, outside the viewport, or on unusable surfaces project
to the nearest reachable safe point. Mission goals resolve beside the target
thread row rather than over it.

## Movement Execution

### Walking

Walking uses the existing eased velocity but brakes before segment endpoints.
Direction changes retain the turn squash. The pet never advances beyond the
validated walk span while waiting for a replan.

### Jumping

A jump has four phases:

1. anticipation, 80-120 ms, with takeoff squash and jump animation selected;
2. ballistic flight using the planner's solved horizontal and vertical
   velocities;
3. landing snap only within a small numeric tolerance of the target platform;
4. landing squash, optional particles, and boing subject to existing sound and
   cooldown settings.

The full rendered bounds are checked against the current snapshot before
takeoff. The route is replanned instead of launching if the arc became unsafe.
Airborne routes finish the current safe arc when layout changes; if the target
platform disappears, collision resolution chooses the highest valid support
under the pet or continues falling to the floor.

### Dropping

Drops preserve horizontal control, use gravity, and land through the same
support resolver as toss physics. They do not play a takeoff boing. A drop
higher than 1.5 times the rendered pet height uses the startled pose for at
most 180 ms before the jump/fall pose.

### Blocked behavior

When no route exists, move to the closest reachable safe point, face the goal,
and enter a short curious/waiting pose. Retry only after a terrain invalidation
or a bounded backoff; never retry every frame. A dialog or menu blocking all
routes therefore makes the pet wait outside until it closes.

## Dynamic Layout and Replanning

The terrain cache is invalidated by:

- `MutationObserver` changes under the app shell;
- `ResizeObserver` changes on tracked structural candidates;
- viewport resize and device-pixel-ratio-relevant geometry changes;
- focus changes;
- route-time discovery of an unclassified obstruction.

Invalidation schedules work; it does not synchronously measure. At the next
planning opportunity, survey at most four times per second. A route whose
segments remain valid continues without visible interruption. Otherwise the
controller replans from the current safe support. Use hysteresis for geometry
changes of one or two pixels so streaming content and hover chrome do not cause
route thrashing.

## Fetch, Treats, Missions, and Direct Destinations

- Fetch balls and falling treats collide with safe support elevations and
  viewport walls. Protected UI is not a resting surface; objects continue to a
  lower safe support or floor.
- The pet routes to the object's reachable safe projection rather than walking
  directly through UI.
- Mission row geometry remains live and is re-resolved by thread id. Its
  arrival point is a nearby reachable platform point; the highlight remains on
  the row.
- Command/Ctrl-click, menu destinations, tour demonstrations, director acts,
  and roaming all create controller intents instead of assigning x directly.
- Tossed pets retain free physics, but their landing resolver uses the new
  terrain snapshot and rejects protected surfaces.

## Reduced Motion and Accessibility

Reduced motion preserves route safety and ordering but removes anticipation,
ballistic interpolation, bob, squash, particles, and decorative hops. The pet
uses quick stepped movement between supports with static walk/jump/idle frames.
It never flashes or repeatedly announces route changes. The existing
decorative canvas and aria-live bubble behavior remain unchanged.

Dialogs, focused editors, and controls always win over pet movement. The pet's
canvas remains pointer-transparent outside its explicit interaction hit area.

## Performance Budget

- No parkour DOM reads in the ordinary 60 fps execution path.
- Terrain surveys: dirty-only, maximum four per second.
- Route graph: bounded to visible viewport geometry and capped candidate
  counts; merge nearby spans before graph construction.
- Segment probes occur during planning, not painting.
- Planner work must remain below 2 ms for the normal BB layout and below 8 ms
  for an adversarial capped layout in unit benchmarks.
- Hidden-document and compact-viewport mount behavior remains unchanged.
- All observers, scheduled callbacks, caches, and route state are disposed with
  the content-script generation.

## Failure Handling

- Empty or malformed surveys fall back to floor-only terrain.
- Unsupported or changed BB selectors reduce available platforms but never
  remove interactive-semantic exclusions.
- Planner exceptions cancel the route, log one debug event, and use floor-only
  planning for that intent.
- Repeated failure for one intent yields a blocked state with backoff rather
  than a loop.
- Existing drag, menu, ceremony, napping, and teardown guards remain
  authoritative.

## Testing

### Pure unit tests

Add `test/parkour.test.ts` covering:

- exclusion inflation and platform-span subtraction;
- overlapping and nested exclusions;
- walk-only, jump-up, jump-down, multi-platform, and drop routes;
- unreachable goals and nearest-safe projection;
- arc clearance against obstacles at apex and landing;
- deterministic route selection and bounded playful variation;
- route validation after moving/removing a platform;
- no oscillation under one-pixel geometry jitter;
- reduced-motion segment execution;
- ball/treat support resolution;
- adversarial candidate caps and planner timing.

### Overlay integration tests

Extract controller adapters far enough to test without running a real rAF
loop. Verify that roaming, missions, fetch, treats, explicit destinations, and
director acts all submit intents rather than mutate locomotion independently.
Verify observer invalidation, survey throttling, cleanup, priority preemption,
blocked backoff, and mid-air platform removal.

### Live visual QA

Exercise the installed plugin in a real BB window with:

- one thread and split panes;
- sidebar expanded and collapsed;
- right panel open with fixed and terminal/browser tabs;
- focused composer and popovers;
- modal dialog opened across an active route;
- mission, fetch, treat, Command/Ctrl-click, roaming, and tossed-pet landings;
- reduced motion enabled;
- narrow and wide desktop viewports.

Record screenshots or short captures of representative jump, detour, blocked,
and replan states. Inspect for clipping, control coverage, jitter, implausible
arcs, route thrashing, incorrect z-order assumptions, and frame-time spikes.

## Acceptance Criteria

- No tested movement mode crosses or rests on protected UI.
- The pet reaches every reachable test goal through validated walk/jump/drop
  routes and stops safely when no route exists.
- Safe BB structural surfaces are eligible platforms; controls and dialogs
  never are.
- Dynamic layout changes cause at most one visible stop/replan and no
  oscillation.
- Jump arcs clear inflated obstacles and land within the target safe span.
- Missions, fetch, treats, explicit destinations, director acts, roaming, and
  toss landings all use the shared terrain/controller contract.
- Reduced motion remains collision-safe without decorative movement.
- The rAF execution path performs no routine DOM measurement.
- Unit tests, TypeScript, production plugin build, and `git diff --check` pass.
- Live BB QA covers split panes, panels, focused controls, dialogs, and every
  movement intent listed above.
