import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
import axios from "axios";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data, clubId } = req.body;

    await prisma.clubs.update({
      where: {
        id: clubId,
      },
      data: {
        ...data,
        updated_at: getCurrentDate(),
      },
    });

    await axios({
      method: "POST",
      url: "https://api.freshmail.com/rest/subscriber/addMultiple",
      headers: {
        Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        email: data.email,
        list: "qhvvftn3og",
        state: 1,
      },
    });
    res.send("data updated");
    return resolve();
  });
};
