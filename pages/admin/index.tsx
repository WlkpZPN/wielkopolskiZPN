import { useState, createContext } from "react";
import jwt from "jsonwebtoken";
import AdminLayout from "../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import cookie from "cookie";
import nookies from "nookies";

export const UserContext = createContext(null);

const MainPage = ({ userData }) => {
  console.log(userData);
  return (
    <UserContext.Provider value={{ userData }}>
      <AdminLayout view="wnioski">
        <h1>Wnioski licencyjne</h1>
      </AdminLayout>
    </UserContext.Provider>
  );
};

export const getServerSideProps = protectedAdminRoute((context, data) => {
  return {
    props: {
      userData: data,
    },
  };
});

export default MainPage;
