import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const faq = await prisma.frequently_asked_questions.findMany();
    await prisma.$disconnect();
    res.send(faq);
    return resolve();
  });
};
