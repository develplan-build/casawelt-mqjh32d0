const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

router.post('/send', async (req, res) => {
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(503).json({ error: 'SendGrid non configurato: aggiungi SENDGRID_API_KEY' });
  }
  const { to, subject, html } = req.body;
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'noreply@casawelt.com',
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email inviata' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
