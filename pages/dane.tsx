import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import prisma from '../middleware/prisma';
import { toast } from 'react-toastify';
//components
import { getClubData } from '../middleware/swr';
import { protectedClientRoute } from '../middleware/protectedClient';
import ClientLayout from '../components/organisms/client_layout';
import Loader from '../components/atoms/loader';
import EditClubData from '../components/organisms/editClubData';
import Header from '../components/atoms/header';

const Dane = ({ authData }) => {
  const { clubData, isError, isLoading } = getClubData(authData.id);
  //console.log(clubData);
  if (isLoading) {
    return (
      <ClientLayout
        clubData={authData}
        children
        view="Dane klubu"
      ></ClientLayout>
    );
  }
  return (
    <ClientLayout clubData={clubData} view="Dane klubu">
      <Header>Dane klubu</Header>

      <EditClubData clubData={clubData} />
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    return {
      props: {
        authData: data,
      },
    };
  }
);

export default Dane;
