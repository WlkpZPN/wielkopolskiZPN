import axios from 'axios';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const tokenData = await axios({
        method: 'POST',
        url: 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials&client_id=404238&client_secret=c1b15e22e4031f006c1e1f97dafe665c',
      });

      res.send(result.data.access_token);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
};
