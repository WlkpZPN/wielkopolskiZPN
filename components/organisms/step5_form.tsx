import { useContext } from "react";

import FormTemplate from "../atoms/form_template";

import PrimaryButton from "../atoms/primary_button";

import Fieldset from "../atoms/fieldset";
import FormStatement from "../molecules/form_statement";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
const StepFiveForm = ({ handleStepChange, readOnly }) => {
  const context = useContext(ApplicationContext);
  const handleChange = context.handleFormChange;
  const formData = context.formData.stepFive;
  const show_buttons = context.show_buttons;
  const { error, clearErrors, completedSteps, setStep, changeApplicationData } =
    context;

  const submitForm = (e) => {
    e.preventDefault();
    handleStepChange("next");
  };
  return (
    <FormTemplate onChange={() => clearErrors("stepFive")}>
      <Fieldset disabled={readOnly}>
        {<ErrorMessage>{error.stepFive}</ErrorMessage>}
        <FormStatement
          text="Oświadczamy, że nasz klub w dniu, w którym rozpoczyna się dany Sezon Licencyjny nie ma żadnych przeterminowanych zobowiązań wobec pracowników (tj. zawodników i trenerów wszystkich drużyn klubu oraz personelu uwzględnionego w kryteriach od P.01 do P.05), które powstały do dnia 31 grudnia roku kalendarzowego poprzedzającego rok, w którym rozpoczyna się dany Sezon Licencyjny."
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
          text="
Oświadczamy, że nasz klub na dzień, w którym rozpoczyna się dany Sezon Licencyjny nie ma żadnych przeterminowanych zobowiązań wobec Polskiego Związku Piłki Nożnej, Wojewódzkiego Związku Piłki Nożnej jak również innych struktur działających w ramach Wojewódzkiego Związku Piłki Nożnej z tytułu płatności składek członkowskich, opłat za uczestnictwo w rozgrywkach, z tytułu działalności transferowej, kar nałożonych przez właściwe organy dyscyplinarne czy prawomocnych wyroków Piłkarskiego Sądu Polubownego, które powstały do dnia 31 grudnia roku kalendarzowego poprzedzającego rok, w którym rozpoczyna się dany Sezon Licencyjny.
"
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
          text="Oświadczamy, że nasz klub na dzień, w którym rozpoczyna się dany Sezon Licencyjny nie posiada przeterminowanych zobowiązań wobec klubów piłkarskich z tytułu działalności transferowej, które powstały do dnia 31 grudnia roku kalendarzowego poprzedzającego rok, w którym rozpoczyna się dany Sezon Licencyjny.
"
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
      </Fieldset>
      <div style={{ marginBottom: "32px" }}>
        <PrimaryButton
          style={{ marginRight: "16px" }}
          onClick={() =>
            show_buttons ? handleStepChange("previous") : setStep(4)
          }
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
            {completedSteps.stepFive === "error" ? (
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
          onClick={() => (show_buttons ? handleStepChange("next") : setStep(6))}
        >
          Kolejny krok
        </PrimaryButton>
      </div>
    </FormTemplate>
  );
};

export default StepFiveForm;
