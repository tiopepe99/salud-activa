const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

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

const server = http.createServer((req, res) => {
  // 1. Health Check Endpoint (Best practice from next-best-practices)
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
  let filePath = '.' + req.url;
  if (filePath === './' || filePath === '.') {
    filePath = './index.html';
  }

  // Eliminar parámetros de consulta y anclas para encontrar el archivo real
  filePath = filePath.split('?')[0].split('#')[0];
  
  // Normalizar ruta para evitar directory traversal
  const safePath = path.normalize(filePath);
  if (safePath.startsWith('..') || path.isAbsolute(safePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Acceso denegado');
    return;
  }

  const extname = String(path.extname(safePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(safePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Redirigir al index.html si no se encuentra el archivo (comportamiento SPA)
        fs.readFile('./index.html', (err, indexContent) => {
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
      // Optimización de Cache-Control por tipo de archivo (Best practice)
      let cacheControl = 'no-cache, no-store, must-revalidate'; // Default para HTML
      if (extname === '.css' || extname === '.js' || extname === '.json' || extname === '.svg') {
        cacheControl = 'public, max-age=86400, must-revalidate'; // 24h caché para estáticos
      }

      // Servir archivo con el tipo de contenido adecuado y cabeceras de seguridad
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
});

let currentPort = PORT;

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n==============================================================`);
    console.log(`🚀 ¡Guía Activa de Ejercicios en Casa - Servidor Iniciado!`);
    console.log(`👉 Abre en tu navegador: http://localhost:${port}`);
    console.log(`💡 Para probar la PWA o instalarla, usa esta dirección.`);
    console.log(`🛑 Para detener el servidor, presiona: Ctrl + C`);
    console.log(`==============================================================\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  El puerto ${currentPort} está ocupado. Probando con el puerto ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error('Error al iniciar el servidor:', err);
  }
});

startServer(currentPort);
