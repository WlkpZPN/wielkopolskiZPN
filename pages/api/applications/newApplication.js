import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    //TO DO: create new application
    await prisma.user.create({
      data: {},
    });
    return resolve();
  });
};
