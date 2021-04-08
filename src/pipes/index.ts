import { IncomingMessage } from "node:http";
import nookies from "nookies";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "node:querystring";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import db from "../db";
import { Tenant } from ".prisma/client";
import { Session } from "next-auth";

interface NextContext {
  req?: IncomingMessage;
  ctx?: { req: IncomingMessage };
}

async function getTenant(ctx: NextContext) {
  const { host } = ctx.req.headers;
  const cookie = nookies.get(ctx) || {};
  const tenantId = cookie["sportified-tenant-id"];
  const where = tenantId ? { id: parseInt(tenantId) } : { host };
  const tenant = await db.tenant.findFirst({ where });
  return tenant;
}

interface ContextExtensions {
  tenant: Tenant;
  session: Session;
}

export function handle<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  handler: (
    ctx: GetServerSidePropsContext<Q> & ContextExtensions
  ) => Promise<GetServerSidePropsResult<P>>
): GetServerSideProps<P, Q> {
  return async (ctx) => {
    const tenant = await getTenant(ctx);
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
    return handler({
      ...ctx,
      tenant,
      session,
    });
  };
}
