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

  const renderLicense = () => {
    switch (clubData.applications[0].statuses.id) {
      case 8:
      case 9:
      case 10:
      case 11:
        return (
          <>
            <Bold>Typ licencji: </Bold>{" "}
            {clubData.applications[0].statuses.name}{" "}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      <div>
        <Bold>Klub: </Bold> <span> {clubData.name}</span>
        {renderLicense()}
      </div>
      <div>
        <Bold>Liga:</Bold> <span> {clubData.leauge}</span>
        {clubData.applications[0].statuses.id > 7 ? (
          <>
            <Bold>Licencja ważna na sezony:</Bold>{" "}
            {clubData.applications[0].seasons}{" "}
          </>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default ClubInfo;
