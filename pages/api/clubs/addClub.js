import prisma from '../../../middleware/prisma';
import { getInternalId } from '../../../middleware/utils';
import axios from 'axios';
import generator from 'generate-password';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data } = req.body;
    const club = await prisma.clubs.create({
      data: {
        ...data,
      },
    });

    await prisma.clubs.update({
      where: {
        id: club.id,
      },
      data: {
        internal_id: getInternalId(club.id, false),
        password: generator.generate({
          length: 8,
          numbers: true,
        }),
      },
    });

    // await axios({
    //   method: "POST",
    //   url: "https://api.freshmail.com/rest/subscriber/addMultiple",
    //   headers: {
    //     Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     email: data.email,
    //     list: "qhvvftn3og",
    //     state: 1,
    //   },
    // });
    await res.send({ id: club.id });
    return resolve();
  });
};
