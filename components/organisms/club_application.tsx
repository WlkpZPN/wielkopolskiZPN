import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import uniqid from "uniqid";
import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";
import { useLocalStorage } from "../../middleware/hooks";
import {
  extractAddressData,
  convertAddressData,
  convertToFormData,
} from "../../middleware/utils";
import StepOneForm from "./step1_form";
import StepTwoForm from "./step2_form";
import StepThreeForm from "./step3_form";
import StepFourForm from "./step4_form";
import StepFiveForm from "./step5_form";
import StepSixForm from "./step6_form";
import StepSevenForm from "./step7_form";
import StepBox from "../atoms/step_box";
import Loader from "../atoms/loader";
import {
  checkStepOne,
  checkStepTwo,
  checkStepThree,
  checkStepFour,
  checkStepFive,
  checkStepSix,
} from "../../middleware/stepValidation";
const StepsContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  max-width: 1360px;
  width: 100%;
`;
export const ApplicationContext = createContext(null);
const ClubApplication = ({
  errors,
  completed,
  clubData,
  readOnly,
  error_message,
  show_buttons,
  settings,
  fileEdit = false,
}) => {
  const improvements = errors ? JSON.parse(errors) : {};
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    stepOne: completed ? "completed" : "default",
    stepTwo: completed ? "completed" : "default",
    stepThree: completed ? "completed" : "default",
    stepFour: completed ? "completed" : "default",
    stepFive: completed ? "completed" : "default",
    stepSix: completed ? "completed" : "default",
    stepSeven: completed ? "completed" : "default",
  });

  useEffect(() => {
    let newStepData = { ...completedSteps };
    newStepData.stepFour = "";

    if (
      clubData.applications[0].statuses.id === 1 &&
      clubData.applications[0].updated_at
    ) {
      handleStepChange("jump", 1, 1);
      handleStepChange("jump", 3, 3);
      handleStepChange("jump", 4, 4);
      handleStepChange("jump", 5, 5);
      handleStepChange("jump", 6, 6);
      handleStepChange("jump", 2, 2);
    }
  }, []);

  const [city, street, zipCode] = extractAddressData(clubData.address);
  const [error, setError] = useState({
    stepOne: improvements.one ? error_message : "",
    stepTwo: improvements.two ? error_message : "",
    stepThree: improvements.three ? error_message : "",
    stepFour: improvements.four ? error_message : "",
    stepFive: improvements.five ? error_message : "",
    stepSix: improvements.six ? error_message : "",
    stepSeven: improvements.seven ? error_message : "",
  });

  const [formData, setFormData] = useState({
    stepOne: {
      leauge:
        clubData.leauge.toLowerCase() ||
        clubData.leauge.toLowerCase() !== "brak"
          ? "iv liga"
          : clubData.leauge.toLowerCase(),
      seasons: "1",
      clubName: clubData.name || "",
      clubCity: city || "",
      clubZipCode: zipCode || "",
      clubStreet: street || "",
      email: clubData.email || "",
      agentName: clubData.agent_name ? clubData.agent_name.split(" ")[0] : "",
      agentLastName: clubData.agent_name
        ? clubData.agent_name.split(" ")[1]
        : "",
      position: clubData.agent_position || "",
      agentEmail: clubData.agent_email || "",
      agentPhone: clubData.agent_phone || "",
    },
    stepTwo: {
      participateInCompetitions: clubData.applications[0]
        ? clubData.applications[0]
            .declaration_on_the_subject_of_participation_in_the_competition
        : false,
      privateDataProtection: clubData.applications[0]
        ? clubData.applications[0]
            .declaration_on_the_use_of_personal_data_documentation
        : false,
      krs_documents: clubData.applications[0]
        ? clubData.applications[0].applications_attachments.filter(
            (file) => file.category === "krs_documents"
          )
        : [],
    },
    stepThree: {
      numberOfYouthGroups:
        clubData.applications[0].number_of_youth_groups || "0",
      shareOfYouthGroups: clubData.applications[0].share_of_youth_groups || "0",
      medicalDeclaration:
        clubData.applications[0].declaration_on_medical_care_for_the_players ||
        false,
      clubAgreementName: clubData.applications[0].club_agreement_name || "",
      youthGroupsPossession:
        clubData.applications[0].youth_groups_possession || "posiadamy zespoły",
      agreement_documents: clubData.applications[0]
        ? clubData.applications[0].applications_attachments.filter(
            (file) => file.category === "agreement_documents"
          )
        : [],
    },
    stepFour: {
      sport_facilities: clubData.applications[0].sport_facilities,
    },
    stepFive: {
      NoObligationsTowardsEmployees:
        clubData.applications[0]
          .declaration_of_no_obligations_towards_employees || false,
      NoObligationsTowardsPzpnAndWzpn:
        clubData.applications[0]
          .declaration_of_no_obligations_towards_PZPN_and_WZPN || false,
      NoObligationTowardsFootballClubs:
        clubData.applications[0]
          .declaration_of_no_obligations_towards_football_clubs || false,
    },
    stepSix: {
      havingFootballStaff:
        clubData.applications[0].declaration_of_having_football_staff || false,
      HavingSecurityServices:
        clubData.applications[0].declaration_of_having_security_services ||
        false,
    },
    stepSeven: {
      invoice_required: clubData.applications[0].invoice_required,
    },
  });
  //console.log("files", clubData.applications[0].applications_attachments);

  const [currentObject, setCurrentObject] = useState(0);

  const deleteFacilityFile = (filename) => {
    let newFormData = formData;

    newFormData.stepFour.sport_facilities[
      currentObject
    ].applications_attachments = newFormData.stepFour.sport_facilities[
      currentObject
    ].applications_attachments.filter((el) => el.name !== filename);
    setFormData(newFormData);
    router.replace(router.asPath);
  };

  const deleteFacility = (data) => {
    // console.log(data);
    if (data.id) {
      axios
        .post("/api/applications/deleteSportFacility", {
          facilityId: data.id,
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const newFormData = formData;
    newFormData.stepFour.sport_facilities.splice(
      newFormData.stepFour.sport_facilities.findIndex((e) => e.id === data.id),
      1
    );
    router.replace(router.asPath);

    setFormData(newFormData);
    setCurrentObject(0);
  };

  const handleStepFill = (step, state) => {
    let newStepData = completedSteps;

    newStepData[step] = state;

    setCompletedSteps(newStepData);
  };

  const handleFormChange = (event, field, step) => {
    let newFields = { ...formData };
    switch (step) {
      case 1:
        newFields.stepOne[field] = event;
        setFormData(newFields);
        break;
      case 2:
        newFields.stepTwo[field] = event;
        setFormData(newFields);
        break;
      case 3:
        newFields.stepThree[field] = event;
        setFormData(newFields);
        break;
      case 5:
        newFields.stepFive[field] = event;
        setFormData(newFields);
        break;

      case 6:
        newFields.stepSix[field] = event;
        setFormData(newFields);
        break;
      case 7:
        newFields.stepSeven[field] = event;
        setFormData(newFields);
    }
  };

  const handleObjectChange = (value, index, field) => {
    let newFields = { ...formData };
    newFields.stepFour.sport_facilities[index][field] = value;
    setFormData(newFields);
  };

  const createNewSportFacilityForm = () => {
    // dodaj kolejny obiekt jesli klub posiada mniej niz 5 obiektów
    if (formData.stepFour.sport_facilities.length < 5) {
      // dodaj obiekt tylko jesli ich liczba w clubData i formData jest taka sama
      //console.log("adding new facility", formData.stepFour.sport_facilities);
      const facilitiesArray = formData.stepFour.sport_facilities;
      if (
        facilitiesArray.length > 0 &&
        !facilitiesArray[facilitiesArray.length - 1].id
      ) {
        return "Zapisz aktualny obiekt aby utworzyć kolejny";
      }
      const newForm = {
        name: "Obiekt 1",
        address: "",
        post_code: "",
        city: "",
        I03_total_capacity: "0",
        I05_number_of_seats_for_guests: "0",
        I05_percentage_of_seats_for_guests: "0",
        I06_type: "naturalna",
        I06_condition: "dobry",
        I06_width: "",
        I06_length: "",
        I08_number_of_seats_on_the_bench: "0",
        I11_number_of_seats: "0",
        I11_number_of_hangers_or_lockers: "0",
        I11_number_of_showers: "0",
        I11_number_of_toilets: "0",
        I12_number_of_seats: "0",
        I12_number_of_hangers_or_lockers: "0",
        I12_number_of_showers: "0",
        I12_number_of_toilets: "0",
        I15_number_of_toilets_for_women: "0",
        I15_number_of_toilets_for_men: "0",
        I15_standard: "Odpowiedni",
        I21_3_1_gates: "",
        I21_3_15_gates: "",
        I21_3_2_gates: "",

        applications_attachments: [],
      };
      let newFormData = formData;

      newFormData.stepFour.sport_facilities.push(newForm);
      setFormData(newFormData);
      setCurrentObject(newFormData.stepFour.sport_facilities.length - 1);
      router.replace(router.asPath);
      return true;
    } else {
      return "Osiągnięto maksymalną liczbe obiektów sportowych (5)";
    }
  };

  const [fileData, setFileData] = useState(
    clubData.applications[0]
      ? clubData.applications.applications_attachments
      : []
  );

  const handleFileChange = (id, file, name, category) => {
    let newFormData = formData;

    switch (category) {
      case "krs_documents":
        newFormData.stepTwo.krs_documents.push({
          file,
          id: id,
          name,
          category,
        });

        setFormData(newFormData);
        break;
      case "agreement_documents":
        newFormData.stepThree.agreement_documents.push({
          file,
          id: id,
          name,
          category,
        });
    }
  };

  const deleteFile = (id, category) => {
    let newFormData = formData;

    switch (category) {
      case "krs_documents":
        newFormData.stepTwo.krs_documents = newFormData.stepTwo.krs_documents.filter(
          (file) => file.id !== id
        );

        break;
      case "agreement_documents":
        newFormData.stepThree.agreement_documents = newFormData.stepThree.agreement_documents.filter(
          (file) => file.id !== id
        );
        break;
    }

    setFormData(newFormData);
  };

  const handleObjectFileChange = (id, file, name, category, objectIndex) => {
    let newFileData = formData;

    newFileData.stepFour.sport_facilities[
      objectIndex
    ].applications_attachments.push({
      id: id,
      file,
      name,
      category,
    });

    setFormData(newFileData);
  };

  const handleObjectFileDelete = (index, fileId, category) => {
    let newFileData = formData;

    newFileData.stepFour.sport_facilities[
      index
    ].applications_attachments = newFileData.stepFour.sport_facilities[
      index
    ].applications_attachments.filter((file) => file.id !== fileId);

    setFormData(newFileData);
  };

  const sendApplication = async () => {
    // validate  all steps

    const checkSupervision = () => {
      if (formData.stepTwo.krs_documents.length === 0) {
        return true;
      }
      if (
        formData.stepThree.youthGroupsPossession === "nie posiadamy zespołów" &&
        formData.stepThree.agreement_documents.length === 0
      ) {
        return true;
      }
      if (
        formData.stepFour.sport_facilities.I01_1 === "false"
        // &&
        // agreementDocuments.length === 0
      ) {
        return true;
      }

      if (
        formData.stepFour.sport_facilities.I17_1
        // && intensityDocuments.length === 0
      ) {
        return true;
      }

      return false;
    };
    const isSuperVision = checkSupervision();

    let result;
    // step one
    result = checkStepOne(formData.stepOne);
    if (result.valid === false) {
      handleStepFill("stepOne", "error");
      setError((state) => ({ ...state, stepOne: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }

    // step two
    result = checkStepTwo(formData.stepTwo);
    if (result.valid === false) {
      handleStepFill("stepTwo", "error");
      setError((state) => ({ ...state, stepTwo: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }
    //step three
    result = checkStepThree(formData.stepThree);
    if (result.valid === false) {
      handleStepFill("stepThree", "error");
      setError((state) => ({ ...state, stepThree: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }
    // step four
    result = checkStepFour(formData.stepFour);
    if (result.valid === false) {
      handleStepFill("stepFour", "error");
      setError((state) => ({ ...state, stepFour: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }
    //step five
    result = checkStepFive(formData.stepFive);

    if (result.valid === false) {
      handleStepFill("stepFive", "error");
      setError((state) => ({ ...state, stepFive: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }

    //step six
    result = checkStepSix(formData.stepSix);
    if (result.valid === false) {
      handleStepFill("stepSix", "error");
      setError((state) => ({ ...state, stepSix: result.text }));
      window.scrollTo(0, 0);
      toast.error("Prosimy wypełnić wszystkie etapy");
      return;
    }
    toast.info("wysyłanie wniosku do Wielkopolskiego ZPN");
    setLoading(true);
    await addSportFacility();

    await axios.post("/api/applications/addHistory", {
      description: "Złożenie wniosku licencyjnego w terminie.",
      applicationID: clubData.applications[0].id,
      statusID: isSuperVision ? 2 : 3,
    });

    await axios
      .post("/api/applications/updateApplication", {
        formData,
        clubData,
        statusId: isSuperVision ? 2 : 3,
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    router.replace(router.asPath);
    // console.log("application sent");

    // update data and status of application
  };

  const uploadFiles = async () => {
    const config = {
      headers: { "Content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const applicationFiles = convertToFormData([
      ...formData.stepTwo.krs_documents,
      ...formData.stepThree.agreement_documents,
    ]);
    let facilityFilesUrls = [];
    let helperArr = [];
    formData.stepFour.sport_facilities.forEach((facility) => {
      if (facility.applications_attachments) {
        helperArr.push(...facility.applications_attachments);
        facilityFilesUrls.push({
          id: facility.id,
          files: facility.applications_attachments,
        });
      }
    });

    const facilityFilesData = convertToFormData(helperArr);
    try {
      //1. upload step one and step two files
      if (
        formData.stepTwo.krs_documents.length > 0 ||
        formData.stepThree.agreement_documents.length > 0
      ) {
        console.log("czy to sie wykonuje");
        await axios.post(
          "/api/applications/uploadFiles",
          applicationFiles,
          config
        );
        // upload files urls to database
      }

      if (helperArr.length > 0) {
        await axios.post(
          "/api/applications/uploadFiles",
          facilityFilesData,
          config
        );
        axios.post("/api/applications/addFacilitiesUrl", {
          facilityFilesUrls,
        });
      }
      await axios.post("/api/applications/addFilesUrl", {
        applicationID: clubData.applications[0].id,
        fileNames: {
          krs_documents: formData.stepTwo.krs_documents.filter((file) => {
            if (isNaN(file.id)) return file.name;
          }),
          agreement_documents: formData.stepThree.agreement_documents.filter(
            (file) => {
              if (isNaN(file.id)) return file.name;
            }
          ),
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const saveForm = () => {
    // save data in the application table
    // save data in the club table

    setLoading(true);
    uploadFiles();
    addSportFacility();
    axios
      .post("/api/applications/updateApplication", {
        formData,
        clubData,
        statusId: 1,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success("zapisano jako kopie roboczą", {
          autoClose: 1500,
        });
        router.replace(router.asPath);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const addSportFacility = async (toastHidden = false) => {
    let newFormData = formData;
    //1. add sport facility to database
    // console.log(formData.stepFour.sport_facilities[currentObject]);
    setLoading(true);
    try {
      const res = await axios.post("/api/applications/addSportFacility", {
        sport_facility: formData.stepFour.sport_facilities[currentObject],
        clubData,
      });

      //1 upload files to serwer
      const attachments = formData.stepFour.sport_facilities[
        currentObject
      ].applications_attachments.filter((el) => (el.id ? false : true));

      const filesToUpload = new FormData();
      attachments.forEach((attachment) => {
        filesToUpload.append("files", attachment.fileData);
      });

      const config = {
        headers: { "Content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      };

      await axios.post("/api/files/uploadManyFiles", filesToUpload, config);

      //2 attach files to current facility object

      const res2 = await axios.post("/api/applications/addFacilitiesUrl", {
        facilityFilesUrls: attachments,
        facilityID: res.data.facility.id,
        applicationID: clubData.applications[0].id,
      });

      setLoading(false);
      router.replace(router.asPath);

      newFormData.stepFour.sport_facilities = res2.data.all_facilities;
      setFormData(newFormData);

      if (!toastHidden) {
        toast.info("Zapisano obiekt", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Nie udało się zapisać obiektu,spróbuj ponownie");
    }
  };

  const clearErrors = (step) => {
    let newErrData = error;
    newErrData[step] = "";
    setError(newErrData);
  };

  const handleStepChange = (type, nextStep = 0, extraStep = null) => {
    // on change fire function that check validation for current step

    let result;
    switch (extraStep || step) {
      case 1:
        result = checkStepOne(formData.stepOne);

        if (!result.valid) {
          handleStepFill("stepOne", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepOne", "completed");
        }
        break;
      case 2:
        result = checkStepTwo(formData.stepTwo);

        if (!result.valid) {
          handleStepFill("stepTwo", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepTwo", "completed");
        }
        break;
      case 3:
        result = checkStepThree(formData.stepThree);
        if (!result.valid) {
          handleStepFill("stepThree", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepThree", "completed");
        }
        break;
      case 4:
        result = checkStepFour(formData.stepFour);
        if (!result.valid) {
          handleStepFill("stepFour", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepFour", "completed");
        }
        break;
      case 5:
        result = checkStepFive(formData.stepFive);
        if (!result.valid) {
          handleStepFill("stepFive", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepFive", "completed");
        }
        break;
      case 6:
        result = checkStepSix(formData.stepSix);
        if (!result.valid) {
          handleStepFill("stepSix", "uncompleted");
        }
        if (result.valid) {
          handleStepFill("stepSix", "completed");
        }
        break;
    }

    // if step has empty required fields mark as uncompleted
    // if step has all field mark as completed
    switch (type) {
      case "next":
        if (step < 7) {
          setStep(step + 1);
        }
        break;
      case "previous":
        if (step > 1) {
          setStep(step - 1);
        }
        break;
      case "jump":
        setStep(nextStep);
        break;
      default:
        break;
    }
    console.log("step", step);
  };
  const renderCurrentStep = () => {
    console.log("rendering step", step);
    switch (step) {
      case 1:
        return (
          <StepOneForm
            data={formData.stepOne}
            handleChange={handleFormChange}
            handleStepChange={handleStepChange}
            clubData={clubData}
            readOnly={readOnly}
          />
        );
      case 2:
        return (
          <StepTwoForm
            readOnly={readOnly}
            handleStepChange={handleStepChange}
          />
        );
      case 3:
        return (
          <StepThreeForm
            readOnly={readOnly}
            handleStepChange={handleStepChange}
          />
        );
      case 4:
        return (
          <StepFourForm
            readOnly={readOnly}
            handleStepChange={handleStepChange}
          />
        );
      case 5:
        return (
          <StepFiveForm
            readOnly={readOnly}
            handleStepChange={handleStepChange}
          />
        );
      case 6:
        return (
          <StepSixForm
            readOnly={readOnly}
            handleStepChange={handleStepChange}
          />
        );
      case 7:
        return (
          <StepSevenForm
            readOnly={readOnly}
            handleStepChange={handleObjectChange}
          />
        );
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <ApplicationContext.Provider
      value={{
        handleFileChange,
        formData,
        handleFormChange,
        handleObjectChange,
        deleteFile,
        handleObjectFileChange,
        handleObjectFileDelete,
        currentObject,
        setCurrentObject,
        saveForm,
        addSportFacility,
        handleStepFill,
        createNewSportFacilityForm,
        error,
        clearErrors,
        sendApplication,
        deleteFacility,
        clubData,
        show_buttons,
        settings,
        refreshData,
        setFormData,
        deleteFacilityFile,
        fileEdit,
      }}
    >
      <div>
        {" "}
        <StepsContainer>
          <StepBox
            improvements={improvements.one || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepOne}
            number={1}
            active={step === 1}
            text="Podstawowe dane"
            helperText="Wybór klasy rozgrywkowej"
          />
          <StepBox
            improvements={improvements.two || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepTwo}
            number={2}
            active={step === 2}
            text="Prawo"
            helperText="Kryteria prawne"
          />
          <StepBox
            improvements={improvements.three || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepThree}
            number={3}
            active={step === 3}
            text="Sport"
            helperText="Kryteria sportowe"
          />
          <StepBox
            improvements={improvements.four || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepFour}
            number={4}
            active={step === 4}
            text="Obiekty"
            helperText="Kryteria infrastrukturalne"
          />
          <StepBox
            improvements={improvements.five || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepFive}
            number={5}
            active={step === 5}
            text="Finanse"
            helperText="Kryteria finansowe"
          />
          <StepBox
            improvements={improvements.six || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepSix}
            number={6}
            active={step === 6}
            text="Personel"
            helperText="kryteria personalne"
          />
          <StepBox
            improvements={improvements.seven || ""}
            handleStepChange={handleStepChange}
            state={completedSteps.stepSeven}
            number={7}
            active={step === 7}
            text="Załączniki"
            helperText="Załącz dokumenty"
          />
        </StepsContainer>
        {loading ? <Loader /> : renderCurrentStep()}
      </div>
    </ApplicationContext.Provider>
  );
};

export default ClubApplication;
