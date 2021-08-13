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
import SendAbnormalitites from "../molecules/send_abnormalities";
const Wrapper = styled.div`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 24px;
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
    /* z-index: 10; */
    position: absolute;
    top: 16px;
    left: 16px;
    transition: all 0.2s;
  }
  width: 100%;

  color: ${({ theme }) => theme.primaryLight};
  &:hover {
    z-index: 1000;
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
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.dangerDark};
  }
`;

const AddInvoice = ({
  admin,
  clubData,
  file = null,
  addFile = null,
  deleteFile = null,
  invoiceUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  console.log(file);
  const handleChange = (e) => {
    e.preventDefault();
    addFile(e.target.files[0]);
  };

  const handleDelete = () => {
    deleteFile();
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("invoice", file);

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
      setLoading(false);
      return;
    }
  };

  const deleteInvoice = async (key) => {
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
      deleteFile();
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
    if (!admin) {
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
              hoverColor="dangerDark"
              color="danger"
              type="button"
              onClick={() => setVisible(true)}
            >
              Zgłoś nieprawidłowości
            </PrimaryButton>
            <SendAbnormalitites
              clubData={clubData}
              visible={visible}
              setVisible={setVisible}
            />
          </>
        );
      } else {
        return null;
      }
    }

    if (loading) {
      return <Loader style={{ alignSelf: "center" }} />;
    }

    if (clubData.applications[0].invoice_url) {
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
          <PrimaryButton
            hoverColor="dangerDark"
            color="danger"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Usuń
          </PrimaryButton>
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
    if (!admin) {
      if (clubData.invoice_url) {
        const addressArr = clubData.invoice_url.split("/");
        return (
          <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
            {addressArr[addressArr.length - 1]}
          </span>
        );
      } else {
        return (
          <span style={{ width: "100%", whiteSpace: "pre-wrap" }}>
            Brak załączonej faktury
          </span>
        );
      }
    }

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
