import prisma from "../../../middleware/prisma";
import transporter from "../../../middleware/transporter";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients } = req.body;
    let clubs = [];
    //1. check the rule for clubs
    //2. get all clubs that met conditions
    switch (recipients) {
      case "aktywne":
        clubs = await prisma.clubs.findMany({
          where: {
            active: true,
          },
        });
        break;
      case "niekatywne":
        clubs = await prisma.clubs.findMany({
          where: {
            active: false,
          },
        });
        break;
      case "nierozpoczęte":
        clubs = await prisma.clubs.findMany({
          where: {
            applications: {
              none: {},
            },
          },
        });
        break;
      case "zatwierdzone":
        // clubs = await prisma.clubs.findMany({
        //     where: {
        //         applications: {
        //             id:
        //         }
        //     }
        // })
        break;
      case "wszystkie":
        clubs = await prisma.clubs.findMany();
        break;
    }
    //aktywne
    //nieaktywne
    //nierozpoczęte
    //zatwierdzone
    //wszystkie

    //3. send maild to all that clubs
    await prisma.$disconnect();
  });
};
