import { site } from "../data/site";
import type { Property, PropertyOperation, PropertyPhoto } from "../data/properties";

export function formatCurrency(value?: number) {
  if (!value) {
    return "";
  }

  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);

  return `${formattedValue} COP`;
}

export function includesSale(operation: PropertyOperation) {
  return operation === "venta" || operation === "venta-arriendo";
}

export function includesRent(operation: PropertyOperation) {
  return operation === "arriendo" || operation === "venta-arriendo";
}

/**
 * Precio principal del inmueble. En "venta-arriendo" se usa el canon, que es el
 * valor comparable en filtros y tarjetas; el valor de venta se lee aparte.
 */
export function getPropertyPrice(property: Property) {
  return property.operation === "venta" ? property.saleValue : property.rentValue;
}

export function getPriceLabel(operation: PropertyOperation) {
  return operation === "venta" ? "Valor venta" : "Canon de arrendamiento";
}

export function getOperationLabel(operation: PropertyOperation) {
  if (operation === "venta-arriendo") return "Venta o arriendo";
  return operation === "venta" ? "Venta" : "Arriendo";
}

/**
 * Precios visibles según la operación: uno para venta o arriendo, dos para venta-arriendo.
 */
export function getPropertyPrices(property: Property) {
  const prices: { kind: "venta" | "arriendo"; label: string; value: number }[] = [];

  if (includesSale(property.operation) && property.saleValue) {
    prices.push({ kind: "venta", label: "Valor venta", value: property.saleValue });
  }

  if (includesRent(property.operation) && property.rentValue) {
    prices.push({ kind: "arriendo", label: "Canon de arrendamiento", value: property.rentValue });
  }

  return prices;
}

/** Valor para data-operation en el listado: "venta-arriendo" coincide con ambos filtros. */
export function getListingOperationFilterText(operation: PropertyOperation) {
  return operation === "venta-arriendo" ? "venta arriendo" : operation;
}

export function getPropertyTypeLabel(propertyType: string) {
  return toCapitalLabel(propertyType);
}

export function getPropertyLocationLabel(property: Property) {
  return [toLocationLabel(property.locationLabel), property.neighborhoodLabel]
    .filter(Boolean)
    .join(" - ");
}

export function renderRichText(value: string) {
  const normalizedValue = value.replace(/\r\n?/g, "\n").trim();

  if (!normalizedValue) {
    return "";
  }

  const blocks = normalizedValue.split(/\n{2,}/);

  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => /^([-*]|\d+\.)\s+/.test(line));

      if (isList) {
        const tag = lines.every((line) => /^\d+\.\s+/.test(line)) ? "ol" : "ul";
        const items = lines
          .map((line) => line.replace(/^([-*]|\d+\.)\s+/, ""))
          .map((line) => `<li>${renderInlineMarkdown(line)}</li>`)
          .join("");

        return `<${tag}>${items}</${tag}>`;
      }

      return `<p>${lines.map(renderInlineMarkdown).join("<br>")}</p>`;
    })
    .join("");
}

export function getPropertyHref(property: Property) {
  return `/inmuebles/${property.slug}/`;
}

export function getPropertyUrl(property: Property) {
  return new URL(getPropertyHref(property), site.baseUrl).toString();
}

const cloudinaryUploadSegment = "/image/upload/";

/**
 * Agrega transformaciones de Cloudinary (formato y calidad automáticos, ancho máximo)
 * solo cuando la URL es de Cloudinary y aún no trae transformaciones propias.
 */
export function getOptimizedImageUrl(src: string, width: number, extra = "") {
  try {
    const url = new URL(src);
    const uploadIndex = url.pathname.indexOf(cloudinaryUploadSegment);

    if (url.hostname !== "res.cloudinary.com" || uploadIndex === -1) {
      return src;
    }

    const prefix = url.pathname.slice(0, uploadIndex + cloudinaryUploadSegment.length);
    const rest = url.pathname.slice(prefix.length);
    const firstSegment = rest.split("/")[0] ?? "";
    const hasTransformations = !/^v\d+$/.test(firstSegment) && /(^|,)[a-z]{1,3}_/.test(firstSegment);

    if (hasTransformations) {
      return src;
    }

    const transformations = extra || `f_auto,q_auto,c_limit,w_${Math.round(width)}`;
    url.pathname = `${prefix}${transformations}/${rest}`;
    return url.toString();
  } catch {
    return src;
  }
}

