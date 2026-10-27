# Amaru FS Inmobiliaria - Web Astro

## Descripción

Sitio Astro de Amaru FS Inmobiliaria, migrado desde `../web-mockup` hacia una arquitectura modular, estática y lista para desplegar en Vercel.

El sitio conserva las rutas comerciales principales, el diseño base del mockup, las páginas de inmuebles, la ficha de detalle, la iconografía con Font Awesome, las fuentes locales y las interacciones de menú móvil, FAQ, filtros y detalle de inmueble.

## Estado Actual

Sanity fue retirado del proyecto. El gestor elegido para inmuebles es Strapi local en `../property-cms`, conectado a Cloudinary para la galería de fotos.

El sitio Astro no depende de Strapi en producción. El flujo correcto es:

1. Crear o editar inmuebles en Strapi local.
2. Gestionar fotos en la Media Library de Strapi usando Cloudinary.
3. Exportar inmuebles desde Strapi hacia `src/data/properties.ts`.
4. Ejecutar `npm run build`.
5. Desplegar el sitio estático en Vercel.

Páginas activas:

- Inicio: `/`
- Propietarios: `/propietarios/`
- Propietarios venta: `/propietarios/venta/`
- Propietarios arriendo: `/propietarios/arriendo/`
- Arrendatarios: `/arrendatarios/`
- Referidos: `/referidos/`
- Inmuebles: `/inmuebles/`
- Detalle de inmueble: `/inmuebles/[slug]/`

Las rutas de inmuebles solo muestran registros con estado `publicado` y campos obligatorios completos. Los estados `reservado`, `vendido`, `arrendado` e `inactivo` quedan por fuera del listado público y del detalle indexable.

## Stack Tecnológico

- Astro 7.4.2.
- Sitio estático con `output: "static"`.
- React integrado mediante `@astrojs/react` 7.1.1.
- npm con `package-lock.json`.
- CSS propio por página.
- JavaScript propio para menú móvil, FAQ, filtros y detalles de inmueble.
- Font Awesome 6.5.2 por CDN.
- Fuentes locales en `public/fonts`.
- Imágenes locales base en `public/images`.
- Strapi 5 local como gestor de inmuebles.
- Cloudinary como proveedor de media library en Strapi.
- Exportación Strapi -> Astro mediante script local.

## Requisitos

- Node.js 22.12.0 o superior.
- npm.
- Strapi local en `../property-cms`.
- Cuenta Cloudinary con cloud name, API key y API secret.

## Instalación

Sitio Astro:

```bash
cd web-astro
npm install
```

Gestor Strapi:

```bash
cd ../property-cms
npm install
```

## Variables de Entorno

Astro usa variables locales solo para exportar inmuebles desde Strapi:

```bash
STRAPI_URL=http://127.0.0.1:1337
STRAPI_API_TOKEN=
```

Strapi usa variables locales para Cloudinary:

```bash
CLOUDINARY_NAME=domose0dj
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_FOLDER=amarufs/inmuebles
```

No guardar secretos en Git. `property-cms/.env` y `web-astro/.env.local` deben permanecer locales.

## Scripts Disponibles

```bash
npm run dev
npm run build
npm run preview
npm run properties:pull
```

`npm run properties:pull` consulta `../property-cms` en local y genera `src/data/properties.ts` con los inmuebles de Strapi.

## Flujo de Desarrollo

1. Levantar Strapi:
   ```bash
   cd property-cms
   npm run develop
   ```
2. Crear o editar inmuebles en `http://127.0.0.1:1337/admin`.
3. Subir o seleccionar fotos desde la Media Library de Strapi, respaldada por Cloudinary.
4. En `web-astro`, exportar inmuebles:
   ```bash
   npm run properties:pull
   ```
5. Validar Astro:
   ```bash
   npm run build
   npm run dev
   ```
6. Revisar `/inmuebles/` y `/inmuebles/[slug]/`.
7. Desplegar en Vercel.

## Estructura Principal

```text
amarufs/
  property-cms/
    config/
    src/api/inmueble/
  web-astro/
    public/
    src/
      components/
      data/
        properties.ts
      lib/
      layouts/
      pages/
        inmuebles/
      scripts/
      styles/
    scripts/
      pull-strapi-properties.mjs
```

