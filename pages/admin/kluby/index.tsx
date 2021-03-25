import { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import prisma from "../../../middleware/prisma";
import PrimaryButton from "../../../components/atoms/primary_button";
//componens
import ClubsList from "../../../components/organisms/clubs_list";
import Select from "../../../components/atoms/form_select";

const SearchBar = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  margin-left: 16px;
  height: 33px;
  min-width: 200px;
  max-width: 350px;
  width: 100%;
  background-image: url("/loupe.png");
  background-repeat: no-repeat;
  background-position: 95% 50%;
  padding-right: 16px;
  outline: none;
`;

export const AdminContext = createContext(null);
const Kluby = ({ clubs, userData }) => {
  const router = useRouter();
  const [list, setList] = useState(clubs);
  const [leauge, setLeauge] = useState("wszystkie");
  const [status, setStatus] = useState("wszystkie");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let helperArr = clubs;

    if (status !== "wszystkie") {
      helperArr = helperArr.filter((club) => club.active == parseInt(status));
    }

    if (leauge !== "wszystkie") {
      if (leauge === "Klasa A / B") {
        helperArr = helperArr.filter((club) => {
          return club.leauge === "Klasa A" || club.leauge === "Klasa B";
        });
      } else {
        helperArr = helperArr.filter((club) => {
          return club.leauge.toLowerCase() === leauge.toLowerCase();
        });
      }
    }

    if (query !== "") {
      helperArr = helperArr.filter((club) => {
        return JSON.stringify(club).toLowerCase().indexOf(query.toLowerCase()) >
          -1
          ? true
          : false;
      });
    }

    setList(helperArr);
  }, [leauge, status, query]);

  return (
    <AdminContext.Provider value={{ list }}>
      <AdminLayout userData={userData} view="kluby">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 0",
            width: "100%",
          }}
        >
          <h1>Kluby</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              justifyContent: "space-around",
            }}
          >
            <Select
              style={{ marginTop: 0, minWidth: "150px", maxWidth: "200px" }}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="wszystkie">Wszystkie kluby</option>
              <option value={1}>aktywny</option>
              <option value={0}>nieaktywny</option>
            </Select>
            <Select
              style={{ marginTop: 0, minWidth: "150px", maxWidth: "200px" }}
              value={leauge}
              onChange={(e) => setLeauge(e.target.value)}
            >
              <option value="wszystkie">Wszystkie ligi</option>
              <option value="IV liga">IV liga</option>
              <option value="V liga">V liga</option>
              <option value="Klasa okręgowa">Klasa okręgowa</option>
              <option value="Klasa A / B">Klasa A / B</option>

              <option value="młodzież">Ligi młodzieżowe</option>
            </Select>

            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value.trim())}
              placeholder="szukaj"
            />
            <PrimaryButton
              onClick={() => router.push(`/admin/kluby/nowy`)}
              style={{
                fontWeight: "bold",
                width: "200px",
                whiteSpace: "nowrap",
              }}
            >
              + Dodaj klub
            </PrimaryButton>
          </div>
        </div>
        <ClubsList />
      </AdminLayout>
    </AdminContext.Provider>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const clubs = await prisma.clubs.findMany();

  return {
    props: {
      userData: data,
      clubs: clubs,
    },
  };
});

export default Kluby;
