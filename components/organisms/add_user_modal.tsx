import styled from "styled-components";
import axios from "axios";
import { Close } from "@styled-icons/evaicons-solid/Close";
//components
import AddUserForm from "../molecules/addUserForm";

const Background = styled.div`
  display: ${({ visibility }) => (visibility ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const CloseIcon = styled(Close)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 35px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.danger};
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 5px;
  padding: 32px;
  max-width: 60vw;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow: auto;
`;

const AddUserModal = ({ visibility, setVisibility, roles, refreshData }) => {
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setVisibility(false);
      return;
    }
  };
  return (
    <Background onClick={closeModal} visibility={visibility}>
      <Content>
        <h1>Dodaj użytkownika</h1>
        <AddUserForm
          authData={null}
          refreshData={refreshData}
          setVisible={setVisibility}
          userData={null}
          roles={roles}
        />
        <CloseIcon onClick={() => setVisibility(false)} />
      </Content>
    </Background>
  );
};

export default AddUserModal;