## Modelo de Inmueble en Strapi

Content Type: `Inmueble`.

Campos:

- `titulo`: título público.
- `slug`: UID generado desde `titulo`.
- `metaDescripcion`: descripción SEO. Reemplaza el resumen corto.
- `estadoEditorial`: `borrador`, `en-validacion`, `publicado`, `reservado`, `vendido`, `arrendado`, `inactivo`.
- `operacion`: `arriendo` o `venta`.
- `tipoInmueble`: lista cerrada inicial: `apartamento`, `casa`, `garaje`, `lote`.
- `valorVenta`: valor de venta, solo números, sin signo pesos ni puntos.
- `valorArriendo`: valor del canon, solo números, sin signo pesos ni puntos.
- `administracionIncluida`: indica si el canon de arriendo ya incluye administración.
- `valorAdministracion`: valor de administración, solo si no está incluida.
- `valorTotalArriendo`: total calculado para publicar en arriendo.
- `ubicacion`: ciudad o municipio principal.
- `barrio`: barrio o sector comercial opcional. Si existe, Astro lo muestra junto a la ubicación.
- `mapaGoogle`: iframe completo de Google Maps.
- `videoYoutubeShort`: URL de YouTube Short.
- `imagenNotaTransparencia`: imagen opcional para acompañar la nota de transparencia en el detalle.
- `descripcion`: descripción del inmueble.
- `caracteristicas`: JSON con características variables.
- `zonasAledanas`: JSON con zonas aledañas.
- `codigoInterno`: código interno.
- `fotos`: galería de imágenes desde Cloudinary, máximo 10 fotos.

## Reglas Editoriales

- Solo `estadoEditorial: "publicado"` aparece públicamente.
- Para `operacion: "venta"` debe existir `valorVenta`.
- Para `operacion: "arriendo"` debe existir `valorArriendo`.
- Si `administracionIncluida` es `false`, debe existir `valorAdministracion`.
- `valorTotalArriendo` se calcula como `valorArriendo + valorAdministracion`, o solo `valorArriendo` si la administración está incluida.
- El precio siempre debe ser visible.
- Un inmueble publicado debe tener al menos una foto.
- La galería no debe superar 10 fotos.
- `caracteristicas` debe ser una lista.
- `zonasAledanas` debe ser una lista.
- El slug debe ser único.
- El video, si existe, debe ser de YouTube Short o `youtu.be`.

## Formato de Características

En Strapi, `caracteristicas` se edita como JSON:

```json
[
  { "label": "Alcobas", "value": "2", "icon": "bed" },
  { "label": "Baños", "value": "1", "icon": "bath" },
  { "label": "Sala / comedor", "value": "1", "icon": "sofa" },
  { "label": "Área", "value": "48 m²", "icon": "area" }
]
```

El exportador convierte ese formato a etiquetas visibles como `2 Alcobas` y clases Font Awesome para Astro.

## Formato de Zonas Aledañas

En Strapi, `zonasAledanas` se edita como JSON:

```json
[
  "Zona comercial",
  "Parque",
  "Autopista Norte",
  "Centro Comercial Bima"
]
```

## Cloudinary

Cloudinary queda conectado como provider del Upload plugin de Strapi.

Archivos configurados:

- `property-cms/config/plugins.ts`
- `property-cms/config/middlewares.ts`
- `property-cms/.env.example`

Strapi sube y lee imágenes desde Cloudinary. Astro solo recibe las URLs finales exportadas en `src/data/properties.ts`.

Esto evita subir fotos pesadas al repositorio y mantiene Vercel como sitio estático.

Para validar credenciales en el CMS local:

```bash
cd ../property-cms
npm run cloudinary:check
```

Las fotos nuevas deben cargarse desde la Media Library de Strapi para que queden registradas en Strapi y almacenadas en Cloudinary. Los assets que ya existían en Cloudinary requieren importación o recarga desde Strapi antes de poder seleccionarse en el campo `fotos`.

Para importar referencias existentes de Cloudinary a Strapi:

```bash
cd ../property-cms
npm run cloudinary:list
npm run cloudinary:import:all
```

Si el exportador de Astro responde `403 Forbidden`, habilitar lectura pública de `Inmueble` en Strapi local:

