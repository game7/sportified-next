import { Tenant, User } from ".prisma/client";
import {
  AnyRouter,
  inferHandlerInput,
  inferProcedureOutput,
  inferRouterContext,
} from "@trpc/server";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "node:querystring";
import nookies from "nookies";
import { QueryClient } from "react-query";
import { AppRouter, appRouter } from "../../pages/api/rpc/[trpc]";
import { getTenant } from "../utils/tenant";

const CACHE_KEY_QUERY = "TRPC_QUERY";
interface CreateSSRClientOptions<TRouter extends AnyRouter> {
  router: TRouter;
  ctx: inferRouterContext<TRouter>;
}

interface SSRClient<TRouter extends AnyRouter> {
  fetchQuery<
    TPath extends keyof TRouter["_def"]["queries"] & string,
    TProcedure extends TRouter["_def"]["queries"][TPath],
    TOutput extends inferProcedureOutput<TProcedure>
  >(
    pathAndArgs: [path: TPath, ...args: inferHandlerInput<TProcedure>]
  ): Promise<TOutput>;
  prefetchQuery<
    TPath extends keyof TRouter["_def"]["queries"] & string,
    TProcedure extends TRouter["_def"]["queries"][TPath]
  >(
    pathAndArgs: [path: TPath, ...args: inferHandlerInput<TProcedure>]
  ): Promise<void>;
}

function createSSRClient<TRouter extends AnyRouter>({
  router,
  ctx,
}: CreateSSRClientOptions<TRouter>): SSRClient<TRouter> {
  type TQueries = TRouter["_def"]["queries"];
  const caller = router.createCaller(ctx);
  const queryClient = new QueryClient();

  const fetchQuery = async <
    TPath extends keyof TQueries & string,
    TProcedure extends TQueries[TPath],
    TOutput extends inferProcedureOutput<TProcedure>
  >(
    pathAndArgs: [path: TPath, ...args: inferHandlerInput<TProcedure>]
  ): Promise<TOutput> => {
    return await caller.query(...pathAndArgs);
  };

  const prefetchQuery = async <
    TPath extends keyof TQueries & string,
    TProcedure extends TQueries[TPath]
  >(
    pathAndArgs: [path: TPath, ...args: inferHandlerInput<TProcedure>]
  ): Promise<void> => {
    const [path, input] = pathAndArgs;
    const cacheKey = [path, input ?? null, CACHE_KEY_QUERY];

    return queryClient.prefetchQuery(cacheKey, async () => {
      return await caller.query(...pathAndArgs);
    });
  };

  return {
    fetchQuery,
    prefetchQuery,
  };
}

export function handle<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  handler: (opts: {
    ctx: GetServerSidePropsContext<Q>;
    tenant: Tenant;
    user: User;
    session: Session;
    ssr: SSRClient<AppRouter>;
  }) => Promise<GetServerSidePropsResult<P>>
): GetServerSideProps<P, Q> {
  return async (ctx) => {
    const tenant = await getTenant(ctx.req);

    if (!tenant) {
      nookies.set(ctx, "sportified-last-url", ctx.resolvedUrl, { path: "/" });
      return {
        redirect: {
          permanent: false,
          destination: "/tenants",
        },
      };
    }

    const session = await getSession(ctx);
    const user = session?.user as User;

    // const ssg = createSSGHelpers({
    //   router: appRouter,
    //   transformer: superjson,
    //   ctx: {
    //     tenant,
    //     session,
    //     user,
    //   },
    // });

    const ssr = createSSRClient({
      router: appRouter,
      ctx: {
        tenant,
        session,
        user,
      },
    });

    return handler({
      ctx,
      tenant,
      session,
      user,
      ssr,
    });
  };
}
