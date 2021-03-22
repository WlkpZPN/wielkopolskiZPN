import styled from "styled-components";

const PrimaryButton = styled.button`
  background-color: ${({ theme, color }) =>
    color ? theme[color] : theme.primary};
  border: none;
  color: white;
  font-size: 15px;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "inherit")};
  width: ${({ width }) => (width ? width : "initial")};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;

  outline: none;
  &:hover {
    background-color: ${({ theme, hoverColor }) =>
      hoverColor ? theme[hoverColor] : theme.primaryLight};
  }
`;

export default PrimaryButton;
