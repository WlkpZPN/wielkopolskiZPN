import styled from "styled-components";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import AdminLayout from "../../../components/organisms/admin_layout";
import ClubApplication from "../../../components/organisms/club_application";
import ApplicationStatus from "../../../components/atoms/application_status";
import IconButton from "../../../components/atoms/IconButton";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
import Link from "next/link";
const Application = ({ authData, clubData }) => {
  console.log(clubData);
  return (
    <AdminLayout view="wnioski" userData={authData}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ marginRight: "32px" }}>
          Wniosek {clubData.applications[0].internal_id}
        </h1>
        <ApplicationStatus
          size="32px"
          status={clubData.applications[0].statuses.name}
        />
        <span style={{ marginLeft: "16px" }}>
          {clubData.applications[0].statuses.name}
        </span>
      </div>
      <Link href="/admin">
        <IconButton>
          <ControllerFastBackward />
          Powrót
        </IconButton>
      </Link>
      <ClubApplication clubData={clubData} readOnly={true} />
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
          sport_facilities: {
            include: {
              applications_attachments: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      authData: data,
      clubData: clubData,
    },
  };
});

export default Application;
