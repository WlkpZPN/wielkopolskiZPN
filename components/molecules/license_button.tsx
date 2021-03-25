import axios from "axios";
import { useState, useEffect, createRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styled from "styled-components";
import ApplicationStatus from "../atoms/application_status";
import OutlineButton from "../atoms/outline_button";
import { FilePdf } from "@styled-icons/fa-regular/FilePdf";
import CustomScroll from "react-custom-scroll";
import LicenseView from "./license_view";
import PrimaryButton from "../atoms/primary_button";
import UndoLicense from "./undo_license_modal";
import GiveSupervision from "./give_supervision_modal";
const FileIcon = styled(FilePdf)`
  width: 40px;
  color: black;
`;

const Wrapper = styled.div`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 8px;
  margin-right: 16px;
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 300px;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;

  text-align: center;
`;

const Content = styled.span`
  margin: 12px 0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const StatusContainer = styled.div`
  position: ${({ isAdmin }) => (isAdmin ? "initial" : "absolute")};
  /* top:${({ isAdmin }) => (isAdmin ? "initial" : "absolute")}; */
  top: -20px;
  left: 50%;
  transform: ${({ isAdmin }) => (isAdmin ? "initial" : "translateX(-50%)")};
`;

const ref = createRef();

const LicenseButton = ({ application, isAdmin }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const undoSupervision = async () => {
    setLoading(true);
    try {
      await axios.post("/api/licences/setLicense", {
        applicationID: application.id,
        statusID: 8,
        description: "Cofnięto nadzór, wydano licencję standardową",
      });
      setLoading(false);
      toast.success("Pomyślnie wydano licencję standardową", {
        autoClose: 1500,
      });
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Cofnięcie nadzoru nie powiodło się, spróbuj ponownie", {
        autoClose: 1500,
      });
    }
  };
  return (
    <Wrapper>
      <UndoLicense
        applicationID={application.id}
        internalID={application.internal_id}
        visible={visible1}
        setVisible={setVisible1}
      />
      <GiveSupervision
        visible={visible2}
        setVisible={setVisible2}
        applicationID={application.id}
        internalID={application.internal_id}
      />
      <LicenseView
        application={application}
        text=""
        visible={visible}
        setVisible={setVisible}
      />
      <StatusContainer isAdmin={isAdmin}>
        <ApplicationStatus
          size={isAdmin ? "40px" : "60px"}
          status={application.statuses.name}
        />
      </StatusContainer>
      {isAdmin ? null : <FileIcon />}
      <Content>licencja {application.internal_id}</Content>

      <OutlineButton
        style={{ width: "90%", padding: "8px", fontSize: "14px" }}
        onClick={() => setVisible(true)}
      >
        Wyświetl
      </OutlineButton>

      {isAdmin && (
        <>
          {application.status_id === 8 ? (
            <PrimaryButton
              style={{
                width: "90%",
                padding: "8px",
                fontSize: "14px",
                margin: "12px 0",
              }}
              onClick={() => setVisible2(true)}
            >
              Nadaj nadzór
            </PrimaryButton>
          ) : (
            <PrimaryButton
              style={{
                width: "90%",
                padding: "8px",
                fontSize: "14px",
                margin: "12px 0",
              }}
              onClick={undoSupervision}
            >
              Zdejmij nadzór
            </PrimaryButton>
          )}
          <PrimaryButton
            style={{ width: "90%", padding: "8px", fontSize: "14px" }}
            color="danger"
            hoverColor="dangerDark"
            onClick={() => setVisible1(true)}
          >
            Cofnij licencję
          </PrimaryButton>
        </>
      )}
    </Wrapper>
  );
};

export default LicenseButton;