```bash
cd ../property-cms
npm run inmuebles:public-read
```

## Vercel

Vercel está configurado como plataforma de despliegue del sitio Astro.

Configuración:

- Framework: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Rendering: sitio estático.
- Dominio canónico en Astro: `https://www.amarufs.co/`.

Vercel no necesita conectarse a Strapi si los inmuebles se exportan antes del deploy. Si más adelante se quiere que Vercel consulte Strapi durante build, Strapi deberá estar publicado o accesible desde Vercel.

## SEO / GEO / AEO

Archivos y rutas de descubrimiento:

- `src/pages/sitemap.xml.ts`: genera `/sitemap.xml` con URLs públicas, canónicas e indexables.
- `public/robots.txt`: permite rastreo general y declara el sitemap y archivos LLM.
- `public/llms.txt`: guía principal para modelos de lenguaje y buscadores con IA.
- `public/llm.txt`: alias de compatibilidad para agentes que consulten la variante singular.

`/referidos/` se mantiene fuera del sitemap porque no debe tratarse como ruta indexable comercial principal.

Cada inmueble debe conservar:

- `titulo`
- `descripcion`
- `metaDescripcion`
- canonical
- Open Graph
- JSON-LD cuando aplique
- precio visible
- operación visible
- ubicación pública
- contenido escaneable

Los inmuebles incompletos no deben publicarse ni indexarse.

### SEO técnico de página completa

Cada página pública debe validar:

- Un H1 único, claro y coherente con la intención de búsqueda.
- `title` y `description` únicos, escritos en Español Colombia.
- Canonical absoluto basado en `https://www.amarufs.co/`.
- Open Graph y Twitter Card cuando aplique.
- Jerarquía semántica H1-H2-H3 sin saltos incoherentes.
- Contenido útil, verificable y suficiente para propietarios, arrendatarios o compradores.
- Enlaces internos hacia rutas comerciales relevantes.
- Exclusión de rutas no indexables o experimentales del sitemap.
- Ausencia de contenido duplicado, thin content o promesas comerciales no verificables.

### GEO y AEO

Para buscadores con IA y respuestas directas:

- Mantener entidades claras: Amaru FS Inmobiliaria, Colombia, Bogotá, Sabana, propietarios, arrendatarios e inmuebles.
- Usar bloques de contenido escaneables que respondan preguntas frecuentes reales.
- Mantener `llms.txt` como índice principal para modelos de lenguaje.
- Mantener `llm.txt` como alias de compatibilidad.
- Evitar textos ambiguos, claims sin evidencia o información que dependa de disponibilidad no confirmada.
- Confirmar que datos de contacto, zonas, servicios y condiciones estén alineados con el contenido visible.

## Seguridad

Principios obligatorios para todo el sitio:

- No guardar secretos en Git.
- No exponer tokens, API keys, credenciales de Strapi, Cloudinary, Vercel o proveedores externos en frontend.
- Mantener `.env`, `.env.*`, dumps, backups y llaves privadas fuera del repositorio.
- Tratar datos de Strapi, JSON, formularios, query params, iframes, imágenes y servicios externos como datos no confiables.
- Sanitizar o validar datos antes de exportarlos o renderizarlos.
- Evitar `innerHTML` y cualquier inyección de HTML no controlada.
- Usar `rel="noopener noreferrer"` en enlaces externos con `target="_blank"`.
- Revisar iframes de Google Maps o videos para evitar HTML libre o proveedores inesperados.
- No enviar formularios, WhatsApp, CRM, correos ni integraciones reales sin autorización explícita.
- Usar datos simulados durante QA de formularios, filtros o búsquedas.

## Buenas Prácticas de Desarrollo

- Trabajar primero sobre archivos fuente, nunca sobre `dist/`.
- Mantener cambios pequeños, reversibles y alineados con la arquitectura existente.
- Reutilizar componentes, utilidades y estilos actuales antes de crear nuevos patrones.
- Mantener HTML semántico, accesibilidad y responsive desde el inicio.
- Validar existencia de nodos antes de ejecutar JavaScript.
- Evitar listeners globales innecesarios o inicializaciones duplicadas.
- Mantener imágenes con `alt`, dimensiones razonables y carga diferida cuando aplique.
- No agregar dependencias, CDNs o scripts de terceros sin justificar seguridad, performance y SEO.
- Mantener copy en Español Colombia, con tono profesional, claro y comercialmente responsable.

