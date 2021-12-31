import prisma from "../../../middleware/prisma";
import axios from "axios";
import { makeid } from "../../../middleware/utils";
export default (req, res) => {
    return new Promise(async (resolve) => {
        //move invoices_url from clubs to invoice_url in applications

        const clubs = await prisma.clubs.findMany();
        let clubsUrl = []
        let promises = [];
        clubs.forEach((club) => {
          clubsUrl.push({ url: club.invoice_url, clubId: club.id });
        });

        clubsUrl.forEach((club) =>{
          
          if(club.url && club.clubId) {
              
            promises.push(
                prisma.applications.updateMany({
                    where: {
                        club_id:parseInt(club.clubId),
                    },
                    data: {
                      invoice_url:club.url,
                    }
                })
            )
          }
        } );

        console.log(clubsUrl.length);
        
        Promise.all(promises)
      .then((ressponse) => {
        res.status(200);
        res.send(`invoices changed, count: ${promises.length} `);
      })
      .catch((error) => {
        console.log(error);

        res.status(400).send(error);
      });


        return resolve();
    });
};
