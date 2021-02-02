import styled from 'styled-components';


//components 
import IconButton from '../atoms/IconButton';
import LogoImage from '../molecules/logoImage';

const Wrapper = styled.main`
display:grid;
grid-template-rows:8% 8% auto;
height:100vh;
`;

const TopBar = styled.div`
max-width:1360px;
width:100%;
margin:0 auto;
padding:8px 0;
`;


const NavBar = styled.div``;

const StyledLogo = styled(LogoImage)`
width:60px;
`;

const AdminLayout = ({children}) => {
    return (
        <Wrapper>
            <TopBar>
                <StyledLogo />
            </TopBar>
            <NavBar></NavBar>
       </Wrapper>
 )
}

export default AdminLayout;