import { site } from "../data/site";
import type { Property, PropertyOperation } from "../data/properties";

export function formatCurrency(value?: number) {
  if (!value) {
    return "";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

export function getPropertyPrice(property: Property) {
  return property.operation === "venta" ? property.saleValue : property.rentValue;
}

export function getPriceLabel(operation: PropertyOperation) {
  return operation === "venta" ? "Valor venta" : "Canon";
}

export function getOperationLabel(operation: PropertyOperation) {
  return operation === "venta" ? "Venta" : "Arriendo";
}

export function getPropertyHref(property: Property) {
  return `/inmuebles/${property.slug}/`;
}

export function getPropertyWhatsappHref(property: Property) {
  const message = `Hola Amaru FS, estoy interesado/a en el inmueble ${property.title}${
    property.internalCode ? ` con código ${property.internalCode}` : ""
  }. Quiero confirmar disponibilidad, precio y próximos pasos.`;

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
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
    property.operation,
    property.propertyType,
    property.locationLabel,
    property.description,
    ...property.features.map((feature) => feature.label),
    ...property.nearbyZones
  ]
    .join(" ")
    .toLowerCase();
}

export function getListingLocationFilterText(property: Property) {
  return normalizeFilterText([property.locationLabel, ...property.nearbyZones].join(" "));
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
