import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";
import { InfoCircle } from "@styled-icons/boxicons-solid/InfoCircle";
import TableRow from "../atoms/table_row";
import PrimaryButton from "../atoms/primary_button";
import NewQUestionModal from "../organisms/new_question_modal";

const Info = styled(InfoCircle)`
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
    50px 80px minmax(150px, 250px) minmax(150px, 250px)
    minmax(200px, 350px) auto;

  max-height: 50px;
`;

const QuestionsList = ({ questions }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const deleteQuestion = async (questionID) => {
    axios
      .post("/api/settings/deleteQuestion", {
        questionID,
      })
      .then(() => {
        toast.error("Pytanie usunięte");
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Usuwanie pytania,nie powiodło się, prosimy spróbuj jeszcze raz"
        );
      });
  };

  const renderQuestions = () => {
    let questionsArr = [];
    questions.forEach((question) => {
      questionsArr.push(
        <StyledRow key={question.id}>
          <Info />
          <span>{question.id}</span>
          <span>{question.created_at}</span>
          <span>{question.category}</span>
          <span>{question.question}</span>
          <div style={{ display: "flex" }}>
            <PrimaryButton
              style={{ marginRight: "8px" }}
              hoverColor="dangerDark"
              color="danger"
              onClick={() => deleteQuestion(question.id)}
            >
              Usuń pytanie
            </PrimaryButton>
            <PrimaryButton
              onClick={() =>
                router.push(`/admin/ustawienia/pytania/${question.id}`)
              }
            >
              Szczegóły
            </PrimaryButton>
          </div>
        </StyledRow>
      );
    });

    return questionsArr;
  };
  return (
    <Wrapper>
      <NewQUestionModal visible={visible} setVisible={setVisible} />
      <StyledRow style={{ backgroundColor: "#F9FAFB" }}>
        <span></span>
        <TableHeader>ID pytania</TableHeader>
        <TableHeader>Data dodania pytania</TableHeader>
        <TableHeader>Grupa pytań</TableHeader>
        <TableHeader>Pytanie</TableHeader>
        <div>&nbsp;</div>
      </StyledRow>
      {renderQuestions()}
      <PrimaryButton
        onClick={() => setVisible(true)}
        style={{ margin: "24px 0" }}
      >
        + Dodaj nowe pytanie
      </PrimaryButton>
    </Wrapper>
  );
};

export default QuestionsList;
