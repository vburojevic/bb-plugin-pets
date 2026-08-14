// Hook-free data plane for the content-script overlay.
//
// SDK app hooks require the host's PluginContext and only work inside slot
// component trees — a content script's own React root has none of it. So the
// overlay talks to the backend directly: fetch for rpc, its own WebSocket to
// /ws for realtime plugin-signal frames (the server broadcasts them to every
// connected client), and location parsing for the viewed thread.
import type {
  StandardSchemaV1InferInput,
  StandardSchemaV1InferOutput,
} from "@bb/plugin-sdk/app";
import type { rpcContract } from "../server";

type Contract = typeof rpcContract;
export type RpcOutput<M extends keyof Contract> = StandardSchemaV1InferOutput<
  Contract[M]["output"]
>;
type RpcInput<M extends keyof Contract> = StandardSchemaV1InferInput<Contract[M]["input"]>;

export async function rpc<M extends keyof Contract & string>(
  pluginId: string,
  method: M,
  input?: RpcInput<M>,
): Promise<RpcOutput<M>> {
  const response = await fetch(`/api/v1/plugins/${pluginId}/rpc/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input ?? null),
  });
  if (!response.ok) throw new Error(`rpc ${method} http ${response.status}`);
  const envelope = (await response.json()) as
    | { ok: true; result: RpcOutput<M> }
    | { ok: false; error?: { message?: string } };
  if (!envelope.ok) throw new Error(envelope.error?.message ?? `rpc ${method} failed`);
  return envelope.result;
}

export function connectSignals(options: {
  pluginId: string;
  channel: string;
  onSignal: (payload: unknown) => void;
  /** Fired on re-established connections — reconcile durable state then. */
  onReconnect: () => void;
  signal: AbortSignal;
}): void {
  let socket: WebSocket | null = null;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;
  let closed = false;
  let attempts = 0;
  let hadConnection = false;
  let openedAt = 0;
  const url = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}/ws`;

  const open = () => {
    if (closed) return;
    socket = new WebSocket(url);
    socket.onopen = () => {
      openedAt = Date.now();
      if (hadConnection) options.onReconnect();
      hadConnection = true;
    };
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(String(event.data)) as {
          type?: string;
          pluginId?: string;
          channel?: string;
          payload?: unknown;
        };
        if (
          message.type === "plugin-signal" &&
          message.pluginId === options.pluginId &&
          message.channel === options.channel
        ) {
          options.onSignal(message.payload);
        }
      } catch {
        // not a JSON frame we care about
      }
    };
    socket.onclose = () => {
      socket = null;
      // Only a connection that actually stuck around earns a backoff reset —
      // flapping sockets keep the delay growing.
      if (openedAt && Date.now() - openedAt > 5000) attempts = 0;
      openedAt = 0;
      if (!closed) {
        retryTimer = setTimeout(open, Math.min(15_000, 500 * 2 ** attempts++));
      }
    };
    socket.onerror = () => {
      socket?.close();
    };
  };

  open();
  options.signal.addEventListener(
    "abort",
    () => {
      closed = true;
      if (retryTimer) clearTimeout(retryTimer);
      socket?.close();
    },
    { once: true },
  );
}

const THREAD_ROUTE = /^\/(?:projects\/[^/]+\/)?threads\/([^/]+)/;

export function currentThreadId(): string | null {
  const match = location.pathname.match(THREAD_ROUTE);
  return match ? (match[1] ?? null) : null;
}

/**
 * Observe route changes. bb is a BrowserRouter app, so in-app navigation uses
 * pushState/replaceState and never fires popstate; prefer the Navigation API
 * (Chromium/Electron) and fall back to patching history.
 */
export function watchRoute(
  onChange: (threadId: string | null) => void,
  signal: AbortSignal,
): void {
  let last = currentThreadId();
  const check = () => {
    const id = currentThreadId();
    if (id !== last) {
      last = id;
      onChange(id);
    }
  };
  const navigation = (window as { navigation?: EventTarget }).navigation;
  if (navigation) {
    const handler = () => queueMicrotask(check);
    navigation.addEventListener("navigatesuccess", handler);
    signal.addEventListener(
      "abort",
      () => navigation.removeEventListener("navigatesuccess", handler),
      { once: true },
    );
    return;
  }
  const originalPush = history.pushState.bind(history);
  const originalReplace = history.replaceState.bind(history);
  history.pushState = (...args: Parameters<History["pushState"]>) => {
    originalPush(...args);
    check();
  };
  history.replaceState = (...args: Parameters<History["replaceState"]>) => {
    originalReplace(...args);
    check();
  };
  const onPop = () => check();
  window.addEventListener("popstate", onPop);
  signal.addEventListener(
    "abort",
    () => {
      history.pushState = originalPush;
      history.replaceState = originalReplace;
      window.removeEventListener("popstate", onPop);
    },
    { once: true },
  );
}

/** Navigate the host router from outside it: pushState + a popstate nudge. */
export function navigateToThread(projectId: string, threadId: string): void {
  history.pushState({}, "", `/projects/${projectId}/threads/${threadId}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
