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
    "saleValue": 440000000,
    "administrationIncluded": false,
    "locationLabel": "Bogotá",
    "neighborhoodLabel": "Alcalá Sur",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7951.569166887274!2d-74.039315!3d4.807011!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f862231b14d9b%3A0x2466a128ff31f688!2sBima!5e0!3m2!1ses-419!2sco!4v1785790408509!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
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
        "label": "1 Baños",
        "icon": "fa-solid fa-bath",
        "filterValue": "1"
      },
      {
        "label": "2 Alcobas",
        "icon": "fa-solid fa-bed",
        "filterValue": "2"
      },
      {
        "label": "1 Baños",
        "icon": "fa-solid fa-bath",
        "filterValue": "1"
      }
    ],
    "nearbyZones": [
      "Zona comercial",
      "Parque"
    ],
    "youtubeShortUrl": "https://www.youtube.com/shorts/2waRNYepL28",
    "internalCode": "123wwefsdf",
    "metaDescription": "Te presentamos una espectacular casa de 114 m², ideal para familias que buscan comodidad y estilo."
  },
  {
    "title": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
    "seoTitle": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
    "slug": "se-arrienda-apartamento-en-bogota-conjunto-el-roble",
    "editorialStatus": "publicado",
    "operation": "arriendo",
    "propertyType": "apartamento",
    "rentBaseValue": 1000000,
    "rentValue": 1000000,
    "administrationIncluded": true,
    "locationLabel": "zipaquira",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7951.569166887274!2d-74.039315!3d4.807011!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f862231b14d9b%3A0x2466a128ff31f688!2sBima!5e0!3m2!1ses-419!2sco!4v1785790408509!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Buscas un apartamento en arriendo en Bogotá?\n\nTe presentamos este apartamento ubicado en el conjunto residencial El Roble, una excelente opción para parejas, familias pequeñas o personas que buscan comodidad, iluminación natural y una ubicación estratégica.\n\nCaracterísticas del inmueble:\n\n🛏️ 2 alcobas con clóset\n🛁 1 baño\n🛋️ Sala – comedor\n🍽️ Cocina\n📐 40 m²\n🏢 Piso 10\n🌇 Vista interior\n☀️ Excelente iluminación natural\nCanon de arrendamiento:\n💰 $1.500.000 COP\n✅ Administración incluida.\n\n📲 Más información y agenda tu visita por WhatsApp:\n315 877 4545",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021305/IMG_20260711_135312_681_t2tu0r.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021305/IMG_20260711_135257_895_eqvoqy.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021305/IMG_20260711_135240_397_zrojcy.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021305/IMG_20260711_135253_041_szuqem.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021304/IMG_20260711_135332_287_zqkrwn.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785021304/IMG_20260711_135303_375_m2vyau.webp",
        "alt": "Se arrienda Apartamento en Bogotá – Conjunto El Roble",
        "width": 1500,
        "height": 1125
      }
    ],
    "features": [
      {
        "label": "2 Alcobas",
        "icon": "fa-solid fa-bed",
        "filterValue": "2"
      },
      {
        "label": "1 Baños",
        "icon": "fa-solid fa-bath",
        "filterValue": "1"
      },
      {
        "label": "1 Sala / comedor",
        "icon": "fa-solid fa-couch",
        "filterValue": "1"
      },
      {
        "label": "48 m² Área",
        "icon": "fa-solid fa-ruler-combined",
        "filterValue": "48 m²"
      }
    ],
    "nearbyZones": [
      "Zona comercial",
      "Parque",
      "Autopista Norte",
      "Centro Comercial Bima"
    ],
    "youtubeShortUrl": "https://www.youtube.com/shorts/2waRNYepL28",
    "internalCode": "123wwefsdf2",
    "metaDescription": "Te presentamos este apartamento ubicado en el conjunto residencial El Roble, una excelente opción para parejas, familias pequeñas o personas que buscan comodidad"
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
