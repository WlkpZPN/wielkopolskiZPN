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
import QuestionsList from "../../../../components/organisms/questions_list";
import LicenseDecision from "../../../../components/atoms/license_decision";
import RichTextEditor from "../../../../components/organisms/rich_text_editor";
const Application = ({ authData, allQuestions, settings, question }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState(
    question.category || "Proces składania wniosku"
  );
  const [questionText, setQuestionText] = useState(question.question || "");
  const [answer, setAnswer] = useState(question.answer || "");
  const [error, setError] = useState("");

  const deleteQuestion = async (questionID) => {
    setLoading(true);
    axios
      .post("/api/settings/deleteQuestion", {
        questionID,
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

  const updateQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/settings/updateQuestion", {
        ID: question.id,
        question: questionText,
        category,
        answer,
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
    <AdminLayout view="wnioski" userData={authData}>
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
              Pytanie nr {question.id}
            </h1>
            <Link href="/admin/ustawienia">
              <IconButton>
                <ControllerFastBackward />
                Powrót
              </IconButton>
            </Link>
          </span>
        </div>
        {question.updated_at && <LastChange>{question.updated_at}</LastChange>}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      <form
        style={{ width: "100%", maxWidth: "900px" }}
        onChange={() => setError("")}
        onSubmit={updateQuestion}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: "24px 0" }}>Nowe pytanie do FAQ</h1>
          {loading && <Loader />}
        </div>
        <ErrorMessage> {error}</ErrorMessage>
        <span style={{ fontWeight: "bold" }}>Grupa pytań</span>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          <Input
            type="text"
            value={questionText}
            placeholder="pytanie"
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Label>
        <span style={{ fontWeight: "bold" }}>Odpowiedź</span>
        <RichTextEditor value={answer} onChange={(e) => setAnswer(e)} />
        <div>
          <PrimaryButton
            style={{ marginRight: "16px" }}
            hoverColor="dangerDark"
            color="danger"
            type="button"
            onClick={() => deleteQuestion(question.id)}
          >
            Usuń pytanie
          </PrimaryButton>
          <PrimaryButton color="success" hoverColor="sucessDark" type="submit">
            Zapisz zmiany
          </PrimaryButton>
        </div>
      </form>

      <h1 style={{ margin: "40px 0 24px 0" }}> Inne pytania do działu FAQ </h1>
      <QuestionsList questions={allQuestions} />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const settings = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  });

  const questions = await prisma.frequently_asked_questions.findMany();
  const question = await prisma.frequently_asked_questions.findUnique({
    where: {
      id: parseInt(context.params.question),
    },
  });

  return {
    props: {
      authData: data,
      allQuestions: questions,
      question: question,
      settings: settings,
    },
  };
});

export default Application;
