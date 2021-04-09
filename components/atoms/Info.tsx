import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
const InfoContainer = styled.div`
  z-index: 9999999;
  width: min-content;
  & svg {
    width: 25px;
    z-index: 100;

    position: ${({ position }) => (position ? position : "absolute")};
    top: -6px;
    right: -30px;
    z-index: 9999;
    transition: all 0.2s;
  }
  /* width: 100%; */

  color: ${({ theme }) => theme.primaryLight};
  &:hover {
    &::after {
      display: block;
    }
  }
  &::after {
    content: " ${({ text }) => `${text}`}";
    z-index: 100;
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
    z-index: 999999;

    /* transform: translate(-50%, 50%); */
  }
`;

const Info = ({ text, style = null }) => {
  return (
    <InfoContainer position={style?.position} style={style} text={text}>
      {text ? <InfoCircle /> : null}
    </InfoContainer>
  );
};

export default Info;
