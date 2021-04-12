import { Queue } from "quirrel/next";
import prisma from "../../../middleware/prisma";

export default Queue("api/queues/sendMails", async (job) => {
  const messages = await prisma.messages.findMany();
  const clubs = await prisma.clubs.findMany();
  await prisma.$disconnect();
});
