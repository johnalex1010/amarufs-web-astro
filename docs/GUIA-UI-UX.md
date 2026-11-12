# Guía UI/UX — Amaru FS Inmobiliaria (web-astro)

> **Documento normativo para agentes de IA y personas que editen el sitio.**
> Antes de crear o modificar cualquier componente, página o estilo en `web-astro`, leer este archivo completo.
> Complementa a [`AGENTS.md`](../AGENTS.md). Si hay conflicto, prevalecen seguridad, accesibilidad y `AGENTS.md`.

---

## 0. Reglas de oro (no negociables)

1. **Prohibido crear colores.** Solo se usan los valores listados en la sección 2. No inventar hex, rgb, hsl, gradientes con colores nuevos ni "tonos intermedios".
2. **Prohibido crear o agregar tipografías.** En la web solo existen **Bebas Neue** (títulos) y **Outfit** (texto). No usar Google Fonts, Poppins, Afacad Flux ni fuentes del sistema como estilo principal.
3. **Usar tokens, no valores sueltos.** En CSS nuevo se escribe `var(--color-primary)`, nunca `#1a3b89`. Si el valor no tiene token, se usa el valor canónico de la sección 2 y se registra en el plan de acción para tokenizarlo.
4. **Reutilizar antes de crear; lo que se repite es componente.** Antes de escribir un componente o clase, buscar en `src/styles/tokens.css`, `src/styles/utilities.css` y `src/components/`. Toda pieza que aparezca en 2+ páginas (cards, hero, FAQ, timeline, paginación, CTA de cierre…) se implementa como componente Astro reutilizable (ver §7.0). No duplicar `.btn`, `.hero`, `.faq-item`, `.section-pad` en CSS de página.
5. **Accesibilidad AA mínima (WCAG 2.2).** Contraste de texto ≥ 4.5:1 (≥ 3:1 en texto grande e íconos/bordes funcionales), foco visible, objetivos táctiles ≥ 44×44 px, navegación por teclado completa.
6. **Mobile first real.** Todo se valida en 375 px, 768 px y ≥ 1280 px sin scroll horizontal.
7. **Español Colombia (es-CO)**, tono profesional, cercano y verificable. Nunca prometer tiempos, aprobaciones o disponibilidad sin evidencia.

---

## 1. Principios de diseño de la marca

| Principio | Qué significa en la interfaz |
| --- | --- |
| **Confianza** | Fotos reales, datos verificables (precio, área, ubicación, estado), sin adornos engañosos. |
| **Claridad** | Una idea por bloque, un CTA principal por sección, textos cortos y escaneables. |
| **Cercanía** | WhatsApp como canal principal, lenguaje directo ("te acompañamos", "revisamos tu caso"). |
| **Consistencia** | Mismos componentes, espaciados y colores en todas las páginas. |
| **Rendimiento** | El sitio es estático: cada imagen, script o fuente extra debe justificarse. |

---

## 2. Color

### 2.1 Paleta oficial (tokens existentes en `src/styles/tokens.css`)

| Token | Valor | Rol | Uso permitido |
| --- | --- | --- | --- |
| `--color-primary` | `#1a3b89` | Azul marca | Botón principal, enlaces, títulos de sección, fondos de footer/paneles, íconos. |
| `--color-btn` | `#1a3b89` | Alias de primary para botones | Solo en `.btn--primary`. |
| `--color-secondary` | `#00e1ad` | Verde menta acento | Fondos de CTA sobre azul, íconos y detalles **sobre fondo oscuro**, subrayados decorativos, focus ring. |
| `--color-text` | `#183153` | Texto base | Párrafos y texto general. |
| `--color-ink` | `#101a2d` | Texto fuerte | Títulos H1–H3 sobre fondo claro, overlays oscuros. |
| `--color-muted` | `#5a6983` | Texto secundario | Metadatos, ayudas, migas de pan, captions. |
| `--color-bg` | `#f3f5f9` | Fondo de página | `body`, bandas alternas. |
| `--color-white` | `#ffffff` | Superficie | Cards, header, modales, texto sobre azul. |
| `--color-line` | `#d9e0ec` | Bordes | Bordes de cards, inputs, divisores. **Nunca como texto.** |
| `--color-warm` | `#f2b950` | Ámbar acento | Insignias/etiquetas destacadas **con texto `--color-ink`**. Nunca como color de texto. |

### 2.2 Valores de apoyo ya existentes (permitidos, pendientes de tokenizar)

Estos valores ya están en el CSS del sitio. Se pueden usar **solo** para el rol indicado. No usar otros.

| Valor | Rol canónico | Nombre de token sugerido |
| --- | --- | --- |
| `#143070` | Hover/activo de botón primario | `--color-primary-hover` |
| `#102c70` | Azul profundo (gradientes, paneles) | `--color-primary-strong` |
| `#244ba8` | Azul medio (detalles, gradientes) | `--color-primary-soft` |
| `#e8edf6` | Superficie azul tenue (hover de menú, placeholder de imagen) | `--color-surface-blue` |
| `#f7f9fd` | Superficie alterna (submenú móvil, filas) | `--color-surface-alt` |
| `#fbfcff` | Superficie casi blanca (cards secundarias) | `--color-surface-soft` |
| `#d8e2f1` | Borde azulado | `--color-line-strong` |
| `#10f0bf` | Hover del botón verde | `--color-secondary-hover` |
| `#0b2a25` | Texto sobre verde menta | `--color-on-secondary` |
| `#dff9f1` | Fondo de éxito/positivo | `--color-success-bg` |
| `#08785f` | Texto de éxito/positivo | `--color-success` |
| `#b42318` | Error/estado negativo | `--color-danger` |