/**
 * Recorte 4:3 hecho por Cloudinary (g_auto elige el encuadre) con calidad "eco".
 * Coincide con los contenedores 4:3 de galería, tarjetas y relacionados, así no se
 * descargan píxeles que object-fit: cover iba a ocultar.
 */
export function getCroppedImageUrl(src: string, width: number, aspectRatio = "4:3") {
  return getOptimizedImageUrl(src, width, `f_auto,q_auto:eco,c_fill,ar_${aspectRatio},g_auto,w_${Math.round(width)}`);
}

export function getImageSrcset(
  src: string,
  widths: number[],
  buildUrl: (src: string, width: number) => string = getOptimizedImageUrl
) {
  const candidates = widths.map((width) => ({ width, url: buildUrl(src, width) }));

  if (candidates.every((candidate) => candidate.url === src)) {
    return undefined;
  }

  return candidates.map((candidate) => `${candidate.url} ${candidate.width}w`).join(", ");
}

export function getSocialImageUrl(src: string) {
  return getOptimizedImageUrl(src, 1200, "f_jpg,q_auto,c_fill,g_auto,w_1200,h_630");
}

/**
 * Ubicación legible para textos generados: "Barrio, Municipio" o "Municipio, Departamento".
 */
export function getPropertyPlaceLabel(property: Property) {
  const address = getPropertyPostalAddress(property);
  const neighborhood = property.neighborhoodLabel?.trim();
  const locality = "addressLocality" in address ? address.addressLocality : undefined;

  if (locality && neighborhood && locality !== neighborhood) {
    return `${neighborhood}, ${locality}`;
  }

  return [locality ?? neighborhood, address.addressRegion].filter(Boolean).join(", ");
}

export function getPropertyHeading(property: Property) {
  const typeLabel = getPropertyTypeLabel(property.propertyType);
  return `${typeLabel} en ${getOperationLabel(property.operation).toLowerCase()} en ${getPropertyPlaceLabel(property)}`;
}

/**
 * Texto alternativo de cada foto. Usa el texto definido en Strapi cuando es propio
 * de la foto; si solo repite el título, genera una descripción con tipo, operación,
 * ubicación y posición de la foto.
 */
export function getPhotoAlt(property: Property, photo: PropertyPhoto, index: number) {
  const customAlt = photo.alt?.trim();

  if (customAlt && normalizeFilterText(customAlt) !== normalizeFilterText(property.title)) {
    return customAlt;
  }

  return `${getPropertyHeading(property)}, foto ${index + 1} de ${property.gallery.length}`;
}

function getFeatureNumber(property: Property, pattern: RegExp) {
  const feature = property.features.find((item) => pattern.test(normalizeFilterText(item.label)));
  const rawValue = feature?.filterValue ?? feature?.label.match(/\d+(?:[.,]\d+)?/)?.[0];
  const value = Number(String(rawValue ?? "").replace(",", "."));

  return Number.isFinite(value) && value > 0 ? value : undefined;
}

export function getPropertyFacts(property: Property) {
  const areaFeature = property.features.find((item) => /area/.test(normalizeFilterText(item.label)));
  const areaMatch = areaFeature && !/\dx|x\s*\d/i.test(areaFeature.label)
    ? areaFeature.label.match(/\d+(?:[.,]\d+)?/)
    : null;
  const area = areaMatch ? Number(areaMatch[0].replace(",", ".")) : undefined;

  return {
    area: area && Number.isFinite(area) ? area : undefined,
    bedrooms: getFeatureNumber(property, /alcoba|habitacion/),
    bathrooms: getFeatureNumber(property, /bano/)
  };
}

