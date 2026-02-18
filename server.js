// server.js — ejemplo mínimo de proxy seguro para OpenAI
// NOTA: NUNCA pongan claves de API en el cliente. Definir OPENAI_API_KEY en
// variables de entorno en el servidor.

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/ai-chat', async (req, res) => {
  const prompt = (req.body && req.body.prompt) || '';
  if (!prompt) return res.status(400).json({ error: 'Falta el campo prompt' });

  // Preferir clave de Google Cloud si está definida, si no usar la de OpenAI
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key no configurada en el servidor (GOOGLE_CLOUD_API_KEY o OPENAI_API_KEY)' });

  // Modo de prueba local: si la API key es 'test_key_local', devolver respuesta mock
  if (apiKey === 'test_key_local') {
    const reply = `Respuesta de prueba para prompt: ${prompt}`;
    return res.json({ reply, raw: { mock: true, prompt } });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      return res.status(response.status).send(txt);
    }

    const json = await response.json();

    // Extraer texto de respuesta del formato de OpenAI
    const reply = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || '';

    res.json({ reply, raw: json });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la petición al proveedor de IA' });
  }
});

app.listen(PORT, () => console.log(`API proxy escuchando en http://localhost:${PORT}`));
