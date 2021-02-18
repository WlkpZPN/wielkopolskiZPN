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
import ObjectForm from "./object_form";
const StepFourForm = ({ handleStepChange }) => {
  return (
    <div>
      <FormTemplate>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "16px",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <ObjectName>Obiekt 1</ObjectName>
          </div>
          <OutlineButton align="flex-start">
            + Dodaj kolejny obiekt
          </OutlineButton>
        </div>
        <Label>
          Nazwa obiektu sportowego
          <Input type="text" />
          <Info />
        </Label>
        <Label>
          Adres obiektu sportowego
          <Input type="text" />
          <Info />
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
      </FormTemplate>
      <ObjectForm />
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
    </div>
  );
};

export default StepFourForm;
