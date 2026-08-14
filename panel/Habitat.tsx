// The Habitat — the pet's on-screen home inside the Pets panel. The floating
// overlay is desktop-shaped (and hidden on compact viewports), so this is the
// mobile-first answer: the same canvas pet with the same brain, scoped to a
// container instead of the window.
//
// This runs in a slot, so the real SDK hooks are available (rpc, realtime,
// navigation) — no fetch/WebSocket/pushState improvisation like the overlay.
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useBbNavigate, useRealtime, useRpc } from "@bb/plugin-sdk/app";
import type { rpcContract } from "../server";
import type { RpcOutput } from "../overlay/net";
import { resolveState, type SpriteState } from "../src/atlas";
import { EMOTION_LABELS, charGeometry, nextFrame, randomBetween } from "../overlay/core";
import { sounds } from "../overlay/sounds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type OverlayData = RpcOutput<"getOverlay">;
type Pet = NonNullable<OverlayData["pet"]>;
type Fleet = OverlayData["fleet"];
type OverlaySettings = OverlayData["settings"];

interface Moment {
  state: SpriteState;
  until: number;
}

interface Particle {
  id: number;
  dx: number;
  dy: number;
  char: string;
}

/** A dropped treat. `x` is its LEFT edge; `yBottom` is measured off the stage
 *  floor line, exactly like the pet's own `posRef.yBottom`. */
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
  bounced: boolean;
  startedAt: number;
}

// Target on-screen height of the CHARACTER (not the sprite cell).
const HABITAT_CHAR_HEIGHT = 80;
const EDGE_MARGIN = 12;
const MOMENT_MS = 2800;
const GRAVITY = 2400;
const FLOOR_BOUNCE = 0.38;
const WALL_BOUNCE = 0.5;
const TOSS_MIN_SPEED = 380;
const SETTLE_VY = 140;
// Sustained reactions acknowledge, settle, then remind — never loop forever.
const SUSTAIN_HOLD_MS = 8000;
const SUSTAIN_CALM_MS = 70_000;
const SUSTAIN_REMIND_MS = 2500;
// The "walk speed" setting, as a multiplier on the roaming target speed.
const WALK_SPEEDS: Record<string, number> = { chill: 0.6, normal: 1, zoomies: 1.8 };
// Tapping the ground sends the pet there — deliberately brisker than roaming,
// because it's an instruction, not a mood.
const WALK_TO_SPEED = 90;
const WALK_TO_ARRIVED_PX = 6;

// --- treats + fetch ----------------------------------------------------------
// Play parity with the overlay, scaled to the stage. Both live entirely in refs
// (positions written straight onto the DOM node, like the sprite anchor) —
// React only hears about them when one appears or disappears.
//
// The stage floor line sits FLOOR_INSET px up from the stage's bottom edge; the
// pet anchor is pinned there, so treats and the ball share that origin and every
// `yBottom` below is "height above the floor line", same frame as the pet's.
const FLOOR_INSET = 12;
/** Two on the floor at once is plenty on a stage this size. */
const TREAT_MAX = 2;
const TREAT_SIZE = 16;
/** Treats are lighter than the pet: they drift down rather than plummet. */
const TREAT_GRAVITY = GRAVITY * 0.6;
const TREAT_BOUNCE = -0.3;
/** Where a treat may land, as an inset from each stage edge. */
const TREAT_MIN_X = 16;
const TREAT_MAX_INSET = 24;
/** Close enough to eat, measured centre-to-centre. */
const TREAT_REACH_PX = 14;
const BALL_SIZE = 8;
const BALL_THROW_VY = 320;
/** Throw speed as a fraction of the stage width — a small stage gets a small
 *  throw, so the ball never spends the whole game pinballing off the walls. */
const BALL_THROW_VX_MIN = 0.9;
const BALL_THROW_VX_SPAN = 0.5;
/** Rolling friction, expressed per 60fps frame (time-corrected in the tick). */
const BALL_FRICTION = 0.92;
const BALL_STOP_VX = 12;
const BALL_CATCH_PX = 14;
/** How often the chase re-aims at a moving ball. */
const BALL_CHASE_MS = 200;
const BALL_FADE_MS = 1200;
/** The chase is brisker than an errand — walk speed, boosted. */
const FETCH_BOOST = 1.6;
/** A ball nobody ever went after (napping, dragged) gives up. */
const FETCH_TIMEOUT_MS = 20_000;

/** Lines the habitat pet mutters to itself — sidebar-sized thoughts, kept in
 *  the same lowercase-casual register as the overlay's banks. */
const HABITAT_LINES = [
  "small stage. big presence.",
  "i live in a sidebar and i've made peace with it.",
  "you scroll, i lurk. teamwork.",
  "this floor is mine now. i checked.",
  "paced the whole habitat. took four seconds.",
  "no notes on the decor. some notes on the size.",
  "if i sit here long enough i become furniture.",
  "tiny room, unlimited opinions.",
  "i'd escape but the border is load-bearing.",
  "just vibing in your panel. don't mind me.",
];

