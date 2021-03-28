import AdminLayout from "../../../components/organisms/admin_layout";
import styled from "styled-components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import prisma from "../../../middleware/prisma";
import { protectedAdminRoute } from "../../../middleware/protectedAdmin";
import { validateNumber } from "../../../middleware/validation";
import axios from "axios";
import Loader from "../../../components/atoms/loader";
import Input from "../../../components/atoms/input";
import Label from "../../../components/atoms/form_label";
import PrimaryButton from "../../../components/atoms/primary_button";
import ErrorMessage from "../../../components/atoms/error_message";
import QuestionList from "../../../components/organisms/questions_list";
import GroupMessages from "../../../components/organisms/group_messages";
import NumericInput from "../../../components/atoms/numeric_input";
const NumberInput = styled(NumericInput)`
  max-width: 250px;
  margin-top: 6px;
`;

const Header = styled.h3`
  margin-top: 32px;
`;
const Ustawienia = ({ userData, settings, questions, messages }) => {
  console.log(settings);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(settings.start_date || new Date());
  const [endDate, setEndDate] = useState(settings.end_date || new Date());
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

  const setDates = async (e) => {
    e.preventDefault();
    setLoading(true);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setError("Data rozpoczęcia nie może być mniejsza od daty zakończenia");
      return;
    }

    await axios.post("/api/settings/setDates", {
      startDate,
      endDate,
    });

    setLoading(false);
    toast.success("Pomyślnie zaktualizowano czas trwania procesu licencyjnego");
  };
  return (
    <AdminLayout userData={userData} view="ustawienia">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Ustawienia</h1>
        {loading && <Loader />}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      <Header>Czas trwania procesu licencyjnego</Header>
      <form
        onChange={() => {
          setError("");
        }}
      >
        <div style={{ display: "flex" }}>
          <Label
            style={{ width: "250px", marginRight: "16px", fontSize: "14px" }}
          >
            Rozpoczęcie wniosku licencyjnego{" "}
            <Input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              placeholder="data"
            />
          </Label>
          <Label style={{ width: "250px", fontSize: "14px" }}>
            zakończenie wniosku licencyjnego{" "}
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="data"
            />
          </Label>
        </div>
        <PrimaryButton
          hoverColor="success"
          color="successDark"
          onClick={setDates}
          type="submit"
        >
          Zapisz
        </PrimaryButton>
      </form>
      <Header>Opłaty składane przez kluby</Header>
      <form
        onSubmit={setAmounts}
        onChange={() => {
          setError("");
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Label style={{ maxWidth: "400px", marginRight: "16px" }}>
            Wysokość opłaty za złożenie wniosku licencyjnego
            <NumberInput
              suffix="PLN"
              placeholder="0"
              value={primaryAmount}
              onChange={(e) => setPrimaryAmount(e.target.value)}
            />
          </Label>
          <Label style={{ maxWidth: "400px" }}>
            Wysokość opłaty za złożenie wniosku licencyjnego
            <NumberInput
              suffix="PLN"
              placeholder="0"
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
      <Header style={{ marginTop: "64px" }}> Wiadomości grupowe </Header>
      <GroupMessages messages={messages} />
      <Header>Pytania do działu FAQ</Header>
      <QuestionList questions={questions} />
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

  const questions = await prisma.frequently_asked_questions.findMany();
  const messages = await prisma.messages.findMany();
  return {
    props: {
      userData: data,
      settings: settings,
      questions: questions,
      messages,
    },
  };
});

export default Ustawienia;
