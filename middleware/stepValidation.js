import { validateEmail } from "./validation";

export const checkStepOne = (data) => {
  if (!data.leauge || data.leauge === "brak") {
    return {
      valid: false,
      text: "Proszę podać ligę rozgrywkową",
    };
  }

  if (!data.seasons) {
    return {
      valid: false,
      text: "Proszę zaznaczyć liczbę sezonów",
    };
  }
  let result = validateEmail(data.agentEmail);
  if (!result.valid) {
    return {
      valid: false,
      text: result.message,
    };
  }

  if (!data.clubCity || !data.clubStreet || !data.clubZipCode) {
    return {
      valid: false,
      text: "Proszę podać pełen adres klubu",
    };
  }

  if (!data.agentName || !data.agentLastName) {
    return {
      valid: false,
      text: "Proszę podać imię i nazwisko pełnomocnika",
    };
  }
  if (!data.agentEmail) {
    return {};
  }
  if (!data.email) {
    return {
      valid: false,
      text: "Proszę podać email klubu",
    };
  }

  if (!data.position) {
    return {
      valid: false,
      text: "Proszę podać stanowisko / funkcję pełnomocnika",
    };
  }

  if (!data.agentPhone) {
    return {
      valid: false,
      text: "Proszę podać telefon pełnomocnika",
    };
  }

  return {
    valid: true,
  };
};

export const checkStepTwo = (data) => {
  if (!data.participateInCompetitions || !data.privateDataProtection) {
    return {
      valid: false,
      text: "Proszę potwierdzić wszystkie oświadczenia",
    };
  }
  return {
    valid: true,
  };
};

export const checkStepThree = (formData, leauge) => {
  switch (formData.youthGroupsPossession) {
    case "posiadamy zespoły":
      if (!formData.numberOfYouthGroups || !formData.shareOfYouthGroups) {
        return {
          valid: false,
          text: "Proszę podać liczbę zespołów młodzieżowych oraz udział zawodników",
        };
      } else if (
        isNaN(formData.numberOfYouthGroups) ||
        isNaN(formData.shareOfYouthGroups) ||
        parseInt(formData.shareOfYouthGroups) < 0 ||
        parseInt(formData.numberOfYouthGroups) < 0
      ) {
        return {
          valid: false,
          text: "Proszę podać liczbę zespołów młodzieżowym oraz udział uczestników",
        };
      }

      switch (leauge) {
        case "iv liga":
          if (parseInt(formData.youthGroupsPossession) < 2) {
            return {
              valid: false,
              text: "Klub musi posiadać przynajmniej 2 zespoły młodzieżowe",
            };
          }
          break;
        case "v liga":
        case "klasa okręgowa":
          if (parseInt(formData.youthGroupsPossession) < 1) {
            return {
              valid: false,
              text: "Klub musi posiadać przynajmniej 1 zespół młodzieżowy",
            };
          }
      }
      break;
    case "porozumienie na szkolenie":
      if (!formData.clubAgreementName) {
        return {
          valid: false,
          text: "Proszę podać nazwe klubu, z którym zawarto porozumienie",
        };
      }
    case "nie posiadamy zespołów":
    case "wystepujemy w rozgrywkach klasy A":
      break;
  }

  if (!formData.medicalDeclaration) {
    return {
      valid: false,
      text: "Proszę potwierdzić deklarację o opiece medycznej",
    };
  }

  return {
    valid: true,
  };
};

export const checkStepFour = (data) => {
  // to do check for sport_facilitie possesion
  if (data.sport_facilities.length === 0) {
    return {
      valid: false,
      text: "Klub musi posiadać minimum 1 obiekt sportowy",
    };
  }
  return {
    valid: true,
  };
};

export const checkStepFive = (formData) => {
  if (
    !formData.NoObligationsTowardsEmployees ||
    !formData.NoObligationsTowardsPzpnAndWzpn ||
    !formData.NoObligationTowardsFootballClubs
  ) {
    return {
      valid: false,
      text: "Proszę zaakceptować poniższe oświadczenia",
    };
  }

  return {
    valid: true,
  };
};

export const checkStepSix = (formData) => {
  if (!formData.havingFootballStaff || !formData.HavingSecurityServices) {
    return {
      valid: false,
      text: "Proszę zaakceptować poniższe oświadczenia",
    };
  }

  return {
    valid: true,
  };
};

export const validateObject = (data) => {
  if (!data.name || !data.address || !data.post_code || !data.city) {
    window.scrollTo(0, 0);
    return {
      valid: false,
      step: 0,
      text: "Proszę podac nazwę obiektu, ulicę, kod pocztowy oraz miasto",
    };
  }
  if (data.I01_1 === null) {
    window.scrollTo(0, 400);
    return {
      valid: false,
      step: 1,
      text: "Proszę wybrać jedną z poniższych opcji",
    };
  }

  if (data.I01_1 === false && data.I01_2 !== true) {
    window.scrollTo(0, 400);
    return {
      valid: false,
      step: 1,
      text: "Proszę potwierdzić posiadanie prawa do korzystania ze stadionu podczas sezonu",
    };
  }
  if (!data.I02_1 || !data.I02_2 || !data.I02_3 || !data.I02_4) {
    window.scrollTo(0, 800);
    return {
      valid: false,
      step: 2,
      text: "Proszę zaznaczyć wszystkie pola formularza",
    };
  }

  if (
    !data.I06_type ||
    !data.I06_condition ||
    !data.I06_width ||
    !data.I06_length ||
    !data.I06_1 ||
    !data.I06_4 ||
    !data.I06_5
  ) {
    window.scrollTo(0, 2100);
    return {
      valid: false,
      step: 6,
      text: "Proszę określić rodzaj i stan nawierzchni oraz zaznaczyć wszystkie pola",
    };
  }
  if (data.I06_type === "sztuczna" && (!data.I06_2 || !data.I06_3)) {
    return {
      valid: false,
      step: 6,
      text: "Proszę zaznaczyć wszystkie pola",
    };
  }

  if (!data.I07_1 || !data.I07_2 || !data.I07_3 || !data.I07_4) {
    window.scrollTo(0, 2500);
    return {
      valid: false,
      step: 7,
      text: "Proszę zaznaczyć wszystkie pola",
    };
  }

  return { valid: true };
};
