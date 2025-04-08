/**
 * Funciones para la gestión de eventos personalizados
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configurar botones de añadir evento
    setupAddEventButtons();
    
    // Configurar botones de importar/exportar
    setupImportExportButtons();
    
    // Configurar formulario de evento
    setupEventForm();
});

/**
 * Configura los botones de añadir evento
 */
function setupAddEventButtons() {
    // Botón principal de añadir evento (panel lateral)
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            // Obtener fecha del mes actual
            const currentMonth = CalendarData.months.find(month => month.id === currentMonthId);
            if (currentMonth) {
                const today = new Date();
                const startDate = new Date(currentMonth.start_date);
                const endDate = new Date(currentMonth.end_date);
                
                // Si el día actual está dentro del mes, usar esa fecha
                // Si no, usar el primer día del mes
                let eventDate;
                if (today >= startDate && today <= endDate) {
                    eventDate = today.toISOString().substring(0, 10);
                } else {
                    eventDate = currentMonth.start_date;
                }
                
                addEvent(eventDate);
            } else {
                addEvent();
            }
        });
    }
    
    // Botón de añadir evento en la página de eventos
    const addEventBtnPage = document.getElementById('addEventBtnPage');
    if (addEventBtnPage) {
        addEventBtnPage.addEventListener('click', function() {
            addEvent();
        });
    }
}

/**
 * Configura los botones de importar/exportar
 */
function setupImportExportButtons() {
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
    
    // Botón de exportar eventos
    const exportEventsBtn = document.getElementById('exportEventsBtn');
    if (exportEventsBtn) {
        exportEventsBtn.addEventListener('click', function() {
            exportEvents();
        });
    }
}

/**
 * Configura el formulario de evento
 */
function setupEventForm() {
    // Botón de guardar evento
    const saveEventBtn = document.getElementById('saveEventBtn');
    if (saveEventBtn) {
        saveEventBtn.addEventListener('click', function() {
            const eventId = document.getElementById('eventId').value;
            if (eventId) {
                updateExistingEvent(eventId);
            } else {
                saveNewEvent();
            }
        });
    }
    
    // Botón de eliminar evento
    const deleteEventBtn = document.getElementById('deleteEventBtn');
    if (deleteEventBtn) {
        deleteEventBtn.addEventListener('click', function() {
            const eventId = document.getElementById('eventId').value;
            if (eventId) {
                if (confirm(CalendarData.translations[currentLanguage].confirm_delete || '¿Está seguro de que desea eliminar este evento?')) {
                    deleteEvent(eventId);
                    
                    // Cerrar modal
                    const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
                    eventModal.hide();
                }
            }
        });
    }
}

/**
 * Importa eventos desde un archivo
 * @param {File} file - Archivo a importar
 * @param {boolean} overwrite - Si se deben sobrescribir eventos existentes
 */
function importEvents(file, overwrite = false) {
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedEvents = JSON.parse(e.target.result);
            
            // Validar formato de eventos
            if (!Array.isArray(importedEvents)) {
                throw new Error(CalendarData.translations[currentLanguage].invalid_file_format || 'Formato de archivo inválido');
            }
            
            // Validar cada evento
            importedEvents.forEach(event => {
                if (!event.id || !event.title || !event.date || !event.type) {
                    throw new Error(CalendarData.translations[currentLanguage].invalid_event_format || 'Formato de evento inválido');
                }
            });
            
            // Obtener eventos actuales
            const currentEvents = loadCustomEvents();
            
            let combinedEvents;
            
            if (overwrite) {
                // Sobrescribir completamente
                combinedEvents = importedEvents;
            } else {
                // Combinar eventos, evitando duplicados por ID
                combinedEvents = [...currentEvents];
                
                importedEvents.forEach(importedEvent => {
                    const existingIndex = combinedEvents.findIndex(e => e.id === importedEvent.id);
                    
                    if (existingIndex !== -1) {
                        // Actualizar evento existente
                        combinedEvents[existingIndex] = importedEvent;
                    } else {
                        // Añadir nuevo evento
                        combinedEvents.push(importedEvent);
                    }
                });
            }
            
            // Guardar eventos combinados
            saveCustomEvents(combinedEvents);
            
            // Recargar calendario
            loadCalendar();
            
            // Si estamos en la vista de eventos, recargar la lista
            if (!document.getElementById('customEventsView').classList.contains('d-none')) {
                loadCustomEventsList();
            }
            
            // Mostrar mensaje de éxito
            alert(`${importedEvents.length} ${CalendarData.translations[currentLanguage].events_imported || 'eventos importados correctamente'}`);
            
        } catch (error) {
            alert(`${CalendarData.translations[currentLanguage].import_error || 'Error al importar eventos'}: ${error.message}`);
        }
    };
    
    reader.readAsText(file);
}

/**
 * Exporta eventos a un archivo JSON
 */
function exportEvents() {
    const events = loadCustomEvents();
    
    if (events.length === 0) {
        alert(CalendarData.translations[currentLanguage].no_events_to_export || 'No hay eventos para exportar');
        return;
    }
    
    // Crear blob con los datos
    const eventsJson = JSON.stringify(events, null, 2);
    const blob = new Blob([eventsJson], { type: 'application/json' });
    
    // Crear URL para descarga
    const url = URL.createObjectURL(blob);
    
    // Crear enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendario_eventos.json';
    
    // Añadir a document, hacer clic y eliminar
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Liberar URL
    URL.revokeObjectURL(url);
}

/**
 * Genera eventos de ejemplo para demostración
 */
function generateSampleEvents() {
    // Ejemplos de eventos para el año actual
    const currentYear = new Date().getFullYear();
    
    const sampleEvents = [
        {
            id: 'sample1',
            title: 'Cumpleaños de Juan',
            date: `${currentYear}-05-15`,
            type: 'personal',
            notes: 'Comprar regalo',
            repeatYearly: true
        },
        {
            id: 'sample2',
            title: 'Aniversario',
            date: `${currentYear}-08-22`,
            type: 'family',
            notes: 'Reservar restaurante',
            repeatYearly: true
        },
        {
            id: 'sample3',
            title: 'Reunión de proyecto',
            date: `${currentYear}-04-10`,
            type: 'work',
            notes: 'Preparar presentación',
            repeatYearly: false
        },
        {
            id: 'sample4',
            title: 'Vacunación mascota',
            date: `${currentYear}-06-05`,
            type: 'other',
            notes: 'Confirmar hora con veterinario',
            repeatYearly: false
        }
    ];
    
    // Cargar eventos actuales
    const currentEvents = loadCustomEvents();
    
    // Verificar si ya existen eventos de ejemplo
    if (currentEvents.some(e => e.id.startsWith('sample'))) {
        alert(CalendarData.translations[currentLanguage].sample_events_exist || 'Ya existen eventos de ejemplo');
        return;
    }
    
    // Añadir eventos de ejemplo
    const combinedEvents = [...currentEvents, ...sampleEvents];
    
    // Guardar eventos
    saveCustomEvents(combinedEvents);
    
    // Recargar calendario
    loadCalendar();
    
    // Si estamos en la vista de eventos, recargar la lista
    if (!document.getElementById('customEventsView').classList.contains('d-none')) {
        loadCustomEventsList();
    }
    
    // Mostrar mensaje de éxito
    alert(CalendarData.translations[currentLanguage].sample_events_added || 'Eventos de ejemplo añadidos correctamente');
}