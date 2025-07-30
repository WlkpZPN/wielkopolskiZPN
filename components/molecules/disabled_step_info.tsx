import styled from 'styled-components';

import PrimaryButton from '../atoms/primary_button';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DisabledStepInfo = ({ setStep }) => {
  return (
    <Wrapper>
      <Content>
        <Paragraph>
          Etap ten nie dotyczy Twojej klasy rozgrywkowej. Przejdź do kolejnego kroku
        </Paragraph>
        <PrimaryButton onClick={() => setStep(4)}>Kolejny krok</PrimaryButton>
      </Content>
    </Wrapper>
  );
};

export default DisabledStepInfo;