**Valores a eliminar por consolidación** (se reemplazan por el canónico más cercano, sin crear nada nuevo):
`#eff5ff`, `#edf4ff`, `#edf2f9`, `#dce8ff` → `#e8edf6` · `#cfdbee` → `#d8e2f1` · `#f7fffd` → `#dff9f1` · `#c92525` → `#b42318` · `rgba(0, 212, 163, …)` → `rgba(0, 225, 173, …)`.

### 2.3 Transparencias permitidas

Solo se permiten transparencias **derivadas de la paleta**:

- Sombra/overlay: `rgba(16, 26, 45, α)` (de `--color-ink`).
- Azul: `rgba(26, 59, 137, α)` (de `--color-primary`).
- Verde: `rgba(0, 225, 173, α)` (de `--color-secondary`).
- Ámbar: `rgba(242, 185, 80, α)` (de `--color-warm`).
- Blanco: `rgba(255, 255, 255, α)` para texto/bordes sobre fondos azules.

Opacidades sugeridas: `0.06`, `0.1`, `0.18`, `0.24`, `0.42`, `0.78`, `0.86`. Evitar inventar opacidades nuevas.

### 2.4 Contraste verificado (WCAG 2.2)

| Combinación | Ratio | Veredicto |
| --- | --- | --- |
| `#1a3b89` sobre `#ffffff` | 10.34 | ✅ Texto de cualquier tamaño |
| `#1a3b89` sobre `#f3f5f9` | 9.47 | ✅ |
| `#183153` sobre `#ffffff` / `#f3f5f9` | 13.10 / 12.00 | ✅ |
| `#101a2d` sobre `#f3f5f9` | 15.93 | ✅ |
| `#5a6983` sobre `#ffffff` / `#f3f5f9` | 5.55 / 5.09 | ✅ Texto secundario |
| `#5a6983` sobre `#e8edf6` | 4.73 | ⚠️ Solo ≥ 14 px, evitar textos largos |
| `#ffffff` sobre `#1a3b89` / `#143070` | 10.34 / 12.45 | ✅ |
| `#1a3b89` sobre `#00e1ad` | 6.09 | ✅ CTA verde con texto azul |
| `#0b2a25` sobre `#00e1ad` | 9.02 | ✅ CTA verde con texto oscuro |
| `#00e1ad` sobre `#1a3b89` | 6.09 | ✅ Íconos/texto verde sobre azul |
| `#08785f` sobre `#dff9f1` | 4.91 | ✅ Mensaje de éxito |
| `#b42318` sobre `#ffffff` | 6.57 | ✅ Mensaje de error |
| `#101a2d` sobre `#f2b950` | 9.80 | ✅ Insignia ámbar |
| **`#ffffff` sobre `#00e1ad`** | **1.70** | ❌ **Prohibido** |
| **`#00e1ad` sobre `#ffffff`/claros** | **1.70** | ❌ **Prohibido** como texto o ícono informativo |
| **`#f2b950` sobre `#ffffff`** | **1.78** | ❌ **Prohibido** como texto |
| **`#d9e0ec` sobre `#ffffff`** | **1.33** | ❌ Solo decorativo (bordes), nunca texto |

**Regla práctica:** el verde menta y el ámbar son colores de **fondo o acento sobre azul/oscuro**. Sobre fondos claros, el color de texto/ícono siempre es azul (`--color-primary`), tinta (`--color-ink`) o texto (`--color-text`).

### 2.5 Proporción de uso (60-30-10)

- **60 %** neutros: `--color-bg`, `--color-white`.
- **30 %** azul marca: `--color-primary` y texto `--color-text`/`--color-ink`.
- **10 %** acento: `--color-secondary` (y `--color-warm` de forma puntual).

El color nunca es el único medio para comunicar información (estado, error, selección): acompañar con texto o ícono.

---

## 3. Tipografía

### 3.1 Familias permitidas

| Token | Familia | Archivo | Uso |
| --- | --- | --- | --- |
| `--font-title` | **Bebas Neue** 400 | `public/fonts/BebasNeue-Regular.woff` | H1, H2, H3, cifras grandes (precios destacados, pasos de timeline), títulos de footer. |
| `--font-body` | **Outfit** 400 | `public/fonts/Outfit-Regular.woff` | Todo el resto: párrafos, botones, menú, formularios, etiquetas. |

- Fallbacks oficiales: `Impact, sans-serif` y `Arial, sans-serif`. No cambiarlos.
- Escribir siempre `font-family: var(--font-title)` o `var(--font-body)`; no repetir el literal `"Bebas Neue", Impact, sans-serif`.
- **Poppins** y **Afacad Flux** (carpeta `Amaru FS Inmobiliaria/`) son tipografías de piezas impresas (tarjetas, hoja membretada). **No se usan en la web.**

### 3.2 Reglas de uso

- **Bebas Neue es solo para titulares.** Es una fuente condensada en mayúsculas: nunca para párrafos, botones, labels, menús ni textos de más de ~12 palabras. Tamaño mínimo: **22 px**. `line-height` entre `0.98` y `1.1`, `letter-spacing: 0`.
- **Outfit** para lectura: `line-height: 1.6` en párrafos, `1.2–1.35` en textos cortos (labels, botones, cards).
- Ancho de línea en párrafos: **60–75 caracteres** (`max-width` ≈ 680–760 px).
- Texto mínimo: **16 px** para párrafos; **14 px** para metadatos; **12–13 px** solo para insignias o microcopy no esencial.
- No usar MAYÚSCULAS sostenidas con Outfit salvo en `.eyebrow`.
- **Pesos:** hoy solo está cargado Outfit **400**. Los `font-weight: 700/800/900` actuales se ven con "negrita sintética" del navegador. Hasta que se carguen los pesos reales de Outfit (ver plan de acción), usar como máximo `700` y nunca `800/900`. No cargar otra familia para resolverlo.

