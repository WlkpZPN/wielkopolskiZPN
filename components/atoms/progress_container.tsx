import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [progress, setProgress] = useState(0);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const getData = async () => {
      if (status === 0) {
        const result = await axios.post(
          "/api/applications/getApplicationStats",
          {
            getUncompleted: true,
          }
        );
        console.log(result.data);
        const { allApplications, applications } = result.data;
        const percent =
          (Math.round((applications / allApplications) * 100) / 100) * 100;
        console.log(percent);
        setProgress(percent);
        setNumber(applications);
      } else if (status === 2) {
        const result = await axios.post(
          "/api/applications/getApplicationStats",
          {
            statusID: status,
          }
        );

        const result2 = await axios.post(
          "/api/applications/getApplicationStats",
          {
            statusID: 3,
          }
        );
        const { allApplications, applications } = result.data;
        const { applications2 } = result2.data;
        const percent =
          (Math.round((applications + applications2 / allApplications) * 100) /
            100) *
          100;
        console.log(percent);
        setProgress(percent);
        setNumber(applications + applications2);
      } else {
        const result = await axios.post(
          "/api/applications/getApplicationStats",
          {
            statusID: status,
          }
        );

        const { allApplications, applications } = result.data;
        const percent =
          (Math.round((applications / allApplications) * 100) / 100) * 100;
        console.log(percent);
        setProgress(parseInt(`${percent}`));
        setNumber(applications);
      }
    };

    getData();
  }, [status]);
  return (
    <Progress
      style={style}
      visible={progress > 0 ? true : false}
      number={number}
      progress={progress}
    />
  );
};

export default ProgressContainer;