## Auditorías

Auditoría recomendada para cambios de página completa, SEO, seguridad, performance o despliegue:

- Técnica: `npm run build`, rutas generadas, assets públicos, errores 404 y enlaces internos.
- SEO: title, description, canonical, robots, sitemap, JSON-LD, H1, contenido duplicado y rutas no indexables.
- GEO/AEO: `llms.txt`, `llm.txt`, entidades, FAQs, respuestas escaneables y claridad de contexto.
- Seguridad: secretos, variables, enlaces externos, iframes, formularios, dependencias y exposición de datos.
- Accesibilidad: landmarks, foco, teclado, contraste, labels, `alt` y jerarquía de encabezados.
- Responsive: mobile, tablet y desktop sin overflow horizontal.
- Performance: peso de imágenes, JS no crítico, CLS, LCP, INP y recursos externos.
- Contenido: ortografía, gramática, tono, precisión, disponibilidad y ausencia de promesas no verificadas.

Si una auditoría no incluye Lighthouse, Search Console, CrUX, producción, DataForSEO o herramientas externas, reportar esa limitación explícitamente.

## Validación Esperada

Antes de cerrar cualquier cambio:

- ejecutar `npm run build`
- confirmar que `dist/sitemap.xml`, `dist/robots.txt`, `dist/llms.txt` y `dist/llm.txt` se generan cuando el cambio toca SEO/GEO
- revisar navegador local
- validar desktop, tablet y móvil
- confirmar que no hay errores de consola
- confirmar que no hay overflow horizontal
- confirmar que el menú móvil abre y cierra
- confirmar que las FAQs funcionan
- confirmar que `/inmuebles/` carga inmuebles publicados o estado vacío
- confirmar que `/inmuebles/[slug]/` carga la ficha correcta
- confirmar que `npm run properties:pull` genera datos válidos cuando Strapi está activo
- buscar `console.log`, `debugger`, `TODO` y `FIXME`
- confirmar que no se editó `dist/` manualmente

## DDoD y DoD

Definition of Done documental:

- SPEC proporcional definida.
- Alcance y exclusiones claros.
- Riesgos identificados.
- Acceptance Criteria verificables.
- README actualizado cuando el cambio afecta operación, arquitectura, build, SEO, seguridad o QA.
- Rollback documentado.

Definition of Done técnico:

- Build completado con `npm run build`.
- Página o ruta afectada revisada en navegador local cuando aplica.
- Sin errores de consola relevantes.
- Sin overflow horizontal en vistas principales cuando aplica.
- SEO/GEO/AEO no degradado.
- Accesibilidad básica no degradada.
- Seguridad no degradada.
- Performance no degradada de forma evidente.
- No quedan logs, debugging, secretos, mocks accidentales ni código muerto.
- No hay edición manual de archivos generados.

## Gobernanza para Agentes

`AGENTS.md` define las reglas locales para asistentes de desarrollo y sistemas automatizados que trabajen dentro de `web-astro`.

Resumen operativo:

- trabajar con SPEC proporcional al cambio
- modificar archivos fuente, no artefactos generados
- mantener Español Colombia (`es-CO`) y UTF-8
- no enviar formularios sin autorización explícita
- usar datos simulados en pruebas de formularios, filtros y búsquedas
- actualizar este `README.md` cuando cambien arquitectura, comandos, dependencias, build, despliegue o reglas operativas

## Riesgos Conocidos

- Strapi local no estará disponible para Vercel salvo que se publique.
- Si se editan inmuebles en Strapi, hay que ejecutar `npm run properties:pull` antes de `npm run build`.
- Cloudinary requiere API key y API secret en `property-cms/.env`.
- Las credenciales no deben subirse al repositorio.

## Rollback

Para revertir datos de inmuebles, restaurar `src/data/properties.ts` desde Git.

Para retirar Strapi en el futuro, eliminar `../property-cms`, quitar `npm run properties:pull` y volver a editar `src/data/properties.ts` manualmente.
