import axios from "axios";
import XLSX from "xlsx";
export const logout = async (type) => {
  if (type === "admin") {
    axios
      .post("/api/auth/logout")
      .then((res) => {
        router.push("/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (type === "klub") {
    axios
      .post("/api/clubAuth/logout")
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const extractAddressData = (address) => {
  if (!address) {
    return [null, null, null];
  }

  //1. MAMY PEŁNY ADRES   | ulica nr,kod pocztowy,miasto
  //2. MAMY TYLKO ULICE I NR  | bez przecinka
  //3. MAMY ULICE,NR I MIASTO |  ulica nr,miasto
  // STREET , ZIPCODE , CITY
  const splitedAddress = address.split(",");

  let city;
  let zipCode;
  let street;
  if (address.includes("-")) {
    // mamy wszystkie dane (1)
    street = splitedAddress[0];
    zipCode = splitedAddress[1];
    city = splitedAddress[2];
    return [city, street, zipCode?.replace(/\n/g, "")];
  } else if (address.includes(",")) {
    // ulica nr,miasto
    street = splitedAddress[0];
    city = splitedAddress[1];
    return [city, street, null];
  } else {
    street = splitedAddress[0];
    return [null, street, null];
    // ulica i nr
  }
};

export const convertAddressData = (city = "", street = "", zipCode = "") => {
  city = city.replace(/,/g, "");
  street = street.replace(/,/g, "");
  zipCode = zipCode.replace(/,/g, "");
  return `${street},${zipCode},${city}`;
};

export const saveStepOneForm = (data) => {
  // liczba sezonów do tabeli applications
  // reszta idzie do tabeli kluby
};

export const convertToFormData = (files) => {
  const data = new FormData();

  files.forEach((item) => {
    data.append("files", item.file);
  });

  return data;
};

export const getCurrentDate = () => {
  const newDate = new Date();
  const date = ` ${newDate.getDate()}/${newDate
    .getMonth()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}/${newDate.getFullYear()}, ${newDate.getHours()}:${newDate
    .getMinutes()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  return date;
};

export const getInternalId = (id, isApplication) => {
  if (!isApplication) {
    return `W/${id}/${new Date().getFullYear()}`;
  }
  return `${id}/${new Date().getFullYear()}`;
};

export const exportApplicationData = (data) => {
  const exportData = [
    [
      "ID wniosku",
      "Klub",
      "Data złożenia wniosku",
      "Status",
      "Pełnomocnik",
      "Stanowisko",
      "telefon",
      "liczba zespołów młodzieżowych",
      "Udział zawodników młodzieżowych",
      "Zespoły młodzieżowe",
    ],
  ];

  data.forEach((item) => {
    const row = [
      item.internal_id || "",
      item.clubs.name,
      item.created_at,
      item.statuses.name,
      item.clubs.agent_name,
      item.clubs.agent_position,
      item.clubs.phone,
      item.number_of_youth_groups,
      item.share_of_youth_groups,
      item.youth_groups_possession,
    ];

    exportData.push(row);
  });

  const wb = XLSX.utils.book_new();
  const wsAll = XLSX.utils.aoa_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, wsAll, "Wnioski licencyjne");
  XLSX.writeFile(wb, `Wnioski licencyjne.xlsx`);
};

export const exportClubData = (data) => {
  const exportData = [
    [
      "ID klubu",
      "ostatnia aktualizacja",
      "pełna nazwa",
      "status",
      "Strefa",
      "Klasa rozgrywkowa",
      "Adres klubu",
      "Adres korespondencyjny",
      "Adres stadionu",
      "Telefon_1",
      "Telefon_2",
      "Telefon_3",
      "Tel.stacjonarny",
      "Email_1",
      "Email_2",
      "Email_3",
      "Prezes",
      "email prezesa",
      "tel. prezesa",
      "pełnomocnik",
      "funkcja pełnomocnika",
      "email pełnomocnika",
      "tel.pełnomocnika",
    ],
  ];

  data.forEach((club) => {
    let row = [
      club.internal_id || "",
      club.updated_at || "",
      club.name || "",
      club.active ? "aktywny" : "nieaktywny",
      club.region || "",
      club.leauge || "",
      club.address || "",
      club.postal_address || "",
      club.stadium || "",
      club.phone || "",
      club.phone_2 || "",
      club.phone_3 || "",
      club.landline_phone || "",
      club.email || "",
      club.email_2 || "",
      club.email_3 || "",
      club.chairman || "",
      club.chairman_email || "",
      club.chairman_phone || "",
      club.agent_name || "",
      club.agent_position || "",
      club.agent_email || "",
      club.agent_phone || "",
    ];

    exportData.push(row);
  });

  const wb = XLSX.utils.book_new();
  const wsAll = XLSX.utils.aoa_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, wsAll, "Kluby");
  XLSX.writeFile(wb, `Kluby.xlsx`);
};

export const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const renderAmount = (leauge, settings) => {
  console.log(leauge == "IV liga");
  console.log(leauge);
  let amount = "";
  switch (leauge) {
    case "iv liga":
    case "IV Liga":
      console.log("opłata", settings.iv_possession_fee);
      amount = `${settings.iv_possession_fee}`;
      break;
    case "v liga":
    case "V Liga":
    case "klasa okręgowa":
      amount = `${settings.v_possession_fee}`;
      break;
    default:
      break;
  }
  return amount;
};

export const createSeasons = (amount) => {
  amount = parseInt(amount);
  const currentYear = new Date().getFullYear();
  if (amount === 1) {
    return `${currentYear}/${currentYear + 1}`;
  }
  if (amount === 2) {
    return `${currentYear}/${currentYear + 1} i ${currentYear + 1}/${
      currentYear + 2
    }`;
  }
};

export const convertLeauge = (leauge) => {
  switch (leauge) {
    case "iv liga":
      return "IV Liga";
    case "v liga":
      return "V Liga";
    case "klasa okręgowa":
      return "Klasa okręgowa";
    case "klasa a":
      return "Klasa A";
    case "klasa b":
      return "Klasa B";
    case "młodzież":
      return "Ligi młodzieżowe";
    default:
      return null;
  }
};
