import styled, { keyframes } from "styled-components";
import { Spinner } from "@styled-icons/evil/Spinner";

const rotate = keyframes`
    from{
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Loader = styled(Spinner)`
  fill: ${(props) => props.theme.primary};
  width: ${({ width }) => (width ? width : "100px")};
  animation: ${rotate} 1.4s infinite linear;
`;

export default Loader;
