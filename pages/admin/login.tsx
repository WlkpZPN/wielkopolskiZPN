import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import styled from "styled-components";

//components
import Label from "../../components/atoms/label";
import Input from "../../components/atoms/input";
import ErrorMessage from "../../components/atoms/error_message";
import LoggedUserInfo from "../../components/molecules/loggedUserInfo";
import PrimaryButton from "../../components/atoms/primary_button";
import Loader from "../../components/atoms/loader";

//helpers

import { validateEmail } from "../../middleware/validation";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;

  @media (max-width: 700px) {
    grid-template-columns: 90% 10%;
  }

  @media (max-width: 400px) {
    grid-template-columns: 100%;
  }
`;

const Right = styled.div`
  background-color: ${({ theme }) => theme.primary};
  height: 100%;

  @media (max-width: 400px) {
    display: none;
  }
`;

const Left = styled.div`
  padding: 10% 10px 0 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & input {
    max-width: 300px;
    width: 100%;
    margin-right: 16px;
  }
  @media (max-width: 700px) {
    padding: 32px;
  }
`;

const Header = styled.h1`
  font-size: 36px;
  margin-bottom: 4px;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledLabel = styled(Label)`
  margin-top: 32px;
  @media (max-width: 700px) {
    margin-top: 16px;
  }
`;
const Image = styled.img`
  width: 160px;
  margin-bottom: 64px;
`;

const ForgetPassword = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-top: 4px;
`;

const LoginPage = ({ userData }) => {
  console.log(userData);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();

    const { valid, message } = validateEmail(email);

    if (valid) {
      setError("");
      setLoading(true);
      axios
        .post("/api/auth/login", {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);

          console.log(res);
          const { success, token } = res.data;

          router.push("/admin");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setError(
            err.response.data.message ||
              "Wystąpił błąd,proszę spróbować później"
          );
        });
    } else {
      setLoading(false);
      setError(message);
      return;
    }
  };
  return (
    <Wrapper>
      <Left>
        <Image
          src="https://cdn.bsbox.pl/files/wzpn/YjU7MDA_/2536b28051ecaf0c109bc801d3503d86_original_images.png"
          alt="Wielkopolski ZPN logo"
        />

        <Header>Platforma licencyjna</Header>
        <p style={{ marginBottom: "64px", fontSize: "18px" }}>
          Panel administracyjny
        </p>
        {userData ? (
          <LoggedUserInfo userData={userData} />
        ) : loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <StyledForm>
            <StyledLabel>E-mail</StyledLabel>
            <Input
              type="text"
              placeholder="jan.nowak@wielkopolskizpn.pl"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
            />
            <StyledLabel>Hasło</StyledLabel>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
            <ForgetPassword>Przypomnij hasło</ForgetPassword>
            <PrimaryButton
              type="submit"
              onClick={submitLogin}
              style={{ marginTop: "48px" }}
            >
              Zaloguj
            </PrimaryButton>
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          </StyledForm>
        )}
      </Left>
      <Right></Right>
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.userToken || null;
  let decodedToken: Object;
  if (token) {
    console.log("we have token");
    decodedToken = jwt.verify(token, process.env.AUTH_KEY);
  } else {
    decodedToken = null;
  }
  return {
    props: {
      userData: decodedToken || null,
    },
  };
}

export default LoginPage;