### 3.3 Escala tipográfica canónica

Solo usar estos tamaños (derivados de los ya presentes en el sitio). Preferir `clamp()` en títulos.

| Nivel | Familia | Desktop | Móvil (≤ 760 px) | Valor recomendado |
| --- | --- | --- | --- | --- |
| H1 hero | Bebas Neue | 78 px | 42 px | `clamp(42px, 5vw, 78px)` |
| H2 sección | Bebas Neue | 62 px | 38 px | `clamp(38px, 4vw, 62px)` |
| H2 panel / card grande | Bebas Neue | 40 px | 34 px | `clamp(34px, 3vw, 40px)` |
| H3 | Bebas Neue | 34 px | 26 px | `clamp(26px, 2.4vw, 34px)` |
| H4 / título de card pequeña | Bebas Neue | 26 px | 22 px | `clamp(22px, 1.9vw, 26px)` |
| Lead (intro hero) | Outfit | 20 px | 18 px | `clamp(18px, 1.4vw, 20px)` |
| Cuerpo | Outfit | 16–18 px | 16 px | `16px` / `18px` |
| Botón / menú | Outfit | 15–16 px | 16 px | `16px` |
| Meta / caption | Outfit | 14 px | 14 px | `14px` |
| Insignia / eyebrow | Outfit | 13 px | 13 px | `13px` (`.eyebrow` en mayúscula) |

- Un único **H1 por página**. Jerarquía H1 → H2 → H3 sin saltos.
- No usar tamaños fuera de la tabla (17, 19, 21, 27, 31, 33, 39, 44, 46 px existentes se migran al nivel más cercano).

---

## 4. Espaciado, layout y retícula

### 4.1 Escala de espaciado (base 4/8)

Usar solo: `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 86` px.

| Uso | Valor |
| --- | --- |
| Separación ícono–texto | 8 px |
| Padding interno de chips/insignias | 6–8 px × 10–12 px |
| Gap entre elementos de una card | 12–16 px |
| Padding de card | 20–24 px (móvil 16–18 px) |
| Gap entre cards de una grilla | 24 px |
| Separación título de sección → contenido | 32 px |
| Padding vertical de sección (`.section-pad`) | 86 px desktop · 56 px móvil |
| Gap del layout principal (`--layout-gap`) | 32 px |

Los valores `7, 9, 13, 22, 26, 28, 30, 34, 42, 46, 52, 62` px que hoy existen se migran progresivamente al valor de la escala más cercano.

### 4.2 Contenedor

- Ancho máximo: `--content-max-width: 1500px`.
- Patrón obligatorio de contenedor: `width: min(var(--content-max-width), calc(100% - 48px)); margin: 0 auto;` (móvil: `calc(100% - 32px)`).
- Layout con barra lateral: `grid-template-columns: var(--layout-main) var(--layout-aside);` y se apila en una columna ≤ 1100 px.

### 4.3 Breakpoints oficiales

Solo estos cuatro (desktop-first, como el sitio actual):

| Nombre | Media query | Qué cambia |
| --- | --- | --- |
| `lg` | `@media (max-width: 1100px)` | Layouts de 2 columnas → 1; grillas de 3 → 2. |
| `md` | `@media (max-width: 900px)` | Grillas de 2 → 1 cuando el contenido lo pida. |
| `sm` | `@media (max-width: 760px)` | Menú hamburguesa, header fijo, tipografía móvil, padding 16–18 px. |
| `xs` | `@media (max-width: 520px)` | Ajustes finos (footer en una columna, botones a ancho completo). |

No crear breakpoints nuevos (`1180px`, `1020px` existentes deben migrar a `1100px`).

### 4.4 Radios, bordes y sombras

| Token / valor | Uso |
| --- | --- |
| `--radius` (8 px) | Cards, paneles, inputs, botones, imágenes, modales. **Valor por defecto.** |
| `6px` (= `calc(var(--radius) - 2px)`) | Elementos anidados dentro de una card (imagen dentro de card, ítems de submenú). |
| `999px` | Chips, píldoras, ítems de menú, insignias. |
| `50%` | Íconos circulares, avatares, botones de ícono (favorito, redes). |
| Borde | `1px solid var(--color-line)`. |

Sombras (solo tres niveles; todas derivadas de `--color-ink`):

| Nivel | Valor | Uso |
| --- | --- | --- |
| `sm` | `0 14px 34px rgba(16, 26, 45, 0.06)` | Cards en reposo, bloques informativos. |
| `md` | `var(--shadow-soft)` = `0 20px 55px rgba(16, 26, 45, 0.12)` | Hero, paneles destacados, card en hover. |
| `lg` | `0 24px 40px rgba(16, 26, 45, 0.14)` | Menú desplegable, submenú, modal. |

Sombra de color solo en el botón primario: `0 12px 30px rgba(26, 59, 137, 0.22)`.

### 4.5 Movimiento

- Duraciones: **180 ms** (hover, color, foco) · **220 ms** (desplegables) · **520 ms** (`.reveal` al entrar en pantalla).
- Easing: `ease`.
- Hover de elevación: `transform: translateY(-2px)` (máximo `-3px` en cards). Nada de escalas > 1.03 ni rotaciones decorativas.
- Respetar siempre `prefers-reduced-motion: reduce` (ya existe en `utilities.css`; no duplicarlo por página).
- Nunca animar propiedades que causen reflow (`width`, `height`, `top`): solo `transform` y `opacity`.

---

## 5. Iconografía

