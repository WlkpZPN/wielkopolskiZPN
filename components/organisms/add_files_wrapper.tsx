import { useState, useEffect, useContext } from "react";
import uniqid from "uniqid";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import AddFile from "../molecules/add_file";

const Row = styled.div`
  padding-bottom: 16px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: ${({ cols }) => `repeat(4,260px)`};
  overflow-x: auto;
  max-width: 60vw;
`;
//TO DO SIDE SCROLLING WITH VISIBLE TOOL TIP

const AddFilesWrapper = ({ text = null, category, id }) => {
  const [boxes, setBoxes] = useState([]);
  const context = useContext(ApplicationContext);
  const fileData =
    context.clubData.applications[0].applications_attachments.filter(
      (file) => file.category === category
    );

  const generateBoxes = () => {
    const arr = [];
    for (let i = 0; i < fileData.length + 1; i++) {
      arr.push(
        <AddFile
          category={category}
          id={id}
          text={text}
          key={uniqid()}
          // addFile={addFile}
          // handleDelete={deleteFile}
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
