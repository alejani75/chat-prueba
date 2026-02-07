// scripts/test-openai.js
// Realiza una petición mínima a la API de OpenAI para comprobar que la clave funciona.

const fetch = require('node-fetch');

async function main(){
  const apiKey = process.env.OPENAI_API_KEY;
  if(!apiKey){
    console.error('OPENAI_API_KEY no definida');
    process.exit(2);
  }

  try{
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Di hola en una palabra' }],
        max_tokens: 5
      })
    });

    if(!res.ok){
      const txt = await res.text();
      console.error('Respuesta no OK:', res.status, txt);
      process.exit(3);
    }

    const json = await res.json();
    const reply = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || '';
    console.log('OpenAI reply (trunc):', reply.slice(0,80));
    process.exit(0);

  }catch(err){
    console.error('Error en petición a OpenAI:', err.message || err);
    process.exit(4);
  }
}

main();
