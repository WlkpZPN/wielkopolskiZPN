import styled from "styled-components";

const ObjectName = styled.div`
  width: 200px;
  padding: 6px 16px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

export default ObjectName;
