import Link from "next/link";
import AdminLayout from "../../lib/components/layouts/admin-layout";

interface Props {

}

const AdminIndex = ({ }: Props) => {
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
  )
}

export default AdminIndex