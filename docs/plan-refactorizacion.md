# 🌌 Plan de Refactorización: Auralis-App ➔ Auralis-V2

---

## 🔮 Visión General

Transformar el sitio de **Auralis** en una plataforma web inmersiva, fantástica y de calidad prémium. La nueva versión deja atrás la complejidad innecesaria de bases de datos externas para catálogos estáticos, adoptando una arquitectura moderna sobre **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** y un sistema de diseño propio basado en la identidad de marca: *Aura (luz, chispa creadora)* y *Lis (nobleza, misticismo y transformación)*.

---

## 🛠️ Stack Tecnológico

| Herramienta | Versión / Rol | Justificación |
| :--- | :--- | :--- |
| **Next.js** | 16 (App Router con Turbopack) | Alto rendimiento, Server Components nativos, rutas optimizadas. |
| **React** | 19.3 | Última versión de React, hidratación ultra rápida. |
| **TypeScript** | 5.x | Tipado estricto en datos bilingües y componentes. |
| **Tailwind CSS** | v4 | Sistema de tokens semánticos nativos en `@theme` de `globals.css`. |
| **SVGR** | `@svgr/webpack` en Turbopack | Importación directa de archivos SVG como componentes React. |
| **Framer Motion** | 14.x | Micro-interacciones, transiciones fluidas, hover states con brillos/glow. |
| **Google Fonts** | *Berkshire Swash* + *Lora* | Tipografías display de fantasía y serif de lectura editorial. |

---

## 🎨 Sistema de Diseño (Design Tokens)

