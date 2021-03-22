import styled from "styled-components";
import { Close } from "@styled-icons/evaicons-solid/Close";

const CloseIcon = styled(Close)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 35px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.danger};
  }
`;

export default CloseIcon;
