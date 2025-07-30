import AdminLayout from '../../components/organisms/admin_layout';
import styled from 'styled-components';

import { protectedAdminRoute } from '../../middleware/protectedAdmin';
import ProgressContainer from '../../components/atoms/progress_container';
import { stat } from '../../middleware/types/stats';
import FtpFileManager from '../../components/FtpFileManager';
const Header = styled.h2`
  margin: 48px 0 12px 0;
`;

const Title = styled.h1`
  margin-top: 24px;
  margin-bottom: 40px;
`;

const Statystyki = ({ userData }) => {
  return (
    <AdminLayout userData={userData} view="statystyki">
      <Title>FTP</Title>
      <FtpFileManager />
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  return {
    props: {
      userData: data,
    },
  };
});

export default Statystyki;
