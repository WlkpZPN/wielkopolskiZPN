import styled from "styled-components";
import { useState, useEffect } from "react";
//components
import { getClubData, getFaqData } from "../middleware/swr";

import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";
import Paragraph from "../components/atoms/paragraph";
import PrimaryButton from "../components/atoms/primary_button";

import Loader from "../components/atoms/loader";

import SearchBar from "../components/atoms/search_bar";
import QuestionClubList from "../components/organisms/question_club_list";
import AskQuestionModal from "../components/organisms/ask_question_modal";
import Header from "../components/atoms/header";

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

const Pomoc = ({ authData }) => {
  const { clubData, isError, isLoading } = getClubData(authData.id);
  const { faq, isFaqError, isFaqLoading } = getFaqData();
  console.log(faq);
  //console.log(faq);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [list, setList] = useState(faq);

  useEffect(() => {
    let helperArr = faq;

    if (query !== "") {
      helperArr = helperArr.filter((question) => {
        return JSON.stringify(question)
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
          ? true
          : false;
      });
    }
    setList(helperArr);
  }, [query, faq]);

  if (isLoading || isFaqLoading) {
    return (
      <ClientLayout clubData={authData} view="Pomoc">
        <Loader />
      </ClientLayout>
    );
  } else {
    return (
      <ClientLayout clubData={clubData} view="Pomoc">
        <Header>Pomoc / FAQ</Header>

        {/* <Paragraph style={{ color: "black" }}>O co chcesz zapytać ?</Paragraph>
        <div>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Pytanie"
          />
        </div>
        {list ? (
          <QuestionClubList questions={list} />
        ) : (
          <p>Brak pytań do wyświetlenia</p>
        )} */}

        <Footer>
          <h2>Nie znalazłaś/eś odpowiedzi?</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PrimaryButton onClick={() => setVisible(true)}>
              Dodaj pytanie
            </PrimaryButton>

            <StyledLink href="mailto:licencje@wielkopolskizpn.pl">
              licklub@wielkopolskizpn.pl
            </StyledLink>
          </div>
        </Footer>
        <AskQuestionModal visible={visible} setVisible={setVisible} />
      </ClientLayout>
    );
  }
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    return {
      props: {
        authData: data,
      },
    };
  }
);

export default Pomoc;
