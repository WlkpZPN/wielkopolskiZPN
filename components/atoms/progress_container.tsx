import styled from "styled-components";

import { getStats } from "../../middleware/swr";
const Progress = styled.div`
  background-color: #e6e6e6;
  width: 450px;
  height: 25px;
  border-radius: 5px;
  margin-top: 4px;
  position: relative;

  &:before {
    padding: 0px 4px;
    text-align: end;
    position: absolute;
    font-size: 13px;
    /* display: ${({ visible }) => (visible ? "block" : "none")}; */
    display: block;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #888888;
    left: 0;
    bottom: 0;
    height: 100%;
    width: ${({ progress, visible }) =>
      visible ? `${progress}%` : "max-content"};
    border-radius: 5px;
    content: "${({ progress, number, visible }) =>
      visible ? `${progress}% ${number} wniosków ` : `Brak wniosków`}";
  }

  &:hover {
    &:before {
      width: 100%;
      background: transparent;

      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      content: "${({ progress, number, visible }) =>
        visible ? `${progress}% ${number} wniosków ` : `Brak wniosków`}";
    }
  }
`;

const ProgressContainer = ({ status, style }) => {
  const { data, isLoading } = getStats(status);
  //console.log(status, data);

  if (isLoading) {
    return <p>pobieranie danych...</p>;
  }

  return (
    <Progress
      style={style}
      visible={data.percent > 0 ? true : false}
      number={Math.round(data.allApplications)}
      progress={Math.round(data.percent)}
    />
  );
};

export default ProgressContainer;
