import prisma from "../../../middleware/prisma";
import {
    createSeasons,
    getCurrentDate
} from "../../../middleware/utils";



export default (req, res) => {
    return new Promise(async (resolve) => {
        let promises = [];
        const currentYear = new Date().getFullYear();
        const applications = await prisma.applications.findMany();

        applications.forEach((application) => {
            if (application.seasons) {
                const seasons = application.seasons;
                const endYear = seasons.slice(-4);

                if (endYear <= currentYear && application.status_id >= 8) {
                    promises.push(prisma.applications.update({
                        where: {
                            id: application.id,
                        },
                        data: {
                            is_new_season: true,
                        }
                    }));
                }
            }



        })



        await Promise.all(promises)
            .then(async (response) => {
                res.send("new season fixed");
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
        return resolve();
    });
};
