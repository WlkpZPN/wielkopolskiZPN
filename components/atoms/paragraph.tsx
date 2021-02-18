import styled from "styled-components";

const Paragraph = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.greyText};
  margin: ${({ margin }) => (margin ? margin : "16px 0")};
`;

export default Paragraph;
