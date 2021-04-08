import { Tenant } from ".prisma/client";
import { IncomingMessage } from "node:http";
import nookies from "nookies";
import db from "../db";

export async function getTenant(req: IncomingMessage): Promise<Tenant> {
  const { host } = req.headers;
  const cookie = nookies.get({ req }) || {};
  const tenantId = cookie["sportified-tenant-id"];
  const where = tenantId ? { id: parseInt(tenantId) } : { host };
  const tenant = await db.tenant.findFirst({ where });
  return tenant;
}
