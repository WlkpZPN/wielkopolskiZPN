import styled from "styled-components";
import { NavigateNext } from "@styled-icons/material-outlined/NavigateNext";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
const Wrapper = styled.div`
  display: flex;

  & svg {
    width: 25px;
    cursor: pointer;
  }
`;

const NavigatePrevious = styled(NavigateNext)`
  transform: rotate(180deg);
`;

const PageNumber = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin: 0 4px;
  width: 25px;
  height: 25px;
  padding: 4px;
  border-radius: 50%;
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.primary}` : "none"};
  display: flex;
  color: ${({ active, theme }) => (active ? theme.primary : theme.dark)};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const TablePagination = ({ pages, setPage, currentPage }) => {
  console.log(pages);
  const handleNextPage = () => {
    if (currentPage < pages - 1) {
      setPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };
  const generatePages = () => {
    let helperArr = [];
    for (let i = 0; i < pages; i++) {
      helperArr.push(
        <PageNumber
          key={i}
          active={i === currentPage}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </PageNumber>
      );
    }

    return [
      helperArr[currentPage - 1],
      helperArr[currentPage],
      helperArr[currentPage + 1],
      helperArr[currentPage + 2],
    ];
  };

  if (pages === 1) {
    return null;
  }

  return (
    <Wrapper>
      <NavigatePrevious onClick={handlePreviousPage} />
      {generatePages()}
      <NavigateNext onClick={handleNextPage} />( {pages} stron)
    </Wrapper>
  );
};

export default TablePagination;
