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
5. No crear rutas de inmuebles hasta ejecutar y validar la SPEC de Sanity.
6. Mantener la configuración de despliegue en Vercel sincronizada con los cambios reales del proyecto.

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
- `tokens.css` concentra fuentes, `:root`, variables de marca, tokens de layout, estilos base de etiquetas nativas (`html`, `body`, `a`, `button`, `img`, `h1`, `h2`, `h3`, `p`) y estilos compartidos de header/footer.
- Los CSS de página no deben redefinir `:root`, estilos base globales, header ni footer; solo deben contener layout, secciones y componentes propios de la página.
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

Sanity será la fuente de contenido para crear y publicar inmuebles de forma controlada en Astro. La implementación debe hacerse con SPEC propia antes de instalar dependencias, definir schemas, crear rutas o conectar datos.

Contenido previsto:

- listado de inmuebles
- detalle de inmueble
- galería de máximo 10 fotos con integración Cloudinary
- estado de disponibilidad
- datos comerciales confirmados
- precio visible y obligatorio
- operación venta/arriendo
- ubicación del inmueble con mapa de Google Maps
- video de YouTube Short
- zonas aledañas

### Plan de ejecución Sanity + Astro

1. Levantamiento del modelo de datos:
   - Definir los campos obligatorios alineados con `web-mockup/detalle-inmueble.html`: título, descripción, fotos, tipo de operación, valor, características, ubicación, video, zonas aledañas y estado editorial.
   - Separar datos públicos de datos internos, propietarios, documentos y datos sensibles.
   - Definir estados editoriales: borrador, en validación, publicado, reservado, vendido, arrendado e inactivo.
   - Excluir de listado, detalle indexable y sitemap los estados reservado, vendido, arrendado e inactivo.
   - Mantener precio siempre visible y obligatorio: valor en venta para inmuebles en venta o valor en arriendo para inmuebles en arriendo.
   - Definir la estructura flexible de características para que cada inmueble pueda tener las que apliquen sin forzar campos irrelevantes.

2. Diseño de schemas en Sanity:
   - Crear schema principal `property` para inmuebles.
   - Crear schemas auxiliares solo si aportan mantenimiento real: ciudad, sector, tipo de inmueble, operación, amenidades o asesor.
   - Definir slug único generado desde el título SEO para publicar en `/inmuebles/[titulo-seo-generado]/`.
   - Definir título, título SEO, descripción, operación `Arriendo` o `Venta`, valor de venta, valor de arriendo, tipo de inmueble, características variables, galería, ubicación, mapa, video, zonas aledañas, destacados SEO y estado editorial.
   - Limitar la galería a máximo 10 fotos y validar que exista al menos una foto principal.
   - Validar que solo se diligencie el valor correspondiente a la operación seleccionada.
   - Evitar almacenar documentos legales, datos personales o información sensible en campos públicos.

3. Estrategia de imágenes y video:
   - Integrar Cloudinary para la gestión y optimización de fotos desde Sanity Studio.
   - Permitir seleccionar assets ya subidos en Cloudinary y subir nuevas fotos desde Studio cuando sea necesario.
   - Definir imagen principal obligatoria y galería ordenable.
   - Validar `alt`, dimensiones, peso, formatos, orden visual y máximo de 10 fotos.
   - Guardar en Sanity las referencias necesarias de Cloudinary sin duplicar assets pesados en el repositorio.
   - Aceptar video como URL de YouTube Short y normalizarlo en Astro para embeberlo de forma segura.

4. Conexión Astro:
   - Instalar dependencias oficiales de Sanity solo después de aprobar la SPEC.
   - Usar dataset público para lectura de inmuebles publicados, porque el sitio es estático y solo consumirá contenido público validado.
   - No requerir token de lectura para el build público; reservar tokens únicamente para previews, borradores, automatizaciones internas o endpoints privados.
   - Configurar variables de entorno para `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION` y Cloudinary.
   - Crear cliente Sanity aislado en una utilidad reusable.
   - Mantener el sitio como estático salvo que una necesidad real obligue a otro modo de rendering.
   - Consultar únicamente inmuebles con estado `publicado` para las rutas indexables.

