const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Directorio raíz del proyecto (funciona tanto en local como en Vercel)
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

// Contenido de la interfaz en memoria para evitar accesos a disco del archivo HTML (solución ultra-robusta para Vercel)
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Fuerza y Equilibrio</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
        button, div, h1, h2, p {
            touch-action: manipulation;
            -webkit-user-select: none;
            user-select: none;
        }
    </style>
</head>
<body class="bg-gradient-to-b from-blue-50 to-slate-100 font-sans antialiased text-slate-800">

    <div id="pantalla-bienvenida" class="flex flex-col justify-between h-screen p-6 max-w-md mx-auto bg-white shadow-2xl">
        
        <div class="text-center pt-2">
            <h1 class="text-3xl font-black tracking-tight text-blue-950 leading-none">
                FUERZA Y EQUILIBRIO
            </h1>
            <h2 class="text-sm font-bold text-emerald-600 tracking-widest uppercase mt-1">
                Secuencias de Movimiento Seguro
            </h2>
        </div>

        <div class="flex flex-col items-center my-auto py-4 w-full">
            
            <div class="w-40 h-40 mb-6 drop-shadow-xl bg-blue-50 rounded-full p-2 border border-blue-100 flex items-center justify-center">
                <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#1E3A8A" stroke-width="5" stroke-dasharray="5 3"/>
                    <path d="M 22 72 Q 50 58 78 72" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
                    <circle cx="42" cy="36" r="6" fill="#1E3A8A" />
                    <path d="M 42 44 Q 34 54 44 63" fill="none" stroke="#1E3A8A" stroke-width="5" stroke-linecap="round"/>
                    <circle cx="58" cy="36" r="6" fill="#10B981" />
                    <path d="M 58 44 Q 66 54 56 63" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
                </svg>
            </div>

            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center shadow-inner w-full">
                <p class="text-base font-semibold text-slate-700 leading-relaxed mb-3">
                    ¡Le damos la bienvenida a su guía de salud!
                </p>
                <p class="text-sm text-slate-600 leading-relaxed">
                    Esta herramienta interactiva le ayudará a realizar sus ejercicios de mantenimiento de forma correcta, segura y a su propio ritmo. Un complemento ideal para los talleres de su Centro de Salud.
                </p>
            </div>
            
        </div>

        <div class="flex flex-col gap-4 pb-2">
            <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl shadow-sm">
                <p class="text-xs text-amber-950 leading-snug">
                    <strong>⚠️ Importante:</strong> Detenga la actividad de inmediato si nota dolor, mareos o fatiga. Su bienestar es lo primero.
                </p>
            </div>

            <button onclick="entrarApp()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xl py-5 rounded-2xl shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
                EMPEZAR MIS EJERCICIOS 
                <span class="text-2xl">▶️</span>
            </button>
        </div>

    </div>

    <div id="menu-principal" class="hidden p-6 max-w-md mx-auto text-center justify-center items-center h-screen">
        <h2 class="text-2xl font-bold text-blue-900">Menú de Secuencias Cargado</h2>
        <button onclick="location.reload()" class="mt-6 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold">Volver</button>
    </div>

    <script>
        function entrarApp() {
            localStorage.setItem('avisoSaludAceptado', 'true');
            document.getElementById('pantalla-bienvenida').classList.add('hidden');
            document.getElementById('menu-principal').classList.remove('hidden');
            document.getElementById('menu-principal').classList.add('flex', 'flex-col');
        }
    </script>
</body>
</html>`;

// Servir la página HTML desde memoria
function serveHtml(res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  });
  res.end(HTML_CONTENT, 'utf-8');
}

// Handler de solicitudes — exportado para Vercel, usado también por http.createServer
const requestHandler = (req, res) => {
  // 1. Health Check Endpoint
  if (req.url === '/api/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    });
    res.end(JSON.stringify({ status: 'healthy' }));
    return;
  }

  // Obtener ruta limpia
  let filePath = req.url || '/';
  filePath = filePath.split('?')[0].split('#')[0];

  // Si se solicita la raíz, index.html o main.html, se sirve directamente en memoria sin leer disco
  if (filePath === '/' || filePath === '' || filePath === '/index.html' || filePath === '/main.html') {
    serveHtml(res);
    return;
  }

  // Normalizar y construir ruta absoluta segura para el resto de archivos estáticos (styles.css, app.js, etc.)
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const absolutePath = path.join(ROOT_DIR, safePath);

  // Protección contra directory traversal
  if (!absolutePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Acceso denegado');
    return;
  }

  const extname = String(path.extname(absolutePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Redirigir al HTML en memoria si no se encuentra el archivo (comportamiento SPA)
        serveHtml(res);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Error de lectura del archivo: ${error.code}`);
      }
    } else {
      // Optimización de Cache-Control por tipo de archivo
      let cacheControl = 'no-cache, no-store, must-revalidate'; // Default
      if (extname === '.css' || extname === '.js' || extname === '.json' || extname === '.svg') {
        cacheControl = 'public, max-age=86400, must-revalidate'; // 24h caché para estáticos
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      });
      res.end(content, 'utf-8');
    }
  });
};

// ── Exportar para Vercel (Serverless Function) ──────────────────────────────
module.exports = requestHandler;

// ── Arrancar servidor local solo si se ejecuta directamente (Docker / local) ─
if (require.main === module) {
  let currentPort = PORT;

  const server = http.createServer(requestHandler);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  El puerto ${currentPort} está ocupado. Probando con el puerto ${currentPort + 1}...`);
      currentPort++;
      server.listen(currentPort);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });

  server.listen(currentPort, () => {
    console.log(`\n==============================================================`);
    console.log(`🚀 ¡Guía Activa de Ejercicios en Casa - Servidor Iniciado!`);
    console.log(`👉 Abre en tu navegador: http://localhost:${currentPort}`);
    console.log(`💡 Para probar la PWA o instalarla, usa esta dirección.`);
    console.log(`🛑 Para detener el servidor, presiona: Ctrl + C`);
    console.log(`==============================================================\n`);
  });
}
