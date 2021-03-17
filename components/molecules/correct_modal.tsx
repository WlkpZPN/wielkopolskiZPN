import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import PrimaryButton from "../atoms/primary_button";
import Label from "../atoms/form_label";
import Loader from "../atoms/loader";
import RadioSquare from "../molecules/form_radio";
import ApplicationStatus from "../atoms/application_status";
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 9;
`;

const Content = styled.div`
  border-radius: 5px;
  padding: 42px;
  max-width: 1000px;
  margin: 32px;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const StyledLabel = styled(Label)`
  display: flex;
  margin: 12px 0;
  cursor: pointer;
  font-size: 16px;
  flex-direction: row;
`;

const TextArea = styled.textarea`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-family: inherit;
  width: 100%;
  padding: 3px;
  min-height: 150px;
`;

const CorrectModal = ({ internalId, id, visible, setVisibile }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const [data, setData] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
  });
  const handleChange = (field, value) => {
    let newData = data;
    newData[field] = value;
    console.log(newData);
    setData(Object.assign({ [field]: value }, data));
  };

  const sendImprovments = async (e) => {
    e.preventDefault();
    const steps = JSON.stringify(data);
    setLoading(true);
    //console.log(JSON.parse(step));
    await await axios.post("/api/applications/addCorrections", {
      steps: steps,
      description: description,
      applicationID: id,
    });

    setLoading(false);
    toast.warn("Wniosek oznaczony jako do poprawy", {
      autoClose: 1500,
    });
    setVisible(false);
    router.replace(router.asPath);
  };
  return (
    <Background visible={visible}>
      <Content>
        <Close onClick={() => setVisibile(false)} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingRight: "30px",
              }}
            >
              <h1>Wniosek {internalId} oznacz jako do poprawy</h1>{" "}
              <ApplicationStatus size="32px" status={"do poprawy"} />
            </div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "24px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.5)",
                  marginBottom: "8px",
                }}
              >
                {" "}
                Podaj treść uzasadnienia
              </span>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="uzasadnienie"
              ></TextArea>
              <p
                style={{
                  margin: "32px 0 16px 0",
                  fontWeight: "bold",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                Wybierz etapy procesu licencyjnego,ktore klub musi poprawić
              </p>
              <StyledLabel>
                <RadioSquare
                  value={data.one}
                  handleChange={(e) => handleChange("one", !data.one)}
                />
                Etap 1 - Podstawowe dane
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.two}
                  handleChange={(e) => handleChange("two", !data.two)}
                />
                Etap 2 - Kryteria prawne
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.three}
                  handleChange={(e) => handleChange("three", !data.three)}
                />
                Etap 3 - Kryteria sportowe
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.four}
                  handleChange={(e) => handleChange("four", !data.four)}
                />
                Etap 4 - Kryteria infrastrukturalne
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.five}
                  handleChange={(e) => handleChange("five", !data.five)}
                />
                Etap 5 - Kryteria finansowe
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.six}
                  handleChange={(e) => handleChange("six", !data.six)}
                />
                Etap 6 - Kryteria personalne
              </StyledLabel>
              <StyledLabel>
                <RadioSquare
                  value={data.seven}
                  handleChange={(e) => handleChange("seven", !data.seven)}
                />
                Etap 7 - Załączniki
              </StyledLabel>
              <div style={{ marginTop: "32px" }}>
                <PrimaryButton
                  onClick={() => setVisibile(false)}
                  color="dangerDark"
                  hoverColor="danger"
                  type="button"
                  style={{ marginRight: "12px" }}
                >
                  Anuluj
                </PrimaryButton>
                <PrimaryButton
                  onClick={sendImprovments}
                  color="warning"
                  hoverColor="warningDark"
                  type="submit"
                >
                  Do poprawy
                </PrimaryButton>
              </div>
            </form>{" "}
          </>
        )}
      </Content>
    </Background>
  );
};

export default CorrectModal;
