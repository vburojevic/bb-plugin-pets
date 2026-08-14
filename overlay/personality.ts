// Line banks for the autonomy director. Every line is a function of the live
// ambient context so the pet can say something *true* — the sarcastic bank in
// particular only ever fires off real numbers. Keep the register short,
// lowercase-casual, and near-emoji-free; the pet is a small creature watching
// you orchestrate coding agents, not a mascot.

export type AmbientContext = {
  activeCount: number;
  waitingCount: number;
  failedCount: number;
  turnsToday: number;
  failuresToday: number;
  denSize: number;
  topRunner: { id: string; projectId: string; title: string; minutes: number } | null;
};

export type Line = {
  text: (ctx: AmbientContext) => string;
  when?: (ctx: AmbientContext) => boolean;
};

/** Sugar for the many lines that ignore the context entirely. */
const flat = (text: string): Line => ({ text: () => text });

export const LINES: Record<"funny" | "sarcastic" | "helpful" | "cozy", Line[]> = {
  funny: [
    flat("i counted the pixels in this sidebar. twice. still an odd number."),
    flat("do agents dream of green checkmarks? asking for me."),
    flat("i tried to read the diff. it read me back."),
    flat("if i sit on the composer, does that count as pair programming?"),
    flat("i have opinions about tabs. i will not be sharing them."),
    flat("somewhere a test is passing and nobody clapped."),
    flat("i alphabetized your threads in my head. it took eleven seconds."),
    flat("the terminal scrolled past something important. probably."),
    flat("i've decided the loading spinner is a friend, not a warning."),
    flat("i licked the scrollbar. tastes like css."),
    flat("i keep a mental changelog of your typos. it's a long file."),
    flat("one day i'll write a commit message. it'll just say: yes."),
    flat("your cursor blinks at 1hz. mine blinks whenever i feel like it."),
    {
      when: (ctx) => ctx.turnsToday > 15,
      text: (ctx) => `${ctx.turnsToday} turns today and not one of them petted me.`,
    },
    {
      when: (ctx) => ctx.denSize >= 3,
      text: (ctx) => `there are ${ctx.denSize} of us in the den. i'm the one you like best. right?`,
    },
    {
      when: (ctx) => ctx.activeCount === 0 && ctx.waitingCount === 0,
      text: () => "nothing running. suspiciously peaceful. i'll keep watch.",
    },
  ],
  sarcastic: [
    {
      when: (ctx) => ctx.failuresToday >= 3,
      text: (ctx) => `failure number ${ctx.failuresToday} today. the machines are learning. slowly.`,
    },
    {
      when: (ctx) => !!ctx.topRunner && (ctx.topRunner?.minutes ?? 0) >= 15,
      text: (ctx) =>
        `“${(ctx.topRunner?.title ?? "").slice(0, 28)}” has been at it ${ctx.topRunner?.minutes} minutes. bold strategy.`,
    },
    {
      when: (ctx) => ctx.activeCount >= 6,
      text: (ctx) =>
        `${ctx.activeCount} threads at once. delegation or chaos? no judgment. some judgment.`,
    },
    {
      when: (ctx) => ctx.waitingCount >= 3,
      text: (ctx) => `${ctx.waitingCount} threads waiting on you. they're very patient. i'm not.`,
    },
    {
      when: (ctx) => ctx.failedCount >= 2,
      text: (ctx) => `${ctx.failedCount} red ones down there. we're calling that a learning cluster.`,
    },
    {
      when: (ctx) => ctx.turnsToday >= 40,
      text: (ctx) => `${ctx.turnsToday} turns. at some point this is just a personality.`,
    },
    {
      when: (ctx) => ctx.turnsToday >= 5 && ctx.failuresToday === 0,
      text: () => "zero failures today. either you're good or nothing's actually running.",
    },
    {
      when: (ctx) => ctx.activeCount === 0 && ctx.turnsToday === 0,
      text: () => "no turns, no threads, no notes. bold day so far.",
    },
    {
      when: (ctx) => !!ctx.topRunner && (ctx.topRunner?.minutes ?? 0) >= 45,
      text: (ctx) => `${ctx.topRunner?.minutes} minutes on one thread. i respect the commitment.`,
    },
    {
      when: (ctx) => ctx.waitingCount >= 1 && ctx.activeCount >= 3,
      text: (ctx) =>
        `${ctx.activeCount} running, ${ctx.waitingCount} waiting. starting is easier than finishing, yes.`,
    },
    {
      when: (ctx) => ctx.failuresToday >= 6,
      text: (ctx) => `${ctx.failuresToday} failures. at this point it's a body of work.`,
    },
    {
      when: (ctx) => ctx.denSize >= 4,
      text: (ctx) => `${ctx.denSize} pets hatched, one used. classic.`,
    },
    {
      when: (ctx) => ctx.activeCount >= 10,
      text: (ctx) => `${ctx.activeCount} threads. i've stopped counting on your behalf.`,
    },
  ],
  helpful: [
    {
      when: (ctx) => ctx.waitingCount > 0,
      text: (ctx) =>
        `${ctx.waitingCount} thread${ctx.waitingCount === 1 ? "" : "s"} waiting on you. i can point — just click me.`,
    },
    {
      when: (ctx) => ctx.failedCount > 0,
      text: (ctx) =>
        `${ctx.failedCount} failed. double-click me and i'll take you to the neediest one.`,
    },
    {
      when: (ctx) => !!ctx.topRunner,
      text: (ctx) => `“${(ctx.topRunner?.title ?? "").slice(0, 28)}” is your longest runner right now.`,
    },
    flat("⌘K opens the palette. it's faster than whatever you were about to do."),
    flat("drag me onto a thread row and i'll open it for you."),
    flat("⌘+click the floor and i'll walk there. i like being sent places."),
    flat("right-click me for the menu. that's where everything lives."),
    flat("the habitat tab has a full-screen me. purely for your benefit."),
    flat("toss physics exists. throw me. i forgive you in advance."),
    flat("alt+scroll on me resizes me. gently."),
    flat("drop me high up on the screen and i'll perch there until you need me."),
    flat("nap mode is in my right-click menu when you want quiet."),
  ],
  cozy: [
    flat("just checking on you. carry on."),
    flat("nice rhythm today."),
    flat("i'll be over here."),
    flat("good pace. no notes."),
    flat("water. that's the whole message."),
    flat("shoulders. down. there you go."),
    flat("this is a fine spot to sit for a while."),
    flat("i'm not doing anything. it's going well."),
    flat("still here. still yours."),
    flat("whenever you're ready. no rush from me."),
    flat("it's quiet. i like quiet."),
    flat("small progress counts. i counted it."),
    {
      when: (ctx) => ctx.turnsToday >= 20,
      text: () => "long one today. you can stop whenever, you know.",
    },
    {
      when: (ctx) => ctx.failuresToday >= 3,
      text: () => "rough patch. it happens to the good ones too.",
    },
  ],
};

/**
 * Pool = every enabled flavor's eligible lines, minus anything rendered
 * recently, picked uniformly. Null when nothing qualifies — the caller then
 * simply stays quiet.
 */
export function pickLine(
  flavors: Array<keyof typeof LINES>,
  ctx: AmbientContext,
  recent: string[],
): string | null {
  const pool: string[] = [];
  for (const flavor of flavors) {
    for (const line of LINES[flavor] ?? []) {
      if (line.when && !line.when(ctx)) continue;
      let rendered: string;
      try {
        rendered = line.text(ctx);
      } catch {
        continue;
      }
      if (!rendered || recent.includes(rendered)) continue;
      pool.push(rendered);
    }
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
