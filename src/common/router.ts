import * as trpc from "@trpc/server";
import { Context } from "./context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createRouter() {
  return trpc.router<Context>();
}
