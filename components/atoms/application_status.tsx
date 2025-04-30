import styled from "styled-components";
import License from "../../public/license.svg";
import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { Certificate } from "@styled-icons/fa-solid/Certificate";
const StyledLicense = styled(Certificate)`
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  color: ${({ color }) => color};
`;

const User = styled(UserSecret)`
  color: ${({ theme }) => theme.primary};
`;

const SupervisiorLicense = styled.div<{size?: string}>`
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  position: relative;
  color: ${({ color }) => color};
  img {
    width: 100%;
    height: 100%;
  }
  & svg:nth-child(2) {
    width: 80%;
    position: absolute;
    top: -30%;
    right: -25%;
  }
`;

const Application = styled.div<{size?: string}>`
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  background: ${({ color }) => color};
  border-radius: 50%;
`;
const ApplicationStatus = ({ status, size = "21px" }) => {
  const setColor = () => {
    switch (status.trim()) {
      case "roboczy":
        return "#B5B5B5";
      case "wnioskowany":
        return "#2185D0";
      case "zatwierdzony":
        return "#0056A5";
      case "do poprawy":
        return "#D3E500";
      case "odrzucony":
      case "licencja niewydana":
        return "#D10101";
      case "zaakceptowany nieopłacony":
      case "licencja cofnięta":
        return "#CBA400";
      case "zaakceptowany opłacony":
      case "licencja wydana":
      case "licencja wydana z nadzorem":
        return "#00A54C";
      default:
        return "#2185D0";
    }
  };

  if (status === "licencja wydana z nadzorem") {
    return (
      <SupervisiorLicense color="#00A54C" size={size}>
        <StyledLicense size={size} color="#00A54C" />
        <User />
      </SupervisiorLicense>
    );
  }

  if (status.includes("licencja")) {
    return <StyledLicense size={size} color={setColor()} />;
  }

  return <Application size={size} color={setColor()} />;
};

export default ApplicationStatus;
