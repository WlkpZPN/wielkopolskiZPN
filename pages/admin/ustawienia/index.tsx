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
import Fieldset from "../../../components/atoms/fieldset";
import AmountInput from "../../../components/atoms/amount_input";
import LockButton from "../../../components/molecules/lock_sending_button";
const Header = styled.h3`
  margin-top: 32px;
`;

const AmountRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & label {
    margin-left: 6px;
    & > span {
      min-height: 40px;
    }
  }
`;
const Ustawienia = ({ userData, settings, questions, messages }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(settings.start_date || new Date());
  const [endDate, setEndDate] = useState(settings.end_date || new Date());
  const [primaryAmount, setPrimaryAmount] = useState(
    parseFloat(settings.iv_application_fee).toFixed(2) || 0
  );

  const [vFee, setVFee] = useState(settings.v_application_fee || 0);
  const [abFee, setAbFee] = useState(settings.ab_application_fee || 0);
  const [youngFee, setYoungFee] = useState(settings.young_application_fee || 0);
  const [extraAmount, setExtraAmount] = useState(
    parseFloat(settings.iv_possession_fee).toFixed(2) || 0
  );

  const [extraAmount2, setExtraAmount2] = useState(
    parseFloat(settings.v_possession_fee).toFixed(2)
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
    if (!validateNumber(vFee).valid) {
      setError(
        "Proszę podać poprawną kwote, bez waluty oraz znaków specjlanych"
      );
      return;
    }
    if (!validateNumber(abFee).valid) {
      setError(
        "Proszę podać poprawną kwote, bez waluty oraz znaków specjlanych"
      );
      return;
    }

    if (!validateNumber(youngFee).valid) {
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

    if (!validateNumber(extraAmount2).valid) {
      setError(
        "Proszę podać poprawną kwote, bez waluty oraz znaków specjlanych"
      );
      return;
    }
    setLoading(true);
    await axios.post("/api/settings/setAmounts", {
      primaryAmount,
      extraAmount,
      extraAmount2,
      abFee,
      youngFee,
      vFee,
    });
    setLoading(false);
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

  const formatPrimaryValue = (e) => {
    setPrimaryAmount(parseFloat(e.target.value).toFixed(2));
  };
  const formatExtraValue = (e) => {
    setExtraAmount(parseFloat(e.target.value).toFixed(2));
  };
  const formatExtraValue2 = (e) => {
    setExtraAmount2(parseFloat(e.target.value).toFixed(2));
  };
  return (
    <AdminLayout userData={userData} view="ustawienia">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <>
          <h1 style={{ margin: "40px 0" }}>Ustawienia</h1>
          {loading && <Loader />}
        </>
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
              disabled={userData.role !== "administrator"}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              placeholder="data"
            />
          </Label>
          <Label style={{ width: "250px", fontSize: "14px" }}>
            zakończenie wniosku licencyjnego{" "}
            <Input
              disabled={userData.role !== "administrator"}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="data"
            />
          </Label>
        </div>
        {userData.role === "administrator" && (
          <LockButton locked={settings.locked_sending} />
        )}

        <PrimaryButton
          disabled={userData.id !== 1}
          hoverColor="success"
          color="successDark"
          onClick={setDates}
          type="submit"
        >
          Zapisz
        </PrimaryButton>
      </form>
      <Header>Opłaty składane przez kluby</Header>
      <Fieldset
        style={{ margin: 0, padding: 0 }}
        disabled={userData.role !== "administrator"}
      >
        <form
          onSubmit={setAmounts}
          onChange={() => {
            setError("");
          }}
        >
          <AmountRow>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Label style={{ maxWidth: "400px" }}>
                <span>
                  Wysokość opłaty za złożenie wniosku licencyjnego w lidze IV
                </span>
                <AmountInput
                  style={{ paddingRight: "24px" }}
                  placeholder="0"
                  onBlur={formatPrimaryValue}
                  value={primaryAmount}
                  onChange={(e) => setPrimaryAmount(e.target.value)}
                />
              </Label>
              <Label style={{ maxWidth: "400px" }}>
                <span>
                  Wysokość opłaty za złożenie wniosku licencyjnego w lidze V i
                  klasie okręgowej
                </span>
                <AmountInput
                  style={{ paddingRight: "24px" }}
                  placeholder="0"
                  onBlur={(e) => setVFee(parseFloat(e.target.value).toFixed(2))}
                  value={vFee}
                  onChange={(e) => setVFee(e.target.value)}
                />
              </Label>
              <Label style={{ maxWidth: "400px" }}>
                <span>
                  Wysokość opłaty za złożenie wniosku licencyjnego w klasie A i
                  B
                </span>
                <AmountInput
                  style={{ paddingRight: "24px" }}
                  placeholder="0"
                  onBlur={(e) =>
                    setAbFee(parseFloat(e.target.value).toFixed(2))
                  }
                  value={abFee}
                  onChange={(e) => setAbFee(e.target.value)}
                />
              </Label>
              <Label style={{ maxWidth: "400px" }}>
                <span>
                  Wysokość opłaty za złożenie wniosku licencyjnego w klasie
                  młodzieżowej
                </span>
                <AmountInput
                  style={{ paddingRight: "24px" }}
                  placeholder="0"
                  onBlur={(e) =>
                    setYoungFee(parseFloat(e.target.value).toFixed(2))
                  }
                  value={youngFee}
                  onChange={(e) => setYoungFee(e.target.value)}
                />
              </Label>
            </div>

            <Label style={{ maxWidth: "400px" }}>
              <span>
                Wysokość opłaty dodatkowej za nieposiadanie własnych zespołów
                młodzieżowych dla IV ligi
              </span>
              <AmountInput
                style={{ paddingRight: "24px" }}
                placeholder="0"
                onBlur={formatExtraValue}
                value={extraAmount}
                onChange={(e) => setExtraAmount(e.target.value)}
              />
            </Label>
            <Label style={{ maxWidth: "400px", marginRight: "16px" }}>
              <span>
                {" "}
                Wysokość opłaty dodatkowej za nieposiadanie własnych zespołów
                młodzieżowych dla V ligi oraz klasy okręgowej
              </span>
              <AmountInput
                style={{ paddingRight: "24px" }}
                placeholder="0"
                onBlur={formatExtraValue2}
                value={extraAmount2}
                onChange={(e) => setExtraAmount2(e.target.value)}
              />
            </Label>
          </AmountRow>
          <PrimaryButton
            style={{ marginTop: "8px" }}
            hoverColor="success"
            color="successDark"
            type="submit"
          >
            Zapisz
          </PrimaryButton>
        </form>
      </Fieldset>

      <Header style={{ marginTop: "64px" }}> Wiadomości grupowe </Header>
      <GroupMessages userData={userData} messages={messages} />
      <Header>Pytania do działu FAQ</Header>
      <QuestionList userData={userData} questions={questions} />
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
