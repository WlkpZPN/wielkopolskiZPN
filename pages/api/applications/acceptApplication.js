import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, description, link, amount, userID } = req.body;
    try {
      await prisma.applications.update({
        where: {
          id: applicationID,
        },
        data: {
          status_id: 6,
          payment_link: link,
          amount: amount,
        },
      });

      await prisma.histories.create({
        data: {
          application_id: applicationID,
          created_at: getCurrentDate(),
          description:
            "Akceptacja wniosku licencyjnego przez Wielkopolski ZPN oraz link do płatności za wniosek licencyjny przesłany na maila Klubu",
          status_id: 6,
          user_id: parseInt(userID),
        },
      });
    } catch (err) {
      console.log("błąd", err?.response?.data);
      res.status(400);
      res.json(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send("application accepted");
    return resolve();
  });
};
