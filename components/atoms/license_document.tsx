import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.primary};
`;

const License = () => {
  return (
    <Wrapper>
      <Header>WIELKOPOLSKI ZWIĄZEK PIŁKI NOŻNEJ</Header>
    </Wrapper>
  );
};

export default License;
