/**
 * Funciones para calcular y mostrar las fases lunares
 */

// Objeto global para las fases lunares
const MoonPhases = {};

// Nombres de las fases lunares
MoonPhases.phaseNames = {
    "es": [
        "Luna Nueva",
        "Luna Creciente",
        "Cuarto Creciente",
        "Luna Gibosa Creciente",
        "Luna Llena",
        "Luna Gibosa Menguante",
        "Cuarto Menguante",
        "Luna Menguante"
    ],
    "en": [
        "New Moon",
        "Waxing Crescent",
        "First Quarter",
        "Waxing Gibbous",
        "Full Moon",
        "Waning Gibbous",
        "Last Quarter",
        "Waning Crescent"
    ],
    "tl": [
        "Bagong Buwan",
        "Unang Sangkapat",
        "Gitna ng Unang Sangkapat",
        "Huling Sangkapat ng Unang Bahagi",
        "Kabilugan ng Buwan",
        "Unang Sangkapat ng Huling Bahagi",
        "Gitna ng Huling Sangkapat",
        "Katapusan ng Huling Sangkapat"
    ],
    "he": [
        "ירח חדש",
        "ירח צומח",
        "רבע ראשון",
        "ירח גיבן צומח",
        "ירח מלא",
        "ירח גיבן דועך",
        "רבע אחרון",
        "ירח דועך"
    ]
};

// Clases CSS para las fases lunares
MoonPhases.phaseClasses = [
    "moon-phase-new",
    "moon-phase-waxing-crescent",
    "moon-phase-first-quarter",
    "moon-phase-waxing-gibbous",
    "moon-phase-full",
    "moon-phase-waning-gibbous",
    "moon-phase-last-quarter",
    "moon-phase-waning-crescent"
];

/**
 * Calcula la fase lunar para una fecha dada
 * Adaptado del algoritmo de John Conway
 * @param {Date} date - Fecha para calcular la fase lunar
 * @returns {Object} - Objeto con la información de la fase lunar
 */
MoonPhases.calculatePhase = function(date) {
    // Normalizar la fecha a UTC
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    
    // Ajustar enero y febrero como meses 13 y 14 del año anterior
    let adjustedMonth = month;
    let adjustedYear = year;
    
    if (month < 3) {
        adjustedMonth += 12;
        adjustedYear -= 1;
    }
    
    // Calcular siglos y años dentro del siglo
    const century = Math.floor(adjustedYear / 100);
    const yearInCentury = adjustedYear % 100;
    
    // Calcular día juliano para la fecha
    // Fórmula de Zeller
    const julianDay = Math.floor(365.25 * (adjustedYear + 4716)) +
                      Math.floor(30.6001 * (adjustedMonth + 1)) +
                      day - 
                      Math.floor(century / 4) - 
                      Math.floor(century) + 
                      Math.floor(2 - century + Math.floor(century / 4)) - 
                      1524.5;
    
    // Calcular días desde la última luna nueva conocida (2000-01-06)
    const newMoon2000 = 2451549.5; // Fecha juliana para la luna nueva del 6 de enero de 2000
    const daysSinceNewMoon = julianDay - newMoon2000;
    
    // Calcular número de lunaciones desde la referencia
    const lunarCycle = 29.53; // Duración promedio de un ciclo lunar en días
    const lunations = daysSinceNewMoon / lunarCycle;
    
    // Extraer solo la parte fraccionaria de las lunaciones
    const position = lunations % 1;
    if (position < 0) position += 1;
    
    // Determinar el índice de la fase lunar (0-7)
    const phaseIndex = Math.round(position * 8) % 8;
    
    // Calcular el porcentaje de iluminación (0-100)
    // 0 = nueva, 50 = cuarto, 100 = llena
    let illumination;
    if (phaseIndex === 0 || phaseIndex === 4) {
        illumination = phaseIndex === 0 ? 0 : 100;
    } else if (phaseIndex < 4) {
        illumination = Math.round((phaseIndex / 4) * 100);
    } else {
        illumination = Math.round(((8 - phaseIndex) / 4) * 100);
    }
    
    // Calcular días para la próxima luna nueva
    const daysToNewMoon = (1 - position) * lunarCycle;
    
    // Calcular la fecha de la próxima luna nueva
    const nextNewMoonDate = new Date(date);
    nextNewMoonDate.setDate(date.getDate() + Math.round(daysToNewMoon));
    
    return {
        phaseIndex: phaseIndex,
        illumination: illumination,
        daysToNewMoon: Math.round(daysToNewMoon),
        nextNewMoonDate: nextNewMoonDate
    };
};

/**
 * Genera el HTML para mostrar la fase lunar
 * @param {number} phaseIndex - Índice de la fase lunar (0-7)
 * @param {string} lang - Código de idioma actual
 * @returns {string} - HTML para mostrar la fase lunar
 */
