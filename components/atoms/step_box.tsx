import styled from "styled-components";
import { Check } from "@styled-icons/boxicons-regular/Check";
const Wrapper = styled.div`
  color: ${({ active }) => (active ? "white" : "black")};
  background: ${({ active, theme, completed }) =>
    active ? theme.primary : "transparent"};
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;

  width: 180px;
  position: relative;
  &::after {
    //\u25B2
    content: "";
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
    color: transparent;
    font-size: 20px;
    /* transform: rotate(90deg); */
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid
      ${({ theme, active }) => (active ? theme.primary : "")};

    border-bottom: 10px solid transparent;
    position: absolute;
    right: -10px;
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
  color: ${({ completed }) => (completed ? "#3dba77" : "inherit")};
`;

const HelperText = styled.p`
  font-size: 12px;
`;

const StyledCheck = styled(Check)`
  fill: #3dba77;
  width: 20px;
`;
const StepBox = ({ number, text, helperText, active, completed }) => {
  return (
    <Wrapper completed={completed} active={active}>
      <Number>{completed ? <StyledCheck /> : number}</Number>
      <div>
        <Header completed={completed}>{text}</Header>
        <HelperText>{helperText}</HelperText>
      </div>
    </Wrapper>
  );
};

export default StepBox;
