import { useState, createContext } from "react";
import styled from "styled-components";
import prisma from "../middleware/prisma";

//utils
import { protectedClientRoute } from "../middleware/protectedClient";
import { useLocalStorage } from "../middleware/hooks";
//components
import { getCurrentDate } from "../middleware/utils";
import ClientLayout from "../components/organisms/client_layout";
import StepBox from "../components/atoms/step_box";
import ClubApplication from "../components/organisms/club_application";
import LastChange from "../components/molecules/last_change";
import Spinner from "../components/atoms/loader";
const Header = styled.h1`
  margin-bottom: 16px;
  padding: 16px 0;
  color: ${({ theme }) => theme.dark};
  font-weight: 600;
  font-size: 32px;
`;

export const ClubContext = createContext(null);

const Home = ({ authData, clubData }) => {
  // const [clubData, setClubData] = useLocalStorage("clubData", club);

  if (!clubData) {
    return <Spinner />;
  }
  const renderView = () => {
    if (clubData.applications.length === 0) {
      // 1. tworzymy nowy wniosek
      console.log("to sie nigdy nie wykona");
      return (
        <>
          <Header>Złóż wniosek licencyjny</Header>
          <ClubApplication readOnly={false} clubData={clubData} />
        </>
      );
    }

    if (clubData.applications.length > 0) {
      switch (clubData.applications[0].status_id) {
        case 1:
          return (
            <>
              {clubData.applications[0].updated_at ? (
                <>
                  {" "}
                  <Header>Wersja robocza - wniosek liencyjny</Header>
                  <LastChange>{clubData.applications[0].updated_at}</LastChange>
                </>
              ) : (
                <>
                  {" "}
                  <Header>Złóż wniosek liencyjny</Header>
                </>
              )}

              <ClubApplication readOnly={false} clubData={clubData} />
            </>
          );
      }

      //  sprawdzamy status
      //STATUSY
      //1. ROBOCZY: pobieramy dane z clubData i najnowszego wniosku,renderujemy formularz | strona 20
      //2. WNIOSKOWANY PRZEZ KLUB: pobieramy dane z najnowszego wniosku, wniosek nieedytowalny | strona 10
      //3. ZATWIERDZONY: formularz bez możliwosci edycji, renderujemy komponent ze statusem  | strona 10
      //4. DO POPRAWY: formularz edytowalny,zaznaczamy gdzie są błędy | strona 16
      //5. ODRZUCONY: formularz nieedytowalny, wyświetlamy przycisk "nowy formularz" | strona 19
      //6. ZAAKCEPTOWANY NIEOPŁACONY: formularz bez edycji, w komponencie ze statusem wyświetlamy info o płatności + link | strona 11,strona 12
      //7. ZAAKCEPTOWANY OPŁACONY: formularz bez edycji, wyświetlamy 'oczekiwanie na decyzje wzpn' | strona 12
      //8. LICENCJA WYDANA/NIEWYDANA: wyświetlamy info o aktualnej licencji | strona 17
    }
  };

  return (
    <ClubContext.Provider value={clubData}>
      <ClientLayout clubData={clubData} view="Wniosek licencyjny">
        {renderView()}
      </ClientLayout>
    </ClubContext.Provider>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    const { req, res } = context;
    let clubData;
    console.log("data", data);
    if (!data) {
      res.statusCode = 302;
      res.setHeader("Location", "/login");
      return {
        props: {},
      };
    }
    clubData = await prisma.clubs.findUnique({
      where: {
        id: data.id,
      },
      include: {
        applications: {
          include: {
            statuses: true,
            applications_attachments: true,
            sport_facilities: {
              include: {
                applications_attachments: true,
              },
            },
          },
        },
      },
    });

    if (clubData.applications.length === 0) {
      // create application with empty data
      // create one sport facility with empty data

      // await prisma.applications.deleteMany({
      //   where: {
      //     club_id: clubData.id,
      //   },
      // });

      const newApplication = await prisma.applications.create({
        data: {
          club_id: clubData.id,
          status_id: 1,
          created_at: getCurrentDate(),
        },
      });

      await prisma.applications.update({
        where: {
          id: newApplication.id,
        },
        data: {
          internal_id: `W/${new Date().getFullYear()}/${newApplication.id.toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 3,
              useGrouping: false,
            }
          )}`,
        },
      });
      clubData = await prisma.clubs.findUnique({
        where: {
          id: data.id,
        },
        include: {
          applications: {
            include: {
              statuses: true,
              applications_attachments: true,
              sport_facilities: {
                include: {
                  applications_attachments: true,
                },
              },
            },
          },
        },
      });
    }

    // console.log("clubData", clubData);
    return {
      props: {
        authData: data,
        clubData: clubData,
      },
    };
  }
);

export default Home;
