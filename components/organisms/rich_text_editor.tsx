import React, { useRef, useEffect } from "react";
import styled from "styled-components";
// import SunEditor, { buttonList } from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import plugins from "suneditor/src/plugins";
// ------------------- dynamically adding library or module -------------------
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const Wrapper = styled.div`
  margin: 24px 0;
  margin-top: 6px;
  width: 100%;
`;
const RichTextEditor = ({ value, onChange }) => {
  const handleChange = (e) => {
    console.log(e);
  };

  const options = {
    buttonList: [
      [
        "undo",
        "redo",
        "font",
        "fontSize",
        "bold",
        "fontColor",
        "italic",
        "underline",
        "outdent",
        "indent",
        "align",
      ],
    ],
  };
  return (
    <Wrapper>
      <SunEditor
        setOptions={options}
        lang="pl"
        defaultValue={value}
        onChange={onChange}
        height="200"
      />
    </Wrapper>
  );
};

export default RichTextEditor;
