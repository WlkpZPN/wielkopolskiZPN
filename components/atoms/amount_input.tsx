import { useState } from "react";
import styled from "styled-components";
import Cleave from "cleave.js/react";

const StyledCleave = styled.input`
  width: ${({ width }) => width};
  margin-top: 15px;
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: black;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
  position: relative;
  max-width: 150px;

  width: 100%;
  text-align: right;
  padding-right: ${({ suffix }) => (suffix ? "20px" : "12px")};
  -moz-appearance: textfield;
  /* font-family: "Roboto Mono", monospace; */
  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: max-content;
  height: min-content;
`;

const Suffix = styled.span`
  position: absolute;
  bottom: 6px;
  right: ${({ position }) => position || "6px"};
  /* display: ${({ position }) => (position === 0 ? "none" : "initial")}; */
  display: none;
`;

const AmountInput = ({
  style = null,
  value,
  onChange,
  onBlur = null,
  placeholder,
  position = null,
  options = null,
}) => {
  const handleChange = (e) => {
    if (!Number(e.target.value)) {
      return;
    }
    onChange(e);
  };
  return (
    <Wrapper position={position}>
      <StyledCleave
        type="number"
        style={style}
        onBlur={onBlur}
        value={value}
        onChange={handleChange}
      />
      <Suffix>zł</Suffix>
    </Wrapper>
  );
};

export default AmountInput;
