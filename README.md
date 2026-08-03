# Amaru FS Inmobiliaria - Web Astro

## Descripción

Sitio Astro de Amaru FS Inmobiliaria, migrado desde `../web-mockup` hacia una arquitectura modular, estática y lista para desplegar en Vercel.

El sitio conserva las rutas comerciales principales, el diseño base del mockup, las páginas de inmuebles, la ficha de detalle, la iconografía con Font Awesome, las fuentes locales y las interacciones de menú móvil y FAQ.

## Estado actual

Sanity fue retirado del proyecto. La fuente actual de inmuebles es local y vive en `src/data/properties.ts`.

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

## Stack tecnológico

- Astro.
- Sitio estático con `output: "static"`.
- React integrado mediante `@astrojs/react`.
- CSS propio por página.
- JavaScript propio para menú móvil, FAQ, filtros y detalles de inmueble.
- Font Awesome 6.5.2 por CDN.
- Fuentes locales en `public/fonts`.
- Imágenes locales en `public/images`.
- Datos de inmuebles en TypeScript local.

## Requisitos

- Node.js.
- npm.

## Instalación

```bash
npm install
```

## Variables de entorno

No hay variables obligatorias para compilar el sitio actual.

No guardar secretos en el repositorio. Si en una fase posterior se agrega un gestor externo o un webhook, las variables deben configurarse en Vercel y documentarse aquí.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
```

## Flujo de desarrollo

1. Trabajar únicamente sobre archivos fuente.
2. No modificar `dist`, `.astro` ni archivos generados.
3. Mantener contenido en español Colombia.
4. Mantener UTF-8.
5. Mantener el ancho global de `1700px` para páginas, header, footer, secciones y bloques principales.
6. Validar `npm run build` antes de desplegar.
7. No enviar formularios sin autorización.

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
      properties.ts
    lib/
      properties.ts
      property-utils.ts
    layouts/
    pages/
      inmuebles/
    scripts/
    styles/
      pages/
```

## Inmuebles Locales

La fuente actual de inmuebles es `src/data/properties.ts`.

Contrato principal:

- `title`
- `seoTitle`
- `slug`
- `editorialStatus`
- `operation`
- `propertyType`
- `saleValue` o `rentValue`
- `locationLabel`
- `googleMapsEmbed`
- `description`
- `summary`
- `gallery`
- `features`
- `nearbyZones`
- `youtubeShortUrl`
- `internalCode`
- `metaDescription`

Reglas obligatorias:

- El precio debe existir y ser mayor que cero.
- Para venta se usa `saleValue`; para arriendo se usa `rentValue`.
- La galería debe tener al menos una imagen.
- La galería no debe superar 10 fotos.
- El slug debe ser único y formar la URL `/inmuebles/slug/`.
- Solo `editorialStatus: "publicado"` aparece públicamente.
- `reservado`, `vendido`, `arrendado` e `inactivo` quedan fuera del listado y del detalle público.

## Plan Local Para Crear Inmuebles

Objetivo: crear un pequeño gestor local para cargar inmuebles sin depender de Sanity, generar datos compatibles con Astro y publicar después en Vercel.

### Opción Recomendada: Gestor Local Ligero

Crear una herramienta local dentro del proyecto para administrar inmuebles y exportarlos a `src/data/properties.ts` o a archivos JSON versionables.

Propuesta:

- Carpeta: `tools/property-manager/`.
- Interfaz local: formulario web sencillo.
- Persistencia: JSON local en `src/data/properties.local.json`.
- Exportación: script que genera `src/data/properties.ts`.
- Imágenes: seleccionar URLs de Cloudinary ya subidas o rutas locales en `public/images`.
- Validaciones: campos obligatorios, precio visible, máximo 10 fotos, slug único, estado editorial.
- Build: `npm run build` genera las páginas estáticas para subir a Vercel.

Ventajas:

- No requiere servidor externo.
- No requiere login ni CORS.
- No depende de servicios de terceros para editar.
- Fácil de versionar con Git.
- Compatible con Vercel como sitio estático.

Riesgos:

- No es multiusuario.
- Si se edita desde otro equipo, hay que mover el JSON o usar Git.
- No tiene media library real; Cloudinary seguiría siendo externo solo para almacenar imágenes.

### Opción Strapi Local

Sí, con Strapi se puede crear un gestor de inmuebles local.

Strapi permitiría:

- Crear un Content Type `Inmueble`.
- Cargar campos obligatorios.
- Manejar estados editoriales.
- Subir imágenes localmente o configurar Cloudinary.
- Exponer API local.
- Generar páginas en Astro desde esa API durante el build.

Flujo posible:

1. Crear Strapi en una carpeta separada, por ejemplo `property-cms/`.
2. Crear el content type `inmueble`.
3. Cargar inmuebles desde el panel local de Strapi.
4. Exportar datos a JSON o consumir la API local en build.
5. Ejecutar `npm run build` en Astro.
6. Subir `web-astro` a Vercel.

Ventajas:

- Panel administrativo más completo.
- Validaciones visuales.
- Mejor si más adelante se quiere crecer a CMS real.
- Puede integrarse con Cloudinary.

Riesgos:

- Más pesado para algo local.
- Requiere correr Strapi y Astro.
- Requiere base de datos local, normalmente SQLite.
- Si Vercel necesita construir desde Strapi, Strapi tendría que estar disponible públicamente o se debe exportar JSON antes del deploy.

Conclusión: Strapi sirve, pero para este caso local y simple conviene más empezar con un gestor ligero que exporte datos estáticos. Strapi queda como segunda fase si el gestor local se queda corto.

### Opción Intermedia: JSON + Editor Visual

Crear un editor local que lea y escriba JSON, sin backend persistente.

- Un script `npm run properties:manager` abre una interfaz local.
- El formulario escribe un JSON.
- Otro script valida y genera TypeScript.
- Astro consume siempre datos ya generados.

Esta opción mantiene bajo el riesgo y evita montar un CMS completo.

## Plan de Ejecución Recomendado

1. Definir el contrato final del inmueble local usando `src/data/properties.ts` como base.
2. Crear `src/data/properties.local.json` como archivo editable.
3. Crear un validador de datos:
   - título obligatorio
   - título SEO obligatorio
   - slug obligatorio y único
   - estado editorial obligatorio
   - operación `arriendo` o `venta`
   - precio correspondiente obligatorio
   - descripción obligatoria
   - mapa de Google Maps obligatorio
   - máximo 10 fotos
   - al menos una foto
   - características variables
   - zonas aledañas como lista
   - YouTube Short opcional pero validado si existe
4. Crear un generador que convierta JSON a `src/data/properties.ts`.
5. Crear una interfaz local para capturar inmuebles.
6. Validar que `/inmuebles/` y `/inmuebles/[slug]/` sigan funcionando sin cambios visuales.
7. Ejecutar `npm run build`.
8. Desplegar en Vercel.

## Vercel

Vercel está configurado como plataforma de despliegue del sitio Astro.

Configuración:

- Framework: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Rendering: sitio estático.
- Dominio canónico en Astro: `https://www.amarufs.co/`.

Si el gestor local genera archivos antes del deploy, Vercel no necesita acceso al gestor. Solo necesita recibir el repositorio con `src/data/properties.ts` o los JSON ya generados.

## SEO / GEO / AEO

Cada página debe conservar:

- `title`
- `description`
- Open Graph básico
- canonical
- jerarquía semántica
- contenido escaneable
- JSON-LD cuando aplique
- FAQs visibles cuando aplique

Los inmuebles incompletos no deben publicarse ni indexarse.

## Validación Esperada

Antes de cerrar cualquier cambio:

- ejecutar `npm run build`
- revisar navegador local
- validar desktop, tablet y móvil
- confirmar que no hay errores de consola
- confirmar que no hay overflow horizontal
- confirmar que el menú móvil abre y cierra
- confirmar que las FAQs funcionan
- confirmar que `/inmuebles/` carga inmuebles publicados o estado vacío
- confirmar que `/inmuebles/[slug]/` carga la ficha correcta
- buscar `console.log`, `debugger`, `TODO` y `FIXME`

## Riesgos Conocidos

- La publicación de inmuebles depende de que `src/data/properties.ts` tenga registros completos.
- Si se usa un gestor local, hay que ejecutar el generador antes de hacer build.
- Si se usa Strapi solo local, Vercel no podrá consultar Strapi durante build salvo que los datos se exporten previamente.

## Rollback

Para revertir cambios de inmuebles locales, restaurar `src/data/properties.ts` desde Git.

Para volver a un CMS externo en el futuro, crear una SPEC nueva y documentar dependencias, variables, cliente de datos, estrategia de build y rollback.
