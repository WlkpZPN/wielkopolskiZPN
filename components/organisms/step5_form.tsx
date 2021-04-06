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
const StepFiveForm = ({ handleStepChange, readOnly }) => {
  const context = useContext(ApplicationContext);
  const handleChange = context.handleFormChange;
  const formData = context.formData.stepFive;
  const show_buttons = context.show_buttons;
  const { error, clearErrors } = context;

  const submitForm = (e) => {
    e.preventDefault();
    handleStepChange("next");
  };
  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate onChange={() => clearErrors("stepFive")}>
        {<ErrorMessage>{error.stepFive}</ErrorMessage>}
        <FormStatement
          value={formData.NoObligationsTowardsEmployees}
          handleChange={() =>
            handleChange(
              !formData.NoObligationsTowardsEmployees,
              "NoObligationsTowardsEmployees",
              5
            )
          }
          name="Oświadczenie o braku zobowiązań wobec pracowników"
        />
        <FormStatement
          value={formData.NoObligationsTowardsPzpnAndWzpn}
          handleChange={() =>
            handleChange(
              !formData.NoObligationsTowardsPzpnAndWzpn,
              "NoObligationsTowardsPzpnAndWzpn",
              5
            )
          }
          name="Oświadczenie o braku zobowiązań wobec PZPN i Wielkopolskiego ZPN"
        />
        <FormStatement
          value={formData.NoObligationTowardsFootballClubs}
          handleChange={() =>
            handleChange(
              !formData.NoObligationTowardsFootballClubs,
              "NoObligationTowardsFootballClubs",
              5
            )
          }
          name="Oświadczenie o braku zobowiązań wobec klubów piłkarskich"
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
                hoverColor="darkLight"
                type="button"
                onClick={context.saveForm}
                style={{ marginRight: "16px" }}
              >
                Zapisz wersję roboczą
              </PrimaryButton>
              {error.stepFive ? (
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

export default StepFiveForm;
