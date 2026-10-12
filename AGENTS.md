# AGENTS.md

Gobernanza local obligatoria para agentes de IA que trabajen en `web-astro`.

## Autoridad

Este archivo es la referencia principal dentro de `web-astro`. Si existe una contradicción con reglas globales, prevalece esta gobernanza local siempre que no reduzca seguridad, privacidad ni estabilidad.

## Stack verificado

- Framework: Astro 5.
- Rendering: sitio estático (`output: "static"`).
- Integración: React mediante `@astrojs/react`.
- Package manager: npm con `package-lock.json`.
- Build: `npm run build`.
- Desarrollo local: `npm run dev`.
- Exportación de inmuebles: `npm run properties:pull`, desde Strapi local en `../property-cms`.

## Reglas de edición

- Trabajar solo sobre archivos fuente: `src/`, `public/`, `scripts/`, documentación y configuración.
- No editar manualmente `dist/`, `.astro/`, minificados ni artefactos generados.
- Mantener contenido textual en Español Colombia (`es-CO`) y UTF-8.
- No agregar dependencias sin justificación técnica y actualización del `README.md`.
- No enviar formularios ni ejecutar flujos reales de contacto sin autorización explícita.
- Usar datos simulados en validaciones de formularios, filtros o búsquedas.
- Mantener cambios mínimos, reversibles y alineados con la arquitectura existente.

## Seguridad

- Nunca guardar ni exponer secretos, tokens, llaves privadas, credenciales de Strapi, Cloudinary, Vercel o proveedores externos.
- Mantener `.env`, `.env.*` y credenciales fuera de Git, excepto plantillas explícitas como `.env.example`.
- Tratar todos los datos provenientes de Strapi, formularios, parámetros de URL, JSON, imágenes, iframes y servicios externos como datos no confiables.
- Validar y sanitizar cualquier dato antes de renderizarlo o exportarlo hacia `src/data/properties.ts`.
- Evitar `innerHTML`, inyección de HTML arbitrario, listeners globales innecesarios y exposición de tokens en frontend.
- Todo enlace externo debe usar `rel="noopener noreferrer"` cuando abra nueva pestaña.
- Los iframes de mapas o videos deben mantenerse acotados a proveedores esperados y no deben aceptar HTML libre.
- No ejecutar pruebas que contacten clientes, CRM, WhatsApp, formularios reales o servicios externos sin autorización explícita.
- Si un cambio toca captura de datos, formularios, tracking, CMS, media library, despliegue o integraciones, clasificarlo como cambio sensible y documentar riesgos.

## Buenas prácticas

- Antes de modificar, identificar archivo fuente, ruta afectada, dependencia de datos y salida generada.
- Preferir componentes, utilidades y patrones existentes sobre nuevas abstracciones.
- Mantener HTML semántico, jerarquía H1-H2-H3 consistente y landmarks correctos.
- Mantener CSS responsive sin overflow horizontal y sin `!important` salvo justificación excepcional.
- Mantener JavaScript defensivo: validar existencia de elementos, evitar errores si una sección no existe y no duplicar inicializaciones.
- Optimizar imágenes con dimensiones, `alt`, carga diferida cuando aplique y peso razonable.
- No introducir dependencias, CDNs o scripts de terceros sin evaluar seguridad, performance, SEO y privacidad.
- Todo texto visible debe conservar tono profesional, claridad comercial y Español Colombia.
- Todo cambio que afecte comandos, dependencias, variables, build, SEO, seguridad o flujos operativos debe actualizar `README.md`.

## SEO, GEO y AEO

- Mantener `site.baseUrl` como fuente canónica del dominio.
- Conservar canonical, metadatos sociales, robots y JSON-LD cuando aplique.
- Excluir rutas no indexables del sitemap, especialmente `/referidos/`.
- Mantener `public/robots.txt`, `public/llms.txt`, `public/llm.txt` y `src/pages/sitemap.xml.ts` coherentes entre sí.
- El sitemap debe publicar únicamente URLs canónicas, públicas e indexables.
- Cada página pública debe tener un H1 único, title, description, canonical y contenido suficiente para responder la intención de búsqueda.
- Las páginas de inmueble deben publicar precio, operación, ubicación, fotos, descripción, características y estado comercial verificable.
- No indexar páginas incompletas, duplicadas, privadas, experimentales o sin intención comercial clara.
- Mantener estructura legible para IA: encabezados descriptivos, bloques autocontenidos, FAQs reales y datos verificables.
- No prometer disponibilidad, tiempos de venta/arriendo, aprobación de aseguradora ni resultados comerciales sin evidencia.

## Auditorías

Ejecutar auditoría proporcional cuando el cambio afecte la página completa, SEO, performance, accesibilidad, seguridad o despliegue.

- Auditoría técnica: build, rutas generadas, consola, errores 404, enlaces internos y archivos públicos.
- Auditoría SEO: title, description, canonical, robots, sitemap, JSON-LD, H1, contenido duplicado y exclusión de rutas no indexables.
- Auditoría GEO/AEO: `llms.txt`, `llm.txt`, claridad de entidades, FAQs, respuestas escaneables y contexto verificable.
- Auditoría responsive: mobile, tablet y desktop.
- Auditoría accesibilidad: navegación por teclado, foco visible, textos alternativos, labels, contraste y jerarquía.
- Auditoría seguridad: secretos, HTML inyectado, enlaces externos, iframes, formularios y dependencias.
- Auditoría performance: peso de imágenes, JavaScript innecesario, CLS, LCP e interacción básica.
- Registrar limitaciones cuando no se use Lighthouse, Search Console, CrUX, producción o herramientas externas.

## Validación mínima

Antes de cerrar cambios, ejecutar según alcance:

- `npm run build`.
- Validar que `dist/sitemap.xml`, `dist/robots.txt`, `dist/llms.txt` y `dist/llm.txt` existen cuando el cambio toca SEO/GEO.
- Revisar XML del sitemap.
- Validar navegador local si el cambio afecta experiencia visual o interacción.
- Confirmar que no quedaron `console.log`, `debugger`, secretos ni cambios manuales en `dist/`.

## DDoD y DoD

Definition of Done documental:

- El cambio tiene SPEC proporcional.
- El alcance y los archivos modificados están claros.
- El `README.md` queda actualizado si cambian reglas, comandos, arquitectura o validaciones.
- Riesgos, rollback y limitaciones quedan documentados.

Definition of Done técnico:

- `npm run build` pasa.
- La página afectada carga en navegador local cuando el cambio es visual o funcional.
- No hay errores de consola relevantes.
- No hay overflow horizontal evidente en desktop, tablet y mobile cuando aplica.
- SEO/GEO/AEO no se degrada.
- Seguridad no se degrada.
- Accesibilidad básica no se degrada.
- No quedan logs, depuración, secretos, mocks accidentales ni código muerto.
- No se editaron artefactos generados manualmente.

## Rollback

- Cambios de documentación: revertir `AGENTS.md` o `README.md`.
- Cambios SEO/GEO: revertir `public/robots.txt`, `public/llms.txt`, `public/llm.txt` o `src/pages/sitemap.xml.ts` y reconstruir.
- Cambios de datos: restaurar `src/data/properties.ts` desde Git o volver a ejecutar `npm run properties:pull` con Strapi validado.
- Cambios visuales o funcionales: revertir únicamente los archivos fuente afectados y ejecutar build.

## README

Actualizar `README.md` cuando cambien arquitectura, comandos, dependencias, variables de entorno, build, testing, despliegue o reglas operativas.

