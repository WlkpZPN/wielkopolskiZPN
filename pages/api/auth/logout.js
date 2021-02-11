import cookie from "cookie";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("userToken", "", {
        maxAge: -1,
        path: "/",
      })
    );
    res.json({
      message: "user logged out",
    });
    return resolve();
  });
};
