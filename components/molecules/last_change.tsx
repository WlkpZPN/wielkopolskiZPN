import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 12px 24px;
  background: #dedede;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;
  width: 100%;
  margin: 24px 0;
  color: ${({ theme }) => theme.darkLight};
  border-radius: 8px;
`;

const LastChange = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Wrapper>
      <p style={{ fontWeight: 'bold' }}>Ostatnia aktualizacja</p>
      <p>{children}</p>
    </Wrapper>
  );
};

export default LastChange;
