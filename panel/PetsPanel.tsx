// The Pets nav panel — den management, the hatchery (describe → drafts →
// hatch), and stats/achievements. Ordinary slot component, so SDK hooks work.
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  useBbNavigate,
  useRealtime,
  useRpc,
  type PluginNavPanelProps,
} from "@bb/plugin-sdk/app";
import type { rpcContract } from "../server";
import { Habitat } from "./Habitat";
import type { RpcOutput } from "../overlay/net";
import type { SpriteState } from "../src/atlas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const openPluginSettings = () => {
  history.pushState({}, "", "/settings/plugins/pets");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

/**
 * The "best results" checklist — always visible in the hatchery so the
 * trade-off is understood every time, and skippable by design: only the
 * OpenAI key is required to hatch at all.
 */
function EngineRecipe({
  hasApiKey,
  hasRdKey,
  engine,
  pack,
}: {
  hasApiKey: boolean;
  hasRdKey: boolean;
  engine: string;
  pack: string;
}) {
  const rows = [
    {
      key: "openai",
      title: "OpenAI key",
      set: hasApiKey,
      requirement: "required",
      why: "Draws your creature — the drafts, the hero, and every evolution look.",
    },
    {
      key: "rd",
      title: "Retro Diffusion key",
      set: hasRdKey,
      requirement: "recommended",
      why: "Animates it natively — smooth 8-frame true pixel motion instead of 4-frame approximations.",
    },
  ];
  const statesCount = pack === "essential" ? 9 : pack === "deluxe" ? 18 : 14;
  const packLabel = pack.charAt(0).toUpperCase() + pack.slice(1);
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-sm font-medium">Best-results checklist</p>
          <span className="text-right text-xs text-muted-foreground">
            <span className="block">
              Animations:{" "}
              {engine === "retro-diffusion"
                ? "Retro Diffusion (native pixel art)"
                : "gpt-image + pixel-perfect quantization"}
            </span>
            <span className="block">
              Pack: {packLabel} ({statesCount} animations)
            </span>
          </span>
        </div>
        <div className="space-y-2">
          {rows.map((row, index) => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.06 }}
              className="flex items-center gap-3"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  row.set
                    ? "bg-primary text-primary-foreground"
                    : "border border-dashed border-muted-foreground/50 text-muted-foreground"
                }`}
                aria-hidden="true"
              >
                {row.set ? "✓" : ""}
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-sm">
                  {row.title}{" "}
                  <Badge variant={row.set ? "secondary" : row.requirement === "required" ? "destructive" : "outline"} className="ml-1 align-middle">
                    {row.set ? "set" : row.requirement}
                  </Badge>
                </span>
                <p className="truncate text-xs text-muted-foreground" title={row.why}>
                  {row.why}
                </p>
              </div>
              {!row.set ? (
                <Button size="sm" variant="outline" onClick={openPluginSettings}>
                  Add key
                </Button>
              ) : null}
            </motion.div>
          ))}
        </div>
        {!hasRdKey ? (
          <p className="text-xs text-muted-foreground">
            You can hatch without Retro Diffusion — animations fall back to gpt-image with
            pixel-perfect quantization. Get a key at retrodiffusion.ai (~$2 per pet).
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

type Pet = RpcOutput<"listDen">["pets"][number];
type Draft = RpcOutput<"listDrafts">["drafts"][number];
type Stats = RpcOutput<"getStats">;
type Job = RpcOutput<"getJobStatus">["job"];
type JobError = RpcOutput<"getJobStatus">["lastError"];

const PHASE_LABELS: Record<string, string> = {
  drafts: "Drafting candidates for",
  hatch: "Hatching",
  evolve: "Evolving",
  refresh: "Re-animating",
};

function formatElapsed(since: number): string {
  const total = Math.max(0, Math.floor((Date.now() - since) / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * The one true progress surface. Jobs run server-side and survive
 * navigation; this banner reattaches to whatever is running (or whatever
 * failed while nobody was looking) on every mount, on every tab.
 */
function JobBanner({
  job,
  lastError,
  onDismissError,
}: {
  job: Job;
  lastError: JobError;
  onDismissError: () => void;
}) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!job) return;
    const timer = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(timer);
  }, [job?.jobId]);

  if (job) {
    const sinceProgress = Date.now() - job.progressAt;
    const slow = sinceProgress > 90_000;
    const chipStates = job.states.length > 0 ? job.states : [];
    const showChips = job.phase !== "drafts" && chipStates.length > 0;
    const currentState = showChips ? chipStates.filter((s) => !job.statesDone.includes(s))[0] : null;
    return (
      <Card className="border-primary/30">
        <CardContent className="space-y-2.5 p-4">
          <div className="flex items-baseline gap-2">
            <motion.span
              className="h-2 w-2 shrink-0 self-center rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
            <p className="min-w-0 flex-1 truncate text-sm font-medium">
              {PHASE_LABELS[job.phase] ?? job.phase} {job.subject}
            </p>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatElapsed(job.startedAt)} · {job.done}/{job.total}
            </span>
          </div>
          <Progress value={(job.done / Math.max(1, job.total)) * 100} />
          {showChips ? (
            <div className="flex flex-wrap gap-1">
              {chipStates.map((state) => {
                const done = job.statesDone.includes(state);
                const current = state === currentState;
                return (
                  <motion.span
                    key={state}
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      done
                        ? "border-primary/40 bg-primary/15 text-foreground"
                        : current
                          ? "border-primary text-foreground"
                          : "border-border text-muted-foreground/60"
                    }`}
                    animate={current ? { opacity: [1, 0.45, 1] } : undefined}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    {done ? "✓ " : ""}
                    {state}
                  </motion.span>
                );
              })}
            </div>
          ) : null}
          <p className="text-xs text-muted-foreground">
            {slow
              ? `No progress for ${Math.floor(sinceProgress / 1000)}s — image APIs crawl sometimes; still connected and working.`
              : "Runs on the server — you can leave this page and come back."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (lastError) {
    return (
      <Alert className="border-destructive/50">
        <AlertTitle>
          {PHASE_LABELS[lastError.phase] ?? lastError.phase} {lastError.subject} failed{" "}
          <span className="font-normal text-muted-foreground">· {timeAgo(lastError.at)}</span>
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-3">
          <span className="min-w-0 flex-1">{lastError.message}</span>
          <Button size="sm" variant="outline" onClick={onDismissError}>
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  return null;
}

const SOURCE_LABELS: Record<string, string> = {
  "turn-completed": "Turns completed",
  "thread-archived": "Threads shipped",
  "thread-failed": "Failures survived",
  petted: "Pets received",
  "daily-greeting": "Daily hellos",
};

const SUGGESTIONS = [
  "a grumpy space cat with tiny jetpack",
  "a sleepy mushroom knight",
  "a golden retriever wizard",
  "an anxious little ghost barista",
  "a tiny dragon who hoards commits",
];

const SURPRISE_POOL = [
  ...SUGGESTIONS,
  "a round penguin in a hand-knitted sweater",
  "a caffeinated squirrel wearing safety goggles",
  "a melancholy jellyfish with a bowler hat",
  "a tiny yeti hugging a thermos",
  "a capybara lifeguard with a whistle",
  "a moth in a wizard cloak drawn to deploy buttons",
  "a potato with determined eyes and small boots",
  "an octopus barista juggling four espresso cups",
];

const NAME_POOL = [
  "Byte", "Mochi", "Turbo", "Ziggy", "Pico", "Waffle", "Nimbus", "Sprocket",
  "Miso", "Comet", "Pretzel", "Gizmo", "Noodle", "Fizz", "Clover", "Pistachio",
];

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/**
 * A small live canvas playing one animation state of a pet. `size` is the
 * target CHARACTER height — the cell box is inflated by however much padding
 * the artwork carries, so heavily-padded pets read the same size as
 * cell-filling ones.
 */
function SpriteThumb({ pet, state = "idle", size = 64 }: { pet: Pet; state?: SpriteState; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const spec = pet.atlas.states[state] ?? pet.atlas.states.idle;
    if (!spec) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = `${pet.spriteBaseUrl}&state=${state}`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let frame = 0;
    let last = performance.now();
    let clock = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      clock += dt * spec.fps;
      if (clock < 1) return;
      clock %= 1;
      frame = (frame + 1) % spec.frames;
      const ctx = canvas.getContext("2d");
      if (!ctx || !img.complete || img.naturalWidth === 0) return;
      // Geometry from the bytes, not the atlas (see Overlay paint notes).
      const cellW = Math.floor(img.naturalWidth / spec.frames);
      // Character-normalized: inflate the cell box by the character's padding.
      const contentFraction = Math.min(
        1,
        Math.max(0.3, (spec.contentHeight ?? spec.height * 0.9) / spec.height),
      );
      let boxH = size / contentFraction;
      let boxW = boxH * (cellW / img.naturalHeight);
      if (boxW > 110) {
        boxH *= 110 / boxW;
        boxW = 110;
      }
      const pxW = Math.round(boxW * dpr);
      const pxH = Math.round(boxH * dpr);
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
        canvas.style.width = `${boxW}px`;
        canvas.style.height = `${boxH}px`;
      }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, frame * cellW, 0, cellW, img.naturalHeight, 0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [pet.spriteBaseUrl, pet.atlas, state, size]);
  return <canvas ref={canvasRef} style={{ imageRendering: "pixelated" }} aria-hidden="true" />;
}

type LineageStage = RpcOutput<"getLineage">["stages"][number];

/**
 * The stage timeline on a den card: every stage this pet has been, drawn from
 * the archived heroes. Fetched lazily per card so the den list itself stays a
 * single round-trip. Hidden entirely for pets that have never evolved — a
 * one-entry "timeline" is just noise.
 */
function LineageStrip({ petId }: { petId: string }) {
  const rpc = useRpc<typeof rpcContract>();
  const [stages, setStages] = useState<LineageStage[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    rpc
      .call("getLineage", { petId })
      .then((r) => {
        if (!cancelled) setStages(r.stages);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [rpc, petId]);

  if (!stages || stages.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5">
      {stages.map((entry) => {
        const label = `${entry.name} · ${entry.epithet}`;
        const ring = entry.current ? " ring-1 ring-primary" : "";
        return entry.heroUrl ? (
          <img
            key={entry.stage}
            src={entry.heroUrl}
            alt={label}
            title={label}
            width={28}
            height={28}
            className={`h-7 w-7 shrink-0 rounded border border-border object-contain${ring}`}
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <span
            key={entry.stage}
            title={label}
            aria-label={label}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-muted text-[10px] tabular-nums text-muted-foreground${ring}`}
          >
            {entry.stage}
          </span>
        );
      })}
    </div>
  );
}

/** Per-state repair: pick exactly the animations that came out wrong and
 *  regenerate only those — the rest of the artwork is left untouched. */
function FixAnimationsPicker({ pet, jobActive }: { pet: Pet; jobActive: boolean }) {
  const rpc = useRpc<typeof rpcContract>();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const states = Object.keys(pet.atlas.states).sort();
  const count = selection.size;

  const toggle = (state: string, checked: boolean) => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (checked) next.add(state);
      else next.delete(state);
      return next;
    });
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // Fresh selection every time it opens — a stale pick from last time is
        // never what you meant to regenerate now.
        if (next) setSelection(new Set());
      }}
    >
      <Tooltip>
        {/* The span keeps the tooltip hoverable while the button is disabled. */}
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className={`text-muted-foreground${jobActive ? " pointer-events-none" : ""}`}
                disabled={jobActive}
              >
                Fix animations…
              </Button>
            </PopoverTrigger>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {jobActive
            ? "A generation job is already running"
            : "Regenerate only the animations you pick"}
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-64 space-y-2" mobileTitle="Regenerate specific animations">
        <p className="text-sm font-medium">Regenerate specific animations</p>
        <div className="grid grid-cols-2 gap-1.5">
          {states.map((state) => (
            <div key={state} className="flex items-center gap-1.5">
              <Checkbox
                id={`${pet.id}-${state}`}
                checked={selection.has(state)}
                onCheckedChange={(checked) => toggle(state, checked === true)}
              />
              <label htmlFor={`${pet.id}-${state}`} className="text-xs">
                {state}
              </label>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-muted-foreground"
            onClick={() =>
              setSelection(new Set(["walk", "run"].filter((state) => states.includes(state))))
            }
          >
            Walk cycle
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-muted-foreground"
            onClick={() => setSelection(new Set(states))}
          >
            All
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Only the selected animations are regenerated and merged — the rest keep their art.
        </p>
        <Button
          size="sm"
          className="w-full"
          disabled={count === 0}
          onClick={() =>
            void rpc
              .call("regenerateStates", { petId: pet.id, states: [...selection] })
              .then(() => {
                toast.success(
                  `Regenerating ${count} animation${count === 1 ? "" : "s"} for ${pet.name}…`,
                );
                setOpen(false);
                setSelection(new Set());
              })
              .catch((error: Error) => toast.error(error.message))
          }
        >
          Regenerate {count}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function DenTab({ hasApiKey, jobActive }: { hasApiKey: boolean; jobActive: boolean }) {
  const rpc = useRpc<typeof rpcContract>();
  const navigate = useBbNavigate();
  const [pets, setPets] = useState<Pet[] | null>(null);
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const load = useCallback(() => {
    rpc.call("listDen").then((r) => setPets(r.pets)).catch(() => {});
  }, [rpc]);
  useEffect(load, [load]);
  useRealtime("pets", (payload) => {
    const kind = (payload as { kind?: string } | null)?.kind;
    if (kind === "pet-changed" || kind === "xp" || kind === "evolved-art" || kind === "hatched") load();
  });

  if (pets === null) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            The den is empty. Something is waiting in the Hatchery.
          </p>
          <Button
            size="sm"
            onClick={() => navigate.toPluginPanel("pets", { subPath: "hatchery" })}
          >
            Open Hatchery
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {pets.map((pet, index) => {
        const progress = pet.nextStage
          ? Math.min(
              1,
              Math.max(0, pet.xp - pet.stage.minXp) /
                Math.max(1, pet.nextStage.minXp - pet.stage.minXp),
            )
          : 1;
        return (
          <motion.div
            key={pet.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 28, delay: index * 0.04 }}
            onHoverStart={() => setHovered(pet.id)}
            onHoverEnd={() => setHovered(null)}
          >
            <Card className={pet.active ? "border-primary/50" : undefined}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex w-20 shrink-0 items-end justify-center">
                  <SpriteThumb
                    pet={pet}
                    size={72}
                    state={hovered === pet.id && pet.atlas.states.wave ? "wave" : "idle"}
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {renaming?.id === pet.id ? (
                      <form
                        className="flex items-center gap-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          const name = renaming.name.trim();
                          if (name) void rpc.call("renamePet", { petId: pet.id, name }).then(load);
                          setRenaming(null);
                        }}
                      >
                        <Input
                          autoFocus
                          value={renaming.name}
                          className="h-7 max-w-44 text-sm"
                          onChange={(event) => setRenaming({ id: pet.id, name: event.target.value })}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              event.preventDefault();
                              setRenaming(null);
                            }
                          }}
                          onBlur={() => setRenaming(null)}
                        />
                        {/* mousedown-preventDefault keeps the input focused so the
                            blur-cancel doesn't unmount the form before the click. */}
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          Save
                        </Button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        className="text-sm font-semibold hover:underline"
                        title="Rename"
                        onClick={() => setRenaming({ id: pet.id, name: pet.name })}
                      >
                        {pet.name}
                      </button>
                    )}
                    <Badge variant="secondary">{pet.stage.name}</Badge>
                    {pet.active ? <Badge>Active</Badge> : null}
                    {pet.artBehind ? (
                      <Badge variant="outline" className="text-amber-500">
                        glow up available
                      </Badge>
                    ) : null}
                    {pet.missingAnimations > 0 ? (
                      <Badge variant="outline" className="text-amber-500">
                        +{pet.missingAnimations} available
                      </Badge>
                    ) : null}
                  </div>
                  <p className="truncate text-xs italic text-muted-foreground">{pet.description}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      <NumberFlow value={pet.xp} /> XP
                    </span>
                    <Progress value={progress * 100} className="h-1.5 max-w-48" />
                    <span className="text-xs text-muted-foreground">
                      {pet.nextStage ? `${pet.nextStage.minXp - pet.xp} to ${pet.nextStage.name}` : "max"}
                    </span>
                    <span className="text-xs text-muted-foreground">petted {pet.pettedCount}×</span>
                    <span className="text-xs text-muted-foreground">
                      {Object.keys(pet.atlas.states).length} animations
                    </span>
                  </div>
                  <LineageStrip petId={pet.id} />
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  {!pet.active ? (
                    <Button size="sm" variant="outline" onClick={() => void rpc.call("selectPet", { petId: pet.id }).then(load)}>
                      Choose
                    </Button>
                  ) : null}
                  {hasApiKey ? (
                    <Tooltip>
                      {/* The span keeps the tooltip hoverable while the button is
                          disabled — a disabled button never dispatches pointer events. */}
                      <TooltipTrigger asChild>
                        <span className="inline-flex">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`text-muted-foreground${jobActive ? " pointer-events-none" : ""}`}
                            disabled={jobActive}
                            onClick={() =>
                              void rpc
                                .call("refreshArt", { petId: pet.id })
                                .then(() => toast.success(`Re-animating ${pet.name}…`))
                                .catch((error: Error) => toast.error(error.message))
                            }
                          >
                            Re-animate
                          </Button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {jobActive
                          ? "A generation job is already running"
                          : "Regenerate every animation through the latest engine at the current pack — upgrades older pets to new animation sets (~a few minutes)"}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                  {hasApiKey ? <FixAnimationsPicker pet={pet} jobActive={jobActive} /> : null}
                  {!pet.active ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                          Release…
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Release {pet.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {pet.name} leaves the den for good — {pet.xp} XP, all artwork, and{" "}
                            {pet.pettedCount} {pet.pettedCount === 1 ? "petting" : "pettings"}, gone.
                            This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep {pet.name}</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() =>
                              void rpc
                                .call("deletePet", { petId: pet.id })
                                .then(() => {
                                  toast.success(`${pet.name} wandered off into the tall grass.`);
                                  load();
                                })
                                .catch((error: Error) => toast.error(error.message))
                            }
                          >
                            Release
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : null}
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground"
                      aria-label={`Shrink ${pet.name}`}
                      disabled={pet.sizeScale <= 0.5}
                      onClick={() =>
                        void rpc
                          .call("setPetSize", {
                            petId: pet.id,
                            scale: Math.round(Math.max(0.5, pet.sizeScale - 0.1) * 10) / 10,
                          })
                          .then(load)
                      }
                    >
                      −
                    </Button>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {Math.round(pet.sizeScale * 100)}%
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground"
                      aria-label={`Enlarge ${pet.name}`}
                      disabled={pet.sizeScale >= 2.5}
                      onClick={() =>
                        void rpc
                          .call("setPetSize", {
                            petId: pet.id,
                            scale: Math.round(Math.min(2.5, pet.sizeScale + 0.1) * 10) / 10,
                          })
                          .then(load)
                      }
                    >
                      +
                    </Button>
                  </div>
                  {pet.artBehind && hasApiKey ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex">
                          <Button
                            size="sm"
                            className={jobActive ? "pointer-events-none" : undefined}
                            disabled={jobActive}
                            onClick={() =>
                              void rpc
                                .call("evolveArt", { petId: pet.id })
                                .then(() =>
                                  toast.success(`Redrawing ${pet.name} as ${pet.stage.name}…`),
                                )
                                .catch((error: Error) => toast.error(error.message))
                            }
                          >
                            ✨ Glow up
                          </Button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {jobActive
                          ? "A generation job is already running"
                          : `Regenerate the artwork to match its ${pet.stage.name} stage (~$2, a few minutes)`}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
      <p className="text-xs text-muted-foreground">
        XP comes from finished turns, shipped threads, and the occasional petting. Click your pet to
        pet it; drag it anywhere; ⌥scroll to resize; double-click to jump to the neediest thread.
      </p>
    </div>
  );
}

/** Dead-air killer: server jobs take a beat to announce themselves, so the
 *  click gets its own acknowledgement until the first `job` signal lands. */
function StartingRow() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <motion.span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
      />
      Starting job…
    </div>
  );
}

function HatcheryTab({
  hasApiKey,
  hasRdKey,
  engine,
  pack,
  jobActive,
}: {
  hasApiKey: boolean;
  hasRdKey: boolean;
  engine: string;
  pack: string;
  jobActive: boolean;
}) {
  const rpc = useRpc<typeof rpcContract>();
  const navigate = useBbNavigate();
  const [description, setDescription] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [picked, setPicked] = useState<Draft | null>(null);
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"idle" | "drafting" | "picking" | "hatching">("idle");
  const [starting, setStarting] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [refining, setRefining] = useState(false);
  /** Cache-busting stamps per draft — a refined draft keeps its id and URL, so
   *  the browser needs a nudge to re-fetch the redrawn art. */
  const [draftVersion, setDraftVersion] = useState<Record<string, number>>({});
  const draftSrc = useCallback(
    (draft: Draft) => {
      const v = draftVersion[draft.id];
      return v ? `${draft.url}&v=${v}` : draft.url;
    },
    [draftVersion],
  );

  // The banner takes over the moment the server confirms the job exists.
  useEffect(() => {
    if (jobActive) setStarting(false);
  }, [jobActive]);

  useEffect(() => {
    rpc
      .call("listDrafts")
      .then((r) => {
        setDrafts(r.drafts);
        if (r.drafts.length > 0) setPhase("picking");
      })
      .catch(() => {});
  }, [rpc]);

  useRealtime("pets", (payload) => {
    const signal = payload as {
      kind?: string;
      phase?: string;
      done?: number;
      total?: number;
      label?: string;
      drafts?: Draft[];
      message?: string;
      petId?: string;
      draftId?: string;
    };
    switch (signal.kind) {
      case "draft-changed":
        if (signal.draftId) {
          const id = signal.draftId;
          setDraftVersion((prev) => ({ ...prev, [id]: Date.now() }));
        }
        break;
      case "drafts-ready":
        setDrafts((prev) => [...(signal.drafts ?? []), ...prev].slice(0, 12));
        setPhase("picking");
        setStarting(false);
        break;
      case "hatched":
        setPhase("idle");
        setStarting(false);
        setPicked(null);
        setDrafts([]);
        toast.success("Hatched! Your new companion is live.");
        navigate.toPluginPanel("pets", { subPath: "" });
        break;
      case "gen-error":
        setPhase(drafts.length > 0 ? "picking" : "idle");
        setStarting(false);
        toast.error(signal.message ?? "Generation failed.");
        break;
      default:
        break;
    }
  });

  const busy = jobActive || phase === "drafting" || phase === "hatching";

  /** Redraw the picked draft in place with a plain-language tweak — same id,
   *  same slot, new art. The v-bump is optimistic; the "draft-changed" signal
   *  bumps it again if the server finishes after we've stopped waiting. */
  const refine = () => {
    const draftId = picked?.id;
    const text = instruction.trim();
    if (!draftId || text.length === 0 || refining) return;
    setRefining(true);
    void rpc
      .call("refineDraft", { draftId, instruction: text })
      .then((r) => {
        setInstruction("");
        setDraftVersion((prev) => ({ ...prev, [r.draftId]: Date.now() }));
      })
      .catch((error: Error) => toast.error(error.message))
      .finally(() => setRefining(false));
  };

  return (
    <div className="space-y-4">
      <EngineRecipe hasApiKey={hasApiKey} hasRdKey={hasRdKey} engine={engine} pack={pack} />
      {!hasApiKey ? (
        <Alert>
          <AlertTitle>Hatching is paused until the OpenAI key is set</AlertTitle>
          <AlertDescription>
            Everything else about your pet works without it — hatching new creatures is the one
            thing that needs it (~$2 and ~3 minutes per pet).
          </AlertDescription>
        </Alert>
      ) : null}
      {hasApiKey && phase === "idle" && drafts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6">
          <motion.svg
            width="72"
            height="88"
            viewBox="0 0 72 88"
            animate={{ rotate: [0, -4, 0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", repeatDelay: 1.4 }}
            style={{ originX: "50%", originY: "85%" }}
          >
            <ellipse cx="36" cy="48" rx="28" ry="38" className="fill-muted stroke-border" strokeWidth="2" />
            <path
              d="M14 42 L22 50 L30 40 L38 52 L46 41 L54 50 L58 44"
              className="stroke-muted-foreground/40"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
          <p className="text-sm text-muted-foreground">Something is in there. Describe it.</p>
        </div>
      ) : null}
      <Card>
        <CardContent className="space-y-3 p-4">
          <p className="text-sm font-medium">Describe a creature</p>
          <Textarea
            value={description}
            disabled={busy || !hasApiKey}
            placeholder="a grumpy axolotl astronaut with a tiny fishbowl helmet…"
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
          />
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={busy || !hasApiKey}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setDescription(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              disabled={busy || !hasApiKey || description.trim().length < 3}
              onClick={() => {
                setPhase("drafting");
                setStarting(true);
                void rpc
                  .call("hatchDrafts", { description: description.trim() })
                  .catch((error: Error) => {
                    setPhase("idle");
                    setStarting(false);
                    toast.error(error.message);
                  });
              }}
            >
              Generate drafts
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={busy || !hasApiKey}
              onClick={() =>
                setDescription(SURPRISE_POOL[Math.floor(Math.random() * SURPRISE_POOL.length)]!)
              }
            >
              🎲 Surprise me
            </Button>
            <span className="text-xs text-muted-foreground">4 candidates, ~30s</span>
          </div>
          {starting && !jobActive ? <StartingRow /> : null}
        </CardContent>
      </Card>

      {drafts.length > 0 && phase !== "hatching" ? (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium">
              Pick a candidate <span className="text-muted-foreground">· {drafts.length}</span>
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              disabled={busy}
              onClick={() => {
                setPicked(null);
                void rpc
                  .call("clearDrafts")
                  .then(() => {
                    setDrafts([]);
                    setPhase("idle");
                  })
                  .catch(() => {});
              }}
            >
              Clear all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {drafts.map((draft, index) => (
              <motion.button
                key={draft.id}
                type="button"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 26, delay: index * 0.05 }}
                aria-pressed={picked?.id === draft.id}
                className={`relative rounded-lg border p-2 ${picked?.id === draft.id ? "border-primary ring-1 ring-primary" : "border-border"}`}
                onClick={() => setPicked(draft)}
              >
                {picked?.id === draft.id ? (
                  <Badge variant="secondary" className="absolute right-1 top-1 z-10">
                    ✓ Picked
                  </Badge>
                ) : null}
                <img
                  src={draftSrc(draft)}
                  alt={draft.description}
                  className="aspect-square w-full rounded"
                  style={{ imageRendering: "pixelated" }}
                />
                <span className="mt-1 block truncate text-[10px] text-muted-foreground">
                  {draft.description}
                </span>
              </motion.button>
            ))}
          </div>
          {picked ? (
            <div className="flex items-center gap-2">
              <Input
                value={instruction}
                disabled={refining || busy}
                placeholder="refine it: 'rounder', 'make it teal', 'bigger eyes'…"
                className="h-8 flex-1"
                onChange={(event) => setInstruction(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && instruction.trim() && !refining) {
                    (event.target as HTMLElement).blur();
                    refine();
                  }
                }}
              />
              <Button
                size="sm"
                variant="outline"
                disabled={refining || busy || instruction.trim().length === 0}
                onClick={refine}
              >
                {refining ? "Refining…" : "Refine"}
              </Button>
            </div>
          ) : null}
          {picked ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Card className="border-primary/40">
                <CardContent className="flex items-center gap-4 p-4">
                  <img
                    src={draftSrc(picked)}
                    alt={picked.description}
                    className="h-16 w-16 rounded-lg border border-border"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className="truncate text-xs italic text-muted-foreground">
                      {picked.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        value={name}
                        placeholder="Name it…"
                        className="h-8 max-w-44"
                        onChange={(event) => setName(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && name.trim()) {
                            (event.target as HTMLElement).blur();
                          }
                        }}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground"
                            onClick={() =>
                              setName(NAME_POOL[Math.floor(Math.random() * NAME_POOL.length)]!)
                            }
                          >
                            🎲
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Random name</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Button
                      disabled={name.trim().length === 0}
                      onClick={() => {
                        setPhase("hatching");
                        setStarting(true);
                        void rpc
                          .call("hatchCommit", {
                            draftId: picked.id,
                            name: name.trim(),
                            description: picked.description,
                          })
                          .catch((error: Error) => {
                            setPhase("picking");
                            setStarting(false);
                            toast.error(error.message);
                          });
                      }}
                    >
                      Hatch {name.trim() || "it"} 🥚
                    </Button>
                    {starting && !jobActive ? <StartingRow /> : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Click a candidate to pick it — hatching animates your whole pack (~3 min, ~$2).
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

type DebugEntry = { t: number; kind: string; detail: string };
type DebugState = { state: string; elev: number; x: number; act: string | null; fps: number };

const DEV_FEED_MAX = 40;

const clockTime = (t: number) =>
  new Date(t).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const devLine = (entry: DebugEntry) => `${clockTime(entry.t)} [${entry.kind}] ${entry.detail}`;

/** The setting-gated developer feed — the overlay narrates its own state and
 *  every notable event here, so a bug report is one screenshot instead of a
 *  headless excavation through the render loop. */
function DevCard() {
  const [entries, setEntries] = useState<DebugEntry[]>([]);
  const [state, setState] = useState<DebugState | null>(null);

  useEffect(() => {
    const onEntry = (event: Event) => {
      const entry = (event as CustomEvent<{ entry?: DebugEntry }>).detail?.entry;
      if (!entry) return;
      setEntries((prev) => [entry, ...prev].slice(0, DEV_FEED_MAX));
    };
    const onState = (event: Event) => {
      const detail = (event as CustomEvent<DebugState | undefined>).detail;
      if (detail) setState(detail);
    };
    window.addEventListener("pets:debug", onEntry);
    window.addEventListener("pets:debug-state", onState);
    return () => {
      window.removeEventListener("pets:debug", onEntry);
      window.removeEventListener("pets:debug-state", onState);
    };
  }, []);

  const copyLog = () => {
    void navigator.clipboard
      .writeText(entries.map(devLine).join("\n"))
      .then(() => toast.success("Copied"))
      .catch((e: Error) => toast.error(e.message));
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Developer</p>
          <Button size="sm" variant="ghost" className="text-xs" onClick={copyLog}>
            Copy log
          </Button>
        </div>
        <p className="font-mono text-xs">
          {state
            ? `${state.state} · elev ${Math.round(state.elev)}px · x ${Math.round(state.x)} · act ${state.act ?? "—"} · ${Math.round(state.fps)} fps`
            : "waiting for overlay…"}
        </p>
        <div className="max-h-48 space-y-0.5 overflow-y-auto">
          {entries.map((entry, index) => (
            <p key={`${entry.t}-${index}`} className="font-mono text-[11px] text-muted-foreground">
              {devLine(entry)}
            </p>
          ))}
          {entries.length === 0 ? (
            <p className="font-mono text-[11px] text-muted-foreground">No events yet.</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

type DiaryEntry = RpcOutput<"getDiary">["entries"][number];
type Treats = RpcOutput<"getTreats">;

const DIARY_DAY = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
const DIARY_TIME = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Group an already-newest-first list into day buckets, preserving order. */
function groupByDay(entries: DiaryEntry[]): { day: string; entries: DiaryEntry[] }[] {
  const days: { day: string; entries: DiaryEntry[] }[] = [];
  for (const entry of entries) {
    const day = DIARY_DAY.format(entry.ts);
    const last = days[days.length - 1];
    if (last && last.day === day) last.entries.push(entry);
    else days.push({ day, entries: [entry] });
  }
  return days;
}

/** The pet's journal — what it thought was worth writing down, newest first. */
function DiaryCard({ entries }: { entries: DiaryEntry[] | null }) {
  const days = entries ? groupByDay(entries) : [];
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <p className="text-sm font-medium">Diary</p>
        {entries === null ? (
          <Skeleton className="h-16 w-full" />
        ) : days.length === 0 ? (
          <p className="text-xs text-muted-foreground">Nothing written yet. Give it a day.</p>
        ) : (
          days.map((day) => (
            <div key={day.day} className="space-y-1">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{day.day}</p>
              {day.entries.map((entry) => (
                <div key={entry.id} className="flex items-baseline gap-2">
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                    {DIARY_TIME.format(entry.ts)}
                  </span>
                  <span className="min-w-0 flex-1 text-xs">{entry.text}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function StatsTab() {
  const rpc = useRpc<typeof rpcContract>();
  const [stats, setStats] = useState<Stats | null>(null);
  const [diary, setDiary] = useState<DiaryEntry[] | null>(null);
  const [treats, setTreats] = useState<Treats | null>(null);
  const load = useCallback(() => {
    rpc.call("getStats").then(setStats).catch(() => {});
  }, [rpc]);
  const loadDiary = useCallback(() => {
    rpc.call("getDiary", { limit: 60 }).then((r) => setDiary(r.entries)).catch(() => {});
  }, [rpc]);
  const loadTreats = useCallback(() => {
    rpc.call("getTreats").then(setTreats).catch(() => {});
  }, [rpc]);
  useEffect(load, [load]);
  useEffect(loadDiary, [loadDiary]);
  useEffect(loadTreats, [loadTreats]);
  // One subscription, all three surfaces: XP ticks refresh the totals and the
  // treat ledger (treats are earned off completed turns), anything that changes
  // the pet itself may have written a new diary line.
  useRealtime("pets", (payload) => {
    const kind = (payload as { kind?: string } | null)?.kind;
    if (kind === "xp") {
      load();
      loadTreats();
    }
    if (kind === "pet-changed") loadDiary();
  });

  if (!stats) {
    return <Skeleton className="h-40 w-full" />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-medium">
            Lifetime: <NumberFlow value={stats.totalXp} /> XP
          </p>
          <div className="space-y-1">
            {Object.entries(stats.totals).map(([source, entry]) => (
              <div key={source} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{SOURCE_LABELS[source] ?? source}</span>
                <span className="tabular-nums">
                  {entry.count}× · {entry.xp} XP
                </span>
              </div>
            ))}
          </div>
          {treats ? (
            <p className="border-t pt-2 text-xs text-muted-foreground">
              🍪 {treats.eaten} treats eaten · {treats.balance} in the jar
            </p>
          ) : (
            <Skeleton className="mt-2 h-4 w-48" />
          )}
        </CardContent>
      </Card>

      <div>
        <p className="mb-2 text-sm font-medium">
          Achievements{" "}
          <span className="text-muted-foreground">
            · {stats.achievements.filter((a) => a.earned).length}/{stats.achievements.length}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stats.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={achievement.earned ? { y: -2 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 26, delay: index * 0.04 }}
            >
              <Card className={achievement.earned ? "border-amber-500/25" : "opacity-45"}>
                <CardContent className="p-3">
                  <p className="text-sm font-medium">
                    {achievement.earned ? (
                      <motion.span
                        className="inline-block text-amber-400"
                        initial={{ scale: 0.4, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.2 + index * 0.05 }}
                      >
                        ★
                      </motion.span>
                    ) : (
                      "☆"
                    )}{" "}
                    {achievement.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <DiaryCard entries={diary} />

      <div>
        <p className="mb-2 text-sm font-medium">Recent</p>
        <div className="space-y-1">
          {stats.recent.map((event, index) => (
            <div key={`${event.createdAt}-${index}`} className="flex justify-between text-xs text-muted-foreground">
              <span>
                +{event.amount} · {SOURCE_LABELS[event.source] ?? event.source}
              </span>
              <span>{timeAgo(event.createdAt)}</span>
            </div>
          ))}
          {stats.recent.length === 0 ? (
            <p className="text-xs text-muted-foreground">Nothing yet. Go finish a turn.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type OverlaySettings = RpcOutput<"getOverlay">["settings"];
type BehaviorKey =
  | "roaming"
  | "sounds"
  | "pointing"
  | "xpMotes"
  | "reactTurnComplete"
  | "reactFailures"
  | "digWhileGenerating"
  | "idleQuirks"
  | "typingGlance"
  | "evolutionCeremony"
  | "attentionPip"
  | "showEmotions"
  | "seasonalFlair"
  | "personalityFunny"
  | "personalityChaotic"
  | "personalitySarcastic"
  | "personalityHelpful"
  | "personalityCozy"
  | "highContrast"
  | "devMode";

const BEHAVIOR_TOGGLES: { key: BehaviorKey; label: string; hint: string }[] = [
  { key: "roaming", label: "Roaming", hint: "Wander when idle" },
  { key: "pointing", label: "Pointing missions", hint: "Walk to threads that need you" },
  { key: "attentionPip", label: "Waiting pip", hint: "Count badge when threads wait" },
  { key: "reactTurnComplete", label: "Celebrations", hint: "Cheer finished turns" },
  { key: "reactFailures", label: "Failure reactions", hint: "Startle, sulk, get grumpy" },
  { key: "digWhileGenerating", label: "Dig during generation", hint: "Work while artwork renders" },
  { key: "idleQuirks", label: "Idle quirks", hint: "Waves and look-arounds" },
  { key: "typingGlance", label: "Typing glance", hint: "Look up when you type" },
  { key: "evolutionCeremony", label: "Evolution ceremony", hint: "Dance and fanfare on stage-up" },
  { key: "xpMotes", label: "XP motes", hint: "Floating +XP numbers" },
  { key: "showEmotions", label: "Emotion indicator", hint: "Name the feeling above the pet" },
  { key: "sounds", label: "Sounds", hint: "Synth chirps and boings" },
  { key: "seasonalFlair", label: "Seasonal flair", hint: "A tiny festive accessory in festive months" },
  { key: "highContrast", label: "High-contrast accents", hint: "Thicker ring, stronger badge" },
  { key: "devMode", label: "Developer panel", hint: "Live state feed on Stats" },
];

/** The pet's personality switches — the same values the plugin settings page
 *  carries, surfaced next to the creature they actually affect. */
function BehaviorsCard({
  settings,
  onToggle,
}: {
  settings: OverlaySettings | null;
  onToggle: (key: BehaviorKey, value: boolean) => void;
}) {
  if (!settings) return null;
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <p className="text-sm font-medium">Behaviors</p>
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {BEHAVIOR_TOGGLES.map((toggle) => (
            <div key={toggle.key} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm">{toggle.label}</p>
                <p className="text-xs text-muted-foreground">{toggle.hint}</p>
              </div>
              <Switch
                checked={Boolean(settings[toggle.key] ?? true)}
                onCheckedChange={(value) => onToggle(toggle.key, value)}
                aria-label={toggle.label}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const PERSONALITY_TOGGLES: { key: BehaviorKey; label: string; hint: string }[] = [
  { key: "personalityFunny", label: "Funny", hint: "One-liners and dance breaks" },
  { key: "personalityChaotic", label: "Chaotic", hint: "Zoomies, cursor chasing, peek-a-boo" },
  {
    key: "personalitySarcastic",
    label: "Sarcastic",
    hint: "Dry takes on failures and marathon turns",
  },
  { key: "personalityHelpful", label: "Helpful", hint: "Waiting-thread nudges and bb tips" },
  { key: "personalityCozy", label: "Cozy", hint: "Wandering, sitting nearby, idle naps" },
];

const ACTIVITY_LEVELS = ["calm", "normal", "lively", "unhinged"] as const;
type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];

const SOUND_VOLUMES = ["quiet", "normal"] as const;
type SoundVolume = (typeof SOUND_VOLUMES)[number];

/** Who the pet IS, as opposed to what it does — five independent traits plus
 *  the dial that decides how often any of them gets to speak up. */
function PersonalityCard({
  settings,
  onToggle,
}: {
  settings: OverlaySettings | null;
  onToggle: (key: BehaviorKey, value: boolean) => void;
}) {
  const rpc = useRpc<typeof rpcContract>();
  /** Optimistic override — null means "whatever the server last told us". */
  const [pendingLevel, setPendingLevel] = useState<ActivityLevel | null>(null);
  const [pendingVolume, setPendingVolume] = useState<SoundVolume | null>(null);
  if (!settings) return null;
  const level: ActivityLevel = pendingLevel ?? settings.activityLevel ?? "lively";
  const setLevel = (next: ActivityLevel) => {
    setPendingLevel(next);
    void rpc
      .call("setActivityLevel", { level: next })
      .catch((e: Error) => toast.error(e.message));
  };
  const volume: SoundVolume = pendingVolume ?? settings.soundVolume ?? "normal";
  const setVolume = (next: SoundVolume) => {
    setPendingVolume(next);
    void rpc.call("setSoundVolume", { level: next }).catch((e: Error) => toast.error(e.message));
  };
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div>
          <p className="text-sm font-medium">Personality</p>
          <p className="text-xs text-muted-foreground">How your pet behaves when left alone.</p>
        </div>
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {PERSONALITY_TOGGLES.map((toggle) => (
            <div key={toggle.key} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm">{toggle.label}</p>
                <p className="text-xs text-muted-foreground">{toggle.hint}</p>
              </div>
              <Switch
                checked={Boolean(settings[toggle.key] ?? true)}
                onCheckedChange={(value) => onToggle(toggle.key, value)}
                aria-label={toggle.label}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="min-w-0">
            <p className="text-sm">Activity level</p>
            <p className="text-xs text-muted-foreground">How often it acts on its own</p>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
            {ACTIVITY_LEVELS.map((option) => (
              <Button
                key={option}
                size="sm"
                variant={option === level ? "secondary" : "ghost"}
                className="text-xs capitalize"
                onClick={() => setLevel(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="min-w-0">
            <p className="text-sm">Sound volume</p>
            <p className="text-xs text-muted-foreground">How loud its chirps and steps are</p>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
            {SOUND_VOLUMES.map((option) => (
              <Button
                key={option}
                size="sm"
                variant={option === volume ? "secondary" : "ghost"}
                className="text-xs capitalize"
                onClick={() => setVolume(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Re-runs the onboarding tour. The tour itself renders on the overlay, which
 * may be sitting on another route's floor entirely — so the toast points the
 * user at the pet rather than pretending anything happened in the panel.
 */
function TourButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pets:start-tour"));
            toast.success("Tour started — look at your pet.");
          }}
        >
          Take the tour
        </Button>
      </TooltipTrigger>
      <TooltipContent>A 60-second walkthrough of everything</TooltipContent>
    </Tooltip>
  );
}

export function PetsPanel({ subPath }: PluginNavPanelProps) {
  const rpc = useRpc<typeof rpcContract>();
  const navigate = useBbNavigate();
  const [hasApiKey, setHasApiKey] = useState(false);
  const [hasRdKey, setHasRdKey] = useState(false);
  const [engine, setEngine] = useState("openai");
  const [pack, setPack] = useState("expanded");
  const [settings, setSettings] = useState<OverlaySettings | null>(null);
  const [job, setJob] = useState<Job>(null);
  const [lastError, setLastError] = useState<JobError>(null);
  const [errorDismissedAt, setErrorDismissedAt] = useState(0);
  const tab = subPath.split("/")[0] || "habitat";

  useEffect(() => {
    rpc
      .call("getOverlay")
      .then((r) => {
        setHasApiKey(r.hasApiKey);
        setHasRdKey(r.hasRdKey);
        setEngine(r.engine);
        setPack(r.pack);
        setSettings(r.settings);
      })
      .catch(() => {});
    rpc
      .call("getJobStatus")
      .then((r) => {
        setJob(r.job);
        setLastError(r.lastError);
      })
      .catch(() => {});
  }, [rpc]);

  useRealtime("pets", (payload) => {
    const signal = payload as {
      kind?: string;
      job?: Job;
      phase?: string;
      subject?: string;
      message?: string;
      skipped?: { state: string; reason: string }[];
    } | null;
    if (signal?.kind === "job") setJob(signal.job ?? null);
    else if (signal?.kind === "gen-error")
      setLastError({
        phase: signal.phase ?? "",
        subject: signal.subject ?? "",
        message: signal.message ?? "Generation failed.",
        at: Date.now(),
      });
    else if (signal?.kind === "gen-warning" && Array.isArray(signal.skipped))
      toast.warning(
        `Skipped ${signal.skipped.map((s) => s.state).join(", ")} — fallbacks cover them; Re-animate to retry.`,
      );
    else if (signal?.kind === "settings-changed") {
      rpc
        .call("getOverlay")
        .then((r) => {
          setHasApiKey(r.hasApiKey);
          setHasRdKey(r.hasRdKey);
          setEngine(r.engine);
          setPack(r.pack);
          setSettings(r.settings);
        })
        .catch(() => {});
    }
  });

  const toggleBehavior = useCallback(
    (key: BehaviorKey, value: boolean) => {
      setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
      void rpc.call("setBehavior", { key, value }).catch(() => {});
    },
    [rpc],
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-full overflow-y-auto p-4 md:p-5">
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <JobBanner
            job={job}
            lastError={lastError && lastError.at > errorDismissedAt ? lastError : null}
            onDismissError={() => setErrorDismissedAt(Date.now())}
          />
          <Tabs
            value={tab}
            onValueChange={(next) =>
              navigate.toPluginPanel("pets", { subPath: next === "habitat" ? "" : next })
            }
          >
            <TabsList>
              <TabsTrigger value="habitat">Habitat</TabsTrigger>
              <TabsTrigger value="den">Den</TabsTrigger>
              <TabsTrigger value="hatchery">Hatchery</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="habitat" className="mt-4">
              <div className="space-y-4">
                <Habitat />
                <div className="-mt-2 flex justify-end">
                  <TourButton />
                </div>
                <BehaviorsCard settings={settings} onToggle={toggleBehavior} />
                <PersonalityCard settings={settings} onToggle={toggleBehavior} />
              </div>
            </TabsContent>
            <TabsContent value="den" className="mt-4">
              <DenTab hasApiKey={hasApiKey} jobActive={job !== null} />
            </TabsContent>
            <TabsContent value="hatchery" className="mt-4">
              <HatcheryTab
                hasApiKey={hasApiKey}
                hasRdKey={hasRdKey}
                engine={engine}
                pack={pack}
                jobActive={job !== null}
              />
            </TabsContent>
            <TabsContent value="stats" className="mt-4">
              <div className="space-y-4">
                {settings && Boolean(settings.devMode) ? <DevCard /> : null}
                <StatsTab />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}
