# Auralis App

Auralis es una aplicación web multilingüe construida con Next.js, diseñada para como portfolio artístico. Cuenta con internacionalización, animaciones fluidas e integración de datos del lado del servidor.

**🌍 Link al sitio:** [https://auralis-wine.vercel.app/](https://auralis-wine.vercel.app/)

## Características

- **Next.js 15 (App Router):** Server Components, Server Actions y enrutamiento optimizado.
- **Internacionalización (i18n):** Soporte multi-idioma fluido integrado con `next-intl`.
- **Animaciones fluidas:** Interacciones y animaciones enriquecidas utilizando `framer-motion`.
- **Integración de Base de Datos:** Conexión a MongoDB vía `mongoose` para obtener obras de arte, servicios y contenido dinámico.
- **Sistema de Correos:** Envío de correos y formularios a través de `resend` y `@react-email/components`.
- **Estilos:** Arquitectura CSS/SCSS personalizada siguiendo la metodología BEM para una UI escalable y mantenible (mediante el hook custom `useBEM`).
- **Generación de Código:** Creación rápida y estructurada de componentes a través de `plop` (`npm run generate`).

## Stack Tecnológico

- **Framework:** Next.js 15, React 19
- **Base de Datos:** MongoDB
- **Animaciones:** Framer Motion
- **Internacionalización:** next-intl
- **Formularios:** react-hook-form
- **Correos Electrónicos:** Resend, React Email
- **Estilos:** SCSS, Metodología BEM

## Estructura del Proyecto

```text
auralis-app/
├── messages/           # Archivos JSON de localización i18n (en, es, etc.)
├── public/             # Recursos estáticos (imágenes, fuentes, robots.txt)
├── react-email-starter/# Entorno de plantillas de React Email
├── src/
│   ├── app/[locale]/   # Páginas del App Router configuradas para soporte multilingüe
│   ├── components/     # Componentes React reutilizables (Button, Panel, Image, etc.)
│   ├── context/        # Proveedores de React Context (ej. LocaleContext)
│   ├── data/           # Datos mock locales o JSONs estáticos
│   ├── i18n/           # Enrutamiento i18n y configuraciones de Next-Intl
│   ├── icons/          # Íconos SVG
│   ├── lib/            # Lógica del servidor, conexiones a DB y wrappers de API
│   ├── styles/         # Archivos SCSS globales y design tokens
│   ├── types/          # Definiciones de TypeScript
│   └── utils/          # Funciones de utilidad (ej. useBEM, useIsMobile)
├── plopfile.js         # Configuración para herramientas de generación de código
└── next.config.ts      # Configuración de Next.js
```

## Primeros Pasos

1. **Clona el repositorio e instala las dependencias:**

```bash
npm install
```

2. **Variables de Entorno:**
   Copia el archivo `.env.example` y renómbralo a `.env` en la raíz del proyecto. Deberás rellenar claves obligatorias como la URI de conexión a MongoDB (`MONGODB_URI`) y la API Key de Resend.

3. **Base de Datos Inicial:**
   Configura o levanta tu instancia de MongoDB antes de iniciar.

   > **[MEJORA PENDIENTE]** Este proyecto carece de scripts (`seed`) o volcado de base de datos base para desarrollo local.

4. **Inicia el servidor de desarrollo:**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la aplicación.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Construye la aplicación optimizada para producción.
- `npm run start` - Inicia el servidor de producción con la versión compilada.
- `npm run lint` - Ejecuta de reglas y análisis de ESLint.
- `npm run generate` - Ejecuta la CLI de Plop. Ideal para integrar un nuevo componente que requiera SCSS BEM, tipos e integraciones automáticas.
  > **[MEJORA PENDIENTE]** Hace falta ampliar la documentación de los generadores Plop disponibles en el proyecto, para mantener mejor el estándar.

### Guía de Estilos y Mejores Prácticas

Como este repositorio usa convenciones propias para la UI de alta fidelidad, te sugerimos seguir las siguientes pautas:

#### **Uso avanzado de la metodología BEM (uso del hook `useBEM`)**

Este proyecto utiliza un helper personalizado para estandarizar las clases CSS basándose en la convención BEM (Block, Element, Modifier). Para utilizarlo en cualquier componente nuevo:

```tsx
import { useBEM } from "@/utils/component/useBEM";

export default function MiComponente() {
  const b = useBEM("mi-bloque"); // Retorna función b() vinculada al bloque "mi-bloque"

  return (
    // Genera clase: className="mi-bloque"
    <div className={b()}>

      // Con un Elemento -> className="mi-bloque__titulo"
      <h1 className={b("titulo")}>Hola Mundo</h1>

      // Con Elemento y Modificadores -> className="mi-bloque__boton mi-bloque__boton--activo mi-bloque__boton--grande"
      <button className={b("boton", ["activo", "grande"])}>
        Click
      </button>

      // Modificadores condicionales
      <div className={b("panel", isActive ? "abierto" : "cerrado")} />
    </div>
  )
}
```

Usar `useBEM` asegura nombres de clases unificados, compatibilidad directa con los archivos `.scss` modulares o globales del proyecto, y una forma muy limpia de asignar variantes condicionales sin necesidad de abusar de plantillas de strings.

---
