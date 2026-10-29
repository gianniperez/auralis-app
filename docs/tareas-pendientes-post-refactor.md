# 📌 Tareas y Mejoras Pendientes (Post-Refactorización)

Documento de seguimiento para mejoras de contenido, copys narrativos y assets a realizar una vez finalizada la arquitectura base de **auralis-v2**.

---

## 🎨 1. Copys y Storytelling en la Galería (`artworks.json`)

* **Situación actual:** Completado en las 27 obras de la galería (y eliminado el duplicado `_id: 20`).
* **Objetivo:** Darle alma a cada obra para reforzar la identidad de estudio artesanal y narrativo.
* **Acciones realizadas:**
  * [x] Asignar un **título evocador** a cada pieza tanto en español como en inglés.
  * [x] Escribir una **breve descripción / micro-lore** (1 o 2 oraciones) que explique qué representa, la historia detrás del personaje o el encargo original.
  * [x] Eliminar la ilustración duplicada (`_id: 20`) unificando sus categorías en `_id: 2`.

---

## 🇦🇷 2. Integración de Pagos Locales en la UI (Servicios y FAQs)

* **Objetivo:** Facilitar la contratación para clientes en Argentina sin sobrecargar la interfaz internacional.
* **Acción realizada:**
  * [x] Incluir nota sutil bajo el bloque de inversión en `ServicesSection` y detalle ampliado en `faqs.json` (USD vía PayPal / Payoneer para el exterior, y cotización en ARS con Mercado Pago / Transferencia para Argentina).
