import dynamic from "next/dynamic";
import CloseIcon from "../atoms/close_icon";
import { createRef } from "react";
import Image from "next/image";
import styled from "styled-components";
const Pdf: any = dynamic(() => import("react-to-pdf"), { ssr: false });
import PrimaryButton from "../atoms/primary_button";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";
const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  background: white;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  overflow: auto;

  max-height: 90vh;
`;

const Background = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
`;

const File = styled.div`
  width: 21cm;
  border: 1px solid ${({ theme }) => theme.primary};
  height: 29.7cm;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

// const Image = styled.img`
//   width: 250px;
// `;
const LicenseView = ({ visible, setVisible, text, application }) => {
  const ref = createRef();
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  return (
    <Background visible={visible} onClick={handleClose}>
      <Wrapper>
        <CloseIcon onClick={() => setVisible(false)} />{" "}
        <Pdf filename={`Licencja ${application?.internal_id}`} targetRef={ref}>
          {({ toPdf, targetRef }) => (
            <PrimaryButton style={{ marginBottom: "24px" }} onClick={toPdf}>
              Pobierz licencje
            </PrimaryButton>
          )}
        </Pdf>
        <File ref={ref}>
          <div>
            <Image width="200" height="85" src="/wzpn_logo.png" />
          </div>

          <p>
            {" "}
            Decyzja Komisji ds. Licencji Klubowych Wielkopolskiego Związku Piłki
            Nożnej z dnia 10.07.2020 roku w sprawie przyznania licencji nr dla
            klubu{" "}
          </p>
          <p>{text}</p>
        </File>
      </Wrapper>
    </Background>
  );
};

export default LicenseView;
