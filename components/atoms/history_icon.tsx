import styled from "styled-components";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const Close = styled(CloseOutline)`
  width: 27px;
  color: white;
`;

const StyledCheck = styled(Check)`
  color: white;
  width: 50px;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  font-weight: bold;
  margin-right: 12px;
  background: ${({ color }) => color};
  position: relative;
  margin-bottom: 32px;
  &::after {
    content: "";
    display: ${({ hidden }) => (hidden ? "none" : "block")};
    background: #b5b5b5;
    height: 32px;
    bottom: -32px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    position: absolute;
  }
`;

const HistoryIcon = ({ number, state, hidden }) => {
  const renderIcon = () => {
    switch (state) {
      case "completed":
        return (
          <Icon hidden={hidden} color="#02A54D">
            <StyledCheck />
          </Icon>
        );
      case "default":
        return (
          <Icon hidden={hidden} color="#B5B5B5">
            {number}
          </Icon>
        );
      case "warning":
        return (
          <Icon hidden={hidden} color="#D3E500">
            <Close />
          </Icon>
        );
      case "error":
        return (
          <Icon hidden={number === 5 ? true : false} color="#D10101">
            <Close />
          </Icon>
        );
      default:
        return (
          <Icon hidden={number === 5 ? true : false} color="#B5B5B5">
            {number}
          </Icon>
        );
    }
  };

  return renderIcon();
};

export default HistoryIcon;
