import prisma from "../../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { leauge, setForAll } = req.body;

    //? 1.
    return resolve();
  });
};
