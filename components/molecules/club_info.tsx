import { useContext } from "react";
import styled from "styled-components";
import { ClubContext } from "../../pages/index";
import { useLocalStorage } from "../../middleware/hooks";
const Wrapper = styled.div`
  color: ${({ theme }) => theme.lightDark};
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
    margin: 4px 0;
  }

  & span {
    margin-right: 16px;
  }
`;

const Bold = styled.p`
  font-weight: bold;
  margin-right: 3px;
  color: ${({ theme }) => theme.darkLight};
`;
const ClubInfo = ({ clubData }) => {
 // console.log(clubData);
  return (
    <Wrapper>
      <div>
        <Bold>Klub: </Bold> <span> {clubData.name}</span>
        {
          clubData.applications[0]?.statuses?.name ? 
      <>  <Bold>Typ licencji:</Bold> {clubData.applications[0]?.statuses?.name}</> : null
        }
      </div>
      <div>
        <Bold>Liga:</Bold> <span> {clubData.leauge}</span>
        <Bold>Data ważności licencji:</Bold>
      </div>
    </Wrapper>
  );
};

export default ClubInfo;