function formatArea(value: number) {
  return `${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 2 }).format(value)} m²`;
}

/**
 * Resumen autocontenido del inmueble (tipo, ubicación, espacios, área y precio)
 * pensado para lectura rápida y para citación por buscadores con IA.
 */
export function getPropertyAnswerSummary(property: Property) {
  const facts = getPropertyFacts(property);
  const details = [
    facts.bedrooms ? `${facts.bedrooms} ${facts.bedrooms === 1 ? "alcoba" : "alcobas"}` : "",
    facts.bathrooms ? `${facts.bathrooms} ${facts.bathrooms === 1 ? "baño" : "baños"}` : "",
    facts.area ? formatArea(facts.area) : ""
  ].filter(Boolean);
  const detailsText = details.length
    ? `, con ${details.length > 1 ? `${details.slice(0, -1).join(", ")} y ${details.at(-1)}` : details[0]}`
    : "";
  const priceText = getPropertyPrices(property)
    .map((item) =>
      item.kind === "venta"
        ? `Valor de venta: ${formatCurrency(item.value)}.`
        : `Canon mensual: ${formatCurrency(item.value)}${property.administrationIncluded ? ", administración incluida" : ""}.`
    )
    .join(" ");

  return `${getPropertyHeading(property)}${detailsText}. ${priceText}`;
}

/**
 * Extrae coordenadas del embed de Google Maps (mapa normal o Street View).
 * Solo devuelve valores dentro del rango geográfico de Colombia.
 */
export function getMapCoordinates(embedSrc: string) {
  if (!embedSrc) {
    return undefined;
  }

  const placeMatch = embedSrc.match(/!2d(-?\d+(?:\.\d+)?)!3d(-?\d+(?:\.\d+)?)/);
  const streetViewMatch = embedSrc.match(/!1d(-?\d+(?:\.\d+)?)!2d(-?\d+(?:\.\d+)?)!3f/);
  const latitude = Number(placeMatch?.[2] ?? streetViewMatch?.[1]);
  const longitude = Number(placeMatch?.[1] ?? streetViewMatch?.[2]);
  const isInColombia = latitude > -5 && latitude < 14 && longitude > -82 && longitude < -66;

  return Number.isFinite(latitude) && Number.isFinite(longitude) && isInColombia
    ? { latitude: Number(latitude.toFixed(5)), longitude: Number(longitude.toFixed(5)) }
    : undefined;
}

const departmentLabels: Record<string, string> = {
  cundinamarca: "Cundinamarca",
  meta: "Meta",
  boyaca: "Boyacá",
  tolima: "Tolima",
  huila: "Huila"
};

const municipalityDepartments: Record<string, string> = {
  bogota: "Bogotá D.C.",
  "bogota d c": "Bogotá D.C.",
  tocancipa: "Cundinamarca",
  zipaquira: "Cundinamarca",
  "mesitas del colegio": "Cundinamarca",
  villavicencio: "Meta"
};

/**
 * Dirección estructurada para JSON-LD: municipio en addressLocality y
 * departamento en addressRegion, sin exponer dirección exacta.
 */
export function getPropertyPostalAddress(property: Property) {
  const location = normalizeFilterText(property.locationLabel);
  const neighborhood = property.neighborhoodLabel?.trim();

  if (departmentLabels[location]) {
    return {
      "@type": "PostalAddress",
      ...(neighborhood ? { addressLocality: neighborhood } : {}),
      addressRegion: departmentLabels[location],
      addressCountry: "CO"
    };
  }

  const isBogota = location.startsWith("bogota");

  return {
    "@type": "PostalAddress",
    addressLocality: isBogota ? "Bogotá" : toLocationLabel(property.locationLabel),
    ...(municipalityDepartments[location] ? { addressRegion: municipalityDepartments[location] } : {}),
    addressCountry: "CO"
  };
}

