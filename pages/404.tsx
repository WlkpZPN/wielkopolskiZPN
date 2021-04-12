import styled from "styled-components";
import { useRouter } from "next/router";
import primaryButton from "../components/atoms/primary_button";
import PrimaryButton from "../components/atoms/primary_button";

const Wrapper = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  & h1 {
    font-size: 50px;
    color: #b5b5b5;
    margin: 40px 0;
  }

  & span {
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
  }

  & h2 {
    margin-bottom: 40px;
    font-size: 25px;
  }
`;

const LogoImage = styled.img`
  width: 180px;
  margin-right: 120px;
`;

const Custom404 = () => {
  const router = useRouter();

  const redirectUser = (e) => {
    e.preventDefault();

    if (router.asPath.search("admin") > -1) {
      // przekieruj na strone admina
      router.replace("/admin");
    } else {
      //przekieruj na strone klubu
      router.replace("/");
    }
  };
  return (
    <Wrapper>
      <LogoImage
        src="https://cdn.bsbox.pl/files/wzpn/YjU7MDA_/2536b28051ecaf0c109bc801d3503d86_original_images.png"
        alt="wielkoposlki ZPN logo"
      />
      <h1>
        Błąd 404 <br /> Ta podstrona nie istnieje.{" "}
      </h1>
      <h2>
        Nie martw się! <br /> <span onClick={redirectUser}>Wróć </span> do
        strony głównej platformy licencyjnej
      </h2>

      <PrimaryButton onClick={redirectUser}>
        Powrót do strony głównej
      </PrimaryButton>
    </Wrapper>
  );
};

export default Custom404;
