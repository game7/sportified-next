import { Page } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "node:querystring";
import db from "../../../../src/db";

interface Query extends ParsedUrlQuery {
  tenantId: string;
  id: string;
}

interface Props {
  page: Page;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Query
> = async () => {
  const page = await db.page.findFirst({ where: { tenantId: 1 } });
  return {
    props: {
      page,
    },
  };
};

const AdminPagesShow: NextPage<Props> = ({ page }: Props) => {
  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
};

export default AdminPagesShow;
