import { useState } from 'react';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';

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
  position: relative;
  max-width: 150px;
  width: 100%;
  text-align: right;
  padding-right: ${({ suffix }) => (suffix ? '20px' : '12px')};
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
  /* &::after {
    content: "$ {({ suffix }) => suffix}";

    display: inline;
    position: absolute;
    right: $ {({ position }) => position || "3px"};
    line-height: 33px;
    font-size: 18px;
    bottom: 0px;
    width: 20px;
    font-weight: normal;
    color: black;
    z-index: 10;
  } */
`;

const Suffix = styled.span<{ position?: string }>`
  position: absolute;
  bottom: 5px;
  right: ${({ position }) => position || '6px'};
  /* display: $ {({ position }) => (position === 0 ? "none" : "initial")}; */
  display: none;
`;

const NumericInput = ({
  style = null,
  value,
  onChange,
  suffix,
  placeholder,
  position = null,
  options = null,
}) => {
  const defaultOptions = {
    numeral: true,
  };
  return (
    <Wrapper>
      <StyledCleave
        style={style}
        className="form-field"
        suffix={suffix}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options || defaultOptions}
      />
      <Suffix>{suffix}</Suffix>
    </Wrapper>
  );
};

export default NumericInput;
