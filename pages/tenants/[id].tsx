import { Page, Tenant } from ".prisma/client";
import { GetServerSideProps } from "next";
import Link from 'next/link'
import { ParsedUrlQuery } from "node:querystring";
import db from "../../lib/db";
import nookies from 'nookies'

interface Props {
   tenants: Tenant[]
}

interface Query extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query>= async (ctx) => {
  const { id } = ctx.query;
  if(id) {
    const count = await db.tenant.count({ where: { id: parseInt(id as string) }})
    if(count === 1) {
      nookies.set(ctx, 'sportified-tenant-id', id as string, { path: '/' })
      return {
        redirect: {
          permanent: false,
          destination: (nookies.get(ctx)['sportified-last-url'] || '/')
        }
      }
    }
  }
  return {
    notFound: true
  }
}

const TenantsShow = ({ tenants }: Props) => {
  return (
    <div/>
  )
}

export default TenantsShow