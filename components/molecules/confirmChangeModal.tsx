import styled from "styled-components";
import PrimaryButton from "../atoms/primary_button";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 99999;
`;

const Content = styled.div`
  padding: 24px;
  max-width: 500px;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  & div {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }
`;

const ConfirmChangeModal = ({
  updateApplicationFunction,
  visible,
  setVisible,
  nextStatus,
}) => {
  const renderStatus = () => {
    let status;
    switch (nextStatus) {
      case 1:
        status = "roboczy";
        break;
      case 2:
        status = "wnioskowany";
        break;
      case 3:
        status = "zatwierdzony";
        break;
      case 4:
        status = "do poprawy";
        break;
      case 5:
        status = "odrzucony";
        break;
      case 6:
        status = "zaakceptowany nieopłacony";
        break;
      case 7:
        status = "zaakceptowany opłacony";
        break;
    }
  };
  return (
    <Wrapper onClick={() => setVisible(false)} visible={visible}>
      <Content>
        Uwaga! Klub opłacił już ten wniosek. Jeśli zmienisz jego status na “
        {renderStatus()}” to klub będzie musiał opłacić go ponownie. Czy na
        pewno chcesz tego dokonać?
        <div>
          <PrimaryButton
            color="success"
            hoverColor="successDark"
            onClick={() => updateApplicationFunction(true)}
          >
            OK
          </PrimaryButton>
          <PrimaryButton
            color="danger"
            hoverColor="dangerDark"
            onClick={() => setVisible(false)}
          >
            Anuluj
          </PrimaryButton>
        </div>
      </Content>
    </Wrapper>
  );
};

export default ConfirmChangeModal;
