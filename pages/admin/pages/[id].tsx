import { Page } from ".prisma/client";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import db from "../../../lib/db";

interface Query extends ParsedUrlQuery {
  tenantId: string;
  id: string;
}

interface Props {
  page: Page
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (ctx) => {
  console.log(Object.keys(ctx))
  console.log(ctx.query)
  const page = await db.page.findFirst({ where: { tenant_id: 1 }})
  return {
    props: { 
        page
    }
  }
}

const AdminPagesShow = ({ page }: Props) => {
  return (
    <div>
      <h1>{page.title}</h1>

    </div>
  )
}

export default AdminPagesShow