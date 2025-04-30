import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Loader from "../atoms/loader";
import PrimaryButton from "../atoms/primary_button";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { toast } from "react-toastify";
import ErrorMessage from "../atoms/error_message";

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
const Background = styled.div<{visible: boolean}>`
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
  align-items: flex-start;
  text-align: start;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  min-height: 200px;
  font-family: inherit;
  padding: 4px;
`;
const SendAbnormalitites = ({ visible, setVisible, clubData }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(visible);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setError(
        "Aby wysłać nieprawidłowości należy opsiać je poniżej w polu tekstowym"
      );
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/applications/sendAbnormalities", {
        reason: text,
        club: {
          name: clubData.name,
          email: clubData.email,
        },
      });
      setLoading(false);
      toast.info("Nieprawidłowości zgłoszone", {
        autoClose: 2000,
      });
      setText("");
      setVisible(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(
        "Nie udało się zgłosić nieprawidłowości,spróbuj ponownie za chwilę"
      );
    }
  };

  const handleChange = (e) => {
    setError("");
    setText(e.target.value);
  };
  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <Close onClick={handleClose} />{" "}
        <h3 style={{ marginBottom: "32px" }}>
          Zgłoś nieprawidłowości w fakturze
        </h3>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <TextArea
          placeholder="Opisz nieprawidłowości jakie wystąpiły w Twojej fakturze"
          value={text}
          onChange={handleChange}
        ></TextArea>
        {loading ? (
          <Loader />
        ) : (
          <PrimaryButton
            type="button"
            style={{ marginTop: "24px", width: "130px" }}
            onClick={handleSubmit}
          >
            Wyślij
          </PrimaryButton>
        )}
      </Content>
    </Background>
  );
};

export default SendAbnormalitites;
