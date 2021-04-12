import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { facilityFilesUrls, facilityID, applicationID } = req.body;

    try {
      const dataToInsert = facilityFilesUrls.map((file) => {
        return {
          sport_facilities_id: parseInt(facilityID),
          filepath: file.filepath,
          category: file.category,
          name: file.name,
        };
      });

      await prisma.applications_attachments.createMany({
        data: dataToInsert,
      });

      // facilityFilesUrls.forEach(async (facility) => {
      //   await prisma.applications_attachments.createMany({
      //     data: facility.files.map((file) => {
      //       console.log("facilityID", facility);
      //       return {
      //         category: file.category,
      //         sport_facilities_id: parseInt(facilityID),
      //         name: file.name,
      //         filepath: file.filepath,
      //       };
      //     }),
      //   });
      // });
      const all_facilities = await prisma.sport_facilities.findMany({
        where: {
          application_id: parseInt(applicationID),
        },
        include: {
          applications_attachments: true,
        },
      });
      res.json({
        all_facilities: all_facilities,
      });
      return resolve();
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error);
      return resolve();
    }
  });
};
