import { useContext, useState, useEffect } from "react";

import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import PhoneInput from "../atoms/phone_input";
import Fieldset from "../atoms/fieldset";
import Info from "../atoms/Info";
import StyledSpinner from "../atoms/loader";

import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
import ZipCodeInput from "../atoms/zip_code_input";
import RadioButton from "../atoms/radio_button";

const StepOneForm = ({
  data,
  handleChange,
  settings,
  readOnly,
  handleStepChange,
}) => {
  const {
    saveForm,
    handleStepFill,
    error,
    clearErrors,
    show_buttons,
    sendApplication,
    setStep,
    completedSteps,
    changeApplicationData,
  } = useContext(ApplicationContext);
  // console.log(error);

  const [loading, setLoading] = useState(false);
  const [infoText, setInfoText] = useState("");
  useEffect(() => {
    switch (data.leauge) {
      case "iv liga":
        handleChange("iv liga", "leauge", 1);
        return;
      case "v liga":
        handleChange("v liga", "leauge", 1);
        return;
      case "klasa okręgowa":
        handleChange("klasa okręgowa", "leauge", 1);
        return;
      case "klasa a":
        handleChange("klasa a", "leauge", 1);
        return;
      case "klasa b":
        handleChange("klasa b", "leauge", 1);
        return;
      case "młodzież":
        handleChange("młodzież", "leauge", 1);
        return;
      case "futsal":
        handleChange("futsal", "leauge", 1);
        return;
      case "ligi kobiece":
        handleChange("ligi kobiece", "leauge", 1);
        return;
      default:
        handleChange(null, "leauge", 1);
        return;
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const futsalStartDate = new Date(settings.futsal_start_date);
    const startDate = new Date(settings.start_date);
    if (data.leauge == "futsal") {
      if (futsalStartDate > now) {
        setInfoText(
          "UWAGA, proces licencyjny dla ligii futsal jeszcze nie rozpoczął, nie będze możliwe wysłanie oraz zapisanie wniosku"
        );
        return;
      }
    } else {
      if (settings.start_date > now) {
        setInfoText(
          "UWAGA, proces licencyjny dla lig trawiastych jeszcze nie rozpoczął, nie będze możliwe wysłanie oraz zapisanie wniosku"
        );
        return;
      }
    }
    setInfoText("");
  }, [data.leauge]);
  return (
    <>
      {loading ? (
        <StyledSpinner />
      ) : (
        <FormTemplate onChange={() => clearErrors("stepOne")}>
          <Fieldset disabled={readOnly}>
            {<ErrorMessage>{error.stepOne}</ErrorMessage>}
            <div style={{ display: "flex" }}>
              <Select
                value={data.leauge}
                onChange={(e) => handleChange(e.target.value, "leauge", 1)}
              >
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
              <Info
                text={`Kluby IV ligi mogą ubiegać się tylko o licencję na jeden sezon. Kluby z pozostałych klas rozgrywkowych mogą wnioskować o licencje na dwa sezony jeśli: \n -posiadają prawo do użytkowania obiektu sportowego na minimum dwa sezony \n- będą wnioskowały o licencję na dwa sezony \n- wniosą opłatę za dwa sezony`}
              />
            </div>
            {infoText == "" ? null : <ErrorMessage>{infoText}</ErrorMessage>}

            <RadioContainer>
              <p>Zaznacz,na ile sezonów ubiegasz się o licencje</p>
              <Label direction="row" htmlFor="1">
                <RadioButton
                  id="1"
                  name="seasons"
                  checked={data.seasons === "1"}
                  value={"1"}
                  onChange={(e) => handleChange("1", "seasons", 1)}
                >
                  1 sezon
                </RadioButton>
              </Label>
              <Label direction="row" htmlFor="2">
                <RadioButton
                  value={"2"}
                  name="seasons"
                  id="2"
                  checked={data.seasons === "2"}
                  onChange={(e) => handleChange("2", "seasons", 1)}
                >
                  2 sezony
                </RadioButton>
              </Label>
            </RadioContainer>
            <Label>
              Pełna nazwa klubu
              <Input
                value={data.clubName}
                onChange={(e) => handleChange(e.target.value, "clubName", 1)}
                type="text"
              ></Input>
            </Label>
            <Label>
              Adres klubu
              <Input
                value={data.clubStreet}
                onChange={(e) => handleChange(e.target.value, "clubStreet", 1)}
                type="text"
              ></Input>
            </Label>
            <FormRow>
              <Label>
                Kod pocztowy
                <ZipCodeInput
                  value={data.clubZipCode}
                  onChange={(e) =>
                    handleChange(e.target.value, "clubZipCode", 1)
                  }
                />
              </Label>
              <Label>
                Miasto
                <Input
                  value={data.clubCity}
                  onChange={(e) => handleChange(e.target.value, "clubCity", 1)}
                  type="text"
                ></Input>
              </Label>
            </FormRow>
            {!show_buttons && (
              <Label>
                Adres e-mail klubu
                <Input
                  value={data.email}
                  onChange={(e) => handleChange(e.target.value, "email", 1)}
                  type="text"
                ></Input>
              </Label>
            )}

            <h2 style={{ marginTop: "24px" }}>Dane pełnomocnika</h2>

            <FormRow>
              <Label>
                Imię pełnomocnika
                <Input
                  value={data.agentName}
                  onChange={(e) => handleChange(e.target.value, "agentName", 1)}
                  type="text"
                ></Input>
              </Label>
              <Label>
                Nazwisko pełnomocnika
                <Input
                  value={data.agentLastName}
                  onChange={(e) =>
                    handleChange(e.target.value, "agentLastName", 1)
                  }
                  type="text"
                ></Input>
              </Label>
            </FormRow>
            <Label>
              Funkcja / stanowisko pełnomocnika
              <Input
                value={data.position}
                onChange={(e) => handleChange(e.target.value, "position", 1)}
                type="text"
              />
            </Label>
            <FormRow>
              <Label>
                E-mail pełnomocnika
                <Input
                  type="text"
                  value={data.agentEmail}
                  onChange={(e) =>
                    handleChange(e.target.value, "agentEmail", 1)
                  }
                />
              </Label>
              <Label>
                Telefon pełnomocnika{" "}
                <PhoneInput
                  value={data.agentPhone}
                  onChange={(e) =>
                    handleChange(e.target.value, "agentPhone", 1)
                  }
                />
              </Label>
            </FormRow>
          </Fieldset>
          <FormRow margin="48px 0" cols={3}>
            {show_buttons ? (
              <PrimaryButton
                type="button"
                color="dark"
                hoverColor="darkLight"
                onClick={saveForm}
              >
                Zapisz werjse roboczą
              </PrimaryButton>
            ) : (
              <PrimaryButton
                type="button"
                color="success"
                hoverColor="successDark"
                onClick={changeApplicationData}
              >
                Zaktualizuj wniosek
              </PrimaryButton>
            )}

            {completedSteps.stepOne === "error" ? (
              <PrimaryButton
                hoverColor="success"
                color="successDark"
                type="button"
                onClick={() => sendApplication()}
              >
                Zatwierdź i wyślij
              </PrimaryButton>
            ) : null}
            <PrimaryButton
              type="button"
              onClick={() =>
                show_buttons ? handleStepChange("next") : setStep(2)
              }
            >
              Kolejny krok
            </PrimaryButton>
          </FormRow>
        </FormTemplate>
      )}
    </>
  );
};

export default StepOneForm;
