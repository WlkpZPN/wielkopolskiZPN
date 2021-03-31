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
  transform: translate(-50%, -50%);
  background: white;
  max-width: 50%;
  width: 100%;
  border-radius: 5px;
  & h1 {
    margin-bottom: 16px;
  }
`;

const StatementText = styled.p`
  margin-bottom: 32px;
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
            <h1>Oświadczenie</h1>
            <StatementText>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              sit amet risus ac orci volutpat venenatis sit amet et felis. Cras
              ut odio eget quam mollis dignissim eu a neque. Phasellus gravida
              porttitor egestas. Suspendisse porta ultricies urna sit amet
              convallis. Cras vestibulum eros ac ex commodo, at molestie nunc
              pretium. Aenean sed accumsan nisi. Ut euismod semper luctus. Nam
              at enim nisi. Fusce aliquet pharetra erat sit amet tempus. Vivamus
              a vestibulum ante. Integer commodo augue varius purus semper, quis
              efficitur ex auctor. Pellentesque pretium eros lacus, nec
              elementum nulla sagittis eu. Duis congue orci id nisi cursus
              porttitor ac nec dolor. Mauris ac mi a arcu lacinia viverra non eu
              odio. Nunc vulputate arcu ut posuere euismod. Sed eleifend at orci
              quis eleifend. Nunc hendrerit risus id velit tincidunt, vel
              tincidunt ipsum tempus. Maecenas non cursus velit. Ut fermentum
              tincidunt leo ac commodo. Proin eros tellus, aliquet et ligula ut,
              dapibus porttitor leo. Vestibulum commodo aliquet ligula. Donec
              molestie nisl scelerisque lectus pulvinar pharetra.{" "}
            </StatementText>
            <Label pointer direction="row">
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