- Librería única: **Font Awesome 6.5.2** (`fa-solid`, `fa-regular`, `fa-brands`). No mezclar con otras librerías ni SVG sueltos con otro estilo.
- Íconos decorativos junto a texto: `aria-hidden="true"`.
- Botones solo-ícono: `aria-label` descriptivo obligatorio (ej. "Guardar Apartamento El Roble").
- Tamaños: 14 px (menú), 16–18 px (botones, listas), 20–22 px (íconos de sección), 48 px de contenedor circular (`.hero__panel-icon`, contacto footer).
- Color: `--color-primary` sobre claro; `--color-secondary` o blanco sobre azul.
- Iconos con significado fijo (no reutilizar con otro sentido):
  `fa-whatsapp` → WhatsApp · `fa-building` → inmuebles · `fa-key` → propietario/publicar · `fa-location-dot` → ubicación · `fa-door-open` → arriendo · `fa-sign-hanging` → venta · `fa-phone` → llamada · `fa-magnifying-glass` → buscar · `fa-shield-halved` → confianza/validación.

---

## 6. Imágenes y media

### 6.1 Reglas generales

- Formato: **WebP** (o AVIF vía Cloudinary con `f_auto`). Nada de PNG/JPG pesados en `public/images`.
- Siempre declarar `width` y `height` (o `aspect-ratio` en CSS) para evitar CLS.
- `loading="lazy"` + `decoding="async"` en todo lo que esté **debajo del primer pantallazo**.
- La imagen LCP (hero o foto principal de la ficha) **no** lleva `lazy`; lleva `fetchpriority="high"`. Solo una por página.
- Usar `srcset` + `sizes` en fotos de inmuebles (helpers existentes: `getImageSrcset`, `getCroppedImageUrl`).
- `object-fit: cover` dentro de un contenedor con `aspect-ratio`.
- Peso objetivo: hero ≤ 200 KB, foto de card ≤ 80 KB, miniaturas ≤ 20 KB.

### 6.2 Proporciones oficiales

| Contexto | Aspect ratio |
| --- | --- |
| Foto de card de inmueble | `4 / 3` (equivale al actual 16/12) |
| Foto principal de ficha | `4 / 3` |
| Imagen de panel lateral del hero | `16 / 9` |
| Imagen de card de ruta/servicio | `12 / 7` (720×420) |
| Miniatura de galería | `1 / 1` |
| Video vertical (YouTube Shorts) | `9 / 16` |

### 6.3 Texto alternativo

- Describe el contenido y el propósito: "Sala comedor con balcón del apartamento en El Roble, Bogotá".
- Prohibido `alt="Amaru FS Inmobiliaria"` en imágenes que no sean el logo.
- Imágenes puramente decorativas: `alt=""`.
- Logo: `alt="Amaru FS Inmobiliaria"` (si el enlace ya tiene `aria-label`, el `alt` puede ir vacío para no duplicar).

### 6.4 Fotografía

- Solo fotos **reales** del inmueble, iluminadas, horizontales, sin marcas de agua invasivas ni filtros de color.
- Texto sobre imagen solo con overlay `rgba(16, 26, 45, 0.45–0.78)` o el gradiente azul de marca, garantizando contraste ≥ 4.5:1.
- Las imágenes de fondo con contenido informativo no van en `style=""` inline: se definen en CSS de la página.

---

## 7. Componentes

> Todo componente reutilizable vive en `src/components/` (Astro) y su CSS base en `src/styles/components/`. Las páginas **solo** ajustan layout, nunca redefinen la apariencia base del componente.

### 7.0 Regla de reutilización (obligatoria)

**Si una pieza de interfaz se repite, es un componente.** Se considera que se repite cuando:

- aparece en **2 o más páginas** (hero, FAQ, cards, timeline, cierre, paginación…), o
- aparece **2 o más veces en la misma página** con la misma estructura (cards de una grilla, pasos, ítems de checklist), o
- es previsible que se reutilice (paginación, estado vacío, insignias, precio de inmueble).

En esos casos está **prohibido copiar y pegar el HTML o el CSS** entre páginas. Se crea (o se reutiliza) un componente Astro y la página solo le pasa datos.

#### Estructura de carpetas

```text
src/
  components/
    global/      → piezas del layout: SiteHeader, SiteFooter, Breadcrumbs
    ui/          → piezas pequeñas y genéricas: Button, SectionHeading, Badge, Card, EmptyState, Pagination
    sections/    → bloques completos de página: PageHero, FaqSection, Timeline, ProcessPhases, InfoBox, ClosingCta, ChecklistGroup, ServiceCards
    property/    → piezas de inmuebles: PropertyCard, PropertyFeatures, PropertyPrice, PropertyGallery, PropertyFilters
    common/      → modales y piezas de negocio específicas (RentalRequirementsModal)
  styles/
    components/  → un CSS por componente, con el mismo nombre en kebab-case (property-card.css, page-hero.css)
```

#### Convenciones

| Tema | Regla |
| --- | --- |
| Nombre del archivo | `PascalCase.astro` (`PropertyCard.astro`). |
| Clases CSS | BEM con el nombre del componente en kebab-case: `.property-card`, `.property-card__media`, `.property-card--compact`. |
| CSS | En `src/styles/components/<nombre>.css`, importado **desde el propio componente** (`import "../../styles/components/property-card.css";`). Así solo se carga en las páginas que lo usan. No se redefine en CSS de página. |
| Props | Tipadas con `interface Props`. Datos (textos, URLs, listas) entran por props; nada de textos fijos de una página dentro del componente. |
| Variantes | Con una prop `variant` (`"default" \| "compact" \| "dark"`) que agrega un modificador BEM. No crear un componente nuevo por cada variación visual. |
| Contenido libre | Con `<slot />` o slots con nombre (`<slot name="actions" />`) cuando el contenido varía mucho (botones, párrafos con enlaces). |
| Encabezados | Prop `headingLevel` (`2 \| 3`) cuando el componente puede ir en distintos niveles, para no romper la jerarquía H1→H2→H3. |
| IDs | Recibidos por props (`id`, `titleId`) para que sean únicos por página y sirvan a GTM y `aria-labelledby`. |
| Datos repetidos | Listas (FAQ, pasos, servicios) en un arreglo en el frontmatter de la página o en `src/data/`, y se recorren con `.map()`. |
| JS | Si el componente necesita interacción, su script vive en `src/scripts/components/<nombre>.js`, se inicializa por atributo `data-*` y soporta varias instancias en la misma página. |
| SEO | Si el componente pinta contenido que también va en JSON-LD (FAQ, inmueble), el componente genera ambos desde los mismos datos. |

