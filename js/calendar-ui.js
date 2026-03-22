

/**
 * Carga la información para la vista Acerca de
 */
function loadAboutInfo() {
    // Actualizar información del año
    const aboutYearName = document.getElementById('aboutYearName');
    const aboutYearStart = document.getElementById('aboutYearStart');
    const aboutYearEnd = document.getElementById('aboutYearEnd');
    const aboutMonthsCount = document.getElementById('aboutMonthsCount');
    
    if (aboutYearName && aboutYearStart && aboutYearEnd && aboutMonthsCount) {
        aboutYearName.textContent = CalendarData.year.name;
        
        // Formatear fechas según el idioma
        const startDate = new Date(CalendarData.year.start_date);
        const endDate = new Date(CalendarData.year.end_date);
        
        aboutYearStart.textContent = startDate.toLocaleDateString(
            currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
        
        aboutYearEnd.textContent = endDate.toLocaleDateString(
            currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
        
        aboutMonthsCount.textContent = CalendarData.months.length;
    }
    
    // Cargar información de las tribus
    const tribesContainer = document.getElementById('tribesContainer');
    if (tribesContainer) {
        let tribesHTML = '';
        
        CalendarData.months.forEach(month => {
            tribesHTML += `
                <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                    <div class="tribe-card">
                        <div class="tribe-icon">
                            <i class="fas fa-star-of-david"></i>
                        </div>
                        <div class="tribe-name">${month.tribe_name}</div>
                        <div class="tribe-hebrew-name hebrew-text">${month.tribe_hebrew_name}</div>
                    </div>
                </div>
            `;
        });
        
        tribesContainer.innerHTML = tribesHTML;
    }
}

/**
 * Configura los indicadores de festividades para mostrar detalles
 */
function setupFestivalIndicators() {
    document.querySelectorAll('.festival-indicator').forEach(indicator => {
        indicator.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague al día
            const festivalId = parseInt(this.getAttribute('data-festival-id'));
            showFestivalDetails(festivalId);
        });
    });
}

/**
 * Configura los botones para ver detalles de festividades
 */
function setupFestivalDetailButtons() {
    document.querySelectorAll('.festival-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar propagación si está dentro de una tarjeta
            const festivalId = parseInt(this.getAttribute('data-festival-id'));
            showFestivalDetails(festivalId);
        });
    });
}/**
 * Funciones de Interfaz para el Calendario Hebreo
 */

// Variables globales
let currentLanguage = 'es';
let currentMonthId = 1;

/**
 * Funciones de utilidad para eventos
 * (Moviendo estas funciones al principio del archivo para evitar errores de referencia)
 */

/**
 * Carga eventos personalizados desde localStorage
 * @returns {Array}

/**
 * Navega al mes anterior
 */
function navigateToPreviousMonth() {
    if (currentMonthId > 1) {
        currentMonthId--;
        document.getElementById('monthSelector').value = currentMonthId;
        loadCalendar();
    }
}

/**
 * Navega al mes siguiente
 */
function navigateToNextMonth() {
    if (currentMonthId < CalendarData.months.length) {
        currentMonthId++;
        document.getElementById('monthSelector').value = currentMonthId;
        loadCalendar();
    }
}

/**
 * Muestra los detalles de una festividad
 * @param {number} festivalId - ID de la festividad
 */
