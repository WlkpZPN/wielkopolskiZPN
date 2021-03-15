import { useState, useContext } from "react";
import styled from "styled-components";

import FormTemplate from "../atoms/form_template";

import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";

import Fieldset from "../atoms/fieldset";
import { ApplicationContext } from "./club_application";
import ErrorMessage from "../atoms/error_message";
import AddFilesWrapper from "./add_files_wrapper";
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
  } = context;
  const stepTwoFiles = context.formData.stepTwo.krs_documents;
  const stepThreeFiles = context.formData.stepThree.agreement_documents;
  const stepFourFiles =
    context.formData.stepFour.sport_facilities[context.currentObject]
      .applications_attachments;

  const intensityDocuments = stepFourFiles.filter(
    (file) => file.category === "I17_intensity_document"
  );

  const agreementDocuments = stepFourFiles.filter(
    (file) => file.category === "I01_agreement"
  );
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate onChange={() => setError("")}>
        <ErrorMessage>{error}</ErrorMessage>
        <Paragraph>
          W swoim zgłoszeniu licencyjnym załączyłeś poniższe załączniki. Prosimy
          sprawdź ich aktualność.
        </Paragraph>

        {stepTwoFiles.length > 0 ? (
          <>
            <Paragraph>
              {" "}
              Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
              potwierdzony za zgodność ze stanem faktycznym na dzień składania
              niniejszego wniosku.
            </Paragraph>{" "}
            <AddFilesWrapper
              deleteFile={(id) => {
                deleteFile(id, "krs_documents");
                setState(!state);
              }}
              fileData={stepTwoFiles}
              setFiles={(id, file) => {
                handleFileChange(id, file, file.name, "krs_documents");
                setState(!state);
              }}
            />
          </>
        ) : null}

        {stepThreeFiles.length > 0 ? (
          <>
            <Paragraph>
              Kopia Porozumienia na szkolenie młodzieży z klubem {clubName}
            </Paragraph>{" "}
            <AddFilesWrapper
              deleteFile={(id) => {
                deleteFile(id, "agreement_documents");
                setState(!state);
              }}
              fileData={stepThreeFiles}
              setFiles={(id, file) => {
                handleFileChange(id, file, file.name, "agreement_documents");
                setState(!state);
              }}
            />
          </>
        ) : null}

        {agreementDocuments.length > 0 ? (
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
        ) : null}

        {intensityDocuments.length > 0 ? (
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
        ) : null}

        <div style={{ marginTop: "32px" }}>
          <PrimaryButton
            style={{ marginRight: "16px" }}
            onClick={() => handleStepChange("previous")}
          >
            Cofnij
          </PrimaryButton>
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
          </PrimaryButton>
        </div>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepSevenForm;
