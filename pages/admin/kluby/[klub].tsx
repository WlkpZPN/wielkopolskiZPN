import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import { useRouter } from "next/router";
import Link from "next/link";
import { ControllerFastBackward } from "@styled-icons/entypo/ControllerFastBackward";
//components
import AdminLayout from "../../../components/organisms/admin_layout";
import IconButton from "../../../components/atoms/IconButton";
import ClubStatus from "../../../components/atoms/club_status";
import EditClubData from "../../../components/organisms/editClubData";
import PrimaryButton from "../../../components/atoms/primary_button";
import LastChange from "../../../components/molecules/last_change";
import Spinner from "../../../components/atoms/loader";
//functions

const User = ({ clubData, authData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState("");
  const markDebt = () => {
    const newDebt = !clubData.debt;
    setLoading("debt");
    axios
      .post("/api/clubs/changeDebt", {
        clubId: clubData.id,
        debt: newDebt,
      })
      .then((res) => {
        console.log(res);
        setLoading("");
        if (newDebt) {
          toast.success(
            `Klub ${clubData.internal_id} został oznaczony jako zadłużony`
          );
        } else {
          toast.success(
            `Usunięto zadłużenie dla klubu ${clubData.internal_id}`
          );
        }

        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
        setLoading("");
      });
  };

  const changeActive = () => {
    const newActive = !clubData.active;
    setLoading("active");
    axios
      .post("/api/clubs/changeActive", {
        clubId: clubData.id,
        active: newActive,
      })
      .then((res) => {
        setLoading("");
        console.log(res);
        toast.success('Status zmieniony na "nieaktywny"');
        router.replace(router.asPath);
      })
      .catch((err) => {
        setLoading("");
        console.log(err);
      });
  };

  const deleteClub = async () => {
    setLoading("deleting");

    try {
      await axios.post("/api/clubs/deleteClub", {
        clubID: clubData.id,
      });
      setLoading("");
      toast.warn("Klub usunięty");
      router.replace("/admin/kluby");
    } catch (error) {
      console.log(error);
      setLoading("");
      toast.error("Usuwanie klubu nie powiodło się,spróbuj ponownie");
    }
  };

  return (
    <AdminLayout userData={authData} view="kluby">
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ marginRight: "32px" }}>Klub {clubData.internal_id}</h1>
          <ClubStatus size="32px" active={clubData.active} />{" "}
          <span style={{ marginLeft: "16px" }}>
            {clubData.active ? "aktywny" : "nieaktywny"}
          </span>
        </div>

        {authData.id !== 5 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            <PrimaryButton
              style={{ margin: "0 6px" }}
              color="danger"
              hoverColor="dangerDark"
            >
              {loading === "deleting" ? (
                <Spinner style={{ height: "16px", color: "white" }} />
              ) : (
                "Usuń"
              )}
            </PrimaryButton>
            <PrimaryButton
              style={{ margin: "0 6px" }}
              color={clubData.active ? "danger" : "primary"}
              hoverColor={clubData.active ? "danger" : "primaryLight"}
              onClick={changeActive}
            >
              {loading === "active" ? (
                <Spinner style={{ height: "16px", color: "white" }} />
              ) : clubData.active ? (
                "Oznacz jako nieaktywny"
              ) : (
                "Oznacz jako aktywny"
              )}
            </PrimaryButton>

            <PrimaryButton
              style={{ margin: "0 6px" }}
              color={clubData.debt ? "danger" : "primary"}
              hoverColor={clubData.active ? "danger" : "primaryLight"}
              onClick={markDebt}
            >
              {loading === "debt" ? (
                <Spinner style={{ height: "16px", color: "white" }} />
              ) : clubData.debt ? (
                "Usuń zadłużenie"
              ) : (
                "Oznacz jako zadłużony"
              )}
            </PrimaryButton>
          </div>
        )}
      </div>
      <Link href="/admin/kluby">
        <IconButton>
          <ControllerFastBackward />
          Powrót
        </IconButton>
      </Link>
      <LastChange>{clubData.updated_at}</LastChange>
      <EditClubData clubData={clubData} isAdmin={true} />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const clubData = await prisma.clubs.findUnique({
    where: {
      id: parseInt(context.params.klub),
    },
  });
  return {
    props: {
      authData: data,
      clubData: clubData,
    },
  };
});

export default User;
