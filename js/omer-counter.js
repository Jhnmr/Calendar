/**
 * Contador del Omer - Conteo de 50 días desde Primicias hasta Shavuot
 * Levítico 23:15-16
 */

const OmerCounter = {};

/**
 * Traducciones para el contador
 */
OmerCounter.translations = {
    es: {
        title: "Conteo del Omer",
        day: "Día",
        of: "de",
        daysToShavuot: "días para Shavuot",
        week: "Semana",
        weeks: "semanas",
        and: "y",
        days: "días",
        countingStarted: "El conteo ha comenzado desde Primicias",
        countingNotStarted: "El conteo del Omer comenzará en Primicias",
        countingCompleted: "El conteo del Omer se completó en Shavuot",
        shavuotReached: "¡Hoy es Shavuot! (Pentecostés)"
    },
    en: {
        title: "Omer Count",
        day: "Day",
        of: "of",
        daysToShavuot: "days to Shavuot",
        week: "Week",
        weeks: "weeks",
        and: "and",
        days: "days",
        countingStarted: "Counting started from Firstfruits",
        countingNotStarted: "Omer count will begin on Firstfruits",
        countingCompleted: "Omer count completed on Shavuot",
        shavuotReached: "Today is Shavuot! (Pentecost)"
    },
    tl: {
        title: "Bilang ng Omer",
        day: "Araw",
        of: "ng",
        daysToShavuot: "araw para sa Shavuot",
        week: "Linggo",
        weeks: "linggo",
        and: "at",
        days: "araw",
        countingStarted: "Ang bilang ay nagsimula mula sa Firstfruits",
        countingNotStarted: "Ang bilang ng Omer ay magsisimula sa Firstfruits",
        countingCompleted: "Ang bilang ng Omer ay natapos sa Shavuot",
        shavuotReached: "Ngayon ay Shavuot! (Pentekostes)"
    },
    he: {
        title: "ספירת העומר",
        day: "יום",
        of: "מתוך",
        daysToShavuot: "ימים לשבועות",
        week: "שבוע",
        weeks: "שבועות",
        and: "ו",
        days: "ימים",
        countingStarted: "הספירה התחילה מביכורים",
        countingNotStarted: "ספירת העומר תתחיל בביכורים",
        countingCompleted: "ספירת העומר הושלמה בשבועות",
        shavuotReached: "היום הוא שבועות!"
    }
};

/**
 * Calcula el día actual del Omer
 * @param {Date|string} firstfruitsDate - Fecha de Primicias
 * @param {Date|string} currentDate - Fecha actual (opcional, por defecto hoy)
 * @returns {Object}
 */
OmerCounter.calculateOmerDay = function(firstfruitsDate, currentDate = null) {
    const firstfruits = typeof firstfruitsDate === 'string' ? new Date(firstfruitsDate) : firstfruitsDate;
    const today = currentDate ? (typeof currentDate === 'string' ? new Date(currentDate) : currentDate) : new Date();

    // Normalizar fechas a medianoche para comparación exacta
    firstfruits.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Calcular diferencia en días
    const diffTime = today - firstfruits;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // El día del Omer (1-50)
    const omerDay = diffDays + 1; // Primicias es día 1

    // Calcular semanas y días
    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    // Estado del conteo
    let status;
    if (omerDay < 1) {
        status = 'not_started';
    } else if (omerDay >= 1 && omerDay <= 50) {
        status = 'counting';
    } else {
        status = 'completed';
    }

    return {
        omerDay: omerDay,
        weeks: weeks,
        remainingDays: remainingDays,
        daysUntilShavuot: 50 - omerDay,
        status: status,
        isShavuot: omerDay === 50,
        firstfruitsDate: firstfruits,
        percentage: Math.min(100, Math.max(0, (omerDay / 50) * 100))
    };
};

/**
 * Genera el HTML del contador para mostrar en el calendario
 * @param {Object} omerData - Datos del Omer calculados
 * @param {string} lang - Código de idioma
 * @returns {string}
 */
