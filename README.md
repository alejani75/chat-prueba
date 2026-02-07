# chat-prueba

Interfaz de chat con IA potenciada por OpenAI — diseño responsivo, arquitectura segura.

Descripción
-----------

Proyecto completo de chat con una arquitectura de tres capas:

1. **Frontend (HTML/CSS/JS):** Interfaz limpia y accesible con tema verde pastel.
2. **Backend (Node.js/Express):** Proxy seguro que comunica con OpenAI sin exponer claves.
3. **OpenAI API:** Motor de IA que genera respuestas en tiempo real.

Las claves de API NUNCA se incluyen en el cliente; se protegen en el servidor mediante
variables de entorno.

Estructura del repositorio
--------------------------

- [index.html](index.html) — Interfaz del usuario (HTML semántico + accesible).
- [styles.css](styles.css) — Estilos responsivos con paleta verde pastel y negro.
- [script.js](script.js) — Cliente AJAX que envía mensajes sin recargar la página.
- [server.js](server.js) — Proxy Express seguro para OpenAI (usa `OPENAI_API_KEY` de env).
- [README.md](README.md) — Este documento.

Instalación y ejecución
-----------------------

### Requisitos

- Node.js ≥ 14.x
- npm o yarn
- Clave de API de OpenAI (https://platform.openai.com/account/api-keys)

### Pasos

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/alejani75/chat-prueba.git
   cd chat-prueba
   ```

2. **Instalar dependencias:**
   ```bash
   npm init -y
   npm install express node-fetch
   ```

3. **Configurar la clave de API (sin commitear):**
   
   En macOS/Linux:
   ```bash
   export OPENAI_API_KEY="tu_clave_aqui"
   ```
   
   En Windows (PowerShell):
   ```powershell
   $env:OPENAI_API_KEY="tu_clave_aqui"
   ```
   
   O crear un archivo `.env` (que NO debe ser commiteado):
   ```bash
   # .env
   OPENAI_API_KEY=tu_clave_aqui
   ```
   
   Luego instalar `dotenv` para cargarlo:
   ```bash
   npm install dotenv
   ```

4. **Ejecutar el servidor:**
   ```bash
   node server.js
   ```
   
   El servidor escuchará en `http://localhost:3000`.

5. **Abrir la interfaz:**
   
   Abre `index.html` en tu navegador o sírvelo con un servidor HTTP:
   ```bash
   # Con Python 3:
   python3 -m http.server 5000
   
   # O con Node.js (instala http-server):
   npx http-server -p 5000
   ```
   
   Luego accede a `http://localhost:5000`.

Cómo funciona
-------------

1. Escribes un mensaje en la interfaz y presionas "Enviar".
2. El cliente (`script.js`) envía una petición `POST` a `http://localhost:3000/api/ai-chat`.
3. El servidor (`server.js`) recibe el prompt y lo envía a OpenAI con la clave privada.
4. OpenAI devuelve una respuesta.
5. El servidor envía la respuesta al cliente en JSON.
6. El cliente mostrará la respuesta sin recargar la página.

Seguridad
---------

- ✅ La clave de API NUNCA aparece en el código fuente.
- ✅ Se usa `process.env.OPENAI_API_KEY` en el backend.
- ✅ El cliente solo comunica con tu servidor, no con OpenAI directamente.
- ✅ `.env` y `node_modules` están en `.gitignore` (crea uno si es necesario).

Configuración avanzada
----------------------

### Usar dotenv

Si prefieres un archivo `.env` para desarrollo local:

1. Instala `dotenv`:
   ```bash
   npm install dotenv
   ```

2. Actualiza `server.js`:
   ```javascript
   require('dotenv').config();
   const apiKey = process.env.OPENAI_API_KEY;
   // ... resto del código
   ```

3. Crea `.env`:
   ```
   OPENAI_API_KEY=tu_clave_aqui
   ```

4. Añade `.env` a `.gitignore`:
   ```
   .env
   node_modules/
   ```

### Cambiar el modelo o parámetros

En `server.js`, modifica la petición a OpenAI:

```javascript
body: JSON.stringify({
  model: 'gpt-4',           // Cambia a gpt-4 si lo tienes disponible
  messages: [...],
  max_tokens: 1500,          // Aumenta para respuestas más largas
  temperature: 0.7,          // Controla creatividad (0=determinista, 1=creativo)
}),
```

### Producción

Para desplegar en producción (Heroku, Railway, Vercel, etc.):

1. Define la variable de entorno `OPENAI_API_KEY` en la plataforma de despliegue.
2. Añade un middleware CORS si es necesario:
   ```javascript
   const cors = require('cors');
   app.use(cors({ origin: 'https://tu-dominio.com' }));
   ```
3. Asegúrate de que el cliente apunte a la URL del servidor en producción (no localhost).

Resolución de problemas
-----------------------

**Error: "OPENAI_API_KEY no configurada"**
- Verifica que hayas exportado la variable: `export OPENAI_API_KEY="..."`
- O usa dotenv con un archivo `.env` válido.

**Error: "CORS error"**
- Si la interfaz y el servidor están en puertos/dominios diferentes, configura CORS
  en `server.js` (ver sección "Producción" arriba).

**Error: "Conexión rechazada en localhost:3000"**
- Asegúrate de que el servidor está corriendo: `node server.js`.
- Verifica que el puerto 3000 está disponible.

Próximos pasos
--------------

- Implementar autenticación de usuarios.
- Agregar historial persistente de conversaciones (base de datos).
- Streaming de respuestas en tiempo real (SSE o WebSocket).
- Ratelimiting para proteger tus costos de API.
- Tests unitarios (`jest`, `mocha`).

Licencia y créditos
-------------------

Proyecto creado como demostración de buenas prácticas fullstack.
Libre para usar, modificar y distribuir bajo licencia MIT.

