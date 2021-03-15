import styled from "styled-components";
import { useState, useContext } from "react";
import { AdminContext } from "../../pages/admin/kluby";
import { useRouter } from "next/router";
//icons
import { Download } from "@styled-icons/entypo/Download";
import { AttachMoney } from "@styled-icons/material/AttachMoney";
//components
import TableRow from "../atoms/table_row";
import ClubStatus from "../atoms/club_status";
import IconButton from "../atoms/IconButton";
import TablePagination from "../molecules/table_pagination";
import ClubName from "../atoms/club_name";
import PrimaryButton from "../atoms/primary_button";
import DebtIcon from "../atoms/debt_icon";
const Wrapper = styled.div`
  margin: 24px 0;
  border-radius: 4px;
`;

const TableHeader = styled.span`
  font-weight: bold;
`;

const ClubsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { clubs } = useContext(AdminContext);
  console.log(clubs);
  const totalPages = Math.ceil(clubs.length / 10);

  const generateClubs = () => {
    let clubsArray = [];

    for (let i = 0; i < totalPages; i++) {
      clubsArray.push([]);
    }

    let currentPage = 0;
    clubs.forEach((club, index) => {
      clubsArray[currentPage].push(
        <TableRow  onClick={() => router.push(`/admin/kluby/${club.id}`)}>
          <DebtIcon debt={club.debt} />
          <ClubStatus active={club.active} />
          <span>{club.internal_id}</span>
          <span>{club.updated_at}</span>
          <ClubName style={{ display: "block", width: "100%" }}>
            {club.name}
          </ClubName>
          <span>{club.active ? "aktywny" : "niekatywny"}</span>
          <span>{club.region}</span>
          <span>{club.leauge}</span>
          <PrimaryButton
            onClick={() => router.push(`/admin/kluby/${club.id}`)}
            style={{ width: "min-content", justifySelf: "end" }}
          >
            Szczegóły
          </PrimaryButton>
        </TableRow>
      );
      if (clubsArray[currentPage].length === 10) {
        currentPage += 1;
      }
    });
    console.log(clubsArray);
    return clubsArray;
  };
  return (
    <Wrapper>
      <TableRow style={{ backgroundColor: "#F9FAFB" }}>
        <span></span>
        <TableHeader>ID klubu</TableHeader>
        <TableHeader>Data ost. akutalizacji</TableHeader>
        <TableHeader>Pełna nazwa</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Strefa</TableHeader>
        <TableHeader>Klasa rozgrywkowa</TableHeader>
      </TableRow>
      {generateClubs()[page]}
      <div
        style={{
          margin: "32px 0",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton>
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

export default ClubsList;
