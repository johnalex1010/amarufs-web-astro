import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "src", "data", "properties.ts");

async function loadEnvFile(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      process.env[key.trim()] ??= valueParts.join("=").trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    // El archivo local es opcional.
  }
}

await loadEnvFile(path.join(projectRoot, ".env.local"));
await loadEnvFile(path.resolve(projectRoot, "..", "property-cms", ".env"));

const strapiUrl = (process.env.STRAPI_URL || "http://127.0.0.1:1337").replace(/\/$/, "");
const token = process.env.STRAPI_API_TOKEN;

function getEntityData(entity) {
  if (!entity) return {};
  return entity.attributes ? { id: entity.id, documentId: entity.documentId, ...entity.attributes } : entity;
}

function getMediaItems(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(getEntityData);
  if (Array.isArray(value.data)) return value.data.map(getEntityData);
  return [];
}

function absoluteMediaUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  return `${strapiUrl}${url}`;
}

function normalizeGallery(gallery, title) {
  return getMediaItems(gallery)
    .map((asset) => ({
      src: absoluteMediaUrl(asset.url),
      alt: asset.alternativeText || asset.caption || title,
      width: asset.width,
      height: asset.height,
    }))
    .filter((photo) => Boolean(photo.src))
    .slice(0, 10);
}

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeProperty(entry) {
  const property = getEntityData(entry);
  const title = property.title || "";

  return {
    title,
    seoTitle: property.seoTitle || title,
    slug: typeof property.slug === "string" ? property.slug : property.slug?.current || "",
    editorialStatus: property.editorialStatus || "borrador",
    operation: property.operation,
    propertyType: property.propertyType || "",
    saleValue: normalizeNumber(property.saleValue),
    rentValue: normalizeNumber(property.rentValue),
    locationLabel: property.locationLabel || "",
    googleMapsEmbed: property.googleMapsEmbed || "",
    description: property.description || "",
    summary: property.summary || undefined,
    gallery: normalizeGallery(property.gallery, title),
    features: normalizeArray(property.features),
    nearbyZones: normalizeArray(property.nearbyZones),
    youtubeShortUrl: property.youtubeShortUrl || undefined,
    internalCode: property.internalCode || undefined,
    metaDescription: property.metaDescription || "",
  };
}

function validateProperty(property) {
  const errors = [];
  const price = property.operation === "venta" ? property.saleValue : property.rentValue;

  if (!property.title) errors.push("título");
  if (!property.seoTitle) errors.push("título SEO");
  if (!property.slug) errors.push("slug");
  if (!property.operation) errors.push("operación");
  if (!property.propertyType) errors.push("tipo de inmueble");
  if (!property.locationLabel) errors.push("ubicación");
  if (!property.googleMapsEmbed) errors.push("mapa");
  if (!property.description) errors.push("descripción");
  if (!property.metaDescription) errors.push("meta description");
  if (!Number.isFinite(price) || price <= 0) errors.push("precio");
  if (!property.gallery.length) errors.push("foto principal");
  if (property.gallery.length > 10) errors.push("máximo 10 fotos");

  return errors;
}

function renderPropertiesFile(properties) {
  return `export type EditorialStatus =
  | "borrador"
  | "en-validacion"
  | "publicado"
  | "reservado"
  | "vendido"
  | "arrendado"
  | "inactivo";

export type PropertyOperation = "arriendo" | "venta";

export interface PropertyPhoto {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PropertyFeature {
  label: string;
  icon: string;
  filterValue?: string;
}

export interface Property {
  title: string;
  seoTitle: string;
  slug: string;
  editorialStatus: EditorialStatus;
  operation: PropertyOperation;
  propertyType: string;
  saleValue?: number;
  rentValue?: number;
  locationLabel: string;
  googleMapsEmbed: string;
  description: string;
  summary?: string;
  gallery: PropertyPhoto[];
  features: PropertyFeature[];
  nearbyZones: string[];
  youtubeShortUrl?: string;
  internalCode?: string;
  metaDescription: string;
}

export const fallbackProperties: Property[] = ${JSON.stringify(properties, null, 2)};

export const visibleStatuses: EditorialStatus[] = ["publicado"];

export function getVisibleProperties(properties: Property[]) {
  return properties.filter((property) => {
    const price = property.operation === "venta" ? property.saleValue : property.rentValue;
    return (
      visibleStatuses.includes(property.editorialStatus) &&
      Boolean(property.slug) &&
      Boolean(property.title) &&
      Boolean(property.seoTitle) &&
      Boolean(property.description) &&
      Boolean(property.locationLabel) &&
      Boolean(property.gallery[0]?.src) &&
      typeof price === "number" &&
      price > 0
    );
  });
}
`;
}

const query = new URLSearchParams({
  "populate[gallery]": "true",
  "pagination[pageSize]": "100",
  "sort[0]": "updatedAt:desc",
});

const response = await fetch(`${strapiUrl}/api/inmuebles?${query.toString()}`, {
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

if (!response.ok) {
  throw new Error(`No fue posible consultar Strapi: ${response.status} ${response.statusText}`);
}

const payload = await response.json();
const properties = (payload.data || []).map(normalizeProperty);
const invalidProperties = properties
  .map((property) => ({ property, errors: validateProperty(property) }))
  .filter((item) => item.errors.length > 0 && item.property.editorialStatus === "publicado");

if (invalidProperties.length) {
  const details = invalidProperties
    .map((item) => `${item.property.title || "Sin título"}: falta ${item.errors.join(", ")}`)
    .join("\n");
  throw new Error(`Hay inmuebles publicados incompletos:\n${details}`);
}

await writeFile(outputPath, renderPropertiesFile(properties), "utf8");
console.info(`Inmuebles exportados desde Strapi: ${properties.length}`);
