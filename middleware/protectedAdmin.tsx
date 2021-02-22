import jwt from "jsonwebtoken";

export function protectedAdminRoute(cb) {
  return async (context) => {
    const { req, res } = context;
    // let cookies;
    let decodedToken;
    const token = req.cookies.userToken || null;
    if (!token) {
      res.statusCode = 302;
      res.setHeader("Location", "/admin/login");
    } else {
      decodedToken = jwt.verify(token, process.env.AUTH_KEY);
      console.log("token", decodedToken);

      if (decodedToken.role !== "superadmin") {
        res.statusCode = 302;
        res.setHeader("Location", "/admin/login");
      }
    }

    return await cb(context, decodedToken);
  };
}
