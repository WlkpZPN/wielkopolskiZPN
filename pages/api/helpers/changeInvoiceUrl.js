import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const clubsUrl = await prisma.clubs.findMany({
      where: {
        invoice_url: {
          not: null,
        },
      },
      select: {
        invoice_url: true,
        id: true,
      },
    });
    let promises = [];

    clubsUrl.forEach((club) => {
      promises.push(
        prisma.applications.updateMany({
          where: {
            club_id: parseInt(club.id),
          },
          data: {
            invoice_url: club.invoice_url,
          },
        })
      );
    });

    Promise.all(promises)
      .then(() => {
        res.status(200);
        res.send("invoices updated!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
        res.send("updating invoices failed");
      });
  });
};
