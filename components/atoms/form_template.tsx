import styled from "styled-components";

const FormTemplate = styled.form`
  max-width: ${({ width }) => (width ? width : "50%")};
  width: 100%;
  margin-top: 32px;
`;

export default FormTemplate;
