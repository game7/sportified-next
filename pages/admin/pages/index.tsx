import { Page, Tenant } from ".prisma/client";
import Link from 'next/link';
import AdminLayout from "../../../lib/components/layouts/admin-layout";
import db from "../../../lib/db";
import { handle } from "../../../lib/pipes";

interface Props {
  pages: Page[],
  tenant: Tenant
}

export const getServerSideProps = handle(async (ctx) => {
  const { tenant, session } = ctx;
  const pages = await db.page.findMany({ where: { tenantId: 1 }})
  return {
    props: {
      session,
      tenant,
      pages 
    }
  }
})

const AdminPagesIndex = ({ pages, tenant }: Props) => {
  return (
    <AdminLayout title={`Pages (${tenant.name})`}>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <Link href={`/admin/pages/${page.id}`}><a>{page.title}</a></Link></li>
        ))}
      </ul>
    </AdminLayout>
  )
}

export default AdminPagesIndex