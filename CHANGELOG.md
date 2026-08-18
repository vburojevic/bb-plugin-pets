# Changelog

## 0.2.1 — 2026-08-18

### Fixed

- **Git installs resolve `zod`**: moved `zod` from `devDependencies` to
  `dependencies`. BB installs a git source with
  `npm install --ignore-scripts --omit=dev` and then bundles `bb.server`
  from `server.ts`, so a dev-only `zod` was never installed and the build
  failed with `Could not resolve "zod"`. Local builds were unaffected,
  which is why it survived to marketplace review
  (get-bb/marketplace#7). Audited the rest of the runtime imports at the
  same time; every other one is already a production dependency or a
  host-provided external.

### Changed

- **Overlay**: the focused composer rect is cached instead of being
  re-measured every frame, which stopped the overlay from forcing a
  layout on each tick.

## 0.2.0 — 2026-08-14

### Added

- **Evolution ceremony**: stage-ups dim the screen, flash a silhouette, and
  reveal the evolved pet with a name card. Skippable, ~3.2s, reduced-motion
  gets a quiet name card only.
- **Lineage**: past-stage heroes are archived instead of overwritten, and each
  den card shows a stage timeline.
- **Diary**: the pet keeps a journal — hatch day, evolutions, renames, the
  first failure of the day, 25/50/100-turn milestones, art touch-ups.
- **Treats**: every 10 completed turns earns a treat that drops from the top of
  the window, falls with physics, lands on the terrain, and gets eaten (+2 XP,
  a 60-second sparkle buff). Extras bank in a jar.
- **Fetch**: throw a pixel ball; the pet sprints it down and carries it back to
  where you threw from (+2 XP). Both treats and fetch work in the overlay and
  in the Habitat panel.
- **Per-pet voices**: chirps are pitched and timbred from the pet's id, so two
  pets no longer sound identical. Soft footsteps tick in time with walk frames,
  plus a quiet/normal volume dial.
- **Hatchery refinement**: pick a draft, type "rounder" or "make it teal", and
  the draft is redrawn in place — no full re-roll, no wasted candidates.
- **Theme and seasonal accents**: a subtle drop-shadow keeps sprites readable
  on light themes, and festive months pin a tiny accessory above the pet
  (togglable, off during naps and ceremonies).
- **Onboarding tour**: a 10-step guided walkthrough that auto-starts on first
  run, follows the pet while it demonstrates, and is re-runnable from the menu
  or the panel.
- **Paw button** in the sidebar for quick access to the pet's menu.
- **Developer panel** (setting-gated): live state/elevation/act/fps line, a
  40-entry event feed with copy-to-clipboard, and a ceremony preview.
- **Accessibility**: bubbles mirror into an aria-live region, and a
  high-contrast accents toggle thickens the ring and strengthens the badge.
- **Reaction tiers**: minor/standard/major celebrations, so ordinary
  completions stay quiet and milestones get the full burst.
- **Staleness handshake**: the overlay notices when the server ships a newer
  bundle and asks for a window reload.
- **Retry skipped states** in one click from the generation warning, **cost
  hints** on every button that spends API money, and **glow-up nudges** when
  artwork lags the pet's stage.
- **Chrome inspection**: the autonomy director now investigates the paw button,
  the nav row, and pane headers.
- **Generation job queue**: art jobs run in order and survive navigation.
- **First test suite**: 63 unit tests covering the atlas, the renderer core,
  personality, and quantization.

### Fixed

- Resizing no longer depends on the current pose — scale is anchored to the
  idle frame, so the pet keeps its size mid-animation.
- Sleep no longer restarts its lie-down transition on every loop.
- The pet menu no longer swallows the item you were selecting.
- Silent 400s from the image API now surface as real, readable errors.
- Speech bubbles clamp to the viewport and coexist with the emotion badge.

### Performance

- The render loop fully pauses while the window is hidden and drops to
  quarter-rate when the pet is provably motionless.
- Overlay and Habitat now share one renderer core instead of two divergent
  copies.
- Pruned an unused dependency from the bundle.

## 0.1.0 — 2026-08-14

Initial public release: an AI-hatched pixel companion that roams your bb
window and mirrors your fleet. Includes the hatchery (describe a creature,
pick from four drafts, get a fully animated pet), XP and evolution through
five stages, the autonomy director that gives the pet a life of its own,
pointing missions that walk it to the thread that needs you, ledge-walking
terrain awareness, and the Pets panel with the Den, Habitat, and Stats.
