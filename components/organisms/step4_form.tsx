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
import AddFile from "../molecules/add_file";
import OutlineButton from "../atoms/outline_button";
import Info from "../atoms/Info";
import ObjectName from "../atoms/object_name";
import ObjectForm from "./object_form";
import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";
const StepFourForm = ({ handleStepChange, readOnly }) => {
  const context = useContext(ApplicationContext);
  const { sport_facilities } = context.formData.stepFour;
  const currentObject = context.currentObject;
  const setCurrentobject = context.setCurrentObject;
  console.log(context.formData.stepFour.sport_facilities);
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
          <OutlineButton onClick={handleNewForm} align="flex-start">
            + Dodaj kolejny obiekt
          </OutlineButton>
        </div>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Fieldset>

      <ObjectForm objectIndex={currentObject} readOnly={readOnly} />
      <FormRow cols="3">
        <PrimaryButton onClick={() => handleStepChange("previous")}>
          Cofnij
        </PrimaryButton>
        <PrimaryButton
          color="dark"
          hoverColor="darkLight"
          type="button"
          onClick={context.saveForm}
        >
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
