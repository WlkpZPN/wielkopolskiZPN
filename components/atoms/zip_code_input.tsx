import styled from "styled-components";
import { useState } from "react";
import Input from "./input";
import Cleave from "cleave.js/react";

const StyledCleave = styled(Cleave)`
  padding: 6px 12px;
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  margin-top: 4px;
  appearance: none;
  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
`;

const ZipCodeInput = ({ value, onChange }) => {
  //console.log("value", value);
  return (
    <StyledCleave
      options={{ delimiters: ["-"], blocks: [2, 3], numericOnly: true }}
      onChange={onChange}
      className="form-field"
      value={value}
    />
  );
};

export default ZipCodeInput;
