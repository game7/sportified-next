import { Tenant, User } from ".prisma/client";
import * as trpc from "@trpc/server";
import { DefaultErrorShape, inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import * as z from "zod";
import { getTenant } from "../../../src/utils/tenant";
import { router as pages } from "../../../src/modules/pages";

export const createContext = async ({
  req,
}: trpcNext.CreateNextContextOptions): Promise<{
  tenant: Tenant;
  session: Session;
  user: User;
}> => {
  const tenant = await getTenant(req);
  const session = await getSession({ req });
  const user = session?.user as User;
  return {
    tenant,
    session,
    user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

const hello = createRouter().query("hello", {
  input: z
    .object({
      text: z.string().optional(),
    })
    .optional(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? "world"}`,
    };
  },
});

// Important: only use this export with SSR/SSG
export const appRouter = createRouter()
  .merge(hello)
  .merge(pages)
  .formatError(({ defaultShape, error }) => {
    return {
      ...defaultShape,
      results:
        error.code === "BAD_USER_INPUT" &&
        error.originalError instanceof z.ZodError
          ? error.originalError.flatten()
          : null,
    };
  });

// Exporting type _type_ AppRouter only exposes types that can be used for inference
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
export type AppRouter = typeof appRouter;

export type ErrorResult = {
  formErrors: string[];
  fieldErrors: {
    [k: string]: string[];
  };
};

export type RpcError = DefaultErrorShape & { result?: ErrorResult };

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
