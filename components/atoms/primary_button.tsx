import styled from "styled-components";

const PrimaryButton = styled.button`
  background-color: ${({ theme, color }) =>
    color ? theme[color] : theme.primary};
  border: none;
  color: white;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${({ theme, hoverColor }) => theme[hoverColor]};
  }
`;

export default PrimaryButton;
