import styled from "styled-components";

const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => (direction ? direction : "column")};
  font-weight: 600;
  margin: ${({ margin }) => (margin ? margin : "24px 0")};
  position: relative;

  width: ${({ width }) => (width ? width : "100%")};
  & input[type="text"] {
    display: block;
    margin-top: 4px;
  }
  & span {
    display: flex;
    flex-wrap: nowrap;
  }
`;

export default Label;
