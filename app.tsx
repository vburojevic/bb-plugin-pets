// bb-plugin-pets — frontend entry.
//
// Surfaces: the floating companion overlay (content script, own React root,
// hook-free data plane — see overlay/net.ts for why), the Pets nav panel
// (den / hatchery / stats), and a slim settings section that points there.
import "./app.css";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { definePluginApp, useBbNavigate, useRpc } from "@bb/plugin-sdk/app";
import type { rpcContract } from "./server";
import { Overlay } from "./overlay/Overlay";
import { PetsPanel } from "./panel/PetsPanel";
import type { RpcOutput } from "./overlay/net";
import { Button } from "@/components/ui/button";

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
      const container = document.createElement("div");
      container.setAttribute("data-bb-plugin-pets", "");
      document.body.appendChild(container);
      const root = createRoot(container);
      root.render(<Overlay pluginId={pluginId} />);
      let disposed = false;
      const dispose = () => {
        if (disposed) return;
        disposed = true;
        root.unmount();
        container.remove();
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
