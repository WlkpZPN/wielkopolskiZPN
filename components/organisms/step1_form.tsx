import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../../middleware/hooks";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import PhoneInput from "../atoms/phone_input";
import Fieldset from "../atoms/fieldset";
import Modal from "../molecules/modal";
import StyledSpinner from "../atoms/loader";
import { extractAddressData, convertAddressData } from "../../middleware/utils";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
import ZipCodeInput from "../atoms/zip_code_input";
import RadioButton from "../atoms/radio_button";
import { createSeasons } from "../../middleware/utils";
const StepOneForm = ({
  data,
  handleChange,
  clubData,
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
    completedSteps,
  } = useContext(ApplicationContext);
  // console.log(error);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    switch (data.leauge) {
      case "iv liga":
        handleChange("iv liga", "leauge", 1);
        return;
      case "v liga":
        handleChange("v liga", "leauge", 1);
        return;
      case "klasa okręgowa":
        handleChange("iv liga", "leauge", 1);
        return;
      case "klasa a":
        handleChange("iv liga", "leauge", 1);
        return;
      case "klasa b":
        handleChange("iv liga", "leauge", 1);
        return;
      case "młodzież":
        handleChange("iv liga", "leauge", 1);
        return;
      default:
        handleChange(null, "leauge", 1);
        return;
    }
  }, []);
  return (
    <>
      {loading ? (
        <StyledSpinner />
      ) : (
        <FormTemplate onChange={() => clearErrors("stepOne")}>
          <Fieldset disabled={readOnly}>
            {<ErrorMessage>{error.stepOne}</ErrorMessage>}
            <Select
              value={data.leauge}
              onChange={(e) => handleChange(e.target.value, "leauge", 1)}
            >
              <option value={null}>brak</option>
              <option value="iv liga">IV liga</option>
              <option value="v liga">V liga</option>
              <option value="klasa okręgowa">Klasa okręgowa</option>
              <option value="klasa a">Klasa A</option>
              <option value="klasa b">Klasa B</option>
              <option value="młodzież">Ligi młodzieżowe</option>
            </Select>
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
            <Label>
              Adres e-mail klubu
              <Input
                value={data.email}
                onChange={(e) => handleChange(e.target.value, "email", 1)}
                type="text"
              ></Input>
            </Label>

            <h2>Dane pełnomocnika</h2>

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
              ) : null}

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
                onClick={() => handleStepChange("next")}
              >
                Kolejny krok
              </PrimaryButton>
            </FormRow>
          </Fieldset>
        </FormTemplate>
      )}
    </>
  );
};

export default StepOneForm;
