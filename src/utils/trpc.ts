import { createReactQueryHooks } from "@trpc/react";
import { inferProcedureOutput } from "@trpc/server";
// Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { AppRouter } from "../../pages/api/rpc/[trpc]";

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
