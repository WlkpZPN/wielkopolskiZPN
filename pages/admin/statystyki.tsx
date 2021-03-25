import AdminLayout from "../../components/organisms/admin_layout";
import styled from "styled-components";

import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import ProgressContainer from "../../components/atoms/progress_container";
import LicenseButton from "../../components/molecules/license_button";
const Header = styled.h2`
  margin: 40px 0 12px 0;
`;

const Statystyki = ({ userData }) => {
  return (
    <AdminLayout userData={userData} view="statystyki">
      <h1>Statystyki</h1>
      <LicenseButton />
      {/* <Header>Wnioski robocze</Header>
      <ProgressContainer
        status={1}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      />

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

      <Header>Licencje standardowe</Header>
      <ProgressContainer
        status={8}
        style={{
          height: "32px",
          maxWidth: "600px",
          width: "100%",
        }}
      /> */}
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
