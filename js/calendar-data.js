/**
 * Datos del Calendario Hebreo 2025-2026
 */

// Objeto global para el calendario
const CalendarData = {};

// Datos del año del calendario
CalendarData.year = {
    name: "2025-2026",
    start_date: "2025-03-30",
    end_date: "2026-03-20"
};

// Meses del calendario
CalendarData.months = [
    {
        id: 1,
        name: "Aviv",
        hebrew_name: "ןבואר",
        transliteration: "Reuben",
        tribe_name: "Rubén",
        tribe_hebrew_name: "ןבואר",
        start_date: "2025-03-30",
        end_date: "2025-04-28",
        days_count: 30,
        start_weekday: 0, // 0=Domingo
        featured_image: "img/months/jerusalem.jpg",
        featured_location: "Jerusalén",
        scripture_ref: "Apocalipsis 1:5-6",
        scripture_text: "De parte de Jesucristo, el testigo fiel, el primogénito de entre los muertos y el soberano de los reyes de la tierra. Al que nos ama y nos ha librado de nuestros pecados con su sangre, y nos ha constituido en un reino, sacerdotes al servicio de Dios su Padre, a él sea la gloria y el poder por los siglos de los siglos. Amén.",
        new_moon_date: "2025-04-28 22:31:00",
        month_order: 1
    },
    {
        id: 2,
        name: "Ziv",
        hebrew_name: "ןועמש",
        transliteration: "Simeon",
        tribe_name: "Simeón",
        tribe_hebrew_name: "ןועמש",
        start_date: "2025-04-29",
        end_date: "2025-05-27",
        days_count: 29,
        start_weekday: 2, // 2=Martes
        featured_image: "img/months/dead_sea.jpg",
        featured_location: "Mar Muerto",
        scripture_ref: "Isaías 43:7",
        scripture_text: "Todos los llamados de mi nombre; para gloria mía los he creado, los formé y los hice.",
        new_moon_date: "2025-05-27 06:02:00",
        month_order: 2
    },
    {
        id: 3,
        name: "Sivan",
        hebrew_name: "יול",
        transliteration: "Levi",
        tribe_name: "Leví",
        tribe_hebrew_name: "יול",
        start_date: "2025-05-28",
        end_date: "2025-06-25",
        days_count: 29,
        start_weekday: 3, // 3=Miércoles
        featured_image: "img/months/sea_of_galilee.jpg",
        featured_location: "Mar de Galilea",
        scripture_ref: "Efesios 2:10",
        scripture_text: "Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.",
        new_moon_date: "2025-06-25 13:31:00",
        month_order: 3
    },
    {
        id: 4,
        name: "Tammuz",
        hebrew_name: "הדוהי",
        transliteration: "Judah",
        tribe_name: "Judá",
        tribe_hebrew_name: "הדוהי",
        start_date: "2025-06-26",
        end_date: "2025-07-25",
        days_count: 30,
        start_weekday: 4, // 4=Jueves
        featured_image: "img/months/qumran.jpg",
        featured_location: "Qumrán",
        scripture_ref: "Marcos 4:26-28",
        scripture_text: "Y dijo: Así es el reino de Dios como cuando un hombre echa la semilla en la tierra; y duerme y se levanta, de noche y de día, y la semilla brota y crece sin que él sepa cómo. Porque de suyo lleva fruto la tierra, primero hierba, luego espiga, después grano lleno en la espiga.",
        new_moon_date: "2025-07-25 22:11:00",
        month_order: 4
    },
    {
        id: 5,
        name: "Av",
        hebrew_name: "ןד",
        transliteration: "Dan",
        tribe_name: "Dan",
        tribe_hebrew_name: "ןד",
        start_date: "2025-07-26",
        end_date: "2025-08-23",
        days_count: 29,
        start_weekday: 6, // 6=Sábado
        featured_image: "img/months/masada.jpg",
        featured_location: "Masada",
        scripture_ref: "Éxodo 19:5-6",
        scripture_text: "Ahora, pues, si diereis oído a mi voz, y guardareis mi pacto, vosotros seréis mi especial tesoro sobre todos los pueblos; porque mía es toda la tierra. Y vosotros me seréis un reino de sacerdotes, y gente santa. Estas son las palabras que dirás a los hijos de Israel.",
        new_moon_date: "2025-08-23 09:06:00",
        month_order: 5
    },
    {
        id: 6,
        name: "Elul",
        hebrew_name: "ילתפנ",
        transliteration: "Naphtali",
        tribe_name: "Neftalí",
        tribe_hebrew_name: "ילתפנ",
        start_date: "2025-08-24",
        end_date: "2025-09-22",
        days_count: 30,
        start_weekday: 0, // 0=Domingo
        featured_image: "img/months/shiloh.jpg",
        featured_location: "Shiloh",
        scripture_ref: "Salmo 8:1-4",
        scripture_text: "Oh Jehová, Señor nuestro, ¡Cuán glorioso es tu nombre en toda la tierra! Has puesto tu gloria sobre los cielos. De la boca de los niños y de los que maman, fundaste la fortaleza, a causa de tus enemigos, para hacer callar al enemigo y al vengador. Cuando veo tus cielos, obra de tus dedos, la luna y las estrellas que tú formaste, digo: ¿Qué es el hombre, para que tengas de él memoria, y el hijo del hombre, para que lo visites?",
        new_moon_date: "2025-09-22 22:54:00",
        month_order: 6
    },
    {
        id: 7,
        name: "Tishri",
        hebrew_name: "דג",
        transliteration: "Gad",
        tribe_name: "Gad",
        tribe_hebrew_name: "דג",
        start_date: "2025-09-23",
        end_date: "2025-10-21",
        days_count: 29,
        start_weekday: 2, // 2=Martes
        featured_image: "img/months/jerusalem_temple.jpg",
        featured_location: "Jerusalén",
        scripture_ref: "Mateo 6:9-10",
        scripture_text: "Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra.",
        new_moon_date: "2025-10-21 15:25:00",
        month_order: 7
    },
    {
        id: 8,
        name: "Bul",
        hebrew_name: "רשא",
        transliteration: "Asher",
        tribe_name: "Aser",
        tribe_hebrew_name: "רשא",
        start_date: "2025-10-22",
        end_date: "2025-11-20",
        days_count: 30,
        start_weekday: 3, // 3=Miércoles
        featured_image: "img/months/jordan_river.jpg",
        featured_location: "Sitio Bautismal del Jordán",
        scripture_ref: "Apocalipsis 4:11",
        scripture_text: "Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas.",
        new_moon_date: "2025-11-20 08:47:00",
        month_order: 8
    },
    {
        id: 9,
        name: "Kislev",
        hebrew_name: "רכששי",
        transliteration: "Issachar",
        tribe_name: "Isacar",
        tribe_hebrew_name: "רכששי",
        start_date: "2025-11-21",
        end_date: "2025-12-20",
        days_count: 30,
        start_weekday: 5, // 5=Viernes
        featured_image: "img/months/mukawer.jpg",
        featured_location: "Mukawer, Jordania",
        scripture_ref: "Romanos 8:14-16",
        scripture_text: "Porque todos los que son guiados por el Espíritu de Dios, éstos son hijos de Dios. Pues no habéis recibido el espíritu de esclavitud para estar otra vez en temor, sino que habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre! El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios.",
        new_moon_date: "2025-12-20 03:43:00",
        month_order: 9
    },
    {
        id: 10,
        name: "Tevet",
        hebrew_name: "ןולובז",
        transliteration: "Zebulun",
        tribe_name: "Zabulón",
        tribe_hebrew_name: "ןולובז",
        start_date: "2025-12-21",
        end_date: "2026-01-18",
        days_count: 29,
        start_weekday: 0, // 0=Domingo
        featured_image: "img/months/wadi_rum.jpg",
        featured_location: "Wadi Rum, Jordania",
        scripture_ref: "Colosenses 1:5-6",
        scripture_text: "A causa de la esperanza que os está guardada en los cielos, de la cual ya habéis oído por la palabra verdadera del evangelio, que ha llegado a vosotros, así como a todo el mundo, y lleva fruto y crece también en vosotros, desde el día que oísteis y conocisteis la gracia de Dios en verdad.",
        new_moon_date: "2026-01-18 21:52:00",
        month_order: 10
    },
    {
        id: 11,
        name: "Shvat",
        hebrew_name: "םירפא",
        transliteration: "Ephraim",
        tribe_name: "Efraín",
        tribe_hebrew_name: "םירפא",
        start_date: "2026-01-19",
        end_date: "2026-02-17",
        days_count: 30,
        start_weekday: 1, // 1=Lunes
        featured_image: "img/months/red_sea.jpg",
        featured_location: "Cruce del Mar Rojo, Egipto",
        scripture_ref: "2 Timoteo 4:2",
        scripture_text: "Que prediques la palabra; que instes a tiempo y fuera de tiempo; redarguye, reprende, exhorta con toda paciencia y doctrina.",
        new_moon_date: "2026-02-17 14:01:00",
        month_order: 11
    },
    {
        id: 12,
        name: "Adar",
        hebrew_name: "םירפא",
        transliteration: "Ephraim",
        tribe_name: "Efraín",
        tribe_hebrew_name: "םירפא",
        start_date: "2026-02-18",
        end_date: "2026-03-20",
        days_count: 31, // Mes largo para ajustar al año solar
        start_weekday: 3, // 3=Miércoles
        featured_image: "img/months/mount_horeb.jpg",
        featured_location: "Roca Partida, Monte Horeb",
        scripture_ref: "Deuteronomio 14:2",
        scripture_text: "Porque eres pueblo santo a Jehová tu Dios, y Jehová te ha escogido para que le seas un pueblo único de entre todos los pueblos que están sobre la tierra.",
        new_moon_date: "2026-03-19 03:23:00",
        month_order: 12
    }
];

