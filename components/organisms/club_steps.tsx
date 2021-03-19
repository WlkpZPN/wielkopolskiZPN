import styled from "styled-components";
import { useState, useEffect } from "react";
import HistoryIcon from "../atoms/history_icon";

const Row = styled.div`
  display: flex;
  align-items: center;

  & span {
    align-self: flex-start;
    margin-top: 25px;
  }
`;

const Wrapper = styled.div`
  margin: 32px 0;
`;

const ClubSteps = ({ status }) => {
  const renderStatus = () => {
    switch (status) {
      case "wnioskowany":
      case "zatwierdzony":
        return (
          <>
            <Row>
              <HistoryIcon state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon state="default" number={2} />
              <span>
                Akceptacja wniosku licencyjnego przez Wielkopolski ZPN <br />{" "}
                oraz link do płatności za wniosek licencyjny przesłany na maila
                klubu
              </span>
            </Row>
            <Row>
              <HistoryIcon state="default" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon state="default" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="default" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </>
        );
      case "zaakceptowany nieopłacony":
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Akceptacja wniosku licencyjnego przez Wielkopolski ZPN <br />{" "}
                oraz link do płatności za wniosek licencyjny przesłany na maila
                klubu
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
          </>
        );
      case "zaakceptowany opłacony":
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Akceptacja wniosku licencyjnego przez Wielkopolski ZPN <br />{" "}
                oraz link do płatności za wniosek licencyjny przesłany na maila
                klubu
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={3} />
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
          </>
        );
      case "do poprawy":
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="warning" number={2} />
              <span>
                Odrzucenie wniosku licencyjnego przez Wielkopolski ZPN
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
          </>
        );
      case "odrzucony":
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="error" number={2} />
              <span>
                Odrzucenie wniosku licencyjnego przez Wielkopolski ZPN
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
          </>
        );
      case "licencja wydana":
      case "licencja niewydana":
      case "licencja wydana z nadzorem":
      case "licencja cofnięta":
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={2} />
              <span>
                Akceptacja wniosku licencyjnego przez Wielkopolski ZPN <br />{" "}
                oraz link do płatności za wniosek licencyjny przesłany na maila
                klubu
              </span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={3} />
              <span>Dokonanie płatności przez klub</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="completed" number={4} />
              <span>Weryfikacja płatności przez Wielkopolski ZPN</span>
            </Row>
            <Row>
              <HistoryIcon hidden={true} state="completed" number={5} />
              <span>Decyzja Komisji Licencyjnej</span>
            </Row>
          </>
        );
      default:
        return (
          <>
            <Row>
              <HistoryIcon hidden={false} state="default" number={1} />
              <span>Złożenie wniosku licencyjnego.</span>
            </Row>
            <Row>
              <HistoryIcon hidden={false} state="default" number={2} />
              <span>
                Akceptacja wniosku licencyjnego przez Wielkopolski ZPN <br />{" "}
                oraz link do płatności za wniosek licencyjny przesłany na maila
                klubu
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
          </>
        );
    }
  };

  return renderStatus();
};

export default ClubSteps;
