import styled from "styled-components";
import QuestionItem from "../atoms/question_item";

const Header = styled.h2`
  margin: 24px 0;
  margin-top: 32px;
`;

const Footer = styled.div`
  margin: 24px 0;
`;
const QuestionClubList = ({ questions }) => {
  const renderList = (category) => {
    let helperArr = [];

    questions.forEach((question) => {
      if (question.category === category) {
        helperArr.push(<QuestionItem key={question.id} question={question} />);
      }
    });

    if (helperArr.length === 0) {
      return <p>Brak pytań</p>;
    }

    return helperArr;
  };

  const arrOne: any = renderList("Proces składania wniosku");
  const arrTwo: any = renderList("Płatności");
  const arrThree: any = renderList("Decyzje Komisji Licencyjnej");
  const arrFour: any = renderList("Inne");
  return (
    <div>
      {arrOne.length > 0 ? (
        <>
          {" "}
          <Header>Proces składania wniosku</Header> {arrOne}{" "}
        </>
      ) : null}
      {arrTwo.length > 0 ? (
        <>
          {" "}
          <Header>Płatności</Header> {arrTwo}{" "}
        </>
      ) : null}

      {arrThree.length > 0 ? (
        <>
          {" "}
          <Header>Decyzje Komisji Licencyjnej</Header> {arrThree}{" "}
        </>
      ) : null}
      {arrFour.length > 0 ? (
        <>
          {" "}
          <Header>Inne</Header> {arrFour}{" "}
        </>
      ) : null}
    </div>
  );
};

export default QuestionClubList;
