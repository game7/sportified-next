import { Page, Tenant } from ".prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import AdminLayout from "../../../src/components/layouts/admin-layout";
import db from "../../../src/db";
import { handle } from "../../../src/pipes";
import { useRouter } from "next/router";

interface Props {
  pages: Page[];
  tenant: Tenant;
}

export const getServerSideProps = handle(async (ctx) => {
  const { tenant, session } = ctx;
  const pages = await db.page.findMany({ where: { tenantId: 1 } });
  return {
    props: {
      session,
      tenant,
      pages,
    },
  };
});

const AdminPagesIndex: NextPage<Props> = ({ pages, tenant }: Props) => {
  const router = useRouter();
  async function createNewPage() {
    debugger;
    const res = await fetch("/api/pages", { method: "POST" });
    const page = (await res.json()) as Page;
    router.push(`/pages/edit/${page.id}`);
  }
  return (
    <AdminLayout title={`Pages (${tenant.name})`}>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`/admin/pages/${page.id}`}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Button onClick={createNewPage}>New Page</Button>
    </AdminLayout>
  );
};

export default AdminPagesIndex;
