import cookie from 'cookie';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('clubToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
    res.json({
      message: 'club logged out',
    });
    return resolve();
  });
};