#### Ejemplo

```astro
---
// src/components/ui/SectionHeading.astro
import "../../styles/components/section-heading.css";

interface Props {
  eyebrow?: string;
  title: string;
  titleId: string;
  headingLevel?: 2 | 3;
}

const { eyebrow, title, titleId, headingLevel = 2 } = Astro.props;
const Heading = `h${headingLevel}`;
---

<div class="section-heading">
  {eyebrow && <p class="eyebrow">{eyebrow}</p>}
  <Heading id={titleId}>{title}</Heading>
  <slot />
</div>
```

```astro
<!-- Uso en una página -->
<SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" titleId="faq-title" />
```

#### Catálogo de componentes del sitio

Antes de crear algo, revisar esta tabla. Si la pieza está aquí, se usa el componente; si no existe todavía, se crea con este nombre.

| Componente | Carpeta | Reemplaza (clases actuales) | Props principales |
| --- | --- | --- | --- |
| `SiteHeader` ✅ | `global/` | `.site-header`, `.main-nav` | `activePage` |
| `SiteFooter` ✅ | `global/` | `.site-footer` | — |
| `Breadcrumbs` ✅ | `global/` | `.breadcrumbs` | `items` |
| `Button` ✅ | `ui/` | `.btn`, `.btn--*` | `href?`, `variant`, `size?`, `icon?`, `external?`, `type?`, `block?` (ver §7.1) |
| `SectionHeading` | `ui/` | `.section-heading` + `.eyebrow` | `eyebrow?`, `title`, `titleId`, `headingLevel?` |
| `Card` | `ui/` | base de `.route-card`, `.service-card`, `.audience__box`, `.trust-cards` | `variant`, `image?`, `icon?`, `title`, `headingLevel?`, slot |
| `Badge` | `ui/` | chips/estados (`.property-card__status`, tags de ficha) | `variant`, `icon?`, texto en slot |
| `Pagination` | `ui/` | `.pagination` (`data-pagination`) | `label`, `totalPages?`; JS reutilizable |
| `EmptyState` | `ui/` | `.empty-state` | `icon`, `title`, slot de acciones |
| `PageHero` | `sections/` | `.hero`, `.hero__content`, `.hero__panel` (7 páginas) | `eyebrow`, `title`, `lead`, `actions`, `panel { image, imageAlt, icon, title, text }`, `backgroundImage` |
| `FaqSection` | `sections/` | `.faq-list`, `.faq-item` (8 páginas) + JSON-LD `FAQPage` | `eyebrow?`, `title`, `titleId`, `items: { question, answer }[]` |
| `Timeline` | `sections/` | `.timeline` (6 páginas) | `steps: { icon?, title, text, href? }[]`, `variant` |
| `ProcessPhases` | `sections/` | `.process-phase` (3 páginas) | `phases: { label, title, steps }[]` (usa `Timeline`) |
| `InfoBox` | `sections/` | `.trust__box`, `.transparency__box` (6 páginas) | `eyebrow`, `title`, `titleId`, slot |
| `ChecklistGroup` | `sections/` | `.checklist-group` (3 páginas) | `number`, `icon`, `title`, `description`, `items` |
| `ClosingCta` | `sections/` | `.closing` (6 páginas) | `eyebrow`, `title`, `text`, `action` |
| `CommissionSummary` | `sections/` | `.commission-summary` (2 páginas) | datos de comisión |
| `PropertyCard` | `property/` | `.property-card` y `.related-card` (variante `compact`) | `property`, `variant`, `headingLevel?` |
| `PropertyFeatures` | `property/` | `.property-features` | `features`, `max?` |
| `PropertyPrice` | `property/` | `.property-card__price`, precio de ficha | `property`, `size` |
| `PropertyFilters` | `property/` | buscador de `/inmuebles/` | `options` |
| `RentalRequirementsModal` ✅ | `common/` | modal de requisitos | — |

✅ = ya existe. Al crear uno nuevo, agregarlo a esta tabla en el mismo cambio.

### 7.1 Botones (`.btn`)

**Componente:** `src/components/ui/Button.astro` · **CSS:** `src/styles/components/button.css` (única fuente de `.btn`; prohibido redefinir `.btn` o `.btn--*` en CSS de página).

```astro
---
import Button from "../components/ui/Button.astro";
---
<!-- Enlace externo (WhatsApp): agrega target="_blank" y rel="noopener noreferrer" -->
<Button variant="secondary" icon="fa-brands fa-whatsapp" id="pagina-accion" href={whatsappHref} external>Consultar por WhatsApp</Button>
<!-- Enlace interno -->
<Button variant="light" icon="fa-solid fa-arrow-down" href="#proceso">Conocer el proceso</Button>
<!-- Botón de acción (sin href) con atributos data-* -->
<Button variant="ghost" icon="fa-solid fa-rotate-left" data-clear-filters>Limpiar filtros</Button>
<Button variant="primary" type="submit">Buscar</Button>
```

