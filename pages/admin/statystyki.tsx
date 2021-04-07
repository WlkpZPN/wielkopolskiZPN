import AdminLayout from "../../components/organisms/admin_layout";
import styled from "styled-components";
import axios from "axios";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import ProgressContainer from "../../components/atoms/progress_container";
import LicenseButton from "../../components/molecules/license_button";
import ZipCodeInput from "../../components/atoms/zip_code_input";
import PrimaryButton from "../../components/atoms/primary_button";

import { generatePdf } from "../../middleware/generatePdf";
const Header = styled.h2`
  margin: 40px 0 12px 0;
`;

const Statystyki = ({ userData }) => {
  // const downloadLicense = () => {
  //   axios
  //     .get("/api/licences/issueLicense")
  //     .then((res) => {
  //       console.log(res.data);
  //       const blob = new File(res.data, "licencja.pdf", {
  //         type: "application/pdf",
  //       });
  //       const win = window.open("", "_blank");
  //       const URL = window.URL || window.webkitURL;
  //       const dataUrl = URL.createObjectURL(blob);
  //       win.location.href = dataUrl;
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <AdminLayout userData={userData} view="statystyki">
      <h1>Statystyki</h1>
      <PrimaryButton onClick={() => generatePdf()}>
        Pobierz licencje
      </PrimaryButton>
      <p> testowa strona</p>
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
