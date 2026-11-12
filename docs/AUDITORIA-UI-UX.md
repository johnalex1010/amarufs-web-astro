# Auditoría UI/UX y plan de acción — web-astro

> Comparación entre la [Guía UI/UX](./GUIA-UI-UX.md) y el estado actual del sitio (`src/`), revisado el 12 de noviembre de 2026.
> Método: lectura de código fuente (CSS, componentes, páginas, scripts) e inventario automático de valores. No incluye pruebas con Lighthouse, lectores de pantalla ni datos de campo (CrUX); se recomienda hacerlas en la fase 4.

---

## 1. Resumen ejecutivo

| Área | Estado | Comentario |
| --- | --- | --- |
| Paleta de marca | 🟢 Bien definida | 10 tokens claros en `tokens.css`; la identidad azul + menta es coherente. |
| Uso de tokens | 🔴 Bajo | 28 hex y ~60 `rgba()` distintos escritos a mano en CSS de páginas. |
| Tipografía | 🟠 Parcial | Bebas Neue + Outfit bien elegidas, pero solo Outfit 400 cargado y 47 tamaños de letra distintos. |
| Componentes | 🔴 Duplicados | Solo 4 componentes Astro; 17 piezas (hero, FAQ, cards, timeline, cierre, paginación…) copiadas a mano entre páginas y su CSS redefinido en 7–8 hojas (ver §2.7). |
| Accesibilidad | 🟠 Parcial | Buen uso de `aria-hidden`, `aria-expanded`, `reduced-motion`; faltan salto al contenido, Esc en menú, foco en cards/timeline, `alt` genéricos. |
| Imágenes | 🟢 Bien en inmuebles | `srcset`, `sizes`, `lazy`, `fetchpriority` en ficha. 🟠 Hero de páginas con `alt` genérico. |
| Responsive | 🟢 Funcional | Breakpoints coherentes, aunque hay 7 distintos (debería haber 4). |
| Rendimiento | 🟠 Mejorable | Font Awesome completo por CDN, fuentes en `.woff` (no `.woff2`), CSS duplicado por página. |

---

## 2. Comparación detallada

### 2.1 Color

| Regla de la guía | Situación actual | Brecha |
| --- | --- | --- |
| Solo tokens en CSS | 28 valores hex literales; los más repetidos: `#dff9f1` (22), `#fbfcff` (16), `#f7f9fd` (14), `#d8e2f1` (11), `#10f0bf` (9), `#102c70` (7), `#e8edf6` (5). | 🔴 Tokenizar 12 valores de apoyo (guía §2.2). |
| Sin colores sueltos | Variantes casi idénticas: `#eff5ff`, `#edf4ff`, `#edf2f9`, `#dce8ff`, `#cfdbee`, `#f7fffd`, `#c92525`, `rgba(0, 212, 163, .65)`. | 🟠 Consolidar al canónico (guía §2.2). |
| Verde menta nunca como texto sobre claro | `color: var(--color-secondary)` en 34 reglas. Se revisaron muestras: la mayoría están sobre fondo azul (timeline, footer) ✅, pero hay casos en hover sobre claro, p. ej. `detalle-inmueble.css:750` (`.timeline__link:hover`) y `.property-gallery__zoom:hover` sobre foto. | 🟠 Revisar las 34 reglas una por una. |
| Checkbox/radio en azul | `inmuebles.css:591` usa `accent-color: var(--color-secondary)` (1.70:1 sobre blanco). | 🟠 Cambiar a `--color-primary`. |
| Ámbar solo como fondo | `--color-warm` solo aparece en gradientes. | 🟢 Cumple. |

### 2.2 Tipografía

