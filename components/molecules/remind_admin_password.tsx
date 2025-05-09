import styled from "styled-components";
import { useState } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import axios from "axios";
import Loader from "../atoms/loader";
import { validateEmail } from "../../middleware/validation";
import Input from "../atoms/input";
import PrimaryButton from "../atoms/primary_button";
import ErrorMessage from "../atoms/error_message";
import { toast } from "react-toastify";
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

const Header = styled.h2`
  margin: 16px 0;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & input {
    width: 100%;
    margin: 32px 0;
  }
`;

const RemindAdminPasswordModal = ({ visible, setVisible }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, message } = validateEmail(email);

    if (!valid) {
      setError(message);
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/auth/remindAdminPassword", {
        userEmail: email,
      });
      setLoading(false);
      toast.success(
        "Email z hasłem został wysłany,sprawdź swoją skrzynke pocztową"
      );

      setVisible(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Wysyłanie hasła nie powiodło się,spróbuj ponownie");
      return;
    }
  };

  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <Close onClick={() => setVisible(false)} />
        <Header>Przypomnij hasło</Header>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <p>
              Nie pamiętasz hasła ? <br /> Podaj email jakiego używasz do
              logowania się na konto administracyjne, jeśli adres mailowy
              znajduje się na liście użytkowników otrzymasz na niego maila z
              hasłem. <br />
              Po zalogowaniu się możesz zmienić hasło w aplikacji.
            </p>
            <Form onChange={() => setError("")} onSubmit={handleSubmit}>
              <ErrorMessage>{error}</ErrorMessage>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="klub@wielkopolskizpn.pl"
              />

              <PrimaryButton type="submit">Wyślij</PrimaryButton>
            </Form>{" "}
          </>
        )}
      </Content>
    </Background>
  );
};

export default RemindAdminPasswordModal;
