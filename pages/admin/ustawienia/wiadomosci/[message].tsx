import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import prisma from "../../../../middleware/prisma";
import { protectedAdminRoute } from "../../../../middleware/protectedAdmin";
import AdminLayout from "../../../../components/organisms/admin_layout";
import IconButton from "../../../../components/atoms/IconButton";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
import PrimaryButton from "../../../../components/atoms/primary_button";
import Link from "next/link";
import Loader from "../../../../components/atoms/loader";
import LastChange from "../../../../components/molecules/last_change";
import Paragraph from "../../../../components/atoms/paragraph";
import AddFilesWrapper from "../../../../components/organisms/add_files_wrapper";
import ErrorMessage from "../../../../components/atoms/error_message";
import Input from "../../../../components/atoms/input";
import Select from "../../../../components/atoms/form_select";
import Label from "../../../../components/atoms/form_label";
import RichTextEditor from "../../../../components/organisms/rich_text_editor";
import GroupMessages from "../../../../components/organisms/group_messages";
const Application = ({ authData, allMessages, settings, message }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [recipients, setRecipients] = useState(message.recipients || "aktywne");
  const [title, setTitle] = useState(message.title || "");
  const [messageText, setMessageText] = useState(message.message || "");
  const [rule, setRule] = useState(message.rule || "brak");
  const [error, setError] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

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
  const deleteMessage = async () => {
    setLoading(true);
    axios
      .post("/api/settings/deleteMessage", {
        messageID: message.id,
      })
      .then(() => {
        toast.error("Pytanie usunięte");
        router.replace(router.asPath);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Usuwanie pytania,nie powiodło się, prosimy spróbuj jeszcze raz"
        );
        setLoading(false);
      });
  };

  const updateMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/settings/updateMessage", {
        messageID: message.id,
        title,
        recipients,
        rule,
        message: messageText,
      })
      .then(() => {
        toast.success("Zapisano zmiany");
        router.replace(router.asPath);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Nie udało się zapisać zmian,spróbuj ponownie");
        setLoading(false);
      });
  };

  return (
    <AdminLayout view="ustawienia" userData={authData}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "32px 0",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex" }}>
          <span>
            <h1
              style={{
                marginRight: "32px",
                marginTop: "-3px",
                marginBottom: "15px",
              }}
            >
              Wiadomość nr {message.id}
            </h1>
            <Link href="/admin/ustawienia">
              <IconButton>
                <ControllerFastBackward />
                Powrót
              </IconButton>
            </Link>
          </span>
        </div>
        {message.send_date && <LastChange>{message.send_date}</LastChange>}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      <form style={{ width: "100%" }} onSubmit={updateMessage}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: "24px 0" }}>Nowe pytanie do FAQ</h1>
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
        <RichTextEditor
          value={messageText}
          onChange={(e) => setMessageText(e)}
        />
        <div>
          <PrimaryButton
            hoverColor="dangerDark"
            color="danger"
            type="button"
            onClick={deleteMessage}
          >
            Usuń wiadomość
          </PrimaryButton>
          <PrimaryButton
            color="success"
            hoverColor="successDark"
            style={{ margin: "0 16px" }}
            type="submit"
          >
            Zapisz zmiany
          </PrimaryButton>
          <PrimaryButton onClick={sendMessage} type="button">
            Wyślij ponownie
          </PrimaryButton>
        </div>
      </form>

      <h1 style={{ margin: "40px 0 24px 0" }}> Inne wiadomości grupowe </h1>
      <GroupMessages messages={allMessages} />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const settings = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  });

  const messages = await prisma.messages.findMany();
  const message = await prisma.messages.findUnique({
    where: {
      id: parseInt(context.params.message),
    },
  });

  return {
    props: {
      authData: data,
      allMessages: messages,
      message: message,
      settings: settings,
    },
  };
});

export default Application;
