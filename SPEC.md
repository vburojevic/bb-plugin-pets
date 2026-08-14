# bb-plugin-pets — Spec v1

A single AI-hatched pixel companion that roams the bb window, mirrors your agents' activity, and levels up from real completed work.

Inspired by [Hermes pets](https://hermes-agent.nousresearch.com/docs/user-guide/features/pets) (activity-state mascot, AI hatch, roaming desktop overlay) — diverging with: **XP + evolution**, a **den collection**, **hybrid thread-aware reactivity**, and **bb-native navigation** (the pet is a shortcut to the thread that needs you).

Built public-ready from day one: private install first, but every behavior is configurable, there are no personal assumptions, and it degrades gracefully without an API key.

---

## 1. Decisions (from spec session, 2026-08-13)

| Question | Decision |
| --- | --- |
| Pet scope | One global companion (den holds all hatched pets; exactly one active) |
| Progression | XP + evolution — positive-only, no hunger/death/nagging |
| Art | Full AI spritesheet from day one (Hermes-style frame grid) |
| Image backend | OpenAI key as a secret plugin setting → Images API (`gpt-image-1.5`) |
| Primary surface | Floating roaming sprite (content-script overlay) |
| Reactivity | Hybrid follow: mirrors the viewed thread inside a thread; fleet aggregate elsewhere |
| Hatch flow | Egg in corner → describe creature → 4 draft portraits → pick → full sheet → hatch |
| Evolution art | Regenerate the spritesheet from the base reference at each stage |
| Collection | Den: keep every hatched pet, one active, switchable, each keeps its own XP |
| Interactions | Petting, status speech bubbles, drag + resize, double-click → neediest thread, plus extras (§7) |
| Name | `bb-plugin-pets`, display name **Pets**, CLI `bb pets` |

---

## 2. Product shape

### The pet
- One active companion rendered as a pixel sprite floating above the bb UI, in every window/tab (each window renders independently; state is shared).
- It reacts to agent activity with 8 animation states (§5).
- It roams when idle (walks along the bottom edge, occasional hops), sleeps after inactivity, waves when you arrive.
- It earns XP from real work and evolves through stages with regenerated, grander artwork.

### The egg (onboarding)
- Fresh install, no pet yet: a mystery egg sits in the bottom corner, wobbling occasionally. Zero configuration needed to *see* it.
- Click the egg → hatch dialog: "Describe your creature" → 4 cheap draft portraits generate (egg wobbles harder while generating) → pick one → full spritesheet generates → egg cracks, pet hatches in place with a celebration.
- No API key configured: the egg still appears; clicking it explains what's needed and offers the **bundled starter pet** instead (§10) so keyless users still get the full experience.

### Hybrid follow (reactivity)
- Viewing a thread → the pet mirrors *that* thread: running / thinking / waiting / failed / done.
- Home, settings, panels → fleet aggregate with priority: **any waiting > any failed > any running > all idle**.
- The pet is glanceable fleet status that happens to be adorable.

---

## 3. Architecture

```
bb-plugin-pets/
  package.json          # manifest: server, app, skills, branding icon "PawPrint"
  server.ts             # factory: settings, sqlite, events, rpc, http, cli, generation jobs
  src/
    state.ts            # fleet state machine (pure, unit-tested)
    xp.ts               # XP ledger + stage thresholds (pure, unit-tested)
    spritegen.ts        # OpenAI calls: drafts, sheet, evolution (reference edits)
    slicer.ts           # sheet → atlas validation + slicing metadata (pure, tested w/ fixtures)
    bubbles.ts          # curated copy pack + selection logic (pure)
  app.tsx               # content script (overlay) + settings section (den manager)
  overlay/
    Sprite.tsx          # renderer: CSS steps() spritesheet animation
    Roam.ts             # roaming/physics (rAF, paused when hidden)
    Bubble.tsx          # speech bubbles
    HatchDialog.tsx     # egg → describe → drafts → pick (vendored Dialog)
    DenPopover.tsx      # right-click menu: den, rename, stats, hatch new
  assets/starter/       # 1–2 pre-made spritesheets + atlases (keyless demo pets)
  skills/               # (auto plugin-commands skill covers CLI; no custom skill v1)
```

### Backend (`server.ts`)
- **Settings** (`bb.settings.define`) — everything user-tunable, safe defaults:
  - `openaiApiKey` — string, **secret**. Only needed for hatching/evolving art. Missing key ⇒ `bb.status.needsConfiguration` is NOT used globally (the plugin still works with starter/bundled pets); hatch UI explains instead.
  - `enabled` — boolean, default `true` (master switch; overlay unmounts cleanly when off).
  - `roaming` — boolean, default `true`.
  - `bubbles` — select `off | rare | normal | chatty`, default `normal`.
  - `reactivity` — select `hybrid | aggregate | viewed-thread`, default `hybrid`.
  - `scale` — select `small | medium | large`, default `medium` (Alt+scroll live override persisted per-client in kv).
  - `evolutionArt` — select `regenerate | aura-only`, default `regenerate` (keyless users get aura-only automatically).
  - `reducedMotion` — select `auto | on`, default `auto` (auto = respect `prefers-reduced-motion`).
  - `imageModel` — string, default `gpt-image-1.5` (future-proofing; public users may point elsewhere).
  - `hideOnCompact` — boolean, default `true` (auto-hide on narrow viewports).
- **Storage**:
  - SQLite (`bb.storage.database()` + append-only `migrate`): `pets` (id, name, description, stage, xp, active, atlas meta, timestamps), `xp_events` (pet_id, source, amount, thread_id, ts — auditable ledger, idempotency keys), `gen_jobs` (kind: draft|sheet|evolve, status, error, request/response meta).
  - Sprite PNGs + atlas JSON on disk under the plugin data dir (`node:fs` is correct here — server-local plugin data). Every generation artifact kept (drafts included) for regen/debugging.
  - `kv` for small per-client state: overlay position, live scale override.
- **Fleet state**: in-memory map fed by the six `bb.events.on` lifecycle events (`active`, `idle`, `failed`, `created`, `archived`, `deleted`) plus `bb.sdk.subscribe` for pending-interaction/attention changes ("waiting on you" detection — exact event names validated against `types/bb-plugin-sdk.d.ts` at impl time). Debounced `bb.realtime.publish("state", …)` on change.
- **XP engine**: pure module; awards on events; publishes `xp` and `evolve` realtime signals.
- **Generation pipeline**: rpc `hatchDrafts { description }` → job → 4 parallel draft images (low quality tier, 1024²) → publish progress → rpc `hatchCommit { draftId, name }` → full sheet generation using the chosen draft as reference image → slice + validate (§6) → atlas → publish `hatched`. Evolution reuses the same pipeline with the base portrait + "next evolution form, same species and palette, older and grander" prompt.
- **HTTP** (`auth: "local"`): `GET /sprite/<petId>/<stage>` serves sheet PNGs with long-cache headers; `GET /draft/<jobId>/<n>` serves draft images.
- **RPC contract**: `getState`, `getActivePet`, `listDen`, `selectPet`, `renamePet`, `hatchDrafts`, `hatchCommit`, `cancelJob`, `petPet` (XP + cooldown enforced server-side), `getNeediestThread`, `setOverlayPrefs`.
- **CLI** `bb pets`: `status`, `hatch "<description>"`, `list`, `select <name>`, `rename <old> <new>`, `off` / `on`, `scale <s|m|l>`, `doctor` (key present? assets readable? overlay mounted? last job error?).

### Frontend (`app.tsx`)
- **Content script** renders the overlay: creates a positioned container on `document.body`, mounts a React root with our Sprite/Bubble/Dialog components. Full cleanup on dispose (nodes, listeners, rAF, observers) — perf-watch clean.
- **Data plane**: preferred — SDK `useRpc`/`useRealtime` from the content-script React root (module-runtime binding; **spike M0 validates this**). Fallback if hooks require slot context: plugin HTTP + SSE stream (Hono streaming response) with light reconnect.
- **Current-thread detection** (hybrid follow): observe `location` (`pushState` wrap + `popstate`) for the thread route. Pragmatic, contained, removed on dispose. Validated in M0; if brittle, fall back to aggregate-only with a note.
- **Settings section** (`app.slots.settingsSection`): den manager — pet cards (portrait, name, stage, XP bar), select/rename/hatch-new, regenerate-art button, last generation error surface. Renders below the declarative settings form on the plugin detail page.
- Rendering: spritesheet animation via CSS `steps()` on `background-position` (GPU-cheap); movement via `transform` in a rAF loop **paused when `document.hidden`** and fully stopped when `enabled` off or reduced motion.
- The sprite never blocks the UI: container is `pointer-events: none`; only the pet's own hitbox and open bubbles/popovers accept events. `aria-hidden` on decorative sprite; den popover fully keyboard accessible.

---

## 4. Spritesheet format

- Grid: **8 rows (states) × 4 frames**, uniform cells, transparent background, single consistent character, chunky pixel-art style.
- Canvas 1024×1536 (portrait) ⇒ 256×192 cells; rendered at ~64–96px on screen (scale setting × Alt+scroll).
- Atlas JSON per sheet: cell rect per state/frame, fps per state, loop vs one-shot, anchor point.
- Generation prompt enforces the grid contract (row order fixed, frame count fixed, no grid lines, no labels). Drafts are single portraits; the sheet generation takes the chosen draft as reference for identity consistency.

## 5. Animation states → bb activity

| Row | State | Trigger |
| --- | --- | --- |
| 1 | `idle` | nothing happening (blink loop; roaming uses walk row) |
| 2 | `walk` | roaming, and "agent running" movement |
| 3 | `think` | model reasoning / tool churn in the mirrored scope |
| 4 | `waiting` | blocked on you (permission prompt / question) — taps foot, holds sign |
| 5 | `celebrate` | turn completed / plan done (one-shot, then idle) |
| 6 | `sad` | thread failed (one-shot + brief sulk) |
| 7 | `sleep` | no activity ~10 min or window blurred long enough (Zzz) |
| 8 | `wave` | greeting on first sight of the day; also after `celebrate` on big finishes |

One central mapping module — every surface (sprite, bubbles, future minis) reads the same resolved state, Hermes-style.

## 6. Sheet validation (the jank firewall)

After generation, before accepting a sheet:
1. Slice by fixed grid; verify every used cell is non-empty (alpha coverage above threshold).
2. Verify per-cell bounding boxes are size-consistent within a tolerance (catches drifting/misaligned frames).
3. Verify background is transparent (corner sampling).
4. Fail ⇒ auto-retry with corrective prompt appendix (max 2 retries), else surface a friendly error + keep the egg/current pet. All attempts logged in `gen_jobs`.

## 7. Interactions

Chosen + extras (marked ✚):

- **Petting** — click → hearts + happy hop, +1 XP, 5-min cooldown (server-enforced), lifetime pet-count stat.
- **Speech bubbles** — dry voice, short, from a curated local copy pack (token-free, no LLM calls). Kinds: status ("2 threads waiting on you"), reactions ("build's green. act surprised."), greeting, evolution announcements, milestones. Frequency per setting. Bubbles that reference a thread are clickable → navigate there.
- **Drag to reposition** — drag anywhere; position persisted per client; roaming resumes from the new spot.
- **Alt+scroll resize** — 0.5×–2× live, persisted per client (straight from Hermes desktop).
- **Double-click → neediest thread** — waiting > failed > oldest running; nothing needy ⇒ shrug animation.
- ✚ **Right-click popover** — den (switch pet), rename, stats (XP, stage, age, threads witnessed, pets given), hatch new, hide until tomorrow, settings shortcut.
- ✚ **Sleep/wake cycle** — sleeps when nothing's happening; wakes with a stretch on activity.
- ✚ **Daily greeting wave** + small daily first-activity XP bonus.
- ✚ **Evolution ceremony** — shimmer, reveal of regenerated form, one-time confetti at the final stage.
- ✚ **Failure empathy** — sad pose + bubble naming the failed thread (clickable).
- ✚ **Egg theater** — idle wobble, hard wobble while generating, crack + hatch burst.
- ✚ **Auto-hide** on compact viewports (setting).

## 8. XP + evolution

Ledger-based (every award is a row — auditable, idempotent per event id).

| Source | XP (default) |
| --- | --- |
| Turn completed (`thread.idle`) | +10 |
| Thread archived (work shipped) | +15 |
| Thread failed ("we learn") | +2 |
| Petting (5-min cooldown) | +1 |
| First activity of the day | +20 |

Stages: **Hatchling 0 → Sprout 300 → Adult 1200 → Elder 3500 → Mythic 8000.**

- Evolution regenerates the sheet from the base reference ("next evolution form, same species and palette"). No key at evolve time ⇒ stage advances with an aura/size treatment and art-regen is offered whenever a key appears (public-friendly degradation).
- Per-pet XP; den pets keep theirs while benched. XP accrues to the **active** pet only.
- Deliberately no decay, no hunger, no death. Future (not v1): XP from passed builds / merged PRs via other plugins; anti-farm caps.

## 9. Bubble voice

Dry, understated, specific — one line, no exclamation marks (the flair register). Ships as a structured copy pack (template strings with slots: counts, thread titles). English-only v1, pack structured for i18n later. Examples:

- waiting: "Two threads are waiting on you. I'm just waiting in general."
- failed: "`{thread}` failed. I've decided we're blaming the tooling."
- celebrate: "`{thread}` finished. I did help."
- sleep: "Waking me for something good, I assume."

## 10. Public-readiness checklist (do-it-right-from-the-start)

- [ ] Every behavior gated by a setting; safe defaults; master `enabled` switch unmounts everything cleanly.
- [ ] Fully functional without an API key via bundled starter pet(s); key only gates *custom* hatching + art regen.
- [ ] Secret key: secret descriptor only, read server-side, never logged, never in realtime payloads or rpc outputs.
- [ ] Privacy: only the creature description leaves the machine (to OpenAI); README states this plainly. No telemetry.
- [ ] `engines.bb` + `engines.bbPluginSdk` honest; `dist/` built + committed for git installs; load-safe factory (an update never strands users).
- [ ] Unit tests (`@bb/plugin-sdk/testing`): XP ledger, fleet state machine, slicer against fixture sheets (good + broken), rpc contract, settings gating; frontend: content-script mount/dispose leaves zero DOM/listeners, hatch dialog flow with stubbed rpc.
- [ ] Perf discipline: rAF paused on hidden tab, debounced realtime, no timers when disabled, log restraint, storage bounded (old draft cleanup command). perf-watch must stay quiet.
- [ ] Accessibility: decorative sprite `aria-hidden`; popover/dialog keyboard + screen-reader correct; reduced-motion respected (static poses, no roaming).
- [ ] Theme-token styling only (no hardcoded grays); bubbles/dialogs match host theme light/dark.
- [ ] README: gifs, settings table, CLI reference, hatch cost note (~5 images per hatch, 1 per evolution), troubleshooting (`bb pets doctor`).

## 11. Milestones

1. **M0 — Spike (de-risk):** content-script overlay + React root; validate SDK hooks binding outside slots (else SSE fallback); route observation for hybrid follow; animate the bundled starter sheet end-to-end. *Go/no-go on the two risky assumptions.*
2. **M1 — Backend core:** settings, sqlite, fleet state, XP ledger, rpc, realtime, CLI `status|list|select|on|off`.
3. **M2 — Living sprite:** state mapping, roaming, sleep/wake, petting, drag, resize, double-click nav, den popover.
4. **M3 — Hatchery:** OpenAI pipeline (drafts → pick → sheet → validate → atlas), egg theater, `bb pets hatch`, evolution regen.
5. **M4 — Polish + public prep:** bubbles + copy pack, settings-section den manager, reduced motion, tests, README, `doctor`, starter-pet art.

## 12. Open questions (defaults chosen, veto anytime)

- Starter pet species (I'll make something neutral-charming, e.g. a round axolotl) — replaceable art.
- XP numbers / stage thresholds are first-guess tuning.
- 4 frames per state (vs Hermes' denser grids) — chosen for generation reliability; revisit after M3 real-world results.
- Bubble copy pack tone samples above — will draft ~40 lines for review.
- Icon: `PawPrint` (validated against bb's icon set at impl time).

---

## Amendments from M0 (2026-08-13, verified against bb source + live)

1. **Hook-free overlay data plane.** SDK app hooks throw outside host slot trees (they need `PluginContext`), so the content script uses: plain `fetch` to `/api/v1/plugins/pets/rpc/*`, its own WebSocket to `/ws` filtering `plugin-signal` frames (broadcast to all clients, same-origin only), and `location.pathname` + Navigation API for viewed-thread detection. `react-dom/client` IS shimmed, so the overlay renders through the host's React.
2. **Per-state strips instead of one grid sheet.** The model miscounts 32-cell grids (got 5×6) but nails "one row of 4 frames". Pipeline: transparent hero portrait → 8 strips via `images/edits` with hero as identity reference → per-strip validation (transparent corners, 4 non-empty cells) → flood-fill deglow from borders (kills the near-opaque halo the model paints, preserves enclosed soft pixels) → vertical crop; renderer bottom-aligns. Atlas v2 = per-state `{frames, fps, loop, width, height}`.
3. **Fleet state is server-side** (works with zero windows; feeds CLI + overlay). Sources: the six lifecycle events + `bb.sdk.subscribe("thread:changed")` for `metadata.hasPendingInteraction`, seeded from `threads.list` (rows carry `hasPendingInteraction`). Plugin-origin and hidden threads are excluded from both XP and fleet.
4. **`PawPrint` is not a BB icon** — shipped `assets/icon.svg` (CSS-mask paw) instead.
5. Starter pet is named Pixel and earns XP from install (42 XP within minutes on a live fleet).

## Round 2 (2026-08-13): free movement, pointing missions, panel, hatchery

- **Frame bleed fixed for real**: replaced CSS background-position sprite (percentage rounding leaked adjacent frames) with a **canvas renderer** — integer source rects via drawImage, imageSmoothing off, DPR-aware, mirror via ctx.scale. Bleed is now impossible by construction.
- **Free placement**: drag anywhere; release near the floor → snaps down and resumes roaming; release higher → perches there (parked, idle-only; "Come back down" in the menu). Prefs persist {x fraction, y px, scale, parked}.
- **Pointing missions** (the flagship): pet walks along the floor to a waiting/failed thread's sidebar row (`[data-sidebar-thread-id]` — confirmed present on built-in rows), enters the new 9th sprite state "point", a motion-animated highlight ring pulses on the row, bubble names the thread. Auto-fires when waiting count grows (3-min cooldown, off via `pointing` setting) or on demand from the menu. Verified live end-to-end (walked ~9s, pointed, ring on the failing row).
- **Right-click menu** is now vendored shadcn ContextMenu: pet, point-at-attention, go-to-neediest, switch pet (submenu), hatch, glow up (conditional), nap mode, come-down (conditional), hide, panel, settings. XP renders with NumberFlow.
- **Pets nav panel** (`/plugins/pets/pets`): Den (animated canvas thumbs, rename, choose, glow up, XP progress), Hatchery (describe → 4 draft candidates → pick → name → hatch, realtime progress, resumable drafts), Stats (XP by source, 9 computed achievements, recent feed).
- **Server hatchery**: spritegen.ts port of the proven pipeline; hatchDrafts/hatchCommit/evolveArt jobs (one at a time) with realtime gen-progress; per-pet hero portraits; STAGE_MODIFIERS evolution looks (leaf sprout → satchel → glasses+whiskers → crown); drafts retained (12) and served via /draft route.
- **New settings**: pointing, walkSpeed (chill/normal/zoomies), sounds (WebAudio synth chirps, off by default), xpMotes.
- Libs: motion (ring/bubble/cards), @number-flow/react (XP counters), vendored shadcn context-menu/tabs/badge/progress/skeleton/textarea/separator.

## Round 3 (2026-08-13): the juice pass

- **Toss physics**: drag release velocity (from a 110ms pointer trail) above 380px/s becomes a throw — gravity 2400px/s², wall bounces, floor restitution 0.38, velocity-proportional tilt (canvas rotation around bottom-center), landing squash + boing. Verified headlessly: parabolic apex, bounce chain, settle. Gentle drops fall naturally; high slow drops perch.
- **Locomotion feel**: eased stroll velocity (lerp ramps), walk bob synced to frame phase, turn-around squash pulses, mission arrival hop + chirp.
- **Evolution ceremony**: celebrate freeze + 4-pulse glow + 14-sparkle radial burst + hop + synth fanfare, bubble lands after 700ms.
- **Petting**: radial heart bursts (motion springs) + mini-hop + coo.
- **Waiting pip**: bouncing count badge above the pet while threads wait; click = pointing mission.
- **Bubbles**: spring entrance, speech tail, edge-aware side flip near the right wall.
- **Idle quirks**: occasional wave/look-around every ~22–36s of idle. **Typing glance**: pet looks up (think) when you start typing a prompt, 30s cooldown, only from idle states.
- Panel: hover-wave portraits, spring-staggered cards, egg empty-state (wobble), hatching shimmer with the picked draft, achievements earned-count + star pop-in.
- Reduced motion: physics, bob, quirks, squashes, and particles all disabled; static frames; interactions still work.

## Round 4 (2026-08-13): the graphics engine round

- **Quantization pipeline** (`src/quantize.ts`, pure pngjs): per-frame baseline alignment (kills inter-frame wobble) → per-frame nearest-neighbor downscale to 64px native cells → median-cut palette (24 colors) shared across the whole strip → binary alpha. Applied to all starter art (stage 0 assets + the user's evolved stage-1 art in the data dir; strips went ~900KB → ~5-25KB) and to every future gpt-generated strip (`pixelPerfect` setting, default on).
- **gpt-image-2 is the default hero/draft model.** Discovery: it rejects `background: transparent` (API error) — the pipeline auto-falls back to flat-magenta generation + chroma-key (`keyMagenta`) per run, and the quantizer eats the fringe. Verified live: keyed+quantized gpt-image-2 hero is cleaner than the 1.5 equivalent.
- **Retro Diffusion engine** (`rdApiKey` setting + `spriteEngine` auto/openai/retro-diffusion): strips via `POST api.retrodiffusion.ai/v1/inferences` with `rd_advanced_animation__*` styles (walking/idle/jump + custom_action prompts for think/waiting/sad/sleep/wave/point), 8 frames @ 64px, `return_spritesheet`, hero quantized to a 64px square as the identity input frame, grid→strip normalization, per-state fps map. Untested live (no key yet — add rdpk-… to activate); heroes/drafts/evolve stay on OpenAI.
- **Sprite URLs carry `&v=<idle-strip mtime>`** — immutable caching survives in-place art replacement.
- **Dev reset**: `bb pets reset` wipes den/XP/sprites/drafts/prefs and reseeds Pixel; legacy prefs-merge and one-time migration scripts removed (development mode, no external users).

## Round 5 (2026-08-13): the walk-cycle fix + hatchery guidance

- **Root cause of "gap + teleports to the opposite side" walks**: the model animates locomotion literally — the character travels across the strip, so the loop snaps it back; travelling tails also cross cell boundaries, smearing fragments onto the neighbouring frame's opposite edge.
- **Fix, three layers**: (1) treadmill prompts — walk "IN PLACE, body fixed at the center of its cell"; layout prompt forbids moving across the canvas; (2) `normalizeFrames` in the quantizer — detects each frame's content by column-gap segmentation (splitting the widest run at its thinnest column when characters touch — never fixed slicing), then rebuilds uniform cells with every frame re-anchored on its FEET centroid (stable vs bbox center when arms/tails extend) on one shared baseline; (3) verified: regenerated starter walk anchors within ±1px across frames, zero edge-contact on all 9 strips (programmatic audit).
- **Explored and rejected**: gpt-image-2 `n=8` coherent batches for per-frame generation — the batch stays character-coherent but each image renders multiple copies (a mini-strip per frame); single-shared-prompt ambiguity is structural.
- **`refreshArt` rpc + "Re-animate" den action**: regenerate any pet's strips at its current stage through the latest engine (used to fix the user's hatched dragon, Drago, which carried pre-fix strips).
- **Hatchery guidance**: always-visible "Best-results checklist" card (OpenAI required / Retro Diffusion recommended, set/unset badges, Add-key buttons, skip copy) — the why-keys story told on every visit, skippable by design. shadcn Alert for the missing-required-key state; Tooltips (glow-up, re-animate) under a panel-wide TooltipProvider.

## Round 5b: the edge-sliver bug (stale bytes vs fresh atlas)

- User video/screenshot showed neighbour-frame gill slivers on the sprite's edges. Fresh headless clients audited clean (10/10, zero edge pixels) and the served strips have zero content near cell boundaries — but the user's window was rendering the OLD art design: **stale image bytes sliced with fresh-atlas geometry** (75px math over 81px cells). Cache layers (remote tunnel edges that drop query strings; server formerly serving current bytes for any `v`) can wedge that pairing.
- Fixes: (1) slicing geometry now derives from `img.naturalWidth/Height` — the bytes that actually arrived — in both the overlay and panel thumbs, so stale art renders old-but-clean, never glitched; (2) `/sprite` answers stale-`v` requests with `cache-control: no-store` so old URLs can't cache current bytes. Adversarially verified: serving walk bytes for every state renders with zero edge leakage.

## Round 6 (2026-08-13): delete, right-click fix, hatchery polish, RD verified live

- **Release (delete) pets**: `deletePet` rpc (refuses the active pet; wipes ledger rows + all art stages + hero) behind an AlertDialog with named stakes; `clearDrafts` rpc + "Clear all" in the hatchery.
- **Right-click no longer also pets**: macOS ctrl+click arrives as button-0 pointerdown before `contextmenu` — now excluded at pointerdown, pending tap timers are killed on menu open, and the deferred tap re-checks menu state.
- **Hatchery**: 🎲 Surprise-me description pool, candidate count + Clear all, primary-ringed hatch card on pick (thumbnail, name + random-name dice, Enter-to-commit), pulsing per-strip progress dots.
- **Retro Diffusion verified against the real API, first try** (user added the rdpk- key): all nine states as native 64px spritesheets. Then pushed past Hermes parity (their 8×9 grid = 8 frames/state): walk/idle now request RD's max **16 frames** (walk 16 @ 20fps, idle 16 @ 8fps — same per-call price), 8 frames elsewhere with snappier fps. Verified on Pixel: 0.5px max drift, zero edge contact. Frame-rate design note: locomotion/physics always ran at 60fps rAF; atlas fps is the sprite-step rate (pixel-art idiom).

## Round 7 (2026-08-13): jobs survive navigation + honest progress

- Jobs always ran server-side, but all progress state lived in the panel component — navigation discarded it, and failures were a toast nobody saw (a live RD job died on "idle: background looks painted" invisibly).
- Server: `currentJob` state (jobId/phase/subject/done/total/statesDone/startedAt/progressAt) published as `{kind:"job"}` on every change plus a 15s heartbeat; `lastJobError` kept until the next job; `getJobStatus` rpc for reattachment.
- Panel: one `JobBanner` above the tabs on every tab — reattaches on mount, per-strip state chips (done/current/pending), elapsed clock, slow-warning after 90s without progress ("image APIs crawl — still connected"), and a persistent dismissable failure alert. Den/hatchery actions disable while a job runs.
- RD robustness: `keySolidBackground` (corner-consensus flood) strips the solid background RD occasionally paints, which was the killed job's root cause.

## Round 8 (2026-08-13): the Habitat — mobile-first pet surface

- The floating overlay is desktop-shaped (and hidden on compact viewports), so mobile got a first-class home instead: a Habitat tab in the Pets panel — full-bleed stage where the same canvas pet lives with the same brain (fleet-reactive states, eased roaming, toss physics with wall/floor bounces, petting with heart bursts, XP motes, evolution celebrate) scoped to the container instead of the window. Habitat is the panel's default tab, so "Open Pets panel" lands on the living pet everywhere; touch works via unified pointer events. Panel context means real SDK hooks (useRpc/useRealtime/useBbNavigate — proper navigation, no pushState hack). No missions or perching in the habitat; double-tap still jumps to the neediest thread.

## Round 9 (2026-08-13): tiered animation packs + skip-resilience

- 18 states in three packs — essential (9), expanded (+love, dig, run, jump, startled = 14, default), deluxe (+sit, stretch, dance, grumpy = 18) — as an `animationPack` setting applied by hatch, glow-up, and re-animate; costs stated in the setting description (~$2/$3.20/$4.30 per pet on RD).
- Upgrade path: `missingAnimations` on every pet view; den cards show "+N available" and the animation count; Re-animate regenerates at the current pack, upgrading older pets in place. `STATE_FALLBACKS` chains (love→celebrate, dig→think, run→walk, jump→celebrate, startled→sad, sit→idle, stretch→wave, dance→celebrate, grumpy→sad, point→wave) mean missing states degrade gracefully at render, so triggers ship before art exists.
- New triggers: love on petting, dig while a generation job runs, run at 3+ active threads, jump for toss physics, startled→sad sequence on failures, sit while perched, stretch on waking, dance for evolutions, grumpy at 3+ failed threads.
- RD's painted-background failures are stochastic (a probe of the same request returned clean output); per-state retry exhaustion now SKIPS the state with a gen-warning toast instead of failing the whole job — fallbacks cover the gap and Re-animate retries it later.

## Round 9b (2026-08-14): the wide-pet false positive + convergent upgrades

- A wide pet (wings/tail filling RD's tight 64px cells) failed 42/42 generations on "background looks painted" — the corner-transparency check was designed for gpt's padded canvases and was rejecting perfect art (verified by eye: a flawless transparent 16-frame walk cycle). RD strips now validate by overall opaque fraction (>60% = painted) + per-cell non-emptiness; the gpt path keeps its corner check. Failed retries had burned real RD credits rejecting good output.
- Partial-success regression: saveStrips replaced the atlas wholesale, so a run where some states skipped DROPPED previously-good states (a pet briefly lost "idle", which was also the blind fallback floor — undefined spec in the render tick). Fixes: merge-aware saveStrips (a run can only add), resolveState floor falls back to the first available state, both render loops guard an empty spec, and the lost entries were reconstructed from the on-disk strips.
- API hygiene: per-call timeouts (RD 180s, OpenAI 300s — a probe caught RD hanging >4min with no timeout), retry backoff (3s/6s), skip logs now include reasons, and lastJobError clears when a new job starts.
- Verified end-to-end: a convergence refresh took the dragon from 9 → 14 states (full expanded pack, missing 0); two states timed out mid-run and the merge preserved their existing art — upgrades now converge monotonically across runs.

## Round 10 (2026-08-14): consistent sizes, per-pet resize, behavior toggles, reactions that settle

- Character-normalized rendering: generators pad characters randomly (measured 44% vs 84% cell fill), so the renderer now sizes by the CHARACTER via atlas contentWidth/contentHeight recorded at save — every pet renders at the same character height. Per-pet `sizeScale` (0.5–2.5): ⌥scroll on the overlay or habitat pet, or the den stepper — adjustable any time after generation.
- Behavior toggles: eleven switches (roaming, pointing, waiting pip, celebrations, failure reactions, dig-during-generation, idle quirks, typing glance, evolution ceremony, XP motes, sounds) as plugin settings + a Behaviors card under the Habitat, written via setBehavior.
- Reactions settle: sustained states (waiting, sad/grumpy, busy walk/run, think, dig) play 8s, decay to calm, then re-remind for 2.5s every 70s while the condition persists — the pet acknowledges instead of animating forever. One-shot moments unchanged.

## Round 11 (2026-08-14): audit polish pass

- Six-critic audit (correctness, UX/a11y, performance, resilience, code quality, docs) returned 58 findings; the confirmed set landed: atomic job-slot acquisition (double-start race), staged hero writes (failed evolve no longer corrupts identity), post-dispose publish guards (the timer-flavored stale-handle crash), fleet publish dedup, per-pet petting fairness, clickable rename, den/habitat empty states, honest disabled-button tooltips, hatchery start feedback, draft-pick a11y, Habitat honoring roaming/walkSpeed/xpMotes/reducedMotion, WS backoff that survives flapping, rpc ok-checks with mount retry, decay-purge correctness, refetch no longer clobbering live position, pointercancel handling, per-pet-only sizing (global scale retired), dead scaffold/duplicate cleanup, README/SPEC refresh.
- Deferred deliberately: extracting the ~300 shared Overlay/Habitat lines into a module (high churn, tail-of-session), sprite-route response caching, SpriteThumb offscreen gating beyond document.hidden.

## Round 12 (2026-08-14): targeted regeneration, walk-to, emotions, deeper bb hooks

- Per-state regeneration: `regenerateStates` rpc + a "Fix animations…" picker on every den card — regenerate exactly the broken states (walk cycle quick-pick) and merge, no full re-animate needed.
- Walk-to instructions: tap the Habitat ground to send the pet there; ⌘+click the desktop floor for the overlay pet; named spots in the redesigned menu.
- Emotion indicator toggle: a small named-feeling badge above the pet (default off).
- Menu hardening: controlled open with a 350ms dismiss guard against environment-triggered instant closes; redesigned content with portrait header, size row, and grouped actions.
- New bb interactions: drag the pet onto a sidebar thread row to open it, click-while-pointing opens the target thread, a "while you were away" digest on window return, long-running-turn nudges, 10-turn milestone bubbles, window-scale evolution confetti, and benched-pet cameo walk-bys.

## Round 13 (2026-08-14): the pet gets a life

- Autonomy director: on a cadence set by Activity level (calm → unhinged), the overlay pet picks personality-gated acts — ambient one-liners from context-aware line banks, wandering, zoomies, cursor chasing, edge peek-a-boo, sidebar digging, composer watching, dance breaks.
- Personalities as toggles: Funny, Chaotic, Sarcastic, Helpful, Cozy — five independent switches plus an Activity level dial in the new Personality card.
- Grounded sarcasm: `getAmbientContext` rpc feeds real numbers (failures today, longest-running thread, open-thread count) into the lines — no canned filler.
- Cozy idle life: five minutes of user inactivity → the pet naps in a corner; return and it wakes, stretches, and welcomes you back.
- The Habitat pet self-directs too (lite): stretches, sits, dances, digs, wanders, and mutters habitat-appropriate lines.

## Rounds 14–16 (2026-08-14): the sidewalk fix, honest rings, composer courtesy

- Side-profile locomotion: RD animates the input image as posed (no direction parameter), so front-facing heroes produced front-facing walks. Each pet now gets a cached right-facing side-profile hero variant (`<id>-hero-side.png`, one gpt-image edit) fed to RD for walk and run only; regenerated automatically when a pet evolves. Verified: both pets' walk cycles are now true side-profile.
- Chroma hygiene: RD occasionally emits pure `FF00FF` transparency-marker pixels inside the character. The RD path now keys exactly that band (`keyChromaMarker`) — deliberately NOT the loose gpt-backdrop `keyMagenta`, which would punch holes in pink/purple pets. `keySolidBackground` also gained a second global pass that kills background-colored pockets enclosed by character pixels (skipped for grey/dark backgrounds).
- turn-failed ledger: failed turns now insert a 0-amount xp_events row, so `getAmbientContext.failuresToday` reflects reality and the sarcastic lines can actually fire.
- Ring lifecycle: mission expiry is enforced in the render tick (not just on fleet signals), the pointed thread row is re-resolved by id every ~200ms (bb recycles sidebar row nodes, so element references go stale), missions end early when their thread stops needing attention, and the highlight ring's pulse is finite — three pulses, then a steady hold until the exit fade.
- Composer courtesy: keyed to the composer having keyboard focus. While focused and overlapped the pet ghosts (35% opacity, click-through), gets startled and evacuates just past the nearest composer edge, roaming treats the focused composer as a wall, `walkTo` re-aims targets outside it, and the cozy composer-watch act now sits beside the input facing it instead of on it.

## Rounds 17–18 (2026-08-14): ring memory, the composer becomes terrain

- Ring re-flash killed at the source: a pointed-thread memory means the auto-pointer won't re-ring the same waiting thread for 10 minutes (pruned when it resolves, so a fresh wait re-arms it); manual pointing bypasses but also stamps it. A hard-cap timer detached from all mission state removes the ring at most POINT_MS + 2.5s after it appears.
- Ledge-walking (user-picked design over always-avoid, z-demotion, transit ghosting, and a dock): the composer is terrain. `terrainAt(x)` maps the pet's center to a ground elevation; grounded pets lerp between elevations at 620px/s with a hop pulse and land squash, toss physics lands on terrain, and stationary life (naps, sits, digs, roam pauses) re-rolls off the ledge. Focus-avoidance was removed as obsolete; focus-ghosting remains as a floor-level-only safety net.
- Split panes: terrain generalized to every visible composer (highest containing band wins); the ghost safety net keys to whichever input actually holds focus. Verified by anchor-transform probes: elevation −153px on the ledge vs an expected −151, −1 on open floor, before and after the multi-band change.
- Stale-window lesson, recorded: `bb plugin reload` restarts the server but never hot-swaps content scripts in open windows — every overlay fix needs a window reload (⌘R) to be seen. Diagnose "fix didn't work" reports against this first.

## Round 19 (2026-08-14): foundation for launch — dev panel, perf, a11y, tiers

- Developer panel (setting-gated): live state/elevation/act/fps line + a 40-entry event feed (state changes, acts, missions, terrain steps, ghosts, bubbles, naps) with copy-to-clipboard — bug reports become one screenshot instead of headless archaeology.
- Perf guardrails: the render loop fully pauses while the window is hidden and drops to quarter-rate when the pet is provably motionless; the dev panel shows real fps.
- Accessibility: bubbles mirror into an aria-live status region (visual bubble is aria-hidden), and a High-contrast accents toggle thickens the ring and strengthens the badge.
- Reaction tiers: minor/standard/major celebrations — ordinary completions stay as today, milestones get the full burst, small acknowledgements quiet down.

## Round 20 (2026-08-14): ceremony, lineage, and a diary

- Evolution ceremony: stage-ups now dim the screen, flash a silhouette, and reveal the evolved pet with a name card — skippable by click, bounded at ~3.2s, reduced-motion gets a quiet name card only.
- Lineage: past-stage heroes are archived on evolve (previously overwritten) and each den card shows a stage timeline; a new /hero route serves current and archived portraits.
- Diary: the pet keeps a journal — hatch day, evolutions, renames, first failure of the day, 25/50/100-turn milestones, art touch-ups — dry, lowercase, timestamped, on the Stats tab.

## Round 21 (2026-08-14): treats and fetch

- Treats: every 10 completed turns today earns a treat and drops it from the top of the window; it falls with physics, lands on the terrain (composer ledge included), and the pet walks over and eats it — hearts, a 60-second sparkle buff, +2 XP, one dry diary line a day. Extra treats bank in a jar ("Drop a treat (N)" in the menu).
- Fetch: "Play fetch" throws a pixel ball with real physics; the pet sprints it down (run-boosted), carries it back to where you threw from, and drops it at your feet for +2 XP. One ball at a time; missions always win.
- Stats now shows the treat ledger.

## Round 22 (2026-08-14): a voice of its own, refinable drafts, seasonal accents

- Per-pet voice: every pet's chirps are pitched and timbred from its id — two pets no longer sound identical; soft footsteps tick in time with walk frames; a quiet/normal volume dial.
- Hatchery refinement: pick a draft, type "rounder" or "make it teal", and the draft is redrawn in place with the instruction applied — no full re-roll, no wasted candidates.
- Theme + seasonal: a subtle drop-shadow keeps sprites readable on light themes, and festive months pin a tiny accessory above the pet (togglable, tasteful, off during naps and ceremonies).

## Round 23 (2026-08-14): the tour

- A 10-step onboarding tour: first run auto-starts it (localStorage-flagged, once); a card follows the pet while it demonstrates — waves hello, walks on ⌘-click, hops the composer ledge, explains missions, treats, fetch, personalities, and the paw button. Skippable (Esc), re-runnable from the menu ("Show me around") or the panel ("Take the tour").