| Regla | Situación actual | Brecha |
| --- | --- | --- |
| Solo Bebas Neue y Outfit | Cumple. Solo esas dos `@font-face`. | 🟢 |
| `font-family` vía token | 28 repeticiones literales de `"Bebas Neue", Impact, sans-serif`. | 🟡 Reemplazar por `var(--font-title)`. |
| Pesos reales | Solo `Outfit-Regular.woff` (400). Se usan `font-weight: 700` (50 veces), `800` (35), `900` (3) → negrita sintética del navegador, más gruesa y menos nítida. | 🔴 Cargar pesos 600/700 de **Outfit** (misma familia, no es tipografía nueva) o limitar a 700. |
| Escala canónica | 47 valores de `font-size` distintos (11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 27, 28, 31, 32, 33, 34, 38, 39, 40, 42, 44, 46, 48, 60, 62, 78 px y 17 `clamp()` diferentes). | 🔴 Reducir a los 10 niveles de la guía §3.3. |
| Texto mínimo | 11 px usado 5 veces, 12 px 8 veces. | 🟠 Subir a 13 px mínimo en insignias. |
| Formato | `.woff` en vez de `.woff2` (~30 % más pesado). | 🟡 Convertir los mismos archivos a `.woff2`. |
| `.eyebrow` | `font-weight: 800` con fuente de un solo peso. | 🟠 Ajustar a 700 tras cargar el peso. |

### 2.3 Espaciado, radios, sombras y breakpoints

| Regla | Situación actual | Brecha |
| --- | --- | --- |
| Escala 4/8 | Valores muy dispersos: 7, 9, 13, 22, 26, 28, 30, 34, 42, 46, 52, 62 px conviven con la escala. | 🟡 Migración progresiva. |
| Radios | `var(--radius)` 125 usos ✅; pero `.btn` en `utilities.css` usa `6px` y en páginas usa `var(--radius)` → botones con radios distintos según la página. | 🟠 Unificar en `--radius`. |
| 3 niveles de sombra | 12+ sombras distintas. | 🟡 Reducir a `sm/md/lg`. |
| 4 breakpoints | 7 breakpoints: 520, 760, 900, 1020, 1100, 1180 px. | 🟡 Migrar 1020/1180 → 1100. |
| Duraciones | 160, 180, 220, 520 ms. | 🟡 Unificar 160 → 180 ms. |
| `!important` | Solo en bloques `prefers-reduced-motion`, pero ese bloque se repite en las 8 hojas de página + utilities. | 🟡 Dejar solo el de `utilities.css`. |

### 2.4 Componentes

| Componente | Situación actual | Brecha |
| --- | --- | --- |
| **Botones** | `.btn` definido en `utilities.css` **y** de nuevo en cada CSS de página (45 bloques `.btn`, 24 `.btn--secondary`, 21 `.btn--light`, 20 `.btn--primary`). `.btn--ghost` no existe en `utilities.css` (solo en 3 páginas). Peso 800 en utilities vs 700 en páginas. | 🔴 Un único `.btn` con 4 variantes en `utilities.css`. |
| **Hero** | `.hero`, `.hero__content`, `.hero__panel` copiados en 7 hojas. Imagen de fondo fija en CSS de cada página. | 🔴 Extraer a componente `PageHero.astro` + CSS compartido con `--hero-image`. |
| **FAQ** | `.faq-item` repetido en las 8 hojas (68 bloques). Botón con `aria-expanded` ✅, sin `aria-controls`. | 🟠 Componente `FaqList.astro` que genere también el JSON-LD. |
| **Cards** | `route-card`, `service-card`, `property-card`, `related-card`, `trust-cards`, `audience__box`, `transparency__box`, `trust__box`… cada una con su propio borde/sombra/padding. | 🟠 Base `.card` común + modificadores. |
| **Card de inmueble** | Muy buena: foto con `srcset`, enlace estirado, favorito con `aria-pressed`, foco con `:has()`. Pero `.property-card__link:focus-visible { outline: none }` depende de `:has()`; borde de radio `8px` literal; padding 18 px. | 🟢/🟡 Ajustes menores. |
| **Header/menú** | Componente único y datos centralizados ✅. Botón hamburguesa no cambia su `aria-label` a "Cerrar menú"; sin cierre con `Esc`; sin manejo de foco al abrir; submenú sin `aria-expanded`. | 🟠 |
| **Footer** | Componente único ✅, contraste correcto ✅. | 🟢 |
| **Migas de pan** | Correctas, con `aria-current` ✅. | 🟢 |
| **Formularios (referidos/filtros)** | `aria-live` en estado del formulario y simulador ✅. Varios `outline: none` en `referidos.css:765`, `:969`, `inmuebles.css:1527`, `detalle-inmueble.css:755`, `:1350`. | 🟠 Verificar reemplazo de foco visible. |
| **Contador de resultados** | `data-results-count` sin `aria-live`. | 🟡 |

