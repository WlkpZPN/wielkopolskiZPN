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
import AddFacilityFilesWrapper from "../organisms/add_facility_files_wrapper";
const StepSevenForm = ({ handleStepChange, readOnly }) => {
  const [regulations, setRegulations] = useState(false);
  const [state, setState] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(ApplicationContext);
  const clubName = context.formData.stepThree.clubAgreementName;
  const {
    setStep,
    sendApplication,
    formData,
    handleFormChange,
    show_buttons,
    setCurrentObject,
    currentObject,
    clubData,
    fileEdit,
  } = context;
  const stepTwoFiles = context.clubData.applications[0].applications_attachments.filter(
    (file) => file.category === "krs_documents"
  );
  const stepThreeFiles = context.clubData.applications[0].applications_attachments.filter(
    (file) => file.category === "agreement_documents"
  );

  const isSuperVision = () => {
    if (stepTwoFiles.length === 0) {
      return true;
    }

    if (
      stepThreeFiles.length === 0 &&
      formData.stepThree.youthGroupsPossession === "porozumienie na szkolenie"
    ) {
      return true;
    }
    if (
      stepThreeFiles.length === 0 &&
      formData.stepThree.youthGroupsPossession === "porozumienie na szkolenie"
    ) {
      return true;
    }

    formData.stepFour.sport_facilities.forEach((facility) => {
      const files1 = facility.applications_attachments.filter(
        (el) => el.category === "I01_agreement"
      );

      const files2 = facility.applications_attachments.filter(
        (el) => el.category === "I17_intensity_level"
      );
      if (facility.I01_1 === false && files1.length === 0) {
        return true;
      }
      if (facility.I17_1 === true && files2.length === 0) {
        return true;
      }
    });

    return false;
  };

  const renderFacilityNames = () => {
    const objects = formData.stepFour.sport_facilities;

    return objects.map((facility, index) => {
      if (facility.I01_1 || facility.I17_1) {
        return (
          <ObjectName
            style={{ marginLeft: "-10px" }}
            onClick={() => setCurrentObject(index)}
            key={index}
            saved={true}
            active={index === currentObject}
          >
            {facility.name || "Obiekt 1"}
          </ObjectName>
        );
      }
    });
  };

  const renderFacilityFiles = () => {
    const fileArr = [];
    const currentObj = formData.stepFour.sport_facilities[currentObject];
    const fileData = currentObj.applications_attachments;
    if (currentObj.I01_1 === false) {
      fileArr.push(
        <>
          <Paragraph>
            Umowa gwarantująca prawo do korzystania z obiektu sportowego
          </Paragraph>
          <AddFacilityFilesWrapper
            upload={true}
            files={fileData}
            category="I01_agreement"
            text={null}
          />{" "}
        </>
      );
    }

    if (currentObj.I17_1 === true) {
      fileArr.push(
        <>
          <Paragraph>
            Dokument poświadczający pomiar natężenia światła
          </Paragraph>
          <AddFacilityFilesWrapper
            upload={true}
            files={fileData}
            category="I17_intensity_level"
            text={null}
          />
        </>
      );
    }

    return fileArr;
  };
  const submitForm = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    e.preventDefault();

    if (!regulations) {
      setError(
        "Prosimy o zapoznanie się i zaakceptowanie regulaminu płatności przed wysłaniem wniosku"
      );
      return;
    }
    sendApplication();
  };
  return (
    <Fieldset>
      <FormTemplate style={{ maxWidth: "100%" }} onChange={() => setError("")}>
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
        {formData.stepFour.sport_facilities.length === 0 ? null : (
          <Fieldset disabled={!fileEdit}>
            {renderFacilityNames()}
            {renderFacilityFiles()}
          </Fieldset>
        )}
        {isSuperVision() ? (
          <ErrorMessage>
            Brak wszystkich dokumentów, zostanie wydana licencja z nadzorem
            (istnieje możliwość późniejszego dosłania dokumentów)
          </ErrorMessage>
        ) : null}
        <Paragraph>
          Informacje dotyczące płatności za procedurę licencyjną
        </Paragraph>
        <Fieldset
          style={{ marginBottom: "0", paddingLeft: "0" }}
          disabled={readOnly}
        >
          <Label style={{ marginTop: 0 }} pointer>
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
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={regulations}
                handleChange={(e) => setRegulations(e.target.value)}
              />
              Zapoznałam/em się z regulaminem płatności opłat administracyjnych
              za przyznanie licencji
              <a
                style={{ color: "#0056A5" }}
                target="_blank"
                href="https://pdf.fra1.digitaloceanspaces.com/Regulamin_Licencje_WZPN.pdf"
              >
                &nbsp;Regulamin PDF
              </a>
              .
            </span>
          </Label>
        </Fieldset>
        <div style={{ marginTop: "16px", marginBottom: "32px" }}>
          <PrimaryButton
            type="button"
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
