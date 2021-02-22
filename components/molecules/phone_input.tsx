import { useState } from "react";
import styled from "styled-components";

//components
import Input from "../atoms/form_input";
import Label from "../atoms/form_label";
const PhoneInput = () => {
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <Input
      type="text"
      placeholder="000-000-000"
      value={phone}
      onChange={handleChange}
    />
  );
};

export default PhoneInput;
