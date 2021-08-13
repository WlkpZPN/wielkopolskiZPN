import AddInvoice from "../molecules/add_invoice";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/paragraph";
const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddInvoiceWrapper = ({ clubData, admin }) => {
  const inititalData = {
    first: null,
    second: null,
  };

  const [invoiceFiles, setInvoiceFiles] = useState(inititalData);

  const addFile = (index, file) => {
    let newFiles = invoiceFiles;
    newFiles[index] = file;
    console.log(newFiles);
    setInvoiceFiles(newFiles);
  };

  const deleteFile = (index) => {
    let newFiles = invoiceFiles;
    newFiles[index] = null;
    setInvoiceFiles(newFiles);
  };

  useEffect(() => {
    console.log("invoice files changed!");
  }, [invoiceFiles]);

  return (
    <Row>
      <Column>
        <Paragraph>Dodaj fakturę</Paragraph>
        <AddInvoice
          admin={admin}
          clubData={clubData}
          addFile={(file) => addFile("first", file)}
          file={invoiceFiles.first}
          deleteFile={() => deleteFile("first")}
          invoiceUrl={clubData.applications[0].invoice_url}
        />
      </Column>
      {invoiceFiles.first != null ? (
        <Column>
          <Paragraph>Dodaj koretkę faktury</Paragraph>
          <AddInvoice
            admin={admin}
            clubData={clubData}
            addFile={(file) => addFile("second", file)}
            file={invoiceFiles.second}
            deleteFile={() => deleteFile("second")}
            invoiceUrl={clubData.applications[0].invoice_url_2}
          />
        </Column>
      ) : null}
    </Row>
  );
};

export default AddInvoiceWrapper;
