import { Page } from ".prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import Link from 'next/link'
import db from "../../../lib/db";

interface Query extends ParsedUrlQuery {
  tenantId: string;
}

interface Props {
  pages: Page[]
}

// export const getStaticProps: GetStaticProps<Props, Query> = async (ctx) => {
//   console.log(ctx)
//   const pages = await db.page.findMany({ where: { tenant_id: 1 }})
//   return {
//     props: { pages }
//   }
// }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(Object.keys(ctx))
  console.log(ctx.query)
  const pages = await db.page.findMany({ where: { tenant_id: 1 }})
  return {
    props: { pages }
  }
}

const AdminPagesIndex = ({ pages }: Props) => {
  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <Link href={`/admin/pages/${page.id}`}><a>{page.title}</a></Link></li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPagesIndex