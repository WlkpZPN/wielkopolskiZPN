import { useState, useContext } from "react";
import styled from "styled-components";

import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import AddFile from "../molecules/add_file";
import OutlineButton from "../atoms/outline_button";
import Info from "../atoms/Info";
import ObjectName from "../atoms/object_name";
import Fieldset from "../atoms/fieldset";
import FormStatement from "../molecules/form_statement";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
const StepSixForm = ({ handleStepChange, readOnly }) => {
  //const [error, setError] = useState("");
  const context = useContext(ApplicationContext);
  const formData = context.formData.stepSix;
  const handleChange = context.handleFormChange;
  const show_buttons = context.show_buttons;

  const { error, clearErrors, sendApplication } = context;
  const submitForm = (e) => {
    e.preventDefault();

    // if (!formData.havingFootballStaff || !formData.HavingSecurityServices) {
    //   setError("Proszę zaakceptować poniższe oświadczenia");
    //   return;
    // }

    handleStepChange("next");
  };
  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate onChange={() => clearErrors("")}>
        <ErrorMessage>{error.stepSix}</ErrorMessage>
        <FormStatement
          value={formData.havingFootballStaff}
          handleChange={() =>
            handleChange(
              !formData.havingFootballStaff,
              "havingFootballStaff",
              6
            )
          }
          name="Oświadczenie o posiadaniu personelu ds. piłki nożnej"
        />

        <FormStatement
          value={formData.HavingSecurityServices}
          handleChange={() =>
            handleChange(
              !formData.HavingSecurityServices,
              "HavingSecurityServices",
              6
            )
          }
          name=" Oświadczenie o posiadaniu służb porządkowych"
        />

        <div>
          <PrimaryButton
            style={{ marginRight: "16px" }}
            onClick={() => handleStepChange("previous")}
          >
            Cofnij
          </PrimaryButton>
          {show_buttons ? (
            <>
              <PrimaryButton
                color="dark"
                type="button"
                hoverColor="darkLight"
                onClick={context.saveForm}
                style={{ marginRight: "16px" }}
              >
                Zapisz wersję roboczą
              </PrimaryButton>
              {error.stepSix ? (
                <PrimaryButton
                  hoverColor="success"
                  color="successDark"
                  type="button"
                  onClick={() => context.sendApplication()}
                  style={{ marginRight: "16px" }}
                >
                  Zatwierdź i wyślij
                </PrimaryButton>
              ) : null}
            </>
          ) : null}
          <PrimaryButton onClick={submitForm}>Kolejny krok</PrimaryButton>
        </div>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepSixForm;
