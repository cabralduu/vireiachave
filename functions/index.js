// functions/index.js
// Proxy seguro para Firebase Hosting + Functions
// A GEMINI_API_KEY fica nas variáveis de ambiente do Firebase, nunca no frontend.

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

const geminiKey = defineSecret('GEMINI_API_KEY');

exports.chat = onRequest(
  { secrets: [geminiKey], cors: true },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const API_KEY = geminiKey.value();
    if (!API_KEY) {
      res.status(500).json({ error: 'GEMINI_API_KEY não configurada.' });
      return;
    }

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
