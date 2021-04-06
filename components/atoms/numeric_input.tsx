import { useState } from "react";
import styled from "styled-components";
import Cleave from "cleave.js/react";

const StyledCleave = styled(Cleave)`
  width: ${({ width }) => width};
  margin-top: 4px;
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  color: black;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
  width: 100%;
  -moz-appearance: textfield;
  /* font-family: "Roboto Mono", monospace; */
  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  &::after {
    content: "${({ suffix }) => suffix}";
    display: inline;
    position: absolute;
    right: 20px;
    line-height: 33px;
    font-size: 18px;
    top: 6px;
    width: 20px;

    color: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
`;

const Suffix = styled.span`
  position: absolute;
  bottom: 6px;
  left: ${({ position }) => `${position + 15}px`};
  /* display: ${({ position }) => (position === 0 ? "none" : "initial")}; */
  display: none;
`;

const NumericInput = ({ value, onChange, suffix, placeholder }) => {
  return (
    <Wrapper suffix={suffix}>
      <StyledCleave
        className="form-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={{
          numeral: true,
        }}
      />
    </Wrapper>
  );
};

export default NumericInput;
