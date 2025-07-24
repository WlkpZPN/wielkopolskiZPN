import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, category, fileName, facilityID, filePath } = req.body;

    if (facilityID) {
      // adding file to sport facilities
      await prisma.applications_attachments.create({
        data: {
          sport_facilities_id: parseInt(facilityID),
          name: fileName,
          category: category,
          filepath: filePath,
        },
      });
    } else if (applicationID) {
      // adding file to applications
      console.log("adding urls");
      await prisma.applications_attachments.create({
        data: {
          application_id: parseInt(applicationID),
          name: fileName,
          category: category,
          filepath: filePath,
        },
      });
    }

    res.send("ok");
  });
};
