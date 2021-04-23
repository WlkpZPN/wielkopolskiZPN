import { validateEmail } from "./validation";

export const checkStepOne = (data) => {
  console.log("leauge", data.leauge);
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
          text:
            "Proszę podać liczbę zespołów młodzieżowych oraz udział zawodników",
        };
      } else if (
        isNaN(formData.numberOfYouthGroups) ||
        isNaN(formData.shareOfYouthGroups) ||
        parseInt(formData.shareOfYouthGroups) === 0 ||
        parseInt(formData.numberOfYouthGroups) === 0
      ) {
        return {
          valid: false,
          text:
            "Proszę podać liczbę zespołów młodzieżowym oraz udział uczestników",
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

export const validateObject = (data, leauge) => {
  // // check all required fields
  // if (!data.name || !data.address || !data.post_code || !data.city) {
  //   setError({ step: 0, text: "Proszę wpisać nazwę oraz adres obiektu" });
  //   window.scrollTo(0, 0);
  //   return;
  // }
  // if (!data.I01_1 || !data.I01_2) {
  //   setError({ step: 1, text: "Proszę zaznaczyć wszystkie pola formularza" });
  //   return;
  // }
  // if (!data.I02_1 || !data.I02_2 || !data.I02_3 || !data.I02_4) {
  //   setError({ step: 2, text: "Proszę zaznaczyć wszystkie pola formularza" });
  //   return;
  // }
  // if (!data.I03_1 || !data.I03_2 || !data.I03_total_capacity) {
  //   setError({
  //     step: 3,
  //     text: "Proszę podać liczbę miejsc oraz zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }

  // if (
  //   !data.I04_1 ||
  //   !data.I04_2 ||
  //   !data.I04_3 ||
  //   !data.I04_4 ||
  //   !data.I04_5
  // ) {
  //   setError({
  //     step: 4,
  //     text: "Proszę zaznaczyć wszystkie pola formularza",
  //   });
  //   return;
  // }
  // if (
  //   !data.I05_number_of_seats_for_quests ||
  //   !data.I05_percentage_of_seats_for_guests ||
  //   !data.I05_1 ||
  //   !data.I05_2
  // ) {
  //   setError({
  //     step: 5,
  //     text:
  //       "Proszę podać liczbę miejsc,procent pojemności oraz zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }

  if (leauge === "iv liga") {
    if (
      data.I05_number_of_seats_for_quests < 30 ||
      data.I05_percentage_of_seats_for_guests < 5
    ) {
      setError({
        step: 5,
        text:
          "Na obiektach IV ligi musi być co najmniej 5% łącznej liczby miejsc przewidzianych dla publiczności, jednak nie mniej niż 30 miejsc",
      });
    }
  }

  // if (
  //   !data.I06_type ||
  //   !data.I06_condition ||
  //   !data.I06_width ||
  //   !data.I06_length ||
  //   !data.I06_1 ||
  //   !data.I06_4 ||
  //   !data.I06_5
  // ) {
  //   setError({
  //     step: 6,
  //     text:
  //       "Proszę określić rodzaj i stan nawierzchni oraz zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (data.I06_type === "sztuczna" && (!data.I06_2 || !data.I06_3)) {
  //   setError({
  //     step: 6,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }

  // if (!data.I07_1 || !data.I07_2 || !data.I07_3 || !data.I07_4) {
  //   setError({
  //     step: 7,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (
  //   !data.I08_number_of_seats_on_the_bench ||
  //   !data.I08_1 ||
  //   !data.I08_2 ||
  //   !data.I08_3 ||
  //   !data.I08_4
  // ) {
  //   setError({
  //     step: 8,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }

  switch (leauge) {
    case "iv liga":
      if (data.I08_number_of_seats_on_the_bench < 13) {
        setError({
          step: 8,
          text: "Wymagane jest posiadanie minimum 13 miejsc siedzących",
        });
      }
      break;
    case "v liga":
    case "klasa okręgowa":
      if (data.I08_number_of_seats_on_the_bench < 10) {
        setError({
          step: 8,
          text: "Wymagane jest posiadanie minimum 10 miejsc siedzących",
        });
      }
      break;
    case "klasa a":
    case "klasa b":
    case "klasa c":
      if (data.I08_number_of_seats_on_the_bench < 8) {
        setError({
          step: 8,
          text: "Wymagane jest posiadanie minimum 8 miejsc siedzących",
        });
      }
  }

  // if (!data.I09_1 || !data.I09_2) {
  //   setError({
  //     step: 9,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (!data.I10_1) {
  //   setError({
  //     step: 10,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (
  //   !data.I11_number_of_seats ||
  //   !data.I11_number_of_hangers_or_lockers ||
  //   !data.I11_number_of_showers ||
  //   !data.I11_number_of_toilets ||
  //   !data.I11_1 ||
  //   !data.I11_2
  // ) {
  //   setError({
  //     step: 11,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (
  //   !data.I12_number_of_seats ||
  //   !data.I12_number_of_hangers_or_lockers ||
  //   !data.I12_number_of_showers ||
  //   !data.I12_number_of_toilets ||
  //   !data.I12_1 ||
  //   !data.I12_2
  // ) {
  //   setError({
  //     step: 12,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (
  //   !data.I13_1 ||
  //   !data.I13_2 ||
  //   !data.I13_3 ||
  //   !data.I13_4 ||
  //   !data.I13_5
  // ) {
  //   setError({
  //     step: 13,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (!data.I14_1 || !data.I14_2 || !data.I14_3) {
  //   setError({
  //     step: 14,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (
  //   !data.I15_number_of_toilets_for_women ||
  //   !data.I15_number_of_toilets_for_men ||
  //   !data.I15_standard ||
  //   !data.I15_1
  // ) {
  //   setError({
  //     step: 15,
  //     text:
  //       "Proszę podać liczbe toalet,podać standard oraz potwierdzić posiadanie wyposażenia do mycia",
  //   });
  //   return;
  // }
  // if (!data.I16_1) {
  //   setError({
  //     step: 16,
  //     text: "Proszę potwierdzić posiadanie systemu nagłaśniającego",
  //   });
  //   return;
  // }
  // if (!data.I17_1) {
  //   setError({
  //     step: 17,
  //     text: "Proszę potwierdzić posiadanie oświetlenia na obiekcie",
  //   });
  //   return;
  // }
  // if (data.I17_1) {
  //   if (!data.I17_intensity_level) {
  //     setError({
  //       step: 17,
  //       text: "Proszę podać poziom natężenia oświetlenia",
  //     });
  //     return;
  //   }
  // }
  // if (!data.I18_1) {
  //   setError({
  //     step: 18,
  //     text: "Proszę potwierdzić oznakowanie szatni",
  //   });
  //   return;
  // }
  // if (!data.I19_1 || !data.I19_2 || !data.I19_3) {
  //   setError({
  //     step: 19,
  //     text: "Proszę zaznaczyć wszystkie pola",
  //   });
  //   return;
  // }
  // if (!data.I20_1) {
  //   setError({
  //     step: 20,
  //     text:
  //       " Proszę potwierdzić posiadanie miejsc dla niepełnosprawnych na obiekcie",
  //   });
  //   return;
  // }
};
