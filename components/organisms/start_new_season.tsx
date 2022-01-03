import styled from "styled-components";
import { useState } from "react";
import Loader from "../atoms/loader";
import Select from "../atoms/form_select";
import PrimaryButton from "../atoms/primary_button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & button {
    margin-top: 12px;
  }
`;

const ModalBackground = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  right: 0;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  height: 400;
`;

const StartNewSeason = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leauge, setLeauge] = useState("");
  console.log(leauge);
  const createNewSeason = async (setForAll = true) => {
    setLoading(true);

    try {
      await axios.post("/api/applications/admin/startNewSeason", {
        leauge: leauge,
        setForAll: setForAll,
      });
      toast.success("Pomyślnie rozpoczęto proces licencyjny", {
        autoClose: 2000,
      });
    } catch(e) {
      toast.error('Nie udało się rozpocząc procesu licencyjnego,spróbuj ponownie później lub skontaktuj się z administratorem.')
    }

   
    setLoading(false);
  };

  const startNewSeasonForLeauge = async () => {
    if (leauge == "" || leauge == "brak" || !leauge) {
      toast.error("Proszę wybrać lige rozgrywkową", {
        autoClose: 2000,
      });
      return;
    }
    createNewSeason(true);
  };

  return (
    <Wrapper>
      <h1>Wznawianie procesu licencyjnego</h1>
      <p>Tekst wyjaśniający co się stanie</p>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div style={{ maxWidth: "500px", width: "100%" }}>
            <Select value={leauge} onChange={(e) => setLeauge(e.target.value)}>
              <option value="brak">Wybierz ligę rozgrywkową</option>
              <option value="iv liga">IV liga</option>
              <option value="v liga">V liga</option>
              <option value="klasa okręgowa">Klasa okręgowa</option>
              <option value="klasa a">Klasa A</option>
              <option value="klasa b">Klasa B</option>
              <option value="młodzież">Ligi młodzieżowe</option>
              <option value="futsal">Futsal</option>
              <option value="ligi kobiece">Ligi kobiece</option>
            </Select>
          </div>
          <PrimaryButton onClick={() => startNewSeasonForLeauge()}>
            Wznów proces dla tej klasy
          </PrimaryButton>
          <PrimaryButton onClick={() => createNewSeason()}>
            Wznów proces dla wszystkich
          </PrimaryButton>
        </>
      )}

      <ConfirmNewSeasonModal
        visible={visible}
        setVisible={setVisible}
        onClick={() => null}
      />
    </Wrapper>
  );
};

const ConfirmNewSeasonModal = ({ visible, setVisible, onClick }) => {
  return (
    <ModalBackground visible={visible} onClick={() => setVisible(false)}>
      <ModalContent>Napewno rozpocząć wniosek licencyjny?</ModalContent>
      <PrimaryButton>TAK</PrimaryButton>
      <PrimaryButton>NIE</PrimaryButton>
    </ModalBackground>
  );
};

export default StartNewSeason;
