import styled from "styled-components";

const FormRow = styled.div`
  margin: ${({ margin }) => (margin ? margin : 0)};
  display: grid;
  grid-template-columns: ${({ cols }) =>
    cols ? `repeat(${cols},1fr)` : "repeat(2,1fr)"};
  width: 100%;
  grid-gap: 16px;
`;

export default FormRow;
