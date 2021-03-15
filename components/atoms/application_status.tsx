import styled from "styled-components";
import License from "../../public/license.svg";

const StyledLicense = styled(License)`
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  fill: ${({ color }) => color};
`;

const Application = styled.div`
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  background: ${({ color }) => color};
  border-radius: 50%;
`;
const ApplicationStatus = ({ status, size = "21px" }) => {
  console.log(typeof status);
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

  console.log(setColor());

  if (status.includes("licencja")) {
    return <StyledLicense size={size} color={setColor()} />;
  }

  return <Application size={size} color={setColor()} />;
};

export default ApplicationStatus;
