import { useState } from "react";
import styled from "styled-components";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
const Wrapper = styled.div`
  margin: 16px 0;
`;

const MoreInfo = styled.div`
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  padding-left: 8px;
`;

const Paragraph = styled.p`
  color: white;
  font-weight: 600;
  padding: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  background: ${({ theme }) => theme.primaryLight};
  &:hover {
    cursor: pointer;
  }
  & svg {
    width: 25px;
    transform: ${({ expanded }) => (expanded ? "rotate(180deg)" : "rotate(0)")};

    margin-right: 8px;
    transition: all 0.2s;
  }
`;

const ObjectInfo = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper expanded={expanded}>
      <Paragraph onClick={() => setExpanded(!expanded)} expanded={expanded}>
        <DownArrow />
        Informacje dot. powyższego obiektu sportowego
      </Paragraph>
      <MoreInfo expanded={expanded}>{children}</MoreInfo>
    </Wrapper>
  );
};

export default ObjectInfo;
