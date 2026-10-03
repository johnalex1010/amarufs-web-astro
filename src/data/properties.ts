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
    "title": "Se arrienda Apartamento en Tocancipá - Álamo",
    "seoTitle": "Se arrienda Apartamento en Tocancipá - Álamo",
    "slug": "se-arrienda-apartamento-en-tocancipa-alamo",
    "editorialStatus": "publicado",
    "operation": "arriendo",
    "propertyType": "apartamento",
    "rentBaseValue": 1000000,
    "rentValue": 1000000,
    "administrationIncluded": true,
    "locationLabel": "Cundinamarca",
    "neighborhoodLabel": "Álamo",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.8865158169347!2d-73.93590052418632!3d4.958527839366802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4073ea6f8f6e33%3A0xa971107b85e05cb1!2sConjunto%20Residencial%20%C3%81LAMO%20-%20Los%20Maderos!5e0!3m2!1ses-419!2sco!4v1784933838097!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Ubicado en un conjunto residencial con Club House, este inmueble es ideal para familias, parejas y profesionales que buscan calidad de vida, seguridad y una excelente ubicación.\n\n      Características del apartamento:\n      3 habitaciones amplias y bien iluminadas.\n      2 baños modernos con divisiones en vidrio templado.\n      Cocina integral equipada con estufa.\n      Sala y comedor con excelente distribución y aprovechamiento del espacio.\n      Estudio abierto, ideal para home office, sala de lectura o zona de entretenimiento.\n      Vista exterior que proporciona mayor iluminación y ventilación natural.\n      Ubicado en quinto piso.\n\n      Zonas comunes del conjunto residencial:\n      Club House, piscina para adultos y niños, parque infantil y amplias zonas para el entretenimiento y la integración familiar.\n\n      Este apartamento ofrece equilibrio entre confort, funcionalidad y espacios recreativos. Contáctanos para conocerlo y recibir acompañamiento durante el proceso.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934133/IMG_20260711_075439_779_qaqlzg.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934134/IMG_20260711_075346_326_yfgxxg.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934134/IMG_20260711_075332_338_gy72ur.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934137/IMG_20260711_075353_540_mlxwx8.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934138/IMG_20260711_075359_438_ifjxsg.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934140/IMG_20260711_075417_238_tteuad.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934140/IMG_20260711_075411_913_hjpxdu.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1784934142/IMG_20260711_075425_639_ssi0r9.webp",
        "alt": "Se arrienda Apartamento en Tocancipá - Álamo",
        "width": 1500,
        "height": 1125
      }
    ],
    "features": [
      {
        "label": "3 Alcobas",
        "icon": "bed",
        "filterValue": "3"
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
        "label": "1 Sala / Comedor",
        "icon": "couch",
        "filterValue": "1"
      },
      {
        "label": "61 mts2 Área",
        "icon": "ruler-combined",
        "filterValue": "61 mts2"
      }
    ],
    "nearbyZones": [
      "Colegio",
      "Zona comercial",
      "Parque"
    ],
    "youtubeShortUrl": "https://youtube.com/shorts/IILsK0egibI?si=bWcxAr13TuLi07ES",
    "internalCode": "AA_1018",
    "metaDescription": "Apartamento en arriendo en Tocancipá con 3 habitaciones, 2 baños, Club House, piscina y zonas comunes."
  },
  {
    "title": "Arriendo apartamento en Puertas del Sol 2",
    "seoTitle": "Arriendo apartamento en Puertas del Sol 2",
    "slug": "arriendo-apartamento-puertas-del-sol-2-tocancipa",
    "editorialStatus": "publicado",
    "operation": "arriendo",
    "propertyType": "apartamento",
    "rentBaseValue": 1100000,
    "rentValue": 1100000,
    "administrationIncluded": true,
    "locationLabel": "Tocancipá",
    "neighborhoodLabel": "Puertas del Sol 2",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.880629339052!2d-73.93755642432345!3d4.959505739358203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e407366d72c4e99%3A0x7b38c5011a495bd7!2sPuerta%20del%20sol%202!5e0!3m2!1ses-419!2sco!4v1790995813559!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Apartamento en arriendo en Puertas del Sol 2, Tocancipá.\n\nEl inmueble cuenta con 3 alcobas, 2 baños, sala, comedor, cocina y 60 metros cuadrados. Está ubicado en piso 5, tiene vista interior y buena iluminación natural.\n\nEl edificio no cuenta con ascensor. El conjunto ofrece club house con piscina.\n\nEl canon es de $1.100.000 COP con administración incluida.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995586/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0009.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1280,
        "height": 960
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995587/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0010.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1280,
        "height": 960
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995587/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0011.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 960,
        "height": 1280
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995588/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0012.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 960,
        "height": 1280
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995589/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0015.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1280,
        "height": 960
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995589/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0036.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 960,
        "height": 1280
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995590/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0046.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1280,
        "height": 960
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995590/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260801-WA0047.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 960,
        "height": 1280
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995591/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260918-WA0003.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1790995592/AA_apto_tocancipa_puerta_del_sol_ii/IMG-20260918-WA0004.jpg",
        "alt": "Arriendo apartamento en Puertas del Sol 2",
        "width": 1200,
        "height": 1600
      }
    ],
    "features": [
      {
        "label": "3 Alcobas",
        "icon": "bed",
        "filterValue": "3"
      },
      {
        "label": "2 Baños",
        "icon": "bath",
        "filterValue": "2"
      },
      {
        "label": "1 Sala",
        "icon": "couch",
        "filterValue": "1"
      },
      {
        "label": "1 Comedor",
        "icon": "utensils",
        "filterValue": "1"
      },
      {
        "label": "1 Cocina",
        "icon": "kitchen-set",
        "filterValue": "1"
      },
      {
        "label": "60 m² Área",
        "icon": "ruler-combined",
        "filterValue": "60 m²"
      },
      {
        "label": "5 Piso",
        "icon": "stairs",
        "filterValue": "5"
      }
    ],
    "nearbyZones": [
      "Club house",
      "Piscina",
      "Tocancipá"
    ],
    "youtubeShortUrl": "https://youtube.com/shorts/2q_vht1TE-I?si=gul52rPsU8GgCmb7",
    "internalCode": "AA_1017",
    "metaDescription": "Apartamento en arriendo en Puertas del Sol 2, Tocancipá, con 3 alcobas, 2 baños y administración incluida."
  },
  {
    "title": "Venta Apartamento en USME",
    "seoTitle": "Venta Apartamento en USME",
    "slug": "venta-apartamento-en-usme",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "apartamento",
    "saleValue": 130000000,
    "administrationIncluded": false,
    "locationLabel": "Bogotá",
    "neighborhoodLabel": "Usme",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.7718182868355!2d-74.10134798005218!3d4.506532542714687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3fa39b6c603b0f%3A0x55dce858a7b4dcf5!2sReserva%20de%20San%20David!5e0!3m2!1ses-419!2sco!4v1722348931724!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Agradable apartamento de 42 m² perfectamente distribuido, ideal para parejas o pequeñas familias.\n\n      Cuenta con dos habitaciones, un baño completo, sala de estar, cocina equipada y área de lavado. Su diseño funcional ofrece comodidad y practicidad en cada espacio. Ubicado en segundo piso, con vista exterior y buena iluminación natural.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/2_1_andxxm.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/5_1_thtpsw.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/3_1_c78hek.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/7_q19zvi.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/1_1_yysser.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669180/8_gct8v8.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728669181/6_rsb2jc.webp",
        "alt": "Venta Apartamento en USME",
        "width": 1200,
        "height": 1600
      }
    ],
    "features": [
      {
        "label": "42,26 Área",
        "icon": "ruler-combined",
        "filterValue": "42,26"
      },
      {
        "label": "2 Alcobas",
        "icon": "bed",
        "filterValue": "2"
      },
      {
        "label": "1 Baño",
        "icon": "bath",
        "filterValue": "1"
      },
      {
        "label": "1 Cocina",
        "icon": "kitchen-set",
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
      "Calle 7c Este",
      "Parque barrio San Isidro"
    ],
    "internalCode": "VA_1007",
    "metaDescription": "Apartamento en venta en Usme de 42 m², con 2 habitaciones, baño, cocina y área de lavado."
  },
  {
    "title": "Venta casa en barrio Alcalá Sur",
    "seoTitle": "Venta casa en barrio Alcalá Sur",
    "slug": "venta-casa-en-barrio-alcala-sur",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "casa",
    "saleValue": 600000000,
    "administrationIncluded": false,
    "locationLabel": "Bogotá",
    "neighborhoodLabel": "Alcalá Sur",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.945365378692!2d-74.12701138823068!3d4.603806199421709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ecb79a5a91d%3A0xb5a3d8df0858c0de!2sCl.%2031%20Sur%20%2351d-82%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1716396783746!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Bienvenido a tu nuevo hogar. Casa de 114 m², ideal para familias que buscan comodidad y estilo.\n\n      La propiedad ofrece 4 habitaciones, 2 baños completos, sala de estar luminosa, cocina equipada y área de lavado. Cada espacio está distribuido para brindar funcionalidad y confort.\n\n      Está ubicada cerca de vías principales como Avenida 68 y Avenida 1 de Mayo, lo que facilita la conectividad con diferentes zonas de Bogotá.",
    "gallery": [
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
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_02053497b8.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_1_f86b876f50.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 800,
        "height": 1067
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_38_2_0618ddcf15.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792498/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_38_2_1_87affa4c3f.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1785792500/amarufs/inmuebles/Whats_App_Image_2024_05_22_at_09_03_37_5_45b36e984b.webp",
        "alt": "Venta casa en barrio Alcalá Sur",
        "width": 1400,
        "height": 1050
      }
    ],
    "features": [
      {
        "label": "114 mts2 Área",
        "icon": "ruler-combined",
        "filterValue": "114 mts2"
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
        "label": "1 Cuarto de Lavado",
        "icon": "shirt",
        "filterValue": "1"
      },
      {
        "label": "1 Garage",
        "icon": "car",
        "filterValue": "1"
      },
      {
        "label": "1 Terraza",
        "icon": "sun",
        "filterValue": "1"
      },
      {
        "label": "1 Depósito",
        "icon": "box",
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
    "metaDescription": "Casa en venta en Alcalá Sur de 114 m², con 4 alcobas, 2 baños, garaje, terraza y zona de lavado."
  },
  {
    "title": "Venta Lote en Mesitas del Colegio",
    "seoTitle": "Venta Lote en Mesitas del Colegio",
    "slug": "venta-lote-en-mesitas-del-colegio",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "lote",
    "saleValue": 80000000,
    "administrationIncluded": false,
    "locationLabel": "Cundinamarca",
    "neighborhoodLabel": "Mesitas del Colegio",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7954.174597937511!2d-74.4484349047342!3d4.578342126214528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f6d19af65c3af%3A0x42b29d5a047e0908!2sEl%20Colegio%2C%20Mesitas%20del%20Colegio%2C%20Cundinamarca!5e0!3m2!1ses-419!2sco!4v1728575422670!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Gran oportunidad de inversión en Mesitas del Colegio.\n\n      Lote en venta de 84 metros cuadrados, ideal para materializar un proyecto residencial o comercial en tierra caliente. Cuenta con 7 metros de frente por 12 metros de fondo y disponibilidad de conexión a agua, electricidad y gas.\n\n      El sector tiene fácil acceso a vías principales y ofrece una alternativa para inversionistas o familias que desean construir en un entorno tranquilo.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728574860/5_cqm3sa.webp",
        "alt": "Venta Lote en Mesitas del Colegio",
        "width": 1600,
        "height": 900
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728574860/3_ixbvv7.webp",
        "alt": "Venta Lote en Mesitas del Colegio",
        "width": 1280,
        "height": 720
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728574861/1_jnacdl.webp",
        "alt": "Venta Lote en Mesitas del Colegio",
        "width": 1600,
        "height": 900
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728574861/4_h0xpnw.webp",
        "alt": "Venta Lote en Mesitas del Colegio",
        "width": 1600,
        "height": 900
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1728574861/2_htkpo3.webp",
        "alt": "Venta Lote en Mesitas del Colegio",
        "width": 1280,
        "height": 720
      }
    ],
    "features": [
      {
        "label": "84 m² Área",
        "icon": "ruler-combined",
        "filterValue": "84 m²"
      }
    ],
    "nearbyZones": [
      "A dos cuadras del colegio principal"
    ],
    "internalCode": "VL_1010",
    "metaDescription": "Lote en venta de 84 m² en Mesitas del Colegio, ideal para proyecto residencial o comercial."
  },
  {
    "title": "Venta Apartamento en Villavicencio",
    "seoTitle": "Venta Apartamento en Villavicencio",
    "slug": "venta-apartamento-en-villavicencio",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "apartamento",
    "saleValue": 152000000,
    "administrationIncluded": false,
    "locationLabel": "Meta",
    "neighborhoodLabel": "Villavicencio",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5145.192613117317!2d-73.58999237400995!3d4.148726796193288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2c235f2d78a3%3A0x1b7337ddb544b76b!2sOkavango%20I!5e1!3m2!1ses-419!2sco!4v1743189954562!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Amplio apartamento con espacios bien distribuidos.\n\n      Cuenta con una construcción total de 63.22 m², de los cuales 57.64 m² corresponden a área privada. La diferencia corresponde a muros de fachada común, columnas estructurales y ductos compartidos.\n\n      Incluye sala comedor y cocina, tres alcobas, dos baños, balcón y parqueadero comunal exclusivo para vehículo. Es una alternativa funcional para quienes buscan un hogar práctico y confortable.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192145/4_cefbaw.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1500,
        "height": 1000
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192145/3_nunriq.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1500,
        "height": 1000
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192145/2_yavvji.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1500,
        "height": 1000
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192145/5_di3htp.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1500,
        "height": 1000
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192146/8_ew5zsv.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1728,
        "height": 2592
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192146/7_f6ztbz.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1728,
        "height": 2592
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192146/ZONA-DE-PARQUEADEROS_nbeptv.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 979,
        "height": 734
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192146/ZONA-INFANTIL_du75t2.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 768,
        "height": 1024
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192146/1_thack6.png",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1500,
        "height": 1000
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1743192147/6_copia_deu9td.jpg",
        "alt": "Venta Apartamento en Villavicencio",
        "width": 1728,
        "height": 2592
      }
    ],
    "features": [
      {
        "label": "63.22 Mts Área",
        "icon": "ruler-combined",
        "filterValue": "63.22 Mts"
      },
      {
        "label": "3 Alcobas",
        "icon": "bed",
        "filterValue": "3"
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
        "label": "1 Balcón",
        "icon": "building",
        "filterValue": "1"
      },
      {
        "label": "1 Sala comedor",
        "icon": "couch",
        "filterValue": "1"
      }
    ],
    "nearbyZones": [
      "Complejo Deportivo COVISAN",
      "Parque Okavango"
    ],
    "internalCode": "VA_1013",
    "metaDescription": "Apartamento en venta en Villavicencio con 3 alcobas, 2 baños, balcón y parqueadero comunal."
  },
  {
    "title": "Casa en venta en Barrio Villa de los Alpes",
    "seoTitle": "Casa en venta en Barrio Villa de los Alpes",
    "slug": "casa-en-venta-en-barrio-villa-de-los-alpes",
    "editorialStatus": "publicado",
    "operation": "venta",
    "propertyType": "casa",
    "saleValue": 370000000,
    "administrationIncluded": false,
    "locationLabel": "Bogotá D.C.",
    "neighborhoodLabel": "Villa de los Alpes",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1750794497912!5m2!1ses-419!2sco!6m8!1m7!1s0uamld_M2iAgmSH420l-ng!2m2!1d4.560744129413612!2d-74.09716409942078!3f327.3137977263657!4f-4.242127032191831!5f1.5718565585203557\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Oportunidad para adquirir una casa amplia y funcional en el sector de Villa de los Alpes.\n\n      Distribución por niveles:\n      Primer piso: sala acogedora, cuarto tipo san alejo debajo de las escaleras, baño social, comedor independiente y cocina de 3 x 3 m.\n      Segundo piso: 3 habitaciones bien distribuidas.\n      Tercer piso: 2 habitaciones adicionales y 1 baño completo.\n      Cuarto piso: terraza o solar, ideal para zona de ropas o futuras ampliaciones.\n\n      Área total: 3 x 12 m en cada nivel. Parqueadero comunal disponible. Una opción para familias numerosas o compradores que buscan una propiedad con potencial de inversión.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090249_580_kmnhdo.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090146_387_rlyovn.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090157_728_kad6l0.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090232_553_cxrdyi.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090304_098_u0pne8.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090357_203_vtkhwf.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090333_945_l9orss.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090406_666_nqavct.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090320_621_bive2v.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1750795795/IMG_20250621_090341_848_hw194e.webp",
        "alt": "Casa en venta en Barrio Villa de los Alpes",
        "width": 900,
        "height": 506
      }
    ],
    "features": [
      {
        "label": "3 x12 mts Área",
        "icon": "ruler-combined",
        "filterValue": "3 x12 mts"
      },
      {
        "label": "5 Alcobas",
        "icon": "bed",
        "filterValue": "5"
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
        "label": "1 Sala / Comedor",
        "icon": "couch",
        "filterValue": "1"
      },
      {
        "label": "1 Terraza",
        "icon": "sun",
        "filterValue": "1"
      }
    ],
    "nearbyZones": [
      "Iglesia 20 de Julio",
      "Portal 20 de Julio",
      "Polideportivo Villa de los Alpes",
      "Cerca parada alimentador"
    ],
    "internalCode": "VA_1016",
    "metaDescription": "Casa en venta en Villa de los Alpes con 5 alcobas, 2 baños, terraza y parqueadero comunal."
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
