import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";
import { Mail } from "@styled-icons/entypo/Mail";
import TableRow from "../atoms/table_row";
import PrimaryButton from "../atoms/primary_button";
import NewMessageModal from "./new_message_modal";

const MailIcon = styled(Mail)`
  width: 26px;
  color: ${({ theme }) => theme.primary};
`;

const Wrapper = styled.div`
  margin: 24px 0;
`;

const TableHeader = styled.span`
  font-weight: bold;
`;

const StyledRow = styled(TableRow)`
  grid-template-columns:
    30px 100px minmax(50px, 100px) minmax(60px, 250px)
    minmax(200px, 350px) auto;
`;

const GroupMessages = ({ userData, messages }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const deleteMessage = async (messageID) => {
    axios
      .post("/api/settings/deleteMessage", {
        messageID,
      })
      .then(() => {
        toast.error("Wiadomość usunięta", {
          autoClose: 1500,
        });
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Usuwanie wiadomości,nie powiodło się, prosimy spróbuj jeszcze raz"
        );
      });
  };

  const renderQuestions = () => {
    let messageArr = [];
    messages.forEach((message) => {
      messageArr.push(
        <StyledRow
          onClick={() =>
            router.push(`/admin/ustawienia/wiadomosci/${message.id}`)
          }
          key={message.id}
        >
          <MailIcon />
          <span>{message.id}</span>
          <span>{message.send_date || "nie wysłano"}</span>
          <span>{message.recipients}</span>
          <span>{message.title}</span>
          <div style={{ display: "flex" }}>
            {userData.role === "administrator" && (
              <PrimaryButton
                style={{ marginRight: "8px" }}
                hoverColor="dangerDark"
                color="danger"
                onClick={() => deleteMessage(message.id)}
              >
                Usuń wiadomość
              </PrimaryButton>
            )}
            <PrimaryButton
              onClick={() =>
                router.push(`/admin/ustawienia/wiadomosci/${message.id}`)
              }
            >
              Szczegóły
            </PrimaryButton>
          </div>
        </StyledRow>
      );
    });

    return messageArr;
  };
  return (
    <Wrapper>
      <NewMessageModal visible={visible} setVisible={setVisible} />
      <StyledRow style={{ backgroundColor: "#F9FAFB" }}>
        <span></span>
        <TableHeader>ID wiadomości</TableHeader>
        <TableHeader>Data wysyłki</TableHeader>
        <TableHeader>Grupa odbiorców</TableHeader>
        <TableHeader>Tytuł</TableHeader>
        <TableHeader>Reguła</TableHeader>
      </StyledRow>
      {renderQuestions()}
      <PrimaryButton
        onClick={() => setVisible(true)}
        style={{ margin: "24px 0" }}
      >
        + Dodaj nową wiadomość grupową
      </PrimaryButton>
    </Wrapper>
  );
};

export default GroupMessages;
