import styled from 'styled-components';
import { useState } from 'react';
import CloseIcon from './close_icon';
import PrimaryButton from './primary_button';
const Background = styled.div<{ visible: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background: white;
  border-radius: 5px;
  text-align: center;
`;

const Header = styled.h2``;

const Text = styled.p``;

const AlertBox = ({ title, text, visible, setVisible, cb, yesText, noText }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  return (
    <Background onClick={handleClose} visible={visible}>
      <Content>
        <CloseIcon onClick={() => setVisible(false)} />
        <Header>{title}</Header>
        <Text>{text}</Text>
        <div style={{ display: 'flex' }}>
          <PrimaryButton>{yesText}</PrimaryButton>
          <PrimaryButton>{noText}</PrimaryButton>
        </div>
      </Content>
    </Background>
  );
};

export default AlertBox;
