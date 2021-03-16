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

const NoObjects = styled.div`
  margin: 32px 0;
  margin-top: 0;
  font-size: 18px;
  padding: 24px 32px;
  border-radius: 5px;
  /* border: 2px solid ${({ theme }) => theme.primary}; */
  width: max-content;
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
  const { sport_facilities } = context.formData.stepFour;
  const currentObject = context.currentObject;
  const setCurrentobject = context.setCurrentObject;

  const createNewSportFacilityForm = context.createNewSportFacilityForm;
  const [error, setError] = useState("");

  const handleNewForm = () => {
    const result = createNewSportFacilityForm();
    console.log(result);
    if (result === true) {
      console.log("new form added");
    } else if (typeof result === "string") {
      setError(result);
    }
  };

  const renderObjects = () => {
    let helperArr = [];
    sport_facilities.map((facility, index) => {
      helperArr.push(
        <ObjectName
          active={index === currentObject}
          key={index}
          onClick={() => setCurrentobject(index)}
        >
          {facility.name === "" ? "Obiekt 1" : facility.name}
        </ObjectName>
      );
    });
    return helperArr;
    // map sport facilities and return row of objects
  };
  return (
    <div>
      <Fieldset disabled={readOnly}>
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
          {sport_facilities.length === 0 ? null : (
            <OutlineButton
              style={{ padding: "6px 16px" }}
              onClick={handleNewForm}
              align="flex-start"
            >
              + Dodaj kolejny obiekt
            </OutlineButton>
          )}
        </div>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Fieldset>

      {sport_facilities.length === 0 ? (
        <NoObjects>
          Nie posiadasz żadnych obiektów sportowych,dodaj je klikając przycisk
          poniżej (wymagane jest posiadanie min. 1 obiektu)
          <span>Pamiętaj aby zapisać obiekt po wypełnienu danych</span>
          <OutlineButton onClick={handleNewForm} align="flex-start">
            Utwórz obiekt
          </OutlineButton>
        </NoObjects>
      ) : (
        <ObjectForm objectIndex={currentObject} readOnly={readOnly} />
      )}
      <div style={{ marginLeft: "32px" }}>
        <PrimaryButton
          style={{ marginRight: "16px" }}
          onClick={() => handleStepChange("previous")}
        >
          Cofnij
        </PrimaryButton>
        <PrimaryButton
          color="dark"
          hoverColor="darkLight"
          type="button"
          onClick={context.saveForm}
          style={{ marginRight: "16px" }}
        >
          Zapisz wersję roboczą
        </PrimaryButton>
        <PrimaryButton onClick={() => handleStepChange("next")}>
          Kolejny krok
        </PrimaryButton>
      </div>
    </div>
  );
};

export default StepFourForm;
