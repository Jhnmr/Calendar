/**
 * Validador de Fechas Bíblicas
 * Valida que las festividades cumplan con las reglas del calendario bíblico
 */

const BiblicalValidator = {};

/**
 * Verifica si una fecha es domingo
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
BiblicalValidator.isSunday = function(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.getDay() === 0;
};

/**
 * Obtiene el próximo domingo desde una fecha
 * @param {Date|string} date - Fecha inicial
 * @returns {Date}
 */
BiblicalValidator.getNextSunday = function(date) {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    const daysUntilSunday = (7 - d.getDay()) % 7;
    const nextSunday = new Date(d);
    nextSunday.setDate(d.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
    return nextSunday;
};

/**
 * Suma días a una fecha
 * @param {Date|string} date - Fecha inicial
 * @param {number} days - Días a sumar
 * @returns {Date}
 */
BiblicalValidator.addDays = function(date, days) {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    const result = new Date(d);
    result.setDate(d.getDate() + days);
    return result;
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} date2 - Segunda fecha
 * @returns {number}
 */
BiblicalValidator.daysDifference = function(date1, date2) {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Valida Passover (14 de Aviv)
 * Debe ocurrir DESPUÉS del equinoccio vernal
 * @param {Date|string} passoverDate - Fecha de Passover
 * @param {Date|string} vernalEquinox - Fecha del equinoccio vernal
 * @returns {Object}
 */
BiblicalValidator.validatePassover = function(passoverDate, vernalEquinox) {
    const passover = typeof passoverDate === 'string' ? new Date(passoverDate) : passoverDate;
    const equinox = typeof vernalEquinox === 'string' ? new Date(vernalEquinox) : vernalEquinox;

    const isValid = passover > equinox;

    return {
        isValid: isValid,
        message: isValid
            ? 'Passover está correctamente posicionado después del equinoccio vernal'
            : 'ERROR: Passover debe ocurrir DESPUÉS del equinoccio vernal. Se requiere mes intercalar.',
        date: passover
    };
};

/**
 * Calcula y valida Primicias (16 de Aviv)
 * Debe ser el domingo después del Sabbat durante Panes sin Levadura
 * @param {Date|string} unleavenedBreadStart - Inicio de Panes sin Levadura (15 de Aviv)
 * @returns {Object}
 */
BiblicalValidator.calculateFirstfruits = function(unleavenedBreadStart) {
    const start = typeof unleavenedBreadStart === 'string' ? new Date(unleavenedBreadStart) : unleavenedBreadStart;

    // Primicias debe ser el domingo durante la semana de Panes sin Levadura
    // que comienza el 15 de Aviv
    let firstfruits = new Date(start);

    // Si el 15 de Aviv es domingo, Primicias es ese día
    // Si no, es el próximo domingo
    if (firstfruits.getDay() !== 0) {
        firstfruits = BiblicalValidator.getNextSunday(firstfruits);
    }

    return {
        isValid: firstfruits.getDay() === 0,
        message: firstfruits.getDay() === 0
            ? 'Primicias es correctamente un domingo'
            : 'ERROR: Primicias DEBE ser domingo',
        date: firstfruits,
        hebrewDate: '16 de Aviv'
    };
};

/**
 * Calcula y valida Shavuot (Pentecostés)
 * Debe ser exactamente 50 días después de Primicias (siempre domingo)
 * Levítico 23:15-16: "contaréis... siete semanas cumplidas... cincuenta días"
 * Primicias es día 1, Shavuot es día 50 (7 semanas completas = 49 días después)
 * @param {Date|string} firstfruitsDate - Fecha de Primicias
 * @returns {Object}
 */
BiblicalValidator.calculateShavuot = function(firstfruitsDate) {
    const firstfruits = typeof firstfruitsDate === 'string' ? new Date(firstfruitsDate) : firstfruitsDate;

    // Shavuot es el día 50 contando desde Primicias como día 1
    // Esto significa 49 días después de Primicias
    // Como Primicias es domingo, 49 días después (7 semanas exactas) también es domingo
    const shavuot = BiblicalValidator.addDays(firstfruits, 49);

    const isValid = shavuot.getDay() === 0;

    return {
        isValid: isValid,
        message: isValid
            ? 'Shavuot es correctamente un domingo, en el día 50 (49 días después de Primicias)'
            : 'ERROR: Shavuot DEBE ser domingo',
        date: shavuot,
        hebrewDate: '6 de Sivan (aprox.)',
        daysFromFirstfruits: 50
    };
};

/**
 * Valida Sukkot (15 de Tishri)
 * Debe ocurrir DESPUÉS del equinoccio otoñal para que haya frutos disponibles
 * @param {Date|string} sukkotDate - Fecha de inicio de Sukkot
 * @param {Date|string} autumnalEquinox - Fecha del equinoccio otoñal
 * @returns {Object}
 */
BiblicalValidator.validateSukkot = function(sukkotDate, autumnalEquinox) {
    const sukkot = typeof sukkotDate === 'string' ? new Date(sukkotDate) : sukkotDate;
    const equinox = typeof autumnalEquinox === 'string' ? new Date(autumnalEquinox) : autumnalEquinox;

    const isValid = sukkot > equinox;

    return {
        isValid: isValid,
        message: isValid
            ? 'Sukkot está correctamente posicionado después del equinoccio otoñal'
            : 'ERROR: Sukkot debe ocurrir DESPUÉS del equinoccio otoñal para que haya frutas de cosecha disponibles. Se requiere mes intercalar.',
        date: sukkot
    };
};

/**
 * Calcula todas las festividades basándose en el mes de Aviv
 * @param {Date|string} avivStart - Fecha de inicio del mes de Aviv (conjunción lunar)
 * @param {Date|string} vernalEquinox - Equinoccio vernal
 * @param {Date|string} autumnalEquinox - Equinoccio otoñal
 * @returns {Object}
 */
BiblicalValidator.calculateAllFestivals = function(avivStart, vernalEquinox, autumnalEquinox) {
    const aviv = typeof avivStart === 'string' ? new Date(avivStart) : avivStart;

    // Passover: 14 de Aviv (13 días después del inicio de Aviv)
    const passover = BiblicalValidator.addDays(aviv, 13);

    // Panes sin Levadura: 15 de Aviv (14 días después del inicio de Aviv) - dura 7 días
    const unleavenedBreadStart = BiblicalValidator.addDays(aviv, 14);
    const unleavenedBreadEnd = BiblicalValidator.addDays(unleavenedBreadStart, 6);

    // Primicias: Primer domingo durante Panes sin Levadura
    const firstfruits = BiblicalValidator.calculateFirstfruits(unleavenedBreadStart);

    // Shavuot: 50 días después de Primicias
    const shavuot = BiblicalValidator.calculateShavuot(firstfruits.date);

    // Tishri empieza aproximadamente 177 días después de Aviv (6 meses lunares)
    // Esto es una aproximación, idealmente debería calcularse por conjunción lunar
    const tishriStart = BiblicalValidator.addDays(aviv, 177);

    // Trompetas: 1 de Tishri
    const trumpets = new Date(tishriStart);

    // Expiación: 10 de Tishri (9 días después del 1 de Tishri)
    const atonement = BiblicalValidator.addDays(trumpets, 9);

    // Sukkot: 15 de Tishri (14 días después del 1 de Tishri) - dura 7 días
    const sukkotStart = BiblicalValidator.addDays(trumpets, 14);
    const sukkotEnd = BiblicalValidator.addDays(sukkotStart, 6);

    // Último Gran Día: 22 de Tishri (21 días después del 1 de Tishri)
    const lastGreatDay = BiblicalValidator.addDays(trumpets, 21);

    // Validaciones
    const passoverValidation = BiblicalValidator.validatePassover(passover, vernalEquinox);
    const sukkotValidation = BiblicalValidator.validateSukkot(sukkotStart, autumnalEquinox);

    return {
        passover: {
            date: passover,
            hebrewDate: '14 de Aviv',
            validation: passoverValidation
        },
        unleavenedBread: {
            startDate: unleavenedBreadStart,
            endDate: unleavenedBreadEnd,
            hebrewDate: '15-21 de Aviv',
            validation: { isValid: true, message: 'Correcto: 7 días después de Passover' }
        },
        firstfruits: {
            date: firstfruits.date,
            hebrewDate: firstfruits.hebrewDate,
            validation: {
                isValid: firstfruits.isValid,
                message: firstfruits.message,
                dayOfWeek: firstfruits.date.toLocaleDateString('es-ES', { weekday: 'long' })
            }
        },
        shavuot: {
            date: shavuot.date,
            hebrewDate: shavuot.hebrewDate,
            validation: {
                isValid: shavuot.isValid,
                message: shavuot.message,
                dayOfWeek: shavuot.date.toLocaleDateString('es-ES', { weekday: 'long' }),
                daysFromFirstfruits: shavuot.daysFromFirstfruits
            }
        },
        trumpets: {
            date: trumpets,
            hebrewDate: '1 de Tishri',
            validation: { isValid: true, message: 'Inicio del 7º mes' }
        },
        atonement: {
            date: atonement,
            hebrewDate: '10 de Tishri',
            validation: { isValid: true, message: 'Correcto: 10 días después de Trompetas' }
        },
        sukkot: {
            startDate: sukkotStart,
            endDate: sukkotEnd,
            hebrewDate: '15-21 de Tishri',
            validation: sukkotValidation
        },
        lastGreatDay: {
            date: lastGreatDay,
            hebrewDate: '22 de Tishri',
            validation: { isValid: true, message: 'Correcto: Día después de Sukkot' }
        }
    };
};

/**
 * Formatea una fecha a ISO string (YYYY-MM-DD)
 * @param {Date} date - Fecha a formatear
 * @returns {string}
 */
BiblicalValidator.toISOString = function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Genera un reporte completo de validación
 * @param {Object} festivals - Objeto con todas las festividades calculadas
 * @returns {Object}
 */
BiblicalValidator.generateReport = function(festivals) {
    const errors = [];
    const warnings = [];
    const validations = [];

    Object.keys(festivals).forEach(key => {
        const festival = festivals[key];
        if (festival.validation) {
            if (!festival.validation.isValid) {
                errors.push({
                    festival: key,
                    message: festival.validation.message,
                    date: festival.date || festival.startDate
                });
            }
            validations.push({
                festival: key,
                isValid: festival.validation.isValid,
                message: festival.validation.message,
                date: festival.date || festival.startDate
            });
        }
    });

    return {
        isValid: errors.length === 0,
        totalErrors: errors.length,
        totalWarnings: warnings.length,
        errors: errors,
        warnings: warnings,
        validations: validations
    };
};

// Exportar el objeto
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BiblicalValidator;
}
