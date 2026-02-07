#!/bin/bash
# setup.sh — Script de instalación rápida

echo "📦 Instalando chat-prueba..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
   echo "❌ Node.js no está instalado. Descárgalo desde https://nodejs.org"
   exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm install

echo ""
echo "=== CONFIGURACIÓN ==="
echo ""
echo "1. Obtén tu clave de OpenAI en: https://platform.openai.com/account/api-keys"
echo ""
echo "2. Exporta la clave (macOS/Linux):"
echo "   export OPENAI_API_KEY=\"tu_clave_aqui\""
echo ""
echo "3. O en Windows (PowerShell):"
echo "   \$env:OPENAI_API_KEY=\"tu_clave_aqui\""
echo ""
echo "=== EJECUCIÓN ==="
echo ""
echo "4. Inicia el servidor:"
echo "   npm start"
echo ""
echo "5. En otra terminal, sirve la interfaz:"
echo "   npx http-server -p 5000"
echo ""
echo "6. Abre en tu navegador:"
echo "   http://localhost:5000"
echo ""
echo "✨ ¡Listo!"
