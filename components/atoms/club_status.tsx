import styled from "styled-components";

const ClubStatus = styled.div<{size?: string, active?: boolean}>`
  border-radius: 50%;
  width: ${({ size }) => size || "21px"};
  height: ${({ size }) => size || "21px"};
  background-color: ${({ active }) => (active ? "#00A54C" : "#DA3131")};
`;

export default ClubStatus;