### 2.5 Imágenes

| Regla | Situación actual | Brecha |
| --- | --- | --- |
| `width`/`height` | Presentes en casi todas ✅. | 🟢 |
| LCP con `fetchpriority` | Solo en la ficha de inmueble. Los heroes usan `background-image` CSS (no se puede priorizar ni hacer responsive). | 🟠 Pasar la imagen de fondo del hero a `<img>` con `fetchpriority="high"` o `preload`. |
| `alt` descriptivo | 7 imágenes con `alt="Amaru FS Inmobiliaria"` (paneles hero de todas las páginas). | 🟠 Escribir `alt` reales o `alt=""` si son decorativas. |
| Sin `style` inline | `index.astro:150` usa `style="background-image: … rgba(11, 34, 83, …)"`: color fuera de paleta + inline. | 🟠 Mover a `home.css` con colores de la paleta. |

### 2.6 Accesibilidad

| Regla | Situación actual | Brecha |
| --- | --- | --- |
| `lang` | `site.locale` (`es-CO`) ✅. | 🟢 |
| Salto al contenido | No existe. | 🟠 |
| Header fijo no tapa foco | Sin `scroll-padding-top`; header sticky 84 px / fijo 74 px. | 🟠 |
| Foco visible | Global `rgba(0,225,173,0.42)` ✅ sobre azul; sobre blanco el anillo menta al 42 % tiene contraste < 3:1. | 🟠 Anillo azul sobre fondos claros. |
| `id` únicos | `id="home-ver-inmuebles"` repetido en `index.astro:86` y `:147` (afecta GTM y HTML válido). | 🔴 |
| Etiqueta coherente con destino | "Ver inmuebles disponibles" abre WhatsApp en `arrendatarios.astro:74` e `index.astro:147`, mientras en otros lugares va a `/inmuebles/`. | 🟠 Ajustar texto o destino. |
| `rel` externos | 12 enlaces `target="_blank" rel="noopener"` sin `noreferrer` (contra `AGENTS.md`). | 🟡 |
| Reduced motion | ✅ (aunque duplicado). | 🟢 |

### 2.7 Piezas repetidas que deben ser componentes

Hoy solo existen 4 componentes (`SiteHeader`, `SiteFooter`, `Breadcrumbs`, `RentalRequirementsModal`). Todo lo demás está escrito a mano en cada página y su CSS copiado en cada hoja de estilo. Inventario obtenido buscando las clases en `src/pages/**/*.astro`:

