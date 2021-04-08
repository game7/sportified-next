import { NextPage } from "next";
import Link from "next/link";
import AdminLayout from "../../src/components/layouts/admin-layout";

const AdminIndex: NextPage = () => {
  return (
    <AdminLayout title="Admin">
      <ul>
        <li>
          <Link href="/admin/pages">
            <a>Pages</a>
          </Link>
        </li>
      </ul>
    </AdminLayout>
  );
};

export default AdminIndex;
