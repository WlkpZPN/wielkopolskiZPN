import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
import { renderToStaticMarkup } from "react-dom/server";
import pdf from "pdf-creator-node";
import fs from "fs";

const html = fs.readFileSync(
  "../../../middleware/licenseTemplate.html",
  "utf8"
);

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };
    // const options = {
    //   format: "A4",
    //   orientation: "portrait",
    //   border: "10mm",
    //   footer: {
    //     height: "10mm",
    //   },
    //   type: "pdf",
    //   timeout: 30000,
    // };
    // const html = renderToStaticMarkup("<h1> Testowy PDF</h1>");
    // const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(400).send(err);
    //   }

    //   res.send(buffer);
    //   return resolve(buffer);
    // });
    // const { applicationID, statusID, reason, description } = req.body;
    // console.log(req.body);
    // await prisma.applications.update({
    //   where: {
    //     id: parseInt(applicationID),
    //   },
    //   data: {
    //     status_id: parseInt(statusID),
    //     reject_reason: reason || "",
    //   },
    // });

    // await prisma.histories.create({
    //   data: {
    //     application_id: parseInt(applicationID),
    //     status_id: statusID,
    //     description: description,
    //     created_at: getCurrentDate(),
    //   },
    // });

    // res.send("licencja wydana");
    res.send("test");
    return resolve();
  });
};