// Festividades bíblicas
CalendarData.festivals = [
    {
        id: 1,
        name: "Pascua",
        hebrew_name: "פסח",
        festival_type: "biblical",
        start_date: "2025-04-02",
        end_date: null, // Un solo día
        start_at_sunset: true,
        description_short: "Conmemoración de la liberación del pueblo hebreo de la esclavitud en Egipto",
        description_long: "La Pascua es una de las festividades más importantes en el calendario bíblico. Conmemora la liberación de los israelitas de la esclavitud en Egipto, según se relata en el libro de Éxodo. Durante esta festividad se recuerda cómo la muerte pasó por alto ('pasó') las casas de los israelitas que tenían la sangre del cordero en sus dinteles.",
        preparations: [
            "Preparar el cordero pascual",
            "Retirar toda levadura de la casa",
            "Preparar hierbas amargas",
            "Preparar pan sin levadura"
        ],
        biblical_refs: "Éxodo 12:1-28, Levítico 23:5, Números 28:16, Deuteronomio 16:1-8",
        importance: "high",
        image_url: "img/festivals/passover.png"
    },
    {
        id: 2,
        name: "Fiesta de los Panes Sin Levadura",
        hebrew_name: "חג המצות",
        festival_type: "biblical",
        start_date: "2025-04-03",
        end_date: "2025-04-09",
        start_at_sunset: true,
        description_short: "Festividad de siete días donde se come pan sin levadura",
        description_long: "La Fiesta de los Panes Sin Levadura comienza el día después de la Pascua y dura siete días. Durante este tiempo, no se debe comer ni tener levadura en el hogar. Esta festividad simboliza la pureza y la eliminación del pecado (representado por la levadura) de nuestras vidas.",
        preparations: [
            "Retirar toda levadura de la casa",
            "Preparar pan sin levadura para 7 días",
            "Planificar comidas sin productos fermentados"
        ],
        biblical_refs: "Éxodo 12:15-20, Levítico 23:6-8, Números 28:17-25",
        importance: "high",
        image_url: "img/festivals/unleavened_bread.jpeg"
    },
    {
        id: 3,
        name: "Fiesta de los Primeros Frutos",
        hebrew_name: "ביכורים",
        festival_type: "biblical",
        start_date: "2025-04-05",
        end_date: null,
        start_at_sunset: false,
        description_short: "Ofrenda de las primicias de la cosecha",
        description_long: "La Fiesta de los Primeros Frutos se celebra el primer día después del sábado durante la semana de los Panes sin Levadura. Esta festividad marca el comienzo de la cosecha de cebada y simboliza la consagración de toda la cosecha a Dios. Se presentaba un manojo de las primicias de la cosecha como ofrenda mecida ante el Señor.",
        preparations: [
            "Preparar las primicias de la cosecha",
            "Llevar la ofrenda al templo"
        ],
        biblical_refs: "Levítico 23:9-14",
        importance: "medium",
        image_url: "img/festivals/firstfruits.jpeg"
    },
    {
        id: 4,
        name: "Shavuot (Pentecostés)",
        hebrew_name: "שבועות",
        festival_type: "biblical",
        start_date: "2025-05-24",
        end_date: null,
        start_at_sunset: true,
        description_short: "Celebración de la entrega de la Torah en el Monte Sinaí",
        description_long: "Shavuot, también conocido como la Fiesta de las Semanas o Pentecostés, se celebra 50 días después de la Fiesta de los Primeros Frutos. Conmemora la entrega de la Torah en el Monte Sinaí y marca el final de la cosecha de cebada y el comienzo de la cosecha de trigo. En el Nuevo Testamento, esta festividad también marca el derramamiento del Espíritu Santo.",
        preparations: [
            "Decorar con flores y plantas",
            "Preparar alimentos a base de lácteos",
            "Estudiar la Torah durante toda la noche"
        ],
        biblical_refs: "Éxodo 34:22, Levítico 23:15-22, Deuteronomio 16:9-12, Hechos 2:1-4",
        importance: "high",
        image_url: "img/festivals/shavuot.jpeg"
    },
    {
        id: 5,
        name: "Yom Teruah (Fiesta de las Trompetas)",
        hebrew_name: "יום תרועה",
        festival_type: "biblical",
        start_date: "2025-09-12",
        end_date: null,
        start_at_sunset: true,
        description_short: "Día de tocar el shofar (cuerno de carnero)",
        description_long: "Yom Teruah marca el inicio del séptimo mes del calendario hebreo. Es un día señalado para el toque de trompetas (shofar), anunciando un tiempo de reflexión y preparación para los Días de Temor Reverencial que culminan con Yom Kippur. También conocido como Rosh Hashaná en el judaísmo rabínico.",
        preparations: [
            "Preparar el shofar",
            "Realizar oraciones especiales",
            "Prepararse para un tiempo de reflexión"
        ],
        biblical_refs: "Levítico 23:23-25, Números 29:1-6",
        importance: "high",
        image_url: "img/festivals/yom_teruah.jpg"
    },
    {
        id: 6,
        name: "Yom Kippur (Día de Expiación)",
        hebrew_name: "יום כיפור",
        festival_type: "biblical",
        start_date: "2025-09-21",
        end_date: null,
        start_at_sunset: true,
        description_short: "Día más solemne del año, dedicado al arrepentimiento y la reconciliación",
        description_long: "Yom Kippur es el día más solemne en el calendario bíblico. Es un día de ayuno, oración y arrepentimiento que ocurre diez días después de Yom Teruah. Históricamente, era el único día del año en que el Sumo Sacerdote podía entrar al Lugar Santísimo del Tabernáculo para ofrecer sacrificio por los pecados de todo el pueblo.",
        preparations: [
            "Prepararse para el ayuno",
            "Reconciliarse con los demás",
            "Realizar oraciones de arrepentimiento"
        ],
        biblical_refs: "Levítico 16:1-34, Levítico 23:26-32, Números 29:7-11",
        importance: "high",
        image_url: "img/festivals/yom_kippur.jpeg"
    },
    {
        id: 7,
        name: "Sukkot (Fiesta de los Tabernáculos)",
        hebrew_name: "סוכות",
        festival_type: "biblical",
        start_date: "2025-09-26",
        end_date: "2025-10-02",
        start_at_sunset: true,
        description_short: "Conmemoración de la protección divina durante los 40 años en el desierto",
        description_long: "Sukkot es una festividad de siete días que comienza cinco días después de Yom Kippur. Conmemora cómo el pueblo de Israel vivió en cabañas temporales (sukkot) durante sus 40 años de peregrinación en el desierto. Es un tiempo de regocijo y celebración por la protección y provisión divina. También conocida como la Fiesta de las Cabañas o Fiesta de la Cosecha.",
        preparations: [
            "Construir una sukkah (cabaña temporal)",
            "Preparar las cuatro especies (lulav y etrog)",
            "Decorar la sukkah",
            "Planificar comidas para compartir en la sukkah"
        ],
        biblical_refs: "Levítico 23:33-43, Números 29:12-40, Deuteronomio 16:13-17, Zacarías 14:16-19",
        importance: "high",
        image_url: "img/festivals/sukkot.jpg"
    },
    {
        id: 8,
        name: "Último Gran Día",
        hebrew_name: "שמיני עצרת",
        festival_type: "biblical",
        start_date: "2025-10-03",
        end_date: null,
        start_at_sunset: true,
        description_short: "Día solemne que sigue a Sukkot",
        description_long: "El Último Gran Día, también conocido como Shemini Atzeret, es un día santo adicional que sigue inmediatamente después de los siete días de Sukkot. Es considerado como el 'octavo día' de la festividad, aunque técnicamente es una celebración separada. Este día representa la culminación y el clímax del ciclo anual de festividades.",
        preparations: [
            "Continuar en oración y reflexión",
            "Estudiar las Escrituras relacionadas",
            "Preparar una comida festiva"
        ],
        biblical_refs: "Levítico 23:36, Números 29:35-38, Juan 7:37-39",
        importance: "high",
        image_url: "img/festivals/last_great_day.jpeg"
    }
];

