import { useState, useEffect } from "react";
import styled from "styled-components";

import AddFile from "../molecules/add_file";

const Row = styled.div`
  padding-bottom: 16px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: ${({ cols }) => `repeat(${cols},300px)`};
  overflow-x: auto;
  width: 70vw;
`;

const AddFilesWrapper = ({ files, setFiles }) => {
  const [boxes, setBoxes] = useState([]);

  const addFile = (file) => {
    setFiles([...files, file]);
  };

  const deleteFile = (index) => {
    console.log("file deleted");
    const helperArr = files;
    helperArr.splice(index, 1);
    setFiles([...helperArr]);
    console.log(files);
  };

  const generateBoxes = () => {
    const arr = [];
    for (let i = 0; i < files.length + 1; i++) {
      arr.push(
        <AddFile
          key={i}
          deleteFile={deleteFile}
          addFile={addFile}
          file={files[i] ? files[i] : null}
          index={i}
        />
      );
    }
    setBoxes(arr);
  };

  useEffect(() => {
    generateBoxes();
  }, [files]);

  return <Row cols={files.length + 1}>{boxes}</Row>;
};

export default AddFilesWrapper;
