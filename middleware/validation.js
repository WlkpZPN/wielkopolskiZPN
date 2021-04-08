export function validateEmail(email) {
  email = email.trim();
  if (!email) {
    return {
      valid: false,
      message: "Email nie może być pusty",
    };
  }
  if (
    !email.match(
      /^[a-zA-Z-.-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    )
  ) {
    return {
      valid: false,
      message: "Proszę podać poprawny adres email",
    };
  }

  return {
    valid: true,
  };
}

export const validateZipCode = (zipCode) => {
  if (zipCode.length !== 6) {
    return {
      valid: false,
      message: "Kod pocztowy powinien być w formacie xx-xxx",
    };
  }

  return {
    valid: true,
  };
};

export const validateText = (text) => {
  const textRegex = /[^0-9]*$/;

  if (!textRegex.test(text)) {
    return {
      valid: false,
      message: "proszę podać wartość bez cyfr",
    };
  }
  if (/^\s*$/.test(text.trim())) {
    return {
      valid: false,
      message: "białe znaki (spacje) są niedozwolone",
    };
  }

  return {
    valid: true,
  };
};

export const validatePhone = (phone) => {
  if (phone.replaceAll("-", "").replace(/\s/g, "").length !== 9) {
    console.log(phone.replaceAll("-", ""));
    return {
      valid: false,
      message: "Nr telefonu musi mieć 9 znaków",
    };
  }

  return {
    valid: true,
  };
};

export const validateNumber = (number) => {
  const num = parseFloat(number);

  if (isNaN(num)) {
    return {
      valid: false,
      message: "Proszę podać poprawną liczbę,znaki tekstowe nie są dozwolone",
    };
  }

  return {
    valid: true,
  };
};
