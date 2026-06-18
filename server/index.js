const express = require('express');
const cors = require('cors');
const stripeRoutes = require('./stripe');
const emailRoutes = require('./email');
const supabaseAdmin = require('./supabase');

const app = express();

// Stripe webhook richiede il body raw per verificare la firma
app.use('/api/webhook', express.raw({ type: 'application/json' }), stripeRoutes.webhook);

app.use(cors());
app.use(express.json());

app.use('/api/checkout', stripeRoutes.checkout);
app.use('/api/email', emailRoutes);

// Endpoint di test per la modalità demo
app.get('/api/demo/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});