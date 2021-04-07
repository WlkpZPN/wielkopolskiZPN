import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { FilePdf } from "@styled-icons/fa-regular/FilePdf";
import Loader from "../atoms/loader";
import { toast } from "react-toastify";
import { makeid } from "../../middleware/utils";
//components
import OutlineButton from "../atoms/outline_button";

const Parent = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 16px;
  margin-right: 16px;
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 0;
  width: 260px;
  overflow: auto;
  text-align: center;
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
    content: "${({ text }) => `${text}`}";
    z-index: 100;
    padding: 32px;
    display: none;
    transition: all 0.2s;
    position: absolute;
    left: 14px;
    min-width: 400px;
    top: 14px;
    border-radius: 5px;
    width: 500px;
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

const AddFile = ({ file, handleDelete, addFile, text }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(file);
  const handleChange = (e) => {
    //console.log(e.target.files[0]);
    const newFile = {
      ...e.target.files[0],
      name: `${makeid(3)}_${e.target.files[0].name}`,
    };
    e.preventDefault();
    addFile(file ? file.id : uniqid(), newFile);
  };

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
    <Parent>
      <Wrapper>
        {text ? (
          <Info text={text}>
            <InfoCircle />
          </Info>
        ) : null}

        <FileInfo>
          <FilePdf />
          <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
            {file ? file.name : "Brak załączonego dokumentu."}
          </span>
        </FileInfo>

        <Label>
          {file ? null : <AddButton>+ Dodaj dokument</AddButton>}

          <FileInput
            id="file"
            type="file"
            name="file"
            onChange={handleChange}
          />
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
    </Parent>
  );
};

export default AddFile;
