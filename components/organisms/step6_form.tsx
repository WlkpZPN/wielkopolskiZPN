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

  const {
    error,
    clearErrors,
    sendApplication,
    completedSteps,
    setStep,
    changeApplicationData,
  } = context;
  const submitForm = (e) => {
    e.preventDefault();

    // if (!formData.havingFootballStaff || !formData.HavingSecurityServices) {
    //   setError("Proszę zaakceptować poniższe oświadczenia");
    //   return;
    // }

    handleStepChange("next");
  };
  return (
    <FormTemplate onChange={() => clearErrors("")}>
      <Fieldset disabled={readOnly}>
        <ErrorMessage>{error.stepSix}</ErrorMessage>
        <FormStatement
          text="Oświadczamy, że nasz klub ma kierownika ds. bezpieczeństwa lub osobę odpowiedzialną za problematykę ochrony i bezpieczeństwa (kryterium P.02), lekarza/ratownika medycznego lub inną osobę posiadającą stosowne uprawnienia odpowiedzialnego/ą za udzielenie pierwszej pomocy medycznej (kryterium P.03), trenera pierwszego zespołu (kryterium P.04) oraz spikera zawodów piłkarskich (kryterium P.05). 
"
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
          text="Oświadczamy, że nasz klub zapewni odpowiednią ilość służb porządkowych i informacyjnych lub wolontariuszy zapewniających bezpieczeństwo i obsługę meczów rozgrywanych przez klub w charakterze gospodarza, zgodnie z kryterium P.06."
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
      </Fieldset>

      <div style={{ marginBottom: "32px" }}>
        <PrimaryButton
          style={{ marginRight: "16px" }}
          onClick={() =>
            show_buttons ? handleStepChange("previous") : setStep(5)
          }
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
            {completedSteps.stepSix === "error" ? (
              <PrimaryButton
                hoverColor="success"
                color="successDark"
                type="button"
                onClick={() => sendApplication()}
                style={{ marginRight: "16px" }}
              >
                Zatwierdź i wyślij
              </PrimaryButton>
            ) : null}
          </>
        ) : (
          <PrimaryButton
            type="button"
            color="success"
            hoverColor="successDark"
            onClick={changeApplicationData}
          >
            Zaktualizuj wniosek
          </PrimaryButton>
        )}
        <PrimaryButton
          style={{ marginLeft: "16px" }}
          type="button"
          onClick={() => (show_buttons ? handleStepChange("next") : setStep(7))}
        >
          Kolejny krok
        </PrimaryButton>
      </div>
    </FormTemplate>
  );
};

export default StepSixForm;
