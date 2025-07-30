import { useContext } from 'react';
import styled from 'styled-components';
import { ClubContext } from '../../pages/index';
import { convertLeauge, createSeasons } from '../../middleware/utils';
const Wrapper = styled.div`
  color: ${({ theme }) => theme.darkLight};
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
  & div {
    display: flex;
    margin: 4px 0;
  }

  & span {
    margin-right: 16px;
  }
`;

const Club = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bold = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 3px;
  justify-content: center;
  color: ${({ theme }) => theme.darkLight};
`;
const ClubInfo = ({ clubData }) => {
  console.log('clubData', clubData);
  if (!clubData?.applications) {
    return <p></p>;
  }
  const renderLicense = () => {
    if (!clubData?.applications) {
      return null;
    }
    switch (clubData.applications[0].statuses.id) {
      case 8:
      case 9:
      case 10:
      case 11:
        return (
          <Club>
            <Bold>Typ licencji:</Bold>
            <p>{clubData.applications[0].statuses.name}</p>
          </Club>
        );
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      <Club>
        <Bold>Klub:</Bold>
        <p>{clubData.name}</p>
      </Club>
      {renderLicense()}
      <Club>
        <Bold>Liga:</Bold>
        <p>{convertLeauge(clubData.leauge)}</p>
      </Club>
      <Club>
        {clubData.applications[0].statuses.id > 7 ? (
          <>
            <Bold>Licencja ważna na sezon/y:</Bold> <p>{clubData.applications[0].seasons}</p>
          </>
        ) : null}
      </Club>
    </Wrapper>
  );
};

export default ClubInfo;
