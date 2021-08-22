import prisma from "../../../middleware/prisma";
import {
  getCurrentDate,
  convertStepsToString,
} from "../../../middleware/utils";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, description, steps, userID, data } = req.body;
    try {
      await prisma.applications.update({
        where: {
          id: applicationID,
        },
        data: {
          status_id: 4,
          error_step: steps,
          error_message: description,
        },
      });

      await prisma.histories.create({
        data: {
          application_id: applicationID,
          description: `Skierowanie do poprawy, powód: ${description}. \n Kroki do poprawy: ${convertStepsToString(
            data
          )}`,
          status_id: 4,
          created_at: getCurrentDate(),
          user_id: parseInt(userID),
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send("corrections added");
    return resolve();
  });
};