| Pieza (clase actual) | Páginas donde se repite | Nº | Componente objetivo |
| --- | --- | --- | --- |
| `.hero` + `.hero__panel` | inicio, propietarios, venta, arriendo, arrendatarios, inmuebles, referidos (+ variante en ficha) | 7–8 | `sections/PageHero.astro` |
| `.faq-list` / `.faq-item` | las 8 páginas | 8 | `sections/FaqSection.astro` (genera también el JSON-LD) |
| `.section-heading` + `.eyebrow` | las 8 páginas | 8 | `ui/SectionHeading.astro` |
| `.btn` (`--primary/--secondary/--light/--ghost`) | las 8 páginas | 8 | `ui/Button.astro` |
| `.timeline` | propietarios, venta, arriendo, arrendatarios, referidos, ficha | 6 | `sections/Timeline.astro` |
| `.closing` (CTA final) / `.referrals` | propietarios, venta, arriendo, arrendatarios, ficha / inmuebles | 6 | `sections/ClosingCta.astro` |
| `.trust__box` / `.transparency__box` | inicio, inmuebles, arrendatarios / propietarios, venta, arriendo | 6 | `sections/InfoBox.astro` |
| `.service-card` | propietarios, venta, arriendo | 3 | `ui/Card.astro` (variante `service`) |
| `.audience` | propietarios, venta, arriendo | 3 | `ui/Card.astro` + layout de sección |
| `.checklist-group` | propietarios, venta, arriendo | 3 | `sections/ChecklistGroup.astro` |
| `.process-phase` / `.info-phase` | arrendatarios, venta, arriendo / referidos | 4 | `sections/ProcessPhases.astro` (usa `Timeline`) |
| `.commission-summary` | venta, arriendo | 2 | `sections/CommissionSummary.astro` |
| `.property-card` / `.related-card` | inmuebles / ficha (inmuebles relacionados) | 2 | `property/PropertyCard.astro` (variante `compact`) |
| `.property-features`, precio | inmuebles, ficha | 2 | `property/PropertyFeatures.astro`, `property/PropertyPrice.astro` |
| `.route-card` | inicio (2 veces) | 1 página, 2 usos | `ui/Card.astro` (variante `route`) |
| `.pagination` | inmuebles (generada por JS) | 1 (reutilizable: futuros listados, blog) | `ui/Pagination.astro` + `scripts/components/pagination.js` |
| `.empty-state` | inmuebles | 1 (reutilizable) | `ui/EmptyState.astro` |

**Impacto:** cada cambio visual en, por ejemplo, el FAQ o el hero hoy obliga a editar 7–8 archivos `.astro` y 7–8 archivos `.css`, con alto riesgo de que las páginas queden distintas. Con componentes se edita 1 archivo.

---

## 3. Plan de acción

Prioridad: **P0** = error/afecta usuarios o medición · **P1** = consistencia y accesibilidad · **P2** = deuda técnica / rendimiento · **P3** = pulido.
Cada fase termina con `npm run build`, revisión en 375/768/1280 px y teclado (DoD de `AGENTS.md`).

### Fase 1 — Correcciones rápidas (P0) · ~1 día

| # | Acción | Archivos | Resultado esperado |
| --- | --- | --- | --- |
| 1.1 | Corregir `id` duplicado `home-ver-inmuebles` (renombrar el segundo, p. ej. `home-consultar-inmuebles-whatsapp`) y avisar a quien gestione GTM. | `src/pages/index.astro` | IDs únicos; métricas de clic separadas. |
| 1.2 | Alinear etiqueta y destino de "Ver inmuebles disponibles" (ir a `/inmuebles/` o renombrar a "Consultar inmuebles por WhatsApp"). | `index.astro`, `arrendatarios.astro` | El usuario sabe a dónde lo lleva cada botón. |
| 1.3 | Cambiar `accent-color` de filtros a `--color-primary`. | `inmuebles.css:591` | Checkbox legible. |
| 1.4 | Añadir `noreferrer` a los 12 enlaces externos. | páginas y `SiteHeader.astro` | Cumple `AGENTS.md`. |
| 1.5 ✅ | Reemplazar los 7 `alt="Amaru FS Inmobiliaria"` por descripciones reales o `alt=""`. | páginas con hero | **Hecho con `PageHero` (12/11/2026):** imágenes del panel marcadas como decorativas (`alt=""`). |

### Fase 2 — Fundamentos: tokens y tipografía (P1) · ~2–3 días

