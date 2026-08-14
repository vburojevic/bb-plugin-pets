// bb-plugin-pets — backend.
//
// Owns the den (SQLite), the XP ledger, fleet state, sprite serving, and
// (M3) the hatch/evolve generation pipeline. The overlay in app.tsx is a
// hook-free content script: it reads via rpc fetch and listens on the "pets"
// realtime channel, so everything stateful lives here — XP accrues and fleet
// state stays warm even with zero windows open.
import { randomUUID } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineRpcContract, type BbPluginApi } from "@bb/plugin-sdk";
import { z } from "zod";
import { computeAchievements } from "./src/achievements";
import {
  fallbackAtlas,
  isSpriteState,
  statesForPack,
  type SpriteAtlas,
  type SpriteState,
} from "./src/atlas";
import {
  STAGE_MODIFIERS,
  evolveHero,
  generateHeroDrafts,
  generateSideHero,
  generateStrips,
  refineDraft,
  resolveEngine,
  type SpriteEngines,
} from "./src/spritegen";
import {
  neediest,
  snapshot,
  toFleetStatus,
  type FleetThread,
} from "./src/fleet";
import {
  PET_COOLDOWN_MS,
  STAGES,
  XP_AMOUNTS,
  dayKey,
  nextStageFor,
  stageForXp,
  type XpSource,
} from "./src/xp";

const atlasSchema = z.object({
  version: z.literal(2),
  states: z.record(
    z.string(),
    z.object({
      frames: z.number(),
      fps: z.number(),
      loop: z.boolean(),
      width: z.number(),
      height: z.number(),
      contentWidth: z.number().optional(),
      contentHeight: z.number().optional(),
    }),
  ),
});

const petViewSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  kind: z.enum(["starter", "hatched"]),
  xp: z.number().int(),
  stage: z.object({
    index: z.number().int(),
    name: z.string(),
    epithet: z.string(),
    minXp: z.number().int(),
  }),
  nextStage: z.object({ name: z.string(), minXp: z.number().int() }).nullable(),
  artStage: z.number().int(),
  /** True when the pet has out-evolved its artwork (a "glow up" is available). */
  artBehind: z.boolean(),
  /** Append `&state=<state>` to fetch one strip. */
  spriteBaseUrl: z.string(),
  atlas: atlasSchema,
  /** States in the configured pack this pet's artwork is missing. */
  missingAnimations: z.number().int(),
  active: z.boolean(),
  pettedCount: z.number().int(),
  /** Persistent per-pet render size multiplier. */
  sizeScale: z.number(),
  createdAt: z.number(),
});

const overlayPrefsSchema = z.object({
  x: z.number().nullable(),
  /** Distance from the window bottom when parked; null = on the ground. */
  y: z.number().nullable(),
  scale: z.number().min(0.5).max(2),
  parked: z.boolean(),
});

const draftViewSchema = z.object({
  id: z.string(),
  description: z.string(),
  createdAt: z.number(),
  url: z.string(),
});

const statsSchema = z.object({
  totalXp: z.number().int(),
  totals: z.record(z.string(), z.object({ count: z.number().int(), xp: z.number().int() })),
  achievements: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      earned: z.boolean(),
    }),
  ),
  recent: z.array(
    z.object({ source: z.string(), amount: z.number().int(), createdAt: z.number() }),
  ),
});

const fleetThreadSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  status: z.enum(["active", "idle", "failed"]),
  waiting: z.boolean(),
  updatedAt: z.number(),
});

const fleetSnapshotSchema = z.object({
  mood: z.enum(["waiting", "failed", "active", "idle"]),
  counts: z.object({
    active: z.number(),
    waiting: z.number(),
    failed: z.number(),
    total: z.number(),
  }),
  threads: z.array(fleetThreadSchema),
});

const overlaySettingsSchema = z.object({
  enabled: z.boolean(),
  roaming: z.boolean(),
  bubbles: z.string(),
  reactivity: z.string(),
  reducedMotion: z.string(),
  hideOnCompact: z.boolean(),
  sounds: z.boolean(),
  pointing: z.boolean(),
  walkSpeed: z.string(),
  xpMotes: z.boolean(),
  reactTurnComplete: z.boolean(),
  reactFailures: z.boolean(),
  digWhileGenerating: z.boolean(),
  idleQuirks: z.boolean(),
  typingGlance: z.boolean(),
  evolutionCeremony: z.boolean(),
  attentionPip: z.boolean(),
  showEmotions: z.boolean(),
  personalityFunny: z.boolean(),
  personalityChaotic: z.boolean(),
  personalitySarcastic: z.boolean(),
  personalityHelpful: z.boolean(),
  personalityCozy: z.boolean(),
  activityLevel: z.enum(["calm", "normal", "lively", "unhinged"]),
  highContrast: z.boolean(),
  devMode: z.boolean(),
  soundVolume: z.enum(["quiet", "normal"]),
  seasonalFlair: z.boolean(),
});

export const rpcContract = defineRpcContract({
  getOverlay: {
    input: z.null(),
    output: z.object({
      pet: petViewSchema.nullable(),
      prefs: overlayPrefsSchema,
      settings: overlaySettingsSchema,
      fleet: fleetSnapshotSchema,
      hasApiKey: z.boolean(),
      hasRdKey: z.boolean(),
      /** Resolved strip engine, e.g. "retro-diffusion" or "openai:gpt-image-2". */
      engine: z.string(),
      /** Configured animation pack: essential | expanded | deluxe. */
      pack: z.string(),
    }),
  },
  listDen: {
    input: z.null(),
    output: z.object({ pets: z.array(petViewSchema) }),
  },
  selectPet: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({ ok: z.boolean() }),
  },
  renamePet: {
    input: z.object({ petId: z.string(), name: z.string().min(1).max(40) }).strict(),
    output: z.object({ ok: z.boolean() }),
  },
  deletePet: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({ ok: z.boolean() }),
  },
  setPetSize: {
    input: z.object({ petId: z.string(), scale: z.number().min(0.5).max(2.5) }).strict(),
    output: z.object({ ok: z.boolean() }),
  },
  clearDrafts: {
    input: z.null(),
    output: z.object({ ok: z.boolean() }),
  },
  setBehavior: {
    input: z
      .object({
        key: z.enum([
          "roaming",
          "sounds",
          "pointing",
          "xpMotes",
          "reactTurnComplete",
          "reactFailures",
          "digWhileGenerating",
          "idleQuirks",
          "typingGlance",
          "evolutionCeremony",
          "attentionPip",
          "showEmotions",
          "personalityFunny",
          "personalityChaotic",
          "personalitySarcastic",
          "personalityHelpful",
          "personalityCozy",
          "highContrast",
          "devMode",
          "seasonalFlair",
        ]),
        value: z.boolean(),
      })
      .strict(),
    output: z.object({ ok: z.boolean() }),
  },
  setActivityLevel: {
    input: z.object({ level: z.enum(["calm", "normal", "lively", "unhinged"]) }).strict(),
    output: z.object({ ok: z.literal(true) }),
  },
  setSoundVolume: {
    input: z.object({ level: z.enum(["quiet", "normal"]) }).strict(),
    output: z.object({ ok: z.literal(true) }),
  },
  getAmbientContext: {
    input: z.null().optional(),
    output: z.object({
      activeCount: z.number(),
      waitingCount: z.number(),
      failedCount: z.number(),
      turnsToday: z.number(),
      failuresToday: z.number(),
      denSize: z.number(),
      topRunner: z
        .object({
          id: z.string(),
          projectId: z.string(),
          title: z.string(),
          minutes: z.number(),
        })
        .nullable(),
    }),
  },
  petPet: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({
      accepted: z.boolean(),
      xp: z.number().int(),
      cooldownRemainingMs: z.number(),
    }),
  },
  setOverlayPrefs: {
    input: overlayPrefsSchema.strict(),
    output: z.object({ ok: z.boolean() }),
  },
  getNeediestThread: {
    input: z.null(),
    output: z.object({
      thread: z.object({ id: z.string(), projectId: z.string(), title: z.string() }).nullable(),
    }),
  },
  getAttentionThreads: {
    input: z.null(),
    output: z.object({ threads: z.array(fleetThreadSchema) }),
  },
  hatchDrafts: {
    input: z.object({ description: z.string().min(3).max(300) }).strict(),
    output: z.object({ jobId: z.string() }),
  },
  listDrafts: {
    input: z.null(),
    output: z.object({ drafts: z.array(draftViewSchema), generating: z.boolean() }),
  },
  refineDraft: {
    input: z.object({ draftId: z.string(), instruction: z.string().min(2).max(200) }).strict(),
    output: z.object({ draftId: z.string() }),
  },
  hatchCommit: {
    input: z
      .object({
        draftId: z.string().regex(/^[a-z0-9-]+$/),
        name: z.string().min(1).max(40),
        description: z.string().min(3).max(300),
      })
      .strict(),
    output: z.object({ jobId: z.string() }),
  },
  evolveArt: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({ jobId: z.string() }),
  },
  refreshArt: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({ jobId: z.string() }),
  },
  regenerateStates: {
    input: z.object({ petId: z.string(), states: z.array(z.string()).min(1).max(18) }).strict(),
    output: z.object({ jobId: z.string() }),
  },
  getStats: {
    input: z.null(),
    output: statsSchema,
  },
  getLineage: {
    input: z.object({ petId: z.string() }).strict(),
    output: z.object({
      stages: z.array(
        z.object({
          stage: z.number(),
          name: z.string(),
          epithet: z.string(),
          heroUrl: z.string().nullable(),
          current: z.boolean(),
        }),
      ),
    }),
  },
  getDiary: {
    input: z
      .object({
        petId: z.string().nullable().optional(),
        limit: z.number().min(1).max(200).optional(),
      })
      .strict()
      .optional(),
    output: z.object({
      entries: z.array(
        z.object({
          id: z.number(),
          ts: z.number(),
          kind: z.string(),
          text: z.string(),
        }),
      ),
    }),
  },
  getTreats: {
    input: z.null().optional(),
    output: z.object({ balance: z.number(), eaten: z.number() }),
  },
  dropTreat: {
    input: z.null().optional(),
    output: z.object({ balance: z.number() }),
  },
  eatTreat: {
    input: z.null().optional(),
    output: z.object({ eaten: z.number() }),
  },
  recordFetch: {
    input: z.null().optional(),
    output: z.object({ ok: z.literal(true) }),
  },
  getJobStatus: {
    input: z.null(),
    output: z.object({
      job: z
        .object({
          jobId: z.string(),
          phase: z.string(),
          subject: z.string(),
          label: z.string(),
          done: z.number().int(),
          total: z.number().int(),
          statesDone: z.array(z.string()),
          states: z.array(z.string()),
          startedAt: z.number(),
          progressAt: z.number(),
        })
        .nullable(),
      lastError: z
        .object({ phase: z.string(), subject: z.string(), message: z.string(), at: z.number() })
        .nullable(),
    }),
  },
});

