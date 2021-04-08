import styled from "styled-components";

const OutlineButton = styled.button`
  padding: 6px 12px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  transition: all 0.2s;
  font-size: 13px;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  align-self: ${({ align }) => align || "initial"};
  cursor: pointer;
  background: transparent;

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

export default OutlineButton;
