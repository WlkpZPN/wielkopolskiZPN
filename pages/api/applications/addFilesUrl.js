import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, fileNames } = req.body;
    const { krs_documents, agreement_documents } = fileNames;
    try {
      if (krs_documents.length > 0) {
        await prisma.applications_attachments.createMany({
          data: krs_documents.map((doc) => {
            console.log("doc", doc);
            return {
              category: "krs_documents",
              application_id: parseInt(applicationID),
              filepath: `https://pdf.fra1.digitaloceanspaces.com/wnioski/${doc}`,
              name: doc,
            };
          }),
        });
      }

      if (agreement_documents.length > 0) {
        await prisma.applications_attachments.createMany({
          data: agreement_documents.map((doc) => {
            return {
              category: "agreement_documents",
              application_id: parseInt(applicationID),
              filepath: `https://pdf.fra1.digitaloceanspaces.com/wnioski/${doc}`,
              name: doc,
            };
          }),
        });
      }

      res.send("URLs uploaded ");
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error);
      return resolve();
    }
  });
};
