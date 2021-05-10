import { useState, createContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import prisma from "../middleware/prisma";
import { toast } from "react-toastify";
//utils
import { getClubData } from "../middleware/swr";
import { protectedClientRoute } from "../middleware/protectedClient";

//components
import {
  getCurrentDate,
  renderAmount,
  renderMainAmount,
} from "../middleware/utils";
import ClientLayout from "../components/organisms/client_layout";

import ClubApplication from "../components/organisms/club_application";
import LastChange from "../components/molecules/last_change";
import Spinner from "../components/atoms/loader";
import Paragraph from "../components/atoms/paragraph";
import PrimaryButton from "../components/atoms/primary_button";
import ErrorMessage from "../components/atoms/error_message";
import ClubSteps from "../components/organisms/club_steps";
import LicenseButton from "../components/molecules/license_button";
import AddInvoice from "../components/molecules/add_invoice";
import Header from "../components/atoms/header";

const PaymentLink = styled.a`
  background: url("http://static.payu.com/pl/standard/partners/buttons/payu_account_button_long_03.png");
  display: block;
  background-repeat: no-repeat;
  color: transparent;
  background-size: contain;
  height: 40px;
  margin-bottom: 32px;
  cursor: pointer;
`;

export const ClubContext = createContext(null);

const Home = ({ clubData, authData, settings }) => {
  const [loading, setLoading] = useState(false);
  // const [clubData, setClubData] = useLocalStorage("clubData", club);

  const router = useRouter();

  const newApplication = async () => {
    setLoading(true);
    try {
      await axios.post("/api/applications/createApplication", {
        clubID: clubData.id,
        applicationID: clubData.applications[0].id,
        clubData,
      });
      setLoading(false);
      toast.info("Utworzono nowy wniosek");
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      toast.error("Nie udało utworzyć się nowego wniosku, spróbuj ponownie");
      setLoading(false);
    }
  };

  if (!clubData) {
    return <Spinner />;
  }
  const renderView = () => {
    if (
      new Date() < new Date(settings.start_date) &&
      clubData.applications[0].status_id < 6 &&
      settings.locked_sending
    ) {
      return (
        <>
          {" "}
          <Header>Proces licencyjny jeszcze sie nie rozpoaczął</Header>{" "}
          <Paragraph>
            Wnisoki licencyjne będze można składać w okresie od{" "}
            {settings.start_date} do {settings.end_date}
          </Paragraph>
        </>
      );
    }

    if (
      new Date() > new Date(settings.end_date) &&
      clubData.applications[0].status_id < 6 &&
      settings.locked_sending
    ) {
      return (
        <>
          {" "}
          <Header>Czas na składanie wniosków licencyjnych upłynął</Header>{" "}
          <Paragraph>
            Jeśli nie udało Ci się złożyć wniosku licencyjnego w terminie,
            skontaktuj się z Wielkopolskim ZPN
          </Paragraph>
        </>
      );
    }
    if (clubData.applications.length === 0) {
      // 1. tworzymy nowy wniosek

      return (
        <>
          <Header>Złóż wniosek licencyjny</Header>
          <ClubApplication
            show_buttons={true}
            errors=""
            error_message=""
            completed={false}
            readOnly={false}
            clubData={clubData}
            settings={settings}
          />
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
                  <Header>Złóż wniosek licencyjny</Header>
                </>
              )}

              <ClubApplication
                show_buttons={true}
                error_message=""
                completed={false}
                errors={""}
                readOnly={false}
                clubData={clubData}
                settings={settings}
              />
            </>
          );
        case 2:
          return (
            <>
              <Header color="success">
                Dziękujemy za złożenie wniosku licencyjnego.
              </Header>
              <Paragraph>
                Niezwłocznie po rozpatrzeniu wniosku otrzymasz informację czy
                wniosek został zaakceptowany przez Wielkopolski ZPN. Dalsze
                kroki procedury licencyjnej możesz zobaczyć poniżej:
              </Paragraph>
              <ClubSteps status="wnioskowany" />
              <ClubApplication
                show_buttons={false}
                error_message=""
                errors=""
                completed={true}
                readOnly={true}
                fileEdit={true}
                clubData={clubData}
                settings={settings}
              />
            </>
          );
        case 3:
          return (
            <>
              <Header color="success">
                Dziękujemy! Poczekaj na akceptację wniosku
              </Header>
              <Paragraph>
                Dziękujemy za złożenie wniosku liencyjnego. <br /> Najpóźniej 20
                kwietnia {new Date().getFullYear()} otrzymasz informację czy
                wniosek został zaakceptowany przez Wielkopolski ZPN. <br />{" "}
                Dalsze kroki procedury licencyjnej możesz zobaczyć poniżej{" "}
              </Paragraph>
              <ClubSteps status="wnioskowany" />
              <ClubApplication
                show_buttons={false}
                error_message=""
                errors=""
                completed={true}
                readOnly={true}
                clubData={clubData}
                settings={settings}
              />
            </>
          );
        case 4:
          return (
            <>
              <Header color="warning">Prosimy o wprowadzenie poprawek.</Header>

              <Paragraph>
                Wielkopolski ZPN skierował Twój wniosek do poprawy. <br />
                Zapoznaj się z poniższym uzasadnieniem oraz prosimy o
                wprowadzenie poprawek do wniosku
              </Paragraph>
              <ClubSteps status="do poprawy" />
              <ClubApplication
                show_buttons={true}
                error_message={clubData.applications[0].error_message}
                completed={true}
                errors={clubData.applications[0].error_step}
                readOnly={false}
                clubData={clubData}
                settings={settings}
              />
            </>
          );
        case 5:
          return (
            <>
              <Header color="danger">Twój wniosek został odrzucony</Header>
              <Paragraph>
                Wielkopolski ZPN odrzucił Twój wniosek. <br />
                Zapoznaj się z poniższym uzasadnieniem, aby ubiegać się o
                przyznanie licencji klubowej należy złożyć nowy wniosek
              </Paragraph>
              <p>Powód: </p>
              <ErrorMessage>
                {clubData.applications[0].reject_reason}
              </ErrorMessage>
              {loading ? (
                <Spinner />
              ) : (
                <PrimaryButton onClick={newApplication}>
                  Utwórz nowy wniosek
                </PrimaryButton>
              )}
            </>
          );

        case 6:
          return (
            <>
              <Header color="success">
                Twój wniosek został zaakceptowany. Prosimy o dokonanie
                płatności.
              </Header>
              <Paragraph style={{ marginBottom: "15px" }}>
                Wielkopolski ZPN zaakceptował Twój wniosek. <br />
                Prosimy dokonaj płatności używając poniższego linka
              </Paragraph>
              <p
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  margin: "15px 0",
                }}
              >
                {clubData.applications[0].youth_groups_possession ===
                  "nie posiadamy zespołów" ||
                clubData.applications[0].youth_groups_possession ===
                  "wystepujemy w rozgrywkach klasy A" ? (
                  <p>
                    {" "}
                    {renderMainAmount(
                      clubData.leauge,
                      settings,
                      clubData.applications[0].seasons
                    ) + parseFloat(renderAmount(clubData.leauge, settings))}
                  </p>
                ) : (
                  renderMainAmount(
                    clubData.leauge,
                    settings,
                    clubData.applications[0].seasons
                  )
                )}
                &nbsp;PLN
              </p>
              {clubData.applications[0].youth_groups_possession ===
              "nie posiadamy zespołów" ? (
                <p>
                  Opłata dodatkowa (klub nie posiada zespołów młodzieżowych):{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {renderAmount(clubData.leauge, settings)}
                  </span>
                </p>
              ) : null}
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "32px",
                  marginTop: "15px",
                }}
              >
                Opłata licencyjna:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {renderMainAmount(
                    clubData.leauge,
                    settings,
                    clubData.applications[0].seasons
                  )}{" "}
                  PLN
                </span>
              </p>
              <PaymentLink
                href={clubData.applications[0].payment_link}
                target="_blank"
              ></PaymentLink>
              <ClubSteps status="zaakceptowany nieopłacony" />
              <ClubApplication
                show_buttons={false}
                error_message=""
                errors=""
                completed={true}
                readOnly={true}
                clubData={clubData}
                settings={settings}
              />
            </>
          );
        case 7:
          return (
            <>
              {" "}
              <Header color="success">
                Płatność za wniosek została wykonana
              </Header>{" "}
              <Paragraph>
                Opłaciłeś swój wniosek. Poczekaj aż Wielkopolski ZPN zweryfikuje
                płatność.
              </Paragraph>
              <div>
                <AddInvoice admin={false} clubData={clubData} />
              </div>
              <ClubSteps status="zaakceptowany opłacony" />
              <ClubApplication
                show_buttons={false}
                error_message=""
                errors=""
                completed={true}
                readOnly={true}
                clubData={clubData}
                settings={settings}
              />
            </>
          );

        case 8:
        case 10:
          return (
            <>
              {" "}
              <Header color="success">
                Gratulacje! Twój klub posiada licencję Wielkopolskiego ZPN
              </Header>
              <Paragraph>
                Komisja Licencyjna Wielkopolskiego ZPN przyznała Twojemu klubowi
                licencję na sezon 2021 do IV Ligi
              </Paragraph>
              <div style={{ margin: "70px 0", display: "flex" }}>
                <AddInvoice admin={false} clubData={clubData} />
                <LicenseButton isAdmin={false} clubData={clubData} />
              </div>
              <ClubSteps status="licencja wydana" />
            </>
          );
        case 9:
          return (
            <>
              {" "}
              <Header>Licencja niewydana</Header>{" "}
              <Paragraph>
                Wielkopolski ZPN odrzucił Twoją licencję z następujących
                przyczyn:
              </Paragraph>
              <ErrorMessage>
                {clubData.applications[0].reject_reason}
              </ErrorMessage>
              <p></p>
            </>
          );

        case 11:
          return (
            <>
              {" "}
              <Header>Licencja cofnięta</Header>{" "}
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
    <ClubContext.Provider
      value={{
        setings: settings,
        history: clubData.applications[0].histories,
      }}
    >
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

    if (!data) {
      res.statusCode = 302;
      res.setHeader("Location", "/login");
      return {
        props: {},
      };
    }

    const settings = await prisma.settings.findUnique({
      where: {
        id: 1,
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
            histories: true,
            sport_facilities: {
              include: {
                applications_attachments: true,
              },
            },
          },
        },
      },
    });

    if (clubData?.applications.length === 0) {
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
              histories: true,
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

    return {
      props: {
        authData: data,
        clubData: clubData,
        settings: settings,
      },
    };
  }
);

export default Home;
