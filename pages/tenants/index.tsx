import { Page, Tenant } from ".prisma/client";
import { GetServerSideProps } from "next";
import Link from 'next/link'
import db from "../../lib/db";

interface Props {
   tenants: Tenant[]
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tenants = await db.tenant.findMany({ orderBy: [ { name: 'asc' } ] })
  return {
    props: { tenants }
  }
}

const TenantsIndex = ({ tenants }: Props) => {
  return (
    <div>
      <h1>Tenants</h1>
      <ul>
        {tenants.map(tenant => (
          <li key={tenant.id}>
            <Link href={`/admin/tenants/${tenant.id}`}><a>{tenant.name}</a></Link></li>
        ))}
      </ul>
    </div>
  )
}

export default TenantsIndex