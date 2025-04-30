import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import prisma from '../../../middleware/prisma';
import { protectedAdminRoute } from '../../../middleware/protectedAdmin';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ControllerFastBackward } from '@styled-icons/entypo/ControllerFastBackward';
//components
import AdminLayout from '../../../components/organisms/admin_layout';
import IconButton from '../../../components/atoms/IconButton';
import Spinner from '../../../components/atoms/loader';
import AddNewClub from '../../../components/organisms/add_new_club';
//functions

const NewClub = ({ authData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState('');

  return (
    <AdminLayout userData={authData} view="kluby">
      {' '}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h1 style={{ marginRight: '32px', marginBottom: '6px' }}>
            Dodaj nowy klub
          </h1>
        </div>
      </div>
      <Link href="/admin/kluby">
        <IconButton>
          <ControllerFastBackward />
          Powrót
        </IconButton>
      </Link>
      <AddNewClub />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  return {
    props: {
      authData: data,
    },
  };
});

export default NewClub;
