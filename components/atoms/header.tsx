import styled from 'styled-components';

const Header = styled.h1`
  padding: 40px 0;
  color: ${({ theme, color }) => (color ? theme[color] : theme.dark)};
  font-weight: 600;
  font-size: 32px;
`;

export default Header;
