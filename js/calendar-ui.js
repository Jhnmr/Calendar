

/**
 * Carga la lista completa de eventos personalizados para la vista de Eventos
 */
function loadCustomEventsList() {
    const customEventsTable = document.getElementById('customEventsTable');
    if (!customEventsTable) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Obtener todos los eventos
    const events = loadCustomEvents();
    
    // Ordenar eventos por fecha
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Generar filas de la tabla
    let tableHTML = '';
    
    if (events.length === 0) {
        tableHTML = `<tr><td colspan="4" class="text-center text-muted">${translations.no_events || 'No hay eventos personalizados'}</td></tr>`;
    } else {
        events.forEach(event => {
            // Formatear fecha
            const eventDate = new Date(event.date);
            const dateFormatted = eventDate.toLocaleDateString(
                currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
                { year: 'numeric', month: 'long', day: 'numeric' }
            );
            
            // Traducir tipo de evento
            const eventTypeText = translations[event.type] || event.type;
            
            // Crear fila
            tableHTML += `
                <tr>
                    <td>${event.title}</td>
                    <td>${dateFormatted}</td>
                    <td><span class="custom-event-type ${event.type}">${eventTypeText}</span></td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary edit-event-btn" data-event-id="${event.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-event-btn" data-event-id="${event.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }
    
    customEventsTable.innerHTML = tableHTML;
    
    // Configurar botones de editar y eliminar
    document.querySelectorAll('.edit-event-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            editEvent(eventId);
        });
    });
    
    document.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            if (confirm(translations.confirm_delete || '¿Está seguro de que desea eliminar este evento?')) {
                deleteEvent(eventId);
                
                // Recargar la tabla
                loadCustomEventsList();
            }
        });
    });
}

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
 * Añade un nuevo evento personalizado
 * @param {string} dateStr - Fecha para el evento (formato YYYY-MM-DD)
 */
function addEvent(dateStr = null) {
    // Limpiar el formulario
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.reset();
    }
    
    const eventIdInput = document.getElementById('eventId');
    if (eventIdInput) {
        eventIdInput.value = '';
    }
    
    // Establecer fecha si se proporciona
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        if (dateStr) {
            eventDateInput.value = dateStr;
        } else {
            // Usar fecha actual si no se proporciona
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            eventDateInput.value = formattedDate;
        }
    }
    
    // Actualizar título del modal según el idioma
    const translations = CalendarData.translations[currentLanguage];
    const eventModalTitle = document.getElementById('eventModalTitle');
    if (eventModalTitle) {
        eventModalTitle.textContent = translations.add_event_modal_title || 'Añadir Evento';
    }
    
    // Ocultar botón de eliminar
    const deleteEventBtn = document.getElementById('deleteEventBtn');
    if (deleteEventBtn) {
        deleteEventBtn.classList.add('d-none');
    }
    
    // Mostrar el modal
    const eventModal = document.getElementById('eventModal');
    if (eventModal) {
        const bsModal = new bootstrap.Modal(eventModal);
        bsModal.show();
    }
    
    // Configurar botón de guardar
    const saveEventBtn = document.getElementById('saveEventBtn');
    if (saveEventBtn) {
        saveEventBtn.onclick = function() {
            saveNewEvent();
        };
    }
}

/**
 * Edita un evento existente
 * @param {string} eventId - ID del evento a editar
 */
function editEvent(eventId) {
    // Obtener todos los eventos
    const events = loadCustomEvents();
    
    // Buscar el evento por ID
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Llenar el formulario con los datos del evento
    document.getElementById('eventId').value = event.id;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventType').value = event.type;
    document.getElementById('eventNotes').value = event.notes || '';
    document.getElementById('eventRepeatYearly').checked = event.repeatYearly || false;
    
    // Actualizar título del modal según el idioma
    const translations = CalendarData.translations[currentLanguage];
    document.getElementById('eventModalTitle').textContent = translations.edit_event_modal_title || 'Editar Evento';
    
    // Mostrar botón de eliminar
    document.getElementById('deleteEventBtn').classList.remove('d-none');
    
    // Configurar botón de eliminar
    document.getElementById('deleteEventBtn').onclick = function() {
        if (confirm(translations.confirm_delete || '¿Está seguro de que desea eliminar este evento?')) {
            deleteEvent(eventId);
            
            // Cerrar modal
            const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
            eventModal.hide();
        }
    };
    
    // Mostrar el modal
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    eventModal.show();
    
    // Configurar botón de guardar
    document.getElementById('saveEventBtn').onclick = function() {
        updateExistingEvent(eventId);
    };
}

/**
 * Guarda un nuevo evento personalizado
 */
function saveNewEvent() {
    // Obtener valores del formulario
    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;
    const notes = document.getElementById('eventNotes').value.trim();
    const repeatYearly = document.getElementById('eventRepeatYearly').checked;
    
    // Validar campos obligatorios
    if (!title || !date) {
        alert(CalendarData.translations[currentLanguage].required_fields || 'Los campos Título y Fecha son obligatorios');
        return;
    }
    
    // Crear ID único
    const eventId = 'event_' + Date.now();
    
    // Crear objeto del evento
    const newEvent = {
        id: eventId,
        title: title,
        date: date,
        type: type,
        notes: notes,
        repeatYearly: repeatYearly
    };
    
    // Obtener eventos existentes
    const events = loadCustomEvents();
    
    // Añadir nuevo evento
    events.push(newEvent);
    
    // Guardar eventos actualizados
    saveCustomEvents(events);
    
    // Cerrar modal
    const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
    eventModal.hide();
    
    // Recargar calendario
    loadCalendar();
    
    // Mostrar mensaje de éxito
    alert(CalendarData.translations[currentLanguage].event_added || 'Evento añadido correctamente');
}

/**
 * Actualiza un evento existente
 * @param {string} eventId - ID del evento a actualizar
 */
function updateExistingEvent(eventId) {
    // Obtener valores del formulario
    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;
    const notes = document.getElementById('eventNotes').value.trim();
    const repeatYearly = document.getElementById('eventRepeatYearly').checked;
    
    // Validar campos obligatorios
    if (!title || !date) {
        alert(CalendarData.translations[currentLanguage].required_fields || 'Los campos Título y Fecha son obligatorios');
        return;
    }
    
    // Obtener eventos existentes
    const events = loadCustomEvents();
    
    // Encontrar el índice del evento a actualizar
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return;
    
    // Actualizar el evento
    events[eventIndex] = {
        id: eventId,
        title: title,
        date: date,
        type: type,
        notes: notes,
        repeatYearly: repeatYearly
    };
    
    // Guardar eventos actualizados
    saveCustomEvents(events);
    
    // Cerrar modal
    const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
    eventModal.hide();
    
    // Recargar calendario
    loadCalendar();
    
    // Recargar lista de eventos si estamos en esa vista
    if (!document.getElementById('customEventsView').classList.contains('d-none')) {
        loadCustomEventsList();
    }
    
    // Mostrar mensaje de éxito
    alert(CalendarData.translations[currentLanguage].event_updated || 'Evento actualizado correctamente');
}

/**
 * Elimina un evento existente
 * @param {string} eventId - ID del evento a eliminar
 */
function deleteEvent(eventId) {
    // Obtener eventos existentes
    const events = loadCustomEvents();
    
    // Filtrar el evento a eliminar
    const updatedEvents = events.filter(e => e.id !== eventId);
    
    // Guardar eventos actualizados
    saveCustomEvents(updatedEvents);
    
    // Recargar calendario
    loadCalendar();
    
    // Mostrar mensaje de éxito
    alert(CalendarData.translations[currentLanguage].event_deleted || 'Evento eliminado correctamente');
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
    
    // Actualizar el título del modal
    document.getElementById('festivalModalTitle').textContent = festival.name;
    
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
 * Exporta el calendario a PDF
 */
function exportCalendarToPDF() {
    // Verificar si las librerías jsPDF y html2canvas están disponibles
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        alert('Error: No se pudieron cargar las librerías necesarias para exportar a PDF');
        return;
    }
    
    // Crear título para el PDF
    const currentMonth = CalendarData.months.find(month => month.id === currentMonthId);
    const pdfTitle = `Calendario_${currentMonth.name}_${new Date().getFullYear()}`;
    
    // Obtener el elemento a exportar
    const element = document.getElementById('calendarContainer');
    
    // Mostrar mensaje de carga
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'alert alert-info position-fixed top-50 start-50 translate-middle';
    loadingMsg.style.zIndex = '9999';
    loadingMsg.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Generando PDF...';
    document.body.appendChild(loadingMsg);
    
    // Utilizar html2canvas para convertir el elemento a imagen
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        // Crear PDF con la imagen del canvas
        const imgData = canvas.toDataURL('image/png');
        
        // Determinar orientación según el tamaño del canvas
        const orientation = canvas.width > canvas.height ? 'l' : 'p';
        
        // Crear documento PDF
        const pdf = new jspdf.jsPDF(orientation, 'mm', 'a4');
        
        // Calcular dimensiones para ajustar la imagen al PDF
        const pdfWidth = orientation === 'l' ? 297 : 210;
        const pdfHeight = orientation === 'l' ? 210 : 297;
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9;
        
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        
        // Centrar la imagen en el PDF
        const x = (pdfWidth - newWidth) / 2;
        const y = (pdfHeight - newHeight) / 2;
        
        // Añadir la imagen al PDF
        pdf.addImage(imgData, 'PNG', x, y, newWidth, newHeight);
        
        // Guardar el PDF
        pdf.save(pdfTitle + '.pdf');
        
        // Eliminar mensaje de carga
        document.body.removeChild(loadingMsg);
    }).catch(error => {
        console.error('Error al generar el PDF:', error);
        alert('Error al generar el PDF');
        
        // Eliminar mensaje de carga en caso de error
        document.body.removeChild(loadingMsg);
    });
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

function loadCustomEvents() {
    const eventsJSON = localStorage.getItem('custom_events');
    return eventsJSON ? JSON.parse(eventsJSON) : [];
}

/**
 * Guarda eventos personalizados en localStorage
 * @param {Array} events - Lista de eventos a guardar
 */
function saveCustomEvents(events) {
    localStorage.setItem('custom_events', JSON.stringify(events));
}

/**
 * Obtiene eventos personalizados para una fecha específica
 * @param {string} dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns {Array} - Lista de eventos para la fecha
 */
function getCustomEventsForDate(dateStr) {
    // Obtener todos los eventos
    const events = loadCustomEvents();
    
    // Obtener año actual
    const currentYear = new Date().getFullYear();
    
    // Filtrar eventos para la fecha específica
    return events.filter(event => {
        // Verificar coincidencia exacta de fecha
        if (event.date === dateStr) {
            return true;
        }
        
        // Verificar eventos anuales
        if (event.repeatYearly) {
            const eventDate = new Date(event.date);
            const targetDate = new Date(dateStr);
            
            // Comparar mes y día (ignorando el año)
            return eventDate.getMonth() === targetDate.getMonth() && eventDate.getDate() === targetDate.getDate();
        }
        
        return false;
    });
}

/**
 * Obtiene eventos personalizados para un rango de fechas
 * @param {string} startDateStr - Fecha de inicio en formato ISO (YYYY-MM-DD)
 * @param {string} endDateStr - Fecha de fin en formato ISO (YYYY-MM-DD)
 * @returns {Array} - Lista de eventos para el rango de fechas
 */
function getCustomEventsForMonth(startDateStr, endDateStr) {
    // Obtener fechas como objetos Date
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    // Obtener todos los eventos
    const events = loadCustomEvents();
    
    // Filtrar eventos para el rango de fechas
    return events.filter(event => {
        const eventDate = new Date(event.date);
        
        // Eventos con fecha dentro del rango
        if (eventDate >= startDate && eventDate <= endDate) {
            return true;
        }
        
        // Eventos anuales que coinciden con el mes
        if (event.repeatYearly) {
            // Extraer mes y día del evento
            const eventMonth = eventDate.getMonth();
            const eventDay = eventDate.getDate();
            
            // Verificar si el mes actual contiene esta fecha
            // Crear una fecha con el año del mes actual para comparar
            const compareDate = new Date(startDate.getFullYear(), eventMonth, eventDay);
            
            return compareDate >= startDate && compareDate <= endDate;
        }
        
        return false;
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
        'navCustomEvents': 'customEventsView',
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
                } else if (navId === 'navCustomEvents') {
                    loadCustomEventsList();
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
 * Configura los eventos de exportación e impresión
 */
function setupExportEvents() {
    // Botón de exportar PDF
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportCalendarToPDF();
        });
    }
    
    // Botón de imprimir
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Botón de exportar eventos
    const exportEventsBtn = document.getElementById('exportEventsBtn');
    if (exportEventsBtn) {
        exportEventsBtn.addEventListener('click', function() {
            exportEvents();
        });
    }
    
    // Botón de importar eventos
    const importEventsBtn = document.getElementById('importEventsBtn');
    if (importEventsBtn) {
        importEventsBtn.addEventListener('click', function() {
            const importModal = new bootstrap.Modal(document.getElementById('importModal'));
            importModal.show();
        });
    }
    
    // Configurar el botón de envío de importación
    const importSubmitBtn = document.getElementById('importSubmitBtn');
    if (importSubmitBtn) {
        importSubmitBtn.addEventListener('click', function() {
            const fileInput = document.getElementById('importFile');
            if (fileInput.files.length > 0) {
                const overwrite = document.getElementById('overwriteEvents').checked;
                importEvents(fileInput.files[0], overwrite);
                
                // Cerrar modal después de importar
                const importModal = bootstrap.Modal.getInstance(document.getElementById('importModal'));
                importModal.hide();
            } else {
                alert(CalendarData.translations[currentLanguage].no_file_selected || 'No se ha seleccionado ningún archivo');
            }
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
    document.getElementById('navCalendar').innerHTML = `<i class="fas fa-calendar-days me-1"></i> ${translations.calendar || 'Calendario'}`;
    document.getElementById('navFestivals').innerHTML = `<i class="fas fa-menorah me-1"></i> ${translations.festivals || 'Festividades'}`;
    
    // Actualizar título del calendario
    document.getElementById('calendarTitle').innerHTML = `<i class="fas fa-calendar-alt me-2"></i> ${translations.calendar || 'Calendario'}`;
    
    // Actualizar botones
    document.getElementById('todayBtn').innerHTML = `<i class="fas fa-calendar-day"></i> ${translations.today || 'Hoy'}`;
    document.getElementById('prevMonthBtn').textContent = translations.previous || 'Anterior';
    document.getElementById('nextMonthBtn').textContent = translations.next || 'Siguiente';
    
    // Actualizar más elementos según sea necesario
    updateCurrentDateDisplay();
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
function loadCalendar() {
    // Obtener el mes actual
    const currentMonth = CalendarData.months.find(month => month.id === currentMonthId);
    if (!currentMonth) return;
    
    // Actualizar título del calendario según el idioma
    const translations = CalendarData.translations[currentLanguage];
    const calendarTitle = document.getElementById('calendarTitle');
    if (calendarTitle) {
        calendarTitle.innerHTML = `<i class="fas fa-calendar-alt me-2"></i> ${translations.calendar || 'Calendario Hebreo'}`;
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
    const weekdays = [
        translations.sunday || 'Domingo',
        translations.monday || 'Lunes',
        translations.tuesday || 'Martes',
        translations.wednesday || 'Miércoles',
        translations.thursday || 'Jueves',
        translations.friday || 'Viernes',
        translations.saturday || 'Sábado'
    ];
    
    // Añadir fila de días de la semana
    calendarGridHTML += '<div class="row weekdays">';
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
        calendarGridHTML += '<div class="row week">';
        
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
                let dayClass = 'day';
                if (isSabbath) dayClass += ' sabbath';
                if (isNewMoon) dayClass += ' new-moon';
                if (isCurrentDay) dayClass += ' current-day';
                
                // Verificar si hay festividades de alta importancia
                const hasHighImportanceFestival = festivals.some(f => f.importance === 'high');
                if (hasHighImportanceFestival) dayClass += ' high-importance';
                else if (festivals.length > 0) dayClass += ' festival';
                
                // Buscar eventos personalizados para este día
                const customEvents = getCustomEventsForDate(currentDateISO);
                if (customEvents.length > 0) dayClass += ' custom-event';
                
                // Generar HTML para el día
                calendarGridHTML += `<div class="${dayClass}" data-date="${currentDateISO}">`;
                
                // Número del día en hebreo y gregoriano
                calendarGridHTML += `
                    <div class="day-number">
                        <span class="gregorian-date">${dayCounter}</span>
                        <span class="hebrew-date">${currentDate.getDate()}</span>
                    </div>
                `;
                
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
                
                // Mostrar eventos personalizados
                customEvents.forEach(event => {
                    calendarGridHTML += `
                        <div class="custom-event-indicator" data-event-id="${event.id}">
                            <i class="fas fa-bookmark"></i> ${event.title}
                        </div>
                    `;
                });
                
                calendarGridHTML += '</div>';
                dayCounter++;
            } else {
                // Día vacío
                calendarGridHTML += '<div class="day empty"></div>';
            }
        }
        
        calendarGridHTML += '</div>';
    }
    
    calendarGridHTML += '</div>';
    
    // Actualizar el contenedor del calendario
    calendarContainer.innerHTML = monthHeaderHTML + calendarGridHTML;
    
    // Configurar eventos para los días y festividades
    setupDayEvents();
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
    const startDayName = translations[getDayNameFromIndex(month.start_weekday)] || getDayNameFromIndex(month.start_weekday);
    
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
 * Actualiza la lista de eventos personalizados para el mes actual
 * @param {Object} month - Objeto con la información del mes
 */
function updateCustomEventsList(month) {
    const customEventsListContainer = document.getElementById('customEventsList');
    if (!customEventsListContainer) return;
    
    const translations = CalendarData.translations[currentLanguage];
    
    // Obtener fechas de inicio y fin del mes
    const startDate = new Date(month.start_date);
    const endDate = new Date(month.end_date);
    const startISO = startDate.toISOString().split('T')[0];
    const endISO = endDate.toISOString().split('T')[0];
    
    // Obtener eventos personalizados para el mes
    const monthEvents = getCustomEventsForMonth(startISO, endISO);
    
    // Generar HTML para la lista de eventos
    if (monthEvents.length === 0) {
        customEventsListContainer.innerHTML = `<p class="text-muted mb-0">${translations.no_events || 'No hay eventos personalizados'}</p>`;
        return;
    }
    
    let eventsHTML = '';
    
    monthEvents.forEach(event => {
        // Formatear fecha
        const eventDate = new Date(event.date);
        const dateFormatted = eventDate.toLocaleDateString(
            currentLanguage === 'en' ? 'en-US' : (currentLanguage === 'tl' ? 'fil-PH' : 'es-ES'),
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
        
        // Traducir tipo de evento
        const eventTypeText = translations[event.type] || event.type;
        
        // Generar elemento
        eventsHTML += `
            <div class="custom-event-item" data-event-id="${event.id}">
                <div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-date">${dateFormatted}</div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="custom-event-type ${event.type} me-2">${eventTypeText}</span>
                    <button class="btn btn-sm btn-outline-primary edit-event-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    customEventsListContainer.innerHTML = eventsHTML;
    
    // Configurar eventos para editar
    document.querySelectorAll('.edit-event-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const eventId = this.closest('.custom-event-item').getAttribute('data-event-id');
            editEvent(eventId);
        });
    });
    
    // Configurar eventos para hacer clic en el evento
    document.querySelectorAll('.custom-event-item').forEach(item => {
        item.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            editEvent(eventId);
        });
    });
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
 * Configura eventos al hacer clic en los días del calendario
 */
function setupDayEvents() {
    document.querySelectorAll('.day:not(.empty)').forEach(day => {
        day.addEventListener('click', function() {
            const dateStr = this.getAttribute('data-date');
            if (dateStr) {
                // Abrir modal para añadir evento
                addEvent(dateStr);
            }
        });
    });
}
// Añadir al final de js/calendar-ui.js
function setupThemeToggle() {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-outline-light ms-2';
    themeBtn.innerHTML = '<i class="fas fa-adjust"></i>';
    themeBtn.title = 'Cambiar tema claro/oscuro';
    
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    
    // Añadir botón al navbar
    document.querySelector('.dropdown').before(themeBtn);
    
    // Cargar tema guardado
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
}



