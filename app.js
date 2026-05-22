/* ==========================================================================
   LÓGICA Y ESTADO DE LA APLICACIÓN - GUÍA ACTIVA DE EJERCICIOS EN CASA
   ========================================================================== */

// --- Utilidad de Almacenamiento Seguro (Evita caídas fatales si localStorage no está disponible) ---
const safeStorage = {
  getItem: function(key) {
    try {
      return (typeof localStorage !== 'undefined' && localStorage !== null) ? localStorage.getItem(key) : null;
    } catch (e) {
      console.warn("safeStorage.getItem falló para la clave " + key + ":", e);
      return null;
    }
  },
  setItem: function(key, value) {
    try {
      if (typeof localStorage !== 'undefined' && localStorage !== null) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("safeStorage.setItem falló para la clave " + key + ":", e);
    }
  },
  removeItem: function(key) {
    try {
      if (typeof localStorage !== 'undefined' && localStorage !== null) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("safeStorage.removeItem falló para la clave " + key + ":", e);
    }
  }
};

// --- Base de Datos de Ejercicios con Ilustraciones SVG Integradas (Offline) ---
const EXERCISES_DATABASE = {
  fuerza: {
    title: "Fuerza Muscular",
    icon: "🏋️",
    desc: "Mantiene tus huesos fuertes, previene caídas y te da la potencia necesaria para el día a día.",
    items: [
      {
        id: "fuerza_1",
        name: "Fuerza de agarre manual (Grip con toalla)",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Toalla enrollada -->
                <path d="M40 75 C 60 60, 140 60, 160 75 C 170 82, 170 98, 160 105 C 140 120, 60 120, 40 105 C 30 98, 30 82, 40 75 Z" fill="#94a3b8" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>
                <path d="M50 78 C 70 68, 130 68, 150 78" fill="none" stroke="white" stroke-width="2" stroke-dasharray="5 5"/>
                <path d="M42 95 C 65 105, 135 105, 158 95" fill="none" stroke="white" stroke-width="2" stroke-dasharray="5 5"/>
                <!-- Manos escurriendo con flechas -->
                <g stroke="var(--color-fuerza)" stroke-width="3" fill="none">
                  <!-- Flecha torsión izquierda -->
                  <path d="M60 50 A 20 20 0 0 0 50 80" marker-end="url(#arrow)" />
                  <path d="M55 45 L 60 50 L 52 52" stroke-width="3" />
                  <!-- Flecha torsión derecha -->
                  <path d="M140 120 A 20 20 0 0 0 150 90" marker-end="url(#arrow)" />
                  <path d="M145 125 L 140 120 L 148 118" stroke-width="3" />
                </g>
                <!-- Texto explicativo dentro del SVG -->
                <text x="100" y="30" text-anchor="middle" fill="var(--text-main)" font-weight="bold" font-size="12">¡Aprieta y escurre!</text>
              </svg>`,
        steps: [
          "1. Consigue una toalla de mano mediana y enróllala firmemente.",
          "2. Sujeta la toalla por ambos extremos con fuerza utilizando las dos manos.",
          "3. Aprieta y haz fuerza de escurrir (como si quisieras sacarle agua) girando las manos en direcciones opuestas.",
          "4. Mantén la presión máxima durante 2 o 3 segundos.",
          "5. Relaja la presión lentamente."
        ],
        params: "3 series de 12 repeticiones (Descanse 1 minuto entre series)"
      },
      {
        id: "fuerza_2",
        name: "Flexión de brazos con peso (Botellas)",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Botellas de agua estilizadas -->
                <g transform="translate(45, 60)">
                  <rect x="0" y="15" width="22" height="40" rx="4" fill="#cbd5e1" stroke="var(--primary)" stroke-width="3"/>
                  <rect x="5" y="5" width="12" height="10" fill="#94a3b8" stroke="var(--primary)" stroke-width="2"/>
                  <line x1="0" y1="28" x2="22" y2="28" stroke="var(--primary)" stroke-width="2"/>
                  <line x1="0" y1="42" x2="22" y2="42" stroke="var(--primary)" stroke-width="2"/>
                </g>
                <g transform="translate(135, 30)">
                  <rect x="0" y="15" width="22" height="40" rx="4" fill="#cbd5e1" stroke="var(--primary)" stroke-width="3"/>
                  <rect x="5" y="5" width="12" height="10" fill="#94a3b8" stroke="var(--primary)" stroke-width="2"/>
                  <line x1="0" y1="28" x2="22" y2="28" stroke="var(--primary)" stroke-width="2"/>
                  <line x1="0" y1="42" x2="22" y2="42" stroke="var(--primary)" stroke-width="2"/>
                </g>
                <!-- Flecha de movimiento hacia arriba -->
                <path d="M90 100 C 100 80, 110 80, 120 70" fill="none" stroke="var(--color-fuerza)" stroke-width="4" stroke-dasharray="4 4"/>
                <path d="M115 65 L 123 70 L 118 76" fill="var(--color-fuerza)"/>
                <!-- Dibujo brazo flexionado y extendido -->
                <path d="M30 110 L 55 90" stroke="var(--text-main)" stroke-width="8" stroke-linecap="round"/>
                <path d="M150 110 L 145 70" stroke="var(--text-main)" stroke-width="8" stroke-linecap="round"/>
                <circle cx="30" cy="110" r="5" fill="var(--color-fuerza)"/>
                <circle cx="150" cy="110" r="5" fill="var(--color-fuerza)"/>
              </svg>`,
        steps: [
          "1. Siéntese en una silla firme con la espalda recta apoyada en el respaldo.",
          "2. Sostenga una botella de agua llena (o una pequeña mancuerna) en cada mano con los brazos extendidos hacia abajo.",
          "3. Con las palmas de las manos mirando hacia arriba, doble lentamente los codos llevando el peso hacia su pecho.",
          "4. Mantenga la posición 1 segundo y baje los brazos despacio hasta la posición inicial de forma controlada."
        ],
        params: "3 series de 12 repeticiones (Descanse 1 minuto entre series)"
      },
      {
        id: "fuerza_3",
        name: "Levantamiento desde silla (Sentadilla asistida)",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Silla -->
                <path d="M60 110 L 60 70 L 100 70 M60 85 L 100 85 L 100 110 M72 85 L 72 110 M88 85 L 88 110" fill="none" stroke="var(--text-main)" stroke-width="4" stroke-linecap="round"/>
                <!-- Persona levantándose (esquema) -->
                <!-- Tronco/Pierna -->
                <path d="M90 55 L 105 50 L 110 75 L 110 110" fill="none" stroke="var(--primary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="90" cy="40" r="10" fill="var(--primary)"/>
                <!-- Flecha de levantarse -->
                <path d="M125 90 L 125 50" fill="none" stroke="var(--color-fuerza)" stroke-width="4" stroke-linecap="round"/>
                <path d="M120 60 L 125 50 L 130 60" fill="none" stroke="var(--color-fuerza)" stroke-width="4" stroke-linecap="round"/>
                <text x="135" y="75" fill="var(--color-fuerza)" font-weight="bold" font-size="10">Levantarse</text>
              </svg>`,
        steps: [
          "1. Siéntese en el tercio delantero de una silla firme, con la espalda recta y pies apoyados firmemente en el suelo.",
          "2. Cruce los brazos sobre su pecho o estírelos al frente. Si le cuesta mucho, puede apoyarse levemente en los reposabrazos.",
          "3. Inclínese un poco hacia adelante y levántese usando la fuerza de sus piernas, hasta quedar completamente de pie.",
          "4. Manténgase de pie firme 1 segundo y vuelva a sentarse de forma lenta y controlada."
        ],
        params: "3 series de 12 repeticiones (Descanse de ser necesario)"
      },
      {
        id: "fuerza_4",
        name: "Fortalecimiento en escaleras",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Escalera -->
                <path d="M30 120 L 70 120 L 70 95 L 110 95 L 110 70 L 150 70 L 150 45 L 180 45" fill="none" stroke="var(--text-main)" stroke-width="4" stroke-linecap="round"/>
                <!-- Barandilla de seguridad -->
                <path d="M30 85 L 150 10" fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round"/>
                <!-- Flechas subida y bajada -->
                <path d="M90 115 L 120 90" fill="none" stroke="var(--color-fuerza)" stroke-width="3" stroke-linecap="round"/>
                <path d="M112 90 L 120 90 L 120 98" fill="none" stroke="var(--color-fuerza)" stroke-width="3" stroke-linecap="round"/>
                <path d="M125 115 L 95 140" fill="none" stroke="var(--color-fuerza)" stroke-width="3" stroke-dasharray="3 3"/>
              </svg>`,
        steps: [
          "1. Colóquese frente al escalón más bajo de una escalera que cuente con barandilla o pasamanos firme.",
          "2. Sujétese de forma segura a la barandilla con una o ambas manos.",
          "3. Suba el primer escalón apoyando el pie izquierdo por completo, luego suba el derecho a su lado.",
          "4. Baje lentamente el pie derecho hacia el suelo, seguido por el pie izquierdo. Realice de manera alterna y continua."
        ],
        params: "3 series de 20 peldaños / pasos (Haga pausas breves si lo requiere)"
      }
    ]
  },
  equilibrio: {
    title: "Equilibrio y Coordinación",
    icon: "⚖️",
    desc: "Mejora tu estabilidad dinámica y reduce drásticamente el riesgo de tropezones y caídas.",
    items: [
      {
        id: "equilibrio_1",
        name: "Coordinación dinámica con balón/globo",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Globo flotando -->
                <circle cx="100" cy="50" r="18" fill="#f43f5e" stroke="var(--primary)" stroke-width="2"/>
                <path d="M100 68 L 98 75 L 102 75 Z" fill="var(--primary)"/>
                <path d="M100 75 Q 96 85, 100 95" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <!-- Manos listas para tocar -->
                <path d="M60 100 Q 80 90, 85 75" fill="none" stroke="var(--text-main)" stroke-width="4" stroke-linecap="round"/>
                <path d="M140 100 Q 120 90, 115 75" fill="none" stroke="var(--text-main)" stroke-width="4" stroke-linecap="round"/>
                <!-- Flechas hacia el globo -->
                <path d="M85 70 L 92 60" fill="none" stroke="var(--color-equilibrio)" stroke-width="3"/>
                <path d="M115 70 L 108 60" fill="none" stroke="var(--color-equilibrio)" stroke-width="3"/>
              </svg>`,
        steps: [
          "1. Utilice un globo inflable grande o una pelota muy blanda y liviana.",
          "2. Comience a caminar despacio en línea recta por un pasillo o habitación libre de obstáculos.",
          "3. Mientras camina, lance el globo hacia arriba suavemente e inténtelo mantener flotando dándole toques suaves pasándolo de una mano a otra.",
          "4. Mantenga la vista al frente en la medida de lo posible y asegúrese de que el trayecto esté completamente despejado."
        ],
        params: "2 series de 10 pasos continuos manteniendo el globo en el aire"
      },
      {
        id: "equilibrio_2",
        name: "Cambios de dirección (Trayecto sinuoso)",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Objetos en el suelo (conos/cajas) -->
                <polygon points="60,110 50,130 70,130" fill="var(--color-resistencia)" stroke="var(--primary)" stroke-width="2"/>
                <polygon points="140,110 130,130 150,130" fill="var(--color-resistencia)" stroke="var(--primary)" stroke-width="2"/>
                <!-- Camino en ocho (infinito) -->
                <path d="M100 120 C 65 145, 30 120, 60 90 C 85 70, 115 150, 140 130 C 170 110, 135 95, 100 120" fill="none" stroke="var(--color-equilibrio)" stroke-width="4" stroke-dasharray="6 4" stroke-linecap="round"/>
                <!-- Dirección de caminata -->
                <path d="M105 95 L 98 90 L 107 85" fill="none" stroke="var(--color-equilibrio)" stroke-width="4"/>
                <text x="100" y="50" text-anchor="middle" fill="var(--text-main)" font-weight="bold" font-size="12">Trayecto en forma de 8</text>
              </svg>`,
        steps: [
          "1. Coloque dos objetos pequeños y blandos (botellas de plástico vacías, zapatillas) en el suelo a 1 metro de distancia entre sí.",
          "2. Póngase de pie en medio de los objetos.",
          "3. Camine despacio y con pasos firmes alrededor de ellos, dibujando una trayectoria en forma de número '8' u 'ochos'.",
          "4. Si siente inestabilidad, realice este ejercicio cerca de una pared para poder apoyarse de ser necesario."
        ],
        params: "3 series de 2 vueltas completas (8s) en cada sentido"
      }
    ]
  },
  resistencia: {
    title: "Resistencia Aeróbica",
    icon: "🏃",
    desc: "Fortalece tu corazón, mejora tu capacidad pulmonar y te llena de vitalidad diaria.",
    items: [
      {
        id: "resistencia_1",
        name: "Caminata activa diaria",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Camino / Sendero horizontal -->
                <path d="M10 120 L 190 120" stroke="var(--text-muted)" stroke-width="4" stroke-linecap="round"/>
                <!-- Sol representativo del exterior -->
                <circle cx="160" cy="40" r="14" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
                <!-- Zapatillas/Pies en movimiento -->
                <g stroke="var(--primary)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M60 120 L 80 90 L 95 120" />
                  <path d="M110 120 L 120 95 L 140 100" />
                </g>
                <!-- Flecha de avance continuo -->
                <path d="M40 70 L 140 70" fill="none" stroke="var(--color-resistencia)" stroke-width="4" stroke-linecap="round"/>
                <path d="M130 63 L 140 70 L 130 77" fill="none" stroke="var(--color-resistencia)" stroke-width="4" stroke-linecap="round"/>
                <text x="90" y="55" fill="var(--color-resistencia)" font-weight="bold" font-size="11">Paso Constante</text>
              </svg>`,
        steps: [
          "1. Salga a caminar en un espacio plano y seguro (un parque o calle despejada). Use calzado cómodo y cerrado.",
          "2. Camine mirando hacia el frente de forma erguida, apoyando firmemente primero el talón del pie y luego la punta.",
          "3. Mantenga un ritmo constante que le permita entablar una conversación, pero que al mismo tiempo le exija un esfuerzo físico leve a moderado.",
          "4. Si siente fatiga extrema, deténgase inmediatamente y descanse en un banco."
        ],
        params: "Semana 1-6: 2 series de 20 minutos con descanso intermedio. Semana 7 en adelante: 30-45 minutos continuos."
      }
    ]
  },
  flexibilidad: {
    title: "Flexibilidad y Movilidad",
    icon: "🧘",
    desc: "Mantiene tus articulaciones ágiles, reduce la rigidez muscular y mejora tu postura.",
    items: [
      {
        id: "flexibilidad_1",
        name: "Estiramiento vertical (Tren superior)",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Cuerpo simplificado estirando brazos -->
                <circle cx="100" cy="80" r="10" fill="var(--primary)"/>
                <path d="M100 90 L 100 130" stroke="var(--primary)" stroke-width="6" stroke-linecap="round"/>
                <!-- Brazos apuntando completamente hacia arriba -->
                <path d="M90 105 L 85 40 L 95 30" fill="none" stroke="var(--color-flexibilidad)" stroke-width="5" stroke-linecap="round"/>
                <path d="M110 105 L 115 40 L 105 30" fill="none" stroke="var(--color-flexibilidad)" stroke-width="5" stroke-linecap="round"/>
                <!-- Flechas hacia el techo -->
                <path d="M75 50 L 75 25" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3" stroke-linecap="round"/>
                <path d="M70 35 L 75 25 L 80 35" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3" stroke-linecap="round"/>
                <path d="M125 50 L 125 25" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3" stroke-linecap="round"/>
                <path d="M120 35 L 125 25 L 130 35" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3" stroke-linecap="round"/>
              </svg>`,
        steps: [
          "1. Puede realizar este ejercicio sentado firmemente en su silla o de pie.",
          "2. Entrelace los dedos de ambas manos firmemente frente a su pecho.",
          "3. Gire las palmas hacia afuera y suba los brazos despacio por encima de la cabeza, como si quisiera empujar el techo.",
          "4. Estire los brazos lo máximo que le sea posible sin sentir dolor ni molestias.",
          "5. Mantenga la posición estirada respirando normalmente durante 10-12 segundos y baje los brazos con calma."
        ],
        params: "3 series de 3 repeticiones duraderas (Mantener estirado 10-12 segundos)"
      },
      {
        id: "flexibilidad_2",
        name: "Movilidad de piernas en silla",
        svg: `<svg viewBox="0 0 200 150" class="exercise-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Silla firme -->
                <path d="M60 110 L 60 70 L 90 70 M60 85 L 90 85 L 90 110" fill="none" stroke="var(--text-main)" stroke-width="4" stroke-linecap="round"/>
                <!-- Persona sentada estirando una pierna -->
                <!-- Cuerpo y pierna doblada -->
                <path d="M85 55 L 85 85 L 75 110" fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round"/>
                <circle cx="85" cy="40" r="10" fill="var(--primary)"/>
                <!-- Pierna estirada apoyando talón -->
                <path d="M85 85 L 130 98 L 135 110" fill="none" stroke="var(--color-flexibilidad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="125" y1="110" x2="145" y2="110" stroke="var(--text-main)" stroke-width="3"/>
                <!-- Flecha de inclinación leve del tronco -->
                <path d="M98 45 C 105 50, 110 60, 112 70" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3" stroke-linecap="round"/>
                <path d="M106 68 L 112 70 L 114 62" fill="none" stroke="var(--color-flexibilidad)" stroke-width="3"/>
              </svg>`,
        steps: [
          "1. Siéntese en el borde frontal de una silla firme.",
          "2. Estire completamente la pierna derecha hacia el frente, apoyando únicamente el talón en el suelo con los dedos del pie apuntando hacia arriba.",
          "3. Apoye ambas manos sobre el muslo o rodilla de la pierna contraria (que está doblada).",
          "4. Con la espalda recta, incline el pecho ligeramente hacia adelante desde la cadera hasta sentir una tensión suave pero cómoda en la parte de atrás de la pierna estirada.",
          "5. Mantenga la tensión relajada de 10-12 segundos y repita alternando las piernas."
        ],
        params: "3 series de 6 repeticiones totales alternando piernas (10-12 segundos de estiramiento por vez)"
      }
    ]
  }
};

