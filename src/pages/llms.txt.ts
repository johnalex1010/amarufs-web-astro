import { site } from "../data/site";
import { getPublishedProperties } from "../lib/properties";
import {
  getPropertyAnswerSummary,
  getPropertyPostalAddress,
  getPropertyUrl
} from "../lib/property-utils";

const mainPages = [
  ["Inicio", "/", "Resumen de servicios para propietarios, arrendatarios y compradores."],
  ["Inmuebles disponibles", "/inmuebles/", "Listado de propiedades publicadas para arriendo y venta."],
  ["Propietarios", "/propietarios/", "Proceso para publicar, vender o arrendar un inmueble con Amaru FS Inmobiliaria."],
  ["Propietarios venta", "/propietarios/venta/", "Información para propietarios que quieren vender un inmueble."],
  ["Propietarios arriendo", "/propietarios/arriendo/", "Información para propietarios que quieren arrendar un inmueble."],
  ["Arrendatarios", "/arrendatarios/", "Requisitos y pasos para consultar inmuebles en arriendo."]
];

// Texto plano en una sola línea, sin saltos ni corchetes que rompan el Markdown.
function toPlainLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/[[\]]/g, "").replace(/\s+/g, " ").trim();
}

export async function GET() {
  const properties = await getPublishedProperties();
  const zones = [
    ...new Set(
      properties
        .map((property) => getPropertyPostalAddress(property))
        .map((address) => ("addressLocality" in address ? address.addressLocality : address.addressRegion))
        .filter(Boolean)
    )
  ];
  const phone = site.whatsapp.replace(/^57(\d{3})(\d{3})(\d{4})$/, "+57 $1 $2 $3");
  const propertyLines = properties.map((property) => {
    const code = property.internalCode ? ` Código ${toPlainLine(property.internalCode)}.` : "";
    return `- [${toPlainLine(property.title)}](${getPropertyUrl(property)}): ${toPlainLine(getPropertyAnswerSummary(property))}${code}`;
  });

  const body = `# ${site.name}
> Inmobiliaria en Colombia enfocada en arriendo, venta y publicación de inmuebles con información validada, fotos reales y atención directa por WhatsApp.

## Páginas principales
${mainPages.map(([name, path, text]) => `- [${name}](${new URL(path, site.baseUrl).toString()}): ${text}`).join("\n")}

## Inmuebles publicados
${propertyLines.length ? propertyLines.join("\n") : "- No hay inmuebles publicados en este momento."}

## Información clave
- Marca: ${site.name}.
- País: Colombia.
- Zonas visibles en el inventario actual: ${zones.length ? zones.join(", ") : "por confirmar"}.
- Contacto principal: WhatsApp ${phone}.
- El inventario visible se publica con datos validados, fotos, características, ubicación general y precio.
- La disponibilidad y condiciones de cada inmueble deben confirmarse por WhatsApp antes de avanzar.
- En procesos de arriendo, la aseguradora realiza el estudio de viabilidad del interesado y su deudor.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
