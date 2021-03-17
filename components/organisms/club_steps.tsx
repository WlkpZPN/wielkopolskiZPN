import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Check } from "@styled-icons/boxicons-regular/Check";
import Loader from "../atoms/loader";
const StyledCheck = styled(Check)`
  color: white;
  width: 90%;
`;

const Number = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;

  position: relative;
  background: ${({ completed, theme }) => (completed ? "#00A54C" : "#B5B5B5")};
  margin-bottom: 36px;
  margin-right: 16px;
  color: white;
  & span {
    display: ${({ completed, theme }) => (completed ? "none" : "block")};
  }
  &:after {
    content: "";
    display: ${({ hidden }) => (hidden ? "none" : "block")};
    position: absolute;
    bottom: -36px;
    left: 50%;
    /* transform: translateX(50%); */
    width: 1px;
    background: #b5b5b5;
    height: 36px;
    z-index: 100;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 32px 0;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Text = styled.p`
  margin-top: 14px;
  max-width: 400px;
`;

const ClubSteps = ({ history, paymentLink }) => {
  console.log(history);
  const [steps, setSteps] = useState({
    stepOne: {
      completed: false,
      date: "",
    },
    stepTwo: {
      completed: false,
      date: "",
      link: "",
    },
    stepThree: {
      completed: false,
      date: "",
    },
    stepFour: {
      completed: false,
      date: "",
    },
    stepFive: {
      completed: false,
      date: "",
      reason: "",
    },
  });

  const generateSteps = async () => {
    let helperObj = steps;

    history.forEach((step) => {
      switch (step.status_id) {
        case 2:
        case 3:
          helperObj.stepOne = {
            date: step.created_at,
            completed: true,
          };
          return;
        case 6:
          helperObj.stepTwo = {
            date: step.created_at,
            completed: true,
            link: paymentLink || "",
          };
          return;
        case 7:
          helperObj.stepThree = {
            date: step.created_at,
            completed: true,
          };
          return;
        case 8:
          helperObj.stepFive = {
            date: step.created_at,
            completed: true,
            reason: "",
          };
          return;
        case 9:
          helperObj.stepFive = {
            date: step.created_at,
            completed: true,
            reason: step.description,
          };
          return;
      }
    });

    setSteps(helperObj);
  };
  useEffect(() => {
    generateSteps();
  }, [history]);

  return (
    <Wrapper>
      <Step>
        <Number completed={steps.stepOne.completed}>
          {" "}
          <StyledCheck /> <span>1</span>
        </Number>
        <Text>
          Złożenie wniosku licencyjnego w terminie <br /> {steps.stepOne.date}{" "}
        </Text>
      </Step>
      <Step>
        <Number completed={steps.stepTwo.completed}>2</Number>
        <Text>
          Akceptacja wniosku licencyjnego przez Wielkopolski ZPN oraz link do
          płatności za wniosek przesłany na maila Klubu
        </Text>
      </Step>
      <Step>
        <Number completed={steps.stepThree.completed}>3</Number>
        <Text>Dokonanie płatności przez klub</Text>
      </Step>
      <Step>
        <Number completed={steps.stepThree.completed}>4</Number>
        <Text>Weryfikacja płatności przez Wielkopolski ZPN</Text>
      </Step>
      <Step>
        <Number completed={steps.stepFive.completed} hidden>
          5
        </Number>
        <Text>Decyzja Komisji Licenzyjnej Wielkopolskiego ZPN</Text>
      </Step>
    </Wrapper>
  );
};

export default ClubSteps;
