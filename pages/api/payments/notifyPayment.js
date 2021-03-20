import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    //console.log("notify payment", req.body);
    res.status(200);
    res.send("OK");
    return resolve();
  });
};
