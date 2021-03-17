import AdminLayout from "../../components/organisms/admin_layout";
import prisma from "../../middleware/prisma";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";

const Statystyki = ({ userData }) => {
  return (
    <AdminLayout userData={userData} view="statystyki">
      <h1>Statystyki</h1>
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const { req, res } = context;

  return {
    props: {
      userData: data,
    },
  };
});

export default Statystyki;
