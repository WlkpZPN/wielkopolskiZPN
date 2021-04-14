import AdminLayout from "../../components/organisms/admin_layout";
import styled from "styled-components";
import axios from "axios";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import ProgressContainer from "../../components/atoms/progress_container";

const Header = styled.h2`
  margin: 48px 0 12px 0;
`;

const Title = styled.h1`
  margin-top: 24px;
  margin-bottom: 40px;
`;

const Statystyki = ({ userData }) => {
  return (
    <AdminLayout userData={userData} view="statystyki">
      <Title>Statystyki</Title>

      <Header>Wnioski zaakceptowane opłacone</Header>
      <ProgressContainer
        status={7}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />

      <Header>Wnioski zaakceptowane nieopłacone</Header>
      <ProgressContainer
        status={6}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />
      <Header>Wnioski odrzucone</Header>
      <ProgressContainer
        status={5}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />

      <Header>Wnioski wysłane</Header>
      <ProgressContainer
        status={2}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />
      <Header>Wnioski niewypełnione</Header>
      <ProgressContainer
        status={0}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  return {
    props: {
      userData: data,
    },
  };
});

export default Statystyki;
