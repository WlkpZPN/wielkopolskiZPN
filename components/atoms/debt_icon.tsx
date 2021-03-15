import styled from "styled-components";
import { AttachMoney } from "@styled-icons/material/AttachMoney";

const Wrapper = styled.div`
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;
  display: flex;

  border-radius: 4px;
  font-weight: bold;
  color: white;
  font-size: 13px;
  width: max-content;
  padding: 4px 8px;
  &:hover {
    background-color: ${({ theme }) => theme.danger};
    & svg {
      color: white;
    }
    & span {
      display: inline;
    }
  }

  & span {
    display: none;
    transition: all 0.2s;
  }
`;
const Icon = styled(AttachMoney)`
  color: ${({ theme }) => theme.danger};

  width: 21px;
`;

const DebtIcon = ({ debt }) => {
  if (!debt) {
    return null;
  }

  return (
    <Wrapper>
      <Icon />
      <span>klub zadłużony!</span>
    </Wrapper>
  );
};

export default DebtIcon;
