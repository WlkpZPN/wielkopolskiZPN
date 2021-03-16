export const checkStepOne = (data) => {
  if (!data.leauge) {
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

  if (!data.clubName) {
    return {
      valid: false,
      text: "Proszę podać nazwę klubu",
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

export const checkStepThree = (formData) => {
  switch (formData.youthGroupsPossession) {
    case "posiadamy zespoły":
      if (!formData.numberOfYouthGroups || !formData.shareOfYouthGroups) {
        return {
          valid: false,
          text:
            "Proszę podać liczbę zespołów młodzieżowych oraz udział zawodników",
        };
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
