import { site } from "../data/site";
import type { Property, PropertyOperation } from "../data/properties";

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

export function getPropertyPrice(property: Property) {
  return property.operation === "venta" ? property.saleValue : property.rentValue;
}

export function getPriceLabel(operation: PropertyOperation) {
  return operation === "venta" ? "Valor venta" : "Canon de arrendamiento";
}

export function getOperationLabel(operation: PropertyOperation) {
  return operation === "venta" ? "Venta" : "Arriendo";
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
    property.neighborhoodLabel,
    property.description,
    ...property.features.map((feature) => feature.label),
    ...property.nearbyZones
  ]
    .join(" ")
    .toLowerCase();
}

export function getListingLocationFilterText(property: Property) {
  return normalizeFilterText([property.locationLabel, property.neighborhoodLabel, ...property.nearbyZones].join(" "));
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
