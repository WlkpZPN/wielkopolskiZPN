import prisma from "../../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { leauge, setForAll } = req.body;
    let promises = [];
    if (setForAll) {

      try {

       //1. ustawic we wszysktich aplikacjach sttus zakonczony
       await prisma.applications.updateMany({
         data: {
           status_id:12,
         }
       });
      res.status(200);
      res.send('new season started');

      } catch(e) {
        res.status(400);
        res.send(e);
        console.log(e);
        return resolve();
      }
    } else {

      await prisma.applications.updateMany({
          where:{
            leauge:leauge,
          },
          data: {
            status_id:12,
          }
      });
      res.status(200);
      res.send('new season started');
    }
    return resolve();
  });
};
