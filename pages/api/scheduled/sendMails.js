import prisma from "../../../middleware/prisma";
import EmailQueue from "../queues/sendMails";

export default async (req, res) => {
  await EmailQueue.enqueue(null, { delay: "24h" });
};
