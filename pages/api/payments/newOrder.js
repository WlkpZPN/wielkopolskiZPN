import axios from "axios";

export default (req, res) => {
  const {
    description,
    email,
    amount,
    firstName,
    lastName,
    applicationID,
    phone,
  } = req.body;
  return new Promise(async (resolve) => {
    try {
      // GET ACCESS TOKEN
      const tokenData = await axios({
        method: "POST",
        url: "https://secure.snd.payu.com/pl/standard/user/oauth/authorize",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data:
          "grant_type=client_credentials&client_id=404238&client_secret=c1b15e22e4031f006c1e1f97dafe665c",
      });
      // GET IP
      let ip = "";
      if (req.connection.remoteAddress.includes("ffff")) {
        ip = req.connection.remoteAddress.toString().replace("::ffff:", "");
      } else {
        ip = req.connection.remoteAddress;
      }
      // CREATE NEW ORDER

      const newOrder = await axios({
        maxRedirects: 0,
        method: "POST",
        url: "https://secure.snd.payu.com/api/v2_1/orders",
        validateStatus: function (status) {
          return status < 303;
        },
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
        data: {
          notifyUrl: `https://wielkopolski-zpn.vercel.app/api/payments/notifyPayment`,
          currencyCode: "PLN",
          description: description,
          merchantPosId: "404238",
          validityTime: "86400",
          extOrderId: applicationID,
          customerIp: ip,
          totalAmount: amount * 100,
          buyer: {
            email: email,
            phone: phone,
            firstName: firstName || "",
            lastName: lastName || "",
            language: "pl",
          },
          products: [
            {
              name: "Wniosek licencyjny",
              unitPrice: "1000",
              quantity: amount,
            },
          ],
        },
      });

      res.status(200);
      res.send({
        link: newOrder.headers.location,
      });
      return resolve();
    } catch (err) {
      console.log(err.response.data);
      res.status(400);
      res.send(err.data);
      return resolve();
    }
  });
};

//  const newOrder = await axios({
//    maxRedirects: 0,
//    method: "POST",
//    url: "https://secure.payu.com/api/v2_1/orders",
//    validateStatus: function (status) {
//      return status < 303;
//    },
//    headers: {
//      "Content-type": "application/json",
//      Authorization: `Bearer ${tokenData.data.access_token}`,
//    },
//    data: {
//      notifyUrl: `wielkopolski-zpn.vercel.app/api/payments/notifyPayment`,
//      currencyCode: "PLN",
//      description: description,
//      merchantPosId: "404238",
//      validityTime: "86400",
//      extOrderId: applicationID,
//      customerIp: ip,
//      totalAmount: amount,
//      buyer: {
//        email: email,
//        phone: phone,
//        firstName: firstName,
//        lastName: lastName,
//        language: "pl",
//      },
//      products: [
//        {
//          name: "Wniosek licencyjny",
//          unitPrice: "1000",
//          quantity: amount,
//        },
//      ],
//    },
//  });