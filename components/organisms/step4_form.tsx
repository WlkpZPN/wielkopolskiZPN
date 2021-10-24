import { useState, useContext } from "react";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";

import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";

import OutlineButton from "../atoms/outline_button";

import ObjectName from "../atoms/object_name";

import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";
import ObjectForm from "./object_form";
import FutsalForm from "./futsal_object_form";

const NoObjects = styled.div`
  margin: 24px 0;

  margin-top: 0;
  font-size: 18px;
  padding: 24px 0;
  border-radius: 5px;
  /* border: 2px solid ${({ theme }) => theme.primary}; */
  max-width: 1000px;

  font-weight: 600;
  display: flex;
  flex-direction: column;
  & span {
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    margin-bottom: 32px;
  }
  & button {
    font-size: 16px;
  }
`;
const StepFourForm = ({ handleStepChange, readOnly }) => {
  const context = useContext(ApplicationContext);
  const { sport_facilities, futsal_facilities } = context.formData.stepFour;
  const currentObject = context.currentObject;
  const setCurrentobject = context.setCurrentObject;
  const { applications } = context.clubData;
  const show_buttons = context.show_buttons;
  const createNewSportFacilityForm = context.createNewSportFacilityForm;
  const createNewFutsalFacilityForm = context.createNewFutsalFacilityForm;
  const {
    error,
    clearErrors,
    completedSteps,
    changeApplicationData,
    deleteFacility,
    deleteFutsalFacility,
    formData,
  } = context;
  const [internalError, setInternalError] = useState("");
  console.log("futsal facility", futsal_facilities);
  console.log("sport facility", sport_facilities);

  const isFutsal: boolean = formData.stepOne.leauge == "futsal";
  const app_facilities = isFutsal ? futsal_facilities : sport_facilities;
  const handleNewForm = () => {
    const result =
      formData.stepOne.leauge === "futsal"
        ? createNewFutsalFacilityForm()
        : createNewSportFacilityForm();

    if (result === true) {
      setInternalError("");
    } else if (typeof result === "string") {
      setInternalError(result);
    }
  };

  const renderObjects = () => {
    let helperArr = [];
    console.log("app facilities", app_facilities);
    app_facilities.map((facility, index) => {
      helperArr.push(
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <PrimaryButton
            color="danger"
            hoverColor="dangerDark"
            style={{ marginRight: "12px" }}
            onClick={() =>
              formData.stepOne.leauge == "futsal"
                ? deleteFutsalFacility(facility)
                : deleteFacility(facility)
            }
          >
            Usuń
          </PrimaryButton>
          <ObjectName
            saved={true}
            active={index === currentObject}
            key={facility.id}
            onClick={() => setCurrentobject(index)}
          >
            {facility.name || "Obiekt 1"}
          </ObjectName>
        </div>
      );
    });
    return helperArr;
    // map sport facilities and return row of objects
  };

  const renderForms = () =>
    isFutsal ? (
      <FutsalForm objectIndex={currentObject} readOnly={readOnly} />
    ) : (
      <ObjectForm objectIndex={currentObject} readOnly={readOnly} />
    );
  return (
    <div>
      <div style={{ display: "flex", marginTop: "32px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "16px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {renderObjects()}
        </div>
        <ErrorMessage>{error.stepFour}</ErrorMessage>
        {app_facilities.length === 0 ? null : (
          <Fieldset style={{ padding: 0 }} disabled={readOnly}>
            <OutlineButton
              type="button"
              onClick={(e) => {
                readOnly ? null : handleNewForm();
              }}
              align="flex-start"
            >
              + Dodaj kolejny obiekt
            </OutlineButton>
          </Fieldset>
        )}
      </div>
      {error ? <ErrorMessage>{internalError}</ErrorMessage> : null}
      {app_facilities.length === 0 ? (
        <NoObjects>
          Nie posiadasz żadnych obiektów sportowych. Dodaj je, klikając przycisk
          poniżej Wymagane jest wprowadzenie min. 1 obiektu. Pamiętaj aby
          zapisać obiekt po wypełnieniu danych, klikając przycisk "Zapisz".
          <OutlineButton
            style={{
              marginTop: "15px",
            }}
            onClick={() => {
              clearErrors("stepFour");
              handleNewForm();
            }}
            align="flex-start"
          >
            Utwórz obiekt
          </OutlineButton>
        </NoObjects>
      ) : (
        renderForms()
      )}

      <div style={{ margin: "40px 0" }}>
        <PrimaryButton
          type="button"
          style={{ marginRight: "16px" }}
          onClick={() => handleStepChange("jump", 3)}
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
            {completedSteps.stepFour === "error" ? (
              <PrimaryButton
                style={{ marginRight: "16px" }}
                hoverColor="success"
                color="successDark"
                type="button"
                onClick={() => context.sendApplication()}
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
          onClick={() => handleStepChange("jump", 5)}
        >
          Kolejny krok
        </PrimaryButton>
      </div>
    </div>
  );
};

export default StepFourForm;
