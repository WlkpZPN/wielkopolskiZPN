export default (req, res) => {
  return new Promise(async (resolve) => {
    console.log(req.body);

    res.json({ data: req.body });
    return resolve();
  });
};
