import { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
//icons
import { User } from "@styled-icons/fa-solid/User";
import { LogOut } from "@styled-icons/entypo/LogOut";
//utils
import { logout } from "./../../middleware/utils";

//components
import ClubInfo from "../molecules/club_info";
import IconButton from "../atoms/IconButton";
import Footer from "../atoms/footer";
import NavItem from "../atoms/navItem";
import { UserContext } from "../../pages/admin/index";

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 9% 7% auto 4%;
  height: 100vh;
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

const ClientLayout = ({ view, setView, children }) => {
  //const { userData, setView } = useContext(UserContext);

  const router = useRouter();

  const handleViewChange = (view) => {
    //setView(view);
    console.log(view);
  };
  return (
    <Wrapper>
      <TopBar>
        <LogoImage
          src="https://cdn.bsbox.pl/files/wzpn/YjU7MDA_/2536b28051ecaf0c109bc801d3503d86_original_images.png"
          alt="wielkoposlki ZPN logo"
        />
        <ClubInfo />
        <ButtonWrapper>
          <IconButton>
            <User /> Nazwa użytkownika
          </IconButton>
          <IconButton onClick={logout}>
            <LogOut /> Wyloguj
          </IconButton>
        </ButtonWrapper>
      </TopBar>
      <NavBar>
        <NavBarContent>
          <List>
            <NavItem
              active={view === "Wniosek licencyjny"}
              onClick={() => handleViewChange("Wniosek licencyjny")}
            >
              Wniosek licencyjny
            </NavItem>

            <NavItem
              active={view === "Dane klubu"}
              onClick={() => handleViewChange("Dane klubu")}
            >
              Dane klubu
            </NavItem>
            <NavItem
              active={view === "Pomoc"}
              onClick={() => handleViewChange("Pomoc")}
            >
              Pomoc / FAQ
            </NavItem>
          </List>
        </NavBarContent>
      </NavBar>

      {children}
      <Footer />
    </Wrapper>
  );
};

export default ClientLayout;
