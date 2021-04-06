import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
const InfoContainer = styled.div`
  z-index: 9999999;

  & svg {
    width: 25px;
    z-index: 100;
    position: absolute;
    top: -6px;
    right: 0px;
    z-index: 9999;
    transition: all 0.2s;
  }
  width: 100%;

  color: ${({ theme }) => theme.primaryLight};
  &:hover {
    &::after {
      display: block;
    }
  }
  &::after {
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae tempor felis, a euismod est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel nulla ac ex blandit dapibus vel non nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada ";
    z-index: 100;
    padding: 32px;
    display: none;
    transition: all 0.2s;
    position: absolute;
    left: 100%;
    top: 6px;
    border-radius: 5px;
    width: 100%;
    color: white;
    background: ${({ theme }) => theme.primary};
    width: 90%;
    z-index: 999999;
    /* transform: translate(-50%, 50%); */
  }
`;

const Info = () => {
  return (
    <InfoContainer>
      <InfoCircle />{" "}
    </InfoContainer>
  );
};

export default Info;
