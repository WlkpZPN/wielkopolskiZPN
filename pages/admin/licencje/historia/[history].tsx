import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import prisma from "../../../../middleware/prisma";
import { protectedAdminRoute } from "../../../../middleware/protectedAdmin";
import AdminLayout from "../../../../components/organisms/admin_layout";
import IconButton from "../../../../components/atoms/IconButton";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
import HistoryIcon from "../../../../components/atoms/history_icon";
import Link from "next/link";

const Row = styled.div`
  display: flex;
  align-items: center;

  & span {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const History = ({ authData, applicationData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const history = applicationData.histories;
  console.log(history);

  const renderHistory = () => {
    let helperArr = [];
    history.forEach((item, index, array) => {
      const user = `${item.users.name || item.users.email},${
        item.users.roles.name
      }`;
      switch (item.status_id) {
        case 4:
          helperArr.push(
            <Row>
              <HistoryIcon
                hidden={index === array.length - 1}
                key={index}
                number={index}
                state="warning"
              />
              <span>
                {item.description}
                <br /> {item.created_at} <br /> {user || ""}
              </span>
            </Row>
          );
          break;
        case 5:
          helperArr.push(
            <Row>
              <HistoryIcon
                hidden={index === array.length - 1}
                key={index}
                number={index}
                state="error"
              />
              <span>
                {item.description}
                <br /> {item.created_at}
                <br /> {user || ""}
              </span>
            </Row>
          );
          break;
        default:
          helperArr.push(
            <Row>
              <HistoryIcon
                hidden={index === array.length - 1}
                key={index}
                number={1}
                state="completed"
              />
              <span>
                {item.description}
                <br /> {item.created_at}
                <br /> {user || ""}
              </span>
            </Row>
          );
          break;
      }
    });

    return helperArr;
  };
  return (
    <AdminLayout view="wnioski" userData={authData}>
      <div
        style={{
          display: "flex",
          margin: "32px 0",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
          style={{
            marginRight: "32px",
            marginTop: "-6px",
            marginBottom: "4px",
          }}
        >
          Historia zmian {applicationData.internal_id}
        </h1>
        <Link href={`/admin/licencje/${applicationData.clubs.id}`}>
          <IconButton>
            <ControllerFastBackward />
            Powrót
          </IconButton>
        </Link>
      </div>

      <div>{renderHistory()}</div>
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const applicationData = await prisma.applications.findUnique({
    where: {
      id: parseInt(context.params.history),
    },
    include: {
      histories: {
        orderBy: {
          id: "asc",
        },
        include: {
          users: {
            include: {
              roles: true,
            },
          },
        },
      },
      clubs: true,
    },
  });
  return {
    props: {
      applicationData: applicationData,
      authData: data,
    },
  };
});

export default History;
