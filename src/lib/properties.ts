import { sanityClient } from "sanity:client";
import { fallbackProperties, getVisibleProperties, type Property } from "../data/properties";

type SanityProperty = Omit<Property, "gallery" | "slug"> & {
  slug?: { current?: string };
  gallery?: Array<CloudinaryAsset | {
    alt?: string;
    asset?: CloudinaryAsset;
  }>;
};

type CloudinaryAsset = {
  secure_url?: string;
  url?: string;
  width?: number;
  height?: number;
  context?: {
    custom?: {
      alt?: string;
      caption?: string;
    };
  };
};

const propertyQuery = `*[_type == "property"]{
  title,
  seoTitle,
  slug,
  editorialStatus,
  operation,
  propertyType,
  saleValue,
  rentValue,
  locationLabel,
  googleMapsEmbed,
  description,
  summary,
  gallery[],
  features[]{
    label,
    icon,
    filterValue
  },
  nearbyZones,
  youtubeShortUrl,
  internalCode,
  metaDescription
}`;

function normalizeSanityProperty(property: SanityProperty): Property {
  return {
    ...property,
    slug: property.slug?.current ?? "",
    gallery:
      property.gallery
        ?.map((photo) => {
          const asset = "asset" in photo ? photo.asset : photo;
          return {
            src: asset?.secure_url ?? asset?.url ?? "",
            alt: ("alt" in photo ? photo.alt : undefined) ?? asset?.context?.custom?.alt ?? property.title,
            width: asset?.width,
            height: asset?.height
          };
        })
        .filter((photo) => Boolean(photo.src)) ?? [],
    features: property.features ?? [],
    nearbyZones: property.nearbyZones ?? []
  };
}

export async function getAllProperties(): Promise<Property[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const sanityProperties = await sanityClient.fetch<SanityProperty[]>(propertyQuery, {}, { signal: controller.signal });
    const normalizedProperties = sanityProperties.map(normalizeSanityProperty);
    return normalizedProperties.length ? normalizedProperties : fallbackProperties;
  } catch (error) {
    console.warn("No fue posible consultar inmuebles desde Sanity. Se usará el plan B local.", error);
    return fallbackProperties;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getPublishedProperties() {
  const allProperties = await getAllProperties();
  const visibleProperties = getVisibleProperties(allProperties);

  if (process.env.DEBUG_SANITY_PROPERTIES === "1") {
    console.info(
      `Sanity inmuebles: recibidos=${allProperties.length}, visibles=${visibleProperties.length}, slugs=${visibleProperties
        .map((property) => property.slug)
        .join(", ")}`
    );
  }

  return visibleProperties;
}

export async function getPublishedPropertyBySlug(slug: string) {
  const properties = await getPublishedProperties();
  return properties.find((property) => property.slug === slug);
}