Configurado en [globals.css](file:///c:/Users/giann/Documents/Gianni/Proyectos/auralis-v2/src/app/globals.css):

### 1. Paleta Cromática

* **Abismo Cósmico y Superficies:**
  * `--color-abyss`: `#08040d` (Fondo principal, oscuridad con tinte místico)
  * `--color-surface`: `#12091c` (Cards y contenedores glassmorphism)
  * `--color-surface-elevated`: `#1d102e` (Superficies elevadas e interactivas)
* **Amatista Mágico (Acentos & Magia - 3 tonos exactos):**
  * `--color-amethyst-300`: `#7c4ebb` (Resplandores, bordes y badges)
  * `--color-amethyst-400`: `#211147` (Capas intermedias y fondos glass)
  * `--color-amethyst-500`: `#0e0022` (Profundidad mística)
* **Oro Alquímico (Luz, Halos y CTAs - 3 tonos exactos):**
  * `--color-gold-50`: `#fdf5e6` (Brillo extremo y luces estelares)
  * `--color-gold-100`: `#f5e0ce` (Destellos suaves)
  * `--color-gold-200`: `#edc29e` (Tono dorado heráldico principal)
* **Pergamino (Tipografía de lectura legible y bordes):**
  * `--color-parchment`: `#edeae4` (Texto principal de lectura suave)
  * `--color-parchment-muted`: `#c9c3b8` (Texto secundario y subtítulos)
  * `--color-parchment-dark`: `#8c857b` (Detalles atenuados)
  * `--color-parchment-darker`: `#4a443d` (Bordes muy sutiles)

### 2. Tipografías

* **Display / Títulos Fantásticos:** `Berkshire Swash` (`font-display`, `font-decorative`).
* **Lectura & Cuerpo:** `Lora` (`font-serif`).

---

---

## 🏛️ Arquitectura de Información (Enfoque Híbrido Mobile-First)

La web se estructura como una **Home Ejecutiva y Narrativa** de scroll inmersivo continuo, optimizada ergonómicamente para dispositivos móviles (*Thumb Zone*) y con micro-interacciones cinematográficas en desktop:

1. **Hero Section (La Puerta al Universo):**
   * Título y eslogan: *"Donde la imaginación se convierte en magia"*.
   * Halo cósmico con resplandor dorado y partículas.
   * 2 CTAs: *"Explorar Obras"* (scroll suave a galería) y *"Encargar Ilustración"* (dispara contacto).

2. **About Section (El Alma & La Artista - Arte y Assets Preservados):**
   * **Bloque 1 (Pilares):** Los 3 iconos dorados geométricos (*Corazón / Identidad Emocional*, *Libro con estrella / Narrativa Visual*, *Orbe / Estética Mística*). En desktop en grilla de 3 columnas; en mobile con stack vertical o swipe táctil fluido.
   * **Bloque 2 (El Alma de Auralis):** Explicación de *Aura + Lis* acompañada por la ilustración entrañable de **la ratita con aura de luz estelar**.
   * **Bloque 3 (La Artista):** Retrato ilustrado de **Gianni** con iluminación cálida + bio de conexión humana (*"Soy Gianni, ilustradora argentina..."*).
   * **Optimizaciones clave:** Ancho de texto legible (`max-w-prose`), márgenes de respiración más limpios, micro-animación sutil de respiración/glow en la ratita y los iconos con Framer Motion, y composición vertical amigable en mobile.

3. **Galería Destacada (Curated Preview + Archivo Completo):**
   * Grilla principal en la Home con **6 a 8 obras maestras destacadas**.
   * Filtros rápidos por tags (*Character Design, Portraits, RPG Art, Book Covers, Landscapes*).
   * Lightbox modal para examinar piezas con zoom y detalle.
   * Botón magnético: *"Explorar archivo completo (+25 obras) ➔"* para desplegar el catálogo sin sobrecargar la carga inicial.

4. **Servicios & Proceso Creativo:**
   * Cards con glassmorphism de los 5 servicios con sus tarifas validadas ($45 a $150 USD) y plazos realistas (1 a 4 semanas).
   * Línea de proceso en 4 pasos ordenados de forma ascendente: *01. Comparte tu idea* ➔ *02. Boceto y Composición* ➔ *03. Color y Luces* ➔ *04. Entrega Final*.

5. **FAQs (Objeciones Clave):**
   * Accordions compactos respondiendo dudas sobre métodos de pago (Stripe/PayPal o ARS por transferencia), revisiones y entregables en alta resolución.

6. **Contacto Multi-Canal (Mobile-First):**
   * **En Desktop:** Modal flotante con backdrop blur, resplandor dorado y formulario de baja fricción (3 campos esenciales).
   * **En Mobile (Bottom Sheet / Drawer):** Hoja que se desliza desde la parte inferior de la pantalla adaptada a la zona del pulgar (*Thumb Zone*), que respeta la apertura del teclado virtual y se cierra con gesto swipe-down.
   * **Accesos Rápidos Directos:** Botones grandes táctiles a un toque para chatear directo por **Instagram DM** o **Discord**.

---

## 📂 Arquitectura del Proyecto

```
auralis-v2/
├── docs/
│   ├── plan-refactorizacion.md       # Este documento
│   └── tareas-pendientes-post-refactor.md
├── messages/                         # Diccionarios de internacionalización
│   ├── es/                           # Mensajes en español
│   └── en/                           # Mensajes en inglés
├── public/
│   └── images/                       # Ilustraciones (ratita, Gianni, pilares, etc.)
├── src/
│   ├── app/
│   │   ├── globals.css               # Design tokens, resets y utilidades mágicas
│   │   └── [locale]/
│   │       ├── layout.tsx            # Locale layout con Google Fonts, lang dinámico y NextIntlClientProvider
│   │       └── page.tsx              # Home page / Ensamblado de secciones
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Header flotante con glassmorphism y selector de idioma
│   │   │   ├── NavbarMobile.tsx      # Menú móvil accesible con flor de lis activa
│   │   │   └── Footer.tsx            # Pie temático con redes y lis
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Portada principal con halo cósmico y CTA
│   │   │   ├── AboutSection.tsx      # Pilares dorados, Alma de Auralis (ratita) y La Artista (Gianni)
│   │   │   ├── GallerySection.tsx    # Portafolio curado (6-8) con filtros y botón expand
│   │   │   ├── ServicesSection.tsx   # Comisiones y tipos de trabajo con nuevas tarifas
│   │   │   ├── StepsSection.tsx      # Proceso creativo en 4 pasos
│   │   │   └── FaqSection.tsx        # Dudas frecuentes en accordions
│   │   ├── ui/
│   │   │   ├── Button.tsx            # Botón primario (Runa Obsidiana con faceta amatista y glow místico), secundario (Cristal Ahumado con Borde Dorado y glow áureo) y ghost limpio
│   │   │   ├── Heading.tsx           # Títulos de sección con flor de lis ornamental
│   │   │   ├── Input.tsx             # Input con glassmorphism y halo dorado
│   │   │   ├── Textarea.tsx          # Textarea con glassmorphism y halo dorado
│   │   │   ├── TagBadge.tsx          # Pastillas de filtrado de galería
│   │   │   ├── Modal.tsx             # Modal centrado de escritorio
│   │   │   ├── Drawer.tsx            # Bottom Sheet deslizable móvil
│   │   │   ├── LightboxModal.tsx     # Modal para ver ilustraciones en alta resolución
│   │   │   └── SocialLinks.tsx       # Tira interactiva de redes sociales
│   │   └── effects/
│   │       ├── BackgroundStars.tsx   # Partículas cósmicas y estrellas de fondo en GPU
│   │       ├── Sparkles.tsx          # Destellos estelares dinámicos en hover
│   │       └── Sparks.tsx            # Partículas mágicas ascendentes flotantes del Hero
│   ├── data/
│   │   ├── artworks.json             # Catálogo de ilustraciones
│   │   ├── services.json             # Servicios y comisiones actualizados
│   │   ├── steps.json                # Pasos del método de trabajo (01 a 04)
│   │   ├── navigation.ts             # Enlaces de navegación unificados
│   │   └── socialLinks.ts            # Enlaces de redes sociales oficiales
│   ├── i18n/
│   │   ├── routing.ts                # Configuración de locales (es, en)
│   │   └── request.ts                # Carga de mensajes de internacionalización
│   ├── icons/
│   │   ├── index.ts                  # Exportación centralizada de SVG como componentes
│   │   └── ... (SVGs limpios)
│   ├── lib/
│   │   └── data.ts                   # Helpers tipados de consulta
│   ├── proxy.ts                      # Middleware i18n para Next.js 16
│   └── types/
│       └── index.ts                  # Modelos de datos (Artwork, Service, Step, LocalizedText)
```

---

## 🚀 Fases de Implementación

### ✅ Fase 1: Fundaciones y Datos (Completada)

* [x] Configuración de Tailwind CSS v4 con tokens de color cósmicos, oro y amatista.
* [x] Configuración de Google Fonts (*Berkshire Swash* + *Lora*) en `layout.tsx`.
* [x] Unificación y tipado de datos estáticos en `src/types/index.ts`.
* [x] Migración y profesionalización de `services.json` (tarifas realistas) y `steps.json` (orden 01 a 04).
* [x] Creación de funciones de acceso en `src/lib/data.ts`.
* [x] Centralización de iconos vectoriales en `src/icons/index.ts`.
* [x] Soporte para Turbopack + SVGR en `next.config.ts`.

### ✅ Fase 2: Componentes Core UI & Layout Base (Completada)

* [x] **Botón Temático (`Button.tsx`):**
  * Variantes: `primary` (Oro Solar con resplandor), `secondary` (Amatista/Glass), `ghost` (Etéreo).
  * Tamaños: `sm`, `md`, `lg`. Soporte para iconos (`icons.star`, `icons.arrow`, etc.).
  * Micro-interacción: partículas mágicas (`Sparkles.tsx`) flotando en hover con Framer Motion.
* [x] **Efecto de Partículas Mágicas (`Sparkles.tsx`):** Motor liviano de destellos para botones y acentos.
* [x] **Encabezado de Sección (`Heading.tsx`):** Flor de Lis heráldica superior (`gradLis`), título en `font-display` con gradiente y subtítulo con ancho controlado.
* [x] **Campos de Formulario (`Input.tsx` & `Textarea.tsx`):** Estilo `glass-input` con foco dorado resplandeciente.
* [x] **Diálogos Accesibles (`Modal.tsx` & `Drawer.tsx`):**
  * Modal centrado con glassmorphism y backdrop blur para Desktop.
  * Bottom Sheet deslizable para Mobile adaptable al pulgar (*Thumb Zone*).
* [x] **Pastillas de Filtro (`TagBadge.tsx`):** Badges interactivos para filtrado de obras con estado active en oro/amatista.
* [x] **Enlaces a Redes Sociales (`SocialLinks.tsx`):** Tira horizontal con iconos vectoriales y hover resplandeciente.
* [x] **Fondo Estelar Atmosférico (`BackgroundStars.tsx`):** Dos capas superpuestas de partículas GPU con deriva continua, nebulosa etérea y viñeta perimetral.
* [x] **Navegación Smart Sticky (`Navbar.tsx` & `NavbarMobile.tsx`):**
  * Ocultamiento automático al bajar (`scrollY > 50px`) y reaparición inmediata al subir.
  * Activación de `glass-panel` al scrollear (`scrollY > 20px`).
  * Indicador de sección activa con la Flor de Lis ornamental (`IconActiveBar`).
  * Menú Mobile desplegable táctil.
* [x] **Footer Temático (`Footer.tsx`):** Flor de Lis ornamental superior, imagotipo/isologo, enlaces de navegación, redes sociales y copyright.

### ✅ Fase 3: Secciones del Sitio (Mobile-First) (Completada)

* [x] **Hero Section (`HeroSection.tsx`):**
  * Fondo con ilustración original de alta resolución (`hero.png`), halo radial místico y desvanecimiento en niebla cósmica hacia el fondo abismal.
  * Tipografía majestuosa en *Berkshire Swash* con gradiente dorado solar.
  * Doble llamada a la acción: *"Encargar Obra"* (dispara contacto) y *"Explorar Obras"* (scroll suave).
  * Indicador de scroll animado con flecha y resplandor.
* [x] **About Section (`AboutSection.tsx`):**
  * Grilla de 3 pilares con sus iconos heráldicos dorados vectoriales (`pillar1`, `pillar2`, `pillar3`).
  * Bloque *"El Alma de Auralis"* preservando la querida ilustración de la ratita iluminada (`the-soul.png`) con aura mística pulsante.
  * Bloque *"La Artista"* con el autorretrato de Gianni (`the-artist.png`) y bio cercana que conecta con el autor.
* [x] **Gallery Section (`GallerySection.tsx`):**
  * Grilla curada con 8 obras maestras iniciales en proporción 3:4 con aura y zoom al hover.
  * Pastillas interactivas `TagBadge` con filtrado dinámico en memoria.
  * Modal Lightbox de alta definición (`LightboxModal.tsx`) con navegación anterior/siguiente y teclado (Esc, Flechas).
  * Botón expansor *"Explorar archivo completo"* para desplegar la colección total sin sobrecargar la pantalla inicial.
* [x] **Servicios & Metodología Creativa (`ServicesSection.tsx`):**
  * Tarjetas con glassmorphism de los 5 servicios con sus tarifas de mercado actualizadas ($45 a $150 USD) y tiempos de entrega.
  * Botón directo *"Encargar este estilo"* que precarga el servicio en el formulario de contacto.
  * Línea de proceso en 4 pasos ordenados de forma ascendente (01 a 04) con la cláusula de revisión intacta en el Paso 02.
* [x] **FAQs Section (`FaqsSection.tsx`):**
  * Acordeones con micro-interacciones suaves de Framer Motion e iconos vectoriales dedicados (`faq1` a `faq5`).
  * Respuestas sobre métodos de pago (incluyendo ARS y PayPal), derechos comerciales y plazos.
* [x] **Contacto Adaptativo (`ContactDialog.tsx`):**
  * En Desktop: Modal centrado con backdrop blur.
  * En Mobile: Bottom Sheet (Drawer) con adaptación a la zona del pulgar (*Thumb Zone*).
  * Formulario conciso de baja fricción (3 campos) + accesos directos de un toque a Instagram DM y correo electrónico directo.

### 🔄 Fase 4: Micro-interacciones & Testing UX/UI

* [x] Animaciones de entrada escalonadas con Framer Motion (`whileInView`, `AnimatePresence`).
* [x] Efectos hover de brillo estelar, halos dorados y partículas reactivas.
* [x] Soporte bilingüe completo (Español / Inglés) vía `next-intl`.
* [ ] Pruebas en navegador en caliente para verificar rendimiento y respuesta táctil.