// --- Variables y Estado Global de la App (Single Source of Truth) ---
let appState = {
  disclaimerAccepted: true,
  fontSizeScale: 1.15, // Empieza en 1.15 (Gran tamaño predeterminado)
  highContrast: false,
  currentScreen: 'home',
  activeCategory: null,
  diary: {}
};

// --- Estado del Asistente de Entrenamiento Activo ---
let assistantInterval = null;
let assistantState = {
  exId: null,
  category: null,
  currentSeries: 1,
  currentRep: 1,
  phase: 'prestart', // 'prestart', 'concentric', 'eccentric', 'rep_rest', 'series_rest', 'aerobic'
  repetitionSec: 0,
  secondsRemaining: 3,
  isPaused: false
};

// --- Carga Inicial y Configuración (window.onload) ---
window.onload = function() {
  console.log("¡Cargando Fuerza y Equilibrio!");
  
  // 1. Inicializar la base de datos del Diario para las 12 Semanas
  try {
    initDiaryData();
  } catch (e) {
    console.error("Error al inicializar datos del diario:", e);
  }
  
  // 2. Cargar estado persistente desde localStorage
  try {
    loadStateFromStorage();
  } catch (e) {
    console.error("Error al cargar estado desde storage:", e);
  }
  
  // 3. Aplicar configuraciones cargadas de accesibilidad
  try {
    applyAccessibilitySettings();
  } catch (e) {
    console.error("Error al aplicar configuración de accesibilidad:", e);
  }
  
  // 4. Inicializar la firma digital y los datos personales
  try {
    initSignaturePad();
  } catch (e) {
    console.error("Error al inicializar panel de firma:", e);
  }
  try {
    loadPersonalData();
  } catch (e) {
    console.error("Error al cargar datos personales:", e);
  }
  
  // 5. Generar la interfaz del Diario Dinámicamente
  try {
    renderDiaryUI();
  } catch (e) {
    console.error("Error al renderizar la UI del diario:", e);
  }
  
  // 6. Verificar y renderizar el certificado de finalización si procede
  try {
    checkAndRenderCertificate();
  } catch (e) {
    console.error("Error al verificar certificado:", e);
  }
  
  // 7. Enrutar directamente a la pantalla de inicio (RUTINAS DE MOVIMIENTO)
  try {
    navigateTo('home');
  } catch (e) {
    console.error("Error al enrutar pantalla inicial:", e);
    // Fallback de emergencia
    const home = document.getElementById('home-screen');
    if (home) home.classList.add('active');
  }

  // 8. Registrar el Service Worker de forma segura
  try {
    registerServiceWorker();
  } catch (e) {
    console.error("Error al registrar Service Worker:", e);
  }
  
  // 9. Enlazar eventos de clics generales
  try {
    bindGlobalEvents();
  } catch (e) {
    console.error("Error al enlazar eventos globales:", e);
  }
};

