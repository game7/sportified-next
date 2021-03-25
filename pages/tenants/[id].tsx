import { Tenant } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "node:querystring";
import nookies from "nookies";
import db from "../../lib/db";

interface Props {
  tenants: Tenant[];
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx
) => {
  const { id } = ctx.query;
  if (id) {
    const count = await db.tenant.count({
      where: { id: parseInt(id as string) },
    });
    if (count === 1) {
      nookies.set(ctx, "sportified-tenant-id", id as string, { path: "/" });
      return {
        redirect: {
          permanent: false,
          destination: nookies.get(ctx)["sportified-last-url"] || "/",
        },
      };
    }
  }
  return {
    notFound: true,
  };
};

const TenantsShow: NextPage<Props> = ({}: Props) => {
  return <div />;
};

export default TenantsShow;
