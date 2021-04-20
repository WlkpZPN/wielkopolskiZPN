import { useState, createContext, useEffect } from "react";

import styled from "styled-components";
import prisma from "../../middleware/prisma";
import { getApplications } from "../../middleware/swr";
import AdminLayout from "../../components/organisms/admin_layout";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";

//components
import ApplicationsList from "../../components/organisms/applications_list";
import Select from "../../components/atoms/form_select";
import Loader from "../../components/atoms/loader";

const SearchBar = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  margin-left: 16px;

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

const MainPage = ({ userData }) => {
  const {
    applications,
    isApplicationsError,
    isApplicationsLoading,
  } = getApplications();
  const [filterType, setFilterType] = useState(0);
  const [query, setQuery] = useState("");
  const [list, setList] = useState(applications);
  const [dateOrder, setDateOrder] = useState(null);
  console.log("applications", applications);
  console.log("list", list);
  useEffect(() => {
    console.log("effect worked");
    setList(applications || []);
  }, [applications]);

  useEffect(() => {
    let helperArr = applications;
    if (applications) {
      helperArr = [
        ...applications.filter(
          (el) => el.status_id === 2 || el.status_id === 3
        ),
        ...applications.filter(
          (el) => el.status_id !== 2 && el.status_id !== 3
        ),
      ];
    }

    if (filterType > 0) {
      helperArr = helperArr.filter((application) => {
        let appCopy = Object.assign({}, application);
        return appCopy.status_id === filterType;
      });
    } else if (filterType === 0) {
      helperArr = applications;
    }

    if (query !== "") {
      helperArr = helperArr.filter((application) => {
        const string = JSON.stringify(application).toLowerCase();
        return string.indexOf(query.toLowerCase()) > -1 ? true : false;
      });
    }
    if (dateOrder) {
      helperArr = helperArr.sort(sortByDate);
    }

    setList(helperArr);
  }, [filterType, query, dateOrder]);

  const sortByDate = (a, b) => {
    let x = "";
    x = a.created_at.split(",")[0].split("/");
    const dateA = new Date(+x[2], +x[1], +x[0]);
    x = b.created_at.split(",")[0].split("/");
    const dateB = new Date(+x[2], +x[1], +x[0]);

    if (dateOrder === "asc") {
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
    }

    if (dateOrder === "desc") {
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
    }
  };

  if (isApplicationsLoading) {
    return (
      <AdminLayout userData={userData} view="wnioski">
        {" "}
        <Loader />
      </AdminLayout>
    );
  }
  return (
    <AdminContext.Provider value={{ userData, list }}>
      <AdminLayout userData={userData} view="wnioski">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "30px 0",
          }}
        >
          <h1>Wnioski licencyjne</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select
              style={{ marginTop: 0, minWidth: "200px", fontSize: "13px" }}
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
        {list ? (
          <ApplicationsList dateOrder={dateOrder} setDateOrder={setDateOrder} />
        ) : (
          <p>Brak wniosków</p>
        )}
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

  return {
    props: {
      userData: data,
    },
  };
});

export default MainPage;
