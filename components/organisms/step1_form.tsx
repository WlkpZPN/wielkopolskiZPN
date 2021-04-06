import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { useLocalStorage } from "../../middleware/hooks";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import PhoneInput from "../molecules/phone_input";
import Fieldset from "../atoms/fieldset";
import Modal from "../molecules/modal";
import StyledSpinner from "../atoms/loader";
import { extractAddressData, convertAddressData } from "../../middleware/utils";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
import ZipCodeInput from "../atoms/zip_code_input";
import RadioButton from "../atoms/radio_button";
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
  } = useContext(ApplicationContext);
  console.log(error);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    // if (checkData()) {
    //   handleStepFill("stepOne", true);
    // } else {
    //   handleStepFill("stepOne", false);
    // }
    handleStepChange("next");
  };

  const submitForm = (e) => {
    e.preventDefault();
    // to do later
    // if (!checkData()) {
    //   window.scrollTo(0, 0);
    //   return;
    // }
    // // TO DO: field type validation,change stepBox view
    // if (checkData()) {
    //   handleStepFill("stepOne", { completed: true, error: false });
    // }
    handleStepChange("next");
    console.log("form submitted");
  };

  return (
    <>
      {loading ? (
        <StyledSpinner />
      ) : (
        <FormTemplate
          onChange={() => clearErrors("stepOne")}
          onSubmit={submitForm}
        >
          <Fieldset disabled={readOnly}>
            {<ErrorMessage>{error.stepOne}</ErrorMessage>}
            <Select
              value={data.leauge}
              onChange={(e) => handleChange(e, "leauge", 1)}
            >
              <option value="IV liga">IV liga</option>
              <option value="V liga">V liga</option>
              <option value="Klasa okręgowa">Klasa okręgowa</option>
              <option value="Klasa A">Klasa A</option>
              <option value="Klasa B">Klasa B</option>
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
                  onChange={(e) => handleChange(e, "seasons", 1)}
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
                  onChange={(e) => handleChange(e, "seasons", 1)}
                >
                  2 sezony
                </RadioButton>
              </Label>
            </RadioContainer>
            <Label>
              Pełna nazwa klubu
              <Input
                value={data.clubName}
                onChange={(e) => handleChange(e, "clubName", 1)}
                type="text"
              ></Input>
            </Label>
            <Label>
              Adres klubu
              <Input
                value={data.clubStreet}
                onChange={(e) => handleChange(e, "clubStreet", 1)}
                type="text"
              ></Input>
            </Label>
            <FormRow>
              <Label>
                Kod pocztowy
                <ZipCodeInput
                  value={data.clubZipCode}
                  onChange={(e) => handleChange(e, "clubZipCode", 1)}
                />
              </Label>
              <Label>
                Miasto
                <Input
                  value={data.clubCity}
                  onChange={(e) => handleChange(e, "clubCity", 1)}
                  type="text"
                ></Input>
              </Label>
            </FormRow>
            <Label>
              Adres e-mail klubu
              <Input
                value={data.email}
                onChange={(e) => handleChange(e, "email", 1)}
                type="text"
              ></Input>
            </Label>

            <h2>Dane pełnomocnika</h2>

            <FormRow>
              <Label>
                Imię pełnomocnika
                <Input
                  value={data.agentName}
                  onChange={(e) => handleChange(e, "agentName", 1)}
                  type="text"
                ></Input>
              </Label>
              <Label>
                Nazwisko pełnomocnika
                <Input
                  value={data.agentLastName}
                  onChange={(e) => handleChange(e, "agentLastName", 1)}
                  type="text"
                ></Input>
              </Label>
            </FormRow>
            <Label>
              Funkcja / stanowisko pełnomocnika
              <Input
                value={data.position}
                onChange={(e) => handleChange(e, "position", 1)}
                type="text"
              />
            </Label>
            <FormRow>
              <Label>
                E-mail pełnomocnika
                <Input
                  value={data.agentEmail}
                  onChange={(e) => handleChange(e, "agentEmail", 1)}
                />
              </Label>
              <Label>
                Telefon pełnomocnika{" "}
                <Input
                  type="text"
                  value={data.agentPhone}
                  onChange={(e) => handleChange(e, "agentPhone", 1)}
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
              <PrimaryButton type="submit" onClick={submitForm}>
                Kolejny krok
              </PrimaryButton>

              {error.stepOne ? (
                <PrimaryButton
                  hoverColor="success"
                  color="successDark"
                  type="button"
                  onClick={() => sendApplication()}
                >
                  Zatwierdź i wyślij
                </PrimaryButton>
              ) : null}
            </FormRow>
          </Fieldset>
        </FormTemplate>
      )}
    </>
  );
};

export default StepOneForm;