/** How long between self-directed acts, by activity level. */
const ACTIVITY_INTERVALS: Record<string, [number, number]> = {
  calm: [480_000, 720_000],
  normal: [240_000, 420_000],
  lively: [120_000, 240_000],
  unhinged: [60_000, 110_000],
};
const HABITAT_BUBBLE_MS = 4500;

let particleSeq = 1;

export function Habitat() {
  const rpc = useRpc<typeof rpcContract>();
  const navigate = useBbNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [fleet, setFleet] = useState<Fleet | null>(null);
  /** First getOverlay settled — "no pet" only means empty after this flips. */
  const [loaded, setLoaded] = useState(false);
  const [napping, setNapping] = useState(false);
  const [grabbed, setGrabbed] = useState(false);
  const [hearts, setHearts] = useState<Particle[]>([]);
  /** Mirrors the tick's sprite state into React, purely so the badge can name it. */
  const [shownState, setShownState] = useState<SpriteState>("idle");
  const [motes, setMotes] = useState<{ id: number; text: string }[]>([]);
  /** The habitat pet's own little speech bubble, from the director below. */
  const [bubble, setBubble] = useState<{ id: number; text: string } | null>(null);
  // Spawn/despawn views only — the tick paints positions onto the nodes, so a
  // falling treat costs no React work at all.
  const [treatViews, setTreatViews] = useState<{ id: number; x: number; yBottom: number }[]>([]);
  const [ballView, setBallView] = useState<
    { key: number; x: number; yBottom: number; fading: boolean } | null
  >(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef(new Map<SpriteState, HTMLImageElement>());
  const momentRef = useRef<Moment | null>(null);
  const petRef = useRef<Pet | null>(null);
  const fleetRef = useRef<Fleet | null>(null);
  const settingsRef = useRef<OverlaySettings | null>(null);
  const sustainRef = useRef(new Map<string, { holdUntil: number; nextRemindAt: number }>());
  const nappingRef = useRef(false);
  const jobActiveRef = useRef(false);
  const frameRef = useRef(0);
  // Frames advanced since the current state began — monotonic, so a play mode
  // can tell "still playing in" from "past the end".
  const rawFrameRef = useRef(0);
  const frameClockRef = useRef(0);
  const posRef = useRef<{ x: number | null; yBottom: number }>({ x: null, yBottom: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const airborneRef = useRef(false);
  const speedRef = useRef(0);
  const tiltRef = useRef(0);
  const facingRef = useRef<1 | -1>(1);
  const stateRef = useRef<SpriteState>("idle");
  /** Ground-tap destination in stage-x, or null when the pet is free to roam. */
  const walkTargetRef = useRef<number | null>(null);
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
  /** Latest derived display width — drag clamping needs it outside the tick. */
  const widthRef = useRef(HABITAT_CHAR_HEIGHT);
  /** Latest derived display height — the carried ball rides above the head. */
  const heightRef = useRef(HABITAT_CHAR_HEIGHT);
  // --- treats + fetch ---
  const treatsRef = useRef<Treat[]>([]);
  /** DOM nodes of the live treats, keyed by id — the loop paints through these. */
  const treatElsRef = useRef(new Map<number, HTMLElement>());
  /** id of the treat the pet is currently walking to, if any. */
  const snackTargetRef = useRef<number | null>(null);
  const ballRef = useRef<Ball | null>(null);
  const ballElRef = useRef<HTMLDivElement | null>(null);
  /** True for the whole fetch (chase AND carry) — it's what boosts walk speed. */
  const fetchActiveRef = useRef(false);
  const nextChaseRef = useRef(0);
  /** Timeouts owned by treats/fetch, so unmount can drop every one of them. */
  const playTimersRef = useRef(new Set<ReturnType<typeof setTimeout>>());
  /** The tick calls rpc without wanting to be rebuilt whenever `rpc` changes. */
  const rpcRef = useRef(rpc);
  rpcRef.current = rpc;
  const paintedRef = useRef<{
    state: SpriteState | null;
    frame: number;
    facing: number;
    tilt: number;
    x: number | null;
    y: number;
    scale: number;
  }>({ state: null, frame: -1, facing: 0, tilt: 0, x: null, y: -1, scale: 0 });
  petRef.current = pet;
  fleetRef.current = fleet;
  nappingRef.current = napping;

  // Settings arrive async, so reduced motion can't be a mount-time useMemo —
  // the tick asks for it fresh, OS preference OR the plugin's own switch.
  const prefersReducedMotionRef = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const isReducedMotion = useCallback(
    () => settingsRef.current?.reducedMotion === "on" || prefersReducedMotionRef.current,
    [],
  );

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

  const load = useCallback(() => {
    rpc
      .call("getOverlay")
      .then((next) => {
        setPet(next.pet);
        setFleet(next.fleet);
        settingsRef.current = next.settings;
        setLoaded(true);
      })
      .catch(() => {});
  }, [rpc]);

  useEffect(load, [load]);

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

  /** Drop a treat in at a horizontal fraction of the stage (0..1). */
  const dropTreatAt = useCallback(
    (fraction: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const stageWidth = stage.clientWidth;
      const maxX = Math.max(TREAT_MIN_X, stageWidth - TREAT_MAX_INSET);
      const x = Math.min(Math.max(fraction * stageWidth, TREAT_MIN_X), maxX);
      const treat: Treat = {
        id: particleSeq++,
        x,
        // Straight in off the top edge of the stage, in floor-line coordinates.
        yBottom: Math.max(0, stage.clientHeight - FLOOR_INSET),
        vy: 0,
        landed: false,
        bounced: false,
      };
      // A third treat pushes the oldest one out.
      const next = [...treatsRef.current, treat].slice(-TREAT_MAX);
      treatsRef.current = next;
      for (const id of [...treatElsRef.current.keys()]) {
        if (!next.some((t) => t.id === id)) treatElsRef.current.delete(id);
      }
      if (snackTargetRef.current !== null && !next.some((t) => t.id === snackTargetRef.current)) {
        snackTargetRef.current = null;
      }
      syncTreats();
    },
    [syncTreats],
  );

  /** Tear a fetch down mid-flight: no ball, no boost, no lingering target. */
  const cancelFetch = useCallback(() => {
    const had = !!ballRef.current;
    ballRef.current = null;
    ballElRef.current = null;
    fetchActiveRef.current = false;
    nextChaseRef.current = 0;
    if (had) {
      walkTargetRef.current = null;
      setBallView(null);
    }
  }, []);

  useRealtime("pets", (payload) => {
    const signal = payload as {
      kind?: string;
      fleet?: Fleet;
      moment?: "celebrate" | "sad";
      amount?: number;
      xp?: number;
      stageIndex?: number;
      stageName?: string;
      evolved?: boolean;
      petId?: string;
      job?: unknown;
      /** treat-drop: horizontal landing spot, as a 0..1 fraction of the stage. */
      x?: number;
    } | null;
    switch (signal?.kind) {
      case "fleet":
        if (signal.fleet) setFleet(signal.fleet);
        break;
      case "job":
        jobActiveRef.current = !!signal.job;
        break;
      case "moment": {
        if (!signal.moment) break;
        const behavior = settingsRef.current;
        if (signal.moment === "sad" ? !(behavior?.reactFailures ?? true) : !(behavior?.reactTurnComplete ?? true)) {
          break;
        }
        momentRef.current = { state: signal.moment, until: Date.now() + MOMENT_MS };
        break;
      }
      case "xp": {
        setPet((prev) => {
          if (!prev || prev.id !== signal.petId) return prev;
          return {
            ...prev,
            xp: signal.xp ?? prev.xp,
            stage: signal.stageName
              ? {
                  ...prev.stage,
                  index: signal.stageIndex ?? prev.stage.index,
                  name: signal.stageName,
                }
              : prev.stage,
          };
        });
        if (signal.evolved && (settingsRef.current?.evolutionCeremony ?? true)) {
          momentRef.current = { state: "dance", until: Date.now() + 4200 };
          sounds.evolve();
        }
        if (
          typeof signal.amount === "number" &&
          (settingsRef.current?.xpMotes ?? true) &&
          signal.amount >= 10
        ) {
          const id = particleSeq++;
          const text = `+${signal.amount}`;
          setMotes((prev) => [...prev.slice(-3), { id, text }]);
          setTimeout(() => setMotes((prev) => prev.filter((m) => m.id !== id)), 1500);
        }
        break;
      }
      // The same signal the overlay eats — one channel, both surfaces. The
      // habitat just scales the landing fraction to the stage instead of the
      // window.
      case "treat-drop":
        dropTreatAt(typeof signal.x === "number" ? signal.x : Math.random());
        break;
      case "pet-changed":
      case "evolved-art":
      case "hatched":
      case "settings-changed":
        load();
        break;
      default:
        break;
    }
  });

  // Preload strip images whenever the artwork identity changes.
  const artKey = pet ? `${pet.id}:${pet.artStage}` : null;
  useEffect(() => {
    if (!pet) return;
    const images = new Map<SpriteState, HTMLImageElement>();
    for (const state of Object.keys(pet.atlas.states) as SpriteState[]) {
      const img = new Image();
      img.src = `${pet.spriteBaseUrl}&state=${state}`;
      images.set(state, img);
    }
    imagesRef.current = images;
    paintedRef.current.state = null; // force repaint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artKey, pet?.spriteBaseUrl]);

  const burstHearts = useCallback(() => {
    const burst: Particle[] = Array.from({ length: 5 }, () => ({
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

  const petThePet = useCallback(() => {
    const current = petRef.current;
    if (!current) return;
    if (nappingRef.current) setNapping(false);
    burstHearts();
    momentRef.current = { state: "love", until: Date.now() + 1400 };
    sounds.pet();
    void rpc.call("petPet", { petId: current.id }).catch(() => {});
  }, [burstHearts, rpc]);

  /** Throw the ball. One at a time, and never under reduced motion. */
  const startFetch = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || isReducedMotion() || ballRef.current) return;
    if (nappingRef.current) setNapping(false);
    const pos = posRef.current;
    const width = widthRef.current;
    const originX = pos.x ?? 0;
    const center = originX + width / 2;
    const stageWidth = stage.clientWidth;
    // Away from the nearest wall, so the throw has room to travel.
    const direction = center < stageWidth / 2 ? 1 : -1;
    ballRef.current = {
      x: center - BALL_SIZE / 2,
      yBottom: pos.yBottom + heightRef.current * 0.55,
      vx: direction * stageWidth * (BALL_THROW_VX_MIN + Math.random() * BALL_THROW_VX_SPAN),
      vy: BALL_THROW_VY,
      phase: "flying",
      originX,
      bounced: false,
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
  }, [isReducedMotion]);

  const goToNeediest = useCallback(() => {
    void rpc
      .call("getNeediestThread")
      .then(({ thread }) => {
        if (thread) navigate.toThread(thread.id);
        else toast("Nothing needs you. Enjoy it while it lasts.");
      })
      .catch(() => {});
  }, [navigate, rpc]);

  const toggleNap = useCallback(() => setNapping((prev) => !prev), []);

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
    const moment = momentRef.current;
    if (moment && now < moment.until) return moment.state;
    // A ground tap is an explicit instruction — it outranks every mood.
    if (walkTargetRef.current !== null) return "walk";
    const settings = settingsRef.current;
    // Every live condition is collected BEFORE anything returns, so the purge
    // below always runs — an early return used to strand decay clocks for
    // conditions that had already gone away.
    const candidates: { family: string; state: SpriteState }[] = [];
    if (jobActiveRef.current && (settings?.digWhileGenerating ?? true)) {
      candidates.push({ family: "job", state: "dig" });
    }
    const currentFleet = fleetRef.current;
    if (currentFleet) {
      if (currentFleet.mood === "waiting") {
        candidates.push({ family: "fleet-waiting", state: "waiting" });
      } else if (currentFleet.mood === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push({
          family: "fleet-failed",
          state: currentFleet.counts.failed >= 3 ? "grumpy" : "sad",
        });
      } else if (currentFleet.mood === "active") {
        candidates.push({
          family: "fleet-active",
          state: currentFleet.counts.active >= 3 ? "run" : "walk",
        });
      }
    }
    // Conditions that went away forget their decay clocks.
    const present = new Set(candidates.map((candidate) => candidate.family));
    for (const key of [...sustainRef.current.keys()]) {
      if (!present.has(key)) sustainRef.current.delete(key);
    }
    for (const candidate of candidates) {
      const s = sustained(candidate.family, candidate.state);
      if (s) return s;
    }
    return roamRef.current.mode === "stroll" ? "walk" : "idle";
  }, [sustained]);

  // --- the loop --------------------------------------------------------------

  useEffect(() => {
    if (!pet) return;
    let raf = 0;
    let lastTick = performance.now();
    const atlas = pet.atlas;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - lastTick) / 1000);
      lastTick = now;
      const stage = stageRef.current;
      if (!stage || document.hidden) return;
      const reducedMotion = isReducedMotion();

      let nextState = deriveState();
      nextState = resolveState(atlas.states, nextState);
      if (nextState !== stateRef.current) {
        stateRef.current = nextState;
        setShownState(nextState);
        frameRef.current = 0;
        rawFrameRef.current = 0;
        frameClockRef.current = 0;
        // A little squash emphasis when snapping into an expressive pose.
        if (
          !reducedMotion &&
          (nextState === "celebrate" || nextState === "point" || nextState === "waiting")
        ) {
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
        }
      }

      // --- display geometry (character-normalized, computed once per tick) ---
      // Slicing geometry comes from the IMAGE BYTES (naturalWidth/Height),
      // never from the atlas — a cache layer can pair stale bytes with a fresh
      // atlas, and atlas-derived rects then leak slivers of neighbouring frames.
      const img = imagesRef.current.get(nextState);
      const ready = !!img && img.complete && img.naturalWidth > 0;
      const srcCellW = ready ? Math.floor(img.naturalWidth / spec.frames) : spec.width / spec.frames;
      const srcH = ready ? img.naturalHeight : spec.height;
      const petScale = petRef.current?.sizeScale ?? 1;
      const charTarget = HABITAT_CHAR_HEIGHT * petScale;
      const { width, height } = charGeometry(atlas, spec, srcCellW, charTarget);
      widthRef.current = width;
      heightRef.current = height;

      const pos = posRef.current;
      const vel = velRef.current;
      const minX = EDGE_MARGIN;
      const maxX = Math.max(minX, stage.clientWidth - width - EDGE_MARGIN);
      const stageHeight = stage.clientHeight;
      if (pos.x === null) pos.x = Math.min(maxX, stage.clientWidth * 0.18);

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
        if (pos.yBottom <= 0) {
          pos.yBottom = 0;
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
          }
        }
      } else if (!airborneRef.current) {
        tiltRef.current = 0;
        if (!dragRef.current) pos.yBottom = 0;
      }
      pos.x = Math.min(Math.max(pos.x, minX), maxX);
      pos.yBottom = Math.min(pos.yBottom, Math.max(0, stageHeight - 100));

      // --- treats + fetch ----------------------------------------------------
      // Runs BEFORE the walk-to block below, so a destination chosen here is
      // acted on in the same frame rather than one behind.
      const playNow = Date.now();
      const treats = treatsRef.current;

      // Falling treats: lighter gravity, one bounce, then they sit there.
      for (const treat of treats) {
        if (treat.landed) continue;
        treat.vy -= TREAT_GRAVITY * dt;
        treat.yBottom += treat.vy * dt;
        if (treat.yBottom <= 0) {
          treat.yBottom = 0;
          // Reduced motion: no bounce, the treat simply arrives.
          if (!reducedMotion && !treat.bounced && Math.abs(treat.vy) > 120) {
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
        !airborneRef.current &&
        !nappingRef.current &&
        !dragRef.current &&
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
            pulseClass("pets-land", 200);
            sounds.pet();
            void rpcRef.current.call("eatTreat").catch(() => {});
            syncTreats();
          } else {
            facingRef.current = treatCenter >= pos.x + width / 2 ? 1 : -1;
            walkTargetRef.current = Math.min(Math.max(treatCenter - width / 2, minX), maxX);
          }
        }
      }

      // Paint every live treat (cheap: at most two nodes).
      for (const treat of treatsRef.current) {
        const node = treatElsRef.current.get(treat.id);
        if (node) node.style.transform = `translate(${treat.x}px, ${-treat.yBottom}px)`;
      }

      // --- fetch ---
      const ball = ballRef.current;
      if (ball) {
        const ballMinX = EDGE_MARGIN;
        const ballMaxX = Math.max(ballMinX, stage.clientWidth - EDGE_MARGIN - BALL_SIZE);
        if (ball.phase === "flying") {
          ball.vy -= GRAVITY * dt;
          ball.x += ball.vx * dt;
          ball.yBottom += ball.vy * dt;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE;
          }
          if (ball.yBottom <= 0) {
            ball.yBottom = 0;
            // Exactly one floor bounce, then it rolls.
            if (!ball.bounced && Math.abs(ball.vy) > SETTLE_VY) {
              ball.bounced = true;
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
          ball.yBottom = 0;
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
            const grounded = ball.phase === "rolling" || ball.yBottom <= 2;
            if (grounded && Math.abs(pos.x + width / 2 - ballCenter) < BALL_CATCH_PX) {
              ball.phase = "carried";
              ball.vx = 0;
              ball.vy = 0;
              nextChaseRef.current = 0;
              sounds.pet();
              walkTargetRef.current = Math.min(Math.max(ball.originX, minX), maxX);
            }
          }
        } else if (ball.phase === "carried" && walkTargetRef.current === null && petFree) {
          // Home again: drop it at the pet's feet and let it fade out.
          ball.phase = "done";
          ball.x = pos.x + width / 2 - BALL_SIZE / 2;
          ball.yBottom = 0;
          fetchActiveRef.current = false;
          momentRef.current = { state: "celebrate", until: playNow + 1400 };
          sounds.pet();
          void rpcRef.current.call("recordFetch").catch(() => {});
          // Hand the LIVE position to React alongside the fade, so the
          // re-render can't snap the ball back to where it was thrown from.
          const restX = ball.x;
          const restY = ball.yBottom;
          setBallView((prev) =>
            prev ? { ...prev, x: restX, yBottom: restY, fading: true } : prev,
          );
          playTimeout(() => {
            if (ballRef.current?.phase === "done") ballRef.current = null;
            setBallView(null);
          }, BALL_FADE_MS);
        }

        const ballNode = ballElRef.current;
        if (ballNode) ballNode.style.transform = `translate(${ball.x}px, ${-ball.yBottom}px)`;
      }

      // --- ground-tap walk-to (outranks roaming while a target stands) ---
      const frozen = !!dragRef.current;
      const walkTarget = walkTargetRef.current;
      if (walkTarget !== null) {
        if (frozen || airborneRef.current || nappingRef.current) {
          // Grabbed, mid-flight or asleep — the instruction is off the table.
          walkTargetRef.current = null;
        } else {
          const goal = Math.min(Math.max(walkTarget, minX), maxX);
          const delta = goal - pos.x;
          if (Math.abs(delta) <= WALK_TO_ARRIVED_PX) {
            pos.x = goal;
            walkTargetRef.current = null;
            speedRef.current = 0;
            pulseClass("pets-land", 200);
          } else {
            const direction = (delta > 0 ? 1 : -1) as 1 | -1;
            const speedFactor = WALK_SPEEDS[settingsRef.current?.walkSpeed ?? "normal"] ?? 1;
            // Fetch is a sprint, not an errand.
            const boost = fetchActiveRef.current ? FETCH_BOOST : 1;
            const step = WALK_TO_SPEED * speedFactor * boost * dt;
            pos.x = Math.abs(delta) <= step ? goal : pos.x + direction * step;
            facingRef.current = direction;
          }
        }
      }

      // --- eased roaming ---
      if (
        walkTargetRef.current === null &&
        !frozen &&
        !airborneRef.current &&
        (nextState === "idle" || nextState === "walk") &&
        !reducedMotion &&
        (settingsRef.current?.roaming ?? true)
      ) {
        const roam = roamRef.current;
        const hustling = nextState === "walk" && roam.mode !== "stroll";
        if (now >= roam.until) {
          const nextDirection = (Math.random() < 0.5 ? -1 : 1) as 1 | -1;
          roam.mode = roam.mode === "stroll" ? "pause" : "stroll";
          if (roam.mode === "stroll" && nextDirection !== roam.direction) {
            pulseClass("pets-turn", 160);
          }
          roam.direction = nextDirection;
          roam.until =
            now +
            (roam.mode === "stroll" ? 1800 + Math.random() * 2600 : 2200 + Math.random() * 4800);
        }
        const speedFactor = WALK_SPEEDS[settingsRef.current?.walkSpeed ?? "normal"] ?? 1;
        const targetSpeed =
          (roam.mode === "stroll" || hustling ? (hustling ? 46 : 26) : 0) * speedFactor;
        speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 6);
        if (speedRef.current > 1) {
          let next = pos.x + roam.direction * speedRef.current * dt;
          if (next <= minX || next >= maxX) {
            roam.direction = roam.direction === 1 ? -1 : 1;
            pulseClass("pets-turn", 160);
            next = Math.min(Math.max(next, minX), maxX);
          }
          pos.x = next;
          facingRef.current = roam.direction;
        }
      } else {
        speedRef.current = 0;
      }

      // Walk bob: a tiny hop synced to the frame phase.
      const bob =
        !reducedMotion && nextState === "walk" && !airborneRef.current
          ? -Math.abs(
              Math.sin(((frameRef.current + frameClockRef.current) / spec.frames) * Math.PI * 2),
            ) * 2.2
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
            ctx.drawImage(
              img,
              frameRef.current * srcCellW,
              0,
              srcCellW,
              srcH,
              -pxW / 2,
              -pxH,
              pxW,
              pxH,
            );
            painted.state = nextState;
            painted.frame = frameRef.current;
            painted.facing = facingRef.current;
            painted.tilt = tilt;
            painted.scale = charTarget;
          }
        }
        const y = -pos.yBottom + bob;
        if (painted.x !== pos.x || painted.y !== y) {
          anchor.style.transform = `translate(${pos.x}px, ${y}px)`;
          painted.x = pos.x;
          painted.y = y;
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    pet,
    deriveState,
    isReducedMotion,
    pulseClass,
    burstHearts,
    cancelFetch,
    playTimeout,
    syncTreats,
  ]);

  useEffect(() => {
    const playTimers = playTimersRef.current;
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      // Nothing from a game outlives the habitat.
      for (const id of playTimers) clearTimeout(id);
      playTimers.clear();
      treatsRef.current = [];
      treatElsRef.current.clear();
      snackTargetRef.current = null;
      ballRef.current = null;
      ballElRef.current = null;
      fetchActiveRef.current = false;
    };
  }, []);

  // --- the director (lite) ---------------------------------------------------
  // The overlay pet has a life of its own; the habitat pet gets a smaller one.
  // On a cadence set by the Activity level, it picks a personality-gated act.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let bubbleTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const say = (text: string) => {
      const id = particleSeq++;
      setBubble({ id, text });
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => {
        bubbleTimer = null;
        setBubble((prev) => (prev && prev.id === id ? null : prev));
      }, HABITAT_BUBBLE_MS);
    };

    const act = () => {
      const settings = settingsRef.current;
      const funny = settings?.personalityFunny ?? true;
      const chaotic = settings?.personalityChaotic ?? true;
      const sarcastic = settings?.personalitySarcastic ?? true;
      const cozy = settings?.personalityCozy ?? true;

      const options: { weight: number; run: () => void }[] = [];
      if (cozy) {
        options.push({
          weight: 3,
          run: () => {
            momentRef.current = { state: "stretch", until: Date.now() + 1800 };
          },
        });
        options.push({
          weight: 3,
          run: () => {
            momentRef.current = { state: "sit", until: Date.now() + 4000 };
          },
        });
        options.push({
          weight: 4,
          run: () => {
            const stage = stageRef.current;
            if (!stage) return;
            const minX = EDGE_MARGIN;
            const maxX = Math.max(minX, stage.clientWidth - widthRef.current - EDGE_MARGIN);
            walkTargetRef.current = minX + Math.random() * (maxX - minX);
          },
        });
      }
      if (funny) {
        options.push({
          weight: 2,
          run: () => {
            momentRef.current = { state: "dance", until: Date.now() + 3000 };
          },
        });
      }
      if (chaotic) {
        options.push({
          weight: 2,
          run: () => {
            momentRef.current = { state: "dig", until: Date.now() + 2400 };
          },
        });
      }
      if (funny || sarcastic || cozy) {
        options.push({
          weight: 3,
          run: () => {
            const line = HABITAT_LINES[Math.floor(Math.random() * HABITAT_LINES.length)];
            if (line) say(line);
          },
        });
      }
      if (options.length === 0) return;

      const total = options.reduce((sum, option) => sum + option.weight, 0);
      let roll = Math.random() * total;
      for (const option of options) {
        roll -= option.weight;
        if (roll <= 0) {
          option.run();
          return;
        }
      }
      options[options.length - 1]?.run();
    };

    const schedule = () => {
      if (cancelled) return;
      const level = settingsRef.current?.activityLevel ?? "lively";
      const [min, max] = ACTIVITY_INTERVALS[level] ?? ACTIVITY_INTERVALS.lively!;
      timer = setTimeout(() => {
        timer = null;
        // Hidden, held, asleep, mid-flight or already on an errand — sit this
        // one out entirely and try again next cycle.
        const busy =
          document.hidden ||
          !!dragRef.current ||
          nappingRef.current ||
          airborneRef.current ||
          walkTargetRef.current !== null;
        if (!busy) act();
        schedule();
      }, randomBetween(min, max));
    };

    schedule();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (bubbleTimer) clearTimeout(bubbleTimer);
    };
  }, []);

  // --- interactions ----------------------------------------------------------

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const pos = posRef.current;
    airborneRef.current = false;
    velRef.current = { vx: 0, vy: 0 };
    // Picked up mid-game: the ball is off, and whatever snack was being walked
    // to stops being an instruction.
    cancelFetch();
    snackTargetRef.current = null;
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

  /** Tap the ground to send the pet there. Taps that land on the pet itself
   *  belong to the drag/pet handlers, so they're handed straight back. */
  const onStagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (bodyRef.current?.contains(event.target as Node)) return;
    const stage = stageRef.current;
    if (!stage || nappingRef.current || airborneRef.current || dragRef.current) return;
    const rect = stage.getBoundingClientRect();
    const width = widthRef.current;
    const minX = EDGE_MARGIN;
    const maxX = Math.max(minX, stage.clientWidth - width - EDGE_MARGIN);
    // A fresh tap replaces whatever destination was standing.
    walkTargetRef.current = Math.min(
      Math.max(event.clientX - rect.left - width / 2, minX),
      maxX,
    );
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      drag.moved = true;
      setGrabbed(true);
    }
    if (drag.moved) {
      const stage = stageRef.current;
      const maxX = stage
        ? Math.max(EDGE_MARGIN, stage.clientWidth - widthRef.current)
        : EDGE_MARGIN;
      const stageHeight = stage?.clientHeight ?? 0;
      const pos = posRef.current;
      pos.x = Math.max(EDGE_MARGIN, Math.min(maxX, drag.originX + dx));
      pos.yBottom = Math.max(0, Math.min(Math.max(0, stageHeight - 100), drag.originYBottom - dy));
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
      if (isReducedMotion()) {
        pos.yBottom = 0;
      } else if (speed > TOSS_MIN_SPEED) {
        // Tossed. Physics takes it from here.
        airborneRef.current = true;
        velRef.current = { vx: vx * 0.85, vy: -vy * 0.85 };
        momentRef.current = null;
      } else {
        airborneRef.current = true;
        velRef.current = { vx: 0, vy: 0 };
      }
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      petThePet();
    }, 260);
  };

  /** A cancelled/stolen pointer never sends pointerup — without this the pet
   *  stays frozen mid-drag forever (roaming and physics both check dragRef). */
  const onPointerCancel = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
  };

  const onDoubleClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    goToNeediest();
  };

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (!event.altKey) return;
    event.preventDefault();
    const current = petRef.current;
    if (!current) return;
    const next = Math.min(2.5, Math.max(0.5, current.sizeScale - Math.sign(event.deltaY) * 0.1));
    if (next === current.sizeScale) return;
    setPet((prev) => (prev ? { ...prev, sizeScale: next } : prev));
    if (sizeSaveRef.current) clearTimeout(sizeSaveRef.current);
    sizeSaveRef.current = setTimeout(() => {
      sizeSaveRef.current = null;
      void rpc.call("setPetSize", { petId: current.id, scale: next }).catch(() => {});
    }, 400);
  };

  // --- render ----------------------------------------------------------------

  if (!pet) {
    if (!loaded) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No pet yet. Something is waiting in the Hatchery.
        </p>
        <Button
          size="sm"
          onClick={() => navigate.toPluginPanel("pets", { subPath: "hatchery" })}
        >
          Open Hatchery
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-medium">{pet.name}</span>
        <Badge variant="secondary">{pet.stage.name}</Badge>
        <span className="text-xs text-muted-foreground">
          <NumberFlow value={pet.xp} /> XP
        </span>
        {fleet ? (
          <span className="ml-auto text-xs text-muted-foreground">
            {fleet.counts.active} running · {fleet.counts.waiting} waiting · {fleet.counts.failed}{" "}
            failed
          </span>
        ) : null}
      </div>

      <div
        ref={stageRef}
        className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-transparent to-muted/40"
        style={{ height: "clamp(280px, 45vh, 460px)", touchAction: "none" }}
        onPointerDown={onStagePointerDown}
      >
        <div className="absolute inset-x-0 bottom-3 border-t border-border/60" />
        {treatViews.map((treat) => (
          <span
            key={treat.id}
            ref={(node) => {
              if (node) treatElsRef.current.set(treat.id, node);
              else treatElsRef.current.delete(treat.id);
            }}
            role="button"
            tabIndex={0}
            aria-label="A treat"
            title="A treat"
            className="absolute left-0 select-none leading-none"
            style={{
              bottom: FLOOR_INSET,
              fontSize: TREAT_SIZE,
              pointerEvents: "auto",
              cursor: "pointer",
              willChange: "transform",
              transform: `translate(${treat.x}px, ${-treat.yBottom}px)`,
            }}
            onPointerDown={(event) => {
              // Don't let the stage read this as a "walk over there" ground tap.
              event.stopPropagation();
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
            aria-hidden="true"
            className="absolute left-0"
            style={{
              bottom: FLOOR_INSET,
              boxSizing: "border-box",
              width: BALL_SIZE,
              height: BALL_SIZE,
              borderRadius: 2,
              background: "var(--primary, rgb(120 160 255))",
              border: "2px solid rgb(0 0 0 / 0.45)",
              imageRendering: "pixelated",
              pointerEvents: "none",
              willChange: "transform",
              transform: `translate(${ballView.x}px, ${-ballView.yBottom}px)`,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: ballView.fading ? 0 : 1 }}
            transition={{ duration: ballView.fading ? BALL_FADE_MS / 1000 : 0, ease: "linear" }}
          />
        ) : null}
        <div ref={anchorRef} className="absolute left-0" style={{ bottom: 12 }}>
          {settingsRef.current?.showEmotions ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={shownState}
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground"
                style={{ bottom: "calc(100% + 6px)" }}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {EMOTION_LABELS[shownState] ?? shownState}
              </motion.div>
            </AnimatePresence>
          ) : null}
          <AnimatePresence>
            {bubble ? (
              <motion.div
                key={bubble.id}
                className="pets-bubble pets-bubble-left pointer-events-none border border-border bg-card text-card-foreground shadow-md"
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 480, damping: 26 }}
              >
                {bubble.text}
              </motion.div>
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
          <div
            ref={bodyRef}
            role="presentation"
            className={`pets-body${grabbed ? " pets-grabbed" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onLostPointerCapture={onPointerCancel}
            onDoubleClick={onDoubleClick}
            onWheel={onWheel}
          >
            <canvas ref={canvasRef} className="pets-canvas" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={petThePet}>
          Pet {pet.name}
        </Button>
        <Button size="sm" variant="outline" onClick={toggleNap}>
          {napping ? "Wake up" : "Nap"}
        </Button>
        {isReducedMotion() ? null : (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label="Play fetch"
            disabled={!!ballView}
            onClick={startFetch}
          >
            🎾
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={goToNeediest}>
          What needs attention?
        </Button>
      </div>
    </div>
  );
}
