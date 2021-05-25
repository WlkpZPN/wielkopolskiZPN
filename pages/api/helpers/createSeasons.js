import prisma from "../../../middleware/prisma";
import { createSeasons } from "../../../middleware/utils";

// asign 1 or 2 to "number_of_seasons" variable

// assign createSeasons func to "seasons"

// 1. klub w zmiennej seasons przechowuje tekst - dodajemy 1/2 do zmiennej "number_of_seasons"
// 2. klub w zmiennej seasons przechowuje 1/2 - zmieniamy na tekst i dodajemy do "number_of_seasons" 1/2
// 3. klub ma status status roboczy i nie ustawił sezonu - ustawiamy na 1 domyślnie
// 4. klub  ma pusty sezon i number_of_seasons ale wysłał wniosek - ustawiamy number_of_seasons na 1 i season 1

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const allApplications = await prisma.applications.findMany({
      include: {
        clubs: true,
      },
    });
    // console.log("application", allApplications[0]);
    const promises = [];
    allApplications.forEach(async (app) => {
      if (app.seasons == "1" || app.seasons == "2") {
        // 2
        promises.push(
          prisma.applications.update({
            where: {
              id: parseInt(app.id),
            },
            data: {
              seasons: createSeasons(app.seasons),
              number_of_seasons: app.seasons,
            },
          })
        );
        return;
      } else if (
        app.seasons?.length > 1 &&
        (app.number_of_seasons !== "1" || app.number_of_seasons !== "2")
      ) {
        // 1
        promises.push(
          prisma.applications.update({
            where: {
              id: parseInt(app.id),
            },
            data: {
              number_of_seasons:
                app.seasons.match(/\//g)?.length === 1 ? "1" : "2",
            },
          })
        );
        return;
      } else if (app.status_id == 1 && app?.seasons?.length === 1) {
        // 3
        promises.push(
          prisma.applications.update({
            where: {
              id: parseInt(app.id),
            },
            data: {
              number_of_seasons: app.seasons,
            },
          })
        );
        return;
      } else if (app.status > 1 && (!app.seasons || !app.number_of_seasons)) {
        // 4
        promises.push(
          prisma.applications.update({
            where: {
              id: parseInt(app.id),
            },
            data: {
              number_of_seasons: "1",
              seasons: createSeasons(1),
            },
          })
        );
        return;
      }
    });

    Promise.all(promises)
      .then(() => {
        res.send(`seasons updated`);
        return resolve();
      })
      .catch((error) => {
        console.log(error);
        res.status(400);
        res.json({
          isError: true,
          error: error,
        });
        return resolve();
      });
  });
};
