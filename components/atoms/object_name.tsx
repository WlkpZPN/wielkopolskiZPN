import styled from "styled-components";

const ObjectName = styled.div`
  width: 200px;
  padding: 6px 16px;
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.primary} ` : "2px solid rgba(0, 0, 0, 0.2)"};
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: wrap;
`;

export default ObjectName;
