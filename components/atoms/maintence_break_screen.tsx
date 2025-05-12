import styled from "styled-components";
import Link from 'next/link';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const BigLogo = styled.div`
  width: 100%;
  height: 100%;
  background: url("/logo.svg");
  background-repeat: no-repeat;
  background-position: center;
`;

const Image = styled.img`
  width: 160px;
  margin-bottom: 64px;
`;

const Left = styled.div`
  padding: 10% 10px 0 40%;

  display: flex;
  flex-direction: column;

  & h2 {
    font-size: 35px;
    max-width: 400px;
    line-height: 40px;
    margin-bottom: 32px;
  }
  & p {
    max-width: 400px;
    line-height: 1.5rem;
    font-size: 20px;
    margin: 15px 0;
  }
  & a {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
  @media (max-width: 700px) {
    padding: 32px;
  }
`;

const Right = styled.div`
  background-color: #b5b5b5;
  height: 100%;

  @media (max-width: 400px) {
    display: none;
  }
`;

const MaintanceScreen = () => {
  return (
    <Wrapper>
      <Left>
        <Link href="/">
          <Image src={'/wzpn_logo.png'} alt={'logo'} width={150} height={50} />
        </Link>

        <h2>Platforma licencyjna tymczasowo wyłączona!</h2>
        <p>
          Trwają prace mające na celu przywrócenie działania Platformy. Prosimy
          o cierpliwość i przepraszamy za niedogodności.
        </p>

        <p>
          W razie pytań lub wątpliwości prosimy o kontakt:{" "}
          <a href="mailto:licklub@wielkopolskizpn.pl">
            licklub@wielkopolskizpn.pl
          </a>{" "}
        </p>
      </Left>
      <Right>
        <BigLogo />
      </Right>
    </Wrapper>
  );
};

export default MaintanceScreen;