OmerCounter.generateHTML = function(omerData, lang = 'es') {
    const t = OmerCounter.translations[lang] || OmerCounter.translations.es;

    if (omerData.status === 'not_started') {
        return `
            <div class="omer-counter not-started">
                <div class="omer-icon">
                    <i class="fas fa-seedling"></i>
                </div>
                <div class="omer-message">
                    ${t.countingNotStarted}
                </div>
            </div>
        `;
    }

    if (omerData.status === 'completed') {
        return `
            <div class="omer-counter completed">
                <div class="omer-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="omer-message">
                    ${t.countingCompleted}
                </div>
            </div>
        `;
    }

    if (omerData.isShavuot) {
        return `
            <div class="omer-counter shavuot">
                <div class="omer-icon celebration">
                    <i class="fas fa-star"></i>
                </div>
                <div class="omer-title">${t.shavuotReached}</div>
                <div class="omer-day-number">
                    ${t.day} 50
                </div>
            </div>
        `;
    }

    // Durante el conteo (días 1-49)
    return `
        <div class="omer-counter counting">
            <div class="omer-header">
                <h5 class="omer-title">
                    <i class="fas fa-calendar-check me-2"></i>${t.title}
                </h5>
            </div>
            <div class="omer-body">
                <div class="omer-day-display">
                    <div class="omer-day-number">${omerData.omerDay}</div>
                    <div class="omer-day-label">${t.day} ${omerData.omerDay} ${t.of} 50</div>
                </div>

                <div class="omer-progress">
                    <div class="progress" style="height: 25px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                             role="progressbar"
                             style="width: ${omerData.percentage}%"
                             aria-valuenow="${omerData.omerDay}"
                             aria-valuemin="0"
                             aria-valuemax="50">
                            ${Math.round(omerData.percentage)}%
                        </div>
                    </div>
                </div>

                <div class="omer-weeks">
                    ${omerData.weeks > 0 ? `
                        <span class="badge bg-primary">
                            ${omerData.weeks} ${omerData.weeks === 1 ? t.week : t.weeks}
                            ${omerData.remainingDays > 0 ? ` ${t.and} ${omerData.remainingDays} ${t.days}` : ''}
                        </span>
                    ` : `
                        <span class="badge bg-secondary">
                            ${omerData.remainingDays} ${t.days}
                        </span>
                    `}
                </div>

                <div class="omer-remaining">
                    <i class="fas fa-clock me-2"></i>
                    <strong>${omerData.daysUntilShavuot}</strong> ${t.daysToShavuot}
                </div>
            </div>
        </div>
    `;
};

/**
 * Actualiza el contador del Omer en la interfaz
 * @param {Date|string} firstfruitsDate - Fecha de Primicias
 * @param {string} lang - Código de idioma
 * @param {string} containerId - ID del contenedor HTML (opcional)
 */
OmerCounter.updateDisplay = function(firstfruitsDate, lang = 'es', containerId = 'omerCounterContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const omerData = OmerCounter.calculateOmerDay(firstfruitsDate);
    const html = OmerCounter.generateHTML(omerData, lang);

    container.innerHTML = html;
};

/**
 * Verifica si hoy está dentro del período de conteo del Omer
 * @param {Date|string} firstfruitsDate - Fecha de Primicias
 * @returns {boolean}
 */
OmerCounter.isCountingPeriod = function(firstfruitsDate) {
    const omerData = OmerCounter.calculateOmerDay(firstfruitsDate);
    return omerData.status === 'counting';
};

/**
 * Obtiene el mensaje del día del Omer para notificaciones
 * @param {Date|string} firstfruitsDate - Fecha de Primicias
 * @param {string} lang - Código de idioma
 * @returns {string|null}
 */
OmerCounter.getDailyMessage = function(firstfruitsDate, lang = 'es') {
    const omerData = OmerCounter.calculateOmerDay(firstfruitsDate);
    const t = OmerCounter.translations[lang] || OmerCounter.translations.es;

    if (omerData.status !== 'counting' && !omerData.isShavuot) {
        return null;
    }

    if (omerData.isShavuot) {
        return `🎉 ${t.shavuotReached}`;
    }

    return `📅 ${t.day} ${omerData.omerDay} ${t.of} 50 - ${t.countingStarted}`;
};

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.OmerCounter = OmerCounter;
}

// Exportar para Node.js (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OmerCounter;
}
