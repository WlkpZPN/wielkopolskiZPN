import { createContext } from "react";
import AdminLayout from "../../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import prisma from "../../../middleware/prisma";

//componens
import ClubsList from "../../../components/organisms/clubs_list";
export const AdminContext = createContext(null);
const Kluby = ({ clubs, userData }) => {
  return (
    <AdminContext.Provider value={{ clubs }}>
      <AdminLayout userData={userData} view="kluby">
        <h1>Kluby</h1>
        <ClubsList />
      </AdminLayout>
    </AdminContext.Provider>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const clubs = await prisma.clubs.findMany();

  return {
    props: {
      userData: data,
      clubs: clubs,
    },
  };
});

export default Kluby;
