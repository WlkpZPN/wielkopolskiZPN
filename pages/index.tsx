import { useState } from "react";
import styled from "styled-components";

//utils
import { protectedClientRoute } from "../middleware/protectedClient";

//components

import ClientLayout from "../components/organisms/client_layout";
import StepBox from "../components/atoms/step_box";
import ClubApplication from "../components/organisms/club_application";

const Header = styled.h1`
  margin-bottom: 16px;
`;

const Home = () => {
  const [view, setView] = useState("Wniosek licencyjny");
  const [step, setStep] = useState(1);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <ClientLayout view={view} setView={setView}>
      <Header>Złóż wniosek licencyjny</Header>
      <ClubApplication />
    </ClientLayout>
  );
};

export default Home;
