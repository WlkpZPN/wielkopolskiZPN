import styled from "styled-components";
import { CSVLink } from "react-csv";
import { Download } from "@styled-icons/entypo/Download";

const Button = styled.button`
  color: ${({ theme }) => theme.primary};
`;

const ExportToCSV = ({ data, fileName }) => {
  return (
    <Button>
      <CSVLink headers={data[0]} data={data} fileName={fileName}>
        <Download />
      </CSVLink>
    </Button>
  );
};

export default ExportToCSV;
