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

- Astro.
- Sitio estático con `output: "static"`.
- React integrado mediante `@astrojs/react`.
- CSS propio por página.
- JavaScript propio para menú móvil, FAQ, filtros y detalles de inmueble.
- Font Awesome 6.5.2 por CDN.
- Fuentes locales en `public/fonts`.
- Imágenes locales base en `public/images`.
- Strapi 5 local como gestor de inmuebles.
- Cloudinary como proveedor de media library en Strapi.
- Exportación Strapi -> Astro mediante script local.

## Requisitos

- Node.js.
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
- confirmar que `npm run properties:pull` genera datos válidos cuando Strapi está activo
- buscar `console.log`, `debugger`, `TODO` y `FIXME`

## Riesgos Conocidos

- Strapi local no estará disponible para Vercel salvo que se publique.
- Si se editan inmuebles en Strapi, hay que ejecutar `npm run properties:pull` antes de `npm run build`.
- Cloudinary requiere API key y API secret en `property-cms/.env`.
- Las credenciales no deben subirse al repositorio.

## Rollback

Para revertir datos de inmuebles, restaurar `src/data/properties.ts` desde Git.

Para retirar Strapi en el futuro, eliminar `../property-cms`, quitar `npm run properties:pull` y volver a editar `src/data/properties.ts` manualmente.
