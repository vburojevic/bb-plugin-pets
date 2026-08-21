// bb-plugin-pets — frontend entry.
//
// Surfaces: the floating companion overlay (content script, own React root,
// hook-free data plane — see overlay/net.ts for why), the Pets nav panel
// (den / hatchery / stats), and a slim settings section that points there.
import "./app.css";
import { useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { definePluginApp, useBbNavigate, useRpc } from "@bb/plugin-sdk/app";
import type { rpcContract } from "./server";
import { Overlay } from "./overlay/Overlay";
import { PetsPanel } from "./panel/PetsPanel";
import { rpc, type RpcOutput } from "./overlay/net";
import { Button } from "@/components/ui/button";

/** bb's own compact breakpoint — the overlay never mounts below it. */
const COMPACT_QUERY = "(max-width: 767px)";

function PetsSettingsSection() {
  const rpc = useRpc<typeof rpcContract>();
  const navigate = useBbNavigate();
  const [den, setDen] = useState<RpcOutput<"listDen">["pets"] | null>(null);

  useEffect(() => {
    rpc.call("listDen").then((r) => setDen(r.pets)).catch(() => {});
  }, [rpc]);

  const active = den?.find((pet) => pet.active);

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        {active
          ? `${active.name} — ${active.stage.name}, ${active.xp} XP · ${den!.length} in the den.`
          : "Loading the den…"}
        {" Manage pets, hatch new ones, and browse stats in the Pets panel."}
      </p>
      <Button variant="outline" size="sm" onClick={() => navigate.toPluginPanel("pets")}>
        Open Pets panel
      </Button>
    </div>
  );
}

export default definePluginApp((app) => {
  app.contentScripts.register({
    id: "pet-overlay",
    mount({ pluginId, signal }) {
      // Mobile gate. perf-watch traced phone UI stalls to the overlay's rAF
      // tick loop and per-tick DOM scans, so on compact viewports the overlay
      // must never MOUNT — the render-time `hideOnCompact && compact` check
      // inside Overlay only blanks the pet while every loop keeps running.
      // The existing "Hide on small viewports" setting (default on) stays the
      // single opt-back-in: a compact client mounts only when the user turned
      // it off. Crossing the breakpoint (rotation, resize, a narrowed desktop
      // window) re-decides live: going compact unmounts the React root and
      // removes the container; going wide remounts cleanly.
      const mql = window.matchMedia(COMPACT_QUERY);
      let container: HTMLDivElement | null = null;
      let root: Root | null = null;
      let disposed = false;
      // Monotonic guard for the compact branch's async settings read — a
      // response that raced disposal or another breakpoint flip must not win.
      let decideToken = 0;

      const mountOverlay = () => {
        if (disposed || root) return;
        container = document.createElement("div");
        container.setAttribute("data-bb-plugin-pets", "");
        document.body.appendChild(container);
        root = createRoot(container);
        root.render(<Overlay pluginId={pluginId} />);
      };

      const unmountOverlay = () => {
        root?.unmount();
        container?.remove();
        root = null;
        container = null;
      };

      const decide = () => {
        const token = ++decideToken;
        if (!mql.matches) {
          mountOverlay();
          return;
        }
        // Compact: default to unmounted, then consult the stored setting for
        // the explicit opt-in. getOverlay is read-only, and this one small
        // fetch replaces the perpetual per-frame work the gate exists to stop.
        unmountOverlay();
        void rpc(pluginId, "getOverlay")
          .then((state) => {
            if (disposed || token !== decideToken || !mql.matches) return;
            if (state.settings.hideOnCompact === false) mountOverlay();
          })
          .catch(() => {
            // Server unreachable — stay unmounted on compact (fail closed).
          });
      };

      const onBreakpointChange = () => decide();
      mql.addEventListener("change", onBreakpointChange);
      decide();

      const dispose = () => {
        if (disposed) return;
        disposed = true;
        decideToken += 1;
        mql.removeEventListener("change", onBreakpointChange);
        unmountOverlay();
      };
      signal.addEventListener("abort", dispose, { once: true });
      return dispose;
    },
  });

  app.slots.navPanel({
    id: "pets",
    title: "Pets",
    icon: "Star",
    path: "pets",
    component: PetsPanel,
  });

  app.slots.sidebarFooterAction({
    id: "open-pets",
    title: "Pet options",
    icon: "PawPrint",
    run() {
      // Summons the pet's own context menu at the pet, rather than navigating —
      // the overlay owns the menu, so this is a request, not a route change.
      window.dispatchEvent(new CustomEvent("pets:open-menu"));
    },
  });

  app.slots.settingsSection({
    id: "den",
    title: "Den",
    description: "Your companions live in the Pets panel.",
    component: PetsSettingsSection,
  });
});
