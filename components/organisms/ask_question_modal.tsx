import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import Select from "../atoms/form_select";
import PrimaryButton from "../atoms/primary_button";
import CloseIcon from "../atoms/close_icon";
import Loader from "../atoms/loader";
import Label from "../atoms/form_label";
import Input from "../atoms/input";
import RichTextEditor from "./rich_text_editor";
import ErrorMessage from "../atoms/error_message";
const Background = styled.div<{visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 100;
`;

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 42px;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  border-radius: 5px;
  font-size: 13px;
  max-height: 90vh;
  overflow: auto;
`;

const TextArea = styled.textarea`
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  height: 200px;
  margin-top: 4px;
  font-family: inherit;
  padding: 4px;
`;

const Bold = styled.span`
  margin-bottom: 10px;
  font-weight: bold;
`;

const AskQuestionModal = ({ visible, setVisible, authData }) => {
  const router = useRouter();
  const [category, setCategory] = useState("Proces składania wniosku");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const [error, setError] = useState("");

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  const askQuestion = async (e) => {
    e.preventDefault();

    if (!category || question.trim() === "") {
      setError("Proszę podać treść pytania");
      return;
    }
    setLoading(true);
    axios
      .post("/api/settings/askQuestion", {
        clubName: authData.name,
        question,
        category,
      })
      .then(() => {
        setLoading(false);
        toast.success("Pytanie wysłane", {
          autoClose: 2000,
        });
        setVisible(false);
        router.replace(router.asPath);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Wystąpił błąd podczas dodawania pytania,spróbuj ponownie");
        return;
      });
  };

  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <CloseIcon onClick={() => setVisible(false)} />
        <form style={{ width: "60%" }} onSubmit={askQuestion}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ margin: "24px 0" }}>Dodaj pytanie do FAQ</h1>
            {loading && <Loader />}
          </div>
          <ErrorMessage> {error}</ErrorMessage>
          <Bold> Kategoria pytania </Bold>
          <Select
            style={{ marginTop: "6px", fontSize: "13px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Proces składania wniosku">
              Proces składania wniosku
            </option>
            <option value="Płatności">Płatności</option>
            <option value="Decyzje Komisji Licencyjnej">
              Decyzje Komisji Licencyjnej
            </option>
            <option value="Inne">Inne</option>
          </Select>
          <Label>
            Pytanie
            <TextArea
              style={{ marginTop: "6px", fontSize: "13px" }}
              value={question}
              placeholder="Treść pytania"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Label>
          <div>
            <PrimaryButton
              color="primaryLight"
              hoverColor="primary"
              type="submit"
            >
              Dodaj pytanie
            </PrimaryButton>
          </div>
        </form>
      </Content>
    </Background>
  );
};

export default AskQuestionModal;
