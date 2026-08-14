// Ambient line bank (overlay/personality.ts): pickLine gating, recency
// exclusion and flavor scoping.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LINES, pickLine, type AmbientContext } from "../overlay/personality.ts";

const QUIET: AmbientContext = {
  activeCount: 0,
  waitingCount: 0,
  failedCount: 0,
  turnsToday: 0,
  failuresToday: 0,
  denSize: 0,
  topRunner: null,
};

const ctx = (over: Partial<AmbientContext> = {}): AmbientContext => ({ ...QUIET, ...over });

/** Every line of a flavor that passes its `when` gate for this context. */
function eligible(flavor: keyof typeof LINES, c: AmbientContext): string[] {
  return LINES[flavor].filter((l) => !l.when || l.when(c)).map((l) => l.text(c));
}

function sample(
  flavors: Array<keyof typeof LINES>,
  c: AmbientContext,
  recent: string[] = [],
  n = 400,
): Set<string> {
  const seen = new Set<string>();
  for (let i = 0; i < n; i++) {
    const line = pickLine(flavors, c, recent);
    if (line !== null) seen.add(line);
  }
  return seen;
}

describe("pickLine — `when` gates", () => {
  it("on a quiet day the sarcastic bank offers only its zero-activity line", () => {
    const drawn = sample(["sarcastic"], QUIET);
    assert.deepEqual([...drawn], ["no turns, no threads, no notes. bold day so far."]);
  });

  it("omits number-driven sarcasm the context cannot back up", () => {
    const drawn = sample(["sarcastic"], QUIET);
    for (const line of drawn) {
      assert.ok(!/failure number/.test(line), `unqualified line drawn: ${line}`);
      assert.ok(!/threads at once/.test(line), `unqualified line drawn: ${line}`);
      assert.ok(!/waiting on you/.test(line), `unqualified line drawn: ${line}`);
    }
  });

  it("opens gated lines once the numbers qualify", () => {
    const rough = ctx({ failuresToday: 3, turnsToday: 12 });
    const drawn = sample(["sarcastic"], rough);
    assert.deepEqual([...drawn], [
      "failure number 3 today. the machines are learning. slowly.",
    ]);
  });

  it("renders live numbers into the chosen line", () => {
    const busy = ctx({ activeCount: 7, turnsToday: 3 });
    const drawn = sample(["sarcastic"], busy);
    assert.deepEqual([...drawn], [
      "7 threads at once. delegation or chaos? no judgment. some judgment.",
    ]);
  });

  it("pluralizes the helpful waiting line off the count", () => {
    assert.ok(
      eligible("helpful", ctx({ waitingCount: 1 })).includes(
        "1 thread waiting on you. i can point — just click me.",
      ),
    );
    assert.ok(
      eligible("helpful", ctx({ waitingCount: 4 })).includes(
        "4 threads waiting on you. i can point — just click me.",
      ),
    );
  });
});

describe("pickLine — recency", () => {
  it("never returns a line listed in `recent`", () => {
    const pool = eligible("cozy", QUIET);
    assert.ok(pool.length > 2, "cozy must have a pool to thin out");
    const banned = pool.slice(0, pool.length - 1);
    const drawn = sample(["cozy"], QUIET, banned);
    assert.deepEqual([...drawn], [pool[pool.length - 1]]);
  });

  it("returns null when every eligible line is recent", () => {
    assert.equal(pickLine(["cozy"], QUIET, eligible("cozy", QUIET)), null);
    assert.equal(
      pickLine(["sarcastic"], QUIET, ["no turns, no threads, no notes. bold day so far."]),
      null,
    );
  });

  it("returns null when no flavor is enabled", () => {
    assert.equal(pickLine([], QUIET, []), null);
  });

  it("ignores recent entries that aren't in the pool", () => {
    assert.notEqual(pickLine(["cozy"], QUIET, ["something the pet never said"]), null);
  });
});

describe("pickLine — flavor scoping", () => {
  it("only draws from the enabled flavors", () => {
    const cozyPool = new Set(eligible("cozy", QUIET));
    for (const line of sample(["cozy"], QUIET)) {
      assert.ok(cozyPool.has(line), `"${line}" is not a cozy line`);
    }
    const funnyPool = new Set(eligible("funny", QUIET));
    for (const line of sample(["funny"], QUIET)) {
      assert.ok(funnyPool.has(line), `"${line}" is not a funny line`);
    }
    // cozy-only draws must never surface a funny-only line
    const funnyOnly = [...funnyPool].filter((l) => !cozyPool.has(l));
    assert.ok(funnyOnly.length > 0);
    for (const line of sample(["cozy"], QUIET)) assert.ok(!funnyOnly.includes(line));
  });

  it("unions the pools when several flavors are enabled", () => {
    const both = sample(["cozy", "funny"], QUIET, [], 1200);
    const union = new Set([...eligible("cozy", QUIET), ...eligible("funny", QUIET)]);
    for (const line of both) assert.ok(union.has(line));
    assert.ok(both.size > new Set(eligible("cozy", QUIET)).size, "draws beyond a single flavor");
  });

  it("tolerates an unknown flavor name without throwing", () => {
    const flavors = ["cozy", "nope"] as unknown as Array<keyof typeof LINES>;
    assert.notEqual(pickLine(flavors, QUIET, []), null);
  });
});

describe("LINES bank", () => {
  it("every line renders a non-empty string for a quiet context", () => {
    for (const [flavor, lines] of Object.entries(LINES)) {
      for (const line of lines) {
        const rendered = line.text(QUIET);
        assert.equal(typeof rendered, "string", `${flavor} line must render a string`);
        assert.ok(rendered.length > 0, `${flavor} line must be non-empty`);
      }
    }
  });

  it("has no duplicate flat lines within a flavor", () => {
    for (const [flavor, lines] of Object.entries(LINES)) {
      const rendered = lines.map((l) => l.text(QUIET));
      assert.equal(new Set(rendered).size, rendered.length, `${flavor} has duplicates`);
    }
  });
});
