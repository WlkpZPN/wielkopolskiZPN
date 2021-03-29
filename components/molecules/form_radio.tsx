import styled from "styled-components";
import { Check } from "@styled-icons/boxicons-regular/Check";

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: relative;
  cursor: pointer;
  &:checked + svg {
    color: ${({ theme }) => theme.primaryLight};
    box-shadow: 0 0 2px 0px ${({ theme }) => theme.primaryLight};
  }
  &:checked:focus,
  &:checked:focus + label {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
  &:focus + svg {
    box-shadow: 0 0 5px 0px ${({ theme }) => theme.primaryLight};
  }
`;

const CustomRadio = styled(Check)`
  display: block;
  width: 21px;
  height: 21px;
  color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-right: 6px;
  padding: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  /* box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight}; */
  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.primaryLight};
  }
`;

const Paragraph = styled.p`
  display: flex;
  align-items: center;
  margin-left: -10px;
`;

const RadioSquare = ({ setVisible = null, value, handleChange }) => {
  return (
    <Paragraph>
      <Radio
        id="checkbox"
        onClick={() => setVisible?.(false)}
        onChange={handleChange}
        checked={value}
        type="checkbox"
      />
      <CustomRadio />
      <Label htmlFor="checkbox" tabindex="1" contenteditable="true"></Label>
    </Paragraph>
  );
};

export default RadioSquare;
