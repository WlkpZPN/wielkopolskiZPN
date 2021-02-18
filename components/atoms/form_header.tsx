import styled from "styled-components";

const FormHeader = styled.div`
  padding: 6px 16px;
  background: #dedede;
  width: 100%;
  margin: 12px 0;
  font-weight: bold;
  color: ${({ theme }) => theme.darkLight};
  margin-left: -8px;
`;

export default FormHeader;