// --- inicializar estructura de datos del Diario (12 semanas) ---
function initDiaryData() {
  for (let i = 1; i <= 12; i++) {
    const weekKey = `week_${i}`;
    appState.diary[weekKey] = {
      sessions: [false, false, false, false, false],
      borg: null // 'suave', 'moderado', 'intenso'
    };
  }
}

// --- Carga de localStorage ---
function loadStateFromStorage() {
  const savedState = safeStorage.getItem('guia_activa_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      
      // Combinar estado guardado
      appState.disclaimerAccepted = true;
      appState.fontSizeScale = parsed.fontSizeScale || 1.15;
      appState.highContrast = parsed.highContrast || false;
      
      if (parsed.diary) {
        // Asegurar la consistencia del diario y migración al formato hexagonal de 5 sesiones
        Object.keys(parsed.diary).forEach(weekKey => {
          const oldWeek = parsed.diary[weekKey];
          let newSessions = [false, false, false, false, false];
          
          if (oldWeek.sessions && Array.isArray(oldWeek.sessions)) {
            newSessions = oldWeek.sessions;
          } else {
            // Migrar del formato binario viejo
            if (oldWeek.circuito) {
              newSessions[0] = true;
              newSessions[2] = true;
              newSessions[4] = true;
            }
            if (oldWeek.caminata) {
              newSessions[1] = true;
              newSessions[3] = true;
            }
          }
          
          appState.diary[weekKey] = {
            sessions: newSessions,
            borg: oldWeek.borg !== undefined ? oldWeek.borg : null
          };
        });
      }
      console.log("Estado local y diario hexagonal cargados y migrados con éxito.");
    } catch (e) {
      console.error("Error al leer el estado local, usando valores por defecto.", e);
    }
  }
}

// --- Guardado en localStorage ---
function saveStateToStorage() {
  try {
    safeStorage.setItem('guia_activa_state', JSON.stringify(appState));
  } catch (e) {
    console.warn("No se pudo guardar el estado en localStorage (modo privado, incognito o sin espacio):", e);
  }
}

// --- Registro seguro de Service Worker para soporte Offline ---
function registerServiceWorker() {
  // Solo registrar si está disponible y no se ejecuta directamente desde file:// (protocolo local)
  if ('serviceWorker' in navigator) {
    if (window.location.protocol !== 'file:') {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('Service Worker registrado con éxito. Ámbito:', reg.scope);
          
          // Escuchar si hay una actualización disponible en segundo plano
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('Nueva versión disponible. Recargando de forma transparente para aplicar cambios...');
                    window.location.reload();
                  }
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('Error al registrar el Service Worker:', err);
        });
        
      // Escuchar cuando el nuevo Service Worker toma el control y recargar la página
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    } else {
      console.log('Ejecutando en modo local (file://). El soporte offline de PWA requiere servidor http (node server.js).');
    }
  }
}

// --- Navegación SPA ---
function navigateTo(screenId) {
  appState.currentScreen = screenId;
  
  // Ocultar todas las pantallas
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  
  // Detener voz si cambia de pantalla
  stopSpeaking();
  if (screenId !== 'assistant') {
    cleanupWorkoutAssistant();
  }
  
  // Mostrar la pantalla correspondiente
  const targetScreen = document.getElementById(`${screenId}-screen`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
  
  // Actualizar el menú de navegación inferior
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const action = item.getAttribute('onclick');
    if (action && action.includes(`'${screenId}'`)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mostrar u ocultar la cabecera persistente de forma segura
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-nav');
  if (header) {
    header.style.display = (screenId === 'welcome') ? 'none' : 'flex';
  }
  if (footer) {
    footer.style.display = (screenId === 'welcome') ? 'none' : 'flex';
  }

  // Scroll hacia arriba de forma segura
  try {
    window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (e) {
    window.scrollTo(0, 0);
  }
}

// --- Gestión de Accesibilidad (Fuentes y Contraste) ---
function applyAccessibilitySettings() {
  // Aplicar escala de fuente
  document.documentElement.style.setProperty('--font-scale', appState.fontSizeScale);
  
  // Aplicar modo contraste
  const body = document.body;
  const contrastToggleBtn = document.getElementById('contrast-toggle-btn');
  if (appState.highContrast) {
    body.classList.add('theme-high-contrast');
    if (contrastToggleBtn) contrastToggleBtn.innerText = '☀️';
  } else {
    body.classList.remove('theme-high-contrast');
    if (contrastToggleBtn) contrastToggleBtn.innerText = '👁️';
  }
}

function adjustFontSize(direction) {
  if (direction === 'increase') {
    if (appState.fontSizeScale < 1.45) {
      appState.fontSizeScale += 0.08;
    }
  } else if (direction === 'decrease') {
    if (appState.fontSizeScale > 0.95) {
      appState.fontSizeScale -= 0.08;
    }
  }
  applyAccessibilitySettings();
  saveStateToStorage();
  
  // Vibrar al cambiar fuente
  triggerVibration(15);
}

function toggleHighContrast() {
  appState.highContrast = !appState.highContrast;
  applyAccessibilitySettings();
  saveStateToStorage();
  
  // Vibrar
  triggerVibration(25);
}

// --- Vibración háptica táctil segura ---
function triggerVibration(pattern) {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignorar fallos de seguridad o políticas
    }
  }
}

// --- Aceptación de Disclaimer ---
function acceptDisclaimer() {
  appState.disclaimerAccepted = true;
  saveStateToStorage();
  triggerVibration(50);
  navigateTo('home');
}

// --- Selección de Categoría y Carga de Ejercicios ---
function selectCategory(catId) {
  appState.activeCategory = catId;
  appState.activeExerciseIndex = 0; // Iniciar en el primer ejercicio
  
  const categoryData = EXERCISES_DATABASE[catId];
  if (!categoryData) return;
  
  // Modificar título e icono en el encabezado de la pantalla
  document.getElementById('exercises-cat-icon').innerText = categoryData.icon;
  document.getElementById('exercises-cat-title').innerText = categoryData.title;
  
  // Renderizar la interfaz del ejercicio activo actual
  renderActiveExercise();
  
  navigateTo('exercises');
  triggerVibration(30);
}

// Renderiza el ejercicio activo según appState.activeExerciseIndex
function renderActiveExercise() {
  const catId = appState.activeCategory;
  const categoryData = EXERCISES_DATABASE[catId];
  if (!categoryData) return;
  
  const idx = appState.activeExerciseIndex;
  const ex = categoryData.items[idx];
  if (!ex) return;
  
  // 1. Título del Ejercicio
  document.getElementById('active-exercise-title').innerText = ex.name;
  
  // 2. Imagen/Ilustración SVG
  document.getElementById('active-exercise-svg-box').innerHTML = ex.svg;
  
  // 3. Pasos/Instrucciones
  const stepsHtml = ex.steps.map(step => `<p class="instruction-step">${step}</p>`).join('');
  document.getElementById('active-exercise-steps').innerHTML = stepsHtml;
  
  // 4. Parámetros Recomendados
  document.getElementById('active-exercise-params').innerHTML = `📋 Recomendado: ${ex.params}`;
  
  // 5. Barra de Paginación Superior
  const total = categoryData.items.length;
  document.getElementById('exercise-pagination-info').innerText = `Ejercicio ${idx + 1} de ${total}`;
  
  // Controlar deshabilitado de botones en los extremos
  const btnPrev = document.getElementById('btn-prev-exercise');
  const btnNext = document.getElementById('btn-next-exercise');
  
  if (idx === 0) {
    btnPrev.disabled = true;
    btnPrev.style.opacity = '0.4';
    btnPrev.style.cursor = 'not-allowed';
  } else {
    btnPrev.disabled = false;
    btnPrev.style.opacity = '1';
    btnPrev.style.cursor = 'pointer';
  }
  
  if (idx === total - 1) {
    btnNext.disabled = true;
    btnNext.style.opacity = '0.4';
    btnNext.style.cursor = 'not-allowed';
  } else {
    btnNext.disabled = false;
    btnNext.style.opacity = '1';
    btnNext.style.cursor = 'pointer';
  }
  
  // 6. Asegurar que el acordeón empiece cerrado
  const panel = document.getElementById('active-exercise-instructions-panel');
  const toggleBtn = document.getElementById('btn-toggle-instructions');
  if (panel && toggleBtn) {
    panel.style.display = 'none';
    toggleBtn.innerText = '📖 Leer instrucciones';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
  
  // 7. Detener lectura de voz previa
  stopSpeaking();
}

// Navega entre los ejercicios de la categoría actual
function navigateActiveExercise(direction) {
  const catId = appState.activeCategory;
  const categoryData = EXERCISES_DATABASE[catId];
  if (!categoryData) return;
  
  const newIdx = appState.activeExerciseIndex + direction;
  if (newIdx >= 0 && newIdx < categoryData.items.length) {
    appState.activeExerciseIndex = newIdx;
    renderActiveExercise();
    triggerVibration(25);
  }
}

// Controla el estado del acordeón de instrucciones
function toggleInstructionsAccordion() {
  const panel = document.getElementById('active-exercise-instructions-panel');
  const toggleBtn = document.getElementById('btn-toggle-instructions');
  if (!panel || !toggleBtn) return;
  
  const isOpen = panel.style.display === 'block';
  
  if (isOpen) {
    panel.style.display = 'none';
    toggleBtn.innerText = '📖 Leer instrucciones';
    toggleBtn.setAttribute('aria-expanded', 'false');
    triggerVibration(15);
  } else {
    panel.style.display = 'block';
    toggleBtn.innerText = '✕ Cerrar instrucciones';
    toggleBtn.setAttribute('aria-expanded', 'true');
    triggerVibration(25);
  }
}

// Inicia el Asistente Activo para el ejercicio actual
function startActiveExerciseAssistant() {
  const catId = appState.activeCategory;
  const categoryData = EXERCISES_DATABASE[catId];
  if (!categoryData) return;
  
  const ex = categoryData.items[appState.activeExerciseIndex];
  if (!ex) return;
  
  startWorkoutAssistant(ex.id);
}

// Lee en voz alta las instrucciones del ejercicio actual
function readActiveExerciseAloud() {
  const catId = appState.activeCategory;
  const categoryData = EXERCISES_DATABASE[catId];
  if (!categoryData) return;
  
  const ex = categoryData.items[appState.activeExerciseIndex];
  if (!ex) return;
  
  readExerciseAloud(ex.id);
}

// --- Text-To-Speech (Síntesis de Voz Offline) ---
let currentUtterance = null;
let currentSpeakingId = null;

function readExerciseAloud(exId) {
  const btn = document.getElementById('btn-active-speech') || document.getElementById(`speech-btn-${exId}`);
  
  // Si ya se está hablando este ejercicio, detenerlo
  if (window.speechSynthesis.speaking && currentSpeakingId === exId) {
    stopSpeaking();
    return;
  }
  
  // Detener previo si existiera
  stopSpeaking();
  
  // Buscar datos del ejercicio
  const categoryData = EXERCISES_DATABASE[appState.activeCategory];
  if (!categoryData) return;
  
  const ex = categoryData.items.find(item => item.id === exId);
  if (!ex) return;
  
  // Armar texto descriptivo para lectura adaptado a personas mayores
  let textToRead = `Ejercicio. ${ex.name}. `;
  textToRead += "Instrucciones de realización. ";
  ex.steps.forEach(step => {
    // Quitar números del inicio para leer con pausa natural
    textToRead += step.replace(/^\d+\.\s*/, "") + ". ";
  });
  textToRead += `Recomendación de entrenamiento. ${ex.params}.`;

  // Configurar Síntesis de voz
  currentUtterance = new SpeechSynthesisUtterance(textToRead);
  currentUtterance.lang = 'es-ES'; // Forzar Español
  
  // Intentar seleccionar la voz en Español preferida disponible offline
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
    if (spanishVoice) {
      currentUtterance.voice = spanishVoice;
    }
  }

  currentUtterance.rate = 0.95; // Velocidad ligeramente pausada para personas mayores
  currentUtterance.pitch = 1.05; // Tono ligeramente alto para mejor audición

  // Eventos de estado de la voz
  currentUtterance.onstart = function() {
    currentSpeakingId = exId;
    if (btn) {
      btn.classList.add('speaking');
      btn.innerHTML = '🛑 Detener';
      if (appState.highContrast) {
        btn.style.borderColor = '#ff0000';
        btn.style.color = '#ff0000';
      }
    }
  };

  currentUtterance.onend = function() {
    resetSpeechButton(exId);
    currentSpeakingId = null;
    currentUtterance = null;
  };

  currentUtterance.onerror = function() {
    resetSpeechButton(exId);
    currentSpeakingId = null;
    currentUtterance = null;
  };

  window.speechSynthesis.speak(currentUtterance);
  triggerVibration(20);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentSpeakingId) {
    resetSpeechButton(currentSpeakingId);
  }
  currentSpeakingId = null;
  currentUtterance = null;
}

