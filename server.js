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

  // Obtener ruta del archivo
  let filePath = req.url || '/';
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  }

  // Eliminar parámetros de consulta y anclas para encontrar el archivo real
  filePath = filePath.split('?')[0].split('#')[0];

  // Normalizar y construir ruta absoluta segura
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
        // Redirigir al index.html si no se encuentra el archivo (comportamiento SPA)
        fs.readFile(path.join(ROOT_DIR, 'index.html'), (err, indexContent) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('Error interno: index.html no encontrado');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=UTF-8',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY'
            });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Error de lectura del archivo: ${error.code}`);
      }
    } else {
      // Optimización de Cache-Control por tipo de archivo
      let cacheControl = 'no-cache, no-store, must-revalidate'; // Default para HTML
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
