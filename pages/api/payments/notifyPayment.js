import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const newStatus = req.body.order.status;
    const applicationID = req.body.order.exOrderId;

    console.log("NOTIFY ROUTE FIRED");
    console.log(req.body);
    if (newStatus === "COMPLETED") {
      await prisma.applications.update({
        where: {
          id: applicationID,
        },
        data: {
          status_id: 7,
        },
      });
    }

    res.status(200);
    res.send("OK");
    return resolve();
  });
};
