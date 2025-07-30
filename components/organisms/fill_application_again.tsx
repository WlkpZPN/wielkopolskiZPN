import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FillApplicationAgain = () => {
  return (
    <Wrapper>
      <h1>Złóż wniosek licencyjny na kolejny sezon</h1>
      <p style={{ opacity: '0.8', fontWeight: 'bold' }}>
        Ruszył proces licencyjny na kolejny sezon.
      </p>
      <p>
        Możesz teraz z łatwością ubiegać się ponownie o licencję używając wniosku częściowo
        uzupełnionego poprzednimi danymi danymi{' '}
      </p>
    </Wrapper>
  );
};

export default FillApplicationAgain;
