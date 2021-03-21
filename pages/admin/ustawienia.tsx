import AdminLayout from "../../components/organisms/admin_layout";
import styled from "styled-components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import prisma from "../../middleware/prisma";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import { validateNumber } from "../../middleware/validation";
import axios from "axios";

import Input from "../../components/atoms/input";
import Label from "../../components/atoms/form_label";
import PrimaryButton from "../../components/atoms/primary_button";
import ErrorMessage from "../../components/atoms/error_message";

const NumberInput = styled(Input)`
  max-width: 350px;
  margin-top: 6px;
`;

const Header = styled.h3`
  margin-top: 32px;
`;
const Ustawienia = ({ userData, settings }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [primaryAmount, setPrimaryAmount] = useState(
    settings.application_fee || 0
  );
  const [extraAmount, setExtraAmount] = useState(
    settings.no_possession_fee || 0
  );
  const [error, setError] = useState("");

  const setAmounts = async (e) => {
    e.preventDefault();

    if (!validateNumber(extraAmount).valid) {
      setError(
        "Proszę podać poprawną kwote, bez waluty oraz znaków specjlanych"
      );
      return;
    }

    if (!validateNumber(primaryAmount).valid) {
      setError(
        "Proszę podać poprawną kwote, bez waluty oraz znaków specjlanych"
      );
      return;
    }
    await axios.post("/api/settings/setAmounts", {
      primaryAmount,
      extraAmount,
    });
    toast.success("Pomyślnie zaaktualizowano opłaty licencyjne", {
      autoClose: 2000,
    });
  };
  return (
    <AdminLayout userData={userData} view="ustawienia">
      <h1>Ustawienia</h1>
      <ErrorMessage>{error}</ErrorMessage>
      <Header>Czas trwania procesu licencyjnego</Header>
      <form>
        <div style={{ display: "flex" }}>
          <Label
            style={{ width: "250px", marginRight: "16px", fontSize: "14px" }}
          >
            Rozpoczęcie wniosku licencyjnego{" "}
            <Input type="date" placeholder="data" />
          </Label>
          <Label style={{ width: "250px", fontSize: "14px" }}>
            zakończenie wniosku licencyjnego{" "}
            <Input type="date" placeholder="data" />
          </Label>
        </div>
      </form>
      <Header>Opłaty składane przez kluby</Header>
      <form
        onSubmit={setAmounts}
        onChange={() => {
          setError("");
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Label style={{ maxWidth: "400px" }}>
            Wysokość opłaty za złożenie wniosku licencyjnego
            <NumberInput
              type="number"
              value={primaryAmount}
              onChange={(e) => setPrimaryAmount(e.target.value)}
            />
          </Label>
          <Label style={{ maxWidth: "400px" }}>
            Wysokość opłaty za złożenie wniosku licencyjnego
            <NumberInput
              type="number"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
            />
          </Label>
        </div>
        <PrimaryButton
          style={{ marginTop: "-4px" }}
          hoverColor="success"
          color="successDark"
          type="submit"
        >
          Zapisz
        </PrimaryButton>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const { req, res } = context;

  const settings = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  });

  return {
    props: {
      userData: data,
      settings: {
        application_fee: parseFloat(settings.application_fee),
        no_possession_fee: parseFloat(settings.no_possession_fee),
        start_date: settings.start_date,
        end_date: settings.end_date,
      },
    },
  };
});

export default Ustawienia;
