import styled from "styled-components";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { Close } from "@styled-icons/remix-line/Close";
const Wrapper = styled.div`
  color: ${({ active }) => (active ? "white" : "black")};

  background: ${({ color }) => color};
  background: ${({ active, theme, color }) => (active ? theme.primary : color)};

  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  cursor: pointer;
  width: 180px;
  position: relative;
  border-left: 0px;
  &::after {
    content: "";
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
    color: transparent;
    font-size: 20px;

    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid
      ${({ theme, active }) => (active ? theme.primary : "")};
    z-index: 100;
    border-bottom: 10px solid transparent;
    position: absolute;
    right: -10px;
  }
  &:first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.3);
  }
  &:last-child {
    &::after {
      display: none;
    }
  }
`;
const Number = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

const Header = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${({ color }) => color};

  color: ${({ active, theme, color }) => (active ? "white" : color)};
`;

const HelperText = styled.p`
  font-size: 12px;
`;

const StyledCheck = styled(Check)`
  fill: #3dba77;
  width: 20px;
`;

const StyledClose = styled(Close)`
  fill: ${({ theme }) => theme.danger};
  width: 20px;
`;
const StepBox = ({
  number,
  text,
  helperText,
  active,
  state,
  handleStepChange,
}) => {
  const renderState = () => {
    switch (state) {
      case "uncompleted":
        return (
          <Wrapper
            onClick={() => handleStepChange("jump", number)}
            color="#DEDEDE"
            active={active}
          >
            <Number>{number}</Number>
            <div>
              <Header active={active} color="black">
                {text}
              </Header>
              <HelperText>{helperText}</HelperText>
            </div>
          </Wrapper>
        );

      case "completed":
        return (
          <Wrapper
            onClick={() => handleStepChange("jump", number)}
            color="transparent"
            active={active}
          >
            <Number>
              {" "}
              <StyledCheck />
            </Number>
            <div>
              <Header active={active} color="#3dba77">
                {text}
              </Header>
              <HelperText>{helperText}</HelperText>
            </div>
          </Wrapper>
        );

      case "error":
        return (
          <Wrapper
            onClick={() => handleStepChange("jump", number)}
            color="transparent"
            active={active}
          >
            <Number>
              {" "}
              <StyledClose />
            </Number>
            <div>
              <Header active={active} color="#D10101">
                {text}
              </Header>
              <HelperText>{helperText}</HelperText>
            </div>
          </Wrapper>
        );
        break;
      default:
        return (
          <Wrapper
            onClick={() => handleStepChange("jump", number)}
            color="transparent"
            active={active}
          >
            <Number> {number}</Number>
            <div>
              <Header active={active} color="black">
                {text}
              </Header>
              <HelperText>{helperText}</HelperText>
            </div>
          </Wrapper>
        );
    }
  };
  return <>{renderState()} </>;
};

export default StepBox;
