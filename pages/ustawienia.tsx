import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { logout } from "../middleware/utils";
//components
import prisma from "../middleware/prisma";
import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";
import Paragraph from "../components/atoms/paragraph";
import PrimaryButton from "../components/atoms/primary_button";
import Input from "../components/atoms/input";
import Label from "../components/atoms/form_label";
import ErrorMessage from "../components/atoms/error_message";
const Footer = styled.div`
  margin: 64px 0 32px 0;

  & h2 {
    margin-bottom: 12px;
  }
`;

const StyledLink = styled.a`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin: 0 32px;
`;

const Pomoc = ({ authData, faq }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== newPassword2) {
      setError("Hasła nie są takie same");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/clubAuth/updatePassword", {
        oldPassword,
        newPassword,
        clubID: authData.id,
      });

      setLoading(false);
      toast.success("Hasło zmieniono pomyślnie,zaloguj się ponownie");
      logout("klub");
    } catch (error) {
      toast.error("Zmiana hasła się nie powiodła,spróbuj ponownie");
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <ClientLayout clubData={authData} view="">
      <h1 style={{ margin: "32px 0" }}>Zmień hasło</h1>
      <form
        onChange={() => setError("")}
        onSubmit={changePassword}
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <Label>
          Wpisz aktualnie uzywane hasło
          <Input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
        </Label>
        <Label>
          Wpisz nowe hasło{" "}
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
        </Label>
        <Label>
          Powtórz nowe hasło
          <Input
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            type="password"
            placeholder="*********"
          />
        </Label>
        <ErrorMessage>{error}</ErrorMessage>
        <PrimaryButton type="submit" color="success" hoverColor="successDark">
          Zapisz
        </PrimaryButton>
      </form>
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    const faq = await prisma.frequently_asked_questions.findMany();
    return {
      props: {
        authData: data,
        faq: faq,
      },
    };
  }
);

export default Pomoc;
