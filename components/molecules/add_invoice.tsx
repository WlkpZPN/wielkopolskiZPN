import { useState } from "react";
import uniqid from "uniqid";

import styled from "styled-components";
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { FilePdf } from "@styled-icons/fa-regular/FilePdf";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../atoms/loader";
import { toast } from "react-toastify";
//components
import OutlineButton from "../atoms/outline_button";
import PrimaryButton from "../atoms/primary_button";

const Wrapper = styled.div`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 32px;
  margin-right: 16px;
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 340px;
  display: flex;
  padding-top: 40px;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  position: relative;
  z-index: 0;
  width: 260px;

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

  & a,
  & button {
    width: 100%;
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

const Label = styled.label`
  width: 100%;

  & span {
    width: 100%;
    display: block;
  }
`;

const AddButton = styled.span`
  padding: 10px 16px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  transition: all 0.2s;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  width: 100%;
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

const AddInvoice = ({ admin, clubData, file, addFile }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    addFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleDelete = () => {
    addFile(null);
  };

  const uploadFile = async () => {
    console.log(file.name);
    const formData = new FormData();
    formData.append("invoice", file);
    console.log(file);
    const config = {
      headers: { "Content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    try {
      setLoading(true);
      await axios.post("/api/applications/uploadInvoice", formData, config);
      await axios.post("/api/clubs/updateData", {
        clubId: clubData.id,
        data: {
          invoice_url: `https://pdf.fra1.digitaloceanspaces.com/faktury/${file.name}`,
        },
      });

      setLoading(false);
      toast.success("Pomyślnie dodano fakturę", {
        autoClose: 2000,
      });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      toast.error("Dodanie faktury się nie powiodło,sprobój ponownie", {
        autoClose: 2000,
      });
      return;
    }
  };

  const deleteInvoice = async (key) => {
    console.log(key);
    setLoading(true);
    try {
      axios.post("/api/applications/deleteInvoice", {
        key: key,
        clubId: clubData.id,
      });
      setLoading(false);
      toast.error("Faktura usunięta", {
        autoClose: 2000,
      });
      addFile(null);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      toast.error("Usuwanie faktury się nie powiodło,spróbuj ponownie", {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const generateContent = () => {
    if (loading) {
      return <Loader style={{ alignSelf: "center" }} />;
    }

    if (clubData.invoice_url) {
      const addressArr = clubData.invoice_url.split("/");
      const key = addressArr[addressArr.length - 1];
      return (
        <>
          {" "}
          <a
            target="_blank"
            style={{ marginBottom: "16px" }}
            href={clubData.invoice_url}
          >
            <OutlineButton>Pobierz fakturę</OutlineButton>
          </a>
          <PrimaryButton
            color="danger"
            hoverColor="dangerDark"
            onClick={() => deleteInvoice(key)}
          >
            Usuń
          </PrimaryButton>
        </>
      );
    }

    if (file) {
      return (
        <>
          <PrimaryButton
            style={{ marginBottom: "16px" }}
            color="success"
            hoverColor="successDark"
            onClick={uploadFile}
          >
            Wyślij
          </PrimaryButton>
          <DeleteButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Usuń
          </DeleteButton>
        </>
      );
    }

    if (!clubData.invoice_url && !file) {
      return (
        <Label>
          <AddButton>+ Dodaj dokument</AddButton>

          <FileInput
            id="file"
            type="file"
            name="invoice"
            onChange={handleChange}
          />
        </Label>
      );
    }
  };

  const renderTitle = () => {
    if (clubData.invoice_url) {
      const addressArr = clubData.invoice_url.split("/");
      return (
        <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          {addressArr[addressArr.length - 1]}
        </span>
      );
    } else if (file) {
      return (
        <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          {file.name}
        </span>
      );
    } else {
      return (
        <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          Brak załączonej faktury
        </span>
      );
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
          {renderTitle()}
        </span>
      </FileInfo>

      {generateContent()}
    </Wrapper>
  );
};

export default AddInvoice;
