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
import AddFilesWrapper from "./add_files_wrapper";
import OutlineButton from "../atoms/outline_button";
import FormStatement from "../molecules/form_statement";
const StepTwoForm = ({ handleStepChange }) => {
  const [formData, setFormData] = useState({
    files: [],
    participateInCompetitions: false,
    privateDataProtection: false,
  });

  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(files);
  };

  return (
    <FormTemplate onSubmit={handleSubmit}>
      <Paragraph>
        Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
        potwierdzony za zgodność ze stanem faktycznym na dzień składania
        niniejszego wniosku
      </Paragraph>
      <AddFilesWrapper files={files} setFiles={setFiles} />

      <FormStatement name="Oświadczenie w przedmiocie udziału w rozgrywkach" />
      <FormStatement name=" Oświadczenie o stosowaniu dokumentacji ochorny danych osobowych" />

      <FormRow cols="3">
        <PrimaryButton onClick={() => handleStepChange("previous")}>
          Cofnij
        </PrimaryButton>
        <PrimaryButton color="dark" hoverColor="darkLight">
          Zapisz wersję roboczą
        </PrimaryButton>
        <PrimaryButton type="submit" onClick={() => handleStepChange("next")}>
          Kolejny krok
        </PrimaryButton>
      </FormRow>
    </FormTemplate>
  );
};

export default StepTwoForm;
