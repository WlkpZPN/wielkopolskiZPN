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
import Info from "../atoms/Info";
import ObjectName from "../atoms/object_name";

const StepFiveForm = ({ handleStepChange }) => {
  return (
    <FormTemplate>
      <Paragraph>Oświadczenie o braku zobowiązań wobec pracowników</Paragraph>
      <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
      <Label margin="16px 0" direction="row">
        <RadioSquare />
        Potwierdzam treść oświadczenia
      </Label>
      <Paragraph>
        Oświadczenie o braku zobowiązań wobec PZPN i Wielkopolskiego ZPN
      </Paragraph>
      <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
      <Label margin="16px 0" direction="row">
        <RadioSquare />
        Potwierdzam treść oświadczenia
      </Label>
      <Paragraph>
        Oświadczenie o braku zobowiązań wobec klubów piłkarskich
      </Paragraph>
      <OutlineButton>Pokaż treść oświadczenia</OutlineButton>
      <Label margin="16px 0" direction="row">
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

export default StepFiveForm;
