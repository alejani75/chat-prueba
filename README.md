# chat-prueba

Proyecto mínimo: interfaz de chat para integrar con una IA (solo HTML).

Descripción
-----------

Interfaz estática y accesible para un chat con inteligencia artificial. El objetivo
es proporcionar una plantilla limpia y fácil de integrar con cualquier backend que
provea respuestas de IA.

Qué se hizo
-----------

- Se añadió la interfaz principal en `index.html` con diseño responsivo y accesible.
- El chat muestra un registro de mensajes y un formulario que envía por POST al
	endpoint `/api/ai-chat` (puedes cambiar el atributo `action` del formulario).
- Se incluyeron buenas prácticas básicas: roles ARIA, contraste legible, y diseño
	adaptativo.

Estructura del repositorio
--------------------------

- [index.html](index.html) — Interfaz de usuario (HTML + estilos embebidos).
- [README.md](README.md) — Este documento.

Cómo usar
---------

1. Abrir `index.html` en un navegador para ver la interfaz estática.
2. Para recibir respuestas de IA es necesario implementar o apuntar a un
	 backend que exponga un endpoint POST (por ejemplo `/api/ai-chat`) que acepte
	 un campo `prompt` y devuelva la respuesta de la IA (el servidor puede inyectar
	 la respuesta en la conversación o devolver JSON según tu integración).

Notas rápidas de integración
---------------------------

- Si quieres un flujo sin recarga, añade JavaScript que capture el submit del
	formulario, envíe la petición via `fetch()` y actualice el DOM con la respuesta.
- Nunca expongas claves de API en el cliente: cualquier clave (p. ej. OpenAI)
	debe permanecer en el servidor.
- Configura CORS en el backend si sirves la interfaz desde un origen distinto.

Siguientes pasos recomendados
-----------------------------

- Añadir un pequeño adaptador JavaScript para conectar la UI a tu API de IA.
- Implementar streaming de respuesta (si tu proveedor lo soporta) para una
	experiencia más fluida.
- Proteger y validar entradas en el servidor y añadir límites de tasa si es
	necesario.

Contacto y licencia
-------------------

Repositorio creado como plantilla; adapta libremente según tus necesidades.

