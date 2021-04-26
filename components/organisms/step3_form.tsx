import { useState, useContext } from "react";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import { ClubContext } from "../../pages/index";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import ErrorMessage from "../atoms/error_message";
import OutlineButton from "../atoms/outline_button";
import Info from "../atoms/Info";
import Fieldset from "../atoms/fieldset";
import FormStatement from "../molecules/form_statement";
import AddFilesWrapper from "./add_files_wrapper";
import NumericInput from "../atoms/numeric_input";
import { renderAmount } from "../../middleware/utils";
const StepThreeForm = ({ handleStepChange, readOnly }) => {
  const [state, setState] = useState(false);
  const context = useContext(ApplicationContext);
  const settings = context.settings;
  const formData = context.formData.stepThree;
  const handleChange = context.handleFormChange;
  const {
    handleStepFill,
    error,
    clearErrors,
    show_buttons,
    sendApplication,
    setStep,
    clubData,
    completedSteps,
  } = context;

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!checkData()) {
    //   return;
    // }
    handleStepFill("stepThree", { completed: true, error: false });
    handleStepChange("next");
  };
  //console.log(settings);
  // const renderAmount = (leauge, settings) => {
  //   console.log(leauge == "IV liga");
  //   console.log(leauge);
  //   let amount = "";
  //   switch (leauge) {
  //     case "IV liga":
  //       amount = `${settings.iv_possession_fee}`;
  //       break;
  //     case "V liga":
  //     case "Klasa okręgowa":
  //       amount = `${settings.v_possession_fee}`;
  //       break;
  //     default:
  //       break;
  //   }
  //   return amount;
  // };
  const renderForm = () => {
    switch (formData.youthGroupsPossession) {
      case "posiadamy zespoły":
        return (
          <>
            {" "}
            <Label width="max-content">
              <span>
                Podaj liczbę zespołów młodzieżowych
                <Info
                  text="Zobowiązuje się do posiadania w ramach własnego podmiotu prawnego co najmniej podaną liczbę zespołów młodzieżowych, które będą uczestniczyć w oficjalnych rozgrywkach lub programach zatwierdzonych przez PZPN i rozgrywanych na poziomie krajowym lub regionalnym.
"
                />
              </span>
              <NumericInput
                value={formData.numberOfYouthGroups}
                onChange={(e) =>
                  handleChange(e.target.rawValue, "numberOfYouthGroups", 3)
                }
                suffix=""
                placeholder="0"
              />
            </Label>
            <Label width="max-content">
              <span>
                Udział zawodników młodzieżowych w meczach seniorów
                <Info
                  text="W czasie trwania całego meczu zespołu seniorów uczestniczyć będzie minimum podana poniżej liczba zawodników młodzieżowych do lat 21 (zawodnikami młodzieżowymi są zawodnicy posiadający obywatelstwo polskie, którzy w roku kalendarzowym, w którym następuje zakończenie danego sezonu rozgrywkowego, ukończą 21. rok życia oraz zawodnicy młodsi).
"
                />
              </span>
              <NumericInput
                value={formData.shareOfYouthGroups}
                onChange={(e) =>
                  handleChange(e.target.rawValue, "shareOfYouthGroups", 3)
                }
                suffix=""
                placeholder="0"
              />
            </Label>
          </>
        );

      case "porozumienie na szkolenie":
        return (
          <>
            <Label>
              Nazwa klubu, z którym zawarto porozumienie
              <Input
                type="text"
                value={formData.clubAgreementName}
                onChange={(e) =>
                  handleChange(e.target.value, "clubAgreementName", 3)
                }
              />
            </Label>
            <Paragraph>
              Kopa porozumienia na szkolenie młodzieży z powyższym klubem.(
              <span style={{ color: "#0056A5" }}>pobierz</span> wzór umowy
              porozumienia w PDF){" "}
            </Paragraph>
            <AddFilesWrapper
              text="W sytuacji braku zespołów własnych lub niepełnej ich liczby Wnioskodawca zawarł porozumienie na szkolenie młodzieży z podanym poniżej klubem, z którego wynika wypełnienie kryterium sportowego na posiadanie zespołów młodzieżowych."
              category="agreement_documents"
              id={clubData.applications[0].id}
            />
          </>
        );

      case "nie posiadamy zespołów":
        return (
          <>
            <p
              style={{
                fontWeight: "bold",
                margin: "24px 0 8px",
                marginBottom: "15px",
              }}
            >
              Wysokość opłaty dodatkowej w tym sezonie
            </p>{" "}
            <h1 style={{ fontSize: "40px" }}>
              {renderAmount(context.formData.stepOne.leauge, settings)} PLN
            </h1>
            <p style={{ fontWeight: "bold", margin: "24px 0 48px 0" }}>
              Opłatę będzie można uiścić na koniec procesu składania wniosku
            </p>
          </>
        );
      case "wystepujemy w rozgrywkach klasy A":
        return <> </>;
    }
  };

  return (
    <FormTemplate onChange={() => clearErrors("stepThree")} width="80%">
      <Fieldset disabled={readOnly}>
        <Label>
          Zespoły młodzieżowe
          <Select
            value={formData.youthGroupsPossession}
            onChange={(e) =>
              handleChange(e.target.value, "youthGroupsPossession", 3)
            }
          >
            <option value="posiadamy zespoły">
              Posiadamy zespoły młodzieżowe w ramach naszego podmiotu prawnego.
            </option>
            <option value="porozumienie na szkolenie">
              Nie posiadamy własnych zespołów młodzieżowych. Posiadamy
              porozumienie na szkolenie młodzieży z innym klubem.
            </option>
            <option value="nie posiadamy zespołów">
              Nie posiadamy własnych zespołów młodzieżowych. Deklarujemy się
              uiścić opłatę dodatkową do Wielkopolskiego ZPN.
            </option>
            <option value="wystepujemy w rozgrywkach klasy A">
              Nie posiadamy własnych zespołów młodzieżowych. Występujemy w
              rozgrywkach Klasy A, Klasy B lub ligi młodzieżowej.
            </option>
          </Select>
        </Label>
        {<ErrorMessage>{error.stepThree}</ErrorMessage>}
        {renderForm()}
        <FormStatement
          text="Oświadczamy, że nasz klub zapewnia, że każdy z jego zawodników uprawniony do gry przechodzi badania okresowe uprawniające do udziału w rozgrywkach zgodnie z właściwym regulaminem rozgrywek Wojewódzkiego Związku Piłki Nożnej.
"
          value={formData.medicalDeclaration}
          handleChange={() =>
            handleChange(!formData.medicalDeclaration, "medicalDeclaration", 3)
          }
          name=" Oświadczenie o opiece medycznej nad zawodnikami"
        />
      </Fieldset>
      <div>
        <PrimaryButton
          style={{ marginRight: "16px" }}
          onClick={() =>
            show_buttons ? handleStepChange("previous") : setStep(2)
          }
        >
          Cofnij
        </PrimaryButton>
        {show_buttons ? (
          <>
            <PrimaryButton
              style={{ marginRight: "16px" }}
              color="dark"
              hoverColor="darkLight"
              type="button"
              onClick={context.saveForm}
            >
              Zapisz wersję roboczą
            </PrimaryButton>
            {completedSteps.stepThree === "error" ? (
              <PrimaryButton
                hoverColor="success"
                color="successDark"
                type="button"
                style={{ marginRight: "16px" }}
                onClick={() => sendApplication()}
              >
                Zatwierdź i wyślij
              </PrimaryButton>
            ) : null}
          </>
        ) : null}
        <PrimaryButton
          type="button"
          style={{ marginRight: "16px" }}
          onClick={() => (show_buttons ? handleStepChange("next") : setStep(4))}
        >
          Kolejny krok
        </PrimaryButton>
      </div>
    </FormTemplate>
  );
};

export default StepThreeForm;
