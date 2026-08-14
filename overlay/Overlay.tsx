// The floating companion. Hook-free data plane (see net.ts); React renders
// structure while one rAF loop drives locomotion, physics, and frame stepping
// through refs. Sprites draw onto a canvas — pixel-exact source rects, so
// adjacent frames can never bleed (CSS background-position sprites leak at
// fractional widths).
//
// Feel notes: movement is eased (velocity ramps), walking bobs, direction
// changes squash, releases obey gravity with bounce + landing squash, and a
// hard-enough drag release becomes a toss with momentum and tilt.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { resolveState, type SpriteState } from "../src/atlas";
import { EMOTION_LABELS, charGeometry, nextFrame, randomBetween } from "./core";
import {
  connectSignals,
  currentThreadId,
  navigateToThread,
  rpc,
  watchRoute,
  type RpcOutput,
} from "./net";
import { pickLine, type AmbientContext } from "./personality";
import { setSoundVolume, setSoundsEnabled, setVoiceSeed, sounds, unlockSounds } from "./sounds";

type OverlayData = RpcOutput<"getOverlay">;
type Fleet = OverlayData["fleet"];
type FleetThreadView = Fleet["threads"][number];
type PetView = NonNullable<OverlayData["pet"]>;

interface Moment {
  state: SpriteState;
  until: number;
}

interface BubbleState {
  text: string;
  threadId?: string;
  projectId?: string;
  until: number;
  side: "left" | "right";
}

interface Mission {
  thread: FleetThreadView;
  element: Element;
  phase: "walk" | "point";
  until: number;
  arrived: boolean;
  /** Last time `element` was re-resolved from the live sidebar DOM. */
  lastQueryAt?: number;
}

interface Particle {
  id: number;
  dx: number;
  dy: number;
  char: string;
}

/** A dropped treat. `x` is its LEFT edge; `yBottom` matches the pet's frame. */
interface Treat {
  id: number;
  x: number;
  yBottom: number;
  vy: number;
  landed: boolean;
  /** One bounce per treat, then it settles. */
  bounced: boolean;
}

interface Ball {
  x: number;
  yBottom: number;
  vx: number;
  vy: number;
  phase: "flying" | "rolling" | "carried" | "done";
  /** Where the throw started — the pet brings the ball back here. */
  originX: number;
  startedAt: number;
}

interface HighlightState {
  rect: { left: number; top: number; width: number; height: number };
  key: number;
}

// Target on-screen height of the CHARACTER (not the sprite cell) at scale 1.
const BASE_CHAR_HEIGHT = 64;
const GROUND_PX = 10;
const EDGE_MARGIN = 16;
// How often the loop is allowed to re-measure the composer (it's a layout read).
const COMPOSER_POLL_MS = 250;
// Clearance the pet keeps around a focused composer.
const COMPOSER_PAD = 16;
// --- terrain ---
// The composer is a ledge: the pet climbs onto its top edge instead of walking
// through it. Never climb higher than this, no matter what a bad measurement says.
const LEDGE_MAX = GROUND_PX + 260;
// Vertical travel while stepping up onto / down off the ledge.
const LEDGE_CLIMB_SPEED = 620;
// Horizontal slack around the band: the step happens slightly before the edge.
const LEDGE_EDGE_SLACK = 8;
// Stationary destinations are pushed this far past the band edge.
const LEDGE_CLEARANCE = 24;
const LEDGE_BOING_COOLDOWN_MS = 1500;
// Onboarding tour: one localStorage flag, bumped if the tour ever changes
// enough that returning users deserve to see it again.
const TOUR_KEY = "pets:tour:v1";
// First run waits this long before the tour opens — the pet gets to land, wave,
// and look alive before it starts talking about itself.
const TOUR_AUTOSTART_MS = 2500;
const SLEEP_AFTER_MS = 10 * 60 * 1000;
const MOMENT_MS = 2800;
const BUBBLE_MS = 6500;
/** Keep-out margin between the speech bubble and either window edge. */
const BUBBLE_EDGE_PAD = 8;
const POINT_MS = 4500;
const AUTO_POINT_COOLDOWN_MS = 3 * 60 * 1000;
// How long a thread stays "already pointed at" for the auto-pointer.
const POINTED_MEMORY_MS = 10 * 60_000;
const GLANCE_COOLDOWN_MS = 30 * 1000;
const QUIRK_EVERY_MS = 22 * 1000;
const GRAVITY = 2400;
const FLOOR_BOUNCE = 0.38;
const WALL_BOUNCE = 0.5;
const TOSS_MIN_SPEED = 380;
const SETTLE_VY = 140;
const BUBBLE_INTERVALS: Record<string, number> = {
  off: Number.POSITIVE_INFINITY,
  rare: 20 * 60 * 1000,
  normal: 5 * 60 * 1000,
  chatty: 60 * 1000,
};
const WALK_SPEEDS: Record<string, number> = { chill: 0.6, normal: 1, zoomies: 1.8 };
// Sustained reactions acknowledge, settle, then remind — never loop forever.
const SUSTAIN_HOLD_MS = 8000;
const SUSTAIN_CALM_MS = 70_000;
const SUSTAIN_REMIND_MS = 2500;

// Walk-to (menu "Send to…" / ⌘-click) locomotion speed, px/s at scale 1.
const WALK_TO_SPEED = 110;
const LONG_RUN_AFTER_MS = 10 * 60_000;
const LONG_RUN_NUDGE_COOLDOWN_MS = 5 * 60_000;
const AWAY_DIGEST_MIN_MS = 60_000;
const CAMEO_MS = 14_000;
const CAMEO_CHAR_TARGET = 56;

// --- evolution ceremony ------------------------------------------------------
// A bounded, skippable set piece: dim, silhouette, flash, reveal, name card.
// Every duration below is part of one budget — the whole thing is over in
// CEREMONY_MS, no matter what the artwork does.
const CEREMONY_MS = 3200;
/** Reduced motion gets the name card only, and a little longer to read it. */
const CEREMONY_REDUCED_MS = 2600;
/** How long the pet stays a pure silhouette before the flash reveals it. */
const CEREMONY_SILHOUETTE_MS = 900;
/** Cross-fade out of brightness(0) — matches the flash's decay. */
const CEREMONY_REVEAL_MS = 350;
/** Target on-screen height of the CHARACTER at the centre of the ceremony. */
const CEREMONY_CHAR_TARGET = 160;

// --- autonomy director -------------------------------------------------------
// The pet acts on its own: every so often the director picks ONE act from the
// pools its personality toggles allow. Everything below is read defensively —
// the personality settings and the ambient-context rpc are owned by the server
// side of this feature and may land after this file does.

type ActivityLevel = "calm" | "normal" | "lively" | "unhinged";

interface Persona {
  funny: boolean;
  chaotic: boolean;
  sarcastic: boolean;
  helpful: boolean;
  cozy: boolean;
  level: ActivityLevel;
}

const DEFAULT_PERSONA: Persona = {
  funny: true,
  chaotic: true,
  sarcastic: true,
  helpful: true,
  cozy: true,
  level: "lively",
};

/** Director fire interval per activity level, in ms [min, max]. */
const DIRECTOR_RANGES: Record<ActivityLevel, [number, number]> = {
  calm: [8 * 60_000, 12 * 60_000],
  normal: [4 * 60_000, 7 * 60_000],
  lively: [2 * 60_000, 4 * 60_000],
  unhinged: [45_000, 90_000],
};

const AUTO_NAP_AFTER_MS = 5 * 60_000;
const AUTO_NAP_GRACE_MS = 2 * 60_000;
const AUTO_NAP_CHECK_MS = 30_000;
const RECENT_LINES = 10;
const ZOOMIES_BOOST = 2.6;

// --- treats + fetch ----------------------------------------------------------
// Treats fall from the top of the window, land on the terrain the pet walks on,
// and are then eaten autonomously. The ball is the same physics with a chase
// attached. Both are ref-driven (positions written straight onto the DOM node,
// like the sprite anchor) — React only hears about them when one appears or
// disappears.
const TREAT_MAX = 3;
const TREAT_SIZE = 18;
/** Treats are lighter than the pet: they drift down rather than plummet. */
const TREAT_GRAVITY = GRAVITY * 0.6;
const TREAT_BOUNCE = -0.3;
/** Close enough to eat, measured centre-to-centre. */
const TREAT_REACH_PX = 14;
const TREAT_BUFF_MS = 60_000;
const BUFF_SPARKLE_MS = 300;
const FETCH_BOOST = 1.8;
const BALL_SIZE = 10;
const BALL_THROW_VY = 360;
/** Rolling friction, expressed per 60fps frame (time-corrected in the tick). */
const BALL_FRICTION = 0.92;
const BALL_STOP_VX = 14;
const BALL_CATCH_PX = 22;
/** How often the chase re-aims at a moving ball. */
const BALL_CHASE_MS = 200;
const BALL_FADE_MS = 1500;
/** A ball nobody ever went after (napping, dragged onto a perch) gives up. */
const FETCH_TIMEOUT_MS = 25_000;

// --- dev feed ----------------------------------------------------------------
// A ring of the last few notable things the pet did, mirrored onto the window
// as events so the panel (owned by the other half of this feature) can render a
// live feed without reaching into the overlay's refs. Cheap enough to leave on
// unconditionally — the periodic STATE snapshot below is the part that's gated.

const DEBUG_LOG_MAX = 40;
const DEBUG_STATE_MS = 500;

const debugLog: Array<{ t: number; kind: string; detail: string }> = [];

function logDebug(kind: string, detail: string) {
  const entry = { t: Date.now(), kind, detail };
  debugLog.push(entry);
  if (debugLog.length > DEBUG_LOG_MAX) debugLog.splice(0, debugLog.length - DEBUG_LOG_MAX);
  window.dispatchEvent(new CustomEvent("pets:debug", { detail: { entry } }));
}

// --- perf guardrails ---------------------------------------------------------
// Run the FULL tick every Nth frame while the pet is provably motionless.
const IDLE_FRAME_DIVISOR = 4;
/** States that are allowed to skip frames — none of them move the pet. */
const IDLE_SKIP_STATES: ReadonlySet<string> = new Set(["idle", "sleep", "sit"]);

/** djb2 — a stable, cheap string hash. Only used to seed the pet's voice. */
function djb2(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) hash = (hash * 33) ^ input.charCodeAt(i);
  return hash >>> 0;
}

function readPersona(settings: unknown): Persona {
  const bag = (settings ?? {}) as Record<string, unknown>;
  const flag = (key: string) => (typeof bag[key] === "boolean" ? (bag[key] as boolean) : true);
  const level = bag.activityLevel;
  return {
    funny: flag("personalityFunny"),
    chaotic: flag("personalityChaotic"),
    sarcastic: flag("personalitySarcastic"),
    helpful: flag("personalityHelpful"),
    cozy: flag("personalityCozy"),
    level:
      level === "calm" || level === "normal" || level === "lively" || level === "unhinged"
        ? level
        : "lively",
  };
}

const num = (value: unknown): number => (typeof value === "number" && Number.isFinite(value) ? value : 0);

/** Shape the ambient-context payload defensively; missing fields read as zero. */
function readAmbient(payload: unknown): AmbientContext {
  const bag = (payload ?? {}) as Record<string, unknown>;
  const runner = bag.topRunner as Record<string, unknown> | null | undefined;
  return {
    activeCount: num(bag.activeCount),
    waitingCount: num(bag.waitingCount),
    failedCount: num(bag.failedCount),
    turnsToday: num(bag.turnsToday),
    failuresToday: num(bag.failuresToday),
    denSize: num(bag.denSize),
    topRunner:
      runner && typeof runner.id === "string"
        ? {
            id: runner.id,
            projectId: typeof runner.projectId === "string" ? runner.projectId : "",
            title: typeof runner.title === "string" ? runner.title : "",
            minutes: num(runner.minutes),
          }
        : null,
  };
}

// The ambient-context method is added by the server half of this feature; call
// it through a loose signature so this file compiles either way.
const looseRpc = rpc as unknown as (
  pluginId: string,
  method: string,
  input?: unknown,
) => Promise<unknown>;

const threadRowFor = (threadId: string): Element | null =>
  document.querySelector(`[data-sidebar-thread-id="${CSS.escape(threadId)}"]`);

/** The thread composer's current box, or null when there isn't one on screen. */
const composerRect = (): DOMRect | null =>
  document.querySelector("textarea, [contenteditable='true']")?.getBoundingClientRect() ?? null;

/**
 * Every composer on screen — bb splits into multiple thread panes, each with
 * its own input, so one rect is never enough. Hidden and tiny inputs (search
 * boxes, offscreen panes) are dropped.
 */
const composerRects = (): DOMRect[] => {
  const out: DOMRect[] = [];
  for (const el of Array.from(document.querySelectorAll("textarea, [contenteditable='true']"))) {
    const node = el as HTMLElement;
    if (node.checkVisibility ? !node.checkVisibility() : false) continue;
    const rect = node.getBoundingClientRect();
    if (rect.width > 80 && rect.height > 10) out.push(rect);
  }
  return out;
};

/** The box of whichever input currently holds keyboard focus, if any. */
const focusedComposerRect = (): DOMRect | null => {
  const active = document.activeElement as HTMLElement | null;
  const input = active?.closest?.("textarea, [contenteditable='true']") as HTMLElement | null;
  return input ? input.getBoundingClientRect() : null;
};

let particleSeq = 1;

/**
 * A single static idle frame, drawn once on mount. Slicing geometry comes from
 * the image bytes (same rule as the main renderer) so a stale cache can't bleed
 * neighbouring frames into the portrait.
 */
function PetPortrait({
  src,
  frames,
  size = 40,
}: {
  src: string;
  frames: number;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    const draw = () => {
      if (cancelled || !canvasRef.current || !img.naturalWidth) return;
      const cells = Math.max(1, frames);
      const cellW = Math.floor(img.naturalWidth / cells);
      const cellH = img.naturalHeight;
      if (cellW < 1 || cellH < 1) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const scale = Math.min(size / cellW, size / cellH);
      const w = Math.max(1, Math.round(cellW * scale));
      const h = Math.max(1, Math.round(cellH * scale));
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, cellW, cellH, 0, 0, canvas.width, canvas.height);
    };
    img.onload = draw;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) draw();
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [src, frames, size]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pets-portrait shrink-0"
      style={{ height: size, width: size }}
    />
  );
}

/**
 * A den-mate strolling past along the bottom of the window. Fully self
 * contained: its own image, its own rAF, and it reports back when it's done so
 * the overlay can drop it.
 */
function VisitorCameo({
  pet,
  direction,
  onDone,
}: {
  pet: PetView;
  direction: 1 | -1;
  onDone: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const state = resolveState(pet.atlas.states, "walk");
    const spec = pet.atlas.states[state] ?? Object.values(pet.atlas.states)[0];
    if (!spec) {
      doneRef.current();
      return;
    }
    const img = new Image();
    img.src = `${pet.spriteBaseUrl}&state=${state}`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const started = performance.now();
    let last = started;
    let frame = 0;
    let clock = 0;
    let raf = 0;
    let finished = false;

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - started) / CAMEO_MS;
      if (t >= 1) {
        finished = true;
        doneRef.current();
        return;
      }
      raf = requestAnimationFrame(step);
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas || !img.complete || !img.naturalWidth) return;
      clock += dt * spec.fps;
      while (clock >= 1) {
        clock -= 1;
        frame = (frame + 1) % spec.frames;
      }
      const srcCellW = Math.floor(img.naturalWidth / spec.frames);
      const srcH = img.naturalHeight;
      if (srcCellW < 1 || srcH < 1) return;
      const contentFraction = Math.min(
        1,
        Math.max(0.3, (spec.contentHeight ?? spec.height * 0.9) / spec.height),
      );
      const height = CAMEO_CHAR_TARGET / contentFraction;
      const width = height * (srcCellW / srcH);
      const pxW = Math.max(1, Math.round(width * dpr));
      const pxH = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, pxW, pxH);
        ctx.translate(pxW / 2, pxH);
        ctx.scale(direction, 1);
        ctx.drawImage(img, frame * srcCellW, 0, srcCellW, srcH, -pxW / 2, -pxH, pxW, pxH);
      }
      const span = window.innerWidth + width * 2;
      const x = direction === 1 ? -width + t * span : window.innerWidth + width - t * span;
      wrap.style.transform = `translateX(${x}px)`;
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (!finished) cancelAnimationFrame(raf);
    };
  }, [pet, direction]);

  return (
    <div ref={wrapRef} className="pets-visitor" style={{ left: 0, transform: "translateX(-200px)" }}>
      <canvas ref={canvasRef} className="pets-canvas" />
    </div>
  );
}

interface CeremonyInfo {
  name: string;
  stageName: string;
  epithet: string;
  /** Bumped per evolution so a second ceremony REPLACES the first. */
  key: number;
}

/** Just enough of an atlas state to slice and scale one frame. */
interface CeremonySpec {
  frames: number;
  width: number;
  height: number;
  contentHeight?: number;
}

/**
 * The evolution set piece. Self-contained: one dim layer, one canvas, one
 * timeline, and it reports back when it's done (or when the user skips it by
 * clicking anywhere). Nothing here touches the pet's own render path — the
 * ceremony draws its own copy of frame 0 of the idle strip so the live pet can
 * keep animating underneath.
 *
 * Timeline (full motion):
 *   0–900ms    pure silhouette, scaling up
 *   ~900ms     white flash, brightness cross-fades back in over 350ms
 *   ~1300ms    name card fades up
 *   3200ms     auto-dismiss
 */
