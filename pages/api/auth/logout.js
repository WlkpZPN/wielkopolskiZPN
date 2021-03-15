import cookie from "cookie";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("adminToken", "", {
        maxAge: -1,
        path: "/",
      })
    );
    res.json({
      message: "admin logged out",
    });
    return resolve();
  });
};
