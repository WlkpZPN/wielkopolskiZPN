import styled from "styled-components";

const OutlineButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  transition: all 0.2s;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  align-self: ${({ align }) => (align ? align : "initial")};
  cursor: pointer;
  background: transparent;
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

export default OutlineButton;
