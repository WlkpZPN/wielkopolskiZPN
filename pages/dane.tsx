import { useState, createContext, useEffect } from "react";
import axios from "axios";
import prisma from "../middleware/prisma";
import { toast } from "react-toastify";
//components
import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";
import AddFilesWrapper from "../components/organisms/add_files_wrapper";
import FormTemplate from "../components/atoms/form_template";
import Fieldset from "../components/atoms/fieldset";
import FormRow from "../components/atoms/form_row";
import Input from "../components/atoms/input";
import Select from "../components/atoms/form_select";
import OutlineButton from "../components/atoms/outline_button";
import PrimaryButton from "../components/atoms/primary_button";
import Label from "../components/atoms/form_label";
import ErrorMessage from "../components/atoms/error_message";
import StyledSpinner from "../components/atoms/loader";
import EditClubData from "../components/organisms/editClubData";
import { extractAddressData, convertAddressData } from "../middleware/utils";
import {
  validateEmail,
  validatePhone,
  validateText,
  validateZipCode,
} from "../middleware/validation";
const Dane = ({ authData, clubData }) => {
  //console.log(clubData);

  return (
    <ClientLayout clubData={clubData} view="Dane klubu">
      <h1>Dane klubu</h1>

      <EditClubData clubData={clubData} />
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    const clubData = await prisma.clubs.findUnique({
      where: {
        id: data.id,
      },
    });

    return {
      props: {
        authData: data,
        clubData: clubData,
      },
    };
  }
);

export default Dane;
