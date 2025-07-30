import styled from 'styled-components';
import { useState } from 'react';

//components
import PrimaryButton from '../atoms/primary_button';

const Background = styled.div<{ isOpen?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Content = styled.div`
  border-radius: 5px;
  padding: 32px;
  background: white;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Modal = ({ closeFunction, title, text, yesText, noText }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
      return;
    }
  };

  return (
    <Background isOpen={isOpen}>
      <Content>
        <h3>{title}</h3>
        <p>{text}</p>
        <ButtonRow>
          <PrimaryButton>{yesText}</PrimaryButton>
          <PrimaryButton onClick={handleClose}>{noText}</PrimaryButton>
        </ButtonRow>
      </Content>
    </Background>
  );
};
export default Modal;
