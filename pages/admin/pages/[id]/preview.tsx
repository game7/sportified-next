import { Page } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { PagePreview } from "../../../../src/components/pages/edit/page-preview";
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

const AdminPagesPreview: NextPage<Props> = ({ page }) => {
  return <PagePreview page={page}></PagePreview>;
};

export default AdminPagesPreview;
