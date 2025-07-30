import styled from 'styled-components';

const FormTemplate = styled.form<{ width?: string }>`
  max-width: ${({ width }) => (width ? width : '50%')};
  width: 100%;
  margin-top: 32px;
  position: relative;
`;

export default FormTemplate;
