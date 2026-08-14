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
  rentBaseValue?: number;
  administrationValue?: number;
  rentValue?: number;
  administrationIncluded?: boolean;
  locationLabel: string;
  neighborhoodLabel?: string;
  googleMapsEmbed: string;
  description: string;
  summary?: string;
  gallery: PropertyPhoto[];
  features: PropertyFeature[];
  nearbyZones: string[];
  youtubeShortUrl?: string;
  transparencyImage?: PropertyPhoto;
  internalCode?: string;
  metaDescription: string;
}

export const fallbackProperties: Property[] = [
  {
    "title": "Venta casa en barrio Alcalá Sur",
    "seoTitle": "Venta casa en barrio Alcalá Sur",
    "slug": "venta-casa-en-barrio-alcala-sur",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "apartamento",
    "saleValue": 600000000,
    "administrationIncluded": false,
    "locationLabel": "Bogotá",
    "neighborhoodLabel": "Alcalá Sur",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9449864181006!2d-74.12701899999999!3d4.603873999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ecb9d97f3a1%3A0xff26bafded728b57!2sCl.%2031%20Sur%20%2351D-82%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1786745270926!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "¡Bienvenido a tu nuevo hogar! Te presentamos una espectacular casa de 114 m², ideal para familias que buscan comodidad y estilo. Esta encantadora propiedad ofrece un amplio espacio perfectamente distribuido, garantizando funcionalidad y confort en cada rincón.\n\nLa casa cuenta con:\n\nEspacios generosos: 4 amplias habitaciones, 2 baños completos, una sala de estar luminosa y acogedora, y una cocina equipada con todos los electrodomésticos necesarios.\nÁrea de lavado: Práctica y conveniente, para tu mayor comodidad.\nDiseño eficiente: Cada metro cuadrado ha sido aprovechado al máximo para brindarte un hogar práctico y acogedor.\nExcelente ubicación: Situada cerca de las principales vías de acceso como la Avenida 65, Avenida 1 de Mayo, lo que garantiza una excelente conectividad con diferentes zonas de la ciudad.\nEsta casa representa una oportunidad única para aquellos que buscan un espacio amplio, bien distribuido y con todas las comodidades necesarias para una vida confortable. ¡No dejes pasar esta oportunidad y ven a conocer tu futuro hogar hoy mismo!",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_02053497b8.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792500/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_5_45b36e984b.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_4_1_2021b60a71.jpg",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 800,
        "height": 1067
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_38_4_f370eb7724.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 800,
        "height": 1067
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_1_f86b876f50.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 800,
        "height": 1067
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_38_2_1_87affa4c3f.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      }
    ],
    "features": [
      {
        "label": "114 mt2",
        "icon": "ruler-combined",
        "filterValue": "114"
      },
      {
        "label": "4 Alcobas",
        "icon": "bed",
        "filterValue": "4"
      },
      {
        "label": "2 Baños",
        "icon": "bath",
        "filterValue": "2"
      },
      {
        "label": "1 Cocina",
        "icon": "kitchen-set",
        "filterValue": "1"
      },
      {
        "label": "1 Garage",
        "icon": "car",
        "filterValue": "1"
      },
      {
        "label": "1 Cuarto de Lavado",
        "icon": "shirt",
        "filterValue": "1"
      },
      {
        "label": "1 Sala / Comedor",
        "icon": "couch",
        "filterValue": "1"
      }
    ],
    "nearbyZones": [
      "Avenida 68",
      "AV 1 de Mayo",
      "Homecenter"
    ],
    "youtubeShortUrl": "https://www.youtube.com/shorts/2waRNYepL28",
    "internalCode": "VC_1002",
    "metaDescription": "Te presentamos una espectacular casa de 114 m², ideal para familias que buscan comodidad y estilo."
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
