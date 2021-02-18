import styled from "styled-components";
import { useState } from "react";

import StepOneForm from "./step1_form";
import StepTwoForm from "./step2_form";
import StepThreeForm from "./step3_form";
import StepFourForm from "./step4_form";
import StepFiveForm from "./step5_form";
import StepSixForm from "./step6_form";
import StepBox from "../atoms/step_box";

const StepsContainer = styled.div`
  display: flex;
`;

const ClubApplication = () => {
  const [step, setStep] = useState(1);

  const handleStepChange = (type, nextStep = 0) => {
    switch (type) {
      case "next":
        if (step < 7) {
          setStep(step + 1);
        }
        break;
      case "previous":
        if (step > 1) {
          setStep(step - 1);
        }
        break;
      case "jump":
        console.log(nextStep);
        if (nextStep < step) {
          setStep(nextStep);
        }
      default:
        return null;
    }
  };
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <StepOneForm handleStepChange={handleStepChange} />;
      case 2:
        return <StepTwoForm handleStepChange={handleStepChange} />;
      case 3:
        return <StepThreeForm handleStepChange={handleStepChange} />;
      case 4:
        return <StepFourForm handleStepChange={handleStepChange} />;
      case 5:
        return <StepFiveForm handleStepChange={handleStepChange} />;
      case 6:
        return <StepSixForm handleStepChange={handleStepChange} />;
    }
  };

  return (
    <div>
      {" "}
      <StepsContainer>
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={1}
          active={step === 1}
          text="Podstawowe dane"
          helperText="Wybór klasy rozgrywkowej"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={2}
          active={step === 2}
          text="Prawo"
          helperText="Kryteria prawne"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={3}
          active={step === 3}
          text="Sport"
          helperText="Kryteria sportowe"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={4}
          active={step === 4}
          text="Obiekty"
          helperText="Kryteria infrastrukturalne"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={5}
          active={step === 5}
          text="Finanse"
          helperText="Kryteria finansowe"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={6}
          active={step === 6}
          text="Personel"
          helperText="kryteria personalne"
        />
        <StepBox
          handleStepChange={handleStepChange}
          completed={false}
          number={7}
          active={step === 7}
          text="Załączniki"
          helperText="Załącz dokumenty"
        />
      </StepsContainer>
      {renderCurrentStep()}
    </div>
  );
};

export default ClubApplication;
