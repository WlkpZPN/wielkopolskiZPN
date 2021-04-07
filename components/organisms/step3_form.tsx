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
const StepThreeForm = ({ handleStepChange, readOnly }) => {
  const [state, setState] = useState(false);
  const context = useContext(ApplicationContext);
  const settings = context.settings;
  const formData = context.formData.stepThree;
  const handleChange = context.handleFormChange;
  const {
    fileData,
    handleFileChange,
    deleteFile,
    handleStepFill,
    error,
    clearErrors,
    show_buttons,
    sendApplication,
  } = context;

  const setFiles = (id, file) => {
    handleFileChange(id, file, file.name, "agreement_documents");
    setState(!state);
  };

  const handleDelete = (id) => {
    deleteFile(id, "agreement_documents");
    setState(!state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!checkData()) {
    //   return;
    // }
    handleStepFill("stepThree", { completed: true, error: false });
    handleStepChange("next");
  };

  const renderAmount = () => {};
  const renderForm = () => {
    switch (formData.youthGroupsPossession) {
      case "posiadamy zespoły":
        return (
          <>
            {" "}
            <Label width="max-content">
              <Info
                text="Zobowiązuje się do posiadania w ramach własnego podmiotu prawnego co najmniej podaną liczbę zespołów młodzieżowych, które będą uczestniczyć w oficjalnych rozgrywkach lub programach zatwierdzonych przez PZPN i rozgrywanych na poziomie krajowym lub regionalnym.
"
              />
              Podaj liczbę zespołów młodzieżowych{" "}
              <NumericInput
                value={formData.numberOfYouthGroups}
                onChange={(e) =>
                  handleChange(e.target.value, "numberOfYouthGroups", 3)
                }
                suffix=""
                placeholder="0"
              />
            </Label>
            <Label width="max-content">
              Udział zawodników młodzieżowych
              <NumericInput
                value={formData.shareOfYouthGroups}
                onChange={(e) =>
                  handleChange(e.target.value, "shareOfYouthGroups", 3)
                }
                suffix=""
                placeholder="0"
              />
              <Info
                text="W czasie trwania całego meczu zespołu seniorów uczestniczyć będzie minimum podana poniżej liczba zawodników młodzieżowych do lat 21 (zawodnikami młodzieżowymi są zawodnicy posiadający obywatelstwo polskie, którzy w roku kalendarzowym, w którym następuje zakończenie danego sezonu rozgrywkowego, ukończą 21. rok życia oraz zawodnicy młodsi).
"
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
              deleteFile={handleDelete}
              fileData={formData.agreement_documents}
              setFiles={setFiles}
            />
          </>
        );

      case "nie posiadamy zespołów":
        return (
          <>
            <p style={{ fontWeight: "bold", margin: "24px 0 8px" }}>
              Wysokość opłaty dodatkowej w tym sezonie
            </p>{" "}
            <h1 style={{ fontSize: "40px" }}>
              {settings.no_possession_fee} PLN
            </h1>
            <p style={{ fontWeight: "bold", margin: "24px 0 48px 0" }}>
              Opłatę będzie można uiścić na koniec procesu składania wniosku
            </p>
          </>
        );
    }
  };

  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate onChange={() => clearErrors("stepThree")} width="80%">
        <Label>
          Zespoły młodzieżowe
          <Select
            value={formData.youthGroupsPossession}
            onChange={(e) =>
              handleChange(e.target.value, "youthGroupsPossession", 3)
            }
          >
            <option value="posiadamy zespoły">
              Posiadamy zespoły młodzieżowe w ramach naszego podmiotu prawnego
            </option>
            <option value="porozumienie na szkolenie">
              Nie posiadamy własnych zespołów młodzieżowych. Posiadamy
              porozumienie na szkolenie młodzieży z innym klubem.
            </option>
            <option value="nie posiadamy zespołów">
              Nie posiadamy własnych zespołów młodzieżowych.Deklarujemy się
              uiścić opłatę dodatkową do Wielkopolskiego ZPN.
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

        <div>
          <PrimaryButton
            style={{ marginRight: "16px" }}
            onClick={() => handleStepChange("previous")}
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
              {error.stepThree ? (
                <PrimaryButton
                  hoverColor="success"
                  color="successDark"
                  type="button"
                  onClick={() => sendApplication()}
                >
                  Zatwierdź i wyślij
                </PrimaryButton>
              ) : null}
            </>
          ) : null}
          <PrimaryButton style={{ marginRight: "16px" }} onClick={handleSubmit}>
            Kolejny krok
          </PrimaryButton>
        </div>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepThreeForm;
