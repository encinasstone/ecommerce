/**
 * Vercel Serverless Function: Stripe PaymentIntent API Endpoint
 * Path: /api/create-payment-intent
 * Production Credentials Mode
 */

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const { amount = 1595000, name = 'Cliente Encinas', description = 'Mesa Encinas Stone', metadata = {} } = req.body || {};

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    const params = new URLSearchParams();
    params.append('amount', amount.toString());
    params.append('currency', 'mxn');
    params.append('payment_method_types[]', 'card');
    params.append('description', description);
    params.append('metadata[cliente]', name);

    if (metadata && typeof metadata === 'object') {
      Object.keys(metadata).forEach(k => {
        params.append(`metadata[${k}]`, metadata[k]);
      });
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + stripeSecretKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const data = await stripeRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Vercel Stripe function error:', err);
    return res.status(500).json({ error: { message: err.message } });
  }
}
