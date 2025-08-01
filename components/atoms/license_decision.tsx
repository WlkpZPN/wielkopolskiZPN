import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loader from './loader';
import ApplicationStatus from './application_status';
import PrimaryButton from './primary_button';
import RejectLicense from '../molecules/reject_license_modal';
import { generatePdf } from '../../middleware/generatePdf';
import { getCurrentDate } from '../../middleware/utils';
import GiveSupervisionModal from '../molecules/give_supervision_modal';
const Wrapper = styled.div`
  display: grid;
  border-radius: 4px;
  grid-template-rows: auto min-content auto;

  align-items: center;
  justify-items: center;
  padding: 48px 24px;
  background-color: #f2f3f4;
  width: 260px;
  height: 340px;
  box-shadow: 0px 0px 2px #00000029;
  margin-right: 16px;
`;
const Text = styled.p`
  margin: 16px 0;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
const LicenseDecision = ({
  type,
  applicationID,
  statusID,
  reason,
  internalID,
  description,
  clubData,
  authData,
  refreshState,
}) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const IssueLicense = async () => {
    setLoading(true);
    try {
      await axios.post('/api/licences/setLicense', {
        applicationID,
        statusID: 8,
        reason: reason || '',
        description,
        userID: authData.id,
      });
      if (statusID === 8 || statusID === 10) {
        //3. send email and generate license as attachment
        setTimeout(() => {
          axios.post('/api/mails/sendLicense', {
            clubData: clubData,
          });
        }, 500);
      }
      setLoading(false);
      refreshState();
      toast.success('Licencja wydana pomyślnie');
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error('Coś poszło nie tak,proszę spróbować później');
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'standard':
        return (
          <Wrapper>
            <ApplicationStatus size="40px" status="licencja wydana" />
            <Text>Wydaj licencję standardową</Text>
            <PrimaryButton onClick={IssueLicense} color="successDark" hoverColor="success">
              Licencja standard
            </PrimaryButton>
          </Wrapper>
        );
      case 'nadzór':
        return (
          <Wrapper>
            <ApplicationStatus size="40px" status="licencja wydana z nadzorem" />
            <GiveSupervisionModal
              authData={authData}
              internalID={internalID}
              applicationID={applicationID}
              visible={visible2}
              setVisible={setVisible2}
            />
            <Text> Wydaj licencję z nadzorem</Text>
            <PrimaryButton
              onClick={() => {
                setVisible2(true);
              }}
              color="successDark"
              hoverColor="success"
            >
              Licencja z nadzorem
            </PrimaryButton>
          </Wrapper>
        );
      case 'odmowa':
        return (
          <Wrapper>
            <RejectLicense
              visible={visible}
              setVisible={setVisible}
              internalID={internalID}
              applicationID={applicationID}
            />

            <ApplicationStatus size="40px" status="licencja niewydana" />
            <Text> Odmów wydania licencji</Text>
            <PrimaryButton onClick={() => setVisible(true)} hoverColor="dangerDark" color="danger">
              Odmowa licencji
            </PrimaryButton>
          </Wrapper>
        );
      case 'cofnij':
        return (
          <Wrapper>
            <RejectLicense
              visible={visible}
              setVisible={setVisible}
              internalID={internalID}
              applicationID={applicationID}
            />
            <GiveSupervisionModal
              authData={authData}
              internalID={internalID}
              applicationID={applicationID}
              visible={visible2}
              setVisible={setVisible2}
            />
            <ApplicationStatus size="40px" status="licencja niewydana" />
            <Text> Licencja cofnięta</Text>
            <PrimaryButton onClick={() => setVisible(true)} hoverColor="dangerDark" color="danger">
              Zmień decyzję
            </PrimaryButton>
          </Wrapper>
        );
      case 'niewydana':
        return (
          <Wrapper>
            <RejectLicense
              visible={visible}
              setVisible={setVisible}
              internalID={internalID}
              applicationID={applicationID}
            />
            <GiveSupervisionModal
              authData={authData}
              internalID={internalID}
              applicationID={applicationID}
              visible={visible2}
              setVisible={setVisible2}
            />
            <ApplicationStatus size="40px" status="licencja niewydana" />
            <Text> Licencja niewydana</Text>
            <PrimaryButton onClick={() => setVisible(true)}>Zmień decyzję</PrimaryButton>
          </Wrapper>
        );

      default:
        return null;
    }
  };

  return renderIcon();
};

export default LicenseDecision;
