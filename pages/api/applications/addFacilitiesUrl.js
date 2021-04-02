import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { facilityFilesUrls } = req.body;
    console.log("facilityFIlesIRLS", facilityFilesUrls);
    try {
      facilityFilesUrls.forEach(async (facility) => {
        await prisma.applications_attachments.createMany({
          data: facility.files.map((file) => {
            console.log("facilityID", facility);
            return {
              category: file.category,
              sport_facilities_id: parseInt(facility.id),
              name: file.name,
              filepath: `https://pdf.fra1.digitaloceanspaces.com/wnioski/${file.name}`,
            };
          }),
        });
      });

      res.send("urls added");
      return resolve();
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error);
      return resolve();
    }
  });
};