function showFestivalDetails(festivalId) {
    const festival = CalendarData.festivals.find(f => f.id === festivalId);
    if (!festival) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Formatear fechas
    const startFormatted = CalendarData.utils.formatDate(festival.start_date, currentLanguage);
    const endFormatted = festival.end_date ? CalendarData.utils.formatDate(festival.end_date, currentLanguage) : null;
    
    // Determinar duración
    const duration = festival.end_date ? 
        Math.ceil((new Date(festival.end_date) - new Date(festival.start_date)) / (1000 * 60 * 60 * 24)) + 1 : 
        1;
    
    // Texto de duración según el idioma
    const durationText = duration === 1 ? 
        (translations.day || 'día') : 
        (translations.days || 'días');
    
    // Actualizar el título del modal y el botón de cerrar
    document.getElementById('festivalModalTitle').textContent = festival.name;
    const festivalModalCloseBtn = document.querySelector('#festivalModal .modal-footer .btn-secondary');
    if (festivalModalCloseBtn) {
        festivalModalCloseBtn.textContent = translations.close || 'Cerrar';
    }
    
    // Preparar el contenido del modal
    const modalContent = `
        <div class="row">
            <div class="col-md-7">
                <div class="card mb-3">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">${translations.date_info || 'Información de Fecha'}</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between">
                                <span>${translations.start_date || 'Fecha de inicio'}:</span>
                                <strong>${startFormatted}${festival.start_at_sunset ? ` (${translations.at_sunset || 'al atardecer'})` : ''}</strong>
                            </li>
                            ${festival.end_date ? `
                            <li class="list-group-item d-flex justify-content-between">
                                <span>${translations.end_date || 'Fecha de fin'}:</span>
                                <strong>${endFormatted}</strong>
                            </li>
                            ` : ''}
                            <li class="list-group-item d-flex justify-content-between">
                                <span>${translations.duration || 'Duración'}:</span>
                                <strong>${duration} ${durationText}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="card mb-3">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">${translations.festival_info || 'Información de la Festividad'}</h5>
                    </div>
                    <div class="card-body">
                        <h6>${translations.hebrew_name || 'Nombre Hebreo'}:</h6>
                        <p class="hebrew-text mb-3">${festival.hebrew_name}</p>
                        
                        <h6>${translations.type || 'Tipo'}:</h6>
                        <p class="mb-3">${translations.biblical_festival || 'Festividad Bíblica'}</p>
                        
                        <h6>${translations.description || 'Descripción'}:</h6>
                        <p class="mb-3">${festival.description_short}</p>
                        
                        <h6>${translations.detailed_description || 'Descripción Detallada'}:</h6>
                        <p class="mb-3">${festival.description_long}</p>
                        
                        <h6>${translations.biblical_references || 'Referencias Bíblicas'}:</h6>
                        <p class="mb-3">${festival.biblical_refs}</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-5">
                <div class="card mb-3">
                    <img src="${festival.image_url}" class="card-img-top festival-image" alt="${festival.name}">
                    <div class="card-body">
                        <h5 class="card-title">${translations.about_this_festival || 'Sobre esta Festividad'}</h5>
                        <p class="card-text">${translations.biblical_festival_info || 'Esta es una festividad bíblica basada en las Escrituras'}</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">${translations.preparation_steps || 'Pasos de Preparación'}</h5>
                    </div>
                    <div class="card-body">
                        ${festival.preparations ? `
                        <ol class="mb-0">
                            ${festival.preparations.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                        ` : `<p class="text-muted mb-0">${translations.no_preparation_steps || 'No hay pasos de preparación específicos'}</p>`}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Actualizar el contenido del modal
    document.getElementById('festivalModalBody').innerHTML = modalContent;
    
    // Mostrar el modal
    const festivalModal = new bootstrap.Modal(document.getElementById('festivalModal'));
    festivalModal.show();
}

/**
 * Carga la lista completa de festividades para la vista de Festividades
 */
function loadFestivalsList() {
    const festivalsContainer = document.getElementById('festivalsContainer');
    if (!festivalsContainer) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Generar HTML para cada festividad
    let festivalsHTML = '';
    
    CalendarData.festivals.forEach(festival => {
        // Formatear fechas
        const startFormatted = CalendarData.utils.formatDate(festival.start_date, currentLanguage);
        const endFormatted = festival.end_date ? CalendarData.utils.formatDate(festival.end_date, currentLanguage) : null;
        
        // Icono según importancia
        let importanceBadge = '';
        switch (festival.importance) {
            case 'high':
                importanceBadge = `<span class="badge bg-danger">${translations.high_importance || 'Alta Importancia'}</span>`;
                break;
            case 'medium':
                importanceBadge = `<span class="badge bg-warning text-dark">${translations.medium_importance || 'Importancia Media'}</span>`;
                break;
            default:
                importanceBadge = `<span class="badge bg-info">${translations.low_importance || 'Baja Importancia'}</span>`;
        }
        
        // Crear tarjeta de festividad
        festivalsHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card festival-card h-100 shadow" data-festival-id="${festival.id}">
                    <img src="${festival.image_url}" class="card-img-top festival-image" alt="${festival.name}">
                    <div class="card-body">
                        <h5 class="card-title">${festival.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted hebrew-text">${festival.hebrew_name}</h6>
                        <p class="card-text">${festival.description_short}</p>
                        <p class="text-muted">
                            <i class="fas fa-calendar-alt me-2"></i> 
                            ${startFormatted}${endFormatted ? ` - ${endFormatted}` : ''}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            ${importanceBadge}
                            <button class="btn btn-primary festival-details-btn" data-festival-id="${festival.id}">
                                ${translations.view_details || 'Ver detalles'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    festivalsContainer.innerHTML = festivalsHTML;
    
    // Configurar eventos para las tarjetas
    setupFestivalDetailButtons();
    
    // Configurar clic en la tarjeta completa
    document.querySelectorAll('.festival-card').forEach(card => {
        card.addEventListener('click', function() {
            const festivalId = parseInt(this.getAttribute('data-festival-id'));
            showFestivalDetails(festivalId);
        });
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el idioma guardado en localStorage (si existe)
    loadLanguagePreference();

    // Inicializar la interfaz
    initializeUI();

    // Cargar el calendario
    loadCalendar();

    // Configurar eventos de navegación
    setupNavigationEvents();

    // Configurar eventos de exportación/impresión
    setupExportEvents();

    // Configurar selector de idioma
    setupLanguageSelector();

    // Mostrar la fecha actual
    updateCurrentDateDisplay();

    // Configurar el botón "Hoy"
    setupTodayButton();
    setupThemeToggle();

    // Fix: evitar aria-hidden warning al cerrar el modal con foco en su interior
    const festivalModalEl = document.getElementById('festivalModal');
    if (festivalModalEl) {
        festivalModalEl.addEventListener('hide.bs.modal', function() {
            if (document.activeElement && festivalModalEl.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        });
    }
});

/**
 * Carga la preferencia de idioma desde localStorage
 */
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('calendar_language');
    if (savedLanguage && ['es', 'en', 'tl', 'he'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        document.documentElement.lang = currentLanguage;
        
        // Actualizar el texto del botón de idioma
        let langText = 'Español';
        switch (currentLanguage) {
            case 'en':
                langText = 'English';
                break;
            case 'tl':
                langText = 'Tagalog';
                break;
            case 'he':
                langText = 'עברית';
                break;
        }
        
        document.getElementById('languageDropdown').innerHTML = `<i class="fas fa-globe"></i> ${langText}`;
        
        // Marcar el idioma activo en el menú
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-lang') === currentLanguage) {
                item.classList.add('active');
            }
        });
        
        // Actualizar dirección del texto para hebreo
        if (currentLanguage === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
        }
    }
}

/**
 * Inicializa la interfaz de usuario
 */
function initializeUI() {
    // Poblar el selector de meses
    const monthSelector = document.getElementById('monthSelector');
    if (monthSelector) {
        monthSelector.innerHTML = '';
        
        CalendarData.months.forEach(month => {
            const option = document.createElement('option');
            option.value = month.id;
            option.textContent = `${month.name} (${CalendarData.utils.formatDate(month.start_date, currentLanguage)} - ${CalendarData.utils.formatDate(month.end_date, currentLanguage)})`;
            monthSelector.appendChild(option);
        });
        
        // Configurar evento de cambio para el selector de meses
        monthSelector.addEventListener('change', function() {
            currentMonthId = parseInt(this.value);
            loadCalendar();
        });
    }
    
    // Configurar botones de navegación
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            navigateToPreviousMonth();
        });
    }
    
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            navigateToNextMonth();
        });
    }
    
    // Configurar la navegación entre vistas
    setupViewNavigation();
}

/**
 * Configura la navegación entre diferentes vistas
 */
function setupViewNavigation() {
    const navItems = {
        'navCalendar': 'calendarView',
        'navFestivals': 'festivalsView',
        'navAbout': 'aboutView'
    };

    Object.keys(navItems).forEach(navId => {
        const navItem = document.getElementById(navId);
        if (navItem) {
            navItem.addEventListener('click', function(e) {
                e.preventDefault();

                // Ocultar todas las vistas
                document.querySelectorAll('.view-section').forEach(section => {
                    section.classList.add('d-none');
                });

                // Mostrar la vista seleccionada
                document.getElementById(navItems[navId]).classList.remove('d-none');

                // Actualizar la navegación activa
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Cargar el contenido específico de la vista si es necesario
                if (navId === 'navFestivals') {
                    loadFestivalsList();
                } else if (navId === 'navAbout') {
                    loadAboutInfo();
                }
            });
        }
    });
}

/**
 * Configura los eventos de navegación
 */
function setupNavigationEvents() {
    // Ya configurado en initializeUI y setupViewNavigation
}

/**
 * Configura los eventos de impresión
 */
function setupExportEvents() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            generatePrintFlyer();
            window.print();
        });
    }
}

/**
 * Configura el selector de idioma
 */// Corregir en js/calendar-ui.js
function setupLanguageSelector() {
    document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const newLang = this.getAttribute('data-lang');
            if (newLang !== currentLanguage) {
                // Guardar preferencia
                localStorage.setItem('calendar_language', newLang);
                currentLanguage = newLang;
                
                // Actualizar la interfaz
                document.documentElement.lang = currentLanguage;
                
                // Marcar el idioma activo en el menú
                document.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                
                // Actualizar texto del botón
                let langText = 'Español';
                switch (newLang) {
                    case 'en': langText = 'English'; break;
                    case 'tl': langText = 'Tagalog'; break;
                    case 'he': langText = 'עברית'; break;
                }
                
                document.getElementById('languageDropdown').innerHTML = `<i class="fas fa-globe"></i> ${langText}`;
                
                // Actualizar todos los elementos traducibles
                updateAllTranslations();
                
                // Recargar el calendario con el nuevo idioma
                loadCalendar();
            }
        });
    });
}

// Añadir esta nueva función para actualizar todas las traducciones
function updateAllTranslations() {
    const translations = CalendarData.translations[currentLanguage] || CalendarData.translations.es;

    // Actualizar textos de navegación
    const navCalendar = document.getElementById('navCalendar');
    const navFestivals = document.getElementById('navFestivals');
    const navAbout = document.getElementById('navAbout');

    if (navCalendar) navCalendar.innerHTML = `<i class="fas fa-calendar-days me-1"></i> ${translations.calendar || 'Calendario'}`;
    if (navFestivals) navFestivals.innerHTML = `<i class="fas fa-menorah me-1"></i> ${translations.festivals || 'Festividades'}`;
    if (navAbout) navAbout.innerHTML = `<i class="fas fa-info-circle me-1"></i> ${translations.about || 'Acerca de'}`;

    // Actualizar título del calendario (respetando los spans para responsive)
    const calendarTitle = document.getElementById('calendarTitle');
    if (calendarTitle) {
        const titleText = translations.calendar || 'Calendario de ELOHIM';
        calendarTitle.innerHTML = `<i class="fas fa-calendar-alt me-2"></i> <span class="d-none d-sm-inline">${titleText}</span><span class="d-sm-none">${titleText.split(' ')[0]}</span>`;
    }

    // Actualizar botones
    const todayBtn = document.getElementById('todayBtn');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const printBtn = document.getElementById('printBtn');

    if (todayBtn) todayBtn.innerHTML = `<i class="fas fa-calendar-day"></i> ${translations.today || 'Hoy'}`;
    if (prevMonthBtn) prevMonthBtn.innerHTML = `<i class="fas fa-chevron-left"></i> ${translations.previous || 'Anterior'}`;
    if (nextMonthBtn) nextMonthBtn.innerHTML = `${translations.next || 'Siguiente'} <i class="fas fa-chevron-right"></i>`;
    if (printBtn) printBtn.innerHTML = `<i class="fas fa-print"></i> ${translations.print || 'Imprimir'}`;

    // Actualizar títulos de secciones
    const monthInfoTitle = document.querySelector('#monthInfo')?.closest('.card')?.querySelector('.card-header h5');
    if (monthInfoTitle) monthInfoTitle.innerHTML = `<i class="fas fa-info-circle me-2"></i>${translations.month_info || 'Información del Mes'}`;

    const moonPhaseTitle = document.querySelector('#currentMoonPhase')?.closest('.card')?.querySelector('.card-header h5');
    if (moonPhaseTitle) moonPhaseTitle.innerHTML = `<i class="fas fa-moon me-2"></i>${translations.month_phase_title || 'Fase Lunar Actual'}`;

    const festivalsThisMonthTitle = document.querySelector('#festivalsList')?.closest('.card')?.querySelector('.card-header h5');
    if (festivalsThisMonthTitle) festivalsThisMonthTitle.innerHTML = `<i class="fas fa-menorah me-2"></i>${translations.festivals_this_month || 'Festividades Este Mes'}`;

    // Actualizar título de escritura del mes
    const scriptureTitle = document.getElementById('scriptureTitle');
    if (scriptureTitle) scriptureTitle.textContent = translations.scripture_of_month || 'Escritura del Mes';

    // Actualizar leyenda del calendario
    updateCalendarLegend();

    // Actualizar vista de festividades
    const festivalsViewTitle = document.querySelector('#festivalsView h1');
    if (festivalsViewTitle) festivalsViewTitle.innerHTML = `<i class="fas fa-menorah me-2"></i>${translations.festivals || 'Festividades Sagradas'}`;

    // Actualizar vista Acerca de
    updateAboutViewTranslations();

    // Actualizar dirección de texto para hebreo
    if (currentLanguage === 'he') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    // Actualizar fecha actual
    updateCurrentDateDisplay();

    // Actualizar botón cerrar del modal de festividades
    const festivalModalCloseBtn = document.querySelector('#festivalModal .modal-footer .btn-secondary');
    if (festivalModalCloseBtn) {
        festivalModalCloseBtn.textContent = translations.close || 'Cerrar';
    }

    // Actualizar título del modal de festividades
    const festivalModalTitle = document.getElementById('festivalModalTitle');
    if (festivalModalTitle && festivalModalTitle.textContent === 'Detalles de Festividad') {
        festivalModalTitle.textContent = translations.festival_details || 'Detalles de Festividad';
    }
}

// Función para actualizar la leyenda del calendario
function updateCalendarLegend() {
    const translations = CalendarData.translations[currentLanguage] || CalendarData.translations.es;

    // Buscar el contenedor de la leyenda por ID o por atributo data
    const legendCard = document.getElementById('calendarLegendTitle') ||
                       document.querySelector('[data-legend-title]');
    if (legendCard) {
        legendCard.textContent = translations.legend || 'Leyenda:';
    }

    // Actualizar los textos de la leyenda por data-attributes
    const legendSpanSat = document.getElementById('legendSaturday');
    const legendSpanCurrent = document.getElementById('legendCurrentDay');
    const legendSpanNewMoon = document.getElementById('legendNewMoon');
    const legendSpanFestival = document.getElementById('legendFestival');
    const legendSpanImportant = document.getElementById('legendImportant');

    if (legendSpanSat) legendSpanSat.textContent = translations.legend_saturday || 'Sábado';
    if (legendSpanCurrent) legendSpanCurrent.textContent = translations.legend_current_day || 'Día actual';
    if (legendSpanNewMoon) legendSpanNewMoon.textContent = translations.legend_new_moon || 'Luna nueva';
    if (legendSpanFestival) legendSpanFestival.textContent = translations.legend_festival || 'Festividad';
    if (legendSpanImportant) legendSpanImportant.textContent = translations.legend_important_festival || 'Festividad importante';
}

// Función para actualizar las traducciones de la vista Acerca de
function updateAboutViewTranslations() {
    const translations = CalendarData.translations[currentLanguage] || CalendarData.translations.es;

    // Actualizar título principal
    const aboutTitle = document.querySelector('#aboutView h1');
    if (aboutTitle) aboutTitle.innerHTML = `<i class="fas fa-info-circle me-2"></i>${translations.about_title || 'Acerca del Calendario de ELOHIM'}`;

    // Actualizar secciones de texto
    const aboutView = document.getElementById('aboutView');
    if (aboutView) {
        const headers = aboutView.querySelectorAll('h5');
        const paragraphs = aboutView.querySelectorAll('p');

        if (headers.length >= 4 && paragraphs.length >= 5) {
            headers[0].textContent = translations.about_what_is || '¿Qué es el Calendario de ELOHIM?';
            paragraphs[0].textContent = translations.about_what_is_text || '';

            headers[1].textContent = translations.about_months || 'Meses del Calendario de ELOHIM';
            paragraphs[1].textContent = translations.about_months_text || '';

            headers[2].textContent = translations.about_festivals_title || 'Festividades Mandadas por ELOHIM';
            paragraphs[2].textContent = translations.about_festivals_text || '';

            headers[3].textContent = translations.about_app || 'Sobre Esta Aplicación';
            paragraphs[3].textContent = translations.about_app_text || '';
        }

        // Actualizar tarjeta de año actual
        const yearCardHeader = aboutView.querySelector('.card-header h5');
        if (yearCardHeader) yearCardHeader.textContent = translations.current_year || 'Año Actual';

        const yearLabels = aboutView.querySelectorAll('.card-body strong');
        if (yearLabels.length >= 4) {
            yearLabels[0].textContent = translations.year || 'Año:';
            yearLabels[1].textContent = translations.year_start || 'Inicio:';
            yearLabels[2].textContent = translations.year_end || 'Fin:';
            yearLabels[3].textContent = translations.total_months || 'Total de meses:';
        }

        // Actualizar título de las 12 tribus
        const tribesCardHeader = aboutView.querySelectorAll('.card-header h5')[1];
        if (tribesCardHeader) tribesCardHeader.textContent = translations.twelve_tribes_title || 'Las Doce Tribus de Israel';
    }
}

/**
 * Configura el botón "Hoy"
 */
function setupTodayButton() {
    const todayBtn = document.getElementById('todayBtn');
    if (todayBtn) {
        todayBtn.addEventListener('click', function() {
            // Encontrar el mes que contiene la fecha actual
            const today = new Date();
            let targetMonthId = null;
            
            for (const month of CalendarData.months) {
                const startDate = new Date(month.start_date);
                const endDate = new Date(month.end_date);
                
                if (today >= startDate && today <= endDate) {
                    targetMonthId = month.id;
                    break;
                }
            }
            
            if (targetMonthId !== null && targetMonthId !== currentMonthId) {
                // Cambiar al mes que contiene la fecha actual
                currentMonthId = targetMonthId;
                
                // Actualizar el selector de meses
                document.getElementById('monthSelector').value = currentMonthId;
                
                // Cargar el calendario
                loadCalendar();
                
                // Desplazarse hasta el día actual
                setTimeout(() => {
                    const currentDayElement = document.querySelector('.day.current-day');
                    if (currentDayElement) {
                        currentDayElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 100);
            } else if (targetMonthId === currentMonthId) {
                // Ya estamos en el mes correcto, solo desplazarse al día actual
                const currentDayElement = document.querySelector('.day.current-day');
                if (currentDayElement) {
                    currentDayElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
}

/**
 * Actualiza la visualización de la fecha actual
 */
function updateCurrentDateDisplay() {
    const currentDateText = document.getElementById('currentDateText');
    const currentHebrewDate = document.getElementById('currentHebrewDate');
    
    if (currentDateText && currentHebrewDate) {
        const today = new Date();
        
        // Formatear la fecha actual en el idioma seleccionado
        let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let locale;
        
        switch (currentLanguage) {
            case 'en':
                locale = 'en-US';
                break;
            case 'tl':
                locale = 'fil-PH';
                break;
            case 'he':
                locale = 'he-IL';
                break;
            default:
                locale = 'es-ES';
        }
        
        const formattedDate = today.toLocaleDateString(locale, dateOptions);
        
        // Obtener texto según el idioma
        const currentDatePrefix = CalendarData.translations[currentLanguage].current_date || 'Fecha actual:';
        
        // Actualizar el texto
        currentDateText.innerHTML = `<i class="fas fa-calendar-day me-2"></i><strong>${currentDatePrefix}:</strong> ${formattedDate}`;
        
        // Encontrar la fecha hebrea correspondiente
        let hebrewDate = '';
        for (const month of CalendarData.months) {
            const startDate = new Date(month.start_date);
            const endDate = new Date(month.end_date);
            
            if (today >= startDate && today <= endDate) {
                // Calcular el día del mes hebreo
                const diffTime = Math.abs(today - startDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                // El día hebreo + 1 (porque los meses hebreos empiezan en 1)
                const hebrewDay = diffDays + 1;
                
                // Obtener el nombre del mes
                hebrewDate = `${hebrewDay} ${month.hebrew_name}`;
                break;
            }
        }
        
        // Actualizar la fecha hebrea
        currentHebrewDate.textContent = hebrewDate;
    }
}

/**
 * Carga el calendario para el mes seleccionado
 */
// Reemplaza la parte de generación de la cuadrícula del calendario con este código:
function loadCalendar() {
    // Obtener el mes actual
    const currentMonth = CalendarData.months.find(month => month.id === currentMonthId);
    if (!currentMonth) return;
    
    // Actualizar título del calendario según el idioma
const translations = CalendarData.translations[currentLanguage] || CalendarData.translations.es;
const calendarTitle = document.getElementById('calendarTitle');
if (calendarTitle) {
    const titleText = translations.calendar || 'Calendario de ELOHIM';
    calendarTitle.innerHTML = `<i class="fas fa-calendar-alt me-2"></i> <span class="d-none d-sm-inline">${titleText}</span><span class="d-sm-none">${titleText.split(' ')[0]}</span>`;
}
    
    // Actualizar el contenedor del calendario
    const calendarContainer = document.getElementById('calendarContainer');
    if (!calendarContainer) return;
    
    // Obtener información del mes
    const startDate = new Date(currentMonth.start_date);
    const endDate = new Date(currentMonth.end_date);
    const daysInMonth = currentMonth.days_count;
    const startWeekday = currentMonth.start_weekday;
    
    // Crear el encabezado del mes
    let monthHeaderHTML = `
        <div class="month-header">
            <div class="month-name">${currentMonth.name}</div>
            <div class="hebrew-name">${currentMonth.hebrew_name} (${currentMonth.transliteration})</div>
            <div class="gregorian-dates">${CalendarData.utils.formatDate(startDate, currentLanguage)} - ${CalendarData.utils.formatDate(endDate, currentLanguage)}</div>
        </div>
    `;
    
    // Crear la cuadrícula de días
    let calendarGridHTML = '<div class="calendar-grid">';
    
    // Nombres de los días de la semana según el idioma
    const weekdays = CalendarData.translations.common.days[currentLanguage] || CalendarData.translations.common.days.es;
    
    // Añadir fila de días de la semana
    calendarGridHTML += '<div class="row weekdays g-0">';
    weekdays.forEach((day, index) => {
        const className = index === 6 ? 'col sabbath' : 'col';
        calendarGridHTML += `<div class="${className}">${day}</div>`;
    });
    calendarGridHTML += '</div>';
    
    // Calcular número de semanas necesarias
    const totalDays = startWeekday + daysInMonth;
    const numWeeks = Math.ceil(totalDays / 7);
    
    // Obtener la fecha actual
    const today = new Date();
    
    // Generar las semanas
    let dayCounter = 1;
    for (let week = 0; week < numWeeks; week++) {
        calendarGridHTML += '<div class="row week g-0">';
        
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            // Determinar si el día está dentro del mes
            const isValidDay = (week === 0 && dayOfWeek >= startWeekday) || (week > 0 && dayCounter <= daysInMonth);
            
            if (isValidDay) {
                // Esta fecha en el calendario gregoriano
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + dayCounter - 1);
                
                // Formato de fecha ISO para comparaciones
                const currentDateISO = currentDate.toISOString().split('T')[0];
                
                // Verificar si es el día actual
                const isCurrentDay = currentDate.getDate() === today.getDate() && 
                                    currentDate.getMonth() === today.getMonth() && 
                                    currentDate.getFullYear() === today.getFullYear();
                
                // Verificar si es sábado
                const isSabbath = dayOfWeek === 6;
                
                // Verificar si es luna nueva
                const isNewMoon = currentMonth.new_moon_date.startsWith(currentDateISO);
                
                // Buscar festividades para este día
                const festivals = CalendarData.festivals.filter(festival => {
                    const festivalStartDate = new Date(festival.start_date);
                    const festivalStartISO = festivalStartDate.toISOString().split('T')[0];
                    
                    if (!festival.end_date) {
                        return festivalStartISO === currentDateISO;
                    } else {
                        const festivalEndDate = new Date(festival.end_date);
                        const festivalEndISO = festivalEndDate.toISOString().split('T')[0];
                        return currentDateISO >= festivalStartISO && currentDateISO <= festivalEndISO;
                    }
                });
                
                // Determinar la clase CSS para el día
                let dayClass = 'day col';
                if (isSabbath) dayClass += ' sabbath';
                if (isNewMoon) dayClass += ' new-moon';
                if (isCurrentDay) dayClass += ' current-day';
                
                // Verificar si hay festividades de alta importancia
                const hasHighImportanceFestival = festivals.some(f => f.importance === 'high');
                if (hasHighImportanceFestival) dayClass += ' high-importance';
                else if (festivals.length > 0) dayClass += ' festival';
                
                // Generar HTML para el día
                calendarGridHTML += `<div class="${dayClass}" data-date="${currentDateISO}">`;
                
                // Número del día en hebreo y gregoriano
                calendarGridHTML += `
                    <div class="day-number">
                        <span class="gregorian-date">${dayCounter}</span>
                        <span class="hebrew-date">${currentDate.getDate()}</span>
                    </div>
                `;

                // Añadir fase lunar del día
                if (typeof MoonPhases !== 'undefined' && MoonPhases.calculatePhase) {
                    const moonPhase = MoonPhases.calculatePhase(currentDate);
                    const moonIcons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
                    calendarGridHTML += `
                        <div class="day-moon-phase" title="${MoonPhases.phaseNames[currentLanguage][moonPhase.phaseIndex]}">
                            ${moonIcons[moonPhase.phaseIndex]}
                        </div>
                    `;
                }
                
                // Indicador de luna nueva
                if (isNewMoon) {
                    calendarGridHTML += `
                        <div class="new-moon-indicator">
                            <i class="fas fa-moon"></i> ${translations.new_moon || 'Luna Nueva'}
                        </div>
                    `;
                }
                
                // Mostrar festividades
                festivals.forEach(festival => {
                    const festivalStartDate = new Date(festival.start_date);
                    const isFirstDay = festivalStartDate.toISOString().split('T')[0] === currentDateISO;
                    
                    calendarGridHTML += `
                        <div class="festival-indicator" data-festival-id="${festival.id}">
                            <i class="fas fa-menorah"></i> ${festival.name}
                            ${isFirstDay ? ' (1)' : ''}
                        </div>
                    `;
                });
                
                calendarGridHTML += '</div>';
                dayCounter++;
            } else {
                // Día vacío
                calendarGridHTML += '<div class="day empty col"></div>';
            }
        }
        
        calendarGridHTML += '</div>';
    }
    
    calendarGridHTML += '</div>';
    
    // Actualizar el contenedor del calendario
    calendarContainer.innerHTML = monthHeaderHTML + calendarGridHTML;
    
    // Configurar eventos para los indicadores de festividades
    setupFestivalIndicators();
    
    // Actualizar la información del mes
    updateMonthInfo(currentMonth);
    
    // Actualizar la lista de festividades
    updateFestivalsList(currentMonth);
    
    // Actualizar la cita bíblica
    updateScripture(currentMonth);
    
    // Actualizar fase lunar actual
    if (typeof MoonPhases !== 'undefined' && MoonPhases.updateCurrentPhase) {
        MoonPhases.updateCurrentPhase(currentLanguage);
    }

    // Actualizar contador del Omer si existe
    if (typeof OmerCounter !== 'undefined' && OmerCounter.updateDisplay) {
        // Obtener fecha de Primicias del año actual
        const firstfruitsFestival = CalendarData.festivals.find(f => f.id === 3);
        if (firstfruitsFestival) {
            OmerCounter.updateDisplay(firstfruitsFestival.start_date, currentLanguage, 'omerCounterContainer');
        }
    }
}

/**
 * Actualiza la información del mes en el panel lateral
 * @param {Object} month - Objeto con la información del mes
 */
function updateMonthInfo(month) {
    const monthInfoContainer = document.getElementById('monthInfo');
    if (!monthInfoContainer) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Formatear la fecha de luna nueva
    const newMoonDate = new Date(month.new_moon_date);
    const newMoonFormatted = newMoonDate.toLocaleDateString(
        currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
        { year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    // Formatear la hora de la luna nueva
    const newMoonTime = newMoonDate.toLocaleTimeString(
        currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
        { hour: '2-digit', minute: '2-digit' }
    );
    
    // Obtener el nombre del día de inicio según el idioma
    const dayNameKey = getDayNameFromIndex(month.start_weekday);
    const startDayName = translations[dayNameKey] || CalendarData.translations.es[dayNameKey] || dayNameKey;
    
    // Preparar la información del mes
    const monthInfoHTML = `
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-font me-2"></i>${translations.hebrew_name || 'Nombre Hebreo'}:</span>
                <span class="hebrew-text">${month.hebrew_name}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-users me-2"></i>${translations.tribe || 'Tribu'}:</span>
                <span>${month.tribe_name} (<span class="hebrew-text">${month.tribe_hebrew_name}</span>)</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-calendar-day me-2"></i>${translations.day_count || 'Días'}:</span>
                <span>${month.days_count}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-play me-2"></i>${translations.start_day || 'Día inicial'}:</span>
                <span>${startDayName}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-moon me-2"></i>${translations.new_moon || 'Luna Nueva'}:</span>
                <span>${newMoonFormatted}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-clock me-2"></i>${translations.jerusalem_time || 'Hora de Jerusalén'}:</span>
                <span>${newMoonTime}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-map-marker-alt me-2"></i>${translations.featured_location || 'Ubicación'}:</span>
                <span>${month.featured_location}</span>
            </li>
        </ul>
    `;
    
    monthInfoContainer.innerHTML = monthInfoHTML;
}

/**
 * Obtiene el nombre del día de la semana a partir de su índice
 * @param {number} index - Índice del día de la semana (0-6)
 * @returns {string} - Clave de traducción del día
 */
function getDayNameFromIndex(index) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[index] || 'sunday';
}

/**
 * Actualiza la lista de festividades del mes actual
 * @param {Object} month - Objeto con la información del mes
 */
function updateFestivalsList(month) {
    const festivalsListContainer = document.getElementById('festivalsList');
    if (!festivalsListContainer) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Obtener las fechas de inicio y fin del mes
    const startDate = new Date(month.start_date);
    const endDate = new Date(month.end_date);
    
    // Filtrar festividades dentro del mes
    const monthFestivals = CalendarData.festivals.filter(festival => {
        const festivalStartDate = new Date(festival.start_date);
        
        if (!festival.end_date) {
            return festivalStartDate >= startDate && festivalStartDate <= endDate;
        } else {
            const festivalEndDate = new Date(festival.end_date);
            return (festivalStartDate >= startDate && festivalStartDate <= endDate) ||
                   (festivalEndDate >= startDate && festivalEndDate <= endDate) ||
                   (festivalStartDate <= startDate && festivalEndDate >= endDate);
        }
    });
    
    // Generar HTML para la lista de festividades
    if (monthFestivals.length === 0) {
        festivalsListContainer.innerHTML = `<p class="text-muted mb-0">${translations.no_festivals || 'No hay festividades este mes'}</p>`;
        return;
    }
    
    let festivalsHTML = '<ul class="list-group">';
    
    monthFestivals.forEach(festival => {
        // Formatear fechas
        const startFormatted = CalendarData.utils.formatDate(festival.start_date, currentLanguage);
        const endFormatted = festival.end_date ? CalendarData.utils.formatDate(festival.end_date, currentLanguage) : null;
        
        // Icono según importancia
        let importanceIcon = '';
        let importanceClass = '';
        
        switch (festival.importance) {
            case 'high':
                importanceIcon = 'fa-star';
                importanceClass = 'text-danger';
                break;
            case 'medium':
                importanceIcon = 'fa-star-half-alt';
                importanceClass = 'text-warning';
                break;
            default:
                importanceIcon = 'fa-info-circle';
                importanceClass = 'text-info';
        }
        
        // Generar elemento de lista
        festivalsHTML += `
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <div class="mb-1">
                            <i class="fas ${importanceIcon} ${importanceClass} me-2"></i>
                            <strong>${festival.name}</strong>
                        </div>
                        <div class="small text-muted">
                            ${startFormatted}${endFormatted ? ` - ${endFormatted}` : ''}
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary festival-details-btn" data-festival-id="${festival.id}">
                        ${translations.view_details || 'Ver detalles'}
                    </button>
                </div>
            </li>
        `;
    });
    
    festivalsHTML += '</ul>';
    festivalsListContainer.innerHTML = festivalsHTML;
    
    // Configurar botones para ver detalles
    setupFestivalDetailButtons();
}

/**
 * Actualiza la cita bíblica según el mes actual
 * @param {Object} month - Objeto con la información del mes
 */
function updateScripture(month) {
    const scriptureTextEl = document.getElementById('scriptureText');
    const scriptureRefEl = document.getElementById('scriptureRef');
    const scriptureTitleEl = document.getElementById('scriptureTitle');
    
    if (scriptureTextEl && scriptureRefEl && scriptureTitleEl) {
        scriptureTextEl.textContent = month.scripture_text;
        scriptureRefEl.textContent = month.scripture_ref;
        
        // Actualizar título según el idioma
        const translations = CalendarData.translations[currentLanguage];
        scriptureTitleEl.textContent = translations.scripture_of_month || 'Escritura del Mes';
    }
}

/**
 * Configura el botón de cambio de tema claro/oscuro
 */
function setupThemeToggle() {
    // Crear el botón de tema
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-outline-light ms-2';
    themeBtn.id = 'themeToggleBtn';

    // Función para actualizar el ícono del botón
    function updateThemeIcon() {
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeBtn.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
    }

    // Evento de clic para cambiar el tema
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });

    // Añadir botón al navbar (antes del dropdown de idioma)
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.parentNode.insertBefore(themeBtn, dropdown);
    }

    // Cargar tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Actualizar el ícono inicial
    updateThemeIcon();
}

/**
 * Genera el volante de días de fiesta para impresión
 */
function generatePrintFlyer() {
    const section = document.getElementById('printFlyerSection');
    if (!section) return;

    const lang = currentLanguage;
    const localeStr = lang === 'en' ? 'en-US' : (lang === 'tl' ? 'fil-PH' : (lang === 'he' ? 'he-IL' : 'es-ES'));
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    const titles = {
        es: { main: 'DÍAS DE FIESTA DE YAHWEH', sub: 'Tiempos Señalados Sagrados', year: CalendarData.year.name, site: 'jhnmr.github.io/Calendar' },
        en: { main: "YAHWEH'S FEAST DAYS", sub: 'Sacred Appointed Times', year: CalendarData.year.name, site: 'jhnmr.github.io/Calendar' },
        tl: { main: 'MGA PISTA NG YAHWEH', sub: 'Mga Banal na Itinakdang Panahon', year: CalendarData.year.name, site: 'jhnmr.github.io/Calendar' },
        he: { main: 'מועדי יהוה', sub: 'מועדים קדושים', year: CalendarData.year.name, site: 'jhnmr.github.io/Calendar' }
    };
    const t = titles[lang] || titles.es;

    let rows = '';
    CalendarData.festivals.forEach(function(f) {
        const start = new Date(f.start_date + 'T12:00:00');
        const end = f.end_date ? new Date(f.end_date + 'T12:00:00') : null;
        const startStr = start.toLocaleDateString(localeStr, dateOptions);
        const endStr = end ? end.toLocaleDateString(localeStr, dateOptions) : null;
        const dateStr = endStr ? (startStr + ' \u2013 ' + endStr) : startStr;
        rows += '<tr>' +
            '<td class="pf-date">' + dateStr + '</td>' +
            '<td class="pf-name">' + f.name + '</td>' +
            '<td class="pf-hebrew">' + f.hebrew_name + '</td>' +
            '</tr>';
    });

    section.innerHTML =
        '<div class="pf-wrapper">' +
            '<div class="pf-header">' +
                '<div class="pf-logo">&#9654;</div>' +
                '<h1 class="pf-title">' + t.main + '</h1>' +
                '<p class="pf-subtitle">' + t.sub + ' &bull; ' + t.year + '</p>' +
            '</div>' +
            '<table class="pf-table">' +
                '<tbody>' + rows + '</tbody>' +
            '</table>' +
            '<div class="pf-footer">' + t.site + '</div>' +
        '</div>';
}