| # | Acción | Archivos | Resultado esperado |
| --- | --- | --- | --- |
| 2.1 | Añadir a `:root` los 12 tokens de apoyo de la guía §2.2 (solo valores existentes) + `--font-*`, `--shadow-sm/md/lg`, `--space-*`, `--duration-*`. | `tokens.css` | Fuente única de verdad. |
| 2.2 | Reemplazar hex y `rgba` literales por tokens; consolidar los 8 valores casi duplicados. | `styles/pages/*.css` | 0 hex fuera de `tokens.css` (verificable con `grep`). |
| 2.3 | Reemplazar `"Bebas Neue", Impact, sans-serif` literal por `var(--font-title)`. | 28 reglas | Consistencia. |
| 2.4 | **Requiere aprobación:** cargar Outfit 600 y 700 (misma familia ya usada, licencia OFL) en `.woff2`; convertir los dos `.woff` actuales a `.woff2`. Mientras tanto, cambiar 800/900 → 700. | `public/fonts`, `tokens.css`, `BaseLayout.astro` | Negritas nítidas sin fuentes nuevas. |
| 2.5 | Aplicar la escala tipográfica de 10 niveles (guía §3.3) con `clamp()`; subir 11–12 px a 13 px. | todas las hojas | De 47 a ~12 tamaños. |
| 2.6 | Unificar radio de botones a `--radius` y duraciones a 180/220/520 ms. | `utilities.css`, páginas | Botones idénticos en todo el sitio. |

### Fase 3 — Componentes reutilizables (P1) · ~6–8 días

Regla: toda pieza del inventario §2.7 pasa a ser un componente en `src/components/` con su CSS en `src/styles/components/` (guía §7.0). Se migra **un componente a la vez**, en todas las páginas que lo usan, borrando el HTML y el CSS duplicados en el mismo cambio. Después de cada componente: `npm run build` + revisión visual de las páginas afectadas.

Orden recomendado (de mayor a menor reutilización y riesgo bajo primero):

