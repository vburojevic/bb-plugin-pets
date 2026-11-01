// Install guard: bb installs git plugins with `npm install --omit=dev` and then
// rebuilds dist/ from the bb.server and bb.app entries. Every package those
// entries import at runtime must therefore be a production dependency, or the
// install fails with "Could not resolve" (issue #1: zod sat in devDependencies).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { dirname, join, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

// Supplied by the bb host at runtime, never bundled from node_modules.
const HOST_PROVIDED = new Set(["@bb/plugin-sdk", "react", "react-dom"]);

const STATIC_IMPORT = /(?:^|[\s;])(?:import|export)\s+(type\s+)?(?:[^'";]*?\sfrom\s*)?["']([^"']+)["']/g;
const DYNAMIC_IMPORT = /\bimport\(\s*["']([^"']+)["']\s*\)/g;

// Sources import each other as "./x.js" (or extensionless); the file on disk is x.ts or x.tsx.
function resolveLocal(from: string, spec: string): string | null {
  const path = spec.startsWith("@/") ? join(root, spec.slice(2)) : resolve(dirname(from), spec);
  const base = path.replace(/\.jsx?$/, "");
  for (const candidate of [path, `${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")]) {
    if (/\.tsx?$/.test(candidate) && existsSync(candidate)) return candidate;
  }
  return null;
}

const ASSET = /\.(css|svg|png|json)$/;

function packageName(spec: string): string {
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

/** Bare packages reachable at runtime from the given entry files. */
function runtimePackages(entries: string[]): { found: Map<string, string>; unresolved: string[] } {
  const found = new Map<string, string>();
  const unresolved: string[] = [];
  const seen = new Set<string>();
  const queue = entries.map((entry) => join(root, entry));
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const source = readFileSync(file, "utf8");
    const specs: string[] = [];
    for (const match of source.matchAll(STATIC_IMPORT)) if (!match[1]) specs.push(match[2]);
    for (const match of source.matchAll(DYNAMIC_IMPORT)) specs.push(match[1]);
    for (const spec of specs) {
      if (spec.startsWith(".") || spec.startsWith("@/")) {
        const local = resolveLocal(file, spec);
        if (local) queue.push(local);
        else if (!ASSET.test(spec)) unresolved.push(`${spec} (in ${file.slice(root.length + 1)})`);
        continue;
      }
      if (spec.startsWith("node:") || builtinModules.includes(spec)) continue;
      const name = packageName(spec);
      if (!found.has(name)) found.set(name, file.slice(root.length + 1));
    }
  }
  return { found, unresolved };
}

describe("runtime dependencies", () => {
  const entries = [pkg.bb.server, pkg.bb.app].filter(Boolean);
  const { found: packages, unresolved } = runtimePackages(entries);

  it("walks the whole bb.server and bb.app import graph", () => {
    assert.deepEqual(entries, ["./server.ts", "./app.tsx"]);
    assert.deepEqual(unresolved, [], "the walker could not follow these local imports");
    assert.ok(packages.has("zod"), "expected server.ts to import zod");
  });

  it("lists every runtime import in dependencies, not devDependencies", () => {
    const deps = pkg.dependencies ?? {};
    const missing = [...packages]
      .filter(([name]) => !HOST_PROVIDED.has(name) && !(name in deps))
      .map(([name, file]) => `${name} (imported by ${file})`);
    assert.deepEqual(missing, [], "move these to dependencies so `npm install --omit=dev` installs them");
  });
});
