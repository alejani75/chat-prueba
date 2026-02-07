// script.js — cliente que envía mensajes sin recargar la página
// Este script envía el texto al endpoint /api/ai-chat y muestra respuestas.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chatForm');
  const promptEl = document.getElementById('prompt');
  const chatLog = document.getElementById('chatLog');

  function appendMessage(cls, text) {
    const li = document.createElement('li');
    li.className = `message ${cls}`;
    li.textContent = text;
    chatLog.appendChild(li);
    // scroll to bottom
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function showTemporaryStatus(text) {
    const el = document.createElement('li');
    el.className = 'message bot';
    el.dataset.status = 'loading';
    el.textContent = text;
    chatLog.appendChild(el);
    chatLog.scrollTop = chatLog.scrollHeight;
    return el;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = (promptEl.value || '').trim();
    if (!prompt) return;

    appendMessage('user', prompt);
    promptEl.value = '';
    promptEl.disabled = true;

    const statusEl = showTemporaryStatus('... pensando');

    try {
      const res = await fetch(form.action || '/api/ai-chat', {
        method: form.method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();

      // Buscar la propiedad más probable para la respuesta
      const reply = data.reply || data.response || (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || data.text || JSON.stringify(data);

      statusEl.remove();
      appendMessage('bot', reply);

    } catch (err) {
      statusEl.remove();
      appendMessage('bot', 'Error: ' + (err.message || 'No se recibió respuesta'));
      console.error(err);
    } finally {
      promptEl.disabled = false;
      promptEl.focus();
    }
  });
});
