import styled from "styled-components";
import { Check } from "@styled-icons/boxicons-regular/Check";

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: relative;
  display: none;
  cursor: pointer;
  &:checked + svg {
    color: ${({ theme }) => theme.primaryLight};
    box-shadow: 0 0 2px 0px ${({ theme }) => theme.primaryLight};
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

const RadioSquare = ({ setVisible = null, value, handleChange }) => {
  return (
    <label>
      <Radio
        onClick={() => setVisible?.(false)}
        onChange={handleChange}
        checked={value}
        type="checkbox"
      />
      <CustomRadio />
    </label>
  );
};

export default RadioSquare;
