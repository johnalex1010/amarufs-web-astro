# Amaru FS Inmobiliaria - Web Astro

## Descripción

Sitio Astro para migrar de forma progresiva el mockup estático de `../web-mockup` a una arquitectura modular, mantenible y preparada para crecer. Esta primera etapa migra las páginas institucionales y comerciales principales de Amaru FS Inmobiliaria, conservando el contenido aprobado, la marca visual, las rutas principales, la iconografía con Font Awesome y las interacciones sutiles existentes.

## Estado actual

Migración inicial desde `web-mockup` hacia Astro.

Páginas migradas:

- Inicio: `/`
- Propietarios: `/propietarios/`
- Propietarios venta: `/propietarios/venta/`
- Propietarios arriendo: `/propietarios/arriendo/`
- Arrendatarios: `/arrendatarios/`
- Referidos: `/referidos/`

Páginas excluidas por decisión del proceso:

- `inmuebles.html`
- `detalle-inmueble.html`

Estas páginas no se migran todavía. Su implementación futura debe hacerse con Sanity cuando se autorice explícitamente.

## Stack tecnológico

- Astro.
- HTML semántico renderizado como sitio estático.
- CSS propio por página, migrado desde los archivos fuente de `web-mockup/style`.
- JavaScript propio para menú móvil, FAQ y animaciones de entrada.
- Font Awesome 6.5.2 por CDN.
- Fuentes locales en `public/fonts`.
- Imágenes reales de marca y apoyo en `public/images`.

## Requisitos

- Node.js.
- npm.

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
```

## Flujo de desarrollo

1. Trabajar únicamente sobre `src`, `public`, `README.md`, `.gitignore` y configuración real del proyecto.
2. Mantener el contenido en español Colombia.
3. Usar UTF-8.
4. No modificar archivos generados en `dist` ni `.astro`.
5. No crear rutas de inmuebles hasta que se apruebe la fase Sanity.
6. No configurar Vercel hasta que se apruebe la fase de despliegue.

## Estructura principal

```text
web-astro/
  public/
    fonts/
    images/
  src/
    components/
      global/
    data/
    layouts/
    pages/
    scripts/
    styles/
      pages/
```

## Convenciones

- Idioma: español Colombia.
- Encoding: UTF-8.
- Legibilidad primero: cada página debe escribirse como HTML/Astro estructurado, indentado y editable.
- No usar `set:html`, strings gigantes, JSON o arrays para renderizar contenido de página cuando el marcado puede escribirse directamente.
- Los arrays y objetos solo deben usarse para datos realmente reutilizables o dinámicos, no para esconder HTML estático.
- `tokens.css` concentra fuentes, `:root`, variables de marca, tokens de layout y estilos base de etiquetas nativas (`html`, `body`, `a`, `button`, `img`, `h1`, `h2`, `h3`, `p`).
- Los CSS de página no deben redefinir `:root` ni estilos base globales; solo deben contener layout, secciones y componentes propios de la página.
- Ancho de contenido: las secciones y bloques principales usan `--content-max-width: 1700px`.
- Header y footer conservan `--max-width: 1500px` para no estirar la navegación ni el cierre institucional.
- Colores de marca obligatorios:
  - `--color-primary: #1a3b89`
  - `--color-secondary: #00e1ad`
  - `--color-text: #183153`
  - `--color-bg: #f3f5f9`
  - `--color-btn: #1a3b89`
- Iconografía: Font Awesome.
- Animaciones: sutiles, con `IntersectionObserver` y respeto por `prefers-reduced-motion`.
- Formularios: no se envían sin autorización.
- CTAs principales: WhatsApp, sin capturar datos personales en el sitio.

## Sanity

Sanity se usará en una fase posterior para las páginas de inmuebles:

- listado de inmuebles
- detalle de inmueble
- galería
- estado de disponibilidad
- datos comerciales confirmados
- precio o estado por confirmar
- operación venta/arriendo
- ubicación pública segura

No existe configuración activa de Sanity en esta etapa. Cuando se autorice, se debe crear una SPEC propia antes de instalar dependencias, definir schemas o conectar datos.

## Vercel

Vercel será la plataforma de despliegue al final del proceso, cuando se autorice. En esta etapa no hay configuración de Vercel, adapter, variables de entorno ni despliegue activo.

## SEO / GEO / AEO

Cada página conserva:

- `title`
- `description`
- Open Graph básico
- jerarquía semántica
- contenido escaneable
- JSON-LD migrado desde el mockup
- FAQs visibles cuando aplica

## Validación esperada

Antes de cerrar cualquier cambio:

- ejecutar `npm run build`
- revisar en navegador local
- validar desktop, tablet y móvil
- confirmar que no hay errores de consola
- confirmar que no hay overflow horizontal
- confirmar que el menú móvil abre y cierra
- confirmar que las FAQs funcionan
- confirmar que no se crearon rutas de `inmuebles` ni `detalle-inmueble`
- buscar `console.log`, `debugger`, `TODO` y `FIXME`

## Riesgos conocidos

- Las páginas de inmuebles aún no existen en Astro por decisión de alcance.
- Los CTAs relacionados con inmuebles apuntan temporalmente a WhatsApp para evitar rutas rotas.
- Sanity y Vercel están documentados como fases futuras, no implementados.

## Rollback

Para revertir esta etapa, restaurar o eliminar los archivos creados dentro de `web-astro`. La carpeta `web-mockup` queda como fuente de referencia y no debe eliminarse durante esta migración.
