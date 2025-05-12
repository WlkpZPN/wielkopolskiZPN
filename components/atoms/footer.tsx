import styled from "styled-components";

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.primary};
  padding: 0 6px;
  width: 100vw;
  color: white;
`;

const Content = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  height: 100%;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        Platforma licencyjna | Copyright © 2025 Wielkopolski Związek Piłki
        Nożnej.Wszelkie prawa zastrzeżone.
      </Content>
    </Wrapper>
  );
};

export default Footer;