| # | Componente | Carpeta | Páginas a migrar | Notas |
| --- | --- | --- | --- | --- |
| 3.0 | Crear carpetas `components/ui`, `components/sections`, `components/property`, `styles/components`, `scripts/components`. | — | — | Base de la estructura. |
| 3.1 ✅ | `Button` | `ui/` | 8 | **Hecho (12/11/2026).** 30 botones migrados; CSS único en `styles/components/button.css`; ~530 líneas de CSS duplicado eliminadas de `utilities.css` y las 8 hojas de página; los enlaces externos ahora llevan `rel="noopener noreferrer"`. Los botones que eran `.btn--primary` pero se veían verde menta (hero y ficha) pasaron a `variant="secondary"`, sin cambio visual. |
| 3.2 ✅ | `SectionHeading` | `ui/` | 8 | **Hecho (12/11/2026).** 31 encabezados migrados; CSS en `styles/components/section-heading.css`; `.eyebrow` unificado en `utilities.css` (13 px / 700) y eliminadas sus 8 copias. Unificaciones visibles: ancho base 780 px en todo el sitio (antes 720 en inicio/inmuebles y 820 en la ficha), variante `wide` 980 px en referidos (antes 940/980) y descripción siempre en `--color-muted` (el buscador de inmuebles la tenía en `--color-text`). |
| 3.3 ✅ | `FaqSection` | `sections/` | 8 | **Hecho (12/11/2026).** 39 preguntas en 8 páginas; el acordeón y el JSON-LD `FAQPage` salen del mismo arreglo (verificado en `dist/`: 8/8 páginas coinciden). Se corrigieron 6 respuestas cuyo schema no coincidía con el texto visible (inicio, referidos, arriendo) tomando el texto visible como fuente, y en `/propietarios/` se hizo visible la pregunta "¿Garantiza el cierre?", que solo existía en el schema. Se agregó `aria-controls`, el JS pasó a `scripts/components/faq.js` y se eliminaron ~10 reglas de CSS duplicadas por página. Se quitó `.faq-item.reveal { transform: translateY(18px) }` de inicio e inmuebles, que dejaba las preguntas sin terminar su animación de entrada. |
| 3.4 ✅ | `PageHero` | `sections/` | 7 | **Hecho (12/11/2026).** 7 heroes migrados; CSS único en `styles/components/page-hero.css`; ~29 selectores eliminados por hoja de página (incluidos los `h1` sueltos en media queries). Unificado: una columna desde 1100 px (inicio e inmuebles usaban 1020), H1 de 62 px en tablet (antes 60 en inicio/inmuebles), lead de 760 px (antes 720 en inicio/inmuebles) y H2 del panel de 38 px (antes 39 en propietarios). Se eliminó un degradado que nunca se veía (lo anulaba `background-image`) y se añadió `--color-primary` como respaldo mientras carga la imagen. Las 7 imágenes del panel quedaron con `alt=""` (decorativas). **Pendiente:** pasar la imagen de fondo a `<img fetchpriority="high">` o `preload` para mejorar LCP (requiere medir antes con Lighthouse). |
| 3.5 ✅ | `ClosingCta` | `sections/` | 6 | **Hecho (12/11/2026).** 6 cierres migrados (5 `.closing` + el `.referrals` de `/inmuebles/`, que era el mismo bloque con otro nombre; referidos no tenía cierre). CSS único en `styles/components/closing-cta.css`; eliminadas las copias de 6 hojas y las reglas `.referrals` sin uso de `home.css`. Variante `flat` (sin borde) para la ficha. Corregido: el botón ya no se encoge, así que su etiqueta no se parte en dos líneas (antes 79 px de alto a 1024 px, ahora 54 px). Unificado: ancho del texto 820 px (inmuebles usaba 760). |
| 3.6 ✅ | `Timeline` | `sections/` | 6 | **Hecho (12/11/2026), junto con `ProcessPhases` (3.9).** 12 timelines migradas a datos (propietarios, referidos ×2, arrendatarios, venta, arriendo, ficha); CSS único en `styles/components/timeline.css`; ~136 selectores eliminados de 8 hojas, incluido CSS sin uso en `home.css` e `inmuebles.css`. **Accesibilidad:** el número del paso pasó de verde menta (1.7:1 sobre `#fbfcff`, no cumple) a `--color-primary`; el ícono decorativo quedó en verde. Unificado: todas las tarjetas con padding 24 px, alto mínimo 220 px (antes 270–280 en las de 5 columnas), sombra `sm` y elevación al pasar el cursor (antes solo en las de fases); un solo estilo de enlace (subrayado verde; antes había dos y uno se volvía verde al pasar el cursor, sin contraste). Responsive: 3 columnas → 2 desde 1100 px en todas (venta/arriendo pasaban a 1 columna; la ficha cambiaba en 900 px). |
| 3.7 | `InfoBox` | `sections/` | 6 | Unifica `trust__box` y `transparency__box`. |
| 3.8 | `Card` (base + variantes `route`, `service`, `audience`) | `ui/` | inicio, propietarios, venta, arriendo | Una sola base de borde, radio, sombra y hover. |
| 3.9 | `ChecklistGroup` y `ProcessPhases` | `sections/` | 3 + 3 | **`ProcessPhases` ✅ hecho con 3.6:** 4 bloques de fases (arrendatarios, venta, arriendo y `.info-phases` de referidos, que era el mismo bloque con otro nombre); numeración continua automática entre fases y última fase resaltada. Pendiente: `ChecklistGroup`. |
| 3.10 | `CommissionSummary` | `sections/` | venta, arriendo | — |
| 3.11 | `PropertyCard` (+ `PropertyFeatures`, `PropertyPrice`, `Badge`) | `property/`, `ui/` | inmuebles, ficha (relacionados) | `related-card` pasa a `variant="compact"`. Mismos datos y formato de precio en listado y ficha. |
| 3.12 | `Pagination` + `EmptyState` | `ui/` | inmuebles | Marcado en Astro + `scripts/components/pagination.js` reutilizable para futuros listados (blog, proyectos). |
| 3.13 | Mover `.section-pad`, `.reveal` y `prefers-reduced-motion` a `utilities.css`; borrar duplicados en las 8 hojas. | — | 8 | El CSS de página queda solo con layout propio de esa página. |
| 3.14 | Actualizar el catálogo de la guía (§7.0) marcando ✅ cada componente creado. | `docs/GUIA-UI-UX.md` | — | La IA siempre sabe qué existe. |

Resultado esperado de la fase: las páginas `.astro` quedan como composición de componentes con datos; los CSS de página se reducen de forma importante (hoy suman ~8.500 líneas) y un cambio visual se hace en un solo archivo.

### Fase 4 — Accesibilidad y navegación (P1) · ~2 días