// Eventos astronómicos
CalendarData.astronomical_events = [
    {
        id: 1,
        name: "Equinoccio de Primavera",
        event_date: "2025-03-20 16:46:00",
        description: "Inicio de la primavera. El día y la noche tienen aproximadamente la misma duración."
    },
    {
        id: 2,
        name: "Solsticio de Verano",
        event_date: "2025-06-20 05:42:00",
        description: "Día más largo del año. Marca el inicio del verano."
    },
    {
        id: 3,
        name: "Equinoccio de Otoño",
        event_date: "2025-09-22 21:19:00",
        description: "Inicio del otoño. El día y la noche tienen aproximadamente la misma duración."
    },
    {
        id: 4,
        name: "Solsticio de Invierno",
        event_date: "2025-12-21 17:03:00",
        description: "Día más corto del año. Marca el inicio del invierno."
    },
    {
        id: 5,
        name: "Equinoccio de Primavera",
        event_date: "2026-03-20 10:31:00",
        description: "Inicio de la primavera. El día y la noche tienen aproximadamente la misma duración."
    }
];

// Sistema mejorado de traducciones con estructura común
CalendarData.translations = {
    // Datos comunes compartidos entre idiomas
    common: {
        // Nombres de los días de la semana
        days: {
            es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            tl: ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
            he: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
        },
        // Nombres hebreos de los días (opcional para mostrar junto con el nombre traducido)
        hebrewDays: ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi\'i', 'Yom Chamishi', 'Yom Shishi', 'Yom Shabbat']
    },
    // Traducciones en español
    es: {
        // Interfaz general
        calendar: "Calendario",
        festivals: "Festividades",
        custom_events: "Mis Eventos",
        about: "Acerca de",
        month_info: "Información del Mes",
        festivals_this_month: "Festividades Este Mes",
        my_events: "Mis Eventos",
        previous: "Anterior",
        next: "Siguiente",
        export: "Exportar",
        print: "Imprimir",
        add_event: "Añadir Evento",
        no_festivals: "No hay festividades este mes",
        no_events: "No hay eventos personalizados",
        hebrew_name: "Nombre Hebreo",
        tribe: "Tribu",
        gregorian_dates: "Fechas Gregorianas",
        new_moon: "Luna Nueva",
        jerusalem_time: "Hora de Jerusalén",
        high_importance: "Alta Importancia",
        medium_importance: "Importancia Media",
        low_importance: "Importancia Baja",
        view_details: "Ver Detalles",
        date_info: "Información de Fecha",
        start_date: "Fecha de Inicio",
        end_date: "Fecha de Fin",
        duration: "Duración",
        days: "días",
        day: "día",
        at_sunset: "al atardecer",
        festival_info: "Información de la Festividad",
        type: "Tipo",
        biblical_festival: "Festividad Bíblica",
        traditional_festival: "Festividad Tradicional",
        astronomical_event: "Evento Astronómico",
        description: "Descripción",
        detailed_description: "Descripción Detallada",
        biblical_references: "Referencias Bíblicas",
        preparation_steps: "Pasos de Preparación",
        about_this_festival: "Sobre esta Festividad",
        biblical_festival_info: "Esta es una festividad bíblica basada en las Escrituras",
        cancel: "Cancelar",
        save: "Guardar",
        delete: "Eliminar",
        event_title: "Título del Evento",
        event_date: "Fecha del Evento",
        event_type: "Tipo de Evento",
        event_notes: "Notas",
        repeat_yearly: "Repetir anualmente",
        personal: "Personal",
        family: "Familiar",
        work: "Trabajo",
        other: "Otro",
        add_event_modal_title: "Añadir Evento",
        edit_event_modal_title: "Editar Evento",
        event_added: "Evento añadido correctamente",
        event_updated: "Evento actualizado correctamente",
        event_deleted: "Evento eliminado correctamente",
        confirm_delete: "¿Está seguro de que desea eliminar este evento?",
        today: "Hoy",
        current_date: "Fecha actual",
        phase_of_moon: "Fase de la Luna",
        next_new_moon: "Próxima Luna Nueva",
        scripture_of_month: "Escritura del Mes",
        month: "Mes",
        year: "Año",
        day_count: "Días",
        start_day: "Día inicial",
        featured_location: "Ubicación destacada",
        lunar_calendar: "Calendario Lunar",
        biblical_calendar: "Calendario Bíblico",
        twelve_tribes: "Doce Tribus de Israel",
        calendar_legend: "Leyenda del Calendario",
        sabbath_day: "Día de Reposo",
        current_day: "Día Actual",
        new_moon_day: "Día de Luna Nueva",
        festival_day: "Día de Festividad",
        important_festival: "Festividad Importante",
        personal_event: "Evento Personal",
        required_fields: "Los campos Título y Fecha son obligatorios",
        no_file_selected: "No se ha seleccionado ningún archivo",
        import_error: "Error al importar eventos",
        events_imported: "eventos importados correctamente",
        no_events_to_export: "No hay eventos para exportar",
        sample_events_exist: "Ya existen eventos de ejemplo",
        sample_events_added: "Eventos de ejemplo añadidos correctamente",
        no_preparation_steps: "No hay pasos de preparación específicos"
    },
    // Traducciones en inglés
    en: {
        calendar: "Calendar",
        festivals: "Festivals",
        custom_events: "My Events",
        about: "About",
        month_info: "Month Information",
        festivals_this_month: "Festivals This Month",
        my_events: "My Events",
        previous: "Previous",
        next: "Next",
        export: "Export",
        print: "Print",
        add_event: "Add Event",
        no_festivals: "No festivals this month",
        no_events: "No custom events",
        hebrew_name: "Hebrew Name",
        tribe: "Tribe",
        gregorian_dates: "Gregorian Dates",
        new_moon: "New Moon",
        jerusalem_time: "Jerusalem Time",
        high_importance: "High Importance",
        medium_importance: "Medium Importance",
        low_importance: "Low Importance",
        view_details: "View Details",
        date_info: "Date Information",
        start_date: "Start Date",
        end_date: "End Date",
        duration: "Duration",
        days: "days",
        day: "day",
        at_sunset: "at sunset",
        festival_info: "Festival Information",
        type: "Type",
        biblical_festival: "Biblical Festival",
        traditional_festival: "Traditional Festival",
        astronomical_event: "Astronomical Event",
        description: "Description",
        detailed_description: "Detailed Description",
        biblical_references: "Biblical References",
        preparation_steps: "Preparation Steps",
        about_this_festival: "About this Festival",
        biblical_festival_info: "This is a biblical festival based on Scripture",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        event_title: "Event Title",
        event_date: "Event Date",
        event_type: "Event Type",
        event_notes: "Notes",
        repeat_yearly: "Repeat yearly",
        personal: "Personal",
        family: "Family",
        work: "Work",
        other: "Other",
        add_event_modal_title: "Add Event",
        edit_event_modal_title: "Edit Event",
        event_added: "Event added successfully",
        event_updated: "Event updated successfully",
        event_deleted: "Event deleted successfully",
        confirm_delete: "Are you sure you want to delete this event?",
        today: "Today",
        current_date: "Current Date",
        phase_of_moon: "Moon Phase",
        next_new_moon: "Next New Moon",
        scripture_of_month: "Scripture of the Month",
        month: "Month",
        year: "Year",
        day_count: "Days Count",
        start_day: "Start Day",
        featured_location: "Featured Location",
        lunar_calendar: "Lunar Calendar",
        biblical_calendar: "Biblical Calendar",
        twelve_tribes: "Twelve Tribes of Israel",
        calendar_legend: "Calendar Legend",
        sabbath_day: "Sabbath Day",
        current_day: "Current Day",
        new_moon_day: "New Moon Day",
        festival_day: "Festival Day",
        important_festival: "Important Festival",
        personal_event: "Personal Event",
        required_fields: "Title and Date fields are required",
        no_file_selected: "No file selected",
        import_error: "Error importing events",
        events_imported: "events imported successfully",
        no_events_to_export: "No events to export",
        sample_events_exist: "Sample events already exist",
        sample_events_added: "Sample events added successfully",
        no_preparation_steps: "No specific preparation steps"
    },
    // Traducciones en tagalog
    tl: {
        calendar: "Kalendaryo",
        festivals: "Mga Kapistahan",
        custom_events: "Aking mga Kaganapan",
        about: "Tungkol sa",
        month_info: "Impormasyon ng Buwan",
        festivals_this_month: "Mga Kapistahan sa Buwang Ito",
        my_events: "Aking mga Kaganapan",
        previous: "Nakaraan",
        next: "Susunod",
        export: "I-export",
        print: "I-print",
        add_event: "Magdagdag ng Kaganapan",
        no_festivals: "Walang mga kapistahan sa buwang ito",
        no_events: "Walang personal na mga kaganapan",
        hebrew_name: "Pangalang Hebreo",
        tribe: "Tribu",
        gregorian_dates: "Mga Petsa sa Gregoriano",
        new_moon: "Bagong Buwan",
        jerusalem_time: "Oras sa Jerusalem",
        high_importance: "Mataas na Kahalagahan",
        medium_importance: "Katamtamang Kahalagahan",
        low_importance: "Mababang Kahalagahan",
        view_details: "Tingnan ang Detalye",
        date_info: "Impormasyon ng Petsa",
        start_date: "Petsa ng Pagsisimula",
        end_date: "Petsa ng Pagtatapos",
        duration: "Tagal",
        days: "araw",
        day: "araw",
        at_sunset: "sa paglubog ng araw",
        festival_info: "Impormasyon ng Kapistahan",
        type: "Uri",
        biblical_festival: "Kapistahang Biblikal",
        traditional_festival: "Tradisyonal na Kapistahan",
        astronomical_event: "Astronomiko na Kaganapan",
        description: "Paglalarawan",
        detailed_description: "Detalyadong Paglalarawan",
        biblical_references: "Mga Sanggunian sa Bibliya",
        preparation_steps: "Mga Hakbang sa Paghahanda",
        about_this_festival: "Tungkol sa Kapistahang Ito",
        biblical_festival_info: "Ito ay isang kapistahang biblikal batay sa Kasulatan",
        cancel: "Kanselahin",
        save: "I-save",
        delete: "Burahin",
        event_title: "Pamagat ng Kaganapan",
        event_date: "Petsa ng Kaganapan",
        event_type: "Uri ng Kaganapan",
        event_notes: "Mga Tala",
        repeat_yearly: "Ulitin taun-taon",
        personal: "Personal",
        family: "Pamilya",
        work: "Trabaho",
        other: "Iba pa",
        add_event_modal_title: "Magdagdag ng Kaganapan",
        edit_event_modal_title: "I-edit ang Kaganapan",
        event_added: "Matagumpay na naidagdag ang kaganapan",
        event_updated: "Matagumpay na na-update ang kaganapan",
        event_deleted: "Matagumpay na nabura ang kaganapan",
        confirm_delete: "Sigurado ka bang gusto mong burahin ang kaganapang ito?",
        today: "Ngayon",
        current_date: "Kasalukuyang Petsa",
        phase_of_moon: "Yugto ng Buwan",
        next_new_moon: "Susunod na Bagong Buwan",
        scripture_of_month: "Kasulatan ng Buwan",
        month: "Buwan",
        year: "Taon",
        day_count: "Bilang ng Araw",
        start_day: "Araw ng Pagsisimula",
        featured_location: "Featured na Lokasyon",
        lunar_calendar: "Kalendaryo ng Buwan",
        biblical_calendar: "Bibliyong Kalendaryo",
        twelve_tribes: "Labindalawang Tribu ng Israel",
        calendar_legend: "Leyenda ng Kalendaryo",
        sabbath_day: "Araw ng Sabbath",
        current_day: "Kasalukuyang Araw",
        new_moon_day: "Araw ng Bagong Buwan",
        festival_day: "Araw ng Kapistahan",
        important_festival: "Mahalagang Kapistahan",
        personal_event: "Personal na Kaganapan",
        required_fields: "Ang mga patlang na Pamagat at Petsa ay kinakailangan",
        no_file_selected: "Walang napiling file",
        import_error: "Error sa pag-import ng mga kaganapan",
        events_imported: "mga kaganapan na matagumpay na na-import",
        no_events_to_export: "Walang mga kaganapan na i-export",
        sample_events_exist: "Ang mga halimbawang kaganapan ay umiiral na",
        sample_events_added: "Matagumpay na naidagdag ang mga halimbawang kaganapan",
        no_preparation_steps: "Walang tiyak na mga hakbang sa paghahanda"
    },
    // Traducciones en hebreo
    he: {
        calendar: "לוח שנה",
        festivals: "חגים",
        custom_events: "האירועים שלי",
        about: "אודות",
        month_info: "מידע על החודש",
        festivals_this_month: "חגים בחודש זה",
        my_events: "האירועים שלי",
        previous: "הקודם",
        next: "הבא",
        export: "ייצוא",
        print: "הדפסה",
        add_event: "הוסף אירוע",
        no_festivals: "אין חגים בחודש זה",
        no_events: "אין אירועים מותאמים אישית",
        hebrew_name: "שם עברי",
        tribe: "שבט",
        gregorian_dates: "תאריכים גרגוריאניים",
        new_moon: "ירח חדש",
        jerusalem_time: "שעון ירושלים",
        high_importance: "חשיבות גבוהה",
        medium_importance: "חשיבות בינונית",
        low_importance: "חשיבות נמוכה",
        view_details: "צפה בפרטים",
        date_info: "מידע על התאריך",
        start_date: "תאריך התחלה",
        end_date: "תאריך סיום",
        duration: "משך",
        days: "ימים",
        day: "יום",
        at_sunset: "בשקיעה",
        festival_info: "מידע על החג",
        type: "סוג",
        biblical_festival: "חג מקראי",
        traditional_festival: "חג מסורתי",
        astronomical_event: "אירוע אסטרונומי",
        description: "תיאור",
        detailed_description: "תיאור מפורט",
        biblical_references: "מקורות מקראיים",
        preparation_steps: "צעדי הכנה",
        about_this_festival: "על חג זה",
        biblical_festival_info: "זהו חג מקראי המבוסס על הכתובים",
        cancel: "ביטול",
        save: "שמירה",
        delete: "מחיקה",
        event_title: "כותרת האירוע",
        event_date: "תאריך האירוע",
        event_type: "סוג האירוע",
        event_notes: "הערות",
        repeat_yearly: "חזור מדי שנה",
        personal: "אישי",
        family: "משפחה",
        work: "עבודה",
        other: "אחר",
        add_event_modal_title: "הוסף אירוע",
        edit_event_modal_title: "ערוך אירוע",
        event_added: "האירוע נוסף בהצלחה",
        event_updated: "האירוע עודכן בהצלחה",
        event_deleted: "האירוע נמחק בהצלחה",
        confirm_delete: "האם אתה בטוח שברצונך למחוק אירוע זה?",
        today: "היום",
        current_date: "תאריך נוכחי",
        phase_of_moon: "שלב הירח",
        next_new_moon: "הירח החדש הבא",
        scripture_of_month: "פסוק החודש",
        month: "חודש",
        year: "שנה",
        day_count: "מספר ימים",
        start_day: "יום התחלה",
        featured_location: "מיקום מוצג",
        lunar_calendar: "לוח ירחי",
        biblical_calendar: "לוח שנה מקראי",
        twelve_tribes: "שנים עשר שבטי ישראל",
        calendar_legend: "מקרא לוח השנה",
        sabbath_day: "יום שבת",
        current_day: "היום הנוכחי",
        new_moon_day: "יום ירח חדש",
        festival_day: "יום חג",
        important_festival: "חג חשוב",
        personal_event: "אירוע אישי",
        required_fields: "שדות הכותרת והתאריך הם חובה",
        no_file_selected: "לא נבחר קובץ",
        import_error: "שגיאה בייבוא אירועים",
        events_imported: "אירועים יובאו בהצלחה",
        no_events_to_export: "אין אירועים לייצוא",
        sample_events_exist: "אירועי דוגמה כבר קיימים",
        sample_events_added: "אירועי דוגמה נוספו בהצלחה",
        no_preparation_steps: "אין צעדי הכנה ספציפיים"
    }
};

