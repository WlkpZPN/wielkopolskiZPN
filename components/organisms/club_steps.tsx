import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import HistoryIcon from '../atoms/history_icon';
import { ClubContext } from '../../pages/index';
const Row = styled.div`
  display: flex;
  align-items: center;

  & span {
    align-self: flex-start;
    margin-top: 20px;
  }
`;

const Wrapper = styled.div`
  margin: 32px 0;
`;

const ClubSteps = ({ status }) => {
  const { history } = useContext(ClubContext);
  console.log(history.find((el) => el.status_id === 2 || el.status_id === 3));
  const renderLicenseDate = () => {
    switch (status) {
      case 'licencja wydana':
        return history.find((el) => el.status_id === 8)?.created_at;
      case 'licencja niewydana':
        return history.find((el) => el.status_id === 9)?.created_at;
      case 'licencja wydana z nadzorem':
        return history.find((el) => el.status_id === 10)?.created_at;
      case 'licencja cofnieta':
        return history.find((el) => el.status_id === 11)?.created_at;
    }
  };
  const renderStatus = () => {
    switch (status) {
      case 'wnioskowany':
      case 'zatwierdzony':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego. <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3).created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={2} />
              <span>
                Weryfikacja wniosku licencyjnego przez Wielkopolski ZPN <br /> oraz link do
                płatności za wniosek licencyjny przesłany na maila klubu
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
      case 'zaakceptowany nieopłacony':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego. <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Weryfikacja wniosku licencyjnego przez Wielkopolski ZPN <br /> oraz link do
                płatności za wniosek licencyjny przesłany na maila klubu <br />{' '}
                {history.find((el) => el.status_id === 6)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
      case 'zaakceptowany opłacony':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego. <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Weryfikacja wniosku licencyjnego przez Wielkopolski ZPN <br /> oraz link do
                płatności za wniosek licencyjny przesłany na maila klubu <br />
                {history.find((el) => el.status_id === 6)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={3} />
              <span>
                Dokonanie płatności przez klub <br />
                {history.find((el) => el.status_id === 7)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={4} />
              <span>
                Weryfikacja płatności przez Wielkopolski ZPN <br />{' '}
                {history.find((el) => el.status_id === 7)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
      case 'do poprawy':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego. <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="warning" number={2} />
              <span>Skierowanie wniosku licencyjnego do poprawy przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
      case 'odrzucony':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego. <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="error" number={2} />
              <span>Odrzucenie wniosku licencyjnego przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
      case 'licencja wydana':
      case 'licencja niewydana':
      case 'licencja wydana z nadzorem':
      case 'licencja cofnięta':
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>
                Złożenie wniosku licencyjnego.
                <br />
                {history.find((el) => el.status_id === 2 || el.status_id === 3)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Weryfikacja wniosku licencyjnego przez Wielkopolski ZPN <br /> oraz link do
                płatności za wniosek licencyjny przesłany na maila klubu
                <br /> {history.find((el) => el.status_id === 6)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={3} />
              <span>
                Dokonanie płatności przez klub <br />
                {history.find((el) => el.status_id === 7)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={4} />
              <span>
                Weryfikacja płatności przez Wielkopolski ZPN <br />{' '}
                {history.find((el) => el.status_id === 7)?.created_at}
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="completed" number={5} />
              <span>
                Decyzja Komisji Licencyjnej <br />
                {renderLicenseDate()}
              </span>
            </Row>
          </Wrapper>
        );
      default:
        return (
          <Wrapper>
            <Row>
              <HistoryIcon hidden={false} state="default" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={2} />
              <span>
                Weryfikacja wniosku licencyjnego przez Wielkopolski ZPN <br /> oraz link do
                płatności za wniosek licencyjny przesłany na maila klubu
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </Wrapper>
        );
    }
  };

  return renderStatus();
  //return <p></p>;
};

export default ClubSteps;
