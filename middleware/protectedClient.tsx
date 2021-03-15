import jwt from "jsonwebtoken";
export function protectedClientRoute(cb) {
  return async (context) => {
    const { req, res } = context;
    // let cookies;
    let decodedToken = null;
    const token = req.cookies.clubToken || null;
    if (!token) {
      res.statusCode = 302;
      res.setHeader("Location", "/login");
    } else {
      decodedToken = jwt.verify(token, process.env.AUTH_KEY);
    }
    // console.log("token", decodedToken);

    if (decodedToken.role !== "klub") {
      res.statusCode = 302;
      res.setHeader("Location", "/login");
    }

    return await cb(context, decodedToken);
  };
}
