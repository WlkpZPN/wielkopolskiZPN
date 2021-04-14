import { useState, useEffect } from "react";
import styled from "styled-components";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

//components
import AdminLayout from "../../../components/organisms/admin_layout";
import { User } from "@styled-icons/fa-solid/User";
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
  padding-left: 30px;
  display: grid;
  grid-template-columns: repeat(4, 180px);

  border: 2px solid rgba(0, 0, 0, 0.1);

  align-items: center;
  justify-items: center;
  & p {
    font-weight: bold;
  }
`;

const UserIcon = styled(User)`
  width: 20px;
  color: ${({ theme }) => theme.primary};
  position: absolute;
  left: 8px;
`;
const ButtonRow = styled.div`
  position: absolute;
  right: 8px;
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 16px;

  & button:first-child {
    margin-right: 8px;
  }
`;
const TableRow = styled.div`
  padding-left: 30px;
  display: grid;
  position: relative;
  grid-template-columns: repeat(4, 180px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 0px;
  align-items: center;
  justify-items: center;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #dedede;
  }
`;
const Uzytkownicy = ({ users, roles, authData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    refreshData();
  }, [visibility, loading]);

  const deleteUser = (userID, name) => {
    setLoading(true);
    axios
      .post("/api/users/deleteUser", {
        userID,
      })
      .then(() => {
        toast.warn(`Użytkownik ${name} pomyślnie usunięty`);
        setLoading(false);
      });
  };

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
        <PrimaryButton onClick={() => setVisibility(true)} fontWeight="600">
          + Dodaj użytkownika
        </PrimaryButton>
      </div>
      <Table size={users.length + 1}>
        <TableHeader>
          <p>Nazwisko</p>
          <p>Imię</p>
          <p>Rola</p>
          <p>E-mail</p>
        </TableHeader>
        {users.map((user, index) => {
          return (
            <TableRow key={index}>
              <UserIcon />
              <p>{user.name.split(" ")[0]}</p> <p>{user.name.split(" ")[1]}</p>
              <p>{user.roles.name}</p>
              <p>{user.email}</p>
              <ButtonRow>
                <PrimaryButton
                  onClick={() => deleteUser(user.id, user.name)}
                  color="danger"
                  hoverColor="dangerDark"
                >
                  Usuń użytkownika
                </PrimaryButton>
                <PrimaryButton
                  onClick={() =>
                    router.push(`/admin/uzytkownicy/${user.email}`)
                  }
                >
                  Szczegóły
                </PrimaryButton>
              </ButtonRow>
            </TableRow>
          );
        })}
      </Table>
      <AddUserModal
        refreshData={refreshData}
        roles={roles}
        visibility={visibility ? 1 : 0}
        setVisibility={setVisibility}
      />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const users = await prisma.users.findMany({
    include: {
      roles: true,
    },
  });

  const roles = await prisma.roles.findMany({
    where: {
      NOT: [
        {
          name: "klub",
        },
      ],
    },
  });
  return {
    props: {
      authData: data,
      roles: roles,
      users: users,
    },
  };
});

export default Uzytkownicy;
