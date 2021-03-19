import { createContext } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import prisma from "../../../middleware/prisma";
import PrimaryButton from "../../../components/atoms/primary_button";
//componens
import ClubsList from "../../../components/organisms/clubs_list";
export const AdminContext = createContext(null);
const Kluby = ({ clubs, userData }) => {
  const router = useRouter();
  return (
    <AdminContext.Provider value={{ clubs }}>
      <AdminLayout userData={userData} view="kluby">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 0",
            width: "100%",
          }}
        >
          <h1>Kluby</h1>
          <PrimaryButton
            onClick={() => router.push(`/admin/kluby/nowy`)}
            style={{ fontWeight: "bold" }}
          >
            + Dodaj klub
          </PrimaryButton>
        </div>
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
