// Tiny WebAudio synth — no assets, a few square/sine blips with soft
// envelopes. Everything routes through one lazily-created context that only
// exists after a user gesture (autoplay policy) and one master gain.
//
// --- loudness tiers ----------------------------------------------------------
// Peaks below are pre-volumeFactor; every gain value is multiplied by
// volumeFactor exactly once (never twice, never skipped) on its way to master.
// New sounds must slot into one of these tiers rather than picking a fresh peak:
//
//   notification-grade  peak <= 0.22  alert, evolve, hatch
//                       things the user must not miss; loudest tier.
//   interaction-grade   peak <= 0.16  pet, boing, greet
//                       direct responses to a user action; clearly audible but
//                       under the notification tier.
//   ambient-grade       peak <= 0.12  womp
//                       mood/flavour the user can ignore.
//   footstep-grade      peak <= 0.05  step
//                       floor texture, deliberately below conversation level,
//                       and trimmed a further x0.6 at the "quiet" volume so it
//                       reads as barely-there rather than merely soft.
//
// Within a tier the *relative* balance of a sound's own notes is preserved —
// only the absolute ceiling moved.

let context: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;

// --- per-pet voice -----------------------------------------------------------
// One seed (hashed from the pet id) picks a stable pitch offset and a timbre
// family, so two pets on the same machine never sound identical but a given
// pet always sounds like itself.
let pitchFactor = 1;
let timbre = 0;

export function setVoiceSeed(seed: number): void {
  const s = Math.abs(Math.floor(seed));
  pitchFactor = 0.85 + ((s % 1000) / 1000) * 0.5; // 0.85 – 1.35
  timbre = s % 3;
}

/** Timbre family applied at oscillator creation, never at the call sites. */
function voiceType(type: OscillatorType): OscillatorType {
  if (timbre === 1) return type === "sine" ? "triangle" : type;
  if (timbre === 2) return type === "sawtooth" || type === "sine" ? "square" : type;
  return type;
}

// --- master volume -----------------------------------------------------------
// A single multiplier folded into every gain value (tones AND footsteps), so
// "quiet" scales the whole voice rather than muting parts of it.
let volumeFactor = 1;

// Footsteps get an extra trim on top of volumeFactor at the quiet level: a
// footfall is texture, and at "quiet" it should sit under everything else
// rather than scale with it. Applied only in step(), only once.
let footstepTrim = 1;

export function setSoundVolume(level: "quiet" | "normal"): void {
  const quiet = level === "quiet";
  volumeFactor = quiet ? 0.45 : 1;
  footstepTrim = quiet ? 0.6 : 1;
}

export function setSoundsEnabled(next: boolean): void {
  enabled = next;
}

/** Call from any user-gesture handler; safe to call repeatedly. */
export function unlockSounds(): void {
  if (context) {
    if (context.state === "suspended") void context.resume();
    return;
  }
  try {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = 0.14;
    master.connect(context.destination);
  } catch {
    context = null;
  }
}

function tone(
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType = "square",
  // Defaults to the interaction-grade ceiling; louder callers opt in explicitly
  // so no sound can drift above its tier by simply omitting the argument.
  peak = 0.16,
): void {
  if (!context || !master) return;
  const osc = context.createOscillator();
  const gain = context.createGain();
  const t0 = context.currentTime + start;
  osc.type = voiceType(type);
  osc.frequency.value = frequency * pitchFactor;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peak * volumeFactor, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

// One short white-noise buffer, reused for every footstep. Rebuilt only if the
// context is recreated at a different sample rate.
let noiseBuffer: AudioBuffer | null = null;

function stepNoise(): AudioBufferSourceNode | null {
  if (!context) return null;
  if (!noiseBuffer || noiseBuffer.sampleRate !== context.sampleRate) {
    const frames = Math.max(1, Math.floor(context.sampleRate * 0.03));
    const buffer = context.createBuffer(1, frames, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) channel[i] = Math.random() * 2 - 1;
    noiseBuffer = buffer;
  }
  const source = context.createBufferSource();
  source.buffer = noiseBuffer;
  return source;
}

const play = (fn: () => void) => {
  if (!enabled || !context) return;
  fn();
};

export const sounds = {
  // interaction-grade (<= 0.16)
  greet: () =>
    play(() => {
      tone(523, 0, 0.09, "square", 0.16);
      tone(784, 0.09, 0.14, "square", 0.16);
    }),
  // interaction-grade (<= 0.16), second note kept below the first as before
  pet: () =>
    play(() => {
      tone(880, 0, 0.05, "sine", 0.16);
      tone(1175, 0.05, 0.08, "sine", 0.12);
    }),
  // notification-grade (<= 0.22)
  alert: () =>
    play(() => {
      tone(660, 0, 0.07, "square", 0.22);
      tone(660, 0.12, 0.07, "square", 0.22);
    }),
  // ambient-grade (<= 0.12)
  womp: () =>
    play(() => {
      tone(196, 0, 0.16, "sawtooth", 0.12);
      tone(147, 0.14, 0.22, "sawtooth", 0.12);
    }),
  // notification-grade (<= 0.22), tail note kept under the arpeggio as before
  evolve: () =>
    play(() => {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.12, "square", 0.22));
      tone(1319, 0.36, 0.3, "triangle", 0.18);
    }),
  // notification-grade (<= 0.22), tail note kept under the rise as before
  hatch: () =>
    play(() => {
      tone(392, 0, 0.08, "square", 0.22);
      tone(523, 0.08, 0.08, "square", 0.22);
      tone(659, 0.16, 0.18, "triangle", 0.2);
    }),
  // interaction-grade (<= 0.16), low bounce kept under the attack as before
  boing: () =>
    play(() => {
      tone(340, 0, 0.05, "sine", 0.16);
      tone(180, 0.04, 0.1, "sine", 0.13);
    }),
  /** A footfall: footstep-grade (<= 0.05), the quietest tier, and trimmed a
   *  further x0.6 at the "quiet" volume level. The
   *  band is pitch-INVARIANT — a step is a floor sound, not a voice, so the
   *  per-pet pitch offset would only make it read as a different surface. */
  step: () =>
    play(() => {
      if (!context || !master) return;
      const source = stepNoise();
      if (!source) return;
      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1400;
      filter.Q.value = 0.9;
      const gain = context.createGain();
      const t0 = context.currentTime;
      const duration = 0.026;
      gain.gain.setValueAtTime(0.05 * volumeFactor * footstepTrim, t0);
      gain.gain.exponentialRampToValueAtTime(0.0005, t0 + duration);
      source.connect(filter).connect(gain).connect(master);
      source.start(t0);
      source.stop(t0 + duration);
    }),
};
