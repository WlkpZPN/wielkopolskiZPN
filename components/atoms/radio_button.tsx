import styled from 'styled-components';

const Label = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.2rem;
  color: black;
`;

const RadioInput = styled.span`
  display: flex;
  align-items: center;
`;

const Radio = styled.input``;

const RadioControl = styled.span``;

const RadioLabel = styled.span``;

const RadioButton = ({ name, id, checked, value, onChange, children }) => {
  return (
    <Label>
      <RadioInput>
        <Radio checked={checked} onChange={onChange} type="radio" name={name}></Radio>
        <RadioControl></RadioControl>
      </RadioInput>
      <RadioLabel>{children}</RadioLabel>
    </Label>
  );
};

export default RadioButton;
