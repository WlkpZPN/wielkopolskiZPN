import { useState } from "react";
import styled from "styled-components";

//utils
import { protectedClientRoute } from "../middleware/protectedClient";

//components
import PrimaryButton from "../components/atoms/primary_button";
import ClientLayout from "../components/organisms/client_layout";
import StepBox from "../components/atoms/step_box";
import FormTemplate from "../components/atoms/form_template";
import Input from "../components/atoms/form_input";
import Select from "../components/atoms/form_select";
import RadioSquare from "../components/molecules/form_radio";
import Label from "../components/atoms/form_label";
import RadioContainer from "../components/atoms/radio_container";
import FormRow from "../components/atoms/form_row";
import AddFile from "../components/molecules/add_file";
import Paragraph from "../components/atoms/paragraph";
import OutlineButton from "../components/atoms/outline_button";
import Info from "../components/atoms/Info";
const Content = styled.div`
  padding: 16px 0;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.h1`
  margin-bottom: 16px;
`;

const StepsContainer = styled.div`
  display: flex;
`;
const Home = () => {
  const [view, setView] = useState("Wniosek licencyjny");
  const [step, setStep] = useState(1);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        // podstawowe dane
        return (
          <FormTemplate>
            <Select>
              <option>IV liga</option>
              <option>III liga</option>
              <option>II liga</option>
              <option>I liga</option>
            </Select>
            <RadioContainer>
              <p>Zaznacz,na ile sezonów ubiegasz się o licencje</p>
              <Label direction="row" for="1">
                <Input type="radio" id="1" name="seasons" value={1} />1 sezon
              </Label>
              <Label direction="row" for="2">
                <Input type="radio" value={2} name="seasons" id="2" />2 sezony
              </Label>
            </RadioContainer>
            <Label for="club_name">
              Pełna nazwa klubu
              <Input id="club_name" type="text"></Input>
            </Label>
            <Label for="club_address">
              Adres klubu
              <Input id="club_address" type="text"></Input>
            </Label>
            <FormRow>
              <Label for="postal_code">
                Kod pocztowy
                <Input id="postal_code" type="text"></Input>
              </Label>
              <Label for="club_city">
                Miasto
                <Input id="club_city" type="text"></Input>
              </Label>
            </FormRow>
            <Label for="club_email">
              Adres e-mail klubu
              <Input id="club_email" type="text"></Input>
            </Label>

            <h2>Dane pełnomocnika</h2>

            <FormRow>
              <Label for="owner_name">
                Imię pełnomocnika
                <Input for="owner_name" type="text"></Input>
              </Label>
              <Label for="owner_lastname">
                Nazwisko pełnomocnika
                <Input for="owner_lastname" type="text"></Input>
              </Label>
            </FormRow>
            <Label for="owner_position">
              Funkcja / stanowisko pełnomocnika
              <Input for="owner_position" type="text" />
            </Label>

            <FormRow margin="48px 0" cols={3}>
              <PrimaryButton color="danger" hoverColor="dangerDark">
                Anuluj
              </PrimaryButton>
              <PrimaryButton color="dark" hoverColor="darkLight">
                Zapisz werjse roboczą
              </PrimaryButton>
              <PrimaryButton onClick={handleNextStep}>
                Kolejny krok
              </PrimaryButton>
            </FormRow>
          </FormTemplate>
        );
      case 2:
        return (
          <FormTemplate>
            <Paragraph>
              Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
              potwierdzony za zgodność ze stanem faktycznym na dzień składania
              niniejszego wniosku
            </Paragraph>
            <AddFile />
            <Paragraph>
              Oświadczenie w przedmiocie udziału w rozgrywkach
            </Paragraph>
            <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
            <Label direction="row">
              <RadioSquare />
              Potwierdzam treść oświadczenia
            </Label>
            <Paragraph>
              Oświadczenie o stosowaniu dokumentacji ochorny danych osobowych
            </Paragraph>
            <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
            <Label direction="row">
              <RadioSquare />
              Potwierdzam treść oświadczenia
            </Label>
            <FormRow cols="3">
              <PrimaryButton>Cofnij</PrimaryButton>
              <PrimaryButton color="dark" hoverColor="darkLight">
                Zapisz wersję roboczą
              </PrimaryButton>
              <PrimaryButton onClick={handleNextStep}>
                Kolejny krok
              </PrimaryButton>
            </FormRow>
          </FormTemplate>
        );
      case 3:
        return (
          <FormTemplate>
            <Label>
              Zespoły młodzieżowe
              <Select>
                <option>
                  Posiadamy zespoły młodzieżowe w ramach naszego podmiotu
                  prawnego
                </option>
              </Select>
            </Label>
            <Label width="50%">
              Podaj liczbę zespołów młodzieżowych
              <Input type="text" />
              <Info />
            </Label>
            <Label width="50%">
              Udział zawodników młodzieżowych
              <Input type="text" />
              <Info />
            </Label>
            <Paragraph>
              Oświadczenie o opiece medycznej nad zawodnikami
            </Paragraph>
            <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
            <Label margin="16px 0" direction="row">
              <RadioSquare />
              Potwierdzam treść oświadczenia
            </Label>
            <FormRow cols="3">
              <PrimaryButton>Cofnij</PrimaryButton>
              <PrimaryButton color="dark" hoverColor="darkLight">
                Zapisz wersję roboczą
              </PrimaryButton>
              <PrimaryButton onClick={handleNextStep}>
                Kolejny krok
              </PrimaryButton>
            </FormRow>
          </FormTemplate>
        );

      default:
        return null;
    }
  };
  return (
    <ClientLayout view={view} setView={setView}>
      <Content>
        <Header>Złóż wniosek licencyjny</Header>
        <StepsContainer>
          <StepBox
            completed={false}
            number="1"
            active={step === 1}
            text="Podstawowe dane"
            helperText="Wybór klasy rozgrywkowej"
          />
          <StepBox
            completed={false}
            number="2"
            active={step === 2}
            text="Prawo"
            helperText="Kryteria prawne"
          />
          <StepBox
            completed={false}
            number="3"
            active={step === 3}
            text="Sport"
            helperText="Kryteria sportowe"
          />
          <StepBox
            completed={false}
            number="4"
            active={step === 4}
            text="Obiekty"
            helperText="Kryteria infrastrukturalne"
          />
          <StepBox
            completed={false}
            number="5"
            active={step === 5}
            text="Finanse"
            helperText="Kryteria finansowe"
          />
          <StepBox
            completed={false}
            number="6"
            active={step === 6}
            text="Personel"
            helperText="kryteria personalne"
          />
          <StepBox
            completed={false}
            number="7"
            active={step === 7}
            text="Załączniki"
            helperText="Załącz dokumenty"
          />
        </StepsContainer>

        {renderCurrentStep()}
      </Content>
    </ClientLayout>
  );
};

export default Home;
