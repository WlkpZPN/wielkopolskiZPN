import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
const InfoContainer = styled.div`
  z-index: 99;
  width: max-content;
  cursor: pointer;
  overflow: visible;
  position: ${({ position }) => (position ? position : "absolute")};
  top: 0px;
  right: -30px;
  & svg {
    width: 25px;

    z-index: -1;
    transition: all 0.2s;
  }
  /* width: 100%; */
  &:hover {
    & p {
      display: block;
    }
  }
  color: ${({ theme }) => theme.primaryLight};

  &::after {
    /* content: " ${({ text }) => `${text}`}"; */
    /* z-index: 100;
    padding: 32px;
    display: none;
    transition: all 0.2s;

    left: 105%;
    top: 18px;
    border-radius: 5px;
    position: absolute;
    color: white;
    background: ${({ theme }) => theme.primary};
    max-width: 600px;
    width: 300%;
    z-index: 999999; */

    /* transform: translate(-50%, 50%); */
  }
`;

const Text = styled.p`
  z-index: 99999;
  left: 25px;
  position: absolute;
  display: none;
  background: ${({ theme }) => theme.primary};
  max-width: 600px;
  padding: 32px;
  border-radius: 5px;
  width: 400px;
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
        {text ? <InfoCircle /> : null}
        <Text>{text}</Text>
      </InfoContainer>
    </Parent>
  );
};

export default Info;
