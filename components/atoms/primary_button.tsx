import styled from 'styled-components';

const PrimaryButton = styled.button<{ hoverColor?: string; fontWeight?: string; width?: string }>`
  background-color: ${({ theme, color }) => (color ? theme[color] : theme.primary)};
  border: none;
  color: white;
  font-size: 13px;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
  width: ${({ width }) => (width ? width : 'initial')};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  outline: none;
  &:hover {
    background-color: ${({ theme, hoverColor }) =>
      hoverColor ? theme[hoverColor] : theme.primaryLight};
  }
`;

export default PrimaryButton;