MoonPhases.getPhaseHTML = function(phaseIndex, lang = 'es') {
    // Si el idioma no está disponible, usar español
    if (!MoonPhases.phaseNames[lang]) {
        lang = 'es';
    }
    
    // Obtener el nombre de la fase
    const phaseName = MoonPhases.phaseNames[lang][phaseIndex];
    
    // Obtener la clase CSS
    const phaseClass = MoonPhases.phaseClasses[phaseIndex];
    
    // Generar el SVG según la fase
    let svgContent = '';
    
    switch (phaseIndex) {
        case 0: // Luna nueva
            svgContent = `<circle cx="50" cy="50" r="40" fill="#6c757d" />`;
            break;
        case 1: // Luna creciente
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#6c757d" />
                <path d="M50,10 A40,40 0 0,1 50,90 A20,40 0 0,0 50,10" fill="#f0f0f0" />
            `;
            break;
        case 2: // Cuarto creciente
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#6c757d" />
                <path d="M50,10 A40,40 0 0,1 50,90 A40,40 0 0,0 50,10" fill="#f0f0f0" />
            `;
            break;
        case 3: // Luna gibosa creciente
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#f0f0f0" />
                <path d="M50,10 A40,40 0 0,0 50,90 A15,40 0 0,1 50,10" fill="#6c757d" />
            `;
            break;
        case 4: // Luna llena
            svgContent = `<circle cx="50" cy="50" r="40" fill="#f0f0f0" />`;
            break;
        case 5: // Luna gibosa menguante
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#f0f0f0" />
                <path d="M50,10 A40,40 0 0,1 50,90 A15,40 0 0,0 50,10" fill="#6c757d" />
            `;
            break;
        case 6: // Cuarto menguante
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#6c757d" />
                <path d="M50,10 A40,40 0 0,0 50,90 A40,40 0 0,1 50,10" fill="#f0f0f0" />
            `;
            break;
        case 7: // Luna menguante
            svgContent = `
                <circle cx="50" cy="50" r="40" fill="#6c757d" />
                <path d="M50,10 A40,40 0 0,0 50,90 A20,40 0 0,1 50,10" fill="#f0f0f0" />
            `;
            break;
    }
    
    // Generamos el HTML completo
    const html = `
        <div class="moon-phase ${phaseClass}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                ${svgContent}
            </svg>
        </div>
    `;
    
    return html;
};

/**
 * Actualiza la visualización de la fase lunar actual
 * @param {string} lang - Código de idioma
 */
MoonPhases.updateCurrentPhase = function(lang = 'es') {
    const today = new Date();
    const phase = MoonPhases.calculatePhase(today);
    
    // Obtener elementos del DOM
    const moonPhaseContainer = document.getElementById('currentMoonPhase');
    const moonPhaseText = document.getElementById('moonPhaseText');
    const moonPhaseDate = document.getElementById('moonPhaseDate');
    
    if (moonPhaseContainer && moonPhaseText && moonPhaseDate) {
        // Actualizar el HTML de la fase lunar
        moonPhaseContainer.innerHTML = MoonPhases.getPhaseHTML(phase.phaseIndex, lang);
        
        // Actualizar el texto de la fase
        moonPhaseText.textContent = MoonPhases.phaseNames[lang][phase.phaseIndex];
        
        // Actualizar la fecha de la próxima luna nueva
        const nextNewMoonFormatted = phase.nextNewMoonDate.toLocaleDateString(
            lang === 'en' ? 'en-US' : (lang === 'tl' ? 'fil-PH' : 'es-ES'),
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
        
        // Mensajes según el idioma
        let nextNewMoonText = '';
        switch (lang) {
            case 'en':
                nextNewMoonText = `Next New Moon: ${nextNewMoonFormatted}`;
                break;
            case 'tl':
                nextNewMoonText = `Susunod na Bagong Buwan: ${nextNewMoonFormatted}`;
                break;
            case 'he':
                nextNewMoonText = `הירח החדש הבא: ${nextNewMoonFormatted}`;
                break;
            default:
                nextNewMoonText = `Próxima Luna Nueva: ${nextNewMoonFormatted}`;
        }
        
        moonPhaseDate.textContent = nextNewMoonText;
    }
};

/**
 * Calcula la fase lunar para una fecha específica y devuelve un objeto con la información
 * @param {string} dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @param {string} lang - Código de idioma
 * @returns {Object} - Objeto con la información de la fase lunar
 */
MoonPhases.getPhaseForDate = function(dateStr, lang = 'es') {
    const date = new Date(dateStr);
    const phase = MoonPhases.calculatePhase(date);
    
    return {
        phase: phase,
        phaseName: MoonPhases.phaseNames[lang][phase.phaseIndex],
        phaseHTML: MoonPhases.getPhaseHTML(phase.phaseIndex, lang)
    };
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la fase lunar actual usando el idioma por defecto
    MoonPhases.updateCurrentPhase();
});