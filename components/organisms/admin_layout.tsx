import { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
//icons
import { User } from "@styled-icons/fa-solid/User";
import { LogOut } from "@styled-icons/entypo/LogOut";
//utils
import { logout } from "../../middleware/utils";

//components
import IconButton from "../atoms/IconButton";
import ProgressBar from "../molecules/progress_bar";
import NavItem from "../atoms/navItem";
import { AdminContext } from "../../pages/admin/index";

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 9% 9% auto;
  height: 100vh;
`;
const Content = styled.div`
  padding: 16px 0;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
`;

const TopBar = styled.div`
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBar = styled.div`
  background-color: ${({ theme }) => theme.primary};
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
  margin: auto 0;
  & li {
    margin-right: 48px;
  }
`;

const AdminLayout = ({ userData, children, view }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <TopBar>
        <LogoImage
          src="https://cdn.bsbox.pl/files/wzpn/YjU7MDA_/2536b28051ecaf0c109bc801d3503d86_original_images.png"
          alt="wielkoposlki ZPN logo"
        />
        <ProgressBar />
        <ButtonWrapper>
          <Link href={`/admin/uzytkownicy/${userData?.email}`}>
            <IconButton>
              <User /> {userData ? userData.email : ""}
            </IconButton>
          </Link>
          <Link href="/admin/login">
            <IconButton onClick={() => logout("admin")}>
              <LogOut /> Wyloguj
            </IconButton>
          </Link>
        </ButtonWrapper>
      </TopBar>
      <NavBar>
        <NavBarContent>
          <List>
            <Link href="/admin">
              <NavItem active={view === "wnioski"}>Wnioski licencyjne</NavItem>
            </Link>
            <Link href="/admin/kluby">
              <NavItem active={view === "kluby"}>Kluby</NavItem>
            </Link>
            {/* <Link href="/admin/statystyki">
              <NavItem active={view === "statystyki"}>Statystyki</NavItem>
            </Link> */}
            <Link href="/admin/uzytkownicy">
              <NavItem active={view === "uzytkownicy"}>Użytkownicy</NavItem>
            </Link>
            <Link href="/admin/ustawienia">
              <NavItem active={view === "ustawienia"}>Ustawienia</NavItem>
            </Link>
          </List>
        </NavBarContent>
      </NavBar>

      <Content>{children}</Content>
    </Wrapper>
  );
};

export default AdminLayout;
