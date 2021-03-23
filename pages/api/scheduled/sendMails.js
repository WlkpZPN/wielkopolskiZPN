import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const messages = await prisma.messages.findMany();
    const clubs = await prisma.clubs.findMany();
    //1. filter messages with some rules

    //2. check which rules met the conditions

    //3. for each rule create a list of clubs emails to send mails

    await prisma.$disconnect();
  });
};
