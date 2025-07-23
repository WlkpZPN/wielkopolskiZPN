import styled from "styled-components";

const NavItem = styled.li<{$active?: boolean}>`
  color: ${({ $active }) => ($active ? "#c6e721" : "white")};
  transition: all 0.2s;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: #c6e721;
  }
`;

export default NavItem;
