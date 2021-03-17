import { useState, createContext } from "react";

import prisma from "../../middleware/prisma";
import jwt from "jsonwebtoken";
import AdminLayout from "../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";

//components
import ApplicationsList from "../../components/organisms/applications_list";

export const AdminContext = createContext(null);

const MainPage = ({ userData, applications }) => {
  return (
    <AdminContext.Provider value={{ userData, applications }}>
      <AdminLayout userData={userData} view="wnioski">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Wnioski licencyjne</h1>
          <div>status | szukaj</div>
        </div>
        {applications ? <ApplicationsList /> : null}
      </AdminLayout>
    </AdminContext.Provider>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const { req, res } = context;

  if (!data) {
    res.statusCode = 302;
    res.setHeader("Location", "/admin/login");
    return {
      props: {},
    };
  }
  console.log("data", data);
  const applications = await prisma.applications.findMany({
    include: {
      statuses: true,
      clubs: true,
    },
  });

  return {
    props: {
      userData: data,
      applications: applications,
    },
  };
});

export default MainPage;