export function getRelatedProperties(property: Property, properties: Property[], limit = 3) {
  const others = properties.filter((item) => item.slug !== property.slug);
  const score = (item: Property) =>
    (item.operation === property.operation ||
    (includesSale(item.operation) && includesSale(property.operation)) ||
    (includesRent(item.operation) && includesRent(property.operation))
      ? 2
      : 0) +
    (normalizeFilterText(item.locationLabel) === normalizeFilterText(property.locationLabel) ? 1 : 0) +
    (item.propertyType === property.propertyType ? 1 : 0);

  return others
    .map((item, index) => ({ item, index, score: score(item) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getPropertyWhatsappHref(property: Property) {
  const message = `Hola Amaru FS, estoy interesado/a en el inmueble ${property.title}${
    property.internalCode ? ` con código ${property.internalCode}` : ""
  }. Quiero confirmar disponibilidad, precio y próximos pasos.`;

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getFeatureIconClass(icon?: string) {
  const normalizedIcon = String(icon || "").trim();
  const iconAliases: Record<string, string> = {
    area: "ruler-combined",
    bath: "bath",
    bed: "bed",
    kitchen: "kitchen-set",
    parking: "square-parking",
    sofa: "couch",
  };

  if (!normalizedIcon) {
    return "fa-solid fa-circle-check";
  }

  if (normalizedIcon.split(/\s+/).some((className) => /^fa-(solid|regular|brands|light|duotone|thin|sharp)$/.test(className))) {
    return normalizedIcon;
  }

  const iconName = iconAliases[normalizedIcon] || normalizedIcon;

  if (/^[a-z0-9-]+$/.test(iconName)) {
    return `fa-solid fa-${iconName}`;
  }

  return "fa-solid fa-circle-check";
}

export function extractGoogleMapsSrc(value: string) {
  const match = value.match(/src=["']([^"']+)["']/i);
  const rawSrc = match?.[1] ?? value;

  try {
    const url = new URL(rawSrc);
    if (url.hostname === "www.google.com" && url.pathname.startsWith("/maps/embed")) {
      return url.toString();
    }
  } catch {
    return "";
  }

  return "";
}

export function getYoutubeEmbedSrc(value?: string) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    const shortId = url.pathname.match(/\/shorts\/([^/?#]+)/)?.[1];
    const watchId = url.searchParams.get("v");
    const youtuBeId = url.hostname === "youtu.be" ? url.pathname.replace("/", "") : "";
    const videoId = shortId || watchId || youtuBeId;

    if (!videoId) {
      return "";
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return "";
  }
}

export function getListingSearchText(property: Property) {
  return [
    property.title,
    getOperationLabel(property.operation),
    property.propertyType,
    property.locationLabel,
    property.neighborhoodLabel,
    property.internalCode,
    ...property.features.map((feature) => feature.label),
    ...property.nearbyZones
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getListingLocationFilterText(property: Property) {
  return normalizeFilterText([property.title, property.locationLabel, property.neighborhoodLabel, ...property.nearbyZones].join(" "));
}

export function getListingRoomsFilterText(property: Property) {
  const roomsFeature = property.features.find((feature) => {
    const text = `${feature.label} ${feature.icon}`.toLowerCase();
    return text.includes("alcoba") || text.includes("habitaci") || text.includes("fa-bed");
  });
  const rawRooms = roomsFeature?.filterValue ?? roomsFeature?.label.match(/\d+/)?.[0];
  const rooms = Number(rawRooms);

  if (!Number.isFinite(rooms) || rooms <= 0) {
    return "por-confirmar";
  }

  return rooms >= 4 ? "4" : String(rooms);
}

function normalizeFilterText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toCapitalLabel(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase("es-CO") + word.slice(1).toLocaleLowerCase("es-CO"))
    .join(" ");
}

function toLocationLabel(value: string) {
  const normalizedValue = normalizeFilterText(value);
  const knownLocations = {
    bogota: "Bogotá",
    "bogota d c": "Bogotá D.C.",
    zipaquira: "Zipaquirá",
    tocancipa: "Tocancipá",
  };

  return knownLocations[normalizedValue] || toCapitalLabel(value);
}

function renderInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
