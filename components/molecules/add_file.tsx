import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { FilePdf } from "@styled-icons/fa-regular/FilePdf";
//components
import OutlineButton from "../atoms/outline_button";
const Wrapper = styled.div`
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  &::after {
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae tempor felis, a euismod est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel nulla ac ex blandit dapibus vel non nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada ";
    z-index: 100;
    padding: 24px;
    display: none;
    position: absolute;
    left: 16px;
    border-radius: 5px;
    top: 16px;
    color: white;
    background: ${({ theme }) => theme.primary};
    width: 90%;
    z-index: 2;
    /* transform: translate(-50%, 50%); */
  }
`;

const Info = styled.div`
  & svg {
    width: 30px;
    z-index: 100;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: all 0.2s;
  }
  width: 100%;

  color: ${({ theme }) => theme.primaryLight};
  &:hover {
    color: white;
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
    left: 14px;
    top: 14px;
    border-radius: 5px;
    width: 100%;
    color: white;
    background: ${({ theme }) => theme.primary};
    width: 90%;
    z-index: 1;
    /* transform: translate(-50%, 50%); */
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  margin-bottom: 16px;
  svg {
    width: 50px;
    margin-bottom: 16px;
  }
`;

const AddFile = () => {
  return (
    <Wrapper>
      <Info>
        <InfoCircle />
      </Info>
      <FileInfo>
        <FilePdf />
        Brak załączonego dokumentu.
      </FileInfo>
      <OutlineButton>+ Dodaj dokument</OutlineButton>
    </Wrapper>
  );
};

export default AddFile;
