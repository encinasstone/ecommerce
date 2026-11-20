/**
 * Vercel Serverless Function: Stripe PaymentIntent API Endpoint
 * Path: /api/create-payment-intent
 *
 * El precio se calcula AQUÍ, en el servidor, con la tabla oficial.
 * El navegador solo envía la configuración elegida; nunca el monto.
 */

// Debe coincidir con PRICING_MATRIX de app.js (precios en MXN, sin centavos)
const PRICING_MATRIX = {
  4: {
    basePrice: 15950,
    dimensions: '130 x 90 cm',
    cubiertas: { 'MEL BLANCA': 0, 'MEL NEGRA': 0, 'DALLAS': 2850, 'DIAMOND': 3400, 'SGABRIEL': 3400, 'CTT LIGHT': 4350 },
    bases: { 'POLAR': 0, 'ROSA': 0, 'MOCZAN': 0, 'PAROTA': 3700 },
    diseno: { 'LISO': 0, 'LAMBRIN': 2600 }
  },
  6: {
    basePrice: 19800,
    dimensions: '160 x 100 cm',
    cubiertas: { 'MEL BLANCA': 0, 'MEL NEGRA': 0, 'DALLAS': 4100, 'DIAMOND': 5000, 'SGABRIEL': 5000, 'CTT LIGHT': 6900 },
    bases: { 'POLAR': 0, 'ROSA': 0, 'MOCZAN': 0, 'PAROTA': 3000 },
    diseno: { 'LISO': 0, 'LAMBRIN': 3800 }
  },
  8: {
    basePrice: 24100,
    dimensions: '230 x 125 cm',
    cubiertas: { 'MEL BLANCA': 0, 'MEL NEGRA': 0, 'DALLAS': 8800, 'DIAMOND': 10600, 'SGABRIEL': 10600, 'CTT LIGHT': 14400 },
    bases: { 'POLAR': 0, 'ROSA': 0, 'MOCZAN': 0, 'PAROTA': 4600 },
    diseno: { 'LISO': 0, 'LAMBRIN': 4600 }
  }
};

const NOMBRES = {
  cubiertas: { 'MEL BLANCA': 'Melamina Blanca', 'MEL NEGRA': 'Melamina Negra', 'DALLAS': 'Dallas', 'DIAMOND': 'Diamond', 'SGABRIEL': 'San Gabriel', 'CTT LIGHT': 'CTT Light' },
  bases: { 'POLAR': 'Polar', 'ROSA': 'Rosa Morada', 'MOCZAN': 'Moczan', 'PAROTA': 'Parota' },
  diseno: { 'LISO': 'Liso', 'LAMBRIN': 'Lambrín' }
};

const ALLOWED_ORIGINS = [
  'https://encinasstone.com',
  'https://www.encinasstone.com'
];

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

// Acepta el dominio oficial y también la misma URL donde está publicada la página
// (así funcionan las versiones de prueba de Vercel), pero no otros sitios.
const isAllowedOrigin = (origin, req) => {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try { return new URL(origin).host === host; } catch (e) { return false; }
};

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const originOk = isAllowedOrigin(origin, req);
  if (origin && originOk) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Método no permitido' } });
  }

  if (!originOk) {
    return res.status(403).json({ error: { message: 'Origen no permitido' } });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('Falta STRIPE_SECRET_KEY en las variables de entorno');
    return res.status(500).json({ error: { message: 'Pago no disponible por el momento.' } });
  }

  try {
    const body = req.body || {};
    const capacity = parseInt(body.capacity, 10);
    const stoneCode = clean(body.stoneCode, 30);
    const baseCode = clean(body.baseCode, 30);
    const disenoCode = clean(body.disenoCode, 30);

    const matrix = PRICING_MATRIX[capacity];
    if (!matrix || !has(matrix.cubiertas, stoneCode) || !has(matrix.bases, baseCode) || !has(matrix.diseno, disenoCode)) {
      return res.status(400).json({ error: { message: 'Configuración de mesa no válida.' } });
    }

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 30);
    const city = clean(body.city, 60);
    const address = clean(body.address, 200);
    if (!name || !phone || !city || !address) {
      return res.status(400).json({ error: { message: 'Faltan datos de contacto o de entrega.' } });
    }

    const totalMXN = matrix.basePrice + matrix.cubiertas[stoneCode] + matrix.bases[baseCode] + matrix.diseno[disenoCode];
    const amount = totalMXN * 100; // Stripe usa centavos

    const modelo = `Mesa ${capacity} Personas (${matrix.dimensions})`;
    const params = new URLSearchParams();
    params.append('amount', String(amount));
    params.append('currency', 'mxn');
    params.append('payment_method_types[]', 'card');
    params.append('description', `Orden Encinas Stone: ${modelo} (${name})`);
    const metadata = {
      cliente: name,
      telefono: phone,
      ciudad: city,
      direccion: address,
      modelo,
      acabado_base: NOMBRES.bases[baseCode],
      diseno_base: NOMBRES.diseno[disenoCode],
      cubierta: `${NOMBRES.cubiertas[stoneCode]} (20 mm / 40 mm vista)`,
      total_mxn: String(totalMXN)
    };
    Object.keys(metadata).forEach(k => params.append(`metadata[${k}]`, metadata[k]));

    const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + stripeSecretKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const data = await stripeRes.json();
    if (!stripeRes.ok || !data.client_secret) {
      console.error('Stripe error:', data && data.error);
      return res.status(502).json({ error: { message: 'No se pudo iniciar el pago con Stripe.' } });
    }

    // Solo se regresa lo que el navegador necesita
    return res.status(200).json({ client_secret: data.client_secret, amount: totalMXN });
  } catch (err) {
    console.error('Vercel Stripe function error:', err);
    return res.status(500).json({ error: { message: 'Error al procesar la solicitud de pago.' } });
  }
}
