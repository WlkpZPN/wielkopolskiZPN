import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { AdminContext } from "../../pages/admin/index";
import { useLocalStorage } from "../../middleware/hooks";
//icons
import { Download } from "@styled-icons/entypo/Download";
//components
import { exportApplicationData } from "../../middleware/utils";
import TableRow from "../atoms/table_row";
import ApplicationStatus from "../atoms/application_status";
import IconButton from "../atoms/IconButton";
import TablePagination from "../molecules/table_pagination";
import ClubName from "../atoms/club_name";
import PrimaryButton from "../atoms/primary_button";
import { getInternalId } from "../../middleware/utils";

const Wrapper = styled.div`
  margin: 24px 0;
  border-radius: 4px;
`;

const TableHeader = styled.span`
  font-weight: bold;
`;

const StyledRow = styled(TableRow)`
  grid-template-columns: 40px 60px minmax(100px, 150px) minmax(60px, 250px) 90px 120px 100px 100px auto;
`;

const ApplicationsList = () => {
  const router = useRouter();
  const [page, setPage] = useLocalStorage("application_page", 0);
  const { list: applications } = useContext(AdminContext);
  console.log(applications);
  const dataToExport = applications;
  delete dataToExport.clubs;
  delete dataToExport.statuses;
  const totalPages = Math.ceil(applications.length / 10);
  if (totalPages <= page) {
    setPage(0);
  }
  const generateClubs = () => {
    let applicationsArray = [];

    for (let i = 0; i < totalPages; i++) {
      applicationsArray.push([]);
    }

    let currentPage = 0;
    applications.forEach((application, index) => {
      applicationsArray[currentPage].push(
        <StyledRow
          key={application.clubs.id}
          onClick={() => router.push(`/admin/licencje/${application.clubs.id}`)}
        >
          <ApplicationStatus status={application.statuses.name} />
          <span>{application.internal_id}</span>
          <span>{application.created_at}</span>
          <ClubName style={{ display: "block", width: "100%" }}>
            {application.clubs.name}
          </ClubName>
          <span>{application.statuses.name}</span>
          <span>{application.clubs.agent_name}</span>
          <span>{application.clubs.agent_position}</span>
          <span>{application.clubs.agent_phone}</span>
          <PrimaryButton
            onClick={() =>
              router.push(`/admin/licencje/${application.clubs.id}`)
            }
            style={{ width: "min-content", justifySelf: "end" }}
          >
            Szczegóły
          </PrimaryButton>
        </StyledRow>
      );
      if (applicationsArray[currentPage].length === 10) {
        currentPage += 1;
      }
    });

    return applicationsArray;
  };
  return (
    <Wrapper>
      <div>
        <StyledRow style={{ backgroundColor: "#F9FAFB" }}>
          <span></span>
          <TableHeader>ID wniosku</TableHeader>
          <TableHeader>Data złożenia wniosku</TableHeader>
          <TableHeader>Klub</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Pełnomocnik</TableHeader>
          <TableHeader>Stanowisko</TableHeader>
          <TableHeader>Telefon</TableHeader>
        </StyledRow>
        {generateClubs()[page]}
      </div>
      <div
        style={{
          margin: "32px 0",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton onClick={() => exportApplicationData(applications)}>
          <Download />
          Eksportuj tabelę do CSV
        </IconButton>

        <TablePagination
          pages={totalPages}
          setPage={setPage}
          currentPage={page}
        />
      </div>
    </Wrapper>
  );
};

export default ApplicationsList;
