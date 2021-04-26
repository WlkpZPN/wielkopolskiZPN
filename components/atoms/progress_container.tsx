import styled from "styled-components";
import { useEffect, useState } from "react";
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
`;

const ProgressContainer = ({ status, style }) => {
  const { data, isLoading } = getStats(status);
  // console.log(status, data);
  return <p></p>;
  // return (
  //   <Progress
  //     style={style}
  //     visible={data.percent > 0 ? true : false}
  //     number={data.allApplications}
  //     progress={data.percent}
  //   />
  // );
};

export default ProgressContainer;
