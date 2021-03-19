import { useState, useContext } from "react";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import AddFilesWrapper from "./add_files_wrapper";
import OutlineButton from "../atoms/outline_button";
import FormStatement from "../molecules/form_statement";
import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";
const StepTwoForm = ({ handleStepChange, readOnly }) => {
  const [state, setState] = useState(false);
  const context = useContext(ApplicationContext);
  const {
    fileData,
    handleFileChange,
    deleteFile,
    handleStepFill,
    error,
    clearErrors,
    show_buttons,
  } = context;
  const fileArr = context.formData.stepTwo.krs_documents;
  const handleChange = context.handleFormChange;
  const data = context.formData.stepTwo;

  const nextStep = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // const valid = checkData();
    // if (!valid) {
    //   return;
    // }
    handleStepFill("stepTwo", {
      completed: true,
      error: false,
    });
    handleStepChange("next");
  };

  const setFiles = (id, file) => {
    handleFileChange(id, file, file.name, "krs_documents");
    setState(!state);
  };

  const handleDelete = (id) => {
    deleteFile(id, "krs_documents");
    setState(!state);
  };

  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate
        onChange={() => clearErrors("stepTwo")}
        onSubmit={handleSubmit}
      >
        <Paragraph>
          Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
          potwierdzony za zgodność ze stanem faktycznym na dzień składania
          niniejszego wniosku.
        </Paragraph>
        <AddFilesWrapper
          deleteFile={handleDelete}
          fileData={fileArr}
          setFiles={setFiles}
        />
        {<ErrorMessage>{error.stepTwo}</ErrorMessage>}
        <FormStatement
          value={data.participateInCompetitions}
          handleChange={() =>
            handleChange(
              !data.participateInCompetitions,
              "participateInCompetitions",
              2
            )
          }
          name="Oświadczenie w przedmiocie udziału w rozgrywkach"
        />
        <FormStatement
          value={data.privateDataProtection}
          handleChange={() =>
            handleChange(
              !data.privateDataProtection,
              "privateDataProtection",
              2
            )
          }
          name=" Oświadczenie o stosowaniu dokumentacji ochorny danych osobowych"
        />

        <FormRow cols="3">
          <PrimaryButton onClick={() => handleStepChange("previous")}>
            Cofnij
          </PrimaryButton>
          {show_buttons ? (
            <PrimaryButton
              type="button"
              onClick={context.saveForm}
              color="dark"
              hoverColor="darkLight"
            >
              Zapisz wersję roboczą
            </PrimaryButton>
          ) : null}
          <PrimaryButton type="submit" onClick={nextStep}>
            Kolejny krok
          </PrimaryButton>
        </FormRow>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepTwoForm;
