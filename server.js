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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Fuerza y Equilibrio: Secuencias de Movimiento Seguro</title>
    <link rel="stylesheet" href="styles.css?v=12">
    <link rel="manifest" href="manifest.json">
    <script src="app.js?v=12" defer></script>
    <meta name="theme-color" content="#1b2e24">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="description" content="Guía interactiva para realizar ejercicios de mantenimiento de forma correcta, segura y a su propio ritmo.">
</head>
<body>
    <div class="app-container">
        <!-- CABECERA PERSISTENTE (ACCESIBILIDAD) -->
        <header id="main-header" class="app-header">
            <div class="header-title-container">
                <span class="header-title">FUERZA Y EQUILIBRIO</span>
            </div>
            <div class="accessibility-bar">
                <button onclick="adjustFontSize('decrease')" class="btn-acc" aria-label="Disminuir tamaño de letra">A-</button>
                <button onclick="adjustFontSize('increase')" class="btn-acc" aria-label="Aumentar tamaño de letra">A+</button>
                <button id="contrast-toggle-btn" onclick="toggleHighContrast()" class="btn-acc btn-acc-contrast" aria-label="Alternar contraste alto">👁️</button>
            </div>
        </header>

        <!-- PANTALLA 2: PANTALLA PRINCIPAL DE CATEGORÍAS -->
        <div id="home-screen" class="screen active">
            <div class="diary-intro">
                <h2>RUTINAS DE MOVIMIENTO</h2>
                <p>Seleccione una categoría para ver los ejercicios recomendados</p>
            </div>
            <div class="categories-grid">
                <div class="category-card cat-fuerza" onclick="selectCategory('fuerza')">
                    <div class="cat-icon">🏋️</div>
                    <div class="cat-info">
                        <span class="cat-title">Fuerza Muscular</span>
                        <span class="cat-desc">Huesos fuertes y potencia diaria.</span>
                    </div>
                </div>
                <div class="category-card cat-equilibrio" onclick="selectCategory('equilibrio')">
                    <div class="cat-icon">⚖️</div>
                    <div class="cat-info">
                        <span class="cat-title">Equilibrio y Coordinación</span>
                        <span class="cat-desc">Estabilidad y prevención de tropezones.</span>
                    </div>
                </div>
                <div class="category-card cat-resistencia" onclick="selectCategory('resistencia')">
                    <div class="cat-icon">🏃</div>
                    <div class="cat-info">
                        <span class="cat-title">Resistencia Aeróbica</span>
                        <span class="cat-desc">Corazón fuerte y vitalidad diaria.</span>
                    </div>
                </div>
                <div class="category-card cat-flexibilidad" onclick="selectCategory('flexibilidad')">
                    <div class="cat-icon">🧘</div>
                    <div class="cat-info">
                        <span class="cat-title">Flexibilidad y Movilidad</span>
                        <span class="cat-desc">Articulaciones ágiles y buena postura.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- PANTALLA 3: DETALLE DE EJERCICIOS (CATÁLOGO PAGINADO) -->
        <div id="exercises-screen" class="screen">
            <div class="exercises-header">
                <button class="btn-back" onclick="navigateTo('home')" aria-label="Volver a categorías">←</button>
                <div class="exercises-title">
                    <span id="exercises-cat-icon">🏋️</span>
                    <span id="exercises-cat-title">Fuerza Muscular</span>
                </div>
            </div>
            <div class="exercise-pagination-bar">
                <button id="btn-prev-exercise" class="btn btn-pagination" onclick="navigateActiveExercise(-1)">← Anterior</button>
                <span id="exercise-pagination-info">Ejercicio 1 de 4</span>
                <button id="btn-next-exercise" class="btn btn-pagination" onclick="navigateActiveExercise(1)">Siguiente →</button>
            </div>
            <div class="active-exercise-card">
                <div class="exercise-main-content">
                    <h3 id="active-exercise-title" class="exercise-title">Fuerza de agarre manual</h3>
                    <div class="exercise-visual-row">
                        <div id="active-exercise-svg-box" class="exercise-image-box"></div>
                    </div>
                    <div class="instructions-accordion-wrapper">
                        <button id="btn-toggle-instructions" class="btn btn-accordion-toggle" onclick="toggleInstructionsAccordion()" aria-expanded="false">📖 Leer instrucciones</button>
                        <div id="active-exercise-instructions-panel" class="instructions-panel" style="display: none;">
                            <div class="instructions-panel-header">
                                <span>Instrucciones de Realización</span>
                                <button class="btn-close-instructions" onclick="toggleInstructionsAccordion()" aria-label="Cerrar instrucciones">✕</button>
                            </div>
                            <div id="active-exercise-steps" class="instructions-panel-steps"></div>
                        </div>
                    </div>
                </div>
                <div class="exercise-params-container">
                    <div id="active-exercise-params" class="param-badge">📋 Recomendado: 3 series de 12 repeticiones</div>
                </div>
                <div class="exercise-action-footer-buttons">
                    <button id="btn-active-speech" class="btn btn-speech" onclick="readActiveExerciseAloud()">🔊 Escuchar</button>
                    <button id="btn-active-assistant" class="btn btn-primary" onclick="startActiveExerciseAssistant()">▶ Iniciar</button>
                </div>
            </div>
        </div>

        <!-- PANTALLA 4: PASAPORTE / DIARIO DE 12 SEMANAS -->
        <div id="diary-screen" class="screen">
            <div class="diary-intro">
                <h2>MI PASAPORTE DE LOGROS</h2>
                <p>Registra tus progresos de ejercicio multicomponente de las 12 semanas</p>
            </div>
            <div id="weeks-accordion-container" class="weeks-container"></div>
            <div id="certificate-container" style="display: none; width: 100%;"></div>
            <div class="diary-actions" style="text-align: center;">
                <button class="btn btn-danger w-full" onclick="showResetConfirmation()" style="min-height: 52px;">🗑️ Reiniciar Pasaporte</button>
            </div>
        </div>

        <!-- PANTALLA 5: MI PERFIL Y FIRMA -->
        <div id="profile-screen" class="screen">
            <div class="passport-border">
                <div class="profile-card-header">Datos Autorizados del Portador</div>
                <div class="profile-grid">
                    <div class="profile-field">
                        <label for="profile-name">Nombre</label>
                        <input type="text" id="profile-name" class="profile-input" oninput="savePersonalData()" placeholder="Tu nombre...">
                    </div>
                    <div class="profile-field">
                        <label for="profile-surname">Apellidos</label>
                        <input type="text" id="profile-surname" class="profile-input" oninput="savePersonalData()" placeholder="Tus apellidos...">
                    </div>
                    <div class="profile-field">
                        <label for="profile-age">Edad</label>
                        <input type="number" id="profile-age" class="profile-input" oninput="savePersonalData()" placeholder="Tu edad...">
                    </div>
                    <div class="signature-area">
                        <label>Firma Autorizada del Portador</label>
                        <div class="signature-box">
                            <canvas id="signature-pad" class="signature-canvas"></canvas>
                            <div id="sig-placeholder" class="signature-placeholder">Firma con tu dedo o puntero aquí</div>
                        </div>
                        <button class="btn btn-secondary w-full" onclick="clearSignatureCanvas()" style="margin-top: 10px; min-height: 48px; font-size: var(--text-sm);">✕ Borrar Firma</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PANTALLA 6: ASISTENTE INTERACTIVO DE ENTRENAMIENTO -->
        <div id="assistant-screen" class="screen">
            <div class="exercises-header">
                <button class="btn-back" onclick="exitWorkoutAssistant()" aria-label="Salir del asistente">✕</button>
                <div class="exercises-title">
                    <span id="assistant-exercise-cat">Fuerza Muscular</span>
                </div>
            </div>
            <div id="assistant-box-element" class="assistant-box state-exercise">
                <h3 id="assistant-exercise-title" style="font-size: var(--text-lg); font-weight: 850; margin-bottom: 0.5rem;">Grip con toalla</h3>
                <div id="assistant-phase-label" class="assistant-action-label assistant-text-primary">¡PREPARADOS!</div>
                <div id="assistant-breathing-circle" class="breathing-guide">
                    <span id="assistant-breathing-icon" class="breathing-icon">💪</span>
                </div>
                <div id="assistant-timer-display" class="assistant-timer-text assistant-text-primary">3</div>
                <div id="assistant-reps-counter" class="assistant-reps-text assistant-text-primary">Repetición 1 de 12</div>
                <div id="assistant-series-counter" class="assistant-series-text">Serie 1 de 3</div>
                <button id="btn-skip-rest" class="btn btn-secondary" onclick="skipWorkoutRest()" style="display: none; min-height: 48px; width: 80%; margin-top: 0.5rem;">⏭️ Saltar Descanso</button>
            </div>
            <div class="assistant-controls-grid">
                <button id="btn-assistant-pause-toggle" class="btn btn-primary" onclick="toggleWorkoutAssistantPause()">⏸ Pausar</button>
            </div>
        </div>

        <!-- BARRA DE NAVEGACIÓN INFERIOR PERSISTENTE (ACCESIBLE) -->
        <nav id="main-nav" class="app-nav">
            <button class="nav-item active" onclick="navigateTo('home')">
                <span class="nav-item-icon">🏋️</span>
                <span>RUTINAS</span>
            </button>
            <button class="nav-item" onclick="navigateTo('diary')">
                <span class="nav-item-icon">📔</span>
                <span>PASAPORTE</span>
            </button>
            <button class="nav-item" onclick="navigateTo('profile')">
                <span class="nav-item-icon">👤</span>
                <span>PERFIL</span>
            </button>
        </nav>
    </div>

    <!-- MODAL DE CONFIRMACIÓN DE REINICIO -->
    <div id="reset-modal" class="modal-overlay">
        <div class="modal-card">
            <div class="modal-title">⚠️ ¿Reiniciar todo tu diario y progreso?</div>
            <p style="font-size: var(--text-sm); color: var(--text-muted); line-height: 1.5;">Esta acción borrará de forma permanente todas las sesiones de ejercicios completadas de la escala de esfuerzo del diario de 12 semanas. No se puede deshacer.</p>
            <div class="modal-buttons">
                <button class="btn btn-secondary" onclick="hideResetConfirmation()" style="flex: 1; min-height: 48px;">Cancelar</button>
                <button class="btn btn-danger" onclick="executeDiaryReset()" style="flex: 1; min-height: 48px;">Sí, reiniciar</button>
            </div>
        </div>
    </div>
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
  if (filePath.endsWith('/') && filePath.length > 1) {
    filePath = filePath.slice(0, -1);
  }

  // Si se solicita la raíz, index.html, main.html o las rutas de la función de Vercel, se sirve directamente en memoria sin leer disco
  if (filePath === '/' || filePath === '' || filePath === '/index.html' || filePath === '/main.html' || filePath === '/api/index' || filePath === '/api/index.js' || filePath === '/api') {
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
