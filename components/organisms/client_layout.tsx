import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
//icons
import { User } from '@styled-icons/fa-solid/User';
import { LogOut } from '@styled-icons/entypo/LogOut';
//utils
import { logout } from '../../middleware/utils';

//components
import ClubInfo from '../molecules/club_info';
import IconButton from '../atoms/IconButton';
import Footer from '../atoms/footer';
import NavItem from '../atoms/navItem';
//import { UserContext } from "../../pages/admin/index";

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 12% 7% auto 4%;
  height: 100vh;
`;
const Content = styled.div`
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

const TopBar = styled.div`
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBar = styled.div`
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
`;

const NavBarContent = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  height: 100%;
`;

const LogoImage = styled.img`
  width: 120px;
  margin-right: 120px;
`;

const ButtonWrapper = styled.div`
  display: flex;

  & p {
    margin-left: 24px;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  padding: 0 16px;
  & li {
    margin-right: 48px;
  }
`;

const ClientLayout = ({ view, children, clubData }) => {
  //const { userData, setView } = useContext(UserContext);
  const router = useRouter();
  return (
    <Wrapper>
      <TopBar>
        <Link href="/">
          <Image src={'/wzpn_logo.png'} alt={'logo'} width={150} height={50} />
        </Link>
        <ClubInfo clubData={clubData} />
        <ButtonWrapper>
          <Link href="/ustawienia">
            <IconButton>
              <User /> {clubData?.email}
            </IconButton>
          </Link>
          <Link href="/login">
            <IconButton onClick={() => logout('klub')}>
              <LogOut /> Wyloguj
            </IconButton>
          </Link>
        </ButtonWrapper>
      </TopBar>
      <NavBar>
        <NavBarContent>
          <List>
            <Link href="/">
              <NavItem active={view === 'Wniosek licencyjny'}>
                Wniosek licencyjny
              </NavItem>
            </Link>
            <Link href="/dane">
              <NavItem active={view === 'Dane klubu'}>Dane klubu</NavItem>
            </Link>
            <Link href="/pomoc">
              <NavItem active={view === 'Pomoc'}>Pomoc / FAQ</NavItem>
            </Link>
          </List>
        </NavBarContent>
      </NavBar>
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default ClientLayout;