| Prop | Valores | Default |
| --- | --- | --- |
| `variant` | `primary` · `secondary` · `light` · `ghost` | `primary` |
| `size` | `md` (48 px) · `sm` (44 px, 14 px de texto; barras laterales y resúmenes) | `md` |
| `href` | URL → pinta `<a>`; sin `href` pinta `<button>` | — |
| `external` | abre en pestaña nueva con `rel="noopener noreferrer"` | `false` |
| `icon` | clases Font Awesome (se agrega `aria-hidden`) | — |
| `type` | `button` · `submit` · `reset` (solo sin `href`) | `button` |
| `block` | ancho completo | `false` |
| `class`, `id`, `data-*`, `aria-*`, `disabled` | se pasan tal cual | — |

**Anatomía:** ícono opcional (izquierda) + etiqueta verbal. `display: inline-flex; gap: 9px; min-height: 48px; padding: 13px 22px; border-radius: var(--radius); font-weight: 700; text-decoration: none;`

| Variante | Fondo | Texto | Borde | Cuándo |
| --- | --- | --- | --- | --- |
| `primary` | `--color-primary` | `--color-white` | — | Acción principal **sobre fondo claro**. Hover `#143070`. |
| `secondary` | `--color-secondary` | `--color-primary` | — | CTA principal **sobre fondo azul** (hero, cierres) o acción destacada de la ficha. Hover `#10f0bf`. |
| `light` | `rgba(255,255,255,0.1)` | `--color-white` | `rgba(255,255,255,0.5)` | Acción secundaria **sobre fondo azul/oscuro** (hero). Nunca sobre fondo claro. |
| `ghost` | `--color-white` | `--color-primary` | `1px solid var(--color-line)` | Acción secundaria/terciaria sobre fondo claro (limpiar filtros, llamar, "Anterior"). |

En CSS de página solo se permiten ajustes de **layout por contexto** (ancho, márgenes, alineación), p. ej. `.hero__actions .btn { width: 100%; }` o `.intake-actions .btn { min-height: 56px; }`.

Reglas:

- **Un solo botón primario por bloque visual.** Si hay dos acciones, la segunda es `light` o `ghost`.
- Etiquetas con verbo y resultado: "Consultar disponibilidad", "Ver ficha del inmueble". Evitar "Clic aquí", "Más".
- Botón ≠ enlace: si navega a otra URL lleva `href` (se pinta `<a>`); si ejecuta una acción en la página va sin `href` (se pinta `<button type="button">`).
- Si el botón abre WhatsApp, debe decirlo (ícono `fa-whatsapp` + texto "por WhatsApp" o etiqueta clara). **Un botón que dice "Ver inmuebles" debe ir a `/inmuebles/`, no a WhatsApp.**
- Estados obligatorios (ya incluidos en el componente): `:hover`, `:focus-visible`, `:active`, `[disabled]`/`[aria-disabled="true"]` (opacidad 0.58, sin elevación, `cursor: not-allowed`).
- En móvil (≤ 520 px) los botones de un grupo pueden ocupar ancho completo.
- `id` únicos por página (se usan para GTM). No repetir `id`.

### 7.2 Enlaces

- Color `--color-primary`; subrayado visible en texto corrido (se permite `text-decoration-color: var(--color-secondary)` como acento sobre fondo claro siempre que el texto siga siendo azul).
- Externos con `target="_blank"` → `rel="noopener noreferrer"` y señal visual o textual de que abre fuera.
- Enlaces de teléfono `tel:` y WhatsApp `https://wa.me/` usan `site.whatsapp` de `src/data/site.ts`; no escribir el número a mano.

### 7.3 Header y menú de navegación

- Componente único: `SiteHeader.astro`, datos en `src/data/navigation.ts`. No crear menús paralelos.
- Máximo **6 ítems de primer nivel** + CTA de WhatsApp a la derecha (estilo `.nav-cta`, azul).
- Ítem activo: fondo `#e8edf6` + `aria-current="page"`.
- Submenú: se abre con hover **y** con foco/teclado; tiene que poder cerrarse con `Esc`. El enlace padre debe seguir siendo navegable.
- Móvil (≤ 760 px): header fijo de 74 px, botón hamburguesa de 44×44 px con `aria-expanded` y `aria-controls`, panel a pantalla completa con scroll, submenú expandido en línea. Al abrir, el foco va al primer enlace; `Esc` cierra y devuelve el foco al botón.
- Logo a la izquierda, enlaza al inicio, ancho 190 px (160 px móvil).

### 7.4 Migas de pan

- Componente `Breadcrumbs.astro`, en todas las páginas excepto inicio.
- Último ítem con `aria-current="page"`, en `--color-primary` y negrita; separadores decorativos `/` en `--color-line` (aceptable porque no es información).

### 7.5 Hero de página

Estructura estándar (inicio, propietarios, arrendatarios, inmuebles, referidos):

- Grilla `main + aside` (`--layout-main` / `--layout-aside`), una columna ≤ 1100 px.
- **Contenido** (izquierda): fondo azul con gradiente `rgba(26,59,137,0.97) → rgba(16,26,45,0.98)` sobre imagen; `.eyebrow` + H1 + lead + máximo 2 botones (`secondary` + `light` translúcido).
- **Panel** (derecha): fondo `--color-primary`, imagen 16/9, ícono circular verde, H2 corto y párrafo.
- Altura mínima razonable (`min-height` no debe empujar el contenido fuera del primer pantallazo en móvil; en ≤ 760 px usar `auto`).
- El CSS del hero vive en un solo lugar compartido; las páginas solo cambian la imagen de fondo con una variable (`--hero-image`).

### 7.6 Cards

**Base común** (todas las cards):
`background: var(--color-white); border: 1px solid var(--color-line); border-radius: var(--radius); padding: 20–24px; box-shadow: sm;` Hover: elevación `-2/-3px` + sombra `md` + borde `rgba(26, 59, 137, 0.24)`.

