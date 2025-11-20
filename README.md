# 📅 Calendario Bíblico - CoYHWH

[![Estado](https://img.shields.io/badge/Estado-Activo-success)](https://jhnmr.github.io/Calendar)
[![Versión](https://img.shields.io/badge/Versión-1.0-blue)](https://github.com/Jhnmr/Calendar)
[![Licencia](https://img.shields.io/badge/Licencia-Informativo-informational)](https://github.com/Jhnmr/Calendar)

## 🌟 Acerca de Este Proyecto

**Calendario Bíblico** es un sitio web informativo y educativo que presenta el calendario hebreo bíblico según las escrituras, alineado con los principios establecidos en el libro "The Biblical Calendar".

🔗 **[Ver Calendario en Vivo](https://jhnmr.github.io/Calendar)**

---

## 📖 Propósito

Este proyecto tiene como objetivo **educar e informar** sobre:
- Las festividades bíblicas y sus fechas correctas
- Los principios del calendario lunisolar bíblico
- La alineación con los equinoccios vernal y otoñal
- El conteo del Omer (50 días desde Primicias hasta Shavuot)
- Las fases lunares y su relación con el calendario
- La importancia profética de cada festividad

**Nota:** Este es un recurso educativo e informativo, no una aplicación comercial.

---

## ✨ Características Principales

### 📊 Validación de Fechas Bíblicas
- ✅ Verifica que Passover esté después del equinoccio vernal
- ✅ Verifica que Sukkot esté después del equinoccio otoñal
- ✅ Valida que Primicias SIEMPRE sea domingo
- ✅ Valida que Shavuot SIEMPRE sea domingo (50 días después de Primicias)
- ✅ Calcula automáticamente todas las festividades

### 📅 Contador del Omer
- Conteo de 50 días desde Primicias hasta Shavuot
- Barra de progreso visual animada
- Muestra semanas y días restantes
- Traducciones en 4 idiomas (español, inglés, tagalog, hebreo)

### 🔔 Sistema de Notificaciones
- Alertas automáticas a 30, 7, 3, 1 y 0 días antes de festividades
- Niveles de urgencia: alta, media, baja
- Notificaciones personalizables

### 🌙 Fases Lunares
- Visualización de fase lunar en cada día
- Cálculos astronómicos precisos
- Tooltips informativos

### 🌍 Multi-idioma
- Español
- English
- Tagalog
- עברית (Hebreo)

---

## 📅 Festividades Bíblicas

### Festividades de Primavera

| Festividad | Fecha Hebrea | Descripción |
|------------|--------------|-------------|
| **Passover (Pesaj)** | 14 de Aviv | Conmemoración de la liberación de Egipto |
| **Panes sin Levadura** | 15-21 de Aviv | 7 días sin levadura |
| **Primicias (Resurrección)** | 16 de Aviv | Siempre en domingo - Inicio del conteo del Omer |
| **Shavuot (Pentecostés)** | 6 de Sivan | Siempre en domingo - 50 días después de Primicias |

### Festividades de Otoño

| Festividad | Fecha Hebrea | Descripción |
|------------|--------------|-------------|
| **Yom Teruah (Trompetas)** | 1 de Tishri | Inicio del 7º mes - Toque del shofar |
| **Yom Kippur (Expiación)** | 10 de Tishri | Día de ayuno y arrepentimiento |
| **Sukkot (Tabernáculos)** | 15-21 de Tishri | Fiesta de las cabañas - 7 días |
| **Último Gran Día** | 22 de Tishri | Culminación del ciclo anual |

---

## 🎯 Reglas Bíblicas Implementadas

### Validaciones Automáticas:
1. ✅ Passover DEBE ocurrir después del equinoccio vernal (21 de marzo aprox.)
2. ✅ Primicias DEBE ser domingo (primer día después del Sabbat)
3. ✅ Shavuot DEBE ser domingo (50 días después de Primicias)
4. ✅ Sukkot DEBE ocurrir después del equinoccio otoñal (22 de septiembre aprox.)
5. ✅ El ciclo semanal de 7 días es INMUTABLE (Sabbat siempre en sábado)

### Errores que el Sistema Previene:
- ❌ Passover antes del equinoccio vernal
- ❌ Primicias sin ser domingo
- ❌ Shavuot sin ser domingo
- ❌ Sukkot antes del equinoccio otoñal

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsivos con animaciones
- **JavaScript (Vanilla)** - Lógica del calendario
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía hebrea

---

## 📂 Estructura del Proyecto

```
Calendar/
├── index.html                      # Página principal
├── test-validacion.html            # Página de pruebas
├── MEJORAS_IMPLEMENTADAS.md        # Documentación de mejoras
├── README.md                       # Este archivo
│
├── css/
│   └── style.css                   # Estilos personalizados
│
├── js/
│   ├── biblical-validator.js       # Validador de fechas
│   ├── calendar-data.js            # Datos del calendario
│   ├── calendar-ui.js              # Interfaz del calendario
│   ├── moon-phases.js              # Cálculos de fases lunares
│   ├── omer-counter.js             # Contador del Omer
│   ├── notifications.js            # Sistema de notificaciones
│   └── custom-events.js            # Eventos personalizados
│
└── img/
    ├── festivals/                  # Imágenes de festividades
    └── months/                     # Imágenes de meses
```

---

## 🚀 Uso

### Ver el Calendario en Vivo

Simplemente visita: **[https://jhnmr.github.io/Calendar](https://jhnmr.github.io/Calendar)**

### Ejecutar Localmente

1. Clona el repositorio:
```bash
git clone https://github.com/Jhnmr/Calendar.git
```

2. Abre `index.html` en tu navegador:
```bash
cd Calendar
open index.html
```

### Ejecutar Pruebas de Validación

Abre `test-validacion.html` en tu navegador para ejecutar las pruebas automáticas de validación de fechas.

---

## 📚 Referencias Bíblicas

- **Levítico 23** - Todas las festividades y sus fechas
- **Éxodo 12** - Passover y Panes sin Levadura
- **Levítico 23:15-16** - Conteo del Omer (50 días)
- **Deuteronomio 16** - Requisitos de las festividades
- **Hechos 2:1** - Pentecostés (Shavuot) y el Espíritu Santo

---

## 📖 Basado en el Libro

Este calendario está basado en los principios establecidos en:
**"The Biblical Calendar"** - Que detalla las reglas bíblicas para determinar las fechas correctas de las festividades.

---

## 🌍 Idiomas Disponibles

- 🇪🇸 **Español** - Idioma principal
- 🇬🇧 **English** - Traducciones completas
- 🇵🇭 **Tagalog** - Soporte para comunidades filipinas
- 🇮🇱 **עברית** - Hebreo con soporte RTL

---

## 📊 Validación de Fechas 2025-2026

### Año 2025 ✅
Todas las festividades han sido validadas y corregidas según las reglas bíblicas:
- Passover: 12 de abril (después del equinoccio vernal)
- Primicias: 13 de abril (domingo)
- Shavuot: 1 de junio (domingo, 49 días después)
- Sukkot: 7-13 de octubre (después del equinoccio otoñal)

### Año 2026 ✅
Las fechas proporcionadas cumplen 100% con las reglas bíblicas:
- Passover: 2 de abril
- Primicias: 5 de abril (domingo)
- Shavuot: 24 de mayo (domingo)
- Sukkot: 26 de septiembre (después del equinoccio otoñal)

---

## 🤝 Contribuciones

Este es un proyecto educativo e informativo. Las contribuciones son bienvenidas para:
- Mejorar las traducciones
- Añadir más referencias bíblicas
- Mejorar la documentación
- Reportar errores de cálculo

---

## 📄 Licencia

Este proyecto es de **uso informativo y educativo**. Los datos del calendario están basados en fuentes bíblicas y son de dominio público.

---

## 📞 Contacto

Para preguntas o sugerencias sobre el calendario, por favor abre un issue en GitHub.

---

## 🙏 Agradecimientos

- A todos los estudiosos del calendario bíblico
- A la comunidad que preserva estas tradiciones
- A los contribuyentes del proyecto

---

**Desarrollado con precisión bíblica y amor por la Palabra** 📖✨

---

## 🔗 Enlaces Útiles

- 🌐 [Sitio Web](https://jhnmr.github.io/Calendar)
- 📝 [Documentación Completa](MEJORAS_IMPLEMENTADAS.md)
- 🧪 [Página de Pruebas](https://jhnmr.github.io/Calendar/test-validacion.html)
- 📖 [Repositorio GitHub](https://github.com/Jhnmr/Calendar)

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0
**Estado:** ✅ Producción
