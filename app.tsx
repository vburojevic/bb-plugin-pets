// bb-plugin-pets — frontend entry.
//
// Surfaces: the floating companion overlay (an app-wide overlay slot), the
// Pets nav panel (den / hatchery / stats), and a slim settings section that
// points there.
import "./app.css";
import { useEffect, useState } from "react";
import { definePluginApp, useBbNavigate, useRpc } from "@get-bb/plugin-sdk/app";
import type { rpcContract } from "./server";
import { Overlay } from "./overlay/Overlay";
import { PetsPanel } from "./panel/PetsPanel";
import { rpc, type RpcOutput } from "./overlay/net";
import { useMediaQuery } from "@/components/ui/hooks/use-media-query";
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

/**
 * Mobile gate. perf-watch traced phone UI stalls to the overlay's rAF tick loop
 * and per-tick DOM scans, so on compact viewports the Overlay must never
 * render: every loop lives inside it, and a render-time blank would keep them
 * running. The "Hide on small viewports" setting (default on) stays the single
 * opt-back-in: a compact client renders the pet only after reading that the
 * user turned it off, and fails closed when the read fails. Crossing the
 * breakpoint (rotation, resize, a narrowed desktop window) re-decides live.
 */
function PetOverlayHost() {
  const api = useRpc<typeof rpcContract>();
  const compact = useMediaQuery(COMPACT_QUERY);
  const [compactAllowed, setCompactAllowed] = useState(false);

  useEffect(() => {
    setCompactAllowed(false);
    if (!compact) return;
    let live = true;
    rpc(api, "getOverlay")
      .then((state) => {
        if (live) setCompactAllowed(state.settings.hideOnCompact === false);
      })
      .catch(() => {
        // Server unreachable: stay hidden on compact (fail closed).
      });
    return () => {
      live = false;
    };
  }, [api, compact]);

  if (compact && !compactAllowed) return null;
  return <Overlay />;
}

export default definePluginApp((app) => {
  app.slots.experimental_appOverlay({
    id: "pet-overlay",
    component: PetOverlayHost,
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
