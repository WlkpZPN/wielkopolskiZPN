import prisma from "../../../middleware/prisma";
import axios from "axios";
import { makeid } from "../../../middleware/utils";
export default (req, res) => {
    return new Promise(async (resolve) => {
        //move invoices_url from clubs to invoice_url in applications

        const clubs = await prisma.clubs.findMany();
        let clubsUrl = []
        let promisies = [];
        clubs.forEach((club) => clubsUrl.push({ url: club.invoice_url, clubId: club.id }));

        clubsUrl.forEach((club) =>{
            promises.push(
                prisma.applications.updateMany({
                    where: {
                        club_id:parseInt(club.id),
                    },
                    invoice_url:club.url,
                })
            )
        } );

        Promise.all(promises)
      .then((res) => {
        res.status(200);
        res.send("invoices changed");
      })
      .catch((error) => {
        console.log(error.response?.data);

        res.status(400).send(error);
      });


        return resolve();
    });
};
