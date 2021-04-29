import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";

const StyledCircle = styled(InfoCircle)``;
const InfoContainer = styled.div`
  z-index: 99;
  width: max-content;
  cursor: pointer;
  overflow: visible;
  /* // position: ${({ position }) => (position ? position : "absolute")};
  top: 0px;
  right: -30px; */
  margin-left: 15px;
  & svg {
    width: 25px;

    color: ${({ theme }) => theme.primaryLight};
    transition: all 0.2s;
  }
  /* width: 100%; */
  &:hover {
    & p {
      display: block;
    }
  }
`;

const Text = styled.p`
  z-index: 99999;
  left: 30px;
  position: absolute;
  display: none;
  background: ${({ theme }) => theme.primary};
  width: 500px;
  white-space: pre-wrap;
  padding: 32px;
  border-radius: 5px;

  color: white;
`;

const Parent = styled.div`
  position: relative;
  width: min-content;
`;

const Info = ({ text, style = null }) => {
  return (
    <Parent>
      <InfoContainer position={style?.position} style={style} text={text}>
        {text ? <StyledCircle /> : null}
        <Text>{text}</Text>
      </InfoContainer>
    </Parent>
  );
};

export default Info;
