import styled from "styled-components";

const TableRow = styled.div`
  display: grid;

  grid-template-columns:
    40px 60px minmax(100px, 150px) minmax(60px, 350px) 70px 80px 150px
    auto;
  grid-template-rows: 1;
  padding: 8px 24px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
  grid-gap: 32px;
  transition: all 0.2s;
  justify-items: start;
  align-items: center;
  position: relative;
  cursor: pointer;

  & span {
  }
  &:hover {
    background: #dedede;
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    &:hover {
      background-color: #f9fafb;
    }
  }
`;

export default TableRow;
