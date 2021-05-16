import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import { useRouter } from "next/router";
import Link from "next/link";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
//components
import AdminLayout from "../../../components/organisms/admin_layout";
import IconButton from "../../../components/atoms/IconButton";

import AddUserForm from "../../../components/molecules/addUserForm";

//functions

const User = ({ roles, userData, authData }) => {
  const router = useRouter();
  const { user } = router.query;
  console.log("user data", userData);
  return (
    <AdminLayout userData={userData} view="uzytkownicy">
      {" "}
      <h1 style={{ margin: "24px 0" }}> {user} </h1>
      <Link href="/admin/uzytkownicy">
        <IconButton>
          <ControllerFastBackward />
          Powrót
        </IconButton>
      </Link>
      <AddUserForm
        authData={authData}
        refreshData={null}
        setVisible={null}
        userData={userData}
        roles={roles}
      />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const roles = await prisma.roles.findMany({
    where: {
      NOT: [
        {
          name: "klub",
        },
      ],
    },
  });

  const user = await prisma.users.findFirst({
    where: {
      email: context.params.user,
    },
    include: {
      roles: true,
    },
  });

  return {
    props: {
      authData: data,
      userData: user,
      roles: roles,
    },
  };
});

export default User;
