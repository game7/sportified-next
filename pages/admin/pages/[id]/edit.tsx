import { Page } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { PageEditor } from "../../../../src/components/pages/edit/page-editor";
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

const AdminPagesEdit: NextPage<Props> = ({ page }) => {
  return <PageEditor page={page}></PageEditor>;
};

export default AdminPagesEdit;
