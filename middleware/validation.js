export function validateEmail(email) {
  if (!email.trim()) {
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
