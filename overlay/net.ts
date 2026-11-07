// RPC typing for the overlay and the panel.
//
// The overlay mounts through `experimental_appOverlay`, so it reads the plugin
// backend through the same SDK hooks as every slot: `useRpc` for calls,
// `useRealtime` for the "pets" channel, `useBbContext` for the thread in view
// and `useBbNavigate` for navigation. This file only keeps the shared types
// and a call helper that accepts an omitted input for `z.null()` methods.
import type {
  PluginRpcClient,
  StandardSchemaV1InferInput,
  StandardSchemaV1InferOutput,
} from "@get-bb/plugin-sdk/app";
import type { rpcContract } from "../server";

type Contract = typeof rpcContract;
export type PetsRpc = PluginRpcClient<Contract>;
export type RpcOutput<M extends keyof Contract> = StandardSchemaV1InferOutput<
  Contract[M]["output"]
>;
type RpcInput<M extends keyof Contract> = StandardSchemaV1InferInput<Contract[M]["input"]>;

export function rpc<M extends keyof Contract & string>(
  client: PetsRpc,
  method: M,
  input?: RpcInput<M>,
): Promise<RpcOutput<M>> {
  const loose = client as unknown as {
    call(method: string, input?: unknown): Promise<RpcOutput<M>>;
  };
  return input === undefined ? loose.call(method) : loose.call(method, input);
}
