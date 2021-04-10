import { useState, useContext } from "react";
import styled from "styled-components";

import FormTemplate from "../atoms/form_template";

import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import Label from "../atoms/form_label";
import Fieldset from "../atoms/fieldset";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
import AddFilesWrapper from "./add_files_wrapper";
import OutlineButton from "../atoms/outline_button";
import ObjectName from "../atoms/object_name";
const StepSevenForm = ({ handleStepChange, readOnly }) => {
  const [state, setState] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(ApplicationContext);
  const clubName = context.formData.stepThree.clubAgreementName;
  const {
    handleObjectFileChange,
    handleObjectFileDelete,
    handleFileChange,
    deleteFile,
    sendApplication,
    formData,
    handleFormChange,
    show_buttons,
    setCurrentobject,
    currentObject,
    clubData,
  } = context;
  const stepTwoFiles = context.clubData.applications[0].applications_attachments.filter(
    (file) => file.category === "krs_documents"
  );
  const stepThreeFiles = context.clubData.applications[0].applications_attachments.filter(
    (file) => file.category === "agreement_documents"
  );

  const stepFourFIles = context.clubData.applications[0]?.sport_facilities[
    currentObject
  ].applications_attachments.filter((file) => file.category === "");

  const isSuperVision = () => {
    if (stepTwoFiles.length === 0) {
      return true;
    }
    if (
      context.formData.stepThree.youthGroupsPossession ===
        "nie posiadamy zespołów" &&
      stepThreeFiles.length === 0
    ) {
      return true;
    }
    if (
      context.formData.stepFour.I01_1 === "false"
      // &&
      // agreementDocuments.length === 0
    ) {
      return true;
    }

    if (
      context.formData.stepFour.I17_1
      // && intensityDocuments.length === 0
    ) {
      return true;
    }

    return false;
  };

  const renderFacilityNames = () => {
    const objects = formData.stepFour.sport_facilities;

    return objects.map((facility, index) => (
      <ObjectName
        onClick={() => setCurrentobject(index)}
        key={index}
        saved={true}
        active={index === currentObject}
      >
        {facility.name || "Obiekt 1"}
      </ObjectName>
    ));
  };

  const submitForm = (e) => {
    e.preventDefault();
    sendApplication();
  };
  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate onChange={() => setError("")}>
        <ErrorMessage>{error}</ErrorMessage>
        <Paragraph>
          W swoim zgłoszeniu licencyjnym załączyłeś poniższe załączniki. Prosimy
          sprawdź ich aktualność.
        </Paragraph>
        <Paragraph>
          {" "}
          Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
          potwierdzony za zgodność ze stanem faktycznym na dzień składania
          niniejszego wniosku.
        </Paragraph>{" "}
        <AddFilesWrapper
          text="Oświadczamy, że nasz klub przekazuje w załączeniu odpis aktualnego rejestru z Krajowego Rejestru Sądowego lub ewidencji prowadzonej przez właściwego starostę/prezydenta zawierający następujące informacje: nazwa Wnioskodawcy, siedziba Wnioskodawcy, forma prawna Wnioskodawcy, lista osób upoważnionych do składania oświadczeń woli w imieniu Wnioskodawcy, sposób reprezentacji Wnioskodawcy."
          category="krs_documents"
          id={clubData.applications[0].id}
          // deleteFile={(id) => {
          //   deleteFile(id, "krs_documents");
          //   setState(!state);
          // }}
          // fileData={stepTwoFiles}
          // setFiles={(id, file) => {
          //   handleFileChange(id, file, file.name, "krs_documents");
          //   setState(!state);
          // }}
        />
        {context.formData.stepThree.youthGroupsPossession ===
        "porozumienie na szkolenie" ? (
          <>
            <Paragraph>
              Kopia Porozumienia na szkolenie młodzieży z klubem {clubName}
            </Paragraph>{" "}
            <AddFilesWrapper
              id={clubData.applications[0].id}
              category="agreement_documents"
              text={null}
            />
          </>
        ) : null}
        {/* {renderFacilityNames()} */}
        {/* {agreementDocuments.length > 0 ? (
          <>
            <Paragraph>
              {" "}
              Umowa gwarantująca prawo do korzystania z obiektu sportowego{" "}
            </Paragraph>{" "}
            <AddFilesWrapper
              deleteFile={(id) => {
                handleObjectFileDelete(
                  context.currentObject,
                  id,
                  "I01_agreement"
                );
                setState(!state);
              }}
              fileData={agreementDocuments}
              setFiles={(id, file) => {
                handleObjectFileChange(
                  id,
                  file,
                  file.name,
                  "I01_agreement",
                  context.CurrentObject
                );
                setState(!state);
              }}
            />
          </>
        ) : null} */}
        {/* {intensityDocuments.length > 0 ? (
          <>
            <Paragraph>
              {" "}
              Dokument poświadczający pomiar natężenia światła
            </Paragraph>
            <AddFilesWrapper
              deleteFile={(id) => {
                handleObjectFileDelete(
                  context.currentObject,
                  id,
                  "I17_intensity_document"
                );
                setState(!state);
              }}
              fileData={intensityDocuments}
              setFiles={(id, file) => {
                handleObjectFileChange(
                  id,
                  file,
                  file.name,
                  "I17_intensity_document",
                  context.CurrentObject
                );
                setState(!state);
              }}
            />
          </>
        ) : null} */}
        {isSuperVision() ? (
          <ErrorMessage>
            Brak wszystkich dokumentów, zostanie wydana licencja z nadzorem
            (istnieje możliwość późniejszego dosłania dokumentów)
          </ErrorMessage>
        ) : null}
        <Paragraph>
          Informacje dotyczące płatności za procedurę licencyjną
        </Paragraph>
        <Label pointer>
          <span>
            <RadioSquare
              value={formData.stepSeven.invoice_required}
              handleChange={(e) =>
                handleFormChange(
                  !formData.stepSeven.invoice_required,
                  "invoice_required",
                  7
                )
              }
            />{" "}
            Chcemy otrzymać fakturę przed dokonaniem płatności
          </span>
        </Label>
        <div style={{ marginTop: "32px" }}>
          <PrimaryButton
            style={{ marginRight: "16px" }}
            onClick={() => handleStepChange("previous")}
          >
            Cofnij
          </PrimaryButton>
          {show_buttons ? (
            <>
              {" "}
              <PrimaryButton
                style={{ marginRight: "16px" }}
                color="dark"
                hoverColor="darkLight"
              >
                Zapisz wersję roboczą
              </PrimaryButton>
              <PrimaryButton
                color="successDark"
                hoverColor="success"
                onClick={submitForm}
              >
                Zatwierdź i wyślij do Wielkopolskiego ZPN
              </PrimaryButton>{" "}
            </>
          ) : null}
        </div>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepSevenForm;
