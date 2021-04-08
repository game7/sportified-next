import { Page } from ".prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { Header, Icon, Segment, Table } from "semantic-ui-react";
import { AdminLayout } from "../../../src/components/layouts/admin-layout";
import { AddPage } from "../../../src/components/pages/add-page";
import { handle } from "../../../src/pipes";
import { trpc } from "../../../src/utils/trpc";

interface Props {
  pages: Page[];
}

export const getServerSideProps = handle<Props>(async ({ ssr }) => {
  const pages = await ssr.fetchQuery(["pages.list"]);
  return { props: { pages } };
});

const AdminPagesIndex: NextPage<Props> = (props) => {
  const pages = trpc.useQuery(["pages.list"], {
    initialData: props.pages,
    refetchOnMount: false,
  });

  function handlePageCreated() {
    pages.refetch();
  }

  return (
    <AdminLayout title="Pages">
      {!pages.data?.length && (
        <Segment placeholder>
          <Header icon>
            <Icon name="file outline" />
            No pages currently exist for this site.
          </Header>
        </Segment>
      )}
      {!!pages.data?.length && (
        <Table>
          <Table.Body>
            {pages.data?.map((page) => (
              <Table.Row key={page.id}>
                <Table.Cell>
                  {page.title} [
                  <Link href={`/admin/pages/${page.id}/edit`}>
                    <a>Edit</a>
                  </Link>
                  ]
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <AddPage onPageCreated={handlePageCreated}></AddPage>
    </AdminLayout>
  );
};

export default AdminPagesIndex;
