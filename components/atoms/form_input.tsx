import styled from "styled-components";

const Input = styled.input`
  width: ${({ size }) => size};
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: black;
  font-size: 15px;
`;

export default Input;
