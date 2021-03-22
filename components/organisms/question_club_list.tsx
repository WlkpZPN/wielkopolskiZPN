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
  console.log(questions);

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
  return (
    <div>
      <Header>Proces składania wniosku licencyjnego</Header>
      {renderList("Proces składania wniosku")}
      <Header>Płatności</Header>
      {renderList("Płatności")}
      <Header>Decyzje Komisji Licencyjnej</Header>
      {renderList("Decyzje Komisji Licencyjnej")}
      <Header>Inne</Header>
      {renderList("Inne")}
    </div>
  );
};

export default QuestionClubList;
