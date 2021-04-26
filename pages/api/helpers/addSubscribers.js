import prisma from "../../../middleware/prisma";
import axios from "axios";
import { makeid } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const clubs = await prisma.clubs.findMany({
        select: {
          email: true,
        },
      });
      console.log(clubs);

      const response = await axios({
        method: "POST",
        url: "https://api.freshmail.com/rest/subscriber/addMultiple",
        headers: {
          Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          subscribers: [
            { email: "hondakkia@gmail.com" },
            { email: "aleksanderfranczak99@gmail.com" },
          ],
          list: makeid(10),
        },
      });
    } catch (error) {
      console.log(error.response.data);
      res.status(400).send(error);
    }

    return resolve();
  });
};