5. Rutas de inmuebles:
   - Crear `/inmuebles/` como listado público.
   - Crear `/inmuebles/[slug]/` como detalle de inmueble.
   - Generar páginas solo para inmuebles publicados con precio, operación, título SEO, descripción, ubicación y foto principal completos.
   - Mantener la URL final como `dominio.com/inmuebles/titulo-seo-generado/`.
   - Manejar estados vacíos, inmuebles inactivos y slugs inexistentes sin romper SEO ni navegación.
   - Mantener reservado, vendido y arrendado por fuera del listado público, detalle indexable y sitemap.

6. Automatización de creación:
   - Crear inmuebles desde Sanity Studio como flujo principal.
   - Definir validaciones editoriales en Studio para bloquear publicación si faltan campos obligatorios o si hay más de 10 fotos.
   - Usar títulos SEO para generar slugs únicos y estables.
   - Evitar duplicados con código interno o slug controlado.
   - Plan B si Sanity Studio falla: mantener `src/data/properties.ts` como archivo fuente controlado, con el mismo contrato del schema para permitir build estático temporal sin cambiar las rutas públicas.
   - Plan B para imágenes si Cloudinary falla: usar URLs ya publicadas y validadas como fallback temporal, sin subir fotos pesadas al repositorio.
   - Registrar errores de creación o build sin exponer datos sensibles.

7. SEO / GEO / AEO:
   - Generar `title`, `description`, Open Graph, canonical y JSON-LD por inmueble.
   - Usar el título SEO como base del slug y de la metadata, sin cambiar URLs ya publicadas salvo decisión explícita.
   - Mantener contenido verificable, claro y escaneable.
   - Evitar thin content en inmuebles con información incompleta.
   - No indexar inmuebles reservados, vendidos, arrendados o inactivos.
   - Incluir datos estructurados coherentes con el tipo de inmueble, operación, ubicación pública, precio y disponibilidad.

8. Validación:
   - Ejecutar `npm run build`.
   - Probar listado y detalle en navegador.
   - Validar desktop, tablet y móvil.
   - Confirmar que no hay errores de consola ni overflow horizontal.
   - Validar estados: sin inmuebles, inmueble publicado, inmueble reservado, vendido, arrendado, inactivo, galería incompleta, más de 10 fotos y precio faltante.
   - Validar iframe/embed URL simple de Google Maps.
   - Validar URLs de YouTube Short y Cloudinary.
   - Confirmar que no se envían formularios sin autorización.

9. Despliegue:
   - Configurar variables de entorno en Vercel, no en el repositorio.
   - Validar build local antes de desplegar.
   - Validar preview deployment antes de producción.
   - Confirmar que los webhooks de Sanity hacia Vercel solo reconstruyen cuando cambia contenido público relevante.
   - Confirmar que las variables de Sanity, Cloudinary y Google Maps estén configuradas en Vercel antes del primer despliegue con inmuebles.

10. Rollback:
   - Revertir dependencias, cliente Sanity, schemas, rutas `/inmuebles/` y `/inmuebles/[slug]/`.
   - Desactivar variables o webhooks en Vercel si generan builds fallidos.
   - Activar el plan B estático desde `src/data/properties.ts` si Sanity Studio no está disponible y se necesita publicar un inmueble urgente.
   - Mantener WhatsApp como fallback temporal para CTAs de inmuebles.

## Vercel

Vercel ya quedó configurado como plataforma de despliegue del sitio Astro.

Configuración documentada:

- Framework: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Rendering actual: sitio estático con `output: "static"` en `astro.config.mjs`.
- Dominio canónico configurado en Astro: `https://www.amarufs.co/`.
- Las variables de entorno deben gestionarse desde Vercel y no deben guardarse en el repositorio.

Cuando se implemente Sanity, Vercel deberá recibir las variables necesarias del proyecto y, si aplica, un webhook de reconstrucción para publicar cambios de inmuebles validados.

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
- Sanity aún no está implementado en Astro; requiere SPEC, schemas, variables y validación antes de crear rutas.
- Vercel ya está configurado para despliegue, pero la integración futura con Sanity debe validar variables, previews y webhooks antes de producción.

## Rollback

Para revertir esta etapa, restaurar o eliminar los archivos creados dentro de `web-astro`. La carpeta `web-mockup` queda como fuente de referencia y no debe eliminarse durante esta migración.
