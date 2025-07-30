import axios from 'axios';
import prisma from '../../../middleware/prisma';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { description, email, amount, firstName, lastName, applicationID, phone } = req.body;
  const orderId = uniqid(); // extOrderId
  try {
    const {
      data: { access_token },
    } = await axios.post(
      `${process.env.PAYU_URL}/pl/standard/user/oauth/authorize`,
      `grant_type=client_credentials&client_id=${process.env.PAYU_CLIENT_ID}&client_secret=${process.env.PAYU_CLIENT_SECRET}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1')
      .split(',')[0]
      .trim();

    const gross = String(amount * 100);

    const createRes = await axios.post(
      `${process.env.PAYU_URL}/api/v2_1/orders`,
      {
        notifyUrl: `https://wielkopolski-zpn-three.vercel.app/api/payments/notifyPayment`,
        customerIp: ip,
        merchantPosId: process.env.PAYU_POS_ID,
        description,
        currencyCode: 'PLN',
        totalAmount: gross,
        extOrderId: orderId,
        validityTime: '8035200',
        buyer: {
          email,
          phone: phone.startsWith('+') ? phone : `+48${phone}`,
          firstName: firstName || '',
          lastName: lastName || '',
          language: 'pl',
        },
        products: [{ name: 'Wniosek licencyjny', unitPrice: gross, quantity: 1 }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        maxRedirects: 0,
        validateStatus: (s) => s < 303,
      },
    );

    await prisma.applications.update({
      where: { id: Number(applicationID) },
      data: { payment_id: orderId, payment_link: createRes.headers.location },
    });

    return res.status(200).json({ link: createRes.headers.location });
  } catch (e) {
    console.error('PAYU error', e?.response?.data || e);
    return res.status(400).json({ error: e?.response?.data || e.message });
  }
}
