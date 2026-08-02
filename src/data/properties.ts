export type EditorialStatus =
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

export const fallbackProperties: Property[] = [
  {
    title: "Apartamento en Bogotá - Conjunto El Roble",
    seoTitle: "Apartamento en arriendo en Bogotá El Roble",
    slug: "apartamento-en-arriendo-en-bogota-el-roble",
    editorialStatus: "borrador",
    operation: "arriendo",
    propertyType: "Apartamento",
    rentValue: 200000000,
    locationLabel: "Bogotá · Roble",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.7845846107243!2d-74.03931519999999!3d4.8070108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f862231b14d9b%3A0x2466a128ff31f688!2sBima!5e0!3m2!1ses-419!2sco!4v1785628817514!5m2!1ses-419!2sco",
    description:
      "Ficha base tomada de la maqueta de detalle de inmueble para validar la estructura editorial. Este registro no se publica hasta que Amaru FS confirme precio, disponibilidad, ubicación, fotos y condiciones comerciales.",
    summary:
      "Apartamento de referencia para validar el diseño y el contrato de datos antes de publicar inmuebles reales.",
    gallery: [
      {
        src: "/images/inmueble-roble.jpg",
        alt: "Apartamento en Bogotá Conjunto El Roble - imagen principal",
        width: 2000,
        height: 1500
      }
    ],
    features: [
      { label: "2 Alcobas", icon: "fa-solid fa-bed", filterValue: "2" },
      { label: "1 Baño", icon: "fa-solid fa-bath", filterValue: "1" },
      { label: "1 Sala / Comedor", icon: "fa-solid fa-couch" },
      { label: "1 Cocina", icon: "fa-solid fa-kitchen-set" },
      { label: "Área por confirmar", icon: "fa-solid fa-ruler-combined" },
      { label: "Piso por confirmar", icon: "fa-solid fa-building-user" }
    ],
    nearbyZones: ["Zona residencial", "Vías principales", "Comercio cercano"],
    internalCode: "AMR-ROB-001",
    metaDescription:
      "Consulta este apartamento en arriendo en Bogotá Roble con fotos, características, precio visible, ubicación y atención directa de Amaru FS Inmobiliaria."
  }
];

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
