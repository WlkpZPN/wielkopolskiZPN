import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { FilePdf } from "@styled-icons/fa-regular/FilePdf";
import Loader from "../atoms/loader";
import { toast } from "react-toastify";
//components
import OutlineButton from "../atoms/outline_button";

const Wrapper = styled.div`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
  margin-right: 16px;
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  width: 300px;

  text-align: center;

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
  white-space: wrap;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  align-items: center;

  margin-bottom: 32px;
  svg {
    width: 40px;
    margin-bottom: 16px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label``;

const AddButton = styled.span`
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  transition: all 0.2s;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;

  cursor: pointer;
  background: transparent;
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

const DeleteButton = styled.span`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.danger};
  color: white;
  font-weight: bold;
  transition: all 0.2s;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.dangerDark};
  }
`;

const AddFile = ({ file, handleDelete, addFile }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    addFile(file ? file.id : uniqid(), e.target.files[0]);
    console.log(e.target.files[0]);
  };
  console.log(file);

  const deleteFile = async () => {
    if (!file?.id) {
      return;
    }
    setLoading(true);
    try {
      axios.post("/api/applications/deleteFile", {
        attachment: file,
      });
      setLoading(false);
      toast.error("Usunięto plik", {
        autoClose: 1500,
      });
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Nie udało się usunąć pliku,spróbuj ponownie", {
        autoClose: 2000,
      });
    }
  };
  return (
    <Wrapper>
      <Info>
        <InfoCircle />
      </Info>
      <FileInfo>
        <FilePdf />
        <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          {file ? file.name : "Brak załączonego dokumentu."}
        </span>
      </FileInfo>

      <Label>
        {file ? null : <AddButton>+ Dodaj dokument</AddButton>}

        <FileInput id="file" type="file" name="file" onChange={handleChange} />
      </Label>
      {file ? (
        <DeleteButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(file.id);
            deleteFile();
          }}
        >
          Usuń
        </DeleteButton>
      ) : null}
    </Wrapper>
  );
};

export default AddFile;
