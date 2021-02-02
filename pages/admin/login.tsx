import { useState } from 'react';
import {useRouter } from 'next/router'
import styled from 'styled-components';
import Input from '../../components/atoms/input'
import ErrorMessage from '../../components/atoms/error_message';
import Label from '../../components/atoms/label';
import PrimaryButton from '../../components/atoms/primary_button';
import LogoImage from '../../components/molecules/logoImage';
const Wrapper = styled.main`
display:grid;
grid-template-columns:50% 50%;
height:100vh;

@media (max-width:700px) {
    grid-template-columns:90% 10%;
}

@media (max-width:400px) {
    grid-template-columns:100%;
}
`;

const Right = styled.div`
background-color:${({ theme }) => theme.primary};
height:100%;

@media (max-width:400px) {
    display:none;
}
`;


const Left = styled.div`
 padding:10% 10px 0 30%;
 display:flex;
 flex-direction:column;
 align-items:flex-start;

 & input {
    max-width:300px;
    width:100%;
    margin-right:16px;
   
 }
 @media (max-width:700px) {
    padding:32px;
}
`;


const Image = styled.img`
width:160px;
margin-bottom:64px;
`;

const Header = styled.h1`
font-size:36px;
margin-bottom:4px;
`;

const StyledLabel = styled(Label)`
margin-top:32px;
@media (max-width:700px) {
    margin-top:16px;
}
`;

const ForgetPassword = styled.p`
font-size:14px;
font-weight:bold;
color:${({ theme }) => theme.primary};
cursor:pointer;
`;
const LoginPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const submitLogin = (e) => {
        e.preventDefault();
        router.push('/admin')
    }
    return (
        <Wrapper>
            <Left >
                <LogoImage/>
                <Header>Platforma licencyjna</Header>
                <p style={{marginBottom:'64px'}}>Panel administracyjny</p>
                <StyledLabel>E-mail</StyledLabel>
                <Input type="text" placeholder="jan.nowak@wielkopolskizpn.pl" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <StyledLabel>Hasło</StyledLabel>
                <Input type="text" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <ForgetPassword>Przypomnij hasło</ForgetPassword>
                <PrimaryButton type="submit" onClick={submitLogin} style={{marginTop:'48px'}}>Zaloguj</PrimaryButton>
                {error ? <ErrorMessage>{error }</ErrorMessage> : null}
            </Left>
            <Right></Right>
        </Wrapper>
        )
}

export default LoginPage;