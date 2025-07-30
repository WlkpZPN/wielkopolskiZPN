import prisma from '../../../middleware/prisma';
import axios from 'axios';
import { makeid } from '../../../middleware/utils';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany({
      select: {
        email: true,
      },
    });
    console.log(clubs.length);
    let i,
      chunk = 100;
    let promises = [];
    //console.log(clubs.slice(0, 5));
    for (i = 0; i < clubs.length; i += chunk) {
      const tmpClubs = clubs.slice(i, i + chunk);
      console.log(tmpClubs.length);
      promises.push(
        axios({
          method: 'POST',
          url: 'https://api.freshmail.com/rest/subscriber/addMultiple',
          headers: {
            Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
            'Content-Type': 'application/json',
          },
          data: {
            subscribers: tmpClubs,
            list: 'qhvvftn3og',
            state: 1,
          },
        }),
      );
    }

    Promise.all(promises)
      .then((respose) => {
        res.status(200);
        res.send('subsribers added');
      })
      .catch((error) => {
        console.log(error.response?.data);

        res.status(400).send(error);
      });

    return resolve();
  });
};
