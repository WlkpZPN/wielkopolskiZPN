import AdminLayout from "../../components/organisms/admin_layout";
import styled from "styled-components";
import prisma from "../../middleware/prisma";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import Progress from "../../components/atoms/progress_container";

const Header = styled.h2`
  margin: 24px 0 12px 0;
`;

const Statystyki = ({ userData }) => {
  return (
    <AdminLayout userData={userData} view="statystyki">
      <h1>Statystyki</h1>

      <Header>Wnioski robocze</Header>
      <Progress
        status={1}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
          
        }}
      />

      <Header>Wnioski zaakceptowane opłacone</Header>
      <Progress status={7} style={{}} />
      <Header>Wnioski zaakceptowane nieopłacone</Header>
      <Progress status={6} style={{}} />

      <Header>Licencje standardowe</Header>
      <Progress status={8} style={{}} />
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