function EvolutionCeremony({
  info,
  spriteUrl,
  spec,
  reducedMotion,
  onDone,
}: {
  info: CeremonyInfo;
  spriteUrl: string;
  spec: CeremonySpec;
  reducedMotion: boolean;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  // false = pure silhouette, true = revealed. Drives a CSS filter transition
  // rather than a motion value: filters interpolate fine, and this keeps the
  // reveal independent of the scale animation running on the parent.
  const [revealed, setRevealed] = useState(false);

  // Hard budget. Whatever else happens, the ceremony ends here.
  useEffect(() => {
    const timer = setTimeout(
      () => doneRef.current(),
      reducedMotion ? CEREMONY_REDUCED_MS : CEREMONY_MS,
    );
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setRevealed(true), CEREMONY_SILHOUETTE_MS);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // One static frame, drawn once. Slicing geometry comes from the image BYTES
  // and the height is idle-anchored through contentHeight — the same rule the
  // main renderer uses, so the ceremony pet is the same character at a bigger
  // size rather than a differently-proportioned one.
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    const img = new Image();
    const draw = () => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas || !img.naturalWidth) return;
      const frames = Math.max(1, spec.frames);
      const srcCellW = Math.floor(img.naturalWidth / frames);
      const srcH = img.naturalHeight;
      if (srcCellW < 1 || srcH < 1) return;
      const refContentH = Math.max(1, spec.contentHeight ?? spec.height);
      const pixelScale = CEREMONY_CHAR_TARGET / refContentH;
      const height = spec.height * pixelScale;
      const width = srcCellW * pixelScale;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, srcCellW, srcH, 0, 0, canvas.width, canvas.height);
    };
    img.onload = draw;
    img.src = spriteUrl;
    if (img.complete && img.naturalWidth > 0) draw();
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [reducedMotion, spec, spriteUrl]);

  const card = (
    <div className="rounded-lg border border-border bg-card px-4 py-2 text-center shadow-lg">
      <div className="text-base font-semibold">{info.name}</div>
      <div className="text-xs text-muted-foreground">
        {info.stageName} · {info.epithet}
      </div>
    </div>
  );

  // Reduced motion: no dim, no silhouette, no flash — just the news, parked
  // above the pet's usual patch of floor.
  if (reducedMotion) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 96,
          left: "50%",
          zIndex: 44,
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "-50%" }}
        exit={{ opacity: 0, x: "-50%", transition: { duration: 0.3 } }}
        transition={{ duration: 0.2 }}
        onClick={() => doneRef.current()}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      role="presentation"
      className="pets-ceremony"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 44,
        pointerEvents: "auto",
        background: "rgb(0 0 0 / 0.55)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.2 }}
      onClick={() => doneRef.current()}
    >
      <div className="flex flex-col items-center gap-5">
        <motion.div
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
          initial={{ scale: 0.86 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: CEREMONY_SILHOUETTE_MS / 1000, ease: "easeOut" }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pets-ceremony-canvas"
            style={{
              filter: revealed ? "brightness(1)" : "brightness(0)",
              transitionDuration: `${CEREMONY_REVEAL_MS}ms`,
            }}
          />
          {/* The flash: a sibling, so it can bloom past the sprite's edges. */}
          <motion.div
            aria-hidden="true"
            className="pets-ceremony-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 0.6, delay: 0.75, times: [0, 0.35, 1], ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 1.3, ease: "easeOut" }}
        >
          {card}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Overlay({ pluginId }: { pluginId: string }) {
  const [data, setData] = useState<OverlayData | null>(null);
  const [fleet, setFleet] = useState<Fleet | null>(null);
  const [viewedThreadId, setViewedThreadId] = useState<string | null>(currentThreadId());
  const [spriteState, setSpriteState] = useState<SpriteState>("wave");
  const [bubble, setBubble] = useState<BubbleState | null>(null);
  // Measured placement for the live bubble: which side its tail hangs off, and
  // the left offset (anchor-relative px) that keeps it inside the window.
  const [bubbleFit, setBubbleFit] = useState<{ side: "left" | "right"; left: number } | null>(null);
  const [hearts, setHearts] = useState<Particle[]>([]);
  const [sparkles, setSparkles] = useState<Particle[]>([]);
  const [motes, setMotes] = useState<{ id: number; text: string }[]>([]);
  // Controlled: the desktop shell fires a spurious blur-driven close right
  // after opening, which dismissed the menu before it could be read.
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [den, setDen] = useState<RpcOutput<"listDen">["pets"] | null>(null);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [visitor, setVisitor] = useState<{ pet: PetView; direction: 1 | -1 } | null>(null);
  const [sessionHidden, setSessionHidden] = useState(false);
  const [napping, setNapping] = useState(false);
  const [evolving, setEvolving] = useState(false);
  // Non-null only while the evolution set piece is on screen. Set from the
  // post-evolution refetch (the signal carries a stage name, not the pet's own
  // freshly-settled row) and cleared on skip/auto-dismiss.
  const [ceremony, setCeremony] = useState<CeremonyInfo | null>(null);
  const [grabbed, setGrabbed] = useState(false);
  // Render mirrors of the two ref-driven props. They carry the SPAWN position
  // only — every frame after that writes the transform straight onto the node,
  // so a falling treat costs no React work at all.
  const [treatViews, setTreatViews] = useState<{ id: number; x: number; yBottom: number }[]>([]);
  const [ballView, setBallView] = useState<{ key: number; x: number; yBottom: number; fading: boolean } | null>(
    null,
  );
  const [treatBalance, setTreatBalance] = useState(0);
  const [highlight, setHighlight] = useState<HighlightState | null>(null);
  const [compact, setCompact] = useState(window.innerWidth < 768);
  // Onboarding tour: null = off, otherwise the 0-based step index.
  const [tour, setTour] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef(new Map<SpriteState, HTMLImageElement>());
  const momentRef = useRef<Moment | null>(null);
  const missionRef = useRef<Mission | null>(null);
  const lastActivityRef = useRef(Date.now());
  const lastBubbleRef = useRef(0);
  const lastAutoPointRef = useRef(0);
  const lastGlanceRef = useRef(0);
  const nextQuirkRef = useRef(Date.now() + QUIRK_EVERY_MS);
  const prevWaitingRef = useRef(0);
  const frameRef = useRef(0);
  // Frames advanced since the current state began — monotonic, so a play mode
  // can tell "still playing in" from "past the end".
  const rawFrameRef = useRef(0);
  const frameClockRef = useRef(0);
  // Flips on every frame advance of a locomotion pose; a footstep fires on 0,
  // so one step lands per two strip frames.
  const stepParityRef = useRef(0);
  const posRef = useRef<{ x: number | null; yBottom: number; parked: boolean }>({
    x: null,
    yBottom: GROUND_PX,
    parked: false,
  });
  const velRef = useRef({ vx: 0, vy: 0 });
  const airborneRef = useRef(false);
  const speedRef = useRef(0);
  const tiltRef = useRef(0);
  const facingRef = useRef<1 | -1>(1);
  const prefsAppliedRef = useRef(false);
  const roamRef = useRef<{ mode: "pause" | "stroll"; direction: 1 | -1; until: number }>({
    mode: "pause",
    direction: 1,
    until: 0,
  });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originYBottom: number;
    moved: boolean;
    trail: { x: number; y: number; t: number }[];
  } | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sizeSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef<SpriteState>("wave");
  const paintedRef = useRef<{
    state: SpriteState | null;
    frame: number;
    facing: number;
    tilt: number;
    x: number | null;
    y: number;
    scale: number;
  }>({ state: null, frame: -1, facing: 0, tilt: 0, x: null, y: -1, scale: 0 });
  const dataRef = useRef<OverlayData | null>(null);
  const fleetRef = useRef<Fleet | null>(null);
  const viewedRef = useRef<string | null>(viewedThreadId);
  const menuOpenRef = useRef(false);
  const nappingRef = useRef(false);
  const jobActiveRef = useRef(false);
  const prevStateRef = useRef<SpriteState>("idle");
  const sustainRef = useRef(new Map<string, { holdUntil: number; nextRemindAt: number }>());
  const atlasRef = useRef<NonNullable<OverlayData["pet"]>["atlas"] | null>(null);
  const lastHighlightRectRef = useRef<HighlightState["rect"] | null>(null);
  // threadId → last time we pointed at it. Stops the auto-pointer from
  // re-flagging the same still-waiting thread every cooldown, forever.
  const pointedMemoryRef = useRef(new Map<string, number>());
  // Reused per-tick scratch so the brain doesn't allocate every frame.
  const candidatesRef = useRef<[string, SpriteState][]>([]);
  const menuOpenedAtRef = useRef(0);
  // Explicit destination (menu "Send to…" or ⌘-click). Beats roaming, loses to
  // missions; cleared on arrival.
  const walkTargetRef = useRef<number | null>(null);
  // Last painted sprite width — hit-testing and walk targets need it outside
  // the loop.
  const widthRef = useRef(BASE_CHAR_HEIGHT);
  const awayCountsRef = useRef({ completed: 0, failed: 0 });
  const awaySinceRef = useRef<number | null>(null);
  const nudgedThreadsRef = useRef(new Set<string>());
  const lastNudgeRef = useRef(0);
  const turnsTodayRef = useRef({ key: "", count: 0 });
  const cameoDirectionRef = useRef<1 | -1>(1);
  // --- director state ---
  const personaRef = useRef<Persona>(DEFAULT_PERSONA);
  const lastMouseXRef = useRef<number | null>(null);
  const recentLinesRef = useRef<string[]>([]);
  // >0 while a zoomies run is in flight: boosts walk-to speed and reads as "run".
  const zoomiesRef = useRef(0);
  // --- treats + fetch ---
  const treatsRef = useRef<Treat[]>([]);
  /** DOM nodes of the live treats, keyed by id — the loop paints through these. */
  const treatElsRef = useRef(new Map<number, HTMLElement>());
  /** id of the treat the pet is currently walking to, if any. */
  const snackTargetRef = useRef<number | null>(null);
  /** Wall-clock end of the post-treat sparkle buff. */
  const buffUntilRef = useRef(0);
  const nextBuffSparkleRef = useRef(0);
  const ballRef = useRef<Ball | null>(null);
  const ballElRef = useRef<HTMLDivElement | null>(null);
  // True for the whole fetch (chase AND carry): sits alongside zoomies in the
  // speed boost and in deriveState's run check.
  const fetchActiveRef = useRef(false);
  const nextChaseRef = useRef(0);
  /** Timeouts owned by treats/fetch, so unmount can drop every one of them. */
  const playTimersRef = useRef(new Set<ReturnType<typeof setTimeout>>());
  // Last painted sprite height — the carried ball rides above the pet's head.
  const heightRef = useRef(BASE_CHAR_HEIGHT);
  const autoNapRef = useRef(false);
  // --- composer courtesy ---
  // True while a textarea/contenteditable holds keyboard focus: walking past an
  // idle input is fine, standing on one being typed into is not.
  const composerFocusedRef = useRef(false);
  // Throttled measurement of the composer, plus the last ghost verdict so the
  // class only gets toggled on change.
  const composerRectsRef = useRef<DOMRect[]>([]);
  const composerStampRef = useRef(0);
  const ghostRef = useRef(false);
  // --- terrain (the composer as a ledge) ---
  // True while the pet is mid-step between two ground elevations: deriveState
  // reads it so the climb reads as a jump, and it doubles as the rising edge.
  const ledgeSteppingRef = useRef(false);
  // Slightly looser than the stepping flag — drives the "jump" pose only while
  // the gap is actually visible.
  const ledgeClimbRef = useRef(false);
  const ledgeBoingRef = useRef(0);
  const bubbleVisibleRef = useRef(false);
  const mountedAtRef = useRef(Date.now());
  // --- staleness handshake ---
  // The server stamps every getOverlay with the bundle it is serving. The FIRST
  // successful load pins the stamp this page is running; any later fetch that
  // reports a different one means the plugin was rebuilt under us, and the
  // running JS is now the old build. Nudged exactly once per page life.
  const bundleStampRef = useRef<string | null>(null);
  const staleShownRef = useRef(false);
  // The live bubble node, measured so the bubble can be kept on screen.
  const bubbleElRef = useRef<HTMLButtonElement | null>(null);
  // --- dev feed / perf guardrails ---
  // Label of the director act currently in flight, for the dev feed.
  const currentActRef = useRef<string | null>(null);
  // Rolling one-second frame counters: every rAF callback vs the ones that ran
  // the full tick. The gap between them IS the idle-throttle working.
  const fpsRef = useRef({ fps: 0, tickFps: 0 });
  // True while the loop is stopped because the document is hidden.
  const loopPausedRef = useRef(false);
  dataRef.current = data;
  fleetRef.current = fleet;
  viewedRef.current = viewedThreadId;
  menuOpenRef.current = menuOpenState;
  nappingRef.current = napping;
  bubbleVisibleRef.current = !!bubble;
  personaRef.current = readPersona(data?.settings);

  const reducedMotion = useMemo(() => {
    if (data?.settings.reducedMotion === "on") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [data?.settings.reducedMotion]);

  // Settings the server may not have shipped yet: read through a widened view
  // so this file compiles either side of the schema landing.
  const extraSettings = data?.settings as
    | { soundVolume?: "quiet" | "normal"; seasonalFlair?: boolean }
    | undefined;
  const soundVolume = extraSettings?.soundVolume ?? "normal";
  const seasonalFlair = extraSettings?.seasonalFlair ?? true;

  // Voice: one seed per pet, so every blip this pet makes is pitched and
  // timbred like itself and not like its den-mate.
  const petId = data?.pet?.id ?? null;
  useEffect(() => {
    if (!petId) return;
    setVoiceSeed(djb2(petId));
  }, [petId]);

  useEffect(() => {
    setSoundVolume(soundVolume);
  }, [soundVolume]);

  // A seasonal accent picked once per mount — an accent, not a costume.
  const seasonal = useMemo(() => {
    const month = new Date().getMonth();
    return month === 11 ? "🎅" : month === 9 ? "🎃" : month === 0 ? "❄️" : null;
  }, []);

  // --- helpers ---------------------------------------------------------------

  const pulseClass = useCallback((className: string, ms: number) => {
    const el = bodyRef.current;
    if (!el) return;
    el.classList.remove(className);
    // force reflow so re-adding restarts the animation
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), ms);
  }, []);

  const showBubble = useCallback(
    (text: string, options?: { threadId?: string; projectId?: string; important?: boolean }) => {
      if (nappingRef.current && !options?.important) return;
      const frequency = dataRef.current?.settings.bubbles ?? "normal";
      if (frequency === "off" && !options?.important) return;
      const interval = BUBBLE_INTERVALS[frequency] ?? BUBBLE_INTERVALS.normal!;
      const now = Date.now();
      if (!options?.important && now - lastBubbleRef.current < interval) return;
      lastBubbleRef.current = now;
      logDebug("bubble", text.slice(0, 40));
      const x = posRef.current.x ?? 0;
      setBubble({
        text,
        threadId: options?.threadId,
        projectId: options?.projectId,
        until: now + BUBBLE_MS,
        side: x > window.innerWidth - 300 ? "right" : "left",
      });
    },
    [],
  );

  const burstHearts = useCallback((count = 5) => {
    const burst: Particle[] = Array.from({ length: count }, () => ({
      id: particleSeq++,
      dx: (Math.random() - 0.5) * 64,
      dy: -(24 + Math.random() * 44),
      char: "♥",
    }));
    setHearts((prev) => [...prev.slice(-6), ...burst]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !burst.some((b) => b.id === h.id)));
    }, 1400);
  }, []);

  const burstSparkles = useCallback(() => {
    const chars = ["✦", "✧", "∗", "✶"];
    const burst: Particle[] = Array.from({ length: 14 }, (_, i) => ({
      id: particleSeq++,
      dx: Math.cos((i / 14) * Math.PI * 2) * (34 + Math.random() * 46),
      dy: Math.sin((i / 14) * Math.PI * 2) * (26 + Math.random() * 40) - 24,
      char: chars[i % chars.length]!,
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 1700);
  }, []);

  // Wider, heavier cousin of the sparkle burst — evolution only.
  const burstConfetti = useCallback(() => {
    const chars = ["🎉", "✦", "■", "▲"];
    const burst: Particle[] = Array.from({ length: 24 }, (_, i) => ({
      id: particleSeq++,
      dx: (Math.random() - 0.5) * 480,
      dy: -(40 + Math.random() * 160),
      char: chars[i % chars.length]!,
    }));
    setConfetti(burst);
    setTimeout(() => setConfetti([]), 2100);
  }, []);

  const hop = useCallback((strength = 240) => {
    if (reducedMotion) return;
    if (!airborneRef.current && !posRef.current.parked) {
      airborneRef.current = true;
      velRef.current.vy = strength;
    }
  }, [reducedMotion]);

  /**
   * One dial for "something good happened", so the loudness of a reaction is a
   * property of the EVENT rather than of whichever call site got written first.
   *
   * minor    — a nod: a small hop and the soft petting chirp, nothing on screen.
   * standard — the everyday win: the celebrate pose, a sparkle burst, a chirp.
   * major    — a landmark: a longer pose, sparkles AND confetti, the fanfare.
   *
   * The evolution ceremony keeps its own bespoke path (glow + `sounds.evolve`),
   * so `major` deliberately borrows the hatch fanfare instead — the evolution
   * sting stays unique to evolution.
   */
  const celebrateTier = useCallback(
    (tier: "minor" | "standard" | "major") => {
      if (tier === "minor") {
        hop(160);
        sounds.pet();
        return;
      }
      if (tier === "major") {
        momentRef.current = { state: "celebrate", until: Date.now() + 2200 };
        burstSparkles();
        burstConfetti();
        sounds.hatch();
        return;
      }
      // standard = exactly the pre-tier behavior (a bare celebrate moment);
      // the sparkle/sound budget belongs to major, not to every turn.
      momentRef.current = { state: "celebrate", until: Date.now() + MOMENT_MS };
    },
    [burstConfetti, burstSparkles, hop],
  );

  const petThePet = useCallback(() => {
    const pet = dataRef.current?.pet;
    if (!pet) return;
    if (nappingRef.current) setNapping(false);
    burstHearts();
    momentRef.current = { state: "love", until: Date.now() + 1400 };
    hop(210);
    sounds.pet();
    void rpc(pluginId, "petPet", { petId: pet.id }).catch(() => {});
  }, [burstHearts, hop, pluginId]);

  const navigateTo = useCallback((path: string) => {
    history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  // Staleness handshake. The stamp is added by the server half of this
  // feature, so it is read through a widened view (same idiom as
  // extraSettings) and an absent/empty stamp simply never nudges. The first
  // non-null stamp seen from ANY source (fetch, server boot, fleet) pins the
  // baseline this page is running.
  const checkBundleStamp = useCallback(
    (stamp: unknown) => {
      if (typeof stamp !== "string" || stamp.length === 0) return;
      if (bundleStampRef.current === null) {
        bundleStampRef.current = stamp;
      } else if (stamp !== bundleStampRef.current && !staleShownRef.current) {
        staleShownRef.current = true;
        logDebug("stale", stamp.slice(0, 16));
        showBubble("i got an update. reload the window (⌘R) to meet the new me.", {
          important: true,
        });
      }
    },
    [showBubble],
  );

  const refetch = useCallback(() => {
    return rpc(pluginId, "getOverlay").then((next) => {
      setData(next);
      setFleet(next.fleet);
      setSoundsEnabled(next.settings.sounds);
      // Stored placement seeds the pet once. Later refetches (xp, settings,
      // reconnects) must never yank a walking/tossed pet back to its saved spot.
      if (!prefsAppliedRef.current) {
        prefsAppliedRef.current = true;
        const pos = posRef.current;
        if (pos.x === null && next.prefs.x !== null) {
          pos.x = next.prefs.x * window.innerWidth;
        }
        if (next.prefs.parked && next.prefs.y !== null) {
          pos.parked = true;
          pos.yBottom = next.prefs.y;
        }
      }
      checkBundleStamp((next as { bundleStamp?: unknown }).bundleStamp);
      // Returned so callers that need the FRESH row (the evolution ceremony
      // reads the new stage off it) don't have to race the state update.
      return next;
    });
  }, [pluginId, checkBundleStamp]);

  const refetchQuiet = useCallback(() => {
    void refetch().catch(() => {});
  }, [refetch]);

  const persistPrefs = useCallback(() => {
    const pos = posRef.current;
    void rpc(pluginId, "setOverlayPrefs", {
      x: pos.x === null ? null : Math.min(1, Math.max(0, pos.x / window.innerWidth)),
      y: pos.parked ? Math.round(pos.yBottom) : null,
      // Sizing is per-pet now (pet.sizeScale); the global scale is vestigial.
      scale: 1,
      parked: pos.parked,
    }).catch(() => {});
  }, [pluginId]);

  const startMission = useCallback(
    (thread: FleetThreadView) => {
      if (posRef.current.parked || nappingRef.current) {
        showBubble(`“${thread.title}” needs you.`, {
          threadId: thread.id,
          projectId: thread.projectId,
          important: true,
        });
        return;
      }
      const element = threadRowFor(thread.id);
      if (!element) {
        showBubble(`“${thread.title}” needs you (it's not in the sidebar right now).`, {
          threadId: thread.id,
          projectId: thread.projectId,
          important: true,
        });
        return;
      }
      logDebug("mission", thread.title.slice(0, 40));
      missionRef.current = {
        thread,
        element,
        phase: "walk",
        until: Date.now() + 20_000,
        arrived: false,
      };
    },
    [showBubble],
  );

  const pointAtAttention = useCallback(() => {
    void rpc(pluginId, "getAttentionThreads")
      .then(({ threads }) => {
        const target = threads[0];
        // Manual pointing ignores the memory, but still stamps it: an explicit
        // point quiets the auto-pointer for that thread too.
        if (target) {
          pointedMemoryRef.current.set(target.id, Date.now());
          startMission(target);
        }
        else showBubble("Nothing needs you. Enjoy it while it lasts.", { important: true });
      })
      .catch(() => {});
  }, [pluginId, showBubble, startMission]);

  const fetchLatestFailure = useCallback(() => {
    void rpc(pluginId, "getAttentionThreads")
      .then(({ threads }) => {
        const failed = threads.find((thread) => thread.status === "failed");
        if (failed) navigateToThread(failed.projectId, failed.id);
        else showBubble("No failures. Frame this moment.", { important: true });
      })
      .catch(() => {});
  }, [pluginId, showBubble]);

  // Optimistic locally, debounced to the server — shared by the wheel gesture
  // and the menu's size row so both agree on clamping and write cadence.
  const nudgeSize = useCallback(
    (delta: number) => {
      const petId = dataRef.current?.pet?.id;
      if (!petId) return;
      const current = dataRef.current?.pet?.sizeScale ?? 1;
      const next = Math.min(2.5, Math.max(0.5, Math.round((current + delta) * 100) / 100));
      if (next === current) return;
      setData((prev) => (prev?.pet ? { ...prev, pet: { ...prev.pet, sizeScale: next } } : prev));
      if (sizeSaveRef.current) clearTimeout(sizeSaveRef.current);
      sizeSaveRef.current = setTimeout(() => {
        sizeSaveRef.current = null;
        void rpc(pluginId, "setPetSize", { petId, scale: next }).catch(() => {});
      }, 400);
    },
    [pluginId],
  );

  /**
   * The composers as terrain: each visual card, approximated by expanding the
   * input's own rect (the card's padding/border live outside the textarea).
   * One band per pane — split panes each get their own ledge. Throttled — this
   * is a layout read the loop can't afford every frame — and shared with the
   * ghosting safety net below.
   */
  const composerBands = useCallback((): Array<{ left: number; right: number; top: number }> => {
    const now = performance.now();
    if (now - composerStampRef.current > COMPOSER_POLL_MS) {
      composerStampRef.current = now;
      composerRectsRef.current = composerRects();
    }
    return composerRectsRef.current.map((rect) => ({
      left: rect.left - 12,
      right: rect.right + 12,
      top: rect.top - 10,
    }));
  }, []);

  /** The band a pet CENTRE x currently stands over, if any. */
  const bandAt = useCallback(
    (centerX: number): { left: number; right: number; top: number } | null => {
      for (const band of composerBands()) {
        if (centerX >= band.left - LEDGE_EDGE_SLACK && centerX <= band.right + LEDGE_EDGE_SLACK) {
          return band;
        }
      }
      return null;
    },
    [composerBands],
  );

  /**
   * Ground elevation (as a yBottom) under a pet CENTRE x: the composer's top
   * edge while over it, the floor everywhere else. Overlapping bands (a pane
   * boundary) resolve to the highest ledge, so the pet never clips into one.
   */
  const terrainAt = useCallback(
    (centerX: number): number => {
      let elevation = GROUND_PX;
      for (const band of composerBands()) {
        if (centerX < band.left - LEDGE_EDGE_SLACK || centerX > band.right + LEDGE_EDGE_SLACK) {
          continue;
        }
        elevation = Math.max(elevation, window.innerHeight - band.top);
      }
      return Math.min(LEDGE_MAX, Math.max(GROUND_PX, elevation));
    },
    [composerBands],
  );

  /**
   * No-loiter: push a STATIONARY destination (pet-centre x) just off the ledge,
   * so naps/sits/digs never happen on top of the input. Explicit user
   * destinations skip this — crossing and standing briefly is allowed.
   */
  const nudgeOffLedge = useCallback(
    (centerX: number): number => {
      const band = bandAt(centerX);
      if (!band) return centerX;
      const left = band.left - LEDGE_EDGE_SLACK;
      const right = band.right + LEDGE_EDGE_SLACK;
      const width = widthRef.current;
      const minC = EDGE_MARGIN + width / 2;
      const maxC = Math.max(minC, window.innerWidth - EDGE_MARGIN - width / 2);
      const outLeft = left - LEDGE_CLEARANCE;
      const outRight = right + LEDGE_CLEARANCE;
      const near = Math.abs(centerX - outLeft) <= Math.abs(centerX - outRight) ? outLeft : outRight;
      const clamped = Math.min(Math.max(near, minC), maxC);
      // Clamping can shove the near side back onto the ledge (composer flush
      // against a window edge) — in that case take the other side.
      if (clamped >= left && clamped <= right) {
        const far = near === outLeft ? outRight : outLeft;
        return Math.min(Math.max(far, minC), maxC);
      }
      return clamped;
    },
    [bandAt],
  );

  /** Send the pet walking to an absolute left-edge x, clamped to the window. */
  const walkTo = useCallback((x: number) => {
    const width = widthRef.current;
    const maxX = Math.max(EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN);
    walkTargetRef.current = Math.min(Math.max(x, EDGE_MARGIN), maxX);
    const pos = posRef.current;
    if (pos.parked) {
      // A perched pet can't walk; drop it first, physics will land it.
      pos.parked = false;
      airborneRef.current = true;
      velRef.current = { vx: 0, vy: 0 };
    }
  }, []);

  /** walkTo for AUTONOMOUS, stationary destinations — keeps them off the ledge. */
  const walkToClear = useCallback(
    (x: number) => {
      const width = widthRef.current;
      walkTo(nudgeOffLedge(x + width / 2) - width / 2);
    },
    [nudgeOffLedge, walkTo],
  );

  const sendToFraction = useCallback(
    (fraction: number) => walkTo(window.innerWidth * fraction - widthRef.current / 2),
    [walkTo],
  );

  // --- onboarding tour -------------------------------------------------------
  // Ten short cards parked next to the pet, and where a feature can be SHOWN
  // rather than described, the step's `demo` shows it: the pet waves hello,
  // walks a demonstration lap, hops onto the composer ledge, throws a party at
  // the end. The tour is skippable, re-runnable (menu + panel button), and
  // deliberately quiet-cased — see the director's busy predicate.
  const tourRef = useRef<number | null>(null);
  tourRef.current = tour;
  const tourCardRef = useRef<HTMLDivElement | null>(null);
  // Last step whose demo has run, so a re-render (or a drag mid-step) can never
  // fire the same demonstration twice.
  const tourDemoedRef = useRef<number | null>(null);

  const finishTour = useCallback(() => {
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
      // Private mode / storage disabled: the tour just runs again next time.
    }
    setTour(null);
  }, []);

  const startTour = useCallback(() => {
    tourDemoedRef.current = null;
    setTour(0);
  }, []);

  const TOUR_STEPS: Array<{ text: string; demo?: () => void }> = [
    {
      text: "hi. i'm your pet. i live in your bb now.",
      demo: () => {
        momentRef.current = { state: "wave", until: Date.now() + 1500 };
        sounds.greet();
      },
    },
    { text: "right-click me for everything — missions, treats, my size, naps." },
    {
      text: "⌘-click anywhere on the floor and i'll walk there.",
      demo: () => {
        const x = posRef.current.x ?? 0;
        walkTo(x + (x < window.innerWidth / 2 ? 220 : -220));
      },
    },
    { text: "drag me around. toss me — real physics. drop me on a thread row to open it." },
    {
      text: "your message box is my rooftop — i hop on top, never over your typing.",
      demo: () => {
        const band = composerBands()[0];
        if (!band) return;
        walkTo((band.left + band.right) / 2 - widthRef.current / 2);
      },
    },
    { text: "when a thread needs you, i walk over and point at it. click me then and i'll take you there." },
    { text: "every 10 finished turns drops a treat i'll go eat. and there's fetch in my menu. i always win." },
    { text: "i have moods — funny, chaotic, sarcastic, helpful, cozy. tune them in my panel, plus how often i act up." },
    { text: "the paw button at the bottom of the sidebar summons my options. the Pets panel has my den, hatchery, diary, and stats." },
    {
      text: "that's the tour. back to work — both of us.",
      demo: () => celebrateTier("minor"),
    },
  ];
  const TOUR_LAST = TOUR_STEPS.length - 1;
  // The steps close over live helpers, so the demo effect reads them through a
  // ref instead of taking a freshly-built array as a dependency.
  const tourStepsRef = useRef(TOUR_STEPS);
  tourStepsRef.current = TOUR_STEPS;

  // First run only: armed once, as soon as there's a pet on screen and the
  // overlay is enabled. The ref guard keeps a data refresh from restarting the
  // countdown forever.
  const tourArmedRef = useRef(false);
  useEffect(() => {
    if (tourArmedRef.current) return;
    try {
      if (localStorage.getItem(TOUR_KEY)) {
        tourArmedRef.current = true;
        return;
      }
    } catch {
      tourArmedRef.current = true;
      return;
    }
    if (!dataRef.current?.pet || !dataRef.current.settings.enabled) return;
    tourArmedRef.current = true;
    const id = setTimeout(() => setTour(0), TOUR_AUTOSTART_MS);
    return () => clearTimeout(id);
  }, [data]);

  // Re-runnable from anywhere: the Pets panel button, the pet's own menu.
  useEffect(() => {
    const onStart = () => startTour();
    window.addEventListener("pets:start-tour", onStart);
    return () => window.removeEventListener("pets:start-tour", onStart);
  }, [startTour]);

  // One demo per step, exactly once, when the step becomes active.
  useEffect(() => {
    if (tour === null) {
      tourDemoedRef.current = null;
      return;
    }
    if (tourDemoedRef.current === tour) return;
    tourDemoedRef.current = tour;
    tourStepsRef.current[tour]?.demo?.();
  }, [tour]);

  // Escape bails out, same as "skip".
  useEffect(() => {
    if (tour === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finishTour, tour]);

  // The card follows the pet: position lives in a ref and moves every frame,
  // so the card is placed by the same loop cadence rather than by re-rendering.
  // Above the pet normally, below it when the pet is up in the top half. Layout
  // effect so the first placement lands BEFORE paint — no corner flash.
  useLayoutEffect(() => {
    if (tour === null) return;
    let raf = 0;
    const place = () => {
      raf = requestAnimationFrame(place);
      const node = tourCardRef.current;
      if (!node) return;
      const pos = posRef.current;
      const cardW = node.offsetWidth || 240;
      const cardH = node.offsetHeight || 96;
      const centerX = (pos.x ?? 0) + widthRef.current / 2;
      const petTop = window.innerHeight - pos.yBottom - heightRef.current;
      const maxLeft = Math.max(EDGE_MARGIN, window.innerWidth - cardW - EDGE_MARGIN);
      const left = Math.min(Math.max(centerX - cardW / 2, EDGE_MARGIN), maxLeft);
      const maxTop = Math.max(EDGE_MARGIN, window.innerHeight - cardH - EDGE_MARGIN);
      const top =
        petTop < window.innerHeight / 2
          ? Math.min(window.innerHeight - pos.yBottom + 12, maxTop)
          : Math.min(Math.max(petTop - cardH - 12, EDGE_MARGIN), maxTop);
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
    };
    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [tour]);

  // --- treats + fetch --------------------------------------------------------

  /** A timeout that unmount is guaranteed to clear. */
  const playTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      playTimersRef.current.delete(id);
      fn();
    }, ms);
    playTimersRef.current.add(id);
  }, []);

  /** Republish the treat list to React — spawn/despawn only, never per-frame. */
  const syncTreats = useCallback(() => {
    setTreatViews(treatsRef.current.map((t) => ({ id: t.id, x: t.x, yBottom: t.yBottom })));
  }, []);

  /** Drop a treat in at a horizontal fraction of the window (0..1). */
  const dropTreatAt = useCallback(
    (fraction: number) => {
      const maxX = Math.max(24, window.innerWidth - 48);
      const x = Math.min(Math.max(fraction * window.innerWidth, 24), maxX);
      const treat: Treat = {
        id: Date.now() + Math.random(),
        x,
        yBottom: window.innerHeight,
        vy: 0,
        landed: false,
        bounced: false,
      };
      // Three on the floor at once is plenty; a fourth pushes the oldest out.
      const next = [...treatsRef.current, treat].slice(-TREAT_MAX);
      treatsRef.current = next;
      if (snackTargetRef.current !== null && !next.some((t) => t.id === snackTargetRef.current)) {
        snackTargetRef.current = null;
      }
      syncTreats();
      logDebug("treat", "drop");
    },
    [syncTreats],
  );

  /** One small sparkle — the visible half of the post-treat buff. */
  const spawnBuffSparkle = useCallback(() => {
    const id = particleSeq++;
    const piece: Particle = {
      id,
      dx: (Math.random() - 0.5) * 44,
      dy: -(16 + Math.random() * 28),
      char: Math.random() < 0.5 ? "✦" : "✧",
    };
    setSparkles((prev) => [...prev.slice(-8), piece]);
    playTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 1400);
  }, [playTimeout]);

  /** Tear a fetch down mid-flight: no ball, no boost, no lingering target. */
  const cancelFetch = useCallback(() => {
    const had = !!ballRef.current;
    ballRef.current = null;
    fetchActiveRef.current = false;
    nextChaseRef.current = 0;
    if (had) {
      walkTargetRef.current = null;
      setBallView(null);
      logDebug("fetch", "cancel");
    }
  }, []);

  /** Throw the ball. One at a time, and never under reduced motion. */
  const startFetch = useCallback(() => {
    if (reducedMotion || ballRef.current) return;
    const pos = posRef.current;
    const width = widthRef.current;
    const originX = pos.x ?? 0;
    const center = originX + width / 2;
    // A perched pet can't chase, so the throw drops it first (same move walkTo
    // makes) and physics lands it.
    if (pos.parked) {
      pos.parked = false;
      airborneRef.current = true;
      velRef.current = { vx: 0, vy: 0 };
    }
    // Away from the nearest wall, so the throw has room to travel.
    const direction = center < window.innerWidth / 2 ? 1 : -1;
    ballRef.current = {
      x: center - BALL_SIZE / 2,
      yBottom: pos.yBottom + heightRef.current * 0.55,
      vx: direction * (380 + Math.random() * 220),
      vy: BALL_THROW_VY,
      phase: "flying",
      originX,
      startedAt: Date.now(),
    };
    fetchActiveRef.current = true;
    nextChaseRef.current = 0;
    setBallView({
      key: Date.now(),
      x: ballRef.current.x,
      yBottom: ballRef.current.yBottom,
      fading: false,
    });
    sounds.boing();
    logDebug("fetch", "throw");
  }, [reducedMotion]);

  // Threads that have been "active" for ages: one nudge per thread, and never
  // more than one nudge per 5 minutes overall.
  const checkLongRunners = useCallback(
    (snapshot: Fleet) => {
      const now = Date.now();
      if (now - lastNudgeRef.current < LONG_RUN_NUDGE_COOLDOWN_MS) return;
      const seen = nudgedThreadsRef.current;
      for (const thread of snapshot.threads) {
        if (thread.status !== "active") continue;
        const elapsed = now - thread.updatedAt;
        if (elapsed <= LONG_RUN_AFTER_MS || seen.has(thread.id)) continue;
        seen.add(thread.id);
        lastNudgeRef.current = now;
        showBubble(
          `“${thread.title}” has been running ${Math.round(elapsed / 60_000)}m. Just saying.`,
          { threadId: thread.id, projectId: thread.projectId },
        );
        return;
      }
    },
    [showBubble],
  );

  // --- data wiring -----------------------------------------------------------

  useEffect(() => {
    const controller = new AbortController();
    // The very first load decides whether the pet exists at all — a single
    // flaky response would leave the overlay blank until some later signal.
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    // The delayed post-evolution refetch that opens the ceremony.
    let ceremonyTimer: ReturnType<typeof setTimeout> | null = null;
    refetch().catch(() => {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        if (!controller.signal.aborted) refetchQuiet();
      }, 1500);
    });
    watchRoute((threadId) => setViewedThreadId(threadId), controller.signal);
    connectSignals({
      pluginId,
      channel: "pets",
      signal: controller.signal,
      onReconnect: refetchQuiet,
      onSignal: (payload) => {
        const signal = payload as {
          kind?: string;
          fleet?: Fleet;
          moment?: "celebrate" | "sad";
          threadId?: string;
          title?: string;
          amount?: number;
          xp?: number;
          stageIndex?: number;
          stageName?: string;
          evolved?: boolean;
          petId?: string;
          source?: string;
          /** treat-drop: horizontal landing spot, as a 0..1 fraction. */
          x?: number;
          /** treat-earned: the wallet's new balance. */
          balance?: number;
        };
        lastActivityRef.current = Date.now();
        switch (signal.kind) {
          case "fleet":
            if (signal.fleet) {
              setFleet(signal.fleet);
              checkLongRunners(signal.fleet);
            }
            checkBundleStamp((payload as { bundleStamp?: unknown }).bundleStamp);
            break;
          // A plugin reload restarts the server without closing this socket,
          // so the boot announce is the only stamp that arrives on reload.
          case "server-boot":
            checkBundleStamp((payload as { bundleStamp?: unknown }).bundleStamp);
            break;
          case "job":
            jobActiveRef.current = !!(payload as { job?: unknown }).job;
            break;
          case "moment": {
            if (!signal.moment) break;
            logDebug("signal", signal.moment);
            // Tally what happened while the window was in the background; the
            // digest lands when the user comes back.
            if (document.hidden) {
              if (signal.moment === "celebrate") awayCountsRef.current.completed += 1;
              else if (signal.moment === "sad") awayCountsRef.current.failed += 1;
            }
            if (nappingRef.current) break;
            const behavior = dataRef.current?.settings;
            if (signal.moment === "sad") {
              if (!(behavior?.reactFailures ?? true)) break;
              // Failure startle: flinch first, settle into sad a beat later.
              momentRef.current = { state: "startled", until: Date.now() + 900 };
              setTimeout(() => {
                momentRef.current = { state: "sad", until: Date.now() + 1900 };
              }, 900);
              sounds.womp();
              if (signal.title) {
                showBubble(`“${signal.title}” failed. We blame the tooling.`, {
                  threadId: signal.threadId,
                });
              }
            } else if (behavior?.reactTurnComplete ?? true) {
              // An ordinary finished turn is the baseline, not a landmark.
              celebrateTier("standard");
            }
            break;
          }
          case "xp": {
            // Daily turn milestones, counted client-side against local midnight.
            if (signal.source === "turn-completed") {
              const key = new Date().toDateString();
              const tracker = turnsTodayRef.current;
              if (tracker.key !== key) {
                tracker.key = key;
                tracker.count = 0;
              }
              tracker.count += 1;
              if (tracker.count % 10 === 0) {
                // A round-number day IS a landmark — this is the loud one.
                celebrateTier("major");
                showBubble(`${tracker.count} turns today. Carried.`, { important: false });
              }
            }
            setData((prev) => {
              if (!prev?.pet || prev.pet.id !== signal.petId) return prev;
              return {
                ...prev,
                pet: {
                  ...prev.pet,
                  xp: signal.xp ?? prev.pet.xp,
                  stage: signal.stageName
                    ? {
                        ...prev.pet.stage,
                        index: signal.stageIndex ?? prev.pet.stage.index,
                        name: signal.stageName,
                      }
                    : prev.pet.stage,
                },
              };
            });
            if (signal.evolved && signal.stageName) {
              // The signal only carries the new stage name; nextStage targets,
              // artBehind (the Glow-up item) and the rest live on the row the
              // server is still settling. Refetch once it has — and hand the
              // fresh row straight to the ceremony, which needs the pet's name
              // and epithet, not just the stage label.
              //
              // `signal.evolved` is the server's stage-INCREASE flag, so an
              // ordinary refetch or a reconnect can never land here.
              if (ceremonyTimer) clearTimeout(ceremonyTimer);
              ceremonyTimer = setTimeout(() => {
                ceremonyTimer = null;
                void refetch()
                  .then((next) => {
                    if (controller.signal.aborted || !next.pet) return;
                    if (!(next.settings.evolutionCeremony ?? true)) return;
                    // Replacing the whole object (new key) swaps any ceremony
                    // still on screen instead of stacking a second one.
                    setCeremony({
                      name: next.pet.name,
                      stageName: next.pet.stage.name,
                      epithet: next.pet.stage.epithet,
                      key: Date.now(),
                    });
                  })
                  .catch(() => {});
              }, 800);
            }
            if (
              signal.evolved &&
              signal.stageName &&
              (dataRef.current?.settings.evolutionCeremony ?? true)
            ) {
              // Evolution ceremony: freeze into celebrate, glow, sparkle burst,
              // hop, fanfare — then the bubble lands the news.
              momentRef.current = { state: "dance", until: Date.now() + 4200 };
              setEvolving(true);
              setTimeout(() => setEvolving(false), 4200);
              burstSparkles();
              burstConfetti();
              hop(300);
              sounds.evolve();
              const stageName = signal.stageName;
              setTimeout(
                () => showBubble(`Evolved. ${stageName} now. Act natural.`, { important: true }),
                700,
              );
            } else if (
              typeof signal.amount === "number" &&
              signal.amount >= 10 &&
              (dataRef.current?.settings.xpMotes ?? true)
            ) {
              const id = particleSeq++;
              setMotes((prev) => [...prev.slice(-3), { id, text: `+${signal.amount}` }]);
              setTimeout(() => setMotes((prev) => prev.filter((m) => m.id !== id)), 1500);
            }
            break;
          }
          case "glowup-available":
            // Fresh artwork for the current stage is available but not applied:
            // the pet mentions it, and the menu does the rest. Never talks over
            // a bubble that's already up.
            if (signal.stageName && !bubbleVisibleRef.current) {
              showBubble(`i can look like a proper ${signal.stageName} now. glow up is in my menu.`, {
                important: false,
              });
            }
            break;
          case "treat-earned":
            if (typeof signal.balance === "number") setTreatBalance(signal.balance);
            // Never talk over something the pet is already saying.
            if (!bubbleVisibleRef.current) showBubble("treat earned. i saw it first.");
            break;
          case "treat-drop": {
            if (typeof signal.balance === "number") setTreatBalance(signal.balance);
            const fraction = typeof signal.x === "number" ? signal.x : Math.random();
            dropTreatAt(fraction);
            break;
          }
          case "hatched":
            sounds.hatch();
            burstSparkles();
            refetchQuiet();
            break;
          case "evolved-art":
          case "pet-changed":
          case "settings-changed":
            refetchQuiet();
            break;
          default:
            break;
        }
      },
    });
    return () => {
      controller.abort();
      if (retryTimer) clearTimeout(retryTimer);
      if (ceremonyTimer) clearTimeout(ceremonyTimer);
    };
  }, [
    burstConfetti,
    burstSparkles,
    celebrateTier,
    checkBundleStamp,
    checkLongRunners,
    dropTreatAt,
    hop,
    pluginId,
    refetch,
    refetchQuiet,
    showBubble,
  ]);

  // Ceremony preview (dev only — the dev card's button dispatches it). Replays
  // the set piece with the CURRENT pet, so the thing being previewed is the
  // thing that would actually appear. A fresh key replaces any ceremony still
  // on screen rather than stacking a second one.
  useEffect(() => {
    const onPreview = () => {
      const current = dataRef.current?.pet;
      if (!current) return;
      logDebug("ceremony", "preview");
      setCeremony({
        name: current.name,
        stageName: current.stage.name,
        epithet: current.stage.epithet,
        key: Date.now(),
      });
    };
    window.addEventListener("pets:preview-ceremony", onPreview);
    return () => window.removeEventListener("pets:preview-ceremony", onPreview);
  }, []);

  // Preload strip images whenever the artwork identity changes.
  const artKey = data?.pet ? `${data.pet.id}:${data.pet.artStage}` : null;
  // The rAF loop reads the atlas through a ref so xp/fleet payload churn can't
  // restart it. Declared before the loop effect so it lands first.
  useEffect(() => {
    atlasRef.current = data?.pet?.atlas ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artKey]);
  useEffect(() => {
    if (!data?.pet) return;
    const images = new Map<SpriteState, HTMLImageElement>();
    for (const state of Object.keys(data.pet.atlas.states) as SpriteState[]) {
      const img = new Image();
      img.src = `${data.pet.spriteBaseUrl}&state=${state}`;
      images.set(state, img);
    }
    imagesRef.current = images;
    paintedRef.current.state = null; // force repaint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artKey, data?.pet?.spriteBaseUrl]);

  // Greeting.
  useEffect(() => {
    momentRef.current = { state: "wave", until: Date.now() + 2400 };
    sounds.greet();
    const timer = setTimeout(() => showBubble("Reporting for duty."), 900);
    return () => clearTimeout(timer);
  }, [showBubble]);

  // Sound unlock on first gesture anywhere.
  useEffect(() => {
    const unlock = () => unlockSounds();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  // Viewport changes: compactness + keep a perched pet inside the window.
  useEffect(() => {
    const onResize = () => {
      setCompact(window.innerWidth < 768);
      const pos = posRef.current;
      pos.yBottom = Math.min(pos.yBottom, Math.max(GROUND_PX, window.innerHeight - 120));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Composer focus: the courtesy trigger. Standing on an input the user is
  // typing into is rude; walking past an idle one is fine.
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Element | null;
      composerFocusedRef.current =
        !!target?.closest?.('textarea, [contenteditable="true"]');
    };
    const onFocusOut = () => {
      // The next focusin re-arms it if focus merely moved within the composer.
      composerFocusedRef.current = false;
    };
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Glance over when the user starts typing a prompt (rate-limited).
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (!(dataRef.current?.settings.typingGlance ?? true)) return;
      const target = event.target as Element | null;
      if (!target?.closest?.('[contenteditable="true"], textarea')) return;
      const now = Date.now();
      if (now - lastGlanceRef.current < GLANCE_COOLDOWN_MS) return;
      const current = stateRef.current;
      if (current !== "idle" && current !== "walk" && current !== "sleep") return;
      lastGlanceRef.current = now;
      momentRef.current = { state: "think", until: now + 1600 };
    };
    window.addEventListener("keydown", onKeydown, true);
    return () => window.removeEventListener("keydown", onKeydown, true);
  }, []);

  // Away digest: what happened while the tab was in the background.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        awaySinceRef.current = Date.now();
        awayCountsRef.current = { completed: 0, failed: 0 };
        return;
      }
      const since = awaySinceRef.current;
      awaySinceRef.current = null;
      const { completed, failed } = awayCountsRef.current;
      awayCountsRef.current = { completed: 0, failed: 0 };
      if (!since || Date.now() - since <= AWAY_DIGEST_MIN_MS) return;
      if (completed === 0 && failed === 0) return;
      showBubble(
        `While you were away: ${completed} turn${completed === 1 ? "" : "s"} finished${
          failed ? `, ${failed} failed` : ""
        }.`,
        { important: true },
      );
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [showBubble]);

  // ⌘/Ctrl+click anywhere (outside the pet, its menu, and sidebar threads)
  // sends the pet walking to that x.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!event.metaKey && !event.ctrlKey) return;
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      if (target.closest("[data-sidebar-thread-id]")) return;
      if (anchorRef.current?.contains(target)) return;
      if (target.closest("[data-radix-popper-content-wrapper], [role='menu']")) return;
      event.preventDefault();
      event.stopPropagation();
      walkTo(event.clientX - widthRef.current / 2);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [walkTo]);

  // Occasional cameo: a den-mate strolls past along the bottom of the window.
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(fire, (25 + Math.random() * 15) * 60_000);
    };
    const fire = () => {
      if (cancelled) return;
      if (document.hidden || !dataRef.current?.pet || !dataRef.current.settings.enabled) {
        schedule();
        return;
      }
      void rpc(pluginId, "listDen")
        .then((result) => {
          if (cancelled) return;
          const others = result.pets.filter((entry) => !entry.active);
          const pick = others[Math.floor(Math.random() * others.length)];
          if (!pick) return;
          const direction = cameoDirectionRef.current;
          cameoDirectionRef.current = direction === 1 ? -1 : 1;
          setVisitor({ pet: pick, direction });
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) schedule();
        });
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pluginId, reducedMotion]);

  // Bubble expiry.
  useEffect(() => {
    if (!bubble) return;
    const timer = setTimeout(() => setBubble(null), Math.max(0, bubble.until - Date.now()));
    return () => clearTimeout(timer);
  }, [bubble]);

  // Bubble fitting. The bubble hangs off the anchor (which the paint loop
  // translates to the pet's x), so near either window edge — and on the ledge,
  // where the pet often stands hard against a pane — the default left:0 /
  // right:0 placement runs off screen. Measure the rendered bubble once, clamp
  // its LEFT EDGE into [pad, innerWidth - pad - width], and hand the tail to
  // whichever side ends up nearer the pet so it still points at the speaker.
  useLayoutEffect(() => {
    if (!bubble) {
      setBubbleFit(null);
      return;
    }
    const el = bubbleElRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    const petX = posRef.current.x ?? 0;
    const petWidth = widthRef.current;
    const naturalLeft = bubble.side === "left" ? petX : petX + petWidth - width;
    const minLeft = BUBBLE_EDGE_PAD;
    const maxLeft = Math.max(minLeft, window.innerWidth - BUBBLE_EDGE_PAD - width);
    const left = Math.min(Math.max(naturalLeft, minLeft), maxLeft);
    // Clamped: the tail is no longer under the pet on its original side, so put
    // it on the end of the bubble the pet is actually closest to.
    const petCenter = petX + petWidth / 2;
    const side =
      left === naturalLeft ? bubble.side : petCenter - left > width / 2 ? "right" : "left";
    setBubbleFit({ side, left: left - petX });
  }, [bubble]);

  // Ring hard-cap: whatever the mission machinery is doing, the highlight can
  // never outlive its point window by more than 2.5s.
  useEffect(() => {
    if (!highlight) return;
    const timer = setTimeout(() => {
      setHighlight((current) => {
        if (current && current.key === highlight.key) {
          lastHighlightRectRef.current = null;
          return null;
        }
        return current;
      });
    }, POINT_MS + 2500);
    return () => clearTimeout(timer);
  }, [highlight]);

  // Waiting threads: nudge + auto-point when the count grows.
  useEffect(() => {
    if (!fleet) return;
    const now = Date.now();
    // Re-arm: once a remembered thread is no longer waiting/failed, forget it,
    // so if it goes back to waiting later it can be pointed at again.
    for (const id of [...pointedMemoryRef.current.keys()]) {
      const thread = fleet.threads.find((t) => t.id === id);
      if (!thread || !(thread.waiting || thread.status === "failed")) {
        pointedMemoryRef.current.delete(id);
      }
    }
    const recentlyPointed = (id: string) => {
      const stamp = pointedMemoryRef.current.get(id);
      return stamp !== undefined && now - stamp < POINTED_MEMORY_MS;
    };
    const waiting = fleet.counts.waiting;
    const grew = waiting > prevWaitingRef.current;
    prevWaitingRef.current = waiting;
    if (waiting === 0 || !grew) return;
    sounds.alert();
    const target = fleet.threads.find((t) => t.waiting && !recentlyPointed(t.id));
    if (
      (dataRef.current?.settings.pointing ?? true) &&
      target &&
      !document.hidden &&
      now - lastAutoPointRef.current > AUTO_POINT_COOLDOWN_MS
    ) {
      lastAutoPointRef.current = now;
      pointedMemoryRef.current.set(target.id, now);
      startMission(target);
    } else {
      showBubble(
        waiting === 1
          ? "One thread is waiting on you. I'm just waiting in general."
          : `${waiting} threads are waiting on you.`,
        { threadId: target?.id, projectId: target?.projectId },
      );
    }
  }, [fleet, showBubble, startMission]);

  // --- the brain -------------------------------------------------------------

  // acknowledge → settle → remind: a sustained condition plays HOLD, decays to
  // calm, then briefly replays every CALM interval while it persists.
  const sustained = useCallback((family: string, state: SpriteState): SpriteState | null => {
    const now = Date.now();
    const map = sustainRef.current;
    let entry = map.get(family);
    if (!entry) {
      entry = {
        holdUntil: now + SUSTAIN_HOLD_MS,
        nextRemindAt: now + SUSTAIN_HOLD_MS + SUSTAIN_CALM_MS,
      };
      map.set(family, entry);
    }
    if (now < entry.holdUntil) return state;
    if (now >= entry.nextRemindAt) {
      entry.holdUntil = now + SUSTAIN_REMIND_MS;
      entry.nextRemindAt = now + SUSTAIN_REMIND_MS + SUSTAIN_CALM_MS;
      return state;
    }
    return null; // settled — calm until the next reminder
  }, []);

  const deriveState = useCallback((): SpriteState => {
    const now = Date.now();
    if (nappingRef.current) return "sleep";
    if (airborneRef.current) return "jump";
    const mission = missionRef.current;
    if (mission) return mission.phase === "walk" ? "walk" : "point";
    const moment = momentRef.current;
    if (moment && now < moment.until) return moment.state;
    // Mid-step between two ground elevations (hopping on/off the composer
    // ledge) — resolveState falls back if the atlas has no jump.
    if (ledgeClimbRef.current) return "jump";
    // Zoomies (and a fetch chase): same locomotion, more conviction.
    if ((zoomiesRef.current > 0 || fetchActiveRef.current) && walkTargetRef.current !== null) {
      return "run";
    }
    // Heading somewhere on purpose — that reads as walking, not as whatever the
    // fleet happens to feel about itself.
    if (walkTargetRef.current !== null && !missionRef.current) return "walk";
    // Sustained conditions below. Collect every present condition FIRST (no
    // early returns), so the decay-clock purge always runs — otherwise a
    // high-priority condition returning early would freeze the clocks of the
    // conditions beneath it, and a condition that came back would resume
    // mid-decay instead of re-acknowledging.
    const candidates = candidatesRef.current;
    candidates.length = 0;
    const settings = dataRef.current?.settings;
    if (jobActiveRef.current && (settings?.digWhileGenerating ?? true)) {
      candidates.push(["job", "dig"]);
    }
    const currentFleet = fleetRef.current;
    const reactivity = settings?.reactivity ?? "hybrid";
    const viewed =
      viewedRef.current && reactivity !== "aggregate"
        ? currentFleet?.threads.find((t) => t.id === viewedRef.current)
        : undefined;
    if (viewed) {
      if (viewed.waiting) {
        candidates.push(["viewed-waiting", "waiting"]);
      } else if (viewed.status === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push(["viewed-failed", "sad"]);
      } else if (viewed.status === "active") {
        candidates.push(["viewed-active", "think"]);
      }
    }
    if (!viewed && reactivity !== "viewed-thread" && currentFleet) {
      if (currentFleet.mood === "waiting") {
        candidates.push(["fleet-waiting", "waiting"]);
      } else if (currentFleet.mood === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push(["fleet-failed", currentFleet.counts.failed >= 3 ? "grumpy" : "sad"]);
      } else if (currentFleet.mood === "active") {
        candidates.push(["fleet-active", currentFleet.counts.active >= 3 ? "run" : "walk"]);
      }
    }
    // Conditions that went away forget their decay clocks, so a fresh
    // occurrence gets a fresh acknowledgement.
    for (const key of [...sustainRef.current.keys()]) {
      if (!candidates.some(([family]) => family === key)) sustainRef.current.delete(key);
    }
    for (const [family, state] of candidates) {
      const s = sustained(family, state);
      if (s) return s;
    }
    if (now - lastActivityRef.current > SLEEP_AFTER_MS) return "sleep";
    if (posRef.current.parked) return "sit";
    return roamRef.current.mode === "stroll" ? "walk" : "idle";
  }, [sustained]);

  // --- the loop --------------------------------------------------------------

  useEffect(() => {
    if (!data?.pet || !data.settings.enabled) return;
    let raf = 0;
    let lastTick = performance.now();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    // Rolling one-second window for the dev feed's frame counters.
    let fpsSince = performance.now();
    let framesSeen = 0;
    let ticksRun = 0;
    // Consecutive frames the pet has been provably motionless.
    let idleFrames = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      framesSeen += 1;
      if (now - fpsSince >= 1000) {
        const span = (now - fpsSince) / 1000;
        fpsRef.current = {
          fps: Math.round(framesSeen / span),
          tickFps: Math.round(ticksRun / span),
        };
        fpsSince = now;
        framesSeen = 0;
        ticksRun = 0;
      }
      if (document.hidden) {
        lastTick = now;
        return;
      }

      // --- idle throttle -----------------------------------------------------
      // Nothing below moves the pet a pixel while ALL of these hold, and the
      // canvas already shows the frame the animator wants — so three frames in
      // four can be dropped without anything to show for it. Every source of
      // motion (mission, walk target, flight, a moment's pose, a drag, a ledge
      // step, zoomies, an unpainted frame) disqualifies the skip; the walk bob
      // only exists in "walk", which is not a skippable state.
      const currentMoment = momentRef.current;
      const motionless =
        !missionRef.current &&
        walkTargetRef.current === null &&
        !airborneRef.current &&
        !(currentMoment && Date.now() < currentMoment.until) &&
        !dragRef.current &&
        !ledgeSteppingRef.current &&
        zoomiesRef.current === 0 &&
        // A ball in play, a treat still falling, or a live buff all animate
        // something on screen even while the pet itself is standing still.
        !ballRef.current &&
        !fetchActiveRef.current &&
        Date.now() >= buffUntilRef.current &&
        !treatsRef.current.some((t) => !t.landed) &&
        IDLE_SKIP_STATES.has(stateRef.current) &&
        paintedRef.current.frame === frameRef.current;
      if (motionless) {
        idleFrames += 1;
        // `lastTick` is deliberately NOT advanced on a skipped frame: the next
        // full tick then sees the whole elapsed span, so animation clocks and
        // physics stay wall-clock accurate instead of running at quarter speed.
        if (idleFrames % IDLE_FRAME_DIVISOR !== 0) return;
      } else {
        idleFrames = 0;
      }

      ticksRun += 1;
      const dt = Math.min(0.05, (now - lastTick) / 1000);
      lastTick = now;
      const atlas = atlasRef.current;
      if (!atlas) return; // artwork identity in flight — resume next frame
      if (!dataRef.current?.settings.enabled) return;

      // Mission upkeep (element may scroll, vanish, or resolve).
      const mission = missionRef.current;
      if (mission) {
        // Resolved: the freshest fleet no longer lists the thread as needing
        // attention (same predicate the server uses to seed one).
        const live = fleetRef.current?.threads.find((t) => t.id === mission.thread.id);
        const resolved = !!live && !(live.waiting || live.status === "failed");
        const gone =
          !document.contains(mission.element) || Date.now() > mission.until || resolved;
        if (gone) {
          logDebug("mission", resolved ? "end: resolved" : "end: gone");
          missionRef.current = null;
          lastHighlightRectRef.current = null;
          setHighlight(null);
        }
      }

      // Idle quirks: an occasional wave or look-around so pauses feel alive.
      if (
        !reducedMotion &&
        (dataRef.current?.settings.idleQuirks ?? true) &&
        Date.now() > nextQuirkRef.current &&
        stateRef.current === "idle" &&
        !missionRef.current &&
        !airborneRef.current
      ) {
        nextQuirkRef.current = Date.now() + QUIRK_EVERY_MS + Math.random() * 14_000;
        momentRef.current = {
          state: Math.random() < 0.35 ? "wave" : "think",
          until: Date.now() + 1700,
        };
      }

      let nextState = deriveState();
      nextState = resolveState(atlas.states, nextState);
      if (nextState !== stateRef.current) {
        // Waking up: a stretch before whatever comes next.
        if (prevStateRef.current === "sleep" && nextState !== "sleep" && !reducedMotion) {
          momentRef.current = { state: "stretch", until: Date.now() + 1200 };
          nextState = resolveState(atlas.states, "stretch");
        }
        logDebug("state", `${stateRef.current}→${nextState}`);
        prevStateRef.current = nextState;
        stateRef.current = nextState;
        frameRef.current = 0;
        rawFrameRef.current = 0;
        frameClockRef.current = 0;
        setSpriteState(nextState);
        // A little squash emphasis when snapping into an expressive pose.
        if (!reducedMotion && (nextState === "celebrate" || nextState === "point" || nextState === "waiting")) {
          pulseClass("pets-land", 200);
        }
      }

      const spec = atlas.states[nextState] ?? atlas.states.idle ?? Object.values(atlas.states)[0];
      if (!spec) return; // no artwork at all this frame — try again next tick
      if (!reducedMotion) {
        frameClockRef.current += dt * spec.fps;
        if (frameClockRef.current >= 1) {
          frameClockRef.current %= 1;
          const raw = rawFrameRef.current + 1;
          rawFrameRef.current = raw;
          frameRef.current = nextFrame(raw, spec, nextState);
          // Footfalls ride the strip, not a timer: every SECOND frame advance
          // of a locomotion pose is a step, so the zoomies/fetch speed boost
          // makes the footsteps quicken for free. `sounds.step()` is itself a
          // no-op while sound is off.
          if (nextState === "walk" || nextState === "run") {
            stepParityRef.current ^= 1;
            if (stepParityRef.current === 0 && !document.hidden && !nappingRef.current) {
              sounds.step();
            }
          } else {
            stepParityRef.current = 0;
          }
        }
      }

      // --- display geometry (character-normalized, computed once per tick) ---
      // Slicing geometry comes from the IMAGE BYTES (naturalWidth/Height),
      // never from the atlas. A cache layer (remote tunnel edges especially)
      // can pair stale bytes with a fresh atlas; atlas-derived source rects
      // then leak slivers of neighbouring frames onto the sprite's edges.
      // Bytes-derived rects slice whatever actually arrived correctly, so a
      // stale client shows old-but-clean art instead of glitched art. The
      // atlas contributes frames/fps/loop and the content bbox only.
      const img = imagesRef.current.get(nextState);
      const ready = !!img && img.complete && img.naturalWidth > 0;
      const srcCellW = ready ? Math.floor(img.naturalWidth / spec.frames) : spec.width / spec.frames;
      const srcH = ready ? img.naturalHeight : spec.height;
      const petScale = dataRef.current?.pet?.sizeScale ?? 1;
      const charTarget = BASE_CHAR_HEIGHT * petScale;
      const { width, height } = charGeometry(atlas, spec, srcCellW, charTarget);
      widthRef.current = width;
      heightRef.current = height;
      const speedFactor = WALK_SPEEDS[dataRef.current?.settings.walkSpeed ?? "normal"] ?? 1;
      const pos = posRef.current;
      const vel = velRef.current;
      const minX = EDGE_MARGIN;
      const maxX = Math.max(minX, window.innerWidth - width - EDGE_MARGIN);
      if (pos.x === null) pos.x = Math.min(maxX, window.innerWidth * 0.12);

      const frozen = menuOpenRef.current || !!dragRef.current;

      // --- physics: airborne flight, bounces, landing ---
      if (airborneRef.current && !dragRef.current) {
        vel.vy -= GRAVITY * dt;
        pos.yBottom += vel.vy * dt;
        pos.x += vel.vx * dt;
        tiltRef.current = Math.max(-0.34, Math.min(0.34, vel.vx * 0.00045));
        if (pos.x <= minX || pos.x >= maxX) {
          pos.x = Math.min(Math.max(pos.x, minX), maxX);
          vel.vx = -vel.vx * WALL_BOUNCE;
        }
        // The floor is terrain: a pet tossed over the composer lands ON it.
        const floor = terrainAt(pos.x + width / 2);
        if (pos.yBottom <= floor) {
          pos.yBottom = floor;
          if (Math.abs(vel.vy) > SETTLE_VY) {
            sounds.boing();
            pulseClass("pets-land", 200);
            vel.vy = -vel.vy * FLOOR_BOUNCE;
            vel.vx *= 0.72;
          } else {
            airborneRef.current = false;
            vel.vx = 0;
            vel.vy = 0;
            tiltRef.current = 0;
            pulseClass("pets-land", 200);
            persistPrefs();
          }
        }
      } else if (!airborneRef.current) {
        tiltRef.current = 0;
        // --- elevation following: grounded pets walk the terrain ---
        if (!pos.parked && !dragRef.current && !nappingRef.current) {
          const targetElev = terrainAt(pos.x + width / 2);
          if (pos.yBottom !== targetElev) {
            const rising = targetElev > pos.yBottom;
            if (!ledgeSteppingRef.current) {
              ledgeSteppingRef.current = true;
              logDebug("terrain", `→${Math.round(targetElev)}`);
              if (rising && !reducedMotion) {
                momentRef.current = { state: "jump", until: Date.now() + 260 };
                if (Date.now() - ledgeBoingRef.current > LEDGE_BOING_COOLDOWN_MS) {
                  ledgeBoingRef.current = Date.now();
                  sounds.boing();
                }
              }
            }
            const step = LEDGE_CLIMB_SPEED * dt;
            pos.yBottom = rising
              ? Math.min(targetElev, pos.yBottom + step)
              : Math.max(targetElev, pos.yBottom - step);
            if (pos.yBottom === targetElev) {
              ledgeSteppingRef.current = false;
              pulseClass("pets-land", 200);
            }
          } else {
            ledgeSteppingRef.current = false;
          }
          ledgeClimbRef.current = Math.abs(pos.yBottom - targetElev) > 4;
        } else {
          ledgeSteppingRef.current = false;
          ledgeClimbRef.current = false;
        }
      } else {
        ledgeSteppingRef.current = false;
        ledgeClimbRef.current = false;
      }
      pos.x = Math.min(Math.max(pos.x, minX), maxX);

      // --- treats + fetch ------------------------------------------------------
      // Both live entirely in refs; React only sees spawn/despawn. Missions win
      // outright — being shown a failing thread beats a cookie.
      const playNow = Date.now();
      const treats = treatsRef.current;
      if (missionRef.current) {
        snackTargetRef.current = null;
        if (ballRef.current) cancelFetch();
      }

      // Falling treats: lighter gravity, one bounce, then they sit there.
      for (const treat of treats) {
        if (treat.landed) continue;
        treat.vy -= TREAT_GRAVITY * dt;
        treat.yBottom += treat.vy * dt;
        const rest = terrainAt(treat.x + TREAT_SIZE / 2);
        if (treat.yBottom <= rest) {
          treat.yBottom = rest;
          if (!treat.bounced && Math.abs(treat.vy) > 120) {
            treat.bounced = true;
            treat.vy *= TREAT_BOUNCE;
          } else {
            treat.vy = 0;
            treat.landed = true;
          }
        }
      }

      // Free = nothing with a stronger claim on the pet's attention.
      const playMoment = momentRef.current;
      const petFree =
        !missionRef.current &&
        !airborneRef.current &&
        !pos.parked &&
        !nappingRef.current &&
        !dragRef.current &&
        !menuOpenRef.current &&
        !(playMoment && playNow < playMoment.until);

      // Snack run: walk to the chosen treat (clicked, else nearest) and eat it.
      if (treats.length > 0 && !ballRef.current) {
        let target: Treat | null = null;
        if (snackTargetRef.current !== null) {
          target = treats.find((t) => t.id === snackTargetRef.current) ?? null;
          if (!target) snackTargetRef.current = null;
        }
        if (!target && petFree && walkTargetRef.current === null) {
          const center = pos.x + width / 2;
          let bestDistance = Number.POSITIVE_INFINITY;
          for (const treat of treats) {
            if (!treat.landed) continue;
            const distance = Math.abs(treat.x + TREAT_SIZE / 2 - center);
            if (distance < bestDistance) {
              bestDistance = distance;
              target = treat;
            }
          }
          if (target) snackTargetRef.current = target.id;
        }
        if (target && target.landed && petFree) {
          const treatCenter = target.x + TREAT_SIZE / 2;
          if (Math.abs(pos.x + width / 2 - treatCenter) < TREAT_REACH_PX) {
            const eaten = target;
            treatsRef.current = treats.filter((t) => t.id !== eaten.id);
            treatElsRef.current.delete(eaten.id);
            snackTargetRef.current = null;
            walkTargetRef.current = null;
            momentRef.current = { state: "love", until: playNow + 1200 };
            burstHearts();
            burstSparkles();
            sounds.pet();
            buffUntilRef.current = playNow + TREAT_BUFF_MS;
            nextBuffSparkleRef.current = playNow;
            void looseRpc(pluginId, "eatTreat").catch(() => {});
            syncTreats();
            logDebug("treat", "eaten");
          } else {
            facingRef.current = treatCenter >= pos.x + width / 2 ? 1 : -1;
            walkTargetRef.current = Math.min(Math.max(treatCenter - width / 2, minX), maxX);
          }
        }
      }

      // Paint every live treat (cheap: at most three nodes).
      for (const treat of treatsRef.current) {
        const node = treatElsRef.current.get(treat.id);
        if (node) {
          node.style.transform = `translate(${treat.x}px, ${-(treat.yBottom - GROUND_PX)}px)`;
        }
      }

      // The buff: a small sparkle every ~300ms for a minute after a treat.
      if (
        !reducedMotion &&
        playNow < buffUntilRef.current &&
        !nappingRef.current &&
        playNow >= nextBuffSparkleRef.current
      ) {
        nextBuffSparkleRef.current = playNow + BUFF_SPARKLE_MS;
        spawnBuffSparkle();
      }

      // --- fetch ---
      const ball = ballRef.current;
      if (ball) {
        const ballMinX = EDGE_MARGIN;
        const ballMaxX = Math.max(ballMinX, window.innerWidth - EDGE_MARGIN - BALL_SIZE);
        if (ball.phase === "flying") {
          ball.vy -= GRAVITY * dt;
          ball.x += ball.vx * dt;
          ball.yBottom += ball.vy * dt;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE;
          }
          const rest = terrainAt(ball.x + BALL_SIZE / 2);
          if (ball.yBottom <= rest) {
            ball.yBottom = rest;
            if (Math.abs(ball.vy) > SETTLE_VY) {
              ball.vy = -ball.vy * FLOOR_BOUNCE;
              ball.vx *= 0.8;
            } else {
              ball.vy = 0;
              ball.phase = "rolling";
            }
          }
        } else if (ball.phase === "rolling") {
          ball.x += ball.vx * dt;
          // Per-frame friction, corrected for the actual frame length.
          ball.vx *= Math.pow(BALL_FRICTION, dt * 60);
          if (Math.abs(ball.vx) < BALL_STOP_VX) ball.vx = 0;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE;
          }
          ball.yBottom = terrainAt(ball.x + BALL_SIZE / 2);
        } else if (ball.phase === "carried") {
          // Rides above the pet's head, wherever that is.
          ball.x = pos.x + width / 2 - BALL_SIZE / 2;
          ball.yBottom = pos.yBottom + height * 0.9;
        }

        if (ball.phase === "flying" || ball.phase === "rolling") {
          if (playNow - ball.startedAt > FETCH_TIMEOUT_MS) {
            // Nobody came for it. Rather than leave a ball (and a speed boost)
            // on the floor forever, call the game off.
            cancelFetch();
          } else if (petFree) {
            const ballCenter = ball.x + BALL_SIZE / 2;
            if (playNow >= nextChaseRef.current) {
              nextChaseRef.current = playNow + BALL_CHASE_MS;
              walkTargetRef.current = Math.min(Math.max(ballCenter - width / 2, minX), maxX);
            }
            const grounded =
              ball.phase === "rolling" ||
              ball.yBottom <= terrainAt(ballCenter) + 2;
            if (grounded && Math.abs(pos.x + width / 2 - ballCenter) < BALL_CATCH_PX) {
              ball.phase = "carried";
              ball.vx = 0;
              ball.vy = 0;
              nextChaseRef.current = 0;
              sounds.pet();
              walkTargetRef.current = Math.min(Math.max(ball.originX, minX), maxX);
              logDebug("fetch", "caught");
            }
          }
        } else if (ball.phase === "carried" && walkTargetRef.current === null && petFree) {
          // Home again: drop it at the pet's feet and let it fade out.
          ball.phase = "done";
          ball.x = pos.x + width / 2 - BALL_SIZE / 2;
          ball.yBottom = terrainAt(pos.x + width / 2);
          fetchActiveRef.current = false;
          celebrateTier("minor");
          void looseRpc(pluginId, "recordFetch").catch(() => {});
          if (Math.random() < 0.3) showBubble("again.");
          // Hand the LIVE position to React alongside the fade, so the re-render
          // can't snap the ball back to where it was thrown from.
          const restX = ball.x;
          const restY = ball.yBottom;
          setBallView((prev) =>
            prev ? { ...prev, x: restX, yBottom: restY, fading: true } : prev,
          );
          playTimeout(() => {
            if (ballRef.current?.phase === "done") ballRef.current = null;
            setBallView(null);
          }, BALL_FADE_MS);
          logDebug("fetch", "returned");
        }

        const ballNode = ballElRef.current;
        if (ballNode) {
          ballNode.style.transform = `translate(${ball.x}px, ${-(ball.yBottom - GROUND_PX)}px)`;
        }
      }

      // --- mission locomotion beats roaming ---
      const active = missionRef.current;
      if (!frozen && !airborneRef.current && active) {
        const nowMs = Date.now();
        // The deadline is authoritative here too — a quiet fleet must not leave
        // the ring pulsing forever.
        let ended = nowMs > active.until;
        if (!ended && (!active.lastQueryAt || nowMs - active.lastQueryAt > 200)) {
          // bb recycles sidebar rows, so a node captured at mission start can go
          // stale or end up showing a different thread. Re-resolve by id.
          const fresh = threadRowFor(active.thread.id);
          if (!fresh) ended = true;
          else {
            active.element = fresh;
            active.lastQueryAt = nowMs;
          }
        }
        if (ended) {
          logDebug("mission", "end: timeout");
          missionRef.current = null;
          lastHighlightRectRef.current = null;
          setHighlight(null);
        } else {
        const rect = active.element.getBoundingClientRect();
        const targetX = Math.min(Math.max(rect.left + rect.width * 0.3 - width / 2, minX), maxX);
        if (active.phase === "walk") {
          const dx = targetX - pos.x;
          const step = 130 * speedFactor * dt;
          if (Math.abs(dx) <= step + 2) {
            pos.x = targetX;
            active.phase = "point";
            active.until = Date.now() + POINT_MS;
            if (!active.arrived) {
              active.arrived = true;
              hop(190);
              sounds.alert();
            }
            const arrivedRect = {
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            };
            lastHighlightRectRef.current = arrivedRect;
            setHighlight({ rect: arrivedRect, key: Date.now() });
            showBubble(
              `“${active.thread.title}” ${active.thread.waiting ? "is waiting on you" : "failed"}.`,
              {
                threadId: active.thread.id,
                projectId: active.thread.projectId,
                important: true,
              },
            );
          } else {
            const dir = Math.sign(dx) as 1 | -1;
            if (dir !== facingRef.current) pulseClass("pets-turn", 160);
            pos.x += dir * step;
            facingRef.current = dir;
          }
        } else {
          // The ring only needs a state update when the row actually moved —
          // re-setting an identical rect every frame re-rendered the whole
          // overlay 60×/s.
          const previous = lastHighlightRectRef.current;
          const moved =
            !previous ||
            Math.abs(previous.left - rect.left) > 1 ||
            Math.abs(previous.top - rect.top) > 1 ||
            Math.abs(previous.width - rect.width) > 1 ||
            Math.abs(previous.height - rect.height) > 1;
          if (moved) {
            const next = {
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            };
            lastHighlightRectRef.current = next;
            setHighlight((prev) => (prev ? { ...prev, rect: next } : prev));
          }
          facingRef.current = rect.left + rect.width / 2 >= pos.x + width / 2 ? 1 : -1;
        }
        }
      } else if (
        // --- explicit destination ("Send to…" / ⌘-click) beats roaming ---
        !frozen &&
        !airborneRef.current &&
        !pos.parked &&
        !nappingRef.current &&
        walkTargetRef.current !== null
      ) {
        const target = Math.min(Math.max(walkTargetRef.current, minX), maxX);
        const dx = target - pos.x;
        const boost =
          zoomiesRef.current > 0 ? ZOOMIES_BOOST : fetchActiveRef.current ? FETCH_BOOST : 1;
        const step = WALK_TO_SPEED * speedFactor * boost * dt;
        if (Math.abs(dx) <= 6) {
          pos.x = target;
          walkTargetRef.current = null;
          speedRef.current = 0;
          pulseClass("pets-land", 200);
          persistPrefs();
        } else {
          const dir = Math.sign(dx) as 1 | -1;
          if (dir !== facingRef.current) pulseClass("pets-turn", 160);
          pos.x += dir * step;
          facingRef.current = dir;
        }
      } else if (
        !frozen &&
        !airborneRef.current &&
        !pos.parked &&
        (dataRef.current?.settings.roaming ?? true) &&
        (nextState === "idle" || nextState === "walk") &&
        !reducedMotion
      ) {
        // --- eased roaming ---
        const roam = roamRef.current;
        const hustling = nextState === "walk" && roam.mode !== "stroll";
        if (now >= roam.until) {
          let nextDirection = (Math.random() < 0.5 ? -1 : 1) as 1 | -1;
          roam.mode = roam.mode === "stroll" ? "pause" : "stroll";
          // No loitering on the ledge: a pause that would land on the composer
          // becomes a stroll towards the nearest way off it.
          if (roam.mode === "pause" && terrainAt(pos.x + width / 2) > GROUND_PX) {
            const center = pos.x + width / 2;
            roam.mode = "stroll";
            nextDirection = (nudgeOffLedge(center) < center ? -1 : 1) as 1 | -1;
          }
          if (roam.mode === "stroll" && nextDirection !== roam.direction) {
            pulseClass("pets-turn", 160);
          }
          roam.direction = nextDirection;
          roam.until =
            now + (roam.mode === "stroll" ? 1800 + Math.random() * 2600 : 2200 + Math.random() * 4800);
        }
        const targetSpeed =
          roam.mode === "stroll" || hustling ? (hustling ? 46 : 26) * speedFactor : 0;
        speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 6);
        if (speedRef.current > 1) {
          // The composer is terrain now, not a wall: the pet climbs it.
          let next = pos.x + roam.direction * speedRef.current * dt;
          if (next <= minX || next >= maxX) {
            roam.direction = roam.direction === 1 ? -1 : 1;
            pulseClass("pets-turn", 160);
            next = Math.min(Math.max(next, minX), maxX);
          }
          pos.x = next;
          facingRef.current = roam.direction;
        }
      } else if (!active) {
        speedRef.current = 0;
      }

      // --- composer courtesy: ghost out, then step aside ---
      // Safety net only. Terrain normally carries the pet ABOVE the input, so
      // this fires transiently (mid-step) or when measurement failed. Only the
      // input actually holding focus counts — with split panes the pet may be
      // standing over a different, idle composer entirely.
      const composer = composerFocusedRef.current ? focusedComposerRect() : null;
      const ghost =
        !!composer &&
        pos.x + width >= composer.left - 8 &&
        pos.x <= composer.right + 8 &&
        // Still down at floor level, i.e. the ledge didn't lift it clear.
        pos.yBottom <= GROUND_PX + 2 &&
        // The composer reaches down into the band the pet walks in.
        composer.bottom >= window.innerHeight - GROUND_PX - height * 1.2;
      if (ghost !== ghostRef.current) {
        ghostRef.current = ghost;
        logDebug("ghost", ghost ? "on" : "off");
        bodyRef.current?.classList.toggle("pets-ghost", ghost);
        // Rising edge: startle, then walk to the nearest side that isn't the
        // input. Anything with its own agenda (mission, drag, flight, menu, an
        // explicit destination) is left alone.
        if (
          ghost &&
          composer &&
          !missionRef.current &&
          !dragRef.current &&
          !airborneRef.current &&
          !menuOpenRef.current &&
          walkTargetRef.current === null
        ) {
          momentRef.current = { state: "startled", until: Date.now() + 450 };
          const leftSide = composer.left - width - 24;
          const rightSide = composer.right + 24;
          const near = Math.abs(leftSide - pos.x) <= Math.abs(rightSide - pos.x) ? leftSide : rightSide;
          const far = near === leftSide ? rightSide : leftSide;
          const clamped = Math.min(Math.max(near, minX), maxX);
          const stillOnIt =
            clamped >= composer.left - width - COMPOSER_PAD && clamped <= composer.right + COMPOSER_PAD;
          walkTargetRef.current = Math.min(Math.max(stillOnIt ? far : clamped, minX), maxX);
        }
      }

      // Walk bob: a tiny hop synced to the frame phase.
      const bob =
        !reducedMotion && nextState === "walk" && !airborneRef.current
          ? -Math.abs(Math.sin(((frameRef.current + frameClockRef.current) / spec.frames) * Math.PI * 2)) *
            2.2
          : 0;

      // --- paint ---
      const canvas = canvasRef.current;
      const anchor = anchorRef.current;
      if (canvas && anchor) {
        const painted = paintedRef.current;
        const tilt = Math.round(tiltRef.current * 50) / 50;
        const dirty =
          painted.state !== nextState ||
          painted.frame !== frameRef.current ||
          painted.facing !== facingRef.current ||
          painted.tilt !== tilt ||
          painted.scale !== charTarget;
        if (dirty && ready) {
          const pxW = Math.max(1, Math.round(width * dpr));
          const pxH = Math.max(1, Math.round(height * dpr));
          if (canvas.width !== pxW || canvas.height !== pxH) {
            canvas.width = pxW;
            canvas.height = pxH;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, pxW, pxH);
            ctx.translate(pxW / 2, pxH);
            ctx.rotate(tilt);
            ctx.scale(facingRef.current, 1);
            ctx.drawImage(img, frameRef.current * srcCellW, 0, srcCellW, srcH, -pxW / 2, -pxH, pxW, pxH);
            painted.state = nextState;
            painted.frame = frameRef.current;
            painted.facing = facingRef.current;
            painted.tilt = tilt;
            painted.scale = charTarget;
          }
        }
        const y = -(pos.yBottom - GROUND_PX) + bob;
        if (painted.x !== pos.x || painted.y !== y) {
          anchor.style.transform = `translate(${pos.x}px, ${y}px)`;
          painted.x = pos.x;
          painted.y = y;
        }
      }
    };

    // Hidden tab: stop the loop outright rather than waking 60×/s to bail on
    // `document.hidden`. Coming back reseeds `lastTick` first — otherwise the
    // resumed frame carries the whole background interval as one dt and the pet
    // teleports.
    const onLoopVisibility = () => {
      if (document.hidden) {
        if (loopPausedRef.current) return;
        loopPausedRef.current = true;
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      if (!loopPausedRef.current) return;
      loopPausedRef.current = false;
      lastTick = performance.now();
      fpsSince = performance.now();
      framesSeen = 0;
      ticksRun = 0;
      idleFrames = 0;
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onLoopVisibility);

    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("visibilitychange", onLoopVisibility);
      loopPausedRef.current = false;
      cancelAnimationFrame(raf);
    };
    // Deliberately narrow: depending on `data` restarted the whole loop on
    // every xp signal. Pet identity/art come through the deps below, the atlas
    // through atlasRef, and everything else is read from dataRef inside tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.pet?.id,
    data?.pet?.artStage,
    data?.settings.enabled,
    burstHearts,
    burstSparkles,
    cancelFetch,
    celebrateTier,
    deriveState,
    hop,
    nudgeOffLedge,
    persistPrefs,
    playTimeout,
    pluginId,
    pulseClass,
    reducedMotion,
    showBubble,
    spawnBuffSparkle,
    syncTreats,
    terrainAt,
  ]);

  // Dev feed: a periodic snapshot of what the loop is actually doing. Off
  // unless the dev-mode setting is on — this is the only part of the feed that
  // costs anything while nothing is happening.
  const devMode = data?.settings.devMode ?? false;
  useEffect(() => {
    if (!devMode) return;
    const id = setInterval(() => {
      const pos = posRef.current;
      window.dispatchEvent(
        new CustomEvent("pets:debug-state", {
          detail: {
            state: stateRef.current,
            elev: Math.round(pos.yBottom),
            x: Math.round(pos.x ?? 0),
            act: currentActRef.current ?? null,
            fps: fpsRef.current.fps,
            // Full ticks per second: below `fps` whenever the idle throttle is
            // doing its job, equal to it whenever the pet is actually moving.
            tickFps: fpsRef.current.tickFps,
            paused: loopPausedRef.current,
          },
        }),
      );
    }, DEBUG_STATE_MS);
    return () => clearInterval(id);
  }, [devMode]);

  // The sidebar footer "Pet options" action summons this menu wherever the pet
  // happens to be standing (napping, parked on a ledge — anywhere). Synthesising
  // a contextmenu event on the pet body keeps a single open-path: radix places
  // the menu at the "pointer", and onOpenChange still does the den load and the
  // pending-tap kills. Fires again while open ⇒ close, so the button toggles.
  useEffect(() => {
    const onSummon = () => {
      if (!dataRef.current?.pet || !dataRef.current.settings.enabled) return;
      if (menuOpenRef.current) {
        setMenuOpenState(false);
        return;
      }
      const body = bodyRef.current;
      if (!body) return;
      const pos = posRef.current;
      body.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          clientX: (pos.x ?? 0) + widthRef.current / 2,
          clientY: window.innerHeight - pos.yBottom - heightRef.current - 8,
        }),
      );
    };
    window.addEventListener("pets:open-menu", onSummon);
    return () => window.removeEventListener("pets:open-menu", onSummon);
  }, []);

  // Treats and the ball are ref-owned, so unmount has to sweep them by hand —
  // the DOM nodes go with React, but the timers and the boost flag do not.
  useEffect(() => {
    const timers = playTimersRef.current;
    const nodes = treatElsRef.current;
    return () => {
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      nodes.clear();
      treatsRef.current = [];
      ballRef.current = null;
      fetchActiveRef.current = false;
      snackTargetRef.current = null;
      buffUntilRef.current = 0;
    };
  }, []);

  // --- autonomy --------------------------------------------------------------

  // User activity feeds both the sleep clock and the cursor-chase act, and is
  // what wakes the pet out of an auto-nap.
  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const wake = () => {
      if (!autoNapRef.current) return;
      logDebug("nap", "wake");
      autoNapRef.current = false;
      setNapping(false);
      momentRef.current = { state: "stretch", until: Date.now() + 1500 };
      const timer = setTimeout(() => {
        timers.delete(timer);
        momentRef.current = { state: "wave", until: Date.now() + 1400 };
        if (Math.random() < 0.6) showBubble("you're back. good.");
      }, 1500);
      timers.add(timer);
    };
    const onPointerMove = (event: PointerEvent) => {
      lastMouseXRef.current = event.clientX;
      lastActivityRef.current = Date.now();
      wake();
    };
    const onKeydown = () => {
      lastActivityRef.current = Date.now();
      wake();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onKeydown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeydown);
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    };
  }, [showBubble]);

  // Idle nap: after a long quiet stretch the pet curls up on its own, and wakes
  // the moment you come back (see the activity listener above).
  useEffect(() => {
    const id = setInterval(() => {
      if (!personaRef.current.cozy || nappingRef.current || autoNapRef.current) return;
      if (!(dataRef.current?.settings.enabled ?? false)) return;
      if (Date.now() - mountedAtRef.current < AUTO_NAP_GRACE_MS) return;
      if (Date.now() - lastActivityRef.current < AUTO_NAP_AFTER_MS) return;
      if (missionRef.current || menuOpenRef.current || dragRef.current || airborneRef.current) return;
      // Nobody sleeps on the composer: step off the ledge first, nap next cycle.
      const center = (posRef.current.x ?? 0) + widthRef.current / 2;
      if (terrainAt(center) > GROUND_PX) {
        walkTo(nudgeOffLedge(center) - widthRef.current / 2);
        return;
      }
      logDebug("nap", "auto-nap");
      autoNapRef.current = true;
      missionRef.current = null;
      lastHighlightRectRef.current = null;
      setHighlight(null);
      setNapping(true);
    }, AUTO_NAP_CHECK_MS);
    return () => clearInterval(id);
  }, [nudgeOffLedge, terrainAt, walkTo]);

  // The director: a self-rescheduling loop that picks ONE act per firing from
  // the pools the personality toggles allow. Anything the user is doing —
  // dragging, the menu, a mission, an open bubble — defers the act entirely
  // rather than queueing it.
  useEffect(() => {
    if (!data?.pet || !data.settings.enabled) return;
    let cancelled = false;
    let nextTimer: ReturnType<typeof setTimeout> | null = null;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const watchers = new Set<ReturnType<typeof setInterval>>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const bounds = () => {
      const width = widthRef.current;
      const minX = EDGE_MARGIN;
      const maxX = Math.max(minX, window.innerWidth - width - EDGE_MARGIN);
      return { width, minX, maxX };
    };

    /** Resolves when the loop clears the walk-to target (i.e. on arrival). */
    const arrival = (timeoutMs = 25_000) =>
      new Promise<boolean>((resolve) => {
        const started = Date.now();
        const id = setInterval(() => {
          if (cancelled || walkTargetRef.current === null) {
            clearInterval(id);
            watchers.delete(id);
            resolve(!cancelled);
            return;
          }
          if (Date.now() - started > timeoutMs) {
            clearInterval(id);
            watchers.delete(id);
            walkTargetRef.current = null;
            resolve(false);
          }
        }, 60);
        watchers.add(id);
      });

    // Director lines never stack on top of a bubble that's already up; the
    // motion half of an act still runs.
    const say = (text: string) => {
      // The tour owns the pet's voice while it's up — an ambient one-liner
      // popping over a tour card reads as two pets talking at once.
      if (tourRef.current !== null) return;
      if (bubbleVisibleRef.current) return;
      showBubble(text);
    };

    const ambientLine = async () => {
      const persona = personaRef.current;
      const flavors = (["funny", "sarcastic", "helpful", "cozy"] as const).filter(
        (flavor) => persona[flavor],
      );
      if (flavors.length === 0) return;
      let ctx: AmbientContext;
      try {
        ctx = readAmbient(await looseRpc(pluginId, "getAmbientContext"));
      } catch {
        return;
      }
      if (cancelled) return;
      const line = pickLine([...flavors], ctx, recentLinesRef.current);
      if (!line) return;
      recentLinesRef.current = [...recentLinesRef.current, line].slice(-RECENT_LINES);
      say(line);
    };

    const wander = async () => {
      const { minX, maxX } = bounds();
      // Might end in a sit, so the destination has to be off the ledge.
      walkToClear(randomBetween(minX, maxX));
      if (!(await arrival())) return;
      if (Math.random() < 0.4) momentRef.current = { state: "sit", until: Date.now() + 4000 };
    };

    const zoomies = async () => {
      const { minX, maxX } = bounds();
      sounds.boing();
      zoomiesRef.current = 3;
      const legs = [minX, maxX, randomBetween(minX + (maxX - minX) * 0.25, minX + (maxX - minX) * 0.75)];
      for (const leg of legs) {
        if (cancelled) break;
        walkTo(leg);
        await arrival(12_000);
        zoomiesRef.current = Math.max(0, zoomiesRef.current - 1);
        if (cancelled) break;
        await sleep(120);
      }
      zoomiesRef.current = 0;
    };

    const cursorChase = () =>
      new Promise<void>((resolve) => {
        const started = Date.now();
        const id = setInterval(() => {
          const finish = () => {
            clearInterval(id);
            watchers.delete(id);
            walkTargetRef.current = null;
            resolve();
          };
          const mouseX = lastMouseXRef.current;
          if (cancelled || mouseX === null) {
            finish();
            return;
          }
          const { width } = bounds();
          const petCenterX = (posRef.current.x ?? 0) + width / 2;
          if (Math.abs(petCenterX - mouseX) < 44) {
            momentRef.current = { state: "jump", until: Date.now() + 900 };
            say("gotcha.");
            sounds.pet();
            finish();
            return;
          }
          walkTo(mouseX - width / 2);
          if (Date.now() - started >= 6000) finish();
        }, 300);
        watchers.add(id);
      });

    const edgePeek = async () => {
      walkTo(EDGE_MARGIN);
      if (!(await arrival())) return;
      pulseClass("pets-peek", 1900);
      await sleep(1900);
      if (cancelled) return;
      momentRef.current = { state: "wave", until: Date.now() + 1500 };
    };

    const sidebarDig = async () => {
      const row = document.querySelector("[data-sidebar-thread-id]");
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const { width } = bounds();
      walkToClear(rect.right + 24 - width / 2);
      if (!(await arrival())) return;
      momentRef.current = { state: "dig", until: Date.now() + 2600 };
      if (Math.random() < 0.5) say("anything good in here?");
    };

    const composerWatch = async () => {
      const rect = composerRect();
      if (!rect) return;
      const { width, minX, maxX } = bounds();
      // Sit BESIDE the input, never on it — whichever side the pet is nearer.
      const center = rect.left + rect.width / 2;
      const side =
        (posRef.current.x ?? 0) + width / 2 < center
          ? rect.left - width - COMPOSER_PAD
          : rect.right + COMPOSER_PAD;
      walkTo(Math.min(Math.max(side, minX), maxX));
      if (!(await arrival())) return;
      facingRef.current = center >= (posRef.current.x ?? 0) + width / 2 ? 1 : -1;
      momentRef.current = { state: "sit", until: Date.now() + 6000 };
    };

    /**
     * The three bits of bb chrome the pet is allowed to have opinions about:
     * its own paw button in the sidebar footer, its row in the nav rail, and
     * whatever pane header is on screen. Anything that isn't there right now is
     * simply not a candidate.
     */
    const landmarks = (): Element[] => {
      const found: (Element | null | undefined)[] = [
        document.querySelector('[aria-label="Pets"]') ??
          document.querySelector("[data-sidebar-footer]"),
        Array.from(document.querySelectorAll("nav a, nav button, [role='navigation'] a")).find(
          (el) => (el.textContent ?? "").trim() === "Pets",
        ),
        document.querySelector("[role='tablist']") ?? document.querySelector("[data-pane-header]"),
      ];
      return found.filter((el): el is Element => {
        if (!el) return false;
        const node = el as HTMLElement;
        if (node.checkVisibility ? !node.checkVisibility() : false) return false;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    };

    const inspectChrome = async () => {
      const targets = landmarks();
      const target = targets[Math.floor(Math.random() * targets.length)];
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const { width, minX, maxX } = bounds();
      const center = rect.left + rect.width / 2;
      walkToClear(Math.min(Math.max(center - width / 2, minX), maxX));
      if (!(await arrival())) return;
      facingRef.current = center >= (posRef.current.x ?? 0) + width / 2 ? 1 : -1;
      // "point" is optional in an atlas; resolveState hands back the nearest
      // pose it does have, so a thin atlas gets a wave instead of nothing.
      const states = atlasRef.current?.states;
      const pose = states ? resolveState(states, "point") : "wave";
      momentRef.current = { state: pose, until: Date.now() + 1800 };
      await sleep(1800);
    };

    const danceBreak = async () => {
      momentRef.current = { state: "dance", until: Date.now() + 3000 };
      burstSparkles();
      await sleep(3000);
    };

    const acts: {
      label: string;
      weight: number;
      motion: boolean;
      enabled: (persona: Persona) => boolean;
      run: () => Promise<void> | void;
    }[] = [
      {
        label: "ambient-line",
        weight: 30,
        motion: false,
        enabled: (p) => p.funny || p.sarcastic || p.helpful || p.cozy,
        run: ambientLine,
      },
      { label: "wander", weight: 20, motion: true, enabled: (p) => p.cozy, run: wander },
      { label: "zoomies", weight: 12, motion: true, enabled: (p) => p.chaotic, run: zoomies },
      { label: "cursor-chase", weight: 10, motion: true, enabled: (p) => p.chaotic, run: cursorChase },
      { label: "edge-peek", weight: 8, motion: true, enabled: (p) => p.chaotic, run: edgePeek },
      {
        label: "sidebar-dig",
        weight: 8,
        motion: true,
        enabled: (p) => p.chaotic || p.funny,
        run: sidebarDig,
      },
      {
        label: "composer-watch",
        weight: 8,
        motion: true,
        enabled: (p) => p.cozy || p.helpful,
        run: composerWatch,
      },
      { label: "dance-break", weight: 6, motion: true, enabled: (p) => p.funny, run: danceBreak },
      {
        label: "inspect-chrome",
        weight: 6,
        motion: true,
        enabled: (p) => p.cozy || p.funny,
        run: inspectChrome,
      },
    ];

    const schedule = () => {
      if (cancelled) return;
      const [min, max] = DIRECTOR_RANGES[personaRef.current.level] ?? DIRECTOR_RANGES.lively;
      nextTimer = setTimeout(fire, randomBetween(min, max));
    };

    function fire() {
      nextTimer = null;
      if (cancelled) return;
      const moment = momentRef.current;
      const busy =
        document.hidden ||
        !(dataRef.current?.settings.enabled ?? false) ||
        menuOpenRef.current ||
        !!dragRef.current ||
        nappingRef.current ||
        // The tour is doing its own choreography; the director waits its turn.
        tourRef.current !== null ||
        !!missionRef.current ||
        !!(moment && Date.now() < moment.until) ||
        walkTargetRef.current !== null ||
        airborneRef.current ||
        bubbleVisibleRef.current;
      if (busy) {
        schedule();
        return;
      }
      const persona = personaRef.current;
      const pool = acts.filter(
        (act) => act.enabled(persona) && (!reducedMotion || !act.motion),
      );
      const total = pool.reduce((sum, act) => sum + act.weight, 0);
      if (total <= 0) {
        schedule();
        return;
      }
      let roll = Math.random() * total;
      const chosen = pool.find((act) => (roll -= act.weight) < 0) ?? pool[0];
      if (chosen) logDebug("act", chosen.label);
      currentActRef.current = chosen?.label ?? null;
      void Promise.resolve()
        .then(() => chosen?.run())
        .catch(() => {})
        .finally(() => {
          currentActRef.current = null;
          schedule();
        });
    }

    schedule();
    return () => {
      cancelled = true;
      if (nextTimer) clearTimeout(nextTimer);
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      for (const watcher of watchers) clearInterval(watcher);
      watchers.clear();
      zoomiesRef.current = 0;
      currentActRef.current = null;
    };
    // Narrow on purpose (same reasoning as the rAF loop): live settings are
    // read through refs inside, so payload churn must not restart the director.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.pet?.id,
    data?.settings.enabled,
    burstSparkles,
    pluginId,
    pulseClass,
    reducedMotion,
    showBubble,
    walkTo,
    walkToClear,
  ]);

  // --- interactions ----------------------------------------------------------

  const onPointerDown =(event: React.PointerEvent<HTMLElement>) => {
    // ctrl+click on macOS arrives as button 0 but becomes a contextmenu —
    // treating it as a pet-tap made right-clicks also pet the pet.
    if (event.button !== 0 || event.ctrlKey || menuOpenRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const pos = posRef.current;
    airborneRef.current = false;
    velRef.current = { vx: 0, vy: 0 };
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x ?? 0,
      originYBottom: pos.yBottom,
      moved: false,
      trail: [{ x: event.clientX, y: event.clientY, t: performance.now() }],
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      if (!drag.moved) {
        // Picking the pet up ends the game: a carried ball would otherwise
        // follow it into the air and the boost would outlive the chase.
        cancelFetch();
        snackTargetRef.current = null;
      }
      drag.moved = true;
      setGrabbed(true);
    }
    if (drag.moved) {
      const pos = posRef.current;
      pos.x = drag.originX + dx;
      pos.yBottom = Math.max(GROUND_PX, Math.min(window.innerHeight - 90, drag.originYBottom - dy));
      drag.trail.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (drag.trail.length > 6) drag.trail.shift();
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
    if (drag.moved) {
      const pos = posRef.current;
      // Dropped onto a sidebar thread row? That's a navigation gesture — it
      // wins over toss/perch physics.
      const row = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-sidebar-thread-id]");
      const droppedThreadId = row?.getAttribute("data-sidebar-thread-id");
      if (droppedThreadId) {
        const thread = fleetRef.current?.threads.find((t) => t.id === droppedThreadId);
        if (thread) navigateToThread(thread.projectId, thread.id);
        else navigateTo(`/threads/${droppedThreadId}`);
        momentRef.current = { state: "celebrate", until: Date.now() + 1400 };
        sounds.pet();
        pos.parked = false;
        pos.yBottom = GROUND_PX;
        airborneRef.current = false;
        velRef.current = { vx: 0, vy: 0 };
        tiltRef.current = 0;
        persistPrefs();
        return;
      }
      // Release velocity from the last ~100ms of pointer trail.
      const nowT = performance.now();
      const recent = drag.trail.filter((p) => nowT - p.t < 110);
      const first = recent[0];
      const last = recent[recent.length - 1];
      let vx = 0;
      let vy = 0;
      if (first && last && last.t > first.t) {
        const span = (last.t - first.t) / 1000;
        vx = (last.x - first.x) / span;
        vy = (last.y - first.y) / span;
      }
      const speed = Math.hypot(vx, vy);
      if (!reducedMotion && speed > TOSS_MIN_SPEED) {
        // Tossed. Physics takes it from here.
        pos.parked = false;
        airborneRef.current = true;
        velRef.current = { vx: vx * 0.85, vy: -vy * 0.85 };
        momentRef.current = null;
      } else if (pos.yBottom > GROUND_PX + 50) {
        pos.parked = true;
        missionRef.current = null;
        setHighlight(null);
        persistPrefs();
      } else if (!reducedMotion) {
        pos.parked = false;
        airborneRef.current = true;
        velRef.current = { vx: 0, vy: 0 };
      } else {
        pos.parked = false;
        pos.yBottom = GROUND_PX;
        persistPrefs();
      }
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      if (menuOpenRef.current) return; // a context menu opened mid-tap
      // Mid-point: the pet is showing you a thread. Tapping it means "yes,
      // take me there" — not "pet me".
      const pointing = missionRef.current;
      if (pointing?.phase === "point") {
        missionRef.current = null;
        lastHighlightRectRef.current = null;
        setHighlight(null);
        navigateToThread(pointing.thread.projectId, pointing.thread.id);
        return;
      }
      petThePet();
    }, 260);
  };

  // A drag the browser takes away (pointercancel, lost capture) never reaches
  // onPointerUp, which used to leave dragRef set — the loop treats that as
  // "frozen" and the pet stops moving forever. Drop the drag and let grounding
  // physics pick it up from wherever it was left.
  const onPointerAbort = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
  };

  const onDoubleClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    void rpc(pluginId, "getNeediestThread")
      .then(({ thread }) => {
        if (thread) navigateToThread(thread.projectId, thread.id);
        else showBubble("Nothing needs you. Suspicious.", { important: true });
      })
      .catch(() => {});
  };

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (!event.altKey) return;
    event.preventDefault();
    nudgeSize(-Math.sign(event.deltaY) * 0.1);
  };

  // Right-clicking a pet parked at the window bottom makes radix flip the menu
  // UPWARD, which lands the final group under the pointer — and radix honours
  // press-drag-release, so letting go of the button instantly "selects" it.
  // Swallow any selection that arrives too soon after the open to be a real
  // choice. Twin of the 350ms dismiss guard in onOpenChange.
  const guardedSelect = (fn: () => void) => () => {
    if (Date.now() - menuOpenedAtRef.current < 450) return;
    fn();
  };

  // --- render ----------------------------------------------------------------

  const pet = data?.pet;
  const hidden =
    !pet ||
    !data.settings.enabled ||
    sessionHidden ||
    (data.settings.hideOnCompact && compact);
  if (hidden) return null;

  // Owned by the settings half of this feature; read defensively so this file
  // compiles and behaves whichever lands first.
  const highContrast = data.settings.highContrast ?? false;
  const waitingCount = fleet?.counts.waiting ?? 0;
  const failedCount = fleet?.counts.failed ?? 0;
  // Menu header: a static idle portrait plus stage progress.
  const portraitState = resolveState(pet.atlas.states, "idle");
  const portraitSpec = pet.atlas.states[portraitState];
  const stageFloor = pet.stage.minXp;
  const stageCeiling = pet.nextStage?.minXp ?? null;
  const stageProgress =
    stageCeiling !== null && stageCeiling > stageFloor
      ? Math.min(1, Math.max(0, (pet.xp - stageFloor) / (stageCeiling - stageFloor)))
      : 1;
  const sizePercent = Math.round((pet.sizeScale ?? 1) * 100);

  return (
    <>
      <AnimatePresence>
        {highlight ? (
          <motion.div
            key={highlight.key}
            className={`pets-ring${highContrast ? " pets-hc" : ""}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0.9, 0.5, 0.9, 0.5, 0.85], scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{
              opacity: { duration: 2.6, times: [0, 0.25, 0.5, 0.75, 1] },
              scale: { type: "spring", stiffness: 500, damping: 22 },
            }}
            style={{
              left: highlight.rect.left - 3,
              top: highlight.rect.top - 3,
              width: highlight.rect.width + 6,
              height: highlight.rect.height + 6,
            }}
          />
        ) : null}
      </AnimatePresence>
      <div
        ref={anchorRef}
        className={`pets-anchor${highContrast ? " pets-hc" : ""}`}
        style={{ position: "fixed", left: 0, bottom: GROUND_PX, zIndex: 38, pointerEvents: "none" }}
      >
        {/* The bubble, for screen readers. The visual bubble is aria-hidden, so
            what the pet says is announced exactly once, politely, and without a
            button role turning up in the reading order every few minutes. */}
        <div className="pets-sr-only" role="status" aria-live="polite">
          {bubble?.text ?? ""}
        </div>
        {/* Seasonal accent. An anchor child, so it rides the pet's transform
            for free. Hidden while napping (it reads odd perched over a lying
            pet) and during the ceremony, which owns the screen. */}
        {seasonal && seasonalFlair && !napping && !ceremony ? (
          <span className="pets-seasonal" aria-hidden="true">
            {seasonal}
          </span>
        ) : null}
        <AnimatePresence>
          {bubble ? (
            <motion.button
              type="button"
              key={bubble.until}
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 480, damping: 26 }}
              ref={bubbleElRef}
              aria-hidden="true"
              className={`pets-bubble pets-bubble-${bubbleFit?.side ?? bubble.side} border border-border bg-card text-card-foreground shadow-md`}
              // Once measured, the bubble is positioned purely from the left so
              // the clamp is expressible in one number; until then the side
              // classes hold it in roughly the right place.
              style={bubbleFit ? { left: bubbleFit.left, right: "auto" } : undefined}
              onClick={() => {
                if (bubble.threadId && bubble.projectId) {
                  navigateToThread(bubble.projectId, bubble.threadId);
                }
                setBubble(null);
              }}
            >
              {bubble.text}
            </motion.button>
          ) : null}
        </AnimatePresence>
        {(data.settings.showEmotions ?? false) ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={spriteState}
              className={`pointer-events-none absolute rounded-full border bg-card px-2 py-0.5 text-[10px] ${
                highContrast
                  ? "border-foreground/40 text-foreground"
                  : "border-border text-muted-foreground"
              }`}
              // The badge used to unmount whenever the pet spoke. Instead it
              // steps aside: a bubble grows away from the pet on its own side,
              // so the badge tucks against the pet's OPPOSITE flank and the two
              // never share the same strip of window.
              style={{
                bottom: "calc(100% + 6px)",
                ...(bubble
                  ? (bubbleFit?.side ?? bubble.side) === "left"
                    ? { right: "calc(100% + 6px)", left: "auto" }
                    : { left: "calc(100% + 6px)", right: "auto" }
                  : { left: 0 }),
                width: "max-content",
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {EMOTION_LABELS[spriteState]}
            </motion.div>
          </AnimatePresence>
        ) : null}
        <AnimatePresence>
          {waitingCount > 0 && !napping && !menuOpenState && (data.settings.attentionPip ?? true) ? (
            <motion.button
              type="button"
              className="pets-pip bg-primary text-primary-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                y: { repeat: Infinity, duration: 1.3, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 500, damping: 20 },
              }}
              title={`${waitingCount} waiting — show me`}
              aria-label={`${waitingCount} threads waiting — walk to one`}
              onClick={() => pointAtAttention()}
            >
              {waitingCount}
            </motion.button>
          ) : null}
        </AnimatePresence>
        {motes.map((mote) => (
          <span key={mote.id} className="pets-mote text-primary">
            {mote.text}
          </span>
        ))}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="pets-particle text-rose-400"
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, x: heart.dx, y: heart.dy, scale: 1.15 }}
              transition={{ duration: 1.25, ease: "easeOut" }}
            >
              {heart.char}
            </motion.span>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.span
              key={sparkle.id}
              className="pets-particle text-amber-300"
              initial={{ opacity: 1, x: 0, y: -10, scale: 0.4 }}
              animate={{ opacity: 0, x: sparkle.dx, y: sparkle.dy, scale: 1.3, rotate: 90 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {sparkle.char}
            </motion.span>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {confetti.map((piece, index) => (
            <motion.span
              key={piece.id}
              className="pets-particle"
              initial={{ opacity: 1, x: 0, y: -6, scale: 0.5 }}
              animate={{ opacity: 0, x: piece.dx, y: piece.dy, scale: 1.2, rotate: 180 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: index * 0.02 }}
            >
              {piece.char}
            </motion.span>
          ))}
        </AnimatePresence>
        <ContextMenu
          open={menuOpenState}
          onOpenChange={(open) => {
            if (open) {
              menuOpenedAtRef.current = Date.now();
              setMenuOpenState(true);
              // Kill any pending pet-tap: the same gesture that opened this
              // menu must never also count as petting.
              if (clickTimerRef.current) {
                clearTimeout(clickTimerRef.current);
                clickTimerRef.current = null;
              }
              dragRef.current = null;
              setGrabbed(false);
              void rpc(pluginId, "listDen")
                .then((result) => setDen(result.pets))
                .catch(() => {});
              // Treat wallet, loaded alongside the den. Silent on failure: the
              // server half may not be there yet, and the menu still works.
              void looseRpc(pluginId, "getTreats")
                .then((result) => {
                  const balance = (result as { balance?: unknown } | null)?.balance;
                  if (typeof balance === "number") setTreatBalance(balance);
                })
                .catch(() => {});
              return;
            }
            // The desktop shell fires a focus/blur-driven close immediately
            // after opening; ignore anything that arrives too soon to be a
            // real dismissal.
            if (Date.now() - menuOpenedAtRef.current < 350) return;
            setMenuOpenState(false);
          }}
        >
          <ContextMenuTrigger asChild>
            <div
              ref={bodyRef}
              role="presentation"
              aria-hidden="true"
              className={`pets-body${grabbed ? " pets-grabbed" : ""}${evolving ? " pets-evolving" : ""}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerAbort}
              onLostPointerCapture={onPointerAbort}
              onDoubleClick={onDoubleClick}
              onWheel={onWheel}
              data-state={spriteState}
            >
              <canvas ref={canvasRef} className="pets-canvas" />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-72">
            {/* Header: portrait + identity + stage progress. Deliberately not a
                menu item — it is a read-out, not an action. */}
            <div className="flex items-center gap-3 px-2 py-2">
              <PetPortrait
                src={`${pet.spriteBaseUrl}&state=${portraitState}`}
                frames={portraitSpec?.frames ?? 1}
                size={40}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{pet.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    <NumberFlow value={pet.xp} /> XP
                  </span>
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {pet.stage.name} · {pet.stage.epithet}
                </span>
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${Math.round(stageProgress * 100)}%` }}
                  />
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {pet.xp} XP ·{" "}
                  {pet.nextStage
                    ? `${pet.nextStage.minXp - pet.xp} to ${pet.nextStage.name}`
                    : "max"}
                </span>
                {fleet ? (
                  <span className="text-[10px] text-muted-foreground">
                    fleet: {fleet.counts.active} running · {waitingCount} waiting · {failedCount}{" "}
                    failed
                  </span>
                ) : null}
              </div>
            </div>
            <ContextMenuSeparator />
            {/* Size: a stepper, not a menu item — clicking must not dismiss. */}
            <div className="flex items-center justify-between gap-2 px-2 py-1.5">
              <span className="text-xs text-muted-foreground">Size</span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex size-6 items-center justify-center rounded border border-border text-xs hover:bg-accent"
                  aria-label="Smaller"
                  onClick={() => nudgeSize(-0.1)}
                >
                  −
                </button>
                <span className="w-10 text-center text-xs tabular-nums text-muted-foreground">
                  {sizePercent}%
                </span>
                <button
                  type="button"
                  className="flex size-6 items-center justify-center rounded border border-border text-xs hover:bg-accent"
                  aria-label="Bigger"
                  onClick={() => nudgeSize(0.1)}
                >
                  +
                </button>
              </span>
            </div>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={guardedSelect(petThePet)}>Pet {pet.name}</ContextMenuItem>
            <ContextMenuItem
              disabled={waitingCount + failedCount === 0}
              onSelect={guardedSelect(() => pointAtAttention())}
            >
              Show me what needs attention
            </ContextMenuItem>
            <ContextMenuItem onSelect={guardedSelect(onDoubleClick)}>Take me to the neediest thread</ContextMenuItem>
            <ContextMenuItem onSelect={guardedSelect(fetchLatestFailure)}>Fetch the latest failure</ContextMenuItem>
            <ContextMenuItem
              disabled={treatBalance <= 0}
              onSelect={guardedSelect(() => {
                // The drop itself is driven by the server's treat-drop signal;
                // this only spends the treat.
                setTreatBalance((prev) => Math.max(0, prev - 1));
                void looseRpc(pluginId, "dropTreat")
                  .then((result) => {
                    const balance = (result as { balance?: unknown } | null)?.balance;
                    if (typeof balance === "number") setTreatBalance(balance);
                  })
                  .catch(() => {});
              })}
            >
              Drop a treat ({treatBalance})
            </ContextMenuItem>
            {reducedMotion ? null : (
              <ContextMenuItem disabled={!!ballView} onSelect={guardedSelect(startFetch)}>
                Play fetch
              </ContextMenuItem>
            )}
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>Send to…</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem onSelect={guardedSelect(() => sendToFraction(0.06))}>Left corner</ContextMenuItem>
                <ContextMenuItem onSelect={guardedSelect(() => sendToFraction(0.5))}>Center</ContextMenuItem>
                <ContextMenuItem onSelect={guardedSelect(() => sendToFraction(0.94))}>Right corner</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            {den && den.length > 1 ? (
              <ContextMenuSub>
                <ContextMenuSubTrigger>Switch pet</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  {den.map((entry) => (
                    <ContextMenuItem
                      key={entry.id}
                      disabled={entry.active}
                      onSelect={guardedSelect(() => void rpc(pluginId, "selectPet", { petId: entry.id }).catch(() => {}))}
                    >
                      {entry.active ? "→ " : ""}
                      {entry.name} · {entry.stage.name}
                    </ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
            ) : null}
            <ContextMenuItem onSelect={guardedSelect(() => navigateTo(`/plugins/${pluginId}/pets/hatchery`))}>
              Hatch a new pet…
            </ContextMenuItem>
            {pet.artBehind && data.hasApiKey ? (
              <ContextMenuItem
                onSelect={guardedSelect(() => {
                  void rpc(pluginId, "evolveArt", { petId: pet.id })
                    .then(() => showBubble("New look incoming…", { important: true }))
                    .catch((error: Error) => showBubble(error.message, { important: true }));
                })}
              >
                ✨ Glow up ({pet.stage.name} artwork)
              </ContextMenuItem>
            ) : null}
            <ContextMenuSeparator />
            <ContextMenuItem
              onSelect={guardedSelect(() => {
                setNapping((prev) => !prev);
                if (!napping) {
                  missionRef.current = null;
                  lastHighlightRectRef.current = null;
                  setHighlight(null);
                }
              })}
            >
              {napping ? "Wake up" : "Nap mode"}
            </ContextMenuItem>
            {posRef.current.parked ? (
              <ContextMenuItem
                onSelect={guardedSelect(() => {
                  posRef.current.parked = false;
                  airborneRef.current = true;
                  velRef.current = { vx: 0, vy: 0 };
                  persistPrefs();
                })}
              >
                Come back down
              </ContextMenuItem>
            ) : null}
            <ContextMenuItem onSelect={guardedSelect(() => setSessionHidden(true))}>Hide until reload</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={guardedSelect(startTour)}>Show me around</ContextMenuItem>
            <ContextMenuItem onSelect={guardedSelect(() => navigateTo(`/plugins/${pluginId}/pets`))}>
              Open Pets panel
            </ContextMenuItem>
            <ContextMenuItem onSelect={guardedSelect(() => navigateTo(`/settings/plugins/${pluginId}`))}>
              Settings
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      {/* Treats and the ball are siblings of the anchor, not children: the
          anchor carries the pet's own transform (and is pointer-transparent),
          while these are positioned against the window and the treat has to be
          clickable. Both are painted by the loop through the refs below. */}
      {treatViews.map((treat) => (
        <span
          key={treat.id}
          ref={(node) => {
            const map = treatElsRef.current;
            if (node) map.set(treat.id, node);
            else map.delete(treat.id);
          }}
          className="pets-treat"
          role="button"
          tabIndex={0}
          aria-label="A treat — click to send the pet to it"
          title="A treat"
          style={{
            bottom: GROUND_PX,
            transform: `translate(${treat.x}px, ${-(treat.yBottom - GROUND_PX)}px)`,
          }}
          onClick={() => {
            snackTargetRef.current = treat.id;
          }}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            snackTargetRef.current = treat.id;
          }}
        >
          🍪
        </span>
      ))}
      {ballView ? (
        <motion.div
          key={ballView.key}
          ref={ballElRef}
          className="pets-ball"
          aria-hidden="true"
          style={{
            bottom: GROUND_PX,
            transform: `translate(${ballView.x}px, ${-(ballView.yBottom - GROUND_PX)}px)`,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: ballView.fading ? 0 : 1 }}
          transition={{ duration: ballView.fading ? BALL_FADE_MS / 1000 : 0, ease: "linear" }}
        />
      ) : null}
      {visitor ? (
        <VisitorCameo
          key={visitor.pet.id + String(visitor.direction)}
          pet={visitor.pet}
          direction={visitor.direction}
          onDone={() => setVisitor(null)}
        />
      ) : null}
      {/* The onboarding tour card. Parked beside the pet (placed every frame by
          the effect above, so it rides drags and tosses) and above the pet's own
          furniture at z-index 45, but nothing else is blocked: the pet stays
          draggable, right-clickable and pettable all the way through. */}
      <AnimatePresence>
        {tour !== null ? (
          <motion.div
            key="pets-tour"
            ref={tourCardRef}
            role="dialog"
            aria-label="Pet tour"
            className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg max-w-72"
            style={{ position: "fixed", left: 0, top: 0, zIndex: 45, pointerEvents: "auto" }}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 460, damping: 28 }}
          >
            <div className="text-xs">{TOUR_STEPS[tour]?.text ?? ""}</div>
            <div className="mt-2 flex items-center gap-1" aria-hidden="true">
              {TOUR_STEPS.map((step, index) => (
                <span
                  key={step.text}
                  className={`h-1.5 w-1.5 rounded-full ${index === tour ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]" onClick={finishTour}>
                skip
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (tour >= TOUR_LAST) {
                    finishTour();
                    return;
                  }
                  setTour(tour + 1);
                }}
              >
                {tour === TOUR_LAST ? "done" : "next"}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* The evolution set piece, above everything the overlay owns (the anchor
          sits at z-index 38, the ring and cameos at 37), so the bubble and the
          emotion badge are covered by the dim rather than competing with it.
          `mode="wait"` is the never-stack rule: a second evolution can only
          start once the first has finished leaving. */}
      <AnimatePresence mode="wait">
        {ceremony && portraitSpec ? (
          <EvolutionCeremony
            key={ceremony.key}
            info={ceremony}
            spriteUrl={`${pet.spriteBaseUrl}&state=${portraitState}`}
            spec={portraitSpec}
            reducedMotion={reducedMotion}
            onDone={() => setCeremony(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
