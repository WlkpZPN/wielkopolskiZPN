import axios from "axios";

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
    return [city, street, zipCode.replace(/\n/g, "")];
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
