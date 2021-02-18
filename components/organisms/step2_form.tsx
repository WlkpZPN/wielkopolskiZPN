import { useState } from "react";
import styled from "styled-components";

import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/form_input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import AddFile from "../molecules/add_file";
import OutlineButton from "../atoms/outline_button";
const StepTwoForm = ({ handleStepChange }) => {
  return (
    <FormTemplate>
      <Paragraph>
        Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
        potwierdzony za zgodność ze stanem faktycznym na dzień składania
        niniejszego wniosku
      </Paragraph>
      <AddFile />
      <Paragraph>Oświadczenie w przedmiocie udziału w rozgrywkach</Paragraph>
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
        <PrimaryButton onClick={() => handleStepChange("previous")}>
          Cofnij
        </PrimaryButton>
        <PrimaryButton color="dark" hoverColor="darkLight">
          Zapisz wersję roboczą
        </PrimaryButton>
        <PrimaryButton onClick={() => handleStepChange("next")}>
          Kolejny krok
        </PrimaryButton>
      </FormRow>
    </FormTemplate>
  );
};

export default StepTwoForm;
