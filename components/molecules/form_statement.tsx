import { useState } from "react";
import styled from "styled-components";

//components
import Paragraph from "../atoms/paragraph";
import OutlineButton from "../atoms/outline_button";
import Label from "../atoms/form_label";
import RadioSquare from "./form_radio";
//icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
const Wrapper = styled.div``;

const Statement = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const StatementContent = styled.div`
  padding: 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  /* line-height: 1.5rem; */
  transform: translate(-50%, -50%);
  background: white;
  max-width: 1000px;
  width: 100%;
  border-radius: 5px;
  & h1 {
    margin-bottom: 16px;
  }
`;
const Header = styled.h2`
  margin-bottom: 40px;
`;
const StatementText = styled.p`
  margin-bottom: 32px;
  line-height: 1.8rem;
  text-align: justify;
  max-width: 800px;
`;

const CloseIcon = styled(CloseOutline)`
  width: 35px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const StyledLabel = styled(Label)`
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled(OutlineButton)`
  &:focus {
    box-shadow: 0px 3px 8px -4px ${({ theme }) => theme.primary};
    outline: none;
  }
`;
const FormStatement = ({
  text,
  name,
  buttonText = "Potwierdzam treść oświadczenia",
  value,
  handleChange,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  return (
    <Wrapper>
      <Paragraph>{name}</Paragraph>
      <Button type="button" onClick={() => setVisible(true)}>
        Pokaż treść oświadczenia
      </Button>
      <StyledLabel direction="row">
        <RadioSquare value={value} handleChange={handleChange} />
        {buttonText}
      </StyledLabel>
      {visible ? (
        <Statement onClick={handleClose}>
          <StatementContent>
            <CloseIcon onClick={() => setVisible(false)} />
            <Header>{name}</Header>
            <StatementText>{text}</StatementText>
            <Label style={{ marginLeft: "-9px" }} pointer direction="row">
              <RadioSquare
                setVisible={setVisible}
                value={value}
                handleChange={handleChange}
              />
              {buttonText}
            </Label>
          </StatementContent>
        </Statement>
      ) : null}
    </Wrapper>
  );
};

export default FormStatement;
