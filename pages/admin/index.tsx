import { useState, createContext, useEffect } from "react";

import styled from "styled-components";
import prisma from "../../middleware/prisma";

import AdminLayout from "../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";

//components
import ApplicationsList from "../../components/organisms/applications_list";
import Select from "../../components/atoms/form_select";

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

const MainPage = ({ userData, applications }) => {
  const [filterType, setFilterType] = useState(0);
  const [query, setQuery] = useState("");
  const [list, setList] = useState(applications);

  useEffect(() => {
    let helperArr = applications;
    // console.log(query !== "");
    // console.log(query);

    //1 check for filter type
    // TO DO : double check filtering types
    if (filterType > 0) {
      helperArr = helperArr.filter((application) => {
        console.log(application.status_id === 1);

        return application.status_id === filterType;
      });
    } else if (filterType === 0) {
      helperArr = applications;
    }

    if (query !== "") {
      helperArr = helperArr.filter((application) => {
        return JSON.stringify(application)
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
          ? true
          : false;
      });
    }
    setList(helperArr);
    //2 query the filter type
  }, [filterType, query]);
  return (
    <AdminContext.Provider value={{ userData, list }}>
      <AdminLayout userData={userData} view="wnioski">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Wnioski licencyjne</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select
              style={{ marginTop: 0, minWidth: "200px" }}
              value={filterType}
              onChange={(e) => setFilterType(parseInt(e.target.value))}
            >
              <option value={0}>wszystkie wnioski</option>
              <option value={1}>roboczy</option>
              <option value={2}>wnioskowany</option>
              <option value={3}>zatwierdzony</option>
              <option value={4}>do poprawy</option>
              <option value={5}>odrzucony</option>
              <option value={6}>zaakceptowany nieopłacony</option>
              <option value={7}>zaakceptowany opłacony</option>
              <option value={8}>licencja wydana</option>
              <option value={9}>licencja niewydana</option>
              <option value={10}>licencja z nadzorem</option>
              <option value={11}>licencja cofnięta</option>
            </Select>
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj"
            />
          </div>
        </div>
        {applications ? <ApplicationsList /> : null}
      </AdminLayout>
    </AdminContext.Provider>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const { req, res } = context;

  if (!data) {
    res.statusCode = 302;
    res.setHeader("Location", "/admin/login");
    return {
      props: {},
    };
  }
  console.log("data", data);
  const applications = await prisma.applications.findMany({
    include: {
      statuses: true,
      clubs: true,
    },
  });

  return {
    props: {
      userData: data,
      applications: applications,
    },
  };
});

export default MainPage;
