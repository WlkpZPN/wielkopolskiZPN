import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styled from "styled-components";
import ApplicationStatus from "../atoms/application_status";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import Label from "../atoms/form_label";
import RadioSquare from "../molecules/form_radio";
import PrimaryButton from "../atoms/primary_button";
import ErrorMessage from "../atoms/error_message";
import Loader from "../atoms/loader";
const Close = styled(CloseOutline)`
  width: 32px;
  color: black;
  transition: all 0.2s;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.danger};
  }
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const Content = styled.div`
  max-width: 1000px;
  padding: 42px;
  background: white;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  min-height: 200px;
  font-family: inherit;
  padding: 4px;
`;

const RejectModal = ({
  visible,
  setVisible,
  applicationID,
  internalID,
  userID,
}) => {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  const rejectApplication = async (e) => {
    e.preventDefault();

    if (!reason) {
      setError("Proszę podać powód odrzucenia wniosku");
      return;
    }

    setLoading(true);
    await axios.post("/api/applications/rejectApplication", {
      reason: reason,
      applicationID: applicationID,
      userID,
    });

    setLoading(false);
    setVisible(false);
    toast.error(`Wniosek ${internalID} odrzucony`, {
      autoClose: 1500,
    });
    router.replace(router.asPath);
  };
  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <Close onClick={() => setVisible(false)} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          <h1>Wniosek {internalID} oznacz jako odrzucony</h1>
          <ApplicationStatus size="32px" status={"odrzucony"} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <form style={{ width: "100%" }}>
            <ErrorMessage>{error}</ErrorMessage>
            <Label>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.6)",
                  marginBottom: "6px",
                }}
              >
                Podaj treść uzasadnienia
              </p>
              <TextArea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Uzasadnienie"
              ></TextArea>
            </Label>

            <div style={{ display: "flex" }}>
              <PrimaryButton
                color="dangerDark"
                hoverColor="danger"
                onClick={() => setVisible(false)}
                style={{ marginRight: "16px" }}
              >
                Anuluj
              </PrimaryButton>
              <PrimaryButton
                color="dangerDark"
                hoverColor="danger"
                onClick={rejectApplication}
              >
                Odrzuć
              </PrimaryButton>
            </div>
          </form>
        )}
      </Content>
    </Background>
  );
};

export default RejectModal;