interface PetRow {
  id: string;
  name: string;
  description: string;
  kind: "starter" | "hatched";
  xp: number;
  stage: number;
  art_stage: number;
  active: number;
  petted_count: number;
  last_petted_at: number | null;
  size_scale: number;
  created_at: number;
}

export default async function plugin(bb: BbPluginApi) {
  const settings = bb.settings.define({
    enabled: {
      type: "boolean",
      label: "Enabled",
      description: "Master switch for the floating pet overlay.",
      default: true,
    },
    openaiApiKey: {
      type: "string",
      label: "OpenAI API key",
      description:
        "Used only to generate pet artwork when hatching or evolving. The bundled starter pet works without it.",
      secret: true,
    },
    roaming: {
      type: "boolean",
      label: "Roaming",
      description: "Let the pet wander along the bottom of the window when nothing is happening.",
      default: true,
    },
    bubbles: {
      type: "select",
      label: "Speech bubbles",
      description: "How chatty the pet is about your fleet.",
      options: ["off", "rare", "normal", "chatty"],
      default: "normal",
    },
    reactivity: {
      type: "select",
      label: "Reactivity",
      description:
        "hybrid: mirror the viewed thread, fleet aggregate elsewhere. aggregate: always the whole fleet. viewed-thread: only the open thread.",
      options: ["hybrid", "aggregate", "viewed-thread"],
      default: "hybrid",
    },
    reducedMotion: {
      type: "select",
      label: "Reduced motion",
      description: "auto follows the system prefers-reduced-motion setting.",
      options: ["auto", "on"],
      default: "auto",
    },
    hideOnCompact: {
      type: "boolean",
      label: "Hide on small viewports",
      default: true,
    },
    pointing: {
      type: "boolean",
      label: "Point at threads",
      description: "Walk over and point at sidebar threads that need you.",
      default: true,
    },
    walkSpeed: {
      type: "select",
      label: "Walk speed",
      options: ["chill", "normal", "zoomies"],
      default: "normal",
    },
    sounds: {
      type: "boolean",
      label: "Sounds",
      description: "Tiny synth chirps for greetings, evolutions, and pets.",
      default: false,
    },
    xpMotes: {
      type: "boolean",
      label: "XP motes",
      description: "Show floating +XP numbers above the pet.",
      default: true,
    },
    reactTurnComplete: {
      type: "boolean",
      label: "Celebrate finished turns",
      description: "Brief celebration when an agent finishes a turn.",
      default: true,
    },
    reactFailures: {
      type: "boolean",
      label: "React to failures",
      description: "Startled/sad reactions and grumpy mood when threads fail.",
      default: true,
    },
    digWhileGenerating: {
      type: "boolean",
      label: "Dig during generation",
      description: "The pet digs while artwork generates.",
      default: true,
    },
    idleQuirks: {
      type: "boolean",
      label: "Idle quirks",
      description: "Occasional waves and look-arounds when idle.",
      default: true,
    },
    typingGlance: {
      type: "boolean",
      label: "Typing glance",
      description: "Glances up when you start typing a prompt.",
      default: true,
    },
    evolutionCeremony: {
      type: "boolean",
      label: "Evolution ceremony",
      description: "Dance, sparkles and fanfare on stage-up (off = quiet level-ups).",
      default: true,
    },
    attentionPip: {
      type: "boolean",
      label: "Waiting pip",
      description: "The bouncing count badge when threads wait on you.",
      default: true,
    },
    showEmotions: {
      type: "boolean",
      label: "Emotion indicator",
      description: "A small badge above the pet naming what it feels right now.",
      default: false,
    },
    personalityFunny: {
      type: "boolean",
      label: "Personality: funny",
      description: "Observational one-liners and the occasional dance break.",
      default: true,
    },
    personalityChaotic: {
      type: "boolean",
      label: "Personality: chaotic",
      description: "Zoomies, cursor chasing, edge peek-a-boo, digging at the sidebar.",
      default: true,
    },
    personalitySarcastic: {
      type: "boolean",
      label: "Personality: sarcastic",
      description: "Dry commentary on failures, marathon turns, and your thread hoard.",
      default: true,
    },
    personalityHelpful: {
      type: "boolean",
      label: "Personality: helpful",
      description: "Nudges about waiting threads and a bb tip now and then.",
      default: true,
    },
    personalityCozy: {
      type: "boolean",
      label: "Personality: cozy",
      description: "Wandering, sitting nearby, naps when you go idle, welcome-backs.",
      default: true,
    },
    activityLevel: {
      type: "select",
      label: "Activity level",
      description: "How often the pet does things on its own.",
      options: ["calm", "normal", "lively", "unhinged"],
      default: "lively",
    },
    highContrast: {
      type: "boolean",
      label: "High-contrast accents",
      description: "Thicker, brighter highlight ring and a stronger emotion badge.",
      default: false,
    },
    devMode: {
      type: "boolean",
      label: "Developer panel",
      description: "Live state feed and event log on the Stats tab. For debugging.",
      default: false,
    },
    soundVolume: {
      type: "select",
      label: "Sound volume",
      description: "How loud the pet's chirps and boings are.",
      options: ["quiet", "normal"],
      default: "normal",
    },
    seasonalFlair: {
      type: "boolean",
      label: "Seasonal flair",
      description: "A small seasonal accessory on the pet in festive months.",
      default: true,
    },
    imageModel: {
      type: "string",
      label: "Image model",
      description:
        "OpenAI Images API model for heroes and drafts. gpt-image-2 lacks native transparency; a magenta chroma-key path handles that automatically.",
      default: "gpt-image-2",
    },
    rdApiKey: {
      type: "string",
      label: "Retro Diffusion API key",
      description:
        "Optional rdpk-… key from retrodiffusion.ai. When set, animation strips use RD's native pixel-art animation model instead of gpt-image.",
      secret: true,
    },
    spriteEngine: {
      type: "select",
      label: "Sprite engine",
      description: "auto uses Retro Diffusion for animations when its key is set.",
      options: ["auto", "openai", "retro-diffusion"],
      default: "auto",
    },
    animationPack: {
      type: "select",
      label: "Animation pack",
      description:
        "essential: 9 animations (~$2/pet) · expanded: +love, dig, run, jump, startled (14, ~$3.20) · deluxe: +sit, stretch, dance, grumpy (18, ~$4.30). Applied on hatch, glow-up, and re-animate.",
      options: ["essential", "expanded", "deluxe"],
      default: "expanded",
    },
    pixelPerfect: {
      type: "boolean",
      label: "Pixel-perfect quantization",
      description:
        "Snap gpt-image output to a true pixel grid with a shared palette (native-resolution sprites).",
      default: true,
    },
  });

  // --- storage ---------------------------------------------------------------

  const db = bb.storage.database();
  bb.storage.migrate(db, [
    `CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      kind TEXT NOT NULL DEFAULT 'hatched',
      xp INTEGER NOT NULL DEFAULT 0,
      stage INTEGER NOT NULL DEFAULT 0,
      art_stage INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 0,
      petted_count INTEGER NOT NULL DEFAULT 0,
      last_petted_at INTEGER,
      created_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS xp_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id TEXT NOT NULL,
      source TEXT NOT NULL,
      amount INTEGER NOT NULL,
      thread_id TEXT,
      dedupe_key TEXT UNIQUE,
      created_at INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_xp_events_pet ON xp_events(pet_id, created_at)`,
    `ALTER TABLE pets ADD COLUMN size_scale REAL NOT NULL DEFAULT 1`,
    `CREATE TABLE IF NOT EXISTS diary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id TEXT NOT NULL,
      ts INTEGER NOT NULL,
      kind TEXT NOT NULL,
      text TEXT NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_diary_pet ON diary(pet_id, ts)`,
  ]);

  // Hot-path statements (one per thread event) prepared once after migrations —
  // re-preparing these on every event showed up as measurable overhead.
  const insertXpEventStmt = db.prepare(
    `INSERT INTO xp_events (pet_id, source, amount, thread_id, dedupe_key, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(dedupe_key) DO NOTHING`,
  );
  const updatePetXpStmt = db.prepare(`UPDATE pets SET xp = ?, stage = ? WHERE id = ?`);
  const selectActivePetStmt = db.prepare(`SELECT * FROM pets WHERE active = 1 LIMIT 1`);
  // Ambient context polls these on a timer; created_at is unix ms, so the
  // local-midnight cutoff is computed in JS and bound as a parameter.
  const countXpEventsSinceStmt = db.prepare(
    `SELECT COUNT(*) AS n FROM xp_events WHERE source = ? AND created_at >= ?`,
  );
  const countPetsStmt = db.prepare(`SELECT COUNT(*) AS n FROM pets`);
  // Same shape as countXpEventsSinceStmt, scoped to one pet — the diary
  // milestones count a single companion's turns, not the den's.
  const countPetXpEventsSinceStmt = db.prepare(
    `SELECT COUNT(*) AS n FROM xp_events WHERE pet_id = ? AND source = ? AND created_at >= ?`,
  );
  const insertDiaryStmt = db.prepare(
    `INSERT INTO diary (pet_id, ts, kind, text) VALUES (?, ?, ?, ?)`,
  );
  const countDiarySinceStmt = db.prepare(
    `SELECT COUNT(*) AS n FROM diary WHERE pet_id = ? AND kind = ? AND ts >= ?`,
  );
  const selectDiaryStmt = db.prepare(
    `SELECT id, ts, kind, text FROM diary WHERE pet_id = ? ORDER BY ts DESC, id DESC LIMIT ?`,
  );

  // Plugin data dir, derived from the SQLite path (<dataDir>/plugins/pets/data.db).
  const dataDir = path.dirname(db.name);
  const spritesDir = path.join(dataDir, "sprites");
  const draftsDir = path.join(dataDir, "drafts");
  mkdirSync(spritesDir, { recursive: true });
  mkdirSync(draftsDir, { recursive: true });

  // Plugin root: server.ts sits at the root; the built bundle sits in dist/.
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const pluginRoot = existsSync(path.join(moduleDir, "assets"))
    ? moduleDir
    : path.join(moduleDir, "..");
  const starterDir = path.join(pluginRoot, "assets", "starter");

  // Seed the starter pet whenever the den is empty (first run, or a reset).
  const seedStarterIfEmpty = () => {
    const petCount = db.prepare(`SELECT COUNT(*) AS n FROM pets`).get() as { n: number };
    if (petCount.n > 0) return;
    db.prepare(
      `INSERT INTO pets (id, name, description, kind, active, created_at)
       VALUES ('starter', 'Pixel', 'a round teal axolotl with a cheerful face', 'starter', 1, ?)`,
    ).run(Date.now());
    bb.log.info("den was empty — seeded starter pet Pixel");
  };
  seedStarterIfEmpty();

  // --- views -----------------------------------------------------------------

  // Starter art ships in assets at art stage 0; evolved art (any pet) lives
  // in the data dir keyed by art stage.
  const usesBundledArt = (row: PetRow): boolean => row.kind === "starter" && row.art_stage === 0;

  const stripPathFor = (row: PetRow, state: string): string =>
    usesBundledArt(row)
      ? path.join(starterDir, `${state}.png`)
      : path.join(spritesDir, `${row.id}-${row.art_stage}-${state}.png`);

  const heroPathFor = (row: PetRow): string => {
    const evolved = path.join(spritesDir, `${row.id}-hero.png`);
    if (existsSync(evolved)) return evolved;
    return row.kind === "starter" ? path.join(starterDir, "hero.png") : evolved;
  };

  // Cached right-facing profile of the hero — RD animates its input as posed,
  // so locomotion strips need a side view or the pet marches at the camera.
  const sideHeroPathFor = (row: PetRow): string =>
    path.join(spritesDir, `${row.id}-hero-side.png`);

  const atlasPathFor = (row: PetRow): string =>
    usesBundledArt(row)
      ? path.join(starterDir, "atlas.json")
      : path.join(spritesDir, `${row.id}-${row.art_stage}.atlas.json`);

  // toView runs per pet per call and used to do a stat + a read + a JSON parse
  // every time. The atlas file is rewritten on every art change (including
  // partial merges), so its mtime doubles as both the cache key and the
  // cache-busting art version: one stat per pet, nothing else on a cache hit.
  const atlasCache = new Map<string, { key: string; atlas: SpriteAtlas; version: number }>();

  const invalidateArtCache = (petId: string) => {
    for (const key of [...atlasCache.keys()]) {
      if (key.startsWith(`${petId}:`)) atlasCache.delete(key);
    }
  };

  const artFor = (row: PetRow): { atlas: SpriteAtlas; version: number } => {
    const key = `${row.id}:${row.art_stage}`;
    const atlasPath = atlasPathFor(row);
    let version = 0;
    try {
      version = Math.round(statSync(atlasPath).mtimeMs);
    } catch {
      version = 0;
    }
    const cached = atlasCache.get(key);
    if (cached && cached.version === version) return cached;
    let atlas = fallbackAtlas();
    if (version !== 0) {
      try {
        atlas = JSON.parse(readFileSync(atlasPath, "utf8")) as SpriteAtlas;
      } catch {
        bb.log.warn(`unreadable atlas at ${atlasPath}; using fallback`);
      }
    }
    const entry = { key, atlas, version };
    atlasCache.set(key, entry);
    return entry;
  };

  // Cache-buster: sprite URLs are served immutable, so the version must
  // change whenever artwork files are replaced in place (quantization
  // migrations, regenerated strips at the same art stage).
  const artVersionFor = (row: PetRow): number => artFor(row).version;

  // toView is sync but the pack lives in async settings — mirror it here and
  // keep the mirror fresh from the settings change listener.
  let currentPack: string = (await settings.get()).animationPack;

  const toView = (row: PetRow) => {
    const { atlas, version } = artFor(row);
    const stage = stageForXp(row.xp);
    const next = nextStageFor(row.xp);
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      kind: row.kind,
      xp: row.xp,
      stage: { index: stage.index, name: stage.name, epithet: stage.epithet, minXp: stage.minXp },
      nextStage: next ? { name: next.name, minXp: next.minXp } : null,
      artStage: row.art_stage,
      artBehind: stage.index > row.art_stage,
      spriteBaseUrl: `/api/v1/plugins/${bb.pluginId}/http/sprite?pet=${encodeURIComponent(row.id)}&art=${row.art_stage}&v=${version}`,
      atlas,
      missingAnimations: statesForPack(currentPack).filter((s) => !(s in atlas.states)).length,
      active: row.active === 1,
      pettedCount: row.petted_count,
      sizeScale: row.size_scale,
      createdAt: row.created_at,
    };
  };

  const getActivePet = (): PetRow | undefined =>
    selectActivePetStmt.get() as PetRow | undefined;

  // --- fleet state -----------------------------------------------------------

  // Everything that can fire after teardown (debounced publishes, detached
  // SDK continuations, settings callbacks) checks this first: touching a
  // stale bb handle throws, and a throw on a detached path kills the server.
  let pluginDisposed = false;
  bb.onDispose(() => {
    pluginDisposed = true;
  });

  const fleet = new Map<string, FleetThread>();
  let publishTimer: ReturnType<typeof setTimeout> | null = null;

  const publishFleet = () => {
    if (pluginDisposed) return;
    if (publishTimer) return;
    publishTimer = setTimeout(() => {
      publishTimer = null;
      if (pluginDisposed) return;
      try {
        bb.realtime.publish("pets", { kind: "fleet", fleet: snapshot(fleet) });
      } catch {
        // disposed between the check and the publish — nothing to do
      }
    }, 250);
  };
  bb.onDispose(() => {
    if (publishTimer) clearTimeout(publishTimer);
  });

  // Threads that plugins spawn (flair panels, prompt enhancers, …) and hidden
  // workers neither count for XP nor appear in fleet state.
  const countable = (thread: { visibility: string; originPluginId: string | null }) =>
    thread.visibility === "visible" && thread.originPluginId === null;

  type ThreadEventThread = {
    id: string;
    projectId: string;
    title: string | null;
    titleFallback: string | null;
    status: string;
    visibility: string;
    originPluginId: string | null;
    archivedAt: number | null;
  };

  const upsertFleetThread = (thread: ThreadEventThread, waiting?: boolean) => {
    if (pluginDisposed) return;
    if (!countable(thread) || thread.archivedAt !== null) {
      fleet.delete(thread.id);
      publishFleet();
      return;
    }
    const existing = fleet.get(thread.id);
    const next = {
      id: thread.id,
      projectId: thread.projectId,
      title: thread.title ?? thread.titleFallback ?? "Untitled thread",
      status: toFleetStatus(thread.status),
      waiting: waiting ?? existing?.waiting ?? false,
    };
    // Thread events repeat identical state constantly; re-publishing (and
    // bumping updatedAt) on a no-op change is pure fleet-channel noise.
    if (
      existing &&
      existing.status === next.status &&
      existing.title === next.title &&
      existing.waiting === next.waiting &&
      existing.projectId === next.projectId
    ) {
      return;
    }
    fleet.set(thread.id, { ...next, updatedAt: Date.now() });
    publishFleet();
  };

  const dropFleetThread = (threadId: string) => {
    if (pluginDisposed) return;
    if (fleet.delete(threadId)) publishFleet();
  };

  // --- XP ledger -------------------------------------------------------------

  // Ledger-only sources (treats, fetch) carry their own amount so the shared
  // award path — dedupe, stage recompute, xp publish — stays single-sourced
  // without widening the XpSource union used by the core engine.
  type AwardSource = XpSource | "treat" | "play";

  const awardXp = (
    source: AwardSource,
    threadId: string | null,
    dedupeKey: string | null,
    amountOverride?: number,
  ) => {
    const pet = getActivePet();
    if (!pet) return;
    const amount = amountOverride ?? XP_AMOUNTS[source as XpSource];
    const before = stageForXp(pet.xp);
    const result = insertXpEventStmt.run(
      pet.id,
      source,
      amount,
      threadId,
      dedupeKey,
      Date.now(),
    );
    if (result.changes === 0) return; // dedupe hit
    const xp = pet.xp + amount;
    const after = stageForXp(xp);
    updatePetXpStmt.run(xp, after.index, pet.id);
    bb.realtime.publish("pets", {
      kind: "xp",
      petId: pet.id,
      source,
      amount,
      xp,
      stageIndex: after.index,
      stageName: after.name,
      evolved: after.index > before.index,
    });
    if (after.index > before.index) {
      bb.log.info(`${pet.name} evolved: ${before.name} → ${after.name} at ${xp} XP`);
    }
  };

  // --- diary -----------------------------------------------------------------

  const localMidnight = (): number => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    return midnight.getTime();
  };

  /** Append a journal line. `oncePerDay` collapses repeats of the same kind
   * within the local day (cutoff computed in JS, bound as a parameter). */
  const writeDiary = (petId: string, kind: string, text: string, oncePerDay = false) => {
    if (oncePerDay) {
      const seen = countDiarySinceStmt.get(petId, kind, localMidnight()) as { n: number };
      if (seen.n > 0) return;
    }
    insertDiaryStmt.run(petId, Date.now(), kind, text);
  };

  const maybeDailyBonus = () => {
    awardXp("daily-greeting", null, `daily:${dayKey(new Date())}`);
  };

  // --- treats wallet ---------------------------------------------------------

  const TREATS_BALANCE_KEY = "treats:balance";
  const TREATS_EATEN_KEY = "treats:eaten";

  // kv is async while earns fire from sync event handlers, so every
  // read-modify-write goes through one queue — otherwise two treats landing in
  // the same tick would both read the old balance and one would vanish.
  let walletQueue: Promise<unknown> = Promise.resolve();
  const withWallet = <T>(fn: () => Promise<T>): Promise<T> => {
    const run = walletQueue.then(fn, fn);
    walletQueue = run.catch(() => {});
    return run;
  };

  const readCounter = async (key: string): Promise<number> => {
    const raw = await bb.storage.kv.get<number>(key);
    return typeof raw === "number" && Number.isFinite(raw) ? Math.max(0, Math.trunc(raw)) : 0;
  };

  /** Where a treat lands, as a fraction of window width (inset from the edges). */
  const treatDropX = () => 0.15 + Math.random() * 0.7;

  const publishTreatDrop = () => {
    if (pluginDisposed) return;
    bb.realtime.publish("pets", { kind: "treat-drop", x: treatDropX() });
  };

  /** One treat per 10 completed turns today. Earning also drops it: a single
   * increment, one earned + one drop publish. */
  const earnTreat = () =>
    withWallet(async () => {
      const balance = (await readCounter(TREATS_BALANCE_KEY)) + 1;
      await bb.storage.kv.set(TREATS_BALANCE_KEY, balance);
      if (pluginDisposed) return;
      bb.realtime.publish("pets", { kind: "treat-earned", balance });
      publishTreatDrop();
    });

  // --- thread lifecycle → fleet + XP + moments -------------------------------

  bb.events.on("thread.created", ({ thread }) => upsertFleetThread(thread));
  bb.events.on("thread.active", ({ thread }) => upsertFleetThread(thread));
  bb.events.on("thread.idle", ({ thread }) => {
    upsertFleetThread(thread);
    if (!countable(thread)) return;
    maybeDailyBonus();
    awardXp("turn-completed", thread.id, null);
    try {
      const pet = getActivePet();
      if (pet) {
        const n = (
          countPetXpEventsSinceStmt.get(pet.id, "turn-completed", localMidnight()) as { n: number }
        ).n;
        if (n === 25 || n === 50 || n === 100) {
          writeDiary(
            pet.id,
            `milestone-${n}`,
            n === 25
              ? "25 turns before i even stretched. carried."
              : n === 50
                ? "50 turns. someone should tell them about weekends."
                : "100 turns today. i am watching greatness or a cry for help.",
            true,
          );
        }
        // Treats are earned from real work: one per 10 completed turns today.
        if (n > 0 && n % 10 === 0) {
          void earnTreat().catch((error: unknown) => {
            bb.log.warn(`treat earn failed: ${String(error)}`);
          });
        }
      }
    } catch (error) {
      bb.log.warn(`diary milestone write failed: ${String(error)}`);
    }
    bb.realtime.publish("pets", {
      kind: "moment",
      moment: "celebrate",
      threadId: thread.id,
      title: thread.title ?? thread.titleFallback ?? "a thread",
    });
  });
  bb.events.on("thread.failed", ({ thread }) => {
    upsertFleetThread(thread);
    if (!countable(thread)) return;
    awardXp("thread-failed", thread.id, null);
    // Ledger-only marker (0 XP) so getAmbientContext.failuresToday is real —
    // the visible award above already covers the XP side.
    const failedPet = getActivePet();
    if (failedPet) {
      insertXpEventStmt.run(failedPet.id, "turn-failed", 0, thread.id, null, Date.now());
      try {
        writeDiary(failedPet.id, "first-fail", "first red of the day. we don't talk about it.", true);
      } catch (error) {
        bb.log.warn(`diary first-fail write failed: ${String(error)}`);
      }
    }
    bb.realtime.publish("pets", {
      kind: "moment",
      moment: "sad",
      threadId: thread.id,
      title: thread.title ?? thread.titleFallback ?? "a thread",
    });
  });
  bb.events.on("thread.archived", ({ thread }) => {
    dropFleetThread(thread.id);
    if (!countable(thread)) return;
    awardXp("thread-archived", thread.id, `arch:${thread.id}`);
  });
  bb.events.on("thread.deleted", ({ thread }) => dropFleetThread(thread.id));

  // Seed the fleet and track pending interactions ("waiting on you") via the
  // SDK realtime feed. Runs as a service so bb.sdk use stays off the factory
  // path in harnesses.
  bb.background.service("fleet", {
    async start(signal) {
      try {
        const rows = await bb.sdk.threads.list({ limit: 200 });
        for (const row of rows) {
          if (row.archivedAt !== null) continue;
          upsertFleetThread(row, row.hasPendingInteraction);
        }
      } catch (error) {
        bb.log.warn(`fleet seed failed: ${String(error)}`);
      }

      const unsubscribe = bb.sdk.subscribe({
        event: "thread:changed",
        callback: (event) => {
          try {
            handleThreadChanged(event);
          } catch {
            // Never let a dispatch race at teardown propagate into the host.
          }
        },
      });

      const handleThreadChanged = (event: { id?: string; changes: readonly string[]; metadata?: { hasPendingInteraction?: boolean; projectId?: string } }) => {
          const id = event.id;
          if (!id) return;
          const meta = event.metadata;
          if (
            event.changes.includes("interactions-changed") &&
            typeof meta?.hasPendingInteraction === "boolean"
          ) {
            const existing = fleet.get(id);
            if (existing && existing.waiting !== meta.hasPendingInteraction) {
              existing.waiting = meta.hasPendingInteraction;
              existing.updatedAt = Date.now();
              publishFleet();
            } else if (!existing && meta.hasPendingInteraction && meta.projectId) {
              // A thread we have not seen yet (started before plugin load).
              void bb.sdk.threads
                .get({ threadId: id })
                .then((thread) => {
                  if (pluginDisposed) return;
                  upsertFleetThread(thread as unknown as ThreadEventThread);
                  const row = fleet.get(id);
                  if (row) {
                    row.waiting = true;
                    publishFleet();
                  }
                })
                .catch(() => {});
            }
          }
      };

      await new Promise<void>((resolve) => {
        signal.addEventListener("abort", () => resolve(), { once: true });
      });
      unsubscribe();
    },
  });

  // --- generation jobs -------------------------------------------------------

  interface DraftMeta {
    id: string;
    description: string;
    createdAt: number;
  }

  let generationBusy = false;

  // Draft refinement is a single quick edits call, independent of the strip
  // pipeline — it gets its own latch instead of the one job slot, so a user
  // can tweak a draft while nothing else is running.
  let refineBusy = false;

  // The busy check and the claim must be one synchronous step: every job
  // starter awaits settings/engine config before reaching runJob, so a plain
  // `if (generationBusy)` guard lets two concurrent rpc calls both pass.
  const acquireJobSlot = () => {
    if (generationBusy) throw new Error("Already generating — one job at a time.");
    generationBusy = true;
  };

  const engineConfig = async (): Promise<SpriteEngines> => {
    const { openaiApiKey, imageModel, rdApiKey, spriteEngine, pixelPerfect } = await settings.get();
    if (!openaiApiKey) {
      throw new Error("No OpenAI API key configured. Add it in Settings → Plugins → Pets.");
    }
    return {
      openai: { apiKey: openaiApiKey, model: imageModel },
      rd: rdApiKey ? { apiKey: rdApiKey } : null,
      engine: spriteEngine as SpriteEngines["engine"],
      pixelPerfect,
    };
  };

  const packStates = async () => statesForPack((await settings.get()).animationPack);

  // Side-profile hero: only the RD engine needs it, and only for locomotion.
  let warnedNoSideHeroKey = false;

  const needsSideHero = (engines: SpriteEngines, states: readonly string[]): boolean =>
    engines.rd !== null &&
    resolveEngine(engines) === "retro-diffusion" &&
    states.some((state) => state === "walk" || state === "run");

  // A missing side hero degrades locomotion to front-facing — it must never
  // fail a job, so every failure path returns undefined.
  const ensureSideHero = async (
    row: PetRow,
    engines: SpriteEngines,
    hero: Buffer,
  ): Promise<Buffer | undefined> => {
    const sidePath = sideHeroPathFor(row);
    if (existsSync(sidePath)) {
      try {
        return readFileSync(sidePath);
      } catch (error) {
        bb.log.warn(`unreadable side hero at ${sidePath}: ${String(error)}`);
        return undefined;
      }
    }
    if (!engines.openai?.apiKey) {
      if (!warnedNoSideHeroKey) {
        warnedNoSideHeroKey = true;
        bb.log.warn(
          "no OpenAI key — walk/run strips will stay front-facing (no side-profile hero)",
        );
      }
      return undefined;
    }
    try {
      const side = await generateSideHero(engines, hero);
      writeFileSync(sidePath, side);
      return side;
    } catch (error) {
      bb.log.warn(`side-profile hero failed: ${String(error)}`);
      return undefined;
    }
  };

  // The whole generation-job story in one place. Jobs run server-side and
  // survive navigation; what the PANEL needs is durable, queryable state so
  // a remounted client can reattach: currentJob (with structured progress +
  // heartbeats so a client can tell "slow" from "dead") and lastJobError
  // (failures must outlive the toast that nobody saw).
  interface JobState {
    jobId: string;
    phase: string;
    subject: string;
    label: string;
    done: number;
    total: number;
    statesDone: string[];
    states: string[];
    startedAt: number;
    progressAt: number;
  }
  let currentJob: JobState | null = null;
  let lastJobError: { phase: string; subject: string; message: string; at: number } | null = null;

  const publishJob = () => {
    bb.realtime.publish("pets", { kind: "job", job: currentJob });
  };

  const publishProgress = (
    jobId: string,
    phase: string,
    done: number,
    total: number,
    label: string,
    completedState?: string,
  ) => {
    if (currentJob?.jobId === jobId) {
      currentJob.done = done;
      currentJob.total = total;
      currentJob.label = label;
      currentJob.progressAt = Date.now();
      if (completedState) currentJob.statesDone.push(completedState);
    }
    publishJob();
  };

  // Generation jobs outlive their rpc handler, so they MUST die with the
  // load: a reload/disable aborts them (fetches cancel via the signal), and
  // the error path never touches bb — a stale-handle throw inside .catch is
  // an unhandled rejection that takes the whole server down (learned the
  // hard way: crash dump 2026-08-13T17-18-43Z).
  const jobControllers = new Set<AbortController>();
  bb.onDispose(() => {
    for (const controller of jobControllers) controller.abort();
    jobControllers.clear();
  });

  const runJob = (
    jobId: string,
    phase: string,
    subject: string,
    total: number,
    states: string[],
    work: (signal: AbortSignal) => Promise<void>,
  ) => {
    generationBusy = true;
    const controller = new AbortController();
    jobControllers.add(controller);
    currentJob = {
      jobId,
      phase,
      subject,
      label: "Starting…",
      done: 0,
      total,
      statesDone: [],
      states,
      startedAt: Date.now(),
      progressAt: Date.now(),
    };
    // A new attempt supersedes the old failure.
    lastJobError = null;
    publishJob();
    // Heartbeat: clients distinguish "image API is slow" (heartbeats arrive,
    // progress doesn't) from "job is dead" (silence).
    const heartbeat = setInterval(() => {
      try {
        publishJob();
      } catch {
        clearInterval(heartbeat);
      }
    }, 15_000);
    void work(controller.signal)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return; // torn down mid-job — silence is correct
        try {
          bb.log.error(`${phase} job failed: ${String(error)}`);
          lastJobError = {
            phase,
            subject,
            message: error instanceof Error ? error.message : String(error),
            at: Date.now(),
          };
          bb.realtime.publish("pets", {
            kind: "gen-error",
            jobId,
            phase,
            subject,
            message: lastJobError.message,
          });
        } catch {
          // The handle went stale in a way the abort did not cover. Error
          // handling must never throw; there is nothing useful left to do.
        }
      })
      .finally(() => {
        clearInterval(heartbeat);
        jobControllers.delete(controller);
        generationBusy = false;
        currentJob = null;
        try {
          publishJob();
        } catch {
          // disposed mid-teardown — clients re-sync via getJobStatus
        }
      });
  };

  const getDraftMetas = async (): Promise<DraftMeta[]> =>
    (await bb.storage.kv.get<DraftMeta[]>("drafts")) ?? [];

  const draftView = (meta: DraftMeta) => ({
    ...meta,
    url: `/api/v1/plugins/${bb.pluginId}/http/draft?id=${meta.id}`,
  });

  const saveStrips = (
    petId: string,
    artStage: number,
    result: Awaited<ReturnType<typeof generateStrips>>,
  ) => {
    for (const strip of result.strips) {
      writeFileSync(path.join(spritesDir, `${petId}-${artStage}-${strip.state}.png`), strip.png);
    }
    // Merge with any existing atlas at this art stage: a partial run must only
    // ever ADD states — skipped states keep their previous strips (the PNGs
    // are still on disk), so upgrades converge across runs instead of regressing.
    const atlasPath = path.join(spritesDir, `${petId}-${artStage}.atlas.json`);
    let states = result.atlas.states;
    if (existsSync(atlasPath)) {
      try {
        const previous = JSON.parse(readFileSync(atlasPath, "utf8")) as SpriteAtlas;
        states = { ...previous.states, ...result.atlas.states };
      } catch {
        // unreadable previous atlas — write the fresh one
      }
    }
    writeFileSync(atlasPath, JSON.stringify({ version: 2, states }));
    invalidateArtCache(petId);
  };

  // --- rpc -------------------------------------------------------------------

  const defaultPrefs = { x: null, y: null, scale: 1, parked: false };

  const overlaySettings = async () => {
    const values = await settings.get();
    return {
      enabled: values.enabled,
      roaming: values.roaming,
      bubbles: values.bubbles,
      reactivity: values.reactivity,
      reducedMotion: values.reducedMotion,
      hideOnCompact: values.hideOnCompact,
      sounds: values.sounds,
      pointing: values.pointing,
      walkSpeed: values.walkSpeed,
      xpMotes: values.xpMotes,
      reactTurnComplete: values.reactTurnComplete,
      reactFailures: values.reactFailures,
      digWhileGenerating: values.digWhileGenerating,
      idleQuirks: values.idleQuirks,
      typingGlance: values.typingGlance,
      evolutionCeremony: values.evolutionCeremony,
      attentionPip: values.attentionPip,
      showEmotions: values.showEmotions,
      personalityFunny: values.personalityFunny,
      personalityChaotic: values.personalityChaotic,
      personalitySarcastic: values.personalitySarcastic,
      personalityHelpful: values.personalityHelpful,
      personalityCozy: values.personalityCozy,
      activityLevel: values.activityLevel as "calm" | "normal" | "lively" | "unhinged",
      highContrast: values.highContrast,
      devMode: values.devMode,
      soundVolume: values.soundVolume as "quiet" | "normal",
      seasonalFlair: values.seasonalFlair,
    };
  };

  bb.rpc.register(rpcContract, {
    async getOverlay() {
      const pet = getActivePet();
      const stored = await bb.storage.kv.get<z.infer<typeof overlayPrefsSchema>>("overlay-prefs");
      const values = await settings.get();
      const engines: SpriteEngines = {
        openai: { apiKey: values.openaiApiKey ?? "", model: values.imageModel },
        rd: values.rdApiKey ? { apiKey: values.rdApiKey } : null,
        engine: values.spriteEngine as SpriteEngines["engine"],
        pixelPerfect: values.pixelPerfect,
      };
      const stripEngine = resolveEngine(engines);
      return {
        pet: pet ? toView(pet) : null,
        prefs: stored ?? defaultPrefs,
        settings: await overlaySettings(),
        fleet: snapshot(fleet),
        hasApiKey: typeof values.openaiApiKey === "string" && values.openaiApiKey.length > 0,
        hasRdKey: typeof values.rdApiKey === "string" && values.rdApiKey.length > 0,
        engine:
          stripEngine === "retro-diffusion" ? "retro-diffusion" : `openai:${values.imageModel}`,
        pack: values.animationPack,
      };
    },
    async setBehavior({ key, value }) {
      await bb.sdk.plugins.updateSettings({ pluginId: bb.pluginId, values: { [key]: value } });
      return { ok: true };
    },
    async setActivityLevel({ level }) {
      await bb.sdk.plugins.updateSettings({
        pluginId: bb.pluginId,
        values: { activityLevel: level },
      });
      return { ok: true as const };
    },
    async setSoundVolume({ level }) {
      await bb.sdk.plugins.updateSettings({
        pluginId: bb.pluginId,
        values: { soundVolume: level },
      });
      return { ok: true as const };
    },
    getAmbientContext() {
      const threads = [...fleet.values()];
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      const since = midnight.getTime();
      const countToday = (source: string) =>
        (countXpEventsSinceStmt.get(source, since) as { n: number }).n;
      const oldestActive = threads
        .filter((t) => t.status === "active")
        .sort((a, b) => a.updatedAt - b.updatedAt)[0];
      return {
        activeCount: threads.filter((t) => t.status === "active").length,
        waitingCount: threads.filter((t) => t.waiting).length,
        failedCount: threads.filter((t) => t.status === "failed").length,
        turnsToday: countToday("turn-completed"),
        failuresToday: countToday("turn-failed"),
        denSize: (countPetsStmt.get() as { n: number }).n,
        topRunner: oldestActive
          ? {
              id: oldestActive.id,
              projectId: oldestActive.projectId,
              title: oldestActive.title,
              minutes: Math.round((Date.now() - oldestActive.updatedAt) / 60000),
            }
          : null,
      };
    },
    listDen() {
      const rows = db
        .prepare(`SELECT * FROM pets ORDER BY active DESC, created_at ASC`)
        .all() as PetRow[];
      return { pets: rows.map(toView) };
    },
    selectPet({ petId }) {
      const row = db.prepare(`SELECT id FROM pets WHERE id = ?`).get(petId);
      if (!row) return { ok: false };
      db.transaction(() => {
        db.prepare(`UPDATE pets SET active = 0 WHERE active = 1`).run();
        db.prepare(`UPDATE pets SET active = 1 WHERE id = ?`).run(petId);
      })();
      bb.realtime.publish("pets", { kind: "pet-changed", petId });
      return { ok: true };
    },
    renamePet({ petId, name }) {
      const newName = name.trim();
      const result = db.prepare(`UPDATE pets SET name = ? WHERE id = ?`).run(newName, petId);
      if (result.changes > 0) {
        try {
          writeDiary(petId, "rename", `answering to ${newName} now. reluctantly.`);
        } catch (error) {
          bb.log.warn(`diary rename write failed: ${String(error)}`);
        }
        bb.realtime.publish("pets", { kind: "pet-changed", petId });
      }
      return { ok: result.changes > 0 };
    },
    setPetSize({ petId, scale }) {
      const result = db.prepare(`UPDATE pets SET size_scale = ? WHERE id = ?`).run(scale, petId);
      if (result.changes > 0) bb.realtime.publish("pets", { kind: "pet-changed", petId });
      return { ok: result.changes > 0 };
    },
    deletePet({ petId }) {
      const row = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
      if (!row) return { ok: false };
      if (generationBusy)
        throw new Error("A generation job is running — wait for it to finish first.");
      if (row.active === 1) throw new Error("Choose another companion first — the active pet can't be deleted.");
      db.transaction(() => {
        db.prepare(`DELETE FROM xp_events WHERE pet_id = ?`).run(petId);
        db.prepare(`DELETE FROM pets WHERE id = ?`).run(petId);
      })();
      // Remove every art stage's strips, atlas, and the hero portrait.
      for (const file of readdirSync(spritesDir)) {
        if (file.startsWith(`${petId}-`)) rmSync(path.join(spritesDir, file), { force: true });
      }
      invalidateArtCache(petId);
      bb.realtime.publish("pets", { kind: "pet-changed", petId });
      return { ok: true };
    },
    async clearDrafts() {
      rmSync(draftsDir, { recursive: true, force: true });
      mkdirSync(draftsDir, { recursive: true });
      await bb.storage.kv.delete("drafts");
      return { ok: true };
    },
    petPet({ petId }) {
      const row = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
      if (!row) return { accepted: false, xp: 0, cooldownRemainingMs: 0 };
      const now = Date.now();
      const since = row.last_petted_at ? now - row.last_petted_at : Number.POSITIVE_INFINITY;
      // Petting inside the cooldown must not slide the window — otherwise
      // rapid petting starves the pet of XP forever.
      if (since < PET_COOLDOWN_MS) {
        db.prepare(`UPDATE pets SET petted_count = petted_count + 1 WHERE id = ?`).run(petId);
        return { accepted: true, xp: row.xp, cooldownRemainingMs: PET_COOLDOWN_MS - since };
      }
      db.prepare(
        `UPDATE pets SET petted_count = petted_count + 1, last_petted_at = ? WHERE id = ?`,
      ).run(now, petId);
      // XP belongs to the active pet; petting a den pet through the panel
      // must not credit whoever happens to be active.
      if (getActivePet()?.id !== petId) {
        return { accepted: true, xp: row.xp, cooldownRemainingMs: PET_COOLDOWN_MS };
      }
      awardXp("petted", null, null);
      const fresh = db.prepare(`SELECT xp FROM pets WHERE id = ?`).get(petId) as { xp: number };
      return { accepted: true, xp: fresh.xp, cooldownRemainingMs: PET_COOLDOWN_MS };
    },
    async setOverlayPrefs(prefs) {
      await bb.storage.kv.set("overlay-prefs", prefs);
      return { ok: true };
    },
    getNeediestThread() {
      const pick = neediest([...fleet.values()]);
      return {
        thread: pick ? { id: pick.id, projectId: pick.projectId, title: pick.title } : null,
      };
    },
    getAttentionThreads() {
      const threads = [...fleet.values()]
        .filter((t) => t.waiting || t.status === "failed")
        .sort((a, b) => Number(b.waiting) - Number(a.waiting) || a.updatedAt - b.updatedAt);
      return { threads };
    },
    async hatchDrafts({ description }) {
      acquireJobSlot();
      let engines: SpriteEngines;
      try {
        engines = await engineConfig();
      } catch (error) {
        generationBusy = false;
        throw error;
      }
      const jobId = `job_${randomUUID().slice(0, 8)}`;
      runJob(jobId, "drafts", description, 4, [], async (signal) => {
        publishProgress(jobId, "drafts", 0, 4, "Imagining candidates…");
        const buffers = await generateHeroDrafts(
          engines,
          description,
          4,
          (done, total) => {
            if (!signal.aborted) publishProgress(jobId, "drafts", done, total, `Draft ${done}/${total}`);
          },
          signal,
        );
        if (signal.aborted) return;
        const now = Date.now();
        const metas: DraftMeta[] = buffers.map((buffer, index) => {
          const id = `draft-${now}-${index}`;
          writeFileSync(path.join(draftsDir, `${id}.png`), buffer);
          return { id, description, createdAt: now };
        });
        const all = [...metas, ...(await getDraftMetas())].slice(0, 12);
        // Drop files that fell off the retention window.
        for (const stale of (await getDraftMetas()).filter((m) => !all.some((k) => k.id === m.id))) {
          rmSync(path.join(draftsDir, `${stale.id}.png`), { force: true });
        }
        await bb.storage.kv.set("drafts", all);
        bb.realtime.publish("pets", {
          kind: "drafts-ready",
          jobId,
          drafts: metas.map(draftView),
        });
      });
      return { jobId };
    },
    async listDrafts() {
      const metas = await getDraftMetas();
      return { drafts: metas.map(draftView), generating: generationBusy };
    },
    async refineDraft({ draftId, instruction }) {
      if (!/^[a-z0-9-]+$/.test(draftId)) throw new Error("That draft is gone. Generate new ones.");
      if (refineBusy) throw new Error("Already refining.");
      refineBusy = true;
      try {
        const draftPath = path.join(draftsDir, `${draftId}.png`);
        if (!existsSync(draftPath)) throw new Error("That draft is gone. Generate new ones.");
        const engines = await engineConfig();
        const refined = await refineDraft(engines, readFileSync(draftPath), instruction.trim());
        // Same id, same file: the panel re-fetches with a cache-busting v.
        writeFileSync(draftPath, refined);
        bb.realtime.publish("pets", { kind: "draft-changed", draftId });
        return { draftId };
      } finally {
        refineBusy = false;
      }
    },
    async hatchCommit({ draftId, name, description }) {
      acquireJobSlot();
      let engines: SpriteEngines;
      let hero: Buffer;
      let states: Awaited<ReturnType<typeof packStates>>;
      try {
        const heroPath = path.join(draftsDir, `${draftId}.png`);
        if (!existsSync(heroPath)) throw new Error("That draft is gone. Generate new ones.");
        engines = await engineConfig();
        hero = readFileSync(heroPath);
        states = await packStates();
      } catch (error) {
        generationBusy = false;
        throw error;
      }
      const jobId = `job_${randomUUID().slice(0, 8)}`;
      runJob(jobId, "hatch", name.trim(), states.length, [...states], async (signal) => {
        const petId = `pet-${randomUUID().slice(0, 8)}`;
        const sideHero = needsSideHero(engines, states)
          ? await ensureSideHero({ id: petId } as PetRow, engines, hero)
          : undefined;
        if (signal.aborted) return;
        const result = await generateStrips(
          engines,
          hero,
          (done, total, state) => {
            if (!signal.aborted)
              publishProgress(jobId, "hatch", done, total, `Animated ${state}`, state);
          },
          signal,
          states,
          sideHero,
        );
        if (signal.aborted) return;
        if (result.skipped.length > 0) {
          bb.log.warn(`${jobId}: skipped ${result.skipped.map((s) => `${s.state} (${s.reason})`).join(", ")}`);
          bb.realtime.publish("pets", {
            kind: "gen-warning",
            jobId,
            phase: "hatch",
            subject: name.trim(),
            skipped: result.skipped,
          });
        }
        saveStrips(petId, 0, result);
        writeFileSync(path.join(spritesDir, `${petId}-hero.png`), hero);
        db.transaction(() => {
          db.prepare(`UPDATE pets SET active = 0 WHERE active = 1`).run();
          db.prepare(
            `INSERT INTO pets (id, name, description, kind, active, created_at)
             VALUES (?, ?, ?, 'hatched', 1, ?)`,
          ).run(petId, name.trim(), description, Date.now());
        })();
        try {
          writeDiary(petId, "hatch", "day one. i have decided to trust you.");
        } catch (error) {
          bb.log.warn(`diary hatch write failed: ${String(error)}`);
        }
        bb.realtime.publish("pets", { kind: "hatched", jobId, petId });
        bb.realtime.publish("pets", { kind: "pet-changed", petId });
      });
      return { jobId };
    },
    async evolveArt({ petId }) {
      acquireJobSlot();
      let row: PetRow;
      let stage: ReturnType<typeof stageForXp>;
      let modifier: string;
      let engines: SpriteEngines;
      let hero: Buffer;
      let states: Awaited<ReturnType<typeof packStates>>;
      try {
        const found = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
        if (!found) throw new Error("Unknown pet.");
        row = found;
        stage = stageForXp(row.xp);
        if (stage.index <= row.art_stage)
          throw new Error(`${row.name}'s artwork is already current.`);
        const stageModifier = STAGE_MODIFIERS[stage.index];
        if (!stageModifier) throw new Error("No look defined for this stage.");
        modifier = stageModifier;
        const heroPath = heroPathFor(row);
        if (!existsSync(heroPath)) throw new Error("No hero portrait for this pet.");
        engines = await engineConfig();
        hero = readFileSync(heroPath);
        states = await packStates();
      } catch (error) {
        generationBusy = false;
        throw error;
      }
      const jobId = `job_${randomUUID().slice(0, 8)}`;
      runJob(jobId, "evolve", row.name, states.length + 1, [...states], async (signal) => {
        publishProgress(jobId, "evolve", 0, states.length + 1, "Redrawing the hero…");
        const evolved = await evolveHero(engines, hero, row.description, modifier, signal);
        if (signal.aborted) return;
        // Stage the new hero rather than overwriting the live one: if the
        // strips fail or the job is aborted, the pet keeps art that matches
        // its portrait, and the staged file (never lost to a crash) is simply
        // overwritten by the next attempt.
        const stagedHeroPath = path.join(spritesDir, `${row.id}-hero.next.png`);
        writeFileSync(stagedHeroPath, evolved);
        // The hero changed, so any cached side profile is of the old look.
        rmSync(sideHeroPathFor(row), { force: true });
        const sideHero = needsSideHero(engines, states)
          ? await ensureSideHero(row, engines, evolved)
          : undefined;
        if (signal.aborted) return;
        const result = await generateStrips(
          engines,
          evolved,
          (done, total, state) => {
            if (!signal.aborted)
              publishProgress(jobId, "evolve", done + 1, total + 1, `Animated ${state}`, state);
          },
          signal,
          states,
          sideHero,
        );
        if (signal.aborted) return;
        if (result.skipped.length > 0) {
          bb.log.warn(`${jobId}: skipped ${result.skipped.map((s) => `${s.state} (${s.reason})`).join(", ")}`);
          bb.realtime.publish("pets", {
            kind: "gen-warning",
            jobId,
            phase: "evolve",
            subject: row.name,
            skipped: result.skipped,
          });
        }
        saveStrips(row.id, stage.index, result);
        // Archive the outgoing portrait before the staged rename commits the
        // new one: past-stage art is the pet's lineage, and the rename would
        // otherwise destroy it.
        const livingHeroPath = heroPathFor(row);
        if (existsSync(livingHeroPath)) {
          copyFileSync(
            livingHeroPath,
            path.join(spritesDir, `${row.id}-hero-stage${row.art_stage}.png`),
          );
        }
        renameSync(stagedHeroPath, path.join(spritesDir, `${row.id}-hero.png`));
        db.prepare(`UPDATE pets SET art_stage = ? WHERE id = ?`).run(stage.index, row.id);
        try {
          writeDiary(
            row.id,
            "evolve",
            `outgrew my old pixels at ${row.xp} xp. keeping the attitude.`,
          );
        } catch (error) {
          bb.log.warn(`diary evolve write failed: ${String(error)}`);
        }
        bb.realtime.publish("pets", { kind: "evolved-art", jobId, petId: row.id });
        bb.realtime.publish("pets", { kind: "pet-changed", petId: row.id });
      });
      return { jobId };
    },
    async refreshArt({ petId }) {
      acquireJobSlot();
      let row: PetRow;
      let engines: SpriteEngines;
      let hero: Buffer;
      let states: Awaited<ReturnType<typeof packStates>>;
      try {
        const found = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
        if (!found) throw new Error("Unknown pet.");
        row = found;
        const heroPath = heroPathFor(row);
        if (!existsSync(heroPath)) throw new Error("No hero portrait for this pet.");
        engines = await engineConfig();
        hero = readFileSync(heroPath);
        states = await packStates();
      } catch (error) {
        generationBusy = false;
        throw error;
      }
      const jobId = `job_${randomUUID().slice(0, 8)}`;
      runJob(jobId, "refresh", row.name, states.length, [...states], async (signal) => {
        const sideHero = needsSideHero(engines, states)
          ? await ensureSideHero(row, engines, hero)
          : undefined;
        if (signal.aborted) return;
        const result = await generateStrips(
          engines,
          hero,
          (done, total, state) => {
            if (!signal.aborted)
              publishProgress(jobId, "refresh", done, total, `Animated ${state}`, state);
          },
          signal,
          states,
          sideHero,
        );
        if (signal.aborted) return;
        if (result.skipped.length > 0) {
          bb.log.warn(`${jobId}: skipped ${result.skipped.map((s) => `${s.state} (${s.reason})`).join(", ")}`);
          bb.realtime.publish("pets", {
            kind: "gen-warning",
            jobId,
            phase: "refresh",
            subject: row.name,
            skipped: result.skipped,
          });
        }
        saveStrips(row.id, row.art_stage, result);
        bb.realtime.publish("pets", { kind: "evolved-art", jobId, petId: row.id });
        bb.realtime.publish("pets", { kind: "pet-changed", petId: row.id });
      });
      return { jobId };
    },
    async regenerateStates(input) {
      acquireJobSlot();
      let row: PetRow;
      let engines: SpriteEngines;
      let hero: Buffer;
      let requested: SpriteState[];
      try {
        const found = db
          .prepare(`SELECT * FROM pets WHERE id = ?`)
          .get(input.petId) as PetRow | undefined;
        if (!found) throw new Error("Unknown pet.");
        row = found;
        requested = input.states.filter(isSpriteState);
        if (requested.length === 0) throw new Error("No valid states.");
        const heroPath = heroPathFor(row);
        if (!existsSync(heroPath)) throw new Error("No hero portrait for this pet.");
        engines = await engineConfig();
        hero = readFileSync(heroPath);
      } catch (error) {
        generationBusy = false;
        throw error;
      }
      const jobId = `job_${randomUUID().slice(0, 8)}`;
      runJob(
        jobId,
        "refresh",
        `${row.name} (${requested.join(", ")})`,
        requested.length,
        [...requested],
        async (signal) => {
          const sideHero = needsSideHero(engines, requested)
            ? await ensureSideHero(row, engines, hero)
            : undefined;
          if (signal.aborted) return;
          const result = await generateStrips(
            engines,
            hero,
            (done, total, state) => {
              if (!signal.aborted)
                publishProgress(jobId, "refresh", done, total, `Animated ${state}`, state);
            },
            signal,
            requested,
            sideHero,
          );
          if (signal.aborted) return;
          if (result.skipped.length > 0) {
            bb.log.warn(
              `${jobId}: skipped ${result.skipped.map((s) => `${s.state} (${s.reason})`).join(", ")}`,
            );
            bb.realtime.publish("pets", {
              kind: "gen-warning",
              jobId,
              phase: "refresh",
              subject: row.name,
              skipped: result.skipped,
            });
          }
          saveStrips(row.id, row.art_stage, result);
          try {
            writeDiary(row.id, "touchup", `got my ${requested.join(" and ")} redrawn. felt nothing.`);
          } catch (error) {
            bb.log.warn(`diary touchup write failed: ${String(error)}`);
          }
          bb.realtime.publish("pets", { kind: "evolved-art", jobId, petId: row.id });
          bb.realtime.publish("pets", { kind: "pet-changed", petId: row.id });
        },
      );
      return { jobId };
    },
    getJobStatus() {
      return { job: currentJob, lastError: lastJobError };
    },
    getStats() {
      const pet = getActivePet();
      const totalsRows = db
        .prepare(
          `SELECT source, COUNT(*) AS count, SUM(amount) AS xp FROM xp_events
           ${pet ? "WHERE pet_id = ?" : ""} GROUP BY source`,
        )
        .all(...(pet ? [pet.id] : [])) as { source: string; count: number; xp: number }[];
      const totals: Record<string, { count: number; xp: number }> = {};
      for (const row of totalsRows) totals[row.source] = { count: row.count, xp: row.xp };
      const recent = db
        .prepare(
          `SELECT source, amount, created_at AS createdAt FROM xp_events
           ${pet ? "WHERE pet_id = ?" : ""} ORDER BY created_at DESC LIMIT 20`,
        )
        .all(...(pet ? [pet.id] : [])) as { source: string; amount: number; createdAt: number }[];
      const hourRows = db
        .prepare(
          `SELECT DISTINCT CAST(strftime('%H', created_at / 1000, 'unixepoch', 'localtime') AS INTEGER) AS hour
           FROM xp_events ${pet ? "WHERE pet_id = ?" : ""}`,
        )
        .all(...(pet ? [pet.id] : [])) as { hour: number }[];
      const denSize = (db.prepare(`SELECT COUNT(*) AS n FROM pets`).get() as { n: number }).n;
      return {
        totalXp: pet?.xp ?? 0,
        totals,
        achievements: computeAchievements({
          totalsBySource: totals,
          stageIndex: pet ? stageForXp(pet.xp).index : 0,
          pettedCount: pet?.petted_count ?? 0,
          denSize,
          activeHours: hourRows.map((r) => r.hour),
        }),
        recent,
      };
    },
    // Lineage walks XP stages; art may lag until a glow-up, so stages between
    // the archived art and the current art render as null ("not yet drawn").
    getLineage({ petId }) {
      const row = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
      if (!row) return { stages: [] };
      const base = `/api/v1/plugins/${bb.pluginId}/http/hero?petId=${encodeURIComponent(row.id)}`;
      let heroVersion = 0;
      try {
        heroVersion = Math.round(statSync(heroPathFor(row)).mtimeMs);
      } catch {
        heroVersion = 0;
      }
      const xpStageIndex = stageForXp(row.xp).index;
      const stages = [];
      for (let index = 0; index <= xpStageIndex; index += 1) {
        const stage = STAGES[index] ?? STAGES[STAGES.length - 1]!;
        const archived = path.join(spritesDir, `${row.id}-hero-stage${index}.png`);
        stages.push({
          stage: index,
          name: stage.name,
          epithet: stage.epithet,
          heroUrl:
            index === row.art_stage
              ? `${base}&v=${heroVersion}`
              : existsSync(archived)
                ? `${base}&stage=${index}`
                : null,
          current: index === xpStageIndex,
        });
      }
      return { stages };
    },
    getDiary(input) {
      const petId = input?.petId ?? getActivePet()?.id ?? null;
      if (!petId) return { entries: [] };
      const entries = selectDiaryStmt.all(petId, input?.limit ?? 60) as {
        id: number;
        ts: number;
        kind: string;
        text: string;
      }[];
      return { entries };
    },
    async getTreats() {
      return withWallet(async () => ({
        balance: await readCounter(TREATS_BALANCE_KEY),
        eaten: await readCounter(TREATS_EATEN_KEY),
      }));
    },
    async dropTreat() {
      return withWallet(async () => {
        const current = await readCounter(TREATS_BALANCE_KEY);
        if (current <= 0) throw new Error("No treats left.");
        const balance = current - 1;
        await bb.storage.kv.set(TREATS_BALANCE_KEY, balance);
        publishTreatDrop();
        return { balance };
      });
    },
    async eatTreat() {
      const eaten = await withWallet(async () => {
        const next = (await readCounter(TREATS_EATEN_KEY)) + 1;
        await bb.storage.kv.set(TREATS_EATEN_KEY, next);
        return next;
      });
      const pet = getActivePet();
      if (pet) {
        awardXp("treat", null, null, 2);
        try {
          writeDiary(pet.id, "treat", "ate a treat. gourmet hour.", true);
        } catch (error) {
          bb.log.warn(`diary treat write failed: ${String(error)}`);
        }
      }
      return { eaten };
    },
    recordFetch() {
      const pet = getActivePet();
      if (pet) {
        awardXp("play", null, null, 2);
        try {
          writeDiary(pet.id, "fetch", "fetch. i allowed it.", true);
        } catch (error) {
          bb.log.warn(`diary fetch write failed: ${String(error)}`);
        }
      }
      return { ok: true as const };
    },
  });

  // --- sprite serving --------------------------------------------------------

  bb.http.route("GET", "/sprite", async (c) => {
    const petId = c.req.query("pet") ?? "";
    const state = c.req.query("state") ?? "idle";
    if (!isSpriteState(state)) return new Response("unknown state", { status: 400 });
    const row = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
    if (!row) return new Response("unknown pet", { status: 404 });
    const file = stripPathFor(row, state);
    if (!existsSync(file)) return new Response("no artwork yet", { status: 404 });
    // Immutable caching is only honest when the requested version IS the
    // current version. A stale-URL request would otherwise cache CURRENT
    // bytes under an OLD URL, wedging clients on mismatched art forever.
    const requestedVersion = c.req.query("v");
    const current = String(artVersionFor(row));
    const isCurrent = requestedVersion === undefined || requestedVersion === current;
    return new Response(new Uint8Array(readFileSync(file)), {
      headers: {
        "content-type": "image/png",
        "cache-control": isCurrent ? "public, max-age=31536000, immutable" : "no-store",
      },
    });
  });

  bb.http.route("GET", "/hero", async (c) => {
    const petId = c.req.query("petId") ?? "";
    const stage = c.req.query("stage");
    const row = db.prepare(`SELECT * FROM pets WHERE id = ?`).get(petId) as PetRow | undefined;
    if (!row) return new Response("unknown pet", { status: 404 });
    if (stage !== undefined && !/^\d+$/.test(stage))
      return new Response("bad stage", { status: 400 });
    const file =
      stage !== undefined
        ? path.join(spritesDir, `${row.id}-hero-stage${stage}.png`)
        : heroPathFor(row);
    if (!existsSync(file)) return new Response("no artwork yet", { status: 404 });
    // Archived stage portraits are written once and never rewritten, so they
    // are honestly immutable; the current hero is replaced on every evolve.
    return new Response(new Uint8Array(readFileSync(file)), {
      headers: {
        "content-type": "image/png",
        "cache-control":
          stage !== undefined ? "public, max-age=31536000, immutable" : "no-store",
      },
    });
  });

  bb.http.route("GET", "/draft", async (c) => {
    const id = c.req.query("id") ?? "";
    if (!/^[a-z0-9-]+$/.test(id)) return new Response("bad id", { status: 400 });
    const file = path.join(draftsDir, `${id}.png`);
    if (!existsSync(file)) return new Response("unknown draft", { status: 404 });
    // A `v` query param may be present purely to bust the client cache; it is
    // ignored here. Drafts are mutable (refinement rewrites the same file), so
    // this must never be cached.
    return new Response(new Uint8Array(readFileSync(file)), {
      headers: {
        "content-type": "image/png",
        "cache-control": "no-store",
      },
    });
  });

  // --- CLI -------------------------------------------------------------------

  bb.cli.register({
    name: "pets",
    summary: "Your bb companion: status, den, and controls",
    commands: [
      { name: "status", summary: "Active pet, stage, XP, and fleet mood", usage: "bb pets status" },
      { name: "list", summary: "All pets in the den", usage: "bb pets list" },
      { name: "select", summary: "Make a den pet the active companion", usage: "bb pets select <name|id>" },
      { name: "rename", summary: "Rename a pet", usage: "bb pets rename <name|id> <new-name>" },
      { name: "on", summary: "Enable the overlay", usage: "bb pets on" },
      { name: "off", summary: "Disable the overlay", usage: "bb pets off" },
      { name: "reset", summary: "Dev: wipe den, XP, art, drafts and reseed the starter", usage: "bb pets reset" },
    ],
    async run(argv) {
      const [command, ...rest] = argv;
      const findPet = (ref: string): PetRow | undefined =>
        db
          .prepare(`SELECT * FROM pets WHERE id = ? OR LOWER(name) = LOWER(?) LIMIT 1`)
          .get(ref, ref) as PetRow | undefined;

      switch (command) {
        case "status": {
          const pet = getActivePet();
          if (!pet) return { exitCode: 0, stdout: "No active pet. Hatch one from the overlay." };
          const stage = stageForXp(pet.xp);
          const next = nextStageFor(pet.xp);
          const { enabled, openaiApiKey } = await settings.get();
          const fleetNow = snapshot(fleet);
          const lines = [
            `${pet.name} — ${stage.name} (${stage.epithet})`,
            `XP: ${pet.xp}${next ? ` (${next.minXp - pet.xp} to ${next.name})` : " (max stage)"}`,
            `Petted ${pet.petted_count} times`,
            `Fleet: ${fleetNow.counts.active} running, ${fleetNow.counts.waiting} waiting on you, ${fleetNow.counts.failed} failed → mood: ${fleetNow.mood}`,
            `Overlay: ${enabled ? "on" : "off"} · Hatching key: ${openaiApiKey ? "configured" : "not configured"}`,
          ];
          return { exitCode: 0, stdout: lines.join("\n") };
        }
        case "list": {
          const rows = db
            .prepare(`SELECT * FROM pets ORDER BY active DESC, created_at ASC`)
            .all() as PetRow[];
          const lines = rows.map((row) => {
            const stage = stageForXp(row.xp);
            return `${row.active ? "→" : " "} ${row.name} (${row.id}) — ${stage.name}, ${row.xp} XP`;
          });
          return { exitCode: 0, stdout: lines.join("\n") || "The den is empty." };
        }
        case "select": {
          const ref = rest.join(" ").trim();
          const pet = ref ? findPet(ref) : undefined;
          if (!pet) return { exitCode: 1, stderr: `No pet matching "${ref}". Try: bb pets list` };
          db.transaction(() => {
            db.prepare(`UPDATE pets SET active = 0 WHERE active = 1`).run();
            db.prepare(`UPDATE pets SET active = 1 WHERE id = ?`).run(pet.id);
          })();
          bb.realtime.publish("pets", { kind: "pet-changed", petId: pet.id });
          return { exitCode: 0, stdout: `${pet.name} is now your companion.` };
        }
        case "rename": {
          const [ref, ...nameParts] = rest;
          const newName = nameParts.join(" ").trim();
          const pet = ref ? findPet(ref) : undefined;
          if (!pet || !newName)
            return { exitCode: 1, stderr: "Usage: bb pets rename <name|id> <new-name>" };
          db.prepare(`UPDATE pets SET name = ? WHERE id = ?`).run(newName, pet.id);
          bb.realtime.publish("pets", { kind: "pet-changed", petId: pet.id });
          return { exitCode: 0, stdout: `${pet.name} is now ${newName}.` };
        }
        case "on":
        case "off": {
          await bb.sdk.plugins.updateSettings({
            pluginId: bb.pluginId,
            values: { enabled: command === "on" },
          });
          return { exitCode: 0, stdout: `Overlay ${command}.` };
        }
        case "reset": {
          // A running job holds file handles and will write art for pets that
          // are about to stop existing — stop it before wiping.
          for (const controller of jobControllers) controller.abort();
          jobControllers.clear();
          generationBusy = false;
          currentJob = null;
          db.transaction(() => {
            db.prepare(`DELETE FROM xp_events`).run();
            db.prepare(`DELETE FROM pets`).run();
          })();
          for (const key of ["overlay-prefs", "drafts"]) {
            await bb.storage.kv.delete(key);
          }
          rmSync(spritesDir, { recursive: true, force: true });
          rmSync(draftsDir, { recursive: true, force: true });
          mkdirSync(spritesDir, { recursive: true });
          mkdirSync(draftsDir, { recursive: true });
          atlasCache.clear();
          seedStarterIfEmpty();
          bb.realtime.publish("pets", { kind: "pet-changed", petId: "starter" });
          return { exitCode: 0, stdout: "Den reset. Pixel is back at Hatchling, fresh out of the shell." };
        }
        default:
          return {
            exitCode: command ? 1 : 0,
            stdout:
              "bb pets — your companion\n\n  status   Active pet, stage, XP, fleet mood\n  list     All pets in the den\n  select   Switch companion\n  rename   Rename a pet\n  on/off   Toggle the overlay\n  reset    Dev: wipe den, XP, art, drafts",
          };
      }
    },
  });

  settings.onChange((values) => {
    currentPack = values.animationPack;
    try {
      bb.realtime.publish("pets", { kind: "settings-changed" });
    } catch {
      // settings change landed after teardown — the mirror is updated, done
    }
  });

  bb.log.info("pets backend ready");
}
