import styled from "styled-components";

const Input = styled.input`
  width: ${({ size }) => size};
  margin-top: 4px;
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: black;
  font-size: 16px;
  outline: none;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
`;

export default Input;
