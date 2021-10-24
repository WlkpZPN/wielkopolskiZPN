import prisma from "../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { sport_facility, clubData } = req.body;

    let new_object = {};

    if (sport_facility) {
      delete sport_facility.applications_attachments;
    }

    new_object = await prisma.futsal_facilities.upsert({
      where: {
        id: sport_facility.id,
      },
      update: {
        application_id: clubData.applications[0].id,
        ...sport_facility,
      },
      create: {
        application_id: clubData.applications[0].id,
        ...sport_facility,
      },
    });

    console.log("futsal facility", sport_facility);

    await prisma.$disconnect();

    res.json({
      facility: new_object,
    });
    return resolve();
  });
};
