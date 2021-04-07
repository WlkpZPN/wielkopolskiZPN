import styled from "styled-components";
import { useState, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import AdminLayout from "../../../components/organisms/admin_layout";
import ClubApplication from "../../../components/organisms/club_application";
import ApplicationStatus from "../../../components/atoms/application_status";
import IconButton from "../../../components/atoms/IconButton";
import { makeid } from "../../../middleware/utils";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
import PrimaryButton from "../../../components/atoms/primary_button";
import Link from "next/link";
import Loader from "../../../components/atoms/loader";
import CorrectModal from "../../../components/molecules/correct_modal";
import RejectModal from "../../../components/molecules/reject_modal";
import Paragraph from "../../../components/atoms/paragraph";

import ErrorMessage from "../../../components/atoms/error_message";
import LicenseDecision from "../../../components/atoms/license_decision";
import LicenseButton from "../../../components/molecules/license_button";
import AddInvoice from "../../../components/molecules/add_invoice";
const Application = ({ authData, clubData, settings }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleReject, setvisibleReject] = useState(false);
  const [invoiceFiles, setInvoiceFiles] = useState();
  console.log(invoiceFiles);
  const handleFileDelete = () => {};
  const renderTopPanel = () => {
    switch (clubData.applications[0].statuses.id) {
      case 6:
        return (
          <>
            {" "}
            <Paragraph>Dodaj fakturę</Paragraph>{" "}
            <AddInvoice
              admin={true}
              clubData={clubData}
              file={invoiceFiles}
              addFile={setInvoiceFiles}
            />
            <ErrorMessage>
              {clubData.applications[0].invoice_required
                ? "UWAGA! Klub prosi o fakturę przed dokonaniem płatności"
                : null}
            </ErrorMessage>{" "}
          </>
        );
      case 7:
        return (
          <>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p>
                <Paragraph>Wystaw licencję</Paragraph>
                <AddInvoice
                  admin={true}
                  clubData={clubData}
                  file={invoiceFiles}
                  addFile={setInvoiceFiles}
                />
              </p>
              <LicenseDecision
                clubData={clubData}
                applicationID={clubData.applications[0].id}
                statusID={8}
                type="standard"
                reason=""
                description="Wydano licencje standardową"
                internalID={clubData.applications[0].internal_id}
              />
              <LicenseDecision
                clubData={clubData}
                statusID={10}
                applicationID={clubData.applications[0].id}
                type="nadzór"
                reason=""
                description="Wydano licencje z nadzorem"
                internalID={clubData.applications[0].internal_id}
              />
              <LicenseDecision
                clubData={null}
                statusID={9}
                applicationID={clubData.applications[0].id}
                type="odmowa"
                reason=""
                description="Odmowa wydania licencji"
                internalID={clubData.applications[0].internal_id}
              />
            </div>
          </>
        );
      case 9:
        return (
          <>
            {" "}
            <LicenseDecision
              clubData={null}
              statusID={9}
              applicationID={clubData.applications[0].id}
              type="niewydana"
              reason=""
              description="Licencja niewydana"
              internalID={clubData.applications[0].internal_id}
            />{" "}
          </>
        );
      case 8:
        return (
          <div style={{ display: "flex" }}>
            <div>
              <Paragraph>Licencja</Paragraph>
              <LicenseButton isAdmin={true} clubData={clubData} />
            </div>
            <div>
              <Paragraph>Faktura</Paragraph>
              <AddInvoice
                admin={true}
                clubData={clubData}
                file={invoiceFiles}
                addFile={setInvoiceFiles}
              />
            </div>
          </div>
        );
      case 10:
        return (
          <div style={{ display: "flex" }}>
            {" "}
            <div>
              <Paragraph>Licencja</Paragraph>
              <LicenseButton isAdmin={true} clubData={clubData} />
            </div>
            <div>
              <Paragraph>Faktura</Paragraph>
              <AddInvoice
                admin={true}
                clubData={clubData}
                file={invoiceFiles}
                addFile={setInvoiceFiles}
              />
            </div>
          </div>
        );
      case 11:
        return (
          <div style={{ display: "flex" }}>
            <div>
              <Paragraph>Licencja</Paragraph>
              <LicenseButton isAdmin={true} clubData={clubData} />
            </div>
            <div>
              <Paragraph>Faktura</Paragraph>
              <AddInvoice
                admin={true}
                clubData={clubData}
                file={invoiceFiles}
                addFile={setInvoiceFiles}
              />
            </div>
          </div>
        );
    }
  };

  const renderButtons = () => {
    switch (clubData.applications[0].statuses.id) {
      case 2:
      case 3:
      case 4:
        return (
          <div>
            <PrimaryButton
              color="successDark"
              hoverColor="success"
              style={{ margin: "0 6px" }}
              onClick={acceptApplication}
            >
              Zaakceptuj
            </PrimaryButton>
            <PrimaryButton
              hoverColor="warningDark"
              color="warning"
              style={{ margin: "0 6px" }}
              onClick={() => setVisible(true)}
            >
              Do poprawy
            </PrimaryButton>
            <PrimaryButton
              color="dangerDark"
              hoverColor="danger"
              style={{ margin: "0 6px" }}
              onClick={() => setvisibleReject(true)}
            >
              Odrzuć
            </PrimaryButton>
          </div>
        );

      case 6:
        return (
          <div>
            <PrimaryButton
              color="successDark"
              hoverColor="success"
              style={{ margin: "0 6px" }}
              onClick={markAsPaid}
            >
              Oznacz jako opłacony
            </PrimaryButton>

            <PrimaryButton
              color="dangerDark"
              hoverColor="danger"
              style={{ margin: "0 6px" }}
              onClick={() => setvisibleReject(true)}
            >
              Odrzuć
            </PrimaryButton>
          </div>
        );

      default:
        return;
    }
  };
  const acceptApplication = async () => {
    setLoading(true);

    //TO DO: api route for generate paynament link
    const amount =
      clubData.applications[0].youth_groups_possession ===
      "nie posiadamy zespołów"
        ? settings.application_fee + settings.no_possession_fee
        : settings.application_fee;
    try {
      // const newOrder = await axios.post("/api/payments/newOrder", {
      //   description: `Opłacenie wniosku licencyjnego ${clubData.applications[0].internal_id}`,
      //   email: clubData.email,
      //   amount: amount,
      //   applicationID: clubData.applications[0].id,
      //   firstName: clubData.name,
      //   phone: clubData.phone,
      // });

      // await axios.post("/api/mails/sendPayuLink", {
      //   link: newOrder.data.link,
      //   email: clubData.email,
      // });

      await axios.post("/api/applications/acceptApplication", {
        applicationID: clubData.applications[0].id,
        // link: newOrder.data.link,
        amount: amount,
      });
      router.replace(router.asPath);

      setLoading(false);
      toast.success("Wniosek zaakceptowany, wysłano link do płatności");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Nie udało się zaakceptować wniosku, spróbuj ponownie");
    }
  };

  const markAsPaid = async () => {
    try {
      setLoading(true);
      await axios.post("/api/applications/acceptPayment", {
        applicationID: clubData.applications[0].id,
      });

      setLoading(false);
      toast.success("Wniosek oznaczony jako opłacony");
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Nie udało się zaakceptować płatności,spróbuj ponownie");
    }
  };

  return (
    <AdminLayout view="wnioski" userData={authData}>
      <CorrectModal
        internalId={
          clubData.applications[0] ? clubData.applications[0].internal_id : ""
        }
        id={clubData.applications[0] ? clubData.applications[0].id : ""}
        visible={visible}
        setVisibile={setVisible}
      />

      <RejectModal
        internalID={
          clubData.applications[0] ? clubData.applications[0].internal_id : ""
        }
        applicationID={
          clubData.applications[0] ? clubData.applications[0].id : ""
        }
        visible={visibleReject}
        setVisible={setvisibleReject}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "32px 0",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex" }}>
          <span>
            <h1
              style={{
                marginRight: "32px",
                marginTop: "-3px",
                marginBottom: "20px",
              }}
            >
              Wniosek {clubData.applications[0].internal_id}
            </h1>
            <Link href="/admin">
              <IconButton>
                <ControllerFastBackward />
                Powrót
              </IconButton>
            </Link>
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "min-content",
            }}
          >
            <ApplicationStatus
              size="32px"
              status={clubData.applications[0].statuses.name}
            />
            <span style={{ marginLeft: "16px" }}>
              {clubData.applications[0].statuses.name}
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {renderButtons()}
          <PrimaryButton
            onClick={() =>
              router.push(
                `/admin/licencje/historia/${clubData.applications[0].id}`
              )
            }
            style={{ margin: "0 6px" }}
          >
            Historia zmian
          </PrimaryButton>
        </div>
      </div>
      <div style={{ marginBottom: "32px" }}>{renderTopPanel()}</div>
      {loading ? (
        <Loader />
      ) : (
        <ClubApplication
          show_buttons={false}
          completed={clubData.applications[0].statuses.id === 1 ? false : true}
          errors=""
          error_message=""
          clubData={clubData}
          readOnly={true}
          settings={settings}
        />
      )}
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  let clubData = await prisma.clubs.findUnique({
    where: {
      id: parseInt(context.params.application),
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

  const settings = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  });
  return {
    props: {
      authData: data,
      clubData: clubData,
      settings: settings,
    },
  };
});

export default Application;
