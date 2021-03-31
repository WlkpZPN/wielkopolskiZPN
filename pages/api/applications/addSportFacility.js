import prisma from "../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { sport_facility, clubData } = req.body;
    //console.log(sport_facility, clubData);

    // check if klub's facilities has facility with given name
    // const clubFacilities = await prisma.sport_facilities.findMany({
    //     where:{
    //         application_id:
    //     }
    // })
    // add sport facility
    // console.log("id", sport_facility.id);
    if (sport_facility) {
      delete sport_facility.applications_attachments;
    }

    if (sport_facility?.id) {
      await prisma.sport_facilities.update({
        where: {
          id: sport_facility.id,
        },
        data: {
          application_id: clubData.applications[0].id,
          ...sport_facility,
        },
      });
    } else if (!sport_facility?.id) {
      await prisma.sport_facilities.create({
        data: {
          application_id: clubData.applications[0].id,
          ...sport_facility,
        },
      });
    }

    await prisma.$disconnect();

    res.send("facility added");
    return resolve();
  });
};