// Funciones utilitarias
CalendarData.utils = {
    // Convierte fecha ISO a objeto Date
    parseDate: function(isoDate) {
        return new Date(isoDate);
    },
    
    // Formatea una fecha según el locale
    formatDate: function(date, locale = 'es') {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(locale === 'en' ? 'en-US' : (locale === 'tl' ? 'fil-PH' : (locale === 'he' ? 'he-IL' : 'es-ES')), options);
    },
    
    // Obtener nombre del día de la semana
    getDayName: function(date, locale = 'es') {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        
        const options = { weekday: 'long' };
        return date.toLocaleDateString(locale === 'en' ? 'en-US' : (locale === 'tl' ? 'fil-PH' : (locale === 'he' ? 'he-IL' : 'es-ES')), options);
    },
    
    // Obtener nombre del día de la semana a partir de su índice (0-6)
    getDayNameFromIndex: function(index, language = 'es', includeHebrew = false) {
        if (index < 0 || index > 6) {
            index = 0; // Por defecto domingo
        }
        
        // Obtener el nombre traducido
        const translatedName = this.translations.common.days[language][index] || this.translations.common.days.es[index];
        
        // Si se solicita incluir el nombre hebreo
        if (includeHebrew && language !== 'he') {
            const hebrewName = this.translations.common.hebrewDays[index];
            return `${translatedName} (${hebrewName})`;
        }
        
        return translatedName;
    },
    
    // Función auxiliar para obtener una traducción
    getTranslation: function(key, language = 'es', defaultValue = '') {
        // Primero intenta obtener la traducción en el idioma especificado
        if (this.translations[language] && this.translations[language][key] !== undefined) {
            return this.translations[language][key];
        }
        
        // Si no existe, intenta con el español
        if (this.translations.es && this.translations.es[key] !== undefined) {
            return this.translations.es[key];
        }
        
        // Si no existe la clave, devuelve el valor por defecto
        return defaultValue;
    }
};

// Asignar las funciones de utilidad directamente al objeto CalendarData
CalendarData.getDayNameFromIndex = function(index, language = 'es', includeHebrew = false) {
    if (index < 0 || index > 6) {
        index = 0; // Por defecto domingo
    }
    
    // Obtener el nombre traducido
    const translatedName = this.translations.common.days[language][index] || this.translations.common.days.es[index];
    
    // Si se solicita incluir el nombre hebreo
    if (includeHebrew && language !== 'he') {
        const hebrewName = this.translations.common.hebrewDays[index];
        return `${translatedName} (${hebrewName})`;
    }
    
    return translatedName;
};

CalendarData.getTranslation = function(key, language = 'es', defaultValue = '') {
    // Primero intenta obtener la traducción en el idioma especificado
    if (this.translations[language] && this.translations[language][key] !== undefined) {
        return this.translations[language][key];
    }
    
    // Si no existe, intenta con el español
    if (this.translations.es && this.translations.es[key] !== undefined) {
        return this.translations.es[key];
    }
    
    // Si no existe la clave, devuelve el valor por defecto
    return defaultValue;
};