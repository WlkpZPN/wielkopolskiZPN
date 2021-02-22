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
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: fixed;
  padding: 32px;
`;

const StatementContent = styled.div``;

const StatementText = styled.p`
  margin-bottom: 32px;
`;

const CloseIcon = styled(CloseOutline)`
  width: 25px;
  position: absolute;
  top: 32px;
  right: 32px;
`;

const FormStatement = ({
  name,
  buttonText = "Potwierdzam treść oświadczenia",
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Wrapper>
      <Paragraph>{name}</Paragraph>
      <OutlineButton onClick={() => setVisible(true)}>
        Pokaż treść oświadczenia
      </OutlineButton>
      <Label direction="row">
        <RadioSquare />
        {buttonText}
      </Label>
      <Statement visible={visible}>
        <StatementContent>
          <CloseIcon onClick={() => setVisible(false)} />
          <h1>Oświadczenie</h1>
          <StatementText>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit
            amet risus ac orci volutpat venenatis sit amet et felis. Cras ut
            odio eget quam mollis dignissim eu a neque. Phasellus gravida
            porttitor egestas. Suspendisse porta ultricies urna sit amet
            convallis. Cras vestibulum eros ac ex commodo, at molestie nunc
            pretium. Aenean sed accumsan nisi. Ut euismod semper luctus. Nam at
            enim nisi. Fusce aliquet pharetra erat sit amet tempus. Vivamus a
            vestibulum ante. Integer commodo augue varius purus semper, quis
            efficitur ex auctor. Pellentesque pretium eros lacus, nec elementum
            nulla sagittis eu. Duis congue orci id nisi cursus porttitor ac nec
            dolor. Mauris ac mi a arcu lacinia viverra non eu odio. Nunc
            vulputate arcu ut posuere euismod. Sed eleifend at orci quis
            eleifend. Nunc hendrerit risus id velit tincidunt, vel tincidunt
            ipsum tempus. Maecenas non cursus velit. Ut fermentum tincidunt leo
            ac commodo. Proin eros tellus, aliquet et ligula ut, dapibus
            porttitor leo. Vestibulum commodo aliquet ligula. Donec molestie
            nisl scelerisque lectus pulvinar pharetra.{" "}
          </StatementText>
          <Label direction="row">
            <RadioSquare />
            {buttonText}
          </Label>
        </StatementContent>
      </Statement>
    </Wrapper>
  );
};

export default FormStatement;
