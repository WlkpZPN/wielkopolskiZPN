import { useState, createContext, useEffect } from "react";
import axios from "axios";
import prisma from "../middleware/prisma";
import { toast } from "react-toastify";
//components
import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";

import EditClubData from "../components/organisms/editClubData";
import Header from "../components/atoms/header";

const Dane = ({ authData, clubData }) => {
  //console.log(clubData);

  return (
    <ClientLayout clubData={clubData} view="Dane klubu">
      <Header>Dane klubu</Header>

      <EditClubData clubData={clubData} />
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    const clubData = await prisma.clubs.findUnique({
      where: {
        id: data.id,
      },
    });

    return {
      props: {
        authData: data,
        clubData: clubData,
      },
    };
  }
);

export default Dane;
