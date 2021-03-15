import styled from "styled-components";

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: relative;
  display: none;
  cursor: pointer;
  &:checked + span {
    background: ${({ theme }) => theme.primaryLight};
    box-shadow: 0 0 5px 0px ${({ theme }) => theme.primaryLight};
  }
`;

const CustomRadio = styled.span`
  display: block;
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-right: 6px;
`;

const RadioSquare = ({ value, handleChange }) => {
  return (
    <div>
      <Radio onChange={handleChange} checked={value} type="checkbox" />
      <CustomRadio />
    </div>
  );
};

export default RadioSquare;