**Card de inmueble (`.property-card`)** — orden fijo de información:

1. Foto 4/3 con: estado/operación (chip oscuro `rgba(16,26,45,0.78)` + blanco), contador de fotos y botón favorito (48×48, `aria-pressed`).
2. Título (H3, Bebas Neue) — es el **enlace principal**; toda la card es clicable con el patrón de "enlace estirado" (`::after` con `inset: 0`).
3. Ubicación con `fa-location-dot`.
4. Máximo 4 características (habitaciones, baños, área, parqueadero).
5. Precio destacado (Bebas Neue o Outfit 700, `--color-primary`) con etiqueta ("Arriendo", "Venta") y nota "con administración incluida" cuando aplique.
6. Señal "Ver ficha del inmueble".

Reglas: no más información de la necesaria; los datos deben coincidir con la ficha; botones internos (favorito) deben estar por encima del enlace estirado (`z-index: 2`); foco visible en toda la card (`:has(:focus-visible)`).

**Card de ruta/servicio (`.route-card`, `.service-card`)**: imagen o ícono circular 48 px, H3, párrafo de 1–3 líneas, un enlace/botón. Grilla de 3 columnas (2 en `lg`, 1 en `sm`).

**Card de confianza / dato (`.trust-cards`)**: ícono + cifra o título corto + descripción. Sin botones.

### 7.7 Formularios y filtros

- Cada campo con `<label>` visible (no solo placeholder). Placeholder = ejemplo, no instrucción.
- Altura de input/select: **48 px**, `border: 1px solid var(--color-line)`, `border-radius: var(--radius)`, fondo blanco, texto 16 px (evita zoom en iOS).
- Foco: `border-color: var(--color-primary)` + anillo `0 0 0 3px rgba(0, 225, 173, 0.42)`.
- Errores: texto en `#b42318` debajo del campo + ícono + `aria-invalid="true"` + `aria-describedby`. Nunca solo color rojo.
- Éxito: fondo `#dff9f1` + texto `#08785f`.
- Checkbox/radio: `accent-color: var(--color-primary)` (el verde no tiene contraste suficiente sobre blanco para indicar estado).
- Formularios por pasos (`intake-step`): barra de progreso con texto "Paso 2 de 4", botón "Anterior" (`ghost`) y "Siguiente" (`secondary`/`primary`), validación antes de avanzar, foco al título del paso nuevo.
- Filtros de inmuebles: búsqueda + operación + tipo + ubicación + habitaciones + precio; botón "Buscar" primario y "Limpiar filtros" ghost; mostrar conteo de resultados y estado vacío con salida (limpiar o WhatsApp). En móvil, los filtros se pliegan en un panel con botón "Filtros (n)".
- Usar datos simulados al probar; nunca enviar formularios reales sin autorización (ver `AGENTS.md`).

### 7.8 FAQ / acordeón

- Usar `<details>/<summary>` nativo o botón con `aria-expanded` + `aria-controls`.
- Pregunta en Outfit 18 px peso 700 (no Bebas Neue), ícono `+`/chevron que rota.
- Las mismas preguntas visibles deben coincidir con el JSON-LD `FAQPage`.
- Un único estilo de FAQ para todo el sitio (componente compartido).

### 7.9 Timeline / pasos de proceso

- Numeración en Bebas Neue 40 px. Sobre fondo azul, número en `--color-secondary`; sobre fondo claro, en `--color-primary`.
- Máximo 6 pasos visibles; cada paso con título corto + 1–2 líneas.
- En móvil, una columna con línea vertical.

### 7.10 Insignias, chips y etiquetas

- `border-radius: 999px; padding: 6px 12px; font-size: 13px; font-weight: 700`.
- Variantes: **neutra** (`#e8edf6` + `--color-primary`), **oscura sobre foto** (`rgba(16,26,45,0.78)` + blanco), **positiva** (`#dff9f1` + `#08785f`), **destacada** (`--color-warm` + `--color-ink`).

### 7.11 Modales y galería

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; foco atrapado dentro; `Esc` cierra; el foco vuelve al disparador.
- Fondo `rgba(16, 26, 45, 0.84)`; botón cerrar 44×44 visible arriba a la derecha.
- Galería: flechas con `aria-label`, contador "3 / 12", navegación con teclado (← →) y swipe en móvil.
- Bloquear el scroll del `body` mientras está abierto.

### 7.12 Estados vacíos, carga y mensajes

- Estado vacío: ícono circular + H2 corto + explicación + 1–2 acciones.
- No mostrar "0 resultados" sin ofrecer salida.
- Mensajes dinámicos (resultados filtrados, favorito guardado) anunciados con `aria-live="polite"`.

### 7.13 Bloque de cierre (CTA final)

- Fondo `--color-primary`, H2 blanco, párrafo `rgba(255,255,255,0.86)`, botón `secondary`.
- Uno por página, al final del `main`.

### 7.14 Footer

- Componente único `SiteFooter.astro`. Fondo `--color-primary`, texto blanco y `rgba(255,255,255,0.82)`, íconos/acentos `--color-secondary`.
- Títulos de columna como `h2` visualmente de 22 px (o `p` con rol de encabezado si rompe la jerarquía).
- Redes sociales: botones circulares 54 px con `aria-label`.

### 7.15 Botón flotante de WhatsApp (si se implementa)

- Uno solo, esquina inferior derecha, 56×56, fondo `--color-secondary`, ícono `--color-primary`, `aria-label="Escribir por WhatsApp"`, que no tape CTAs ni el pie en móvil.

---

## 8. Accesibilidad (checklist obligatorio)

