import { Page } from ".prisma/client";
import { NextPage } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { PagePreview } from "../../../../src/components/pages/edit/page-preview";
import { handle } from "../../../../src/pipes";
interface Query extends ParsedUrlQuery {
  id: string;
}

interface Props {
  page: Page;
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps = handle<Props, Query>(async ({ ssr, ctx }) => {
  const page = await ssr.fetchQuery([
    "pages.get",
    { id: parseInt(ctx.params.id, 10) },
  ]);
  return {
    props: {
      page,
    },
  };
});

const AdminPagesPreview: NextPage<Props> = ({ page }) => {
  return <PagePreview page={page}></PagePreview>;
};

export default AdminPagesPreview;
