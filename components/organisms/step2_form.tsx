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
import AddFilesWrapper from "./add_files_wrapper";
import OutlineButton from "../atoms/outline_button";
import FormStatement from "../molecules/form_statement";
import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";
const StepTwoForm = ({ handleStepChange, readOnly }) => {
  const [state, setState] = useState(false);
  const context = useContext(ApplicationContext);
  const {
    fileData,
    handleFileChange,
    deleteFile,
    handleStepFill,
    error,
    clearErrors,
    show_buttons,
    sendApplication,
    clubData,
    completedSteps,
  } = context;
  const fileArr = context.formData.stepTwo.krs_documents;
  const handleChange = context.handleFormChange;
  const data = context.formData.stepTwo;

  const nextStep = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // const valid = checkData();
    // if (!valid) {
    //   return;
    // }
    handleStepFill("stepTwo", {
      completed: true,
      error: false,
    });
    handleStepChange("next");
  };

  const setFiles = (id, file) => {
    handleFileChange(id, file, file.name, "krs_documents");
    setState(!state);
  };

  const handleDelete = (id) => {
    deleteFile(id, "krs_documents");
    setState(!state);
  };

  return (
    <Fieldset disabled={readOnly}>
      <FormTemplate
        onChange={() => clearErrors("stepTwo")}
        onSubmit={handleSubmit}
      >
        <Paragraph>
          Wyciągi z Krajowego Rejestru Sądowego lub ewidencji starosty
          potwierdzony za zgodność ze stanem faktycznym na dzień składania
          niniejszego wniosku.
        </Paragraph>
        <AddFilesWrapper
          id={clubData.applications[0].id}
          category="krs_documents"
          text="Oświadczamy, że nasz klub przekazuje w załączeniu odpis aktualnego rejestru z Krajowego Rejestru Sądowego lub ewidencji prowadzonej przez właściwego starostę/prezydenta zawierający następujące informacje: nazwa Wnioskodawcy, siedziba Wnioskodawcy, forma prawna Wnioskodawcy, lista osób upoważnionych do składania oświadczeń woli w imieniu Wnioskodawcy, sposób reprezentacji Wnioskodawcy."
        />
        {<ErrorMessage>{error.stepTwo}</ErrorMessage>}
        <FormStatement
          text="Oświadczamy, że nasz klub:
uznaje za prawnie wiążące statuty, regulaminy, przepisy i regulacje oraz decyzje FIFA, UEFA, PZPN oraz właściwego Wojewódzkiego Związku Piłki Nożnej;
na poziomie krajowym Wnioskodawca będzie uczestniczył w rozgrywkach uznanych i zatwierdzonych przez PZPN lub właściwy Wojewódzki Związek Piłki Nożnej;
bezzwłocznie zawiadomi Licencjodawcę o wszelkich istotnych zmianach, zdarzeniach lub warunkach o istotnym znaczeniu,  które dotyczą Wnioskodawcy;
będzie respektować i przestrzegać postanowienia  Przepisów licencyjnych dla klubów IV ligi i klas niższych;
wszystkie dokumenty przedłożone Licencjodawcy przez Wnioskodawcę są kompletne, prawidłowe i wiarygodne;
w pełni upoważnia stosowne organy decyzyjne do badania dokumentów oraz uzyskiwania wszelkich informacji niezbędnych do wydania licencji w sposób zgodny z przepisami prawa polskiego.
"
          value={data.participateInCompetitions}
          handleChange={() =>
            handleChange(
              !data.participateInCompetitions,
              "participateInCompetitions",
              2
            )
          }
          name="Oświadczenie w przedmiocie udziału w rozgrywkach"
        />
        <FormStatement
          text="Oświadczam(y), iż Klub oraz jego przedstawiciele będę respektować i przestrzegać przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych - RODO) (Dz. Urz. UE L 2016 Nr 119, s.1) oraz realizować obowiązki nałożone przez ww. akt prawny, tj. w szczególności  wypełnianie obowiązku informacyjnego (art. 13 i 14 RODO); posiadania odpowiedniej podstawy prawnej do przetwarzania danych (art. 6 RODO); przestrzegania zasad przetwarzania danych osobowych (art. 5 RODO); nadawania upoważnień do przetwarzania danych osobowych (art. 29 RODO); zawierania umów powierzenia przetwarzania danych osobowych, wówczas kiedy jest to wymagane (art. 28 RODO); zapewnienia bezpieczeństwa przetwarzania danych osobowych oraz wdrożenia odpowiednich środków organizacyjnych i technicznych w tym zakresie (art. 32 RODO). Jednocześnie oświadczamy, że przed dopuszczeniem osoby do działalności związanej z wychowaniem, edukacją, wypoczynkiem, leczeniem małoletnich lub z opieką nad nimi, dokonujemy weryfikacji takiej osoby w oparciu o przepisy ustawy z dnia 13 maja 2016 r., o przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym."
          value={data.privateDataProtection}
          handleChange={() =>
            handleChange(
              !data.privateDataProtection,
              "privateDataProtection",
              2
            )
          }
          name=" Oświadczenie o stosowaniu dokumentacji ochrony danych osobowych"
        />

        <div>
          <PrimaryButton
            type="button"
            style={{ marginRight: "16px" }}
            onClick={() => handleStepChange("previous")}
          >
            Cofnij
          </PrimaryButton>
          {show_buttons ? (
            <>
              <PrimaryButton
                style={{ marginRight: "16px" }}
                type="button"
                onClick={context.saveForm}
                color="dark"
                hoverColor="darkLight"
              >
                Zapisz wersję roboczą
              </PrimaryButton>
              {completedSteps.stepTwo === "error" ? (
                <PrimaryButton
                  style={{ marginRight: "16px" }}
                  hoverColor="success"
                  color="successDark"
                  type="button"
                  onClick={() => sendApplication()}
                >
                  Zatwierdź i wyślij
                </PrimaryButton>
              ) : null}
            </>
          ) : null}
          <PrimaryButton type="submit" onClick={nextStep}>
            Kolejny krok
          </PrimaryButton>
        </div>
      </FormTemplate>
    </Fieldset>
  );
};

export default StepTwoForm;
