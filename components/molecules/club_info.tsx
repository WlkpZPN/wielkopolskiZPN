import styled from "styled-components";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.lightDark};
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
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
const ClubInfo = () => {
  return (
    <Wrapper>
      <div>
        <Bold>Klub: </Bold> <span> Unia Swarzędz</span>
        <Bold>Liga:</Bold>
        <Bold>Typ licencji:</Bold>
      </div>
      <div>
        <Bold>Data wystawienia licencji:</Bold>
        <Bold>Data ważności licencji:</Bold>
      </div>
    </Wrapper>
  );
};

export default ClubInfo;
