export type EditorialStatus =
  | "borrador"
  | "en-validacion"
  | "publicado"
  | "reservado"
  | "vendido"
  | "arrendado"
  | "inactivo";

export type PropertyOperation = "arriendo" | "venta" | "venta-arriendo";

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
  publishedAt?: string;
  updatedAt?: string;
}

export const fallbackProperties: Property[] = [
  {
    "title": "Apartaestudio en venta o arriendo en North Point Lift, Usaquén",
    "seoTitle": "Apartaestudio en venta o arriendo en North Point Lift, Usaquén",
    "slug": "apartaestudio-venta-arriendo-north-point-lift-usaquen",
    "editorialStatus": "publicado",
    "operation": "venta-arriendo",
    "propertyType": "apartaestudio",
    "saleValue": 300000000,
    "rentBaseValue": 1900000,
    "rentValue": 1900000,
    "administrationIncluded": true,
    "locationLabel": "Bogotá D.C.",
    "neighborhoodLabel": "Usaquén",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2232009887225!2d-74.0226733!3d4.7312509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8f00098e343b%3A0xc8a5f10f427c246!2sNorth%20Point%20Lift!5e0!3m2!1ses-419!2sco!4v1794006858387!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Apartaestudio en venta o arriendo en el conjunto North Point Lift, barrio Usaquén, Bogotá.\n\nTiene 30 m², una habitación, sala comedor, cocina integral y un baño. Está en el segundo piso, con vista exterior y buena entrada de luz natural por el ventanal. El edificio cuenta con ascensor y parqueadero comunal asignado por sorteo. Es estrato 4.\n\nLos acabados incluyen piso tipo madera, mueble de TV, clósets, escritorio empotrado y mesón de cocina en granito.\n\nEstá ubicado cerca de la Carrera 7 y de la Notaría 33.\n\n- **Venta:** $300.000.000 COP, negociables.\n- **Arriendo:** $1.900.000 COP mensuales, con administración incluida.",
    "gallery": [
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007608/AAV_apto_bogota_nort_point/IMG_20261031_100913_493.jpg",
        "alt": "Vista desde la entrada del apartaestudio con cocina, sala y ventanal exterior",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007609/AAV_apto_bogota_nort_point/IMG_20261031_100919_128.jpg",
        "alt": "Cocina integral con mesón en granito y estufa eléctrica",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007610/AAV_apto_bogota_nort_point/IMG_20261031_100955_072.jpg",
        "alt": "Sala con mueble de TV y ventanal con vista exterior",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007611/AAV_apto_bogota_nort_point/IMG_20261031_100944_958.jpg",
        "alt": "Mueble de TV y clósets en la zona social",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007611/AAV_apto_bogota_nort_point/IMG_20261031_100939_087.jpg",
        "alt": "Habitación con puerta plegable y clóset",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007612/AAV_apto_bogota_nort_point/IMG_20261031_101001_440.jpg",
        "alt": "Clóset y puerta plegable de la habitación",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007613/AAV_apto_bogota_nort_point/IMG_20261031_101003_521.jpg",
        "alt": "Zona social con mueble de TV y acceso a la habitación",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007614/AAV_apto_bogota_nort_point/IMG_20261031_100934_873.jpg",
        "alt": "Escritorio empotrado en madera",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007615/AAV_apto_bogota_nort_point/IMG_20261031_100926_347.jpg",
        "alt": "Baño con sanitario, lavamanos y espejo",
        "width": 2976,
        "height": 3968
      },
      {
        "src": "https://res.cloudinary.com/domose0dj/image/upload/v1794007616/AAV_apto_bogota_nort_point/IMG_20261031_101012_718.jpg",
        "alt": "Vista interior hacia la puerta de entrada del apartaestudio",
        "width": 2976,
        "height": 3968
      }
    ],
    "features": [
      {
        "label": "1 Habitación",
        "icon": "bed",
        "filterValue": "1"
      },
      {
        "label": "1 Sala comedor",
        "icon": "couch",
        "filterValue": "1"
      },
      {
        "label": "1 Cocina",
        "icon": "kitchen-set",
        "filterValue": "1"
      },
      {
        "label": "1 Baño",
        "icon": "bath",
        "filterValue": "1"
      },
      {
        "label": "30 m² Área",
        "icon": "ruler-combined",
        "filterValue": "30 m²"
      },
      {
        "label": "2 Piso",
        "icon": "stairs",
        "filterValue": "2"
      },
      {
        "label": "4 Estrato",
        "icon": "layer-group",
        "filterValue": "4"
      },
      {
        "label": "Sí Ascensor",
        "icon": "elevator",
        "filterValue": "Sí"
      },
      {
        "label": "Exterior Vista",
        "icon": "eye",
        "filterValue": "Exterior"
      },
      {
        "label": "Comunal por sorteo Parqueadero",
        "icon": "square-parking",
        "filterValue": "Comunal por sorteo"
      }
    ],
    "nearbyZones": [
      "Usaquén",
      "Carrera 7",
      "Notaría 33"
    ],
    "youtubeShortUrl": "https://youtube.com/shorts/TlZAvz_b-YQ",
    "internalCode": "VAA_1019",
    "metaDescription": "Apartaestudio de 30 m² en North Point Lift, Usaquén. Venta $300.000.000 negociables o arriendo $1.900.000 con administración incluida.",
    "publishedAt": "2026-11-06T23:26:59.118Z",
    "updatedAt": "2026-11-06T23:26:59.118Z"
  },
  {
    "title": "Arriendo apartamento en Puertas del Sol 2",
    "seoTitle": "Arriendo apartamento en Puertas del Sol 2",
    "slug": "arriendo-apartamento-puertas-del-sol-2-tocancipa",
    "editorialStatus": "publicado",
    "operation": "arriendo",
    "propertyType": "apartamento",
    "rentBaseValue": 1000000,
    "rentValue": 1000000,
    "administrationIncluded": true,
    "locationLabel": "Tocancipá",
    "neighborhoodLabel": "Puertas del Sol 2",
    "googleMapsEmbed": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.880629339052!2d-73.93755642432345!3d4.959505739358203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e407366d72c4e99%3A0x7b38c5011a495bd7!2sPuerta%20del%20sol%202!5e0!3m2!1ses-419!2sco!4v1790995813559!5m2!1ses-419!2sco\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>",
    "description": "Apartamento en arriendo en el conjunto Puertas del Sol 2, en Tocancipá (Cundinamarca), con 60 m², 3 alcobas y 2 baños. El canon es de $1.000.000 COP mensuales con administración incluida.\n\n**Distribución y espacios**\n\n- 3 alcobas.\n- 2 baños.\n- Sala y comedor.\n- Cocina.\n- Área de 60 m².\n- Ubicado en el piso 6, con vista exterior y buena iluminación natural.\n\n**Conjunto residencial**\n\n- Club house con piscina.\n- El edificio no cuenta con ascensor: el acceso al piso 6 es por escaleras.\n\n**Ideal para**\n\nFamilias, parejas o profesionales que buscan vivir en Tocancipá con un canon fijo que ya incluye la administración.\n\nPara conocer los requisitos o agendar una visita, escríbenos por WhatsApp con el código AA_1017.",
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
        "label": "6 Piso",
        "icon": "stairs",
        "filterValue": "6"
      }
    ],
    "nearbyZones": [
      "Club house",
      "Piscina",
      "Tocancipá"
    ],
    "youtubeShortUrl": "https://youtube.com/shorts/2q_vht1TE-I?si=gul52rPsU8GgCmb7",
    "internalCode": "AA_1017",
    "metaDescription": "Apartamento en arriendo en Puertas del Sol 2, Tocancipá, con 3 alcobas, 2 baños y administración incluida.",
    "publishedAt": "2026-11-05T22:40:16.814Z",
    "updatedAt": "2026-11-05T22:40:16.764Z"
  },
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
    "description": "Apartamento en arriendo en el Conjunto Residencial Álamo (Los Maderos), en Tocancipá (Cundinamarca), con 61 m², 3 habitaciones, 2 baños y estudio abierto. El conjunto cuenta con club house, piscina para adultos y niños y parque infantil.\n\n**Distribución y espacios**\n\n- 3 habitaciones amplias y bien iluminadas.\n- 2 baños con divisiones en vidrio templado.\n- Cocina integral equipada con estufa.\n- Sala y comedor.\n- Estudio abierto, útil como espacio de trabajo en casa, sala de lectura o zona de entretenimiento.\n- Ubicado en el quinto piso, con vista exterior que aporta iluminación y ventilación natural.\n- Área de 61 m².\n\n**Zonas comunes del conjunto**\n\n- Club house.\n- Piscina para adultos y niños.\n- Parque infantil.\n- Zonas de entretenimiento e integración familiar.\n\n**Entorno**\n\nCerca de colegio, zona comercial y parque.\n\n**Ideal para**\n\nFamilias, parejas y profesionales que trabajan desde casa y quieren un conjunto con zonas recreativas en Tocancipá.\n\nPara conocer los requisitos o agendar una visita, escríbenos por WhatsApp con el código AA_1018.",
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
    "metaDescription": "Apartamento en arriendo en Tocancipá con 3 habitaciones, 2 baños, Club House, piscina y zonas comunes.",
    "publishedAt": "2026-10-03T02:28:09.250Z",
    "updatedAt": "2026-11-05T22:30:12.360Z"
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
    "description": "Casa en venta en el barrio Alcalá Sur, Bogotá, con 114 m², 4 habitaciones, 2 baños completos, garaje, terraza y depósito. Está cerca de la Avenida 68 y la Avenida Primero de Mayo.\n\n**Distribución y espacios**\n\n- 4 habitaciones.\n- 2 baños completos.\n- Sala y comedor.\n- Cocina equipada.\n- Cuarto de lavado.\n- Garaje.\n- Terraza.\n- Depósito.\n- Área de 114 m².\n\n**Ubicación y conectividad**\n\n- Cerca de la Avenida 68 y la Avenida Primero de Mayo, vías que conectan con diferentes zonas de Bogotá.\n- Cerca de Homecenter.\n\n**Ideal para**\n\nFamilias que necesitan 4 habitaciones, parqueadero propio y espacios adicionales como terraza y depósito en una zona bien conectada del sur de Bogotá.\n\nPara agendar una visita o resolver dudas sobre el proceso de compra, escríbenos por WhatsApp con el código VC_1002.",
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
    "metaDescription": "Casa en venta en Alcalá Sur de 114 m², con 4 alcobas, 2 baños, garaje, terraza y zona de lavado.",
    "publishedAt": "2026-10-03T02:17:49.625Z",
    "updatedAt": "2026-11-05T22:30:10.360Z"
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
    "description": "Lote en venta en Mesitas del Colegio (Cundinamarca), de 84 m², con 7 metros de frente por 12 metros de fondo y disponibilidad de conexión a agua, energía eléctrica y gas. Está a dos cuadras del colegio principal del municipio.\n\n**Características del lote**\n\n- Área de 84 m².\n- Medidas: 7 m de frente por 12 m de fondo.\n- Disponibilidad de conexión a agua, energía eléctrica y gas.\n- Clima cálido.\n\n**Ubicación**\n\n- A dos cuadras del colegio principal.\n- Fácil acceso a vías principales.\n- Sector tranquilo.\n\n**Usos posibles**\n\nPuede proyectarse para vivienda o comercio, según la norma de uso del suelo vigente en Mesitas del Colegio, que debe validarse antes de construir.\n\n**Ideal para**\n\nInversionistas o familias que quieren construir en tierra caliente cerca de Bogotá.\n\nPara conocer la documentación del lote o agendar una visita, escríbenos por WhatsApp con el código VL_1010.",
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
    "metaDescription": "Lote en venta de 84 m² en Mesitas del Colegio, ideal para proyecto residencial o comercial.",
    "publishedAt": "2026-10-03T02:17:49.623Z",
    "updatedAt": "2026-11-05T22:30:09.360Z"
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
    "description": "Apartamento en venta en Villavicencio (Meta), con 63,22 m² construidos (57,64 m² de área privada), 3 alcobas, 2 baños, balcón y parqueadero comunal exclusivo para un vehículo. Está cerca del Complejo Deportivo Covisan y del Parque Okavango.\n\n**Distribución y espacios**\n\n- 3 alcobas.\n- 2 baños.\n- Sala comedor.\n- Cocina.\n- Balcón.\n- Parqueadero comunal exclusivo para un vehículo.\n\n**Área**\n\n- Área construida: 63,22 m².\n- Área privada: 57,64 m².\n- La diferencia corresponde a muros de fachada común, columnas estructurales y ductos compartidos.\n\n**Entorno**\n\n- Cerca del Complejo Deportivo Covisan.\n- Cerca del Parque Okavango.\n\n**Ideal para**\n\nFamilias que buscan 3 alcobas y parqueadero en Villavicencio, para vivir o como inversión.\n\nPara agendar una visita o resolver dudas sobre el proceso de compra, escríbenos por WhatsApp con el código VA_1013.",
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
    "metaDescription": "Apartamento en venta en Villavicencio con 3 alcobas, 2 baños, balcón y parqueadero comunal.",
    "publishedAt": "2026-10-03T02:17:49.622Z",
    "updatedAt": "2026-11-05T22:30:08.360Z"
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
    "description": "Casa en venta en el barrio Villa de los Alpes, Bogotá, de cuatro niveles, con 5 habitaciones, 2 baños y terraza. Cada nivel mide 3 × 12 m (36 m²) y está cerca del Portal 20 de Julio.\n\n**Distribución por niveles**\n\n- Primer piso: sala, cuarto útil debajo de las escaleras, baño social, comedor independiente y cocina de 3 × 3 m.\n- Segundo piso: 3 habitaciones.\n- Tercer piso: 2 habitaciones y 1 baño completo.\n- Cuarto piso: terraza o solar, apta para zona de ropas o para una futura ampliación.\n\n**Datos clave**\n\n- 5 habitaciones y 2 baños.\n- Medidas por nivel: 3 × 12 m (36 m²).\n- Parqueadero comunal disponible.\n\n**Entorno y transporte**\n\n- Cerca del Portal 20 de Julio y de una parada de alimentador.\n- Cerca de la Iglesia del 20 de Julio.\n- Cerca del Polideportivo Villa de los Alpes.\n\n**Ideal para**\n\nFamilias numerosas o compradores que buscan una casa con potencial de ampliación en el suroriente de Bogotá.\n\nPara agendar una visita o resolver dudas sobre el proceso de compra, escríbenos por WhatsApp con el código VA_1016.",
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
    "metaDescription": "Casa en venta en Villa de los Alpes con 5 alcobas, 2 baños, terraza y parqueadero comunal.",
    "publishedAt": "2026-10-03T02:17:49.621Z",
    "updatedAt": "2026-11-05T22:30:07.360Z"
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
