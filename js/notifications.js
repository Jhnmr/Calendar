/**
 * Sistema de Notificaciones para Festividades Bíblicas
 * Muestra alertas cuando se aproximan festividades importantes
 */

const Notifications = {};

/**
 * Traducciones para notificaciones
 */
Notifications.translations = {
    es: {
        approaching: "Se aproxima",
        in: "en",
        days: "días",
        day: "día",
        tomorrow: "mañana",
        today: "hoy",
        prepare: "Prepárate",
        reminder: "Recordatorio",
        close: "Cerrar"
    },
    en: {
        approaching: "Approaching",
        in: "in",
        days: "days",
        day: "day",
        tomorrow: "tomorrow",
        today: "today",
        prepare: "Prepare",
        reminder: "Reminder",
        close: "Close"
    },
    tl: {
        approaching: "Papalapit",
        in: "sa",
        days: "araw",
        day: "araw",
        tomorrow: "bukas",
        today: "ngayon",
        prepare: "Maghanda",
        reminder: "Paalala",
        close: "Isara"
    },
    he: {
        approaching: "מתקרב",
        in: "בעוד",
        days: "ימים",
        day: "יום",
        tomorrow: "מחר",
        today: "היום",
        prepare: "התכונן",
        reminder: "תזכורת",
        close: "סגור"
    }
};

/**
 * Configuración de notificaciones por festividad
 * Días antes de la festividad en los que se debe notificar
 */
Notifications.config = {
    1: [30, 7, 3, 1, 0], // Passover
    2: [7, 3, 1, 0],     // Panes sin Levadura
    3: [7, 3, 1, 0],     // Primicias
    4: [7, 3, 1, 0],     // Shavuot
    5: [30, 7, 3, 1, 0], // Trompetas
    6: [7, 3, 1, 0],     // Expiación
    7: [30, 7, 3, 1, 0], // Sukkot
    8: [3, 1, 0]         // Último Gran Día
};

/**
 * Calcula los días hasta una fecha
 * @param {Date|string} targetDate - Fecha objetivo
 * @returns {number}
 */
Notifications.daysUntil = function(targetDate) {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    const today = new Date();

    // Normalizar fechas a medianoche
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

/**
 * Obtiene las notificaciones pendientes para hoy
 * @param {Array} festivals - Lista de festividades
 * @returns {Array}
 */
Notifications.getPendingNotifications = function(festivals) {
    const pending = [];

    festivals.forEach(festival => {
        const daysUntil = Notifications.daysUntil(festival.start_date);
        const config = Notifications.config[festival.id] || [7, 3, 1, 0];

        // Verificar si hoy es un día de notificación
        if (config.includes(daysUntil) && daysUntil >= 0) {
            pending.push({
                festival: festival,
                daysUntil: daysUntil,
                urgency: daysUntil === 0 ? 'high' : (daysUntil <= 3 ? 'medium' : 'low')
            });
        }
    });

    return pending;
};

/**
 * Formatea el texto de días
 * @param {number} days - Número de días
 * @param {string} lang - Código de idioma
 * @returns {string}
 */
Notifications.formatDays = function(days, lang = 'es') {
    const t = Notifications.translations[lang] || Notifications.translations.es;

    if (days === 0) return t.today;
    if (days === 1) return t.tomorrow;

    return `${t.in} ${days} ${days === 1 ? t.day : t.days}`;
};

/**
 * Genera HTML para una notificación
 * @param {Object} notification - Objeto de notificación
 * @param {string} lang - Código de idioma
 * @returns {string}
 */
Notifications.generateNotificationHTML = function(notification, lang = 'es') {
    const t = Notifications.translations[lang] || Notifications.translations.es;
    const festival = notification.festival;
    const urgencyClass = notification.urgency === 'high' ? 'alert-danger' :
                         (notification.urgency === 'medium' ? 'alert-warning' : 'alert-info');

    const icon = notification.urgency === 'high' ? '🔔' :
                 (notification.urgency === 'medium' ? '⏰' : 'ℹ️');

    const daysText = Notifications.formatDays(notification.daysUntil, lang);

    return `
        <div class="alert ${urgencyClass} alert-dismissible fade show notification-item" role="alert">
            <div class="d-flex align-items-start">
                <div class="notification-icon me-3">
                    ${icon}
                </div>
                <div class="flex-grow-1">
                    <h6 class="alert-heading mb-1">
                        ${notification.daysUntil === 0 ? '¡' : ''}${festival.name}${notification.daysUntil === 0 ? '!' : ''}
                    </h6>
                    <p class="mb-1">
                        ${t.approaching} <strong>${daysText}</strong>
                    </p>
                    ${festival.description_short ? `<small>${festival.description_short}</small>` : ''}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="${t.close}"></button>
            </div>
        </div>
    `;
};

/**
 * Muestra las notificaciones en el contenedor especificado
 * @param {Array} festivals - Lista de festividades
 * @param {string} lang - Código de idioma
 * @param {string} containerId - ID del contenedor HTML
 */
Notifications.displayNotifications = function(festivals, lang = 'es', containerId = 'notificationsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pending = Notifications.getPendingNotifications(festivals);

    if (pending.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    // Ordenar por urgencia y días
    pending.sort((a, b) => {
        if (a.daysUntil !== b.daysUntil) return a.daysUntil - b.daysUntil;
        return a.festival.importance === 'high' ? -1 : 1;
    });

    let html = '';
    pending.forEach(notification => {
        html += Notifications.generateNotificationHTML(notification, lang);
    });

    container.innerHTML = html;
    container.style.display = 'block';
};

/**
 * Verifica si se deben mostrar notificaciones y las muestra
 * @param {Array} festivals - Lista de festividades
 * @param {string} lang - Código de idioma
 */
Notifications.checkAndDisplay = function(festivals, lang = 'es') {
    // Verificar si el usuario ha deshabilitado las notificaciones
    const notificationsEnabled = localStorage.getItem('notifications_enabled');
    if (notificationsEnabled === 'false') {
        return;
    }

    Notifications.displayNotifications(festivals, lang, 'notificationsContainer');
};

/**
 * Habilita o deshabilita las notificaciones
 * @param {boolean} enabled - True para habilitar, false para deshabilitar
 */
Notifications.setEnabled = function(enabled) {
    localStorage.setItem('notifications_enabled', enabled ? 'true' : 'false');

    if (!enabled) {
        const container = document.getElementById('notificationsContainer');
        if (container) {
            container.innerHTML = '';
            container.style.display = 'none';
        }
    }
};

/**
 * Verifica si las notificaciones están habilitadas
 * @returns {boolean}
 */
Notifications.isEnabled = function() {
    const enabled = localStorage.getItem('notifications_enabled');
    return enabled !== 'false'; // Por defecto, habilitadas
};

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.Notifications = Notifications;
}

// Exportar para Node.js (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Notifications;
}
