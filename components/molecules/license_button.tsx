import axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ApplicationStatus from '../atoms/application_status';
import OutlineButton from '../atoms/outline_button';
import { FilePdf } from '@styled-icons/fa-regular/FilePdf';
import CustomScroll from 'react-custom-scroll';

import PrimaryButton from '../atoms/primary_button';
import UndoLicense from './undo_license_modal';
import GiveSupervision from './give_supervision_modal';
import { generatePdf } from '../../middleware/generatePdf';
import NProgress from 'nprogress';
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
});

const FileIcon = styled(FilePdf)`
  width: 40px;
  color: black;
  margin: 0 auto;
`;

const Wrapper = styled.div<{ isAdmin?: string }>`
  border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-all;
  padding: 32px;
  margin-right: 16px;
  margin-top: ${({ isAdmin }) => isAdmin || '50px'};
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 340px;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  position: relative;
  z-index: 2;

  text-align: center;
  & button {
    width: 100%;
  }
`;

const Content = styled.span`
  margin: 12px 0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const StatusContainer = styled.div<{ isAdmin?: boolean }>`
  position: ${({ isAdmin }) => (isAdmin ? 'initial' : 'absolute')};
  /* top:${({ isAdmin }) => (isAdmin ? 'initial' : 'absolute')}; */
  top: 20px;
  left: 50%;
  align-self: center;
  transform: ${({ isAdmin }) => (isAdmin ? 'initial' : 'translateX(-50%)')};
`;

const ref = createRef();

const LicenseButton = ({
  clubData,
  isAdmin,
  authData = null,
  statusID = null,
  statusName = null,
}) => {
  const application = clubData.applications[0];
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const changeDecision = async () => {
    setLoading(true);
    try {
      await axios.post('/api/licences/setLicense', {
        applicationID: application.id,
        statusID: 8,
        userID: authData.id,
        description: 'Zmiana decyzji, licencja wydana',
      });

      setLoading(false);
      toast.success('Zmieniono decyzję,licencja wydana pomyślnie');
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Zmiana decyzji nie powiodła się,spróbuj ponownie', {
        autoClose: 2000,
      });
    }
  };
  const undoSupervision = async () => {
    setLoading(true);
    try {
      await axios.post('/api/licences/setLicense', {
        applicationID: application.id,
        statusID: 8,
        userID: authData.id,
        description: 'Cofnięto nadzór, wydano licencję standardową',
      });
      setLoading(false);
      toast.success('Pomyślnie wydano licencję standardową', {
        autoClose: 1500,
      });
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error('Cofnięcie nadzoru nie powiodło się, spróbuj ponownie', {
        autoClose: 1500,
      });
    }
  };

  const getLicence = async () => {
    NProgress.start();
    await generatePdf(clubData).finally(() => {
      NProgress.done();
    });
  };

  const renderButtons = () => {
    switch (statusID || application.statuses.id) {
      case 7:
      case 8:
      case 10:
        if (authData?.role === 'księgowa') {
          return (
            <OutlineButton
              style={{ padding: '8px', fontSize: '14px' }}
              onClick={() => getLicence()}
            >
              Pobierz
            </OutlineButton>
          );
        }
        if (authData?.role === 'nadzór finansów') {
          return (
            <PrimaryButton
              style={{ padding: '8px', fontSize: '14px' }}
              color="danger"
              hoverColor="dangerDark"
              onClick={() => setVisible1(true)}
            >
              Cofnij licencję
            </PrimaryButton>
          );
        }
        return (
          <>
            <OutlineButton
              style={{ padding: '8px', fontSize: '14px' }}
              onClick={() => getLicence()}
            >
              Pobierz
            </OutlineButton>
            {isAdmin && (
              <>
                {application.status_id === 8 ? (
                  <PrimaryButton
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      margin: '12px 0',
                    }}
                    onClick={() => setVisible2(true)}
                  >
                    Nadaj nadzór
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      margin: '12px 0',
                    }}
                    onClick={undoSupervision}
                  >
                    Zdejmij nadzór
                  </PrimaryButton>
                )}
                <PrimaryButton
                  style={{ padding: '8px', fontSize: '14px' }}
                  color="danger"
                  hoverColor="dangerDark"
                  onClick={() => setVisible1(true)}
                >
                  Cofnij licencję
                </PrimaryButton>
              </>
            )}{' '}
          </>
        );

      case 11:
        if (authData.role !== 'administrator') {
          return null;
        }
        return (
          <>
            <PrimaryButton onClick={changeDecision}>Zmień decyzję</PrimaryButton>{' '}
          </>
        );
    }
  };
  return (
    <Wrapper isAdmin={isAdmin}>
      <UndoLicense
        authData={authData}
        applicationID={application.id}
        internalID={application.internal_id}
        visible={visible1}
        setVisible={setVisible1}
      />
      <GiveSupervision
        authData={authData}
        visible={visible2}
        setVisible={setVisible2}
        applicationID={application.id}
        internalID={application.internal_id}
      />

      <StatusContainer isAdmin={isAdmin}>
        <ApplicationStatus
          size={isAdmin ? '40px' : '60px'}
          status={statusName || application.statuses.name}
        />
      </StatusContainer>
      {isAdmin ? null : <FileIcon />}
      <Content>licencja {application.internal_id}</Content>
      {renderButtons()}
    </Wrapper>
  );
};

export default LicenseButton;