| # | Acción | Archivos | Resultado esperado |
| --- | --- | --- | --- |
| 4.1 | Añadir enlace "Saltar al contenido" y `scroll-padding-top` según altura del header. | `BaseLayout.astro`, `tokens.css` | Navegación por teclado más rápida; foco no oculto (WCAG 2.4.11). |
| 4.2 | Menú móvil: `aria-label` dinámico (Abrir/Cerrar), cierre con `Esc`, foco al primer enlace y retorno al botón; submenú operable con teclado. | `SiteHeader.astro`, `site-interactions.js` | Menú accesible. |
| 4.3 | Foco visible sobre fondos claros con `outline-color: var(--color-primary)`; revisar los 5 `outline: none/0` y asegurar reemplazo. | `tokens.css`, `detalle-inmueble.css`, `inmuebles.css`, `referidos.css` | Foco ≥ 3:1 en todo el sitio. |
| 4.4 | Revisar las 34 reglas `color: var(--color-secondary)` y cambiar las que estén sobre fondo claro. | CSS de páginas | 0 textos verdes sobre blanco. |
| 4.5 | `aria-live="polite"` en el contador de resultados de `/inmuebles/`. | `inmuebles.astro` | Lectores de pantalla anuncian cambios de filtro. |
| 4.6 | Auditoría con Lighthouse/axe en las 8 rutas, en móvil y desktop; registrar resultados. | — | Línea base medible. |

### Fase 5 — Rendimiento e imágenes (P2) · ~2 días

| # | Acción | Archivos | Resultado esperado |
| --- | --- | --- | --- |
| 5.1 | Sustituir Font Awesome completo por CDN por un subconjunto local de los ~35 íconos usados (SVG sprite o kit). | `BaseLayout.astro`, `site.ts` | −70 KB aprox. y sin dependencia externa bloqueante. |
| 5.2 | Mover el `style` inline de `index.astro:150` a CSS con colores de la paleta. | `index.astro`, `home.css` | Sin colores fuera de paleta. |
| 5.3 | Revisar peso de imágenes en `public/images` (objetivo: hero ≤ 200 KB, cards ≤ 80 KB). | `public/images` | Mejor LCP. |
| 5.4 | Migrar breakpoints 1020/1180 → 1100 y espaciados fuera de escala. | CSS de páginas | Comportamiento responsive predecible. |

### Fase 6 — Gobierno y mejora continua (P3) · continuo

| # | Acción | Resultado esperado |
| --- | --- | --- |
| 6.1 | Añadir un script `npm run lint:ui` (grep simple) que falle si aparece un hex fuera de `tokens.css`, `font-family` literal o `outline: none`. | La IA y las personas no pueden romper la guía sin darse cuenta. |
| 6.2 | Página interna no indexable `/estilos/` (excluida del sitemap) que muestre tokens, botones, cards y formularios. | Catálogo vivo para revisar cambios. |
| 6.3 | Revisión UX de la ficha de inmueble con usuarios reales (5 personas): precio, ubicación, fotos y CTA de WhatsApp. | Decisiones basadas en evidencia. |
| 6.4 | Evaluar mapa junto a resultados en `/inmuebles/` cuando haya más inmuebles (Baymard lo identifica como convención en búsqueda de inmuebles). | Mejor relevancia de búsqueda. |

---

## 4. Indicadores de éxito

| Indicador | Hoy | Meta |
| --- | --- | --- |
| Hex fuera de `tokens.css` | 28 valores | 0 |
| Tamaños de fuente distintos | 47 | ≤ 12 |
| Bloques `.btn` duplicados en páginas | ~110 | 0 |
| Componentes reutilizables | 4 | ≥ 20 (catálogo §7.0 de la guía) |
| Piezas con HTML/CSS copiado entre páginas | 17 | 0 |
| Breakpoints distintos | 7 | 4 |
| `alt` genéricos | 7 | 0 |
| `id` duplicados | 1 | 0 |
| Lighthouse Accesibilidad (móvil) | sin medir | ≥ 95 |
| LCP móvil | sin medir | < 2.5 s |
