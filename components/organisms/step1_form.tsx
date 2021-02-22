import styled from "styled-components";
import { useContext } from "react";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/form_input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import PhoneInput from "../molecules/phone_input";

import { ApplicationContext } from "./club_application";
const StepOneForm = ({ handleStepChange }) => {
  const applicationData = useContext(ApplicationContext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormTemplate onSubmit={handleSubmit}>
      <Select>
        <option>IV liga</option>
        <option>III liga</option>
        <option>II liga</option>
        <option>I liga</option>
      </Select>
      <RadioContainer>
        <p>Zaznacz,na ile sezonów ubiegasz się o licencje</p>
        <Label direction="row" htmlFor="1">
          <Input type="radio" id="1" name="seasons" value={1} />1 sezon
        </Label>
        <Label direction="row" htmlFor="2">
          <Input type="radio" value={2} name="seasons" id="2" />2 sezony
        </Label>
      </RadioContainer>
      <Label>
        Pełna nazwa klubu
        <Input type="text"></Input>
      </Label>
      <Label>
        Adres klubu
        <Input type="text"></Input>
      </Label>
      <FormRow>
        <Label>
          Kod pocztowy
          <Input type="text"></Input>
        </Label>
        <Label>
          Miasto
          <Input type="text"></Input>
        </Label>
      </FormRow>
      <Label>
        Adres e-mail klubu
        <Input type="text"></Input>
      </Label>

      <h2>Dane pełnomocnika</h2>

      <FormRow>
        <Label>
          Imię pełnomocnika
          <Input type="text"></Input>
        </Label>
        <Label>
          Nazwisko pełnomocnika
          <Input type="text"></Input>
        </Label>
      </FormRow>
      <Label>
        Funkcja / stanowisko pełnomocnika
        <Input type="text" />
      </Label>
      <FormRow>
        <Label>
          E-mail pełnomocnika
          <Input type="text" />
        </Label>
        <Label>
          Telefon pełnomocnika <PhoneInput />
        </Label>
      </FormRow>

      <FormRow margin="48px 0" cols={3}>
        <PrimaryButton color="dark" hoverColor="darkLight">
          Zapisz werjse roboczą
        </PrimaryButton>
        <PrimaryButton type="submit" onClick={() => handleStepChange("next")}>
          Kolejny krok
        </PrimaryButton>
      </FormRow>
    </FormTemplate>
  );
};

export default StepOneForm;
