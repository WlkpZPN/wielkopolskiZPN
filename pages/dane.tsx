import { useState, useRef } from "react";
import axios from "axios";
//components
import ClientLayout from "../components/organisms/client_layout";
import AddFilesWrapper from "../components/organisms/add_files_wrapper";

const Dane = () => {
  return (
    <ClientLayout view="Dane klubu">
      <h1>Dane klubu</h1>
      <AddFilesWrapper />
    </ClientLayout>
  );
};

export default Dane;
