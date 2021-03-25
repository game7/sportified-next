import { Tenant } from ".prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import db from "../../lib/db";

interface Props {
  tenants: Tenant[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tenants = await db.tenant.findMany({ orderBy: [{ name: "asc" }] });
  return {
    props: { tenants },
  };
};

const TenantsIndex: NextPage<Props> = ({ tenants }: Props) => {
  return (
    <div>
      <h1>Tenants</h1>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            <Link href={`/tenants/${tenant.id}`}>
              <a>{tenant.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantsIndex;