function resetSpeechButton(exId) {
  const btn = document.getElementById('btn-active-speech') || document.getElementById(`speech-btn-${exId}`);
  if (btn) {
    btn.classList.remove('speaking');
    btn.innerHTML = '🔊 Escuchar';
    if (appState.highContrast) {
      btn.style.borderColor = '#00ff00';
      btn.style.color = '#00ff00';
    } else {
      btn.removeAttribute('style');
    }
  }
}

// Cargar voces en caché del navegador (algunos navegadores las cargan de forma asíncrona)
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = function() {
    console.log("Voces de síntesis cargadas:", window.speechSynthesis.getVoices().length);
  };
}

// ==========================================================================
   // --- GENERADOR DINÁMICO E INTERACTIVIDAD DEL DIARIO ---
// ==========================================================================

function renderDiaryUI() {
  const container = document.getElementById('weeks-accordion-container');
  if (!container) return;
  container.innerHTML = ''; // Limpiar previo
  
  for (let w = 1; w <= 12; w++) {
    const weekKey = `week_${w}`;
    if (!appState.diary[weekKey]) {
      appState.diary[weekKey] = {
        sessions: [false, false, false, false, false],
        borg: null
      };
    }
    const wData = appState.diary[weekKey];
    
    // Comprobar si la semana está completada por entero
    const isWeekCompleted = wData.sessions && wData.sessions.every(s => s === true) && wData.borg !== null;
    
    const weekDiv = document.createElement('div');
    weekDiv.id = `week-row-${w}`;
    weekDiv.className = `week-row ${isWeekCompleted ? 'completed' : ''}`;
    
    // Obtener texto o emoji de Borg para el resumen
    let borgIndicator = '';
    if (wData.borg === 'suave') borgIndicator = '🙂';
    if (wData.borg === 'moderado') borgIndicator = '😐';
    if (wData.borg === 'intenso') borgIndicator = '🙁';

    // Generar los 5 hexágonos
    let hexagonsHtml = '';
    const sessionTypes = ['rueda', 'andar', 'rueda', 'andar', 'rueda'];
    const sessionIcons = ['⚙️', '🚶', '⚙️', '🚶', '⚙️'];
    const sessionNames = ['RUEDA', 'ANDAR', 'RUEDA', 'ANDAR', 'RUEDA'];
    
    for (let s = 0; s < 5; s++) {
      const type = sessionTypes[s];
      const icon = sessionIcons[s];
      const name = sessionNames[s];
      const isActive = wData.sessions && wData.sessions[s];
      
      hexagonsHtml += `
        <div class="hexagon-container">
          <button class="hexagon-btn ${type} ${isActive ? 'active' : ''}" 
                  id="btn-hex-${w}-${s}" 
                  onclick="toggleDiaryHexagon(${w}, ${s})"
                  aria-label="Semana ${w}, Sesión ${s + 1} (${name}) - ${isActive ? 'Completada' : 'Pendiente'}"
                  title="Sesión ${s + 1}: ${name}">
            <div class="hexagon-inner">
              <span class="hex-icon">${icon}</span>
              <span>S${s + 1}</span>
              <span class="check-mark">✓</span>
            </div>
          </button>
          <span class="hexagon-label">${name}</span>
        </div>
      `;
    }

    weekDiv.innerHTML = `
      <div class="week-header" onclick="toggleWeekAccordion(${w})">
        <div class="week-title-area">
          <span class="week-badge">Semana ${w}</span>
          <span class="week-status-indicator" id="week-status-icon-${w}">
            ${isWeekCompleted ? '✅ Completa' : (wData.sessions && wData.sessions.some(s => s === true) ? '🟡 En curso' : '💤 Sin empezar')}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.4rem;" id="week-borg-summary-${w}">${borgIndicator}</span>
          <span class="week-indicator-arrow" id="week-arrow-${w}">▶</span>
        </div>
      </div>
      
      <div class="week-details" id="week-details-${w}">
        <p style="font-size: var(--text-sm); font-weight: bold; color: var(--text-muted); text-align: center; margin-bottom: 8px;">
          Registra tus progresos para esta semana:
        </p>
        
        <!-- Fila de hexágonos oficiales -->
        <div class="hexagon-row">
          ${hexagonsHtml}
        </div>
        
        <!-- Escala de Borg -->
        <div class="borg-container">
          <span class="borg-label">¿Cómo calificarías tu esfuerzo esta semana?</span>
          <div class="borg-scale-grid">
            <button class="btn-borg ${wData.borg === 'suave' ? 'active' : ''}" 
                    data-borg="suave" 
                    id="btn-borg-${w}-suave"
                    onclick="selectBorgScale(${w}, 'suave')">
              <span class="btn-borg-emoji">🙂</span>
              <span class="btn-borg-text">Suave / Muy fácil</span>
            </button>
            <button class="btn-borg ${wData.borg === 'moderado' ? 'active' : ''}" 
                    data-borg="moderado" 
                    id="btn-borg-${w}-moderado"
                    onclick="selectBorgScale(${w}, 'moderado')">
              <span class="btn-borg-emoji">😐</span>
              <span class="btn-borg-text">Fuerte / Un poco duro</span>
            </button>
            <button class="btn-borg ${wData.borg === 'intenso' ? 'active' : ''}" 
                    data-borg="intenso" 
                    id="btn-borg-${w}-intenso"
                    onclick="selectBorgScale(${w}, 'intenso')">
              <span class="btn-borg-emoji">🙁</span>
              <span class="btn-borg-text">Muy fuerte / Muy duro</span>
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(weekDiv);
  }
}

// Abrir y cerrar secciones del acordeón
function toggleWeekAccordion(weekNumber) {
  const row = document.getElementById(`week-row-${weekNumber}`);
  if (!row) return;
  const isOpen = row.classList.contains('open');
  
  // Cerrar todos los acordeones
  const allRows = document.querySelectorAll('.week-row');
  allRows.forEach(r => r.classList.remove('open'));
  
  // Si estaba cerrado, abrir el actual
  if (!isOpen) {
    row.classList.add('open');
    triggerVibration(20);
  } else {
    triggerVibration(10);
  }
}

// Marcar tareas individuales del diario (Hexagonales)
function toggleDiaryHexagon(weekNumber, sessionIndex) {
  const weekKey = `week_${weekNumber}`;
  if (!appState.diary[weekKey]) {
    appState.diary[weekKey] = {
      sessions: [false, false, false, false, false],
      borg: null
    };
  }
  const wData = appState.diary[weekKey];
  
  if (!wData.sessions) {
    wData.sessions = [false, false, false, false, false];
  }
  
  // Cambiar estado
  wData.sessions[sessionIndex] = !wData.sessions[sessionIndex];
  
  // Actualizar UI del botón
  const btn = document.getElementById(`btn-hex-${weekNumber}-${sessionIndex}`);
  if (btn) {
    if (wData.sessions[sessionIndex]) {
      btn.classList.add('active');
      triggerVibration([30, 20, 30]); // Doble pulso vibración por completar
    } else {
      btn.classList.remove('active');
      triggerVibration(15);
    }
  }
  
  updateWeekCompletionStatus(weekNumber);
  saveStateToStorage();
  checkAndRenderCertificate(); // Verificar si se completó el programa para mostrar diploma
}

// Seleccionar escala de Borg
function selectBorgScale(weekNumber, borgValue) {
  const weekKey = `week_${weekNumber}`;
  if (!appState.diary[weekKey]) {
    appState.diary[weekKey] = {
      sessions: [false, false, false, false, false],
      borg: null
    };
  }
  const wData = appState.diary[weekKey];
  
  // Si presiona el mismo activo, lo deselecciona
  if (wData.borg === borgValue) {
    wData.borg = null;
  } else {
    wData.borg = borgValue;
  }
  
  // Actualizar botones de Borg en UI
  const scales = ['suave', 'moderado', 'intenso'];
  scales.forEach(s => {
    const btn = document.getElementById(`btn-borg-${weekNumber}-${s}`);
    if (btn) {
      if (wData.borg === s) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
  
  updateWeekCompletionStatus(weekNumber);
  saveStateToStorage();
  checkAndRenderCertificate(); // Verificar si se completó el programa
  triggerVibration(25);
}

// Actualizar estados visuales de la fila al momento de cambios
function updateWeekCompletionStatus(weekNumber) {
  const weekKey = `week_${weekNumber}`;
  if (!appState.diary[weekKey]) {
    appState.diary[weekKey] = {
      sessions: [false, false, false, false, false],
      borg: null
    };
  }
  const wData = appState.diary[weekKey];
  const row = document.getElementById(`week-row-${weekNumber}`);
  if (!row) return;
  const statusIconText = document.getElementById(`week-status-icon-${weekNumber}`);
  const summaryBorg = document.getElementById(`week-borg-summary-${weekNumber}`);
  
  if (!wData.sessions) {
    wData.sessions = [false, false, false, false, false];
  }
  
  // Comprobar completitud
  const isCompleted = wData.sessions.every(s => s === true) && wData.borg !== null;
  const isStarted = wData.sessions.some(s => s === true) || wData.borg !== null;
  
  if (isCompleted) {
    row.classList.add('completed');
    if (statusIconText) {
      statusIconText.innerText = '✅ Completa';
      statusIconText.style.color = 'var(--success)';
    }
  } else {
    row.classList.remove('completed');
    if (statusIconText) {
      statusIconText.removeAttribute('style');
      if (isStarted) {
        statusIconText.innerText = '🟡 En curso';
      } else {
        statusIconText.innerText = '💤 Sin empezar';
      }
    }
  }
  
  // Actualizar icono de Borg en el resumen
  if (summaryBorg) {
    let emoji = '';
    if (wData.borg === 'suave') emoji = '🙂';
    if (wData.borg === 'moderado') emoji = '😐';
    if (wData.borg === 'intenso') emoji = '🙁';
    summaryBorg.innerText = emoji;
  }
}

// ==========================================================================
// --- REINICIAR DIARIO (CON CONTROL DE SEGURIDAD) ---
// ==========================================================================

function showResetConfirmation() {
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.classList.add('active');
  }
  triggerVibration([40, 40, 40]);
}

function hideResetConfirmation() {
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  triggerVibration(15);
}

function executeDiaryReset() {
  // Inicializar estado limpio del diario
  initDiaryData();
  saveStateToStorage();
  
  // Renderizar de nuevo y cerrar
  renderDiaryUI();
  checkAndRenderCertificate(); // Ocultar certificado al reiniciar
  hideResetConfirmation();
  triggerVibration(100); // Vibración larga indicando reseteo exitoso
  
  // Alerta sonora por voz si habilitada
  if ('speechSynthesis' in window) {
    const resetUtterance = new SpeechSynthesisUtterance("Tu diario de entrenamiento ha sido reiniciado. Todo listo para empezar de nuevo.");
    resetUtterance.lang = 'es-ES';
    window.speechSynthesis.speak(resetUtterance);
  }
}

// --- Vinculación de Eventos Generales ---
function bindGlobalEvents() {
  // Manejador del modal de reseteo para cerrarlo al hacer clic fuera del card
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideResetConfirmation();
      }
    });
  }
}

/* ==========================================================================
   --- CONTROL DE FIRMA DIGITAL Y DATOS PERSONALES DEL PASAPORTE ---
   ========================================================================== */

let isDrawing = false;
let sigCtx = null;
let lastX = 0;
let lastY = 0;
let hasSigned = false;

function initSignaturePad() {
  const canvas = document.getElementById('signature-pad');
  if (!canvas) return;
  
  sigCtx = canvas.getContext('2d');
  
  // Adaptar dimensiones y configurar pincel
  resizeSignatureCanvas();
  
  // Manejadores de Mouse
  canvas.addEventListener('mousedown', startDrawingSig);
  canvas.addEventListener('mousemove', drawSig);
  canvas.addEventListener('mouseup', stopDrawingSig);
  canvas.addEventListener('mouseleave', stopDrawingSig);
  
  // Manejadores de Touch (Móviles y Tablets)
  canvas.addEventListener('touchstart', startDrawingTouchSig, { passive: false });
  canvas.addEventListener('touchmove', drawTouchSig, { passive: false });
  canvas.addEventListener('touchend', stopDrawingSig);
  canvas.addEventListener('touchcancel', stopDrawingSig);
  
  // Escuchar cambio de tamaño de pantalla de forma responsiva
  window.addEventListener('resize', resizeSignatureCanvas);
}

function resizeSignatureCanvas() {
  const canvas = document.getElementById('signature-pad');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  
  // Evitar reseteos continuos si el tamaño físico real no ha cambiado
  if (canvas.width === rect.width && canvas.height === rect.height) {
    return;
  }
  
  // Capturar firma actual antes del cambio de ancho/alto para no borrarla
  let tempImage = null;
  if (hasSigned) {
    tempImage = canvas.toDataURL();
  }
  
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  // Re-inicializar el contexto y estilos del lápiz de firma tras redimensionar
  sigCtx = canvas.getContext('2d');
  if (!sigCtx) return;
  sigCtx.strokeStyle = appState.highContrast ? '#52b788' : '#1b2e24';
  sigCtx.lineWidth = 3.5;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';
  
  // Restaurar firma si existía
  if (hasSigned && tempImage) {
    const img = new Image();
    img.onload = function() {
      sigCtx.drawImage(img, 0, 0);
    };
    img.src = tempImage;
    const placeholder = document.getElementById('sig-placeholder');
    if (placeholder) placeholder.style.display = 'none';
  } else {
    const placeholder = document.getElementById('sig-placeholder');
    if (placeholder) placeholder.style.display = 'block';
  }
}

function startDrawingSig(e) {
  isDrawing = true;
  const rect = e.target.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
  
  const placeholder = document.getElementById('sig-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  
  triggerVibration(10);
}

function startDrawingTouchSig(e) {
  e.preventDefault();
  isDrawing = true;
  const rect = e.target.getBoundingClientRect();
  if (e.touches && e.touches[0]) {
    lastX = e.touches[0].clientX - rect.left;
    lastY = e.touches[0].clientY - rect.top;
  }
  
  const placeholder = document.getElementById('sig-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  
  triggerVibration(10);
}

function drawSig(e) {
  if (!isDrawing) return;
  const rect = e.target.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;
  
  drawStroke(currentX, currentY);
}

function drawTouchSig(e) {
  e.preventDefault();
  if (!isDrawing || !e.touches || !e.touches[0]) return;
  const rect = e.target.getBoundingClientRect();
  const currentX = e.touches[0].clientX - rect.left;
  const currentY = e.touches[0].clientY - rect.top;
  
  drawStroke(currentX, currentY);
}

function drawStroke(x, y) {
  if (!sigCtx) return;
  sigCtx.beginPath();
  sigCtx.moveTo(lastX, lastY);
  sigCtx.lineTo(x, y);
  sigCtx.stroke();
  
  lastX = x;
  lastY = y;
  hasSigned = true;
  
  // Guardar firma automáticamente
  savePersonalData();
}

function stopDrawingSig() {
  isDrawing = false;
}

function clearSignatureCanvas() {
  const canvas = document.getElementById('signature-pad');
  if (!canvas || !sigCtx) return;
  
  sigCtx.clearRect(0, 0, canvas.width, canvas.height);
  hasSigned = false;
  
  const placeholder = document.getElementById('sig-placeholder');
  if (placeholder) placeholder.style.display = 'block';
  
  savePersonalData();
  triggerVibration(15);
}

function savePersonalData() {
  const name = document.getElementById('profile-name').value;
  const age = document.getElementById('profile-age').value;
  const surname = document.getElementById('profile-surname').value;
  
  let signatureData = '';
  if (hasSigned) {
    const canvas = document.getElementById('signature-pad');
    if (canvas) {
      signatureData = canvas.toDataURL();
    }
  }
  
  const personalData = {
    name,
    age,
    surname,
    signature: signatureData,
    hasSigned
  };
  
  try {
    safeStorage.setItem('fuerza_equilibrio_personal_data', JSON.stringify(personalData));
  } catch (e) {
    console.warn("No se pudo guardar los datos personales en localStorage:", e);
  }
  
  // Actualizar el certificado de logro en tiempo real por si cambia la firma o el nombre
  checkAndRenderCertificate();
}
 
function loadPersonalData() {
  let saved = safeStorage.getItem('fuerza_equilibrio_personal_data');
  if (!saved) {
    saved = safeStorage.getItem('vivifrail_personal_data');
    if (saved) {
      // Migrar del formato y clave vieja de forma segura y transparente
      try {
        safeStorage.setItem('fuerza_equilibrio_personal_data', saved);
        safeStorage.removeItem('vivifrail_personal_data');
      } catch (e) {
        console.warn("No se pudo realizar la migración de datos personales en localStorage:", e);
      }
    }
  }
  
  if (saved) {
    try {
      const data = JSON.parse(saved);
      document.getElementById('profile-name').value = data.name || '';
      document.getElementById('profile-age').value = data.age || '';
      document.getElementById('profile-surname').value = data.surname || '';
      hasSigned = data.hasSigned || false;
      
      if (data.signature && hasSigned) {
        const canvas = document.getElementById('signature-pad');
        const placeholder = document.getElementById('sig-placeholder');
        if (canvas) {
          const img = new Image();
          img.onload = function() {
            if (placeholder) placeholder.style.display = 'none';
            sigCtx = canvas.getContext('2d');
            if (sigCtx) {
              sigCtx.strokeStyle = appState.highContrast ? '#52b788' : '#1b2e24';
              sigCtx.lineWidth = 3.5;
              sigCtx.lineCap = 'round';
              sigCtx.lineJoin = 'round';
              sigCtx.drawImage(img, 0, 0);
            }
            
            // Renderizar certificado por si estuviese ya completado
            checkAndRenderCertificate();
          };
          img.src = data.signature;
        }
      }
    } catch (e) {
      console.error("Error al cargar datos personales", e);
    }
  }
}

/* ==========================================================================
   --- VERIFICADOR Y GENERACIÓN DEL DIPLOMA DE HERÁLDICA ---
   ========================================================================== */

function isProgramCompleted() {
  for (let w = 1; w <= 12; w++) {
    const weekKey = `week_${w}`;
    if (!appState.diary[weekKey]) {
      appState.diary[weekKey] = {
        sessions: [false, false, false, false, false],
        borg: null
      };
    }
    const wData = appState.diary[weekKey];
    if (!wData) return false;
    
    // Una semana está completa si tiene las 5 sesiones hechas y se ha calificado el Borg
    const isWeekCompleted = wData.sessions && wData.sessions.every(s => s === true) && wData.borg !== null;
    if (!isWeekCompleted) {
      return false;
    }
  }
  return true;
}

function checkAndRenderCertificate() {
  const container = document.getElementById('certificate-container');
  if (!container) return;
  
  if (isProgramCompleted()) {
    container.style.display = 'block';
    
    // Obtener datos personales cargados
    let saved = safeStorage.getItem('fuerza_equilibrio_personal_data');
    if (!saved) {
      saved = safeStorage.getItem('vivifrail_personal_data');
    }
    let fullName = "PORTADOR DEL PASAPORTE";
    let userSigImg = "";
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const name = data.name ? data.name.trim() : "";
        const surname = data.surname ? data.surname.trim() : "";
        if (name || surname) {
          fullName = `${name} ${surname}`.toUpperCase();
        }
        if (data.signature && data.hasSigned) {
          // Filtrar la firma con color para que case estéticamente con el verde
          userSigImg = `<img src="${data.signature}" alt="Firma del Portador" style="max-height: 55px; max-width: 180px; display: block; margin: 0 auto; filter: contrast(1.2) brightness(0.8);" />`;
        }
      } catch (e) {
        console.error("Error al renderizar el diploma", e);
      }
    }
    
    container.innerHTML = `
      <div class="passport-certificate">
        <!-- Escudo de laureles y estrella oficial dorada -->
        <svg viewBox="0 0 100 100" class="certificate-seal-svg" aria-hidden="true" style="color: var(--passport-gold);">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/>
          <path d="M50 8 A42 42 0 0 1 92 50 A42 42 0 0 1 50 92 A42 42 0 0 1 8 50 A42 42 0 0 1 50 8 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <polygon points="50,22 53,30 62,30 55,36 57,45 50,39 43,45 45,36 38,30 47,30" fill="currentColor"/>
          <text x="50" y="66" text-anchor="middle" font-family="var(--font-serif)" font-size="6" font-weight="900" fill="currentColor" letter-spacing="0.5">SALUD ACTIVA</text>
          <text x="50" y="76" text-anchor="middle" font-family="var(--font-sans)" font-size="5" font-weight="800" fill="currentColor" letter-spacing="0.5">LOGRADO</text>
        </svg>
        
        <h3 class="certificate-title">Diploma de Logro</h3>
        <p class="certificate-subtitle">PROGRAMA DE FUERZA Y EQUILIBRIO</p>
        
        <p class="certificate-text" style="font-size: var(--text-sm); font-style: italic; color: var(--text-muted); margin-bottom: 5px;">
          Se otorga con orgullo y admiración este reconocimiento a:
        </p>
        
        <div class="certificate-recipient">${fullName}</div>
        
        <p class="certificate-text">
          Por haber completado con constancia, esfuerzo diario y superación personal las **12 semanas** del programa genérico de ejercicio multicomponente para mantener la autonomía y una vida activa y saludable en casa.
        </p>
        
        <div class="certificate-signatures">
          <div>
            <div style="min-height: 55px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 4px;">
              ${userSigImg ? userSigImg : '<span style="color: var(--passport-text-muted); font-size: var(--text-xs); font-style: italic;">Sin firma</span>'}
            </div>
            <div class="certificate-sign-line">Firma del Portador</div>
          </div>
          <div>
            <div style="min-height: 55px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 4px;">
              <div class="certificate-sign-cursive" style="font-family: 'Georgia', 'Times New Roman', cursive; font-style: italic; font-weight: bold; font-size: 1.25rem;">Director de Salud</div>
            </div>
            <div class="certificate-sign-line">Director del Programa de Salud</div>
          </div>
        </div>
      </div>
    `;
  } else {
    container.style.display = 'none';
  }
}

// ==========================================================================
// --- SÍNTESIS DE VOZ OFFLINE Y LOCAL ---
// ==========================================================================
function speakOffline(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Detener cola anterior para sincronizar con los segundos
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    
    // Obtener voces de forma dinámica y priorizar español
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    
    utterance.rate = 0.90; // Velocidad pausada y asimilable
    utterance.pitch = 1.0;  // Tono natural
    
    window.speechSynthesis.speak(utterance);
  }
}

// ==========================================================================
// --- CONTROL PRINCIPAL DEL ASISTENTE DE ENTRENAMIENTO ---
// ==========================================================================
function startWorkoutAssistant(exId) {
  // 1. Detener cualquier voz previa
  stopSpeaking();
  cleanupWorkoutAssistant();
  
  // 2. Localizar ejercicio en la base de datos
  let foundEx = null;
  let catId = null;
  for (const cat in EXERCISES_DATABASE) {
    const exItem = EXERCISES_DATABASE[cat].items.find(item => item.id === exId);
    if (exItem) {
      foundEx = exItem;
      catId = cat;
      break;
    }
  }
  
  if (!foundEx) return;
  
  // 3. Inicializar el estado del asistente
  assistantState.exId = exId;
  assistantState.category = catId;
  assistantState.currentSeries = 1;
  assistantState.currentRep = 1;
  assistantState.repetitionSec = 0;
  assistantState.isPaused = false;
  
  if (catId === 'resistencia') {
    assistantState.secondsRemaining = 1200; // 20 minutos de caminata
    assistantState.phase = 'aerobic';
  } else {
    assistantState.secondsRemaining = 3; // 3 segundos de preparación
    assistantState.phase = 'prestart';
  }
  
  // 4. Actualizar textos descriptivos de la pantalla
  document.getElementById('assistant-exercise-title').innerText = foundEx.name;
  document.getElementById('assistant-exercise-cat').innerText = EXERCISES_DATABASE[catId].title;
  
  // Ocultar botón Saltar descanso al inicio
  document.getElementById('btn-skip-rest').style.display = "none";
  
  // Asegurar que el botón de pausa inicie en "Pausar Asistente"
  const pauseBtn = document.getElementById('btn-assistant-pause-toggle');
  if (pauseBtn) {
    pauseBtn.innerText = "⏸️ Pausar";
  }
  
  // 5. Cambiar a pantalla del asistente
  navigateTo('assistant');
  
  // Vibrar al iniciar
  triggerVibration([50, 50, 50]);
  
  // 6. Activar la guía de voz inicial y el intervalo del reloj
  if (catId === 'resistencia') {
    updateAssistantUI();
    speakOffline(`Iniciando ejercicio de resistencia, ${foundEx.name}. Caminaremos durante veinte minutos a un ritmo constante. Mantén la espalda recta y la mirada al frente. ¡Comenzamos!`);
    assistantInterval = setInterval(tickWorkoutAssistant, 1000);
  } else {
    updateAssistantUI();
    speakOffline(`Iniciando ${foundEx.name}. Prepárate para la serie 1. Empezamos en tres segundos. ¡Prepárate!`);
    assistantInterval = setInterval(tickWorkoutAssistant, 1000);
  }
}

function cleanupWorkoutAssistant() {
  if (assistantInterval) {
    clearInterval(assistantInterval);
    assistantInterval = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function tickWorkoutAssistant() {
  if (assistantState.isPaused) return;
  
  const cat = assistantState.category;
  
  if (cat === 'resistencia') {
    // --- LÓGICA DE RESISTENCIA AERÓBICA ---
    if (assistantState.secondsRemaining > 0) {
      assistantState.secondsRemaining--;
      
      // Ritmo de respiración suave (4 segundos expand, 4 segundos contract)
      const breatheCycle = assistantState.secondsRemaining % 8;
      const breathingCircle = document.getElementById('assistant-breathing-circle');
      const breathingIcon = document.getElementById('assistant-breathing-icon');
      
      if (breatheCycle < 4) {
        breathingCircle.classList.add('expand');
        breathingCircle.classList.remove('contract');
        breathingIcon.innerText = "💨";
        document.getElementById('assistant-phase-label').innerText = "¡TOMA AIRE!";
      } else {
        breathingCircle.classList.add('contract');
        breathingCircle.classList.remove('expand');
        breathingIcon.innerText = "🍃";
        document.getElementById('assistant-phase-label').innerText = "¡SOPLA DESPACIO!";
      }
      
      // Frases de aliento motivacionales cada 2 minutos (120s)
      if (assistantState.secondsRemaining > 0 && assistantState.secondsRemaining % 120 === 0) {
        const phrases = [
          "¡Excelente ritmo! Sigue caminando con postura firme.",
          "Lo estás haciendo muy bien. Respira hondo y constante.",
          "Mitad del camino. Siente cómo se fortalece tu corazón.",
          "¡Falta poco! Mantén la mirada al frente y paso seguro.",
          "Último tramo. ¡Gran trabajo y dedicación!"
        ];
        const index = 4 - Math.floor(assistantState.secondsRemaining / 240);
        const phrase = phrases[Math.max(0, Math.min(index, phrases.length - 1))];
        speakOffline(phrase);
      }
      
      updateAssistantUI();
    } else {
      completeWorkoutAssistant();
    }
  } else {
    // --- LÓGICA DE FUERZA, EQUILIBRIO Y FLEXIBILIDAD ---
    if (assistantState.phase === 'prestart') {
      if (assistantState.secondsRemaining > 0) {
        speakOffline(assistantState.secondsRemaining.toString());
        assistantState.secondsRemaining--;
        updateAssistantUI();
      } else {
        // Arranca primera repetición
        assistantState.phase = 'concentric';
        assistantState.repetitionSec = 0;
        startRepetitionPhase();
      }
    } else if (assistantState.phase === 'series_rest') {
      if (assistantState.secondsRemaining > 0) {
        assistantState.secondsRemaining--;
        updateAssistantUI();
        
        // Cuenta atrás auditiva en los últimos 3 segundos del descanso
        if (assistantState.secondsRemaining <= 3 && assistantState.secondsRemaining > 0) {
          speakOffline(assistantState.secondsRemaining.toString());
        }
      } else {
        // Siguiente serie
        assistantState.currentSeries++;
        assistantState.currentRep = 1;
        assistantState.phase = 'concentric';
        assistantState.repetitionSec = 0;
        
        // Ocultar botón Saltar descanso
        document.getElementById('btn-skip-rest').style.display = "none";
        
        speakOffline(`Serie ${assistantState.currentSeries}. ¡Empezamos!`);
        startRepetitionPhase();
      }
    } else {
      // Ticking dentro de la repetición
      assistantState.repetitionSec++;
      
      const config = getCategoryConfig(cat);
      const repSec = assistantState.repetitionSec;
      
      if (assistantState.phase === 'concentric') {
        if (repSec >= config.concentricTime) {
          assistantState.phase = 'eccentric';
          startRepetitionPhase();
        } else {
          updateRepetitionVisuals();
        }
      } else if (assistantState.phase === 'eccentric') {
        if (repSec >= (config.concentricTime + config.eccentricTime)) {
          if (config.repRestTime > 0) {
            assistantState.phase = 'rep_rest';
            startRepetitionPhase();
          } else {
            endRepetition();
          }
        } else {
          updateRepetitionVisuals();
        }
      } else if (assistantState.phase === 'rep_rest') {
        if (repSec >= (config.concentricTime + config.eccentricTime + config.repRestTime)) {
          endRepetition();
        } else {
          updateRepetitionVisuals();
        }
      }
    }
  }
}

// Configuración matemática de los tiempos por categorías
function getCategoryConfig(cat) {
  const configs = {
    fuerza: {
      maxSeries: 3,
      maxReps: 12,
      concentricTime: 2,
      eccentricTime: 2,
      repRestTime: 1,
      seriesRestTime: 60,
      concentricSpeech: "¡Fuerza!",
      eccentricSpeech: "Relaja",
      repRestSpeech: "Descansa",
      seriesRestSpeech: "Serie completada. Descansa un minuto"
    },
    equilibrio: {
      maxSeries: 3,
      maxReps: 10,
      concentricTime: 2,
      eccentricTime: 2,
      repRestTime: 1,
      seriesRestTime: 30,
      concentricSpeech: "¡Mantén equilibrio!",
      eccentricSpeech: "Estabiliza",
      repRestSpeech: "Pausa",
      seriesRestSpeech: "Serie completada. Descansa treinta segundos"
    },
    flexibilidad: {
      maxSeries: 3,
      maxReps: 3,
      concentricTime: 10,
      eccentricTime: 5,
      repRestTime: 0,
      seriesRestTime: 30,
      concentricSpeech: "¡Estira y mantén!",
      eccentricSpeech: "Baja despacio",
      repRestSpeech: "",
      seriesRestSpeech: "Serie completada. Descansa treinta segundos"
    }
  };
  return configs[cat] || configs.fuerza;
}

// Mensajes específicos de instrucción por ejercicio
function getAssistantSpeech(exId, phase) {
  const cues = {
    // Fuerza Muscular
    fuerza_1: { concentric: "¡Aprieta la toalla!", eccentric: "Relaja las manos" },
    fuerza_2: { concentric: "¡Sube las botellas!", eccentric: "Baja despacio" },
    fuerza_3: { concentric: "¡Levántate con fuerza!", eccentric: "Siéntate despacio" },
    fuerza_4: { concentric: "¡Sube un escalón!", eccentric: "Baja despacio" },
    
    // Equilibrio y Coordinación
    equilibrio_1: { concentric: "¡Lanza y toca!", eccentric: "Paso controlado" },
    equilibrio_2: { concentric: "¡Camina dibujando el ocho!", eccentric: "Paso firme" },
    
    // Flexibilidad y Movilidad
    flexibilidad_1: { concentric: "¡Estira los brazos arriba!", eccentric: "Baja con calma" },
    flexibilidad_2: { concentric: "¡Estira tu pierna!", eccentric: "Regresa despacio" }
  };
  
  if (cues[exId] && cues[exId][phase]) {
    return cues[exId][phase];
  }
  
  // Respuestas genéricas
  if (phase === 'concentric') return "¡Fuerza!";
  if (phase === 'eccentric') return "Relaja";
  return "";
}

function startRepetitionPhase() {
  const cat = assistantState.category;
  const config = getCategoryConfig(cat);
  const exId = assistantState.exId;
  
  const breathingCircle = document.getElementById('assistant-breathing-circle');
  const breathingIcon = document.getElementById('assistant-breathing-icon');
  const box = document.getElementById('assistant-box-element');
  
  // Ajustar fondo según la fase: descanso corto (rep_rest) en azul, ejercicio en verde
  if (assistantState.phase === 'rep_rest') {
    box.className = "assistant-box state-rest";
  } else {
    box.className = "assistant-box state-exercise";
  }
  
  if (assistantState.phase === 'concentric') {
    // Guía visual: expande círculo
    breathingCircle.classList.add('expand');
    breathingCircle.classList.remove('contract');
    breathingIcon.innerText = "💪";
    
    const speech = getAssistantSpeech(exId, 'concentric');
    document.getElementById('assistant-phase-label').innerText = speech.toUpperCase();
    speakOffline(speech);
    triggerVibration(30);
  } 
  else if (assistantState.phase === 'eccentric') {
    // Guía visual: contrae círculo
    breathingCircle.classList.add('contract');
    breathingCircle.classList.remove('expand');
    breathingIcon.innerText = "🍃";
    
    const speech = getAssistantSpeech(exId, 'eccentric');
    document.getElementById('assistant-phase-label').innerText = speech.toUpperCase();
    speakOffline(speech);
    triggerVibration(15);
  } 
  else if (assistantState.phase === 'rep_rest') {
    // Descanso corto entre repeticiones
    breathingCircle.classList.remove('expand', 'contract');
    breathingIcon.innerText = "🧘";
    
    document.getElementById('assistant-phase-label').innerText = "DESCANSA";
    if (config.repRestSpeech) {
      speakOffline(config.repRestSpeech);
    }
  }
  
  updateAssistantUI();
}

function updateRepetitionVisuals() {
  const cat = assistantState.category;
  const config = getCategoryConfig(cat);
  const repSec = assistantState.repetitionSec;
  const display = document.getElementById('assistant-timer-display');
  
  if (assistantState.phase === 'concentric') {
    const timeLeft = config.concentricTime - repSec;
    display.innerText = Math.max(1, timeLeft).toString();
  } 
  else if (assistantState.phase === 'eccentric') {
    const elapsed = repSec - config.concentricTime;
    const timeLeft = config.eccentricTime - elapsed;
    display.innerText = Math.max(1, timeLeft).toString();
  } 
  else if (assistantState.phase === 'rep_rest') {
    const elapsed = repSec - (config.concentricTime + config.eccentricTime);
    const timeLeft = config.repRestTime - elapsed;
    display.innerText = Math.max(1, timeLeft).toString();
  }
}

function endRepetition() {
  const cat = assistantState.category;
  const config = getCategoryConfig(cat);
  
  if (assistantState.currentRep < config.maxReps) {
    assistantState.currentRep++;
    assistantState.phase = 'concentric';
    assistantState.repetitionSec = 0;
    startRepetitionPhase();
  } else {
    // Finaliza serie
    if (assistantState.currentSeries < config.maxSeries) {
      // Activar descanso obligatorio entre series
      assistantState.phase = 'series_rest';
      assistantState.secondsRemaining = config.seriesRestTime;
      
      // Cambiar clase de fondo a Azul (descanso)
      const box = document.getElementById('assistant-box-element');
      box.className = "assistant-box state-rest";
      
      // Mostrar botón de saltar descanso
      document.getElementById('btn-skip-rest').style.display = "block";
      
      // Ajustar Phase Label
      document.getElementById('assistant-phase-label').innerText = "DESCANSO DE SERIE";
      
      // Guía de respiración en descanso
      const breathingCircle = document.getElementById('assistant-breathing-circle');
      breathingCircle.className = "breathing-guide contract";
      document.getElementById('assistant-breathing-icon').innerText = "🛋️";
      
      speakOffline(config.seriesRestSpeech);
      triggerVibration([50, 30, 50]);
      
      updateAssistantUI();
    } else {
      completeWorkoutAssistant();
    }
  }
}

// Omitir el descanso de serie
function skipWorkoutRest() {
  if (assistantState.phase !== 'series_rest') return;
  
  // Limpiar timers y variables del descanso
  assistantState.secondsRemaining = 0;
  
  // Ocultar botón
  document.getElementById('btn-skip-rest').style.display = "none";
  
  // Siguiente serie
  assistantState.currentSeries++;
  assistantState.currentRep = 1;
  assistantState.phase = 'concentric';
  assistantState.repetitionSec = 0;
  
  // Re-ajustar fondo a verde de ejercicio
  const box = document.getElementById('assistant-box-element');
  box.className = "assistant-box state-exercise";
  
  speakOffline(`Serie ${assistantState.currentSeries}. ¡Empezamos!`);
  triggerVibration(40);
  
  startRepetitionPhase();
}

// Felicitación, registro en localStorage y gamificación automática del Diario
function completeWorkoutAssistant() {
  cleanupWorkoutAssistant();
  
  // Cambiar textos visuales de celebración
  document.getElementById('assistant-phase-label').innerText = "¡COMPLETADO CON ÉXITO!";
  document.getElementById('assistant-reps-counter').innerText = "🎉 ¡Excelente!";
  document.getElementById('assistant-series-counter').innerText = "¡Gran trabajo!";
  document.getElementById('assistant-timer-display').innerText = "🏆";
  
  const breathingCircle = document.getElementById('assistant-breathing-circle');
  if (breathingCircle) {
    breathingCircle.className = "breathing-guide expand";
    document.getElementById('assistant-breathing-icon').innerText = "👑";
  }
  
  const box = document.getElementById('assistant-box-element');
  if (box) {
    box.className = "assistant-box state-exercise";
  }
  
  // Gamificación inteligente: Marcar automáticamente la sesión en la semana activa
  const cat = assistantState.category;
  let markedWeek = null;
  let markedSession = null;
  
  // 1. Encontrar la primera semana incompleta (no todas sus 5 sesiones están hechas)
  let activeWeek = 1;
  for (let w = 1; w <= 12; w++) {
    const weekKey = `week_${w}`;
    if (!appState.diary[weekKey]) {
      appState.diary[weekKey] = {
        sessions: [false, false, false, false, false],
        borg: null
      };
    }
    const wData = appState.diary[weekKey];
    if (wData.sessions && !wData.sessions.every(s => s === true)) {
      activeWeek = w;
      break;
    }
  }
  
  // 2. Buscar en la semana activa la primera sesión libre del tipo de ejercicio correspondiente
  const weekKey = `week_${activeWeek}`;
  if (!appState.diary[weekKey]) {
    appState.diary[weekKey] = {
      sessions: [false, false, false, false, false],
      borg: null
    };
  }
  const wData = appState.diary[weekKey];
  if (!wData.sessions) {
    wData.sessions = [false, false, false, false, false];
  }
  
  let targetIndices = [];
  if (cat === 'resistencia') {
    // Caminata / Resistencia -> ANDAR (S2, S4 -> índices 1, 3)
    targetIndices = [1, 3];
  } else {
    // Fuerza, Equilibrio, Flexibilidad -> RUEDA (S1, S3, S5 -> índices 0, 2, 4)
    targetIndices = [0, 2, 4];
  }
  
  for (let idx of targetIndices) {
    if (!wData.sessions[idx]) {
      wData.sessions[idx] = true;
      markedWeek = activeWeek;
      markedSession = idx;
      break;
    }
  }
  
  // 3. Fallback: si esa semana ya tiene llenas esas sesiones, buscar la primera semana libre en todo el diario
  if (markedWeek === null) {
    for (let w = 1; w <= 12; w++) {
      const wkKey = `week_${w}`;
      if (!appState.diary[wkKey]) {
        appState.diary[wkKey] = {
          sessions: [false, false, false, false, false],
          borg: null
        };
      }
      const wkData = appState.diary[wkKey];
      if (!wkData.sessions) {
        wkData.sessions = [false, false, false, false, false];
      }
      
      for (let idx of targetIndices) {
        if (!wkData.sessions[idx]) {
          wkData.sessions[idx] = true;
          markedWeek = w;
          markedSession = idx;
          break;
        }
      }
      if (markedWeek !== null) break;
    }
  }
  
  if (markedWeek !== null) {
    updateWeekCompletionStatus(markedWeek);
    renderDiaryUI();
    saveStateToStorage();
    checkAndRenderCertificate(); // Verificar si se completa el pasaporte
  }
  
  let successText = "¡Excelente trabajo! Has completado el ejercicio con éxito.";
  if (markedWeek !== null && markedSession !== null) {
    const sessionNum = markedSession + 1;
    const sessionTypeName = (markedSession === 1 || markedSession === 3) ? "ANDAR" : "RUEDA";
    successText += ` Tu sesión ${sessionNum} de tipo ${sessionTypeName} de la semana ${markedWeek} ha sido registrada con éxito en tu pasaporte.`;
  }
  
  speakOffline(successText);
  triggerVibration([100, 50, 100, 50, 150]);
  
  // Regresar automáticamente tras 5 segundos de celebración
  setTimeout(() => {
    exitWorkoutAssistant();
  }, 5000);
}

function updateAssistantUI() {
  const cat = assistantState.category;
  const config = getCategoryConfig(cat);
  
  const repsCounter = document.getElementById('assistant-reps-counter');
  const seriesCounter = document.getElementById('assistant-series-counter');
  const timerDisplay = document.getElementById('assistant-timer-display');
  const phaseLabel = document.getElementById('assistant-phase-label');
  const skipRestBtn = document.getElementById('btn-skip-rest');
  const box = document.getElementById('assistant-box-element');
  
  if (cat === 'resistencia') {
    repsCounter.innerText = "Caminata Activa";
    seriesCounter.innerText = "Mantén tu postura erguida";
    
    // Formatear minutos y segundos
    const minutes = Math.floor(assistantState.secondsRemaining / 60);
    const seconds = assistantState.secondsRemaining % 60;
    timerDisplay.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    skipRestBtn.style.display = "none";
    
    if (assistantState.isPaused) {
      box.className = "assistant-box state-paused";
      phaseLabel.innerText = "CAMINATA PAUSADA";
    } else {
      box.className = "assistant-box state-exercise";
    }
  } else {
    if (assistantState.phase === 'prestart') {
      repsCounter.innerText = `Prepárate para la Serie 1`;
      seriesCounter.innerText = `Rutina de ${EXERCISES_DATABASE[cat].title}`;
      timerDisplay.innerText = assistantState.secondsRemaining.toString();
      phaseLabel.innerText = "¡PREPARADOS!";
      skipRestBtn.style.display = "none";
      
      if (assistantState.isPaused) {
        box.className = "assistant-box state-paused";
        phaseLabel.innerText = "PREPARACIÓN PAUSADA";
      } else {
        box.className = "assistant-box state-paused"; // Gris para prestart
      }
    } 
    else if (assistantState.phase === 'series_rest') {
      repsCounter.innerText = `¡Serie completada!`;
      seriesCounter.innerText = `Descanso: Serie ${assistantState.currentSeries} de ${config.maxSeries}`;
      timerDisplay.innerText = `${assistantState.secondsRemaining}s`;
      phaseLabel.innerText = "DESCANSA Y RECUPERA";
      skipRestBtn.style.display = "block";
      
      if (assistantState.isPaused) {
        box.className = "assistant-box state-paused";
        phaseLabel.innerText = "DESCANSO PAUSADO";
      } else {
        box.className = "assistant-box state-rest";
      }
    } 
    else {
      repsCounter.innerText = `Repetición ${assistantState.currentRep} de ${config.maxReps}`;
      seriesCounter.innerText = `Serie ${assistantState.currentSeries} de ${config.maxSeries}`;
      
      if (assistantState.isPaused) {
        box.className = "assistant-box state-paused";
        phaseLabel.innerText = "ASISTENTE EN PAUSA";
      } else if (assistantState.phase === 'rep_rest') {
        box.className = "assistant-box state-rest";
        phaseLabel.innerText = "DESCANSO";
      } else {
        box.className = "assistant-box state-exercise";
        
        const exId = assistantState.exId;
        if (assistantState.phase === 'concentric') {
          phaseLabel.innerText = getAssistantSpeech(exId, 'concentric').toUpperCase();
        } else if (assistantState.phase === 'eccentric') {
          phaseLabel.innerText = getAssistantSpeech(exId, 'eccentric').toUpperCase();
        }
      }
      
      updateRepetitionVisuals();
    }
  }
}

// Control Táctil de Pausa y Reanudación de Sesión
function toggleWorkoutAssistantPause() {
  assistantState.isPaused = !assistantState.isPaused;
  
  const pauseBtn = document.getElementById('btn-assistant-pause-toggle');
  
  if (assistantState.isPaused) {
    pauseBtn.innerText = "▶️ Reanudar";
    pauseBtn.className = "btn btn-primary";
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    
    speakOffline("Entrenamiento en pausa");
    triggerVibration(25);
  } else {
    pauseBtn.innerText = "⏸️ Pausar";
    pauseBtn.className = "btn btn-primary";
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    
    speakOffline("Entrenamiento reanudado");
    triggerVibration(25);
  }
  
  updateAssistantUI();
}

// Detener sesión activa y regresar
function exitWorkoutAssistant() {
  cleanupWorkoutAssistant();
  
  // Limpiar controles de pausa
  const pauseBtn = document.getElementById('btn-assistant-pause-toggle');
  if (pauseBtn) {
    pauseBtn.innerText = "⏸️ Pausar";
  }
  
  // Ocultar botón Saltar descanso si estuviese visible
  document.getElementById('btn-skip-rest').style.display = "none";
  
  // Regresar de forma segura al catálogo de ejercicios
  navigateTo('exercises');
  triggerVibration(30);
}

