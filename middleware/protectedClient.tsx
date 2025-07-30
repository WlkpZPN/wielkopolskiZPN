import jwt from 'jsonwebtoken';
export function protectedClientRoute(cb) {
  return async (context) => {
    const { req, res } = context;

    let decodedToken = null;
    const token = req.cookies.clubToken || null;

    if (!token) {
      res.statusCode = 302;
      res.setHeader('Location', '/login');
    } else {
      decodedToken = jwt.verify(token, process.env.AUTH_KEY);

      if (decodedToken.role !== 'klub') {
        res.statusCode = 302;
        res.setHeader('Location', '/login');
      }
    }

    return await cb(context, decodedToken);
  };
}
