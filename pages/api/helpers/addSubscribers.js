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

      const response = await axios({
        method: "POST",
        url: "https://api.freshmail.com/rest/subscriber/addMultiple",
        headers: {
          Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          subscribers: clubs,
          list: "qhvvftn3og",
          state: 1,
        },
      });
      res.status(200);
      res.send("subsribers added");
    } catch (error) {
      console.log(error.response.data);
      res.status(400).send(error);
    }

    return resolve();
  });
};
