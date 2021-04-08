import { Tenant, User } from ".prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { getTenant } from "../../src/utils/tenant";

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
