import styled from "styled-components";
import { Save } from "@styled-icons/boxicons-regular/Save";
const Wrapper = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  & p {
    display: none;
    position: absolute;
  }

  &:hover {
    & p {
      display: block;
    }
  }
`;

const SavedIcon = styled(Save)`
  width: 20px;
  margin-right: 16px;
  color: ${({ theme }) => theme.danger};
`;

const ObjectName = ({ active, onClick, saved, children }) => {
  return (
    <Wrapper onClick={onClick} active={active}>
      {saved ? null : <SavedIcon />}
      {children === "" ? "Obiekt 1" : children}
    </Wrapper>
  );
};

export default ObjectName;
