import prisma from "../../../middleware/prisma";
import {
    createSeasons,
    getCurrentDate
} from "../../../middleware/utils";



export default (req, res) => {
    return new Promise(async (resolve) => {
        let promises = [];

        const applications = await prisma.applications.findMany(
            {

                include: {
                    sport_facilities: true,
                    applications_attachments: true,
                    histories: true,
                }
            }

        );

        applications.forEach((application) => {

            const statusID = application.histories.find(history => history.status_id == 10 || history.status_id == 8).status_id;
            promises.push(prisma.applications.update({
                where: {
                    id: application.id,
                },
                data: {
                    status_id: statusID || 1,
                }
            }));

        })

        Promise.all(promises)
            .then(async (response) => {
                res.send("licenses fixed");
            })
            .catch((err) => {
                console.log(err.response?.data || err);
                res.status(400);
                res.json({
                    type: "error",
                    message: err,
                });
            });

        await prisma.$disconnect();
    });
};
