import { useState, useEffect } from "react";
import styled from "styled-components";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

//components
import Loader from "../../../components/atoms/loader";
import { getUsers, getRoles } from "../../../middleware/swr";
import AdminLayout from "../../../components/organisms/admin_layout";
import UsersList from "../../../components/molecules/users_list";
import PrimaryButton from "../../../components/atoms/primary_button";
import AddUserModal from "../../../components/organisms/add_user_modal";
import StyledSpinner from "../../../components/atoms/loader";
const Table = styled.div`
  margin: 32px 0;
  display: grid;
  grid-template-rows: ${({ size }) => `repeat(${size},50px)`};
  width: 100%;
`;

const TableHeader = styled.div`
  background: #f9fafb;

  display: grid;
  grid-template-columns:
    40px minmax(100px, 200px) minmax(100px, 200px) minmax(100px, 200px)
    minmax(100px, 250px) auto;

  border: 2px solid rgba(0, 0, 0, 0.1);

  align-items: center;
  justify-items: center;
  & p {
    font-weight: bold;
  }
`;

const Uzytkownicy = ({ authData }) => {
  const router = useRouter();
  const { users, isUsersError, isUsersLoading } = getUsers();
  const { roles, isRolesError, isRolesLoading } = getRoles();
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (isUsersLoading || isRolesLoading) {
    return (
      <AdminLayout userData={authData} view="uzytkownicy">
        {" "}
        <Loader />{" "}
      </AdminLayout>
    );
  }

  return (
    <AdminLayout userData={authData} view="uzytkownicy">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          margin: "24px 0 40px 0",
        }}
      >
        <h1>Użytkownicy {loading && <StyledSpinner width="40px" />}</h1>
        {authData.id !== 5 && (
          <PrimaryButton onClick={() => setVisibility(true)} fontWeight="600">
            + Dodaj użytkownika
          </PrimaryButton>
        )}
      </div>
      <Table size={users.length + 1}>
        <TableHeader>
          <p></p>
          <p>Nazwisko</p>
          <p>Imię</p>
          <p>Rola</p>
          <p>E-mail</p>
        </TableHeader>
        {users && !isUsersLoading ? (
          <UsersList
            authData={authData}
            users={users}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <p>Brak użytkowników</p>
        )}
      </Table>
      {roles && !isRolesLoading ? (
        <AddUserModal
          refreshData={refreshData}
          roles={roles}
          visibility={visibility ? 1 : 0}
          setVisibility={setVisibility}
        />
      ) : (
        <p></p>
      )}
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  return {
    props: {
      authData: data,
    },
  };
});

export default Uzytkownicy;
