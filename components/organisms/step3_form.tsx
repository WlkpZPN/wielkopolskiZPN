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

const StepThreeForm = ({ handleStepChange }) => {
  return (
    <FormTemplate>
      <Label>
        Zespoły młodzieżowe
        <Select>
          <option>
            Posiadamy zespoły młodzieżowe w ramach naszego podmiotu prawnego
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
      <Paragraph>Oświadczenie o opiece medycznej nad zawodnikami</Paragraph>
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

export default StepThreeForm;
