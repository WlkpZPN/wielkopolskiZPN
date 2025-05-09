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
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  border-radius: 5px;
  max-height: 90vh;
  overflow: auto;
`;
const NewMessageModal = ({ visible, setVisible }) => {
  const router = useRouter();
  const [recipients, setRecipients] = useState("aktywne");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rule, setRule] = useState("brak");
  const [error, setError] = useState("");

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  const addNewMessage = async (e) => {
    e.preventDefault();

    if (!recipients || title.trim() === "" || message.trim() === "") {
      setError("Proszę wpisać pytanie oraz podać odpowiedź");
      return;
    }
    setLoading(true);
    axios
      .post("/api/settings/addNewMessage", {
        recipients,
        title,
        message,
        rule,
      })
      .then(() => {
        setLoading(false);
        toast.success("Pomyślnie dodano pytanie", {
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

  const sendMessage = async (e) => {
    addNewMessage(e);
    setLoading(true);
    try {
      await axios.post("/api/mails/sendMails", {
        recipients,
        title,
        message,
      });
      setLoading(false);
      toast.success("Wiadomości wysłane", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Wysyłanie wiadomości nie udało się,spróbuj ponownie", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <CloseIcon onClick={() => setVisible(false)} />
        <form style={{ width: "100%" }} onSubmit={addNewMessage}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ margin: "24px 0" }}>Dodaj nową wiadomość grupową</h1>
            {loading && <Loader />}
          </div>
          <ErrorMessage> {error}</ErrorMessage>
          <span style={{ fontWeight: "bold" }}> Grupa odbiorców</span>
          <Select
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          >
            <option value="aktywne">Kluby aktywne</option>
            <option value="nieaktywne">Kluby nieaktywne</option>
            <option value="nierozpoczęte">Wnioski nierozpoczęte</option>
            <option value="zatwierdzone">Wnioski zatwierdzone</option>
            <option value="wszystkie">Wszystkie kluby</option>
          </Select>
          <Label>
            Tytuł wiadomości
            <Input
              type="text"
              value={title}
              placeholder="Tytuł"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Label>
          <span style={{ fontWeight: "bold" }}> Reguła (opcjonalnie)</span>
          <Select
            style={{ marginBottom: "32px" }}
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          >
            <option value="brak">Brak reguły</option>
            <option value="rozpoczęcie procesu">
              W dniu rozpoczęcia procesu
            </option>
            <option value="7 dni przed końcem procesu">
              7 dni przed końcem procesu
            </option>
          </Select>
          <span style={{ fontWeight: "bold" }}>Wiadomość</span>
          <RichTextEditor value={message} onChange={(e) => setMessage(e)} />
          <div>
            <PrimaryButton
              hoverColor="dangerDark"
              color="danger"
              type="button"
              onClick={() => setVisible(false)}
            >
              Anuluj
            </PrimaryButton>
            <PrimaryButton style={{ margin: "0 16px" }} type="submit">
              Utwórz
            </PrimaryButton>
            <PrimaryButton onClick={sendMessage} type="button">
              Wyślij
            </PrimaryButton>
          </div>
        </form>
      </Content>
    </Background>
  );
};

export default NewMessageModal;
