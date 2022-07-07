import prisma from "../../../middleware/prisma";
import {
    createSeasons,
    getCurrentDate
} from "../../../middleware/utils";



export default (req, res) => {
    return new Promise(async (resolve) => {
        let promises = [];

        const applications = await prisma.applications.findMany();

        applications.forEach((application) => {


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
