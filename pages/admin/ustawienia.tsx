import AdminLayout from "../../components/organisms/admin_layout";
import React, { useState } from "react";
import prisma from "../../middleware/prisma";
import { protectedAdminRoute } from "../../middleware/protectedAdmin";
import Label from "../../components/atoms/form_label";
import Input from "../../components/atoms/input";

const Ustawienia = ({ userData, submission_duration }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <AdminLayout userData={userData} view="ustawienia">
      <h1>Ustawienia</h1>

      <h3>Czas trwania procesu licencyjnego</h3>

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
    </AdminLayout>
  );
};

export const getServerSideProps = protectedAdminRoute(async (context, data) => {
  const { req, res } = context;

  const submission_duration = await prisma.submission_duration.findMany();
  return {
    props: {
      userData: data,
      submission_duration: submission_duration,
    },
  };
});

export default Ustawienia;
