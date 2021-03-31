import { useState, useEffect, useContext } from "react";
import uniqid from "uniqid";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import AddFile from "../molecules/add_file";

const Row = styled.div`
  padding-bottom: 16px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: ${({ cols }) => `repeat(${cols},300px)`};
  overflow-x: auto;
  width: 70vw;
`;

const AddFilesWrapper = ({ fileData, setFiles, deleteFile }) => {
  const [boxes, setBoxes] = useState([]);

  const addFile = (id, file) => {
    //console.log(file);
    setFiles(id, file);
  };

  const generateBoxes = () => {
    const arr = [];
    for (let i = 0; i < fileData.length + 1; i++) {
      arr.push(
        <AddFile
          addFile={addFile}
          key={uniqid()}
          handleDelete={deleteFile}
          file={fileData[i] ? fileData[i] : null}
        />
      );
    }
    //console.log(arr);

    return arr;
  };

  return <Row cols={fileData.length + 1}>{generateBoxes()}</Row>;
};

export default AddFilesWrapper;