- [ ] Contrastes según tabla 2.4.
- [ ] Foco visible en **todo** elemento interactivo: `outline: 3px solid rgba(0, 225, 173, 0.42); outline-offset: 3px;` sobre fondos azules y, sobre fondos claros, usar `outline-color: var(--color-primary)` para lograr ≥ 3:1. **Prohibido** `outline: none/0` sin reemplazo equivalente.
- [ ] Objetivos táctiles ≥ 44×44 px (mínimo legal WCAG 2.2 AA: 24×24 px con espaciado).
- [ ] Elementos fijos (header) no tapan el elemento enfocado (`scroll-padding-top` igual a la altura del header).
- [ ] Un H1 por página; landmarks `header`, `nav`, `main`, `footer`.
- [ ] Enlace "Saltar al contenido" como primer elemento enfocable.
- [ ] `lang="es-CO"` en `<html>`.
- [ ] Iconos decorativos `aria-hidden="true"`; botones de ícono con `aria-label`.
- [ ] `alt` descriptivos (sección 6.3).
- [ ] Formularios con `label`, errores con texto y `aria-describedby`.
- [ ] Todo funciona con teclado (menú, submenú, filtros, galería, modal, acordeón).
- [ ] Sin información que dependa solo del hover (en táctil no existe).
- [ ] `prefers-reduced-motion` respetado.
- [ ] `id` únicos en la página.

---

## 9. Contenido y microcopy

- Títulos que respondan a la intención: "¿Qué necesitas hacer hoy?", "Arrienda tu inmueble con acompañamiento".
- Párrafos de 1–3 frases; listas para requisitos y pasos.
- Precios en formato colombiano: `$ 1.850.000` (usar `formatCurrency`), con etiqueta de operación y si incluye administración.
- Áreas en `m²`; habitaciones y baños con número + palabra ("3 habitaciones").
- Fechas en formato `12 de noviembre de 2026`.
- CTA de WhatsApp con mensaje prellenado y contextual (incluye el nombre/código del inmueble).
- No usar promesas absolutas ("arriendo garantizado", "el mejor precio").

---

## 10. Rendimiento como parte del UX

- Objetivos: **LCP < 2.5 s**, **INP < 200 ms**, **CLS < 0.1** en móvil.
- Fuentes: `font-display: swap`, preload solo de las dos fuentes usadas; preferir `.woff2`.
- CSS: no duplicar reglas entre páginas; cada página carga solo su CSS.
- JS: sin dependencias nuevas para efectos visuales; inicialización defensiva.
- Font Awesome por CDN carga toda la librería: evaluar subset local (ver plan de acción).

---

## 11. Flujo obligatorio para la IA al crear o editar UI

1. Leer esta guía y `AGENTS.md`.
2. Revisar el catálogo de componentes (§7.0). Si la pieza existe, reutilizarla con props/variantes. Si no existe y se va a repetir (2+ páginas o 2+ veces en una página), crearla como componente en la carpeta correcta, con su CSS en `src/styles/components/`, y agregarla al catálogo. Nunca copiar HTML/CSS entre páginas.
3. Usar **solo** tokens/valores de las secciones 2–4. Si se necesita un color o tamaño que no está, **detenerse y preguntar**; no inventarlo.
4. Escribir HTML semántico con estados accesibles (sección 8).
5. Verificar en 375 / 768 / 1280 px, teclado y consola sin errores.
6. Ejecutar `npm run build`.
7. Sugerir commit con el formato de `AGENTS.md` (nunca ejecutarlo).

### Ejemplo de CSS correcto

```css
.nueva-card {
	padding: 24px;
	background: var(--color-white);
	border: 1px solid var(--color-line);
	border-radius: var(--radius);
	box-shadow: 0 14px 34px rgba(16, 26, 45, 0.06);
	transition: transform 180ms ease, box-shadow 180ms ease;
}

.nueva-card h3 {
	color: var(--color-primary);
	font-family: var(--font-title);
	font-size: clamp(26px, 2.4vw, 34px);
}

.nueva-card p {
	color: var(--color-muted);
	font-size: 16px;
}
```

### Ejemplo de CSS prohibido

```css
.nueva-card {
	background: #fafafa;            /* ❌ color inventado */
	font-family: "Poppins";          /* ❌ tipografía no web */
	font-size: 17px;                 /* ❌ fuera de la escala */
	border-radius: 12px;             /* ❌ radio no oficial */
	color: var(--color-secondary);   /* ❌ verde como texto sobre blanco */
}
.nueva-card a:focus { outline: none; } /* ❌ elimina el foco */
```

---

## 12. Referencias consultadas

- W3C — [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) (2.5.8 Target Size, 2.4.11 Focus Not Obscured).
- Deque — [WCAG 2.2 Updates](https://dequeuniversity.com/resources/wcag-2.2).
- TetraLogical — [What's new in WCAG 2.2](https://tetralogical.com/blog/2023/10/05/whats-new-wcag-2.2).
- Design Tokens — [Using design tokens as variables](https://designtokens.substack.com/p/using-design-tokens-as-variables).
- DEV — [CSS architecture with design tokens and custom properties](https://dev.to/sabrielagency/css-architecture-that-actually-scales-design-tokens-custom-properties-and-the-systems-that-hold-22n3).
- Baymard Institute — [Property search: split view with map](https://baymard.com/blog/accommodations-split-view).
- Cieden — [How to create the right button hierarchy](https://cieden.com/book/atoms/button/how-to-create-button-hierarchy).
- Balsamiq — [Button design best practices](https://balsamiq.com/blog/button-design-best-practices/).
- Shopify Dev — [Use responsive images](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-responsive-images).
- Core Web Vitals — [Optimize images for Core Web Vitals](https://corewebvitals.io/pagespeed/optimize-images-for-core-web-vitals).
