import { useState, useEffect, useContext } from "react";
import uniqid from "uniqid";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import AddFile from "../molecules/add_file";
import AddFacilityFile from "../molecules/add_facility_file";
const Row = styled.div`
  padding-bottom: 16px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: ${({ cols }) => `repeat(${cols},260px)`};
  /* overflow-x: auto; */
  width: 70vw;
`;
//TO DO SIDE SCROLLING WITH VISIBLE TOOL TIP

const AddFacilityFilesWrapper = ({
  text = null,
  category,
  files,
  upload = false,
}) => {
  const [boxes, setBoxes] = useState([]);
  const context = useContext(ApplicationContext);
  const { currentObject, clubData, formData } = context;
  const fileData = files?.filter((file) => file.category === category);
  console.log(category, fileData);

  // check if this sport facility is saved
  if (formData.stepFour.sport_facilities[currentObject]?.id) {
    // sport facility is saved
  }
  const generateBoxes = () => {
    const arr = [];
    for (let i = 0; i < fileData.length + 1; i++) {
      arr.push(
        <AddFacilityFile
          upload={upload}
          category={category}
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

export default AddFacilityFilesWrapper;