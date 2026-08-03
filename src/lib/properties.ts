import { fallbackProperties, getVisibleProperties, type Property } from "../data/properties";

export async function getAllProperties(): Promise<Property[]> {
  return fallbackProperties;
}

export async function getPublishedProperties() {
  return getVisibleProperties(await getAllProperties());
}

export async function getPublishedPropertyBySlug(slug: string) {
  const properties = await getPublishedProperties();
  return properties.find((property) => property.slug === slug);
}
