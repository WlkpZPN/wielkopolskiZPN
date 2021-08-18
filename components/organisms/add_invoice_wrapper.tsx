import AddInvoice from "../molecules/add_invoice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/paragraph";
import Loader from "../atoms/loader";
const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddInvoiceWrapper = ({ clubData, admin }) => {
  const router = useRouter();
  const initialData = {
    first: clubData.applications[0].invoice_url,
    second: clubData.applications[0].invoice_url_2,
  };

  //* null if no invoice added
  //* object ( not string ) if file is in the browser
  //* url string if file is on the server

  const [invoiceFiles, setInvoiceFiles] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log(invoiceFiles);
  const addFile = (index, file) => {
    if (invoiceFiles[index] == null) {
      let newFiles = { ...invoiceFiles };
      newFiles[index] = file;

      setInvoiceFiles(newFiles);
    }
  };

  const deleteFile = async (index, key) => {
    if (typeof invoiceFiles[index] == "string") {
      await deleteFileUrl(invoiceFiles[index], index, key);
    }
    let newFiles = { ...invoiceFiles };
    newFiles[index] = null;
    setInvoiceFiles(newFiles);
  };

  const deleteFileUrl = async (url, index, key) => {
    setLoading(true);
    try {
      await axios.post("/api/applications/deleteInvoice", {
        key: key,
        applicationID: clubData.applications[0].id,
        index,
      });
      setLoading(false);
      toast.error("Faktura usunięta", {
        autoClose: 2000,
      });
      let newFiles = { ...invoiceFiles };
      newFiles[index] = null;
      setInvoiceFiles(newFiles);
      //router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      toast.error("Usuwanie faktury się nie powiodło,spróbuj ponownie", {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const uploadFile = async (field) => {
    const file = invoiceFiles[field];
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
      const uploadResult = await axios.post(
        "/api/applications/uploadInvoice",
        formData,
        config
      );
      const updateResult = await axios.post(
        "/api/applications/updateInvoiceUrl",
        {
          applicationID: clubData.applications[0].id,
          field: field,
          url: `https://pdf.fra1.digitaloceanspaces.com/faktury/${file.name}`,
        }
      );

      setLoading(false);
      console.log("result", uploadResult, updateResult);
      toast.success("Pomyślnie dodano fakturę", {
        autoClose: 2000,
      });
      let newFiles = { ...invoiceFiles };
      newFiles[
        field
      ] = `https://pdf.fra1.digitaloceanspaces.com/faktury/${file.name}`;
      setInvoiceFiles(newFiles);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Dodanie faktury się nie powiodło,sprobój ponownie", {
        autoClose: 2000,
      });
      //setLoading(false);
      return;
    }
  };
  //* if we have no invoices display the first one
  //* if we have first invoice display to second one (both)
  //* if we have second invoice display first one ( both)
  //* if we have both invoices display both
  return (
    <Row>
      <Column>
        <Paragraph>{admin ? "Dodaj fakturę" : "Faktura 1"} </Paragraph>
        <AddInvoice
          admin={admin}
          clubData={clubData}
          addFile={(file) => addFile("first", file)}
          file={invoiceFiles.first}
          deleteFile={(key) => deleteFile("first", key)}
          uploadFile={() => uploadFile("first")}
        />
      </Column>
      {invoiceFiles.second != null || invoiceFiles.first != null ? (
        <Column>
          <Paragraph>{admin ? "Dodaj koretkę faktury" : "Faktura 2"}</Paragraph>
          <AddInvoice
            admin={admin}
            clubData={clubData}
            addFile={(file) => addFile("second", file)}
            file={invoiceFiles.second}
            deleteFile={(key) => deleteFile("second", key)}
            uploadFile={() => uploadFile("second")}
          />
        </Column>
      ) : null}
      {loading == true ? <Loader /> : null}
    </Row>
  );
};

export default AddInvoiceWrapper;
