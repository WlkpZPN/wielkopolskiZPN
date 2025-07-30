import prisma from '../../../middleware/prisma';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, field, url } = req.body;

    try {
      if (field == 'first') {
        await prisma.applications.update({
          where: {
            id: parseInt(applicationID),
          },
          data: {
            invoice_url: url,
          },
        });
      }

      if (field == 'second') {
        await prisma.applications.update({
          where: {
            id: parseInt(applicationID),
          },
          data: {
            invoice_url_2: url,
          },
        });
      }
      res.status(200);
      res.send('data updated');
      return resolve();
    } catch (e) {
      res.status(400);
      console.log('errror', e);
      res.send(e);
    }
  });
};
