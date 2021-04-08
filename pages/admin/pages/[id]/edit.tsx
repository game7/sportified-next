import { NextPage } from "next";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../../src/components/layouts/admin-layout";
import { PageEditor } from "../../../../src/components/pages/edit/page-editor";
import { trpc } from "../../../../src/utils/trpc";

const AdminPagesEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const query = trpc.useQuery(["pages.get", { id: parseInt(id as string) }]);
  return (
    <AdminLayout title="Edit Page" container={false}>
      {query.isSuccess ? <PageEditor page={query.data}></PageEditor> : null}
    </AdminLayout>
  );
};

export default AdminPagesEdit;
