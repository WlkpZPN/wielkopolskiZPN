import prisma from "../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { sport_facility, clubData } = req.body;
    console.log(sport_facility, clubData);
    let new_object = {};

    if (sport_facility) {
      delete sport_facility.applications_attachments;
    }

    if (sport_facility?.id) {
      new_object = await prisma.futsal_facilities.update({
        where: {
          id: sport_facility.id,
        },
        data: {
          application_id: clubData.applications[0].id,
          ...sport_facility,
        },
      });

      console.log("futsal facility", sport_facility);
    } else if (!sport_facility?.id) {
      new_object = await prisma.futsal_facilities.create({
        data: {
          application_id: clubData.applications[0].id,
          ...sport_facility,
        },
      });
    }

    await prisma.$disconnect();

    res.json({
      facility: new_object,
    });
    return resolve();
  });
};
