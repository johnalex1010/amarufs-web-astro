import { site } from "../data/site";
import { getPublishedProperties } from "../lib/properties";
import { getPropertyHref } from "../lib/property-utils";

const staticPages = [
  { path: "/" },
  { path: "/propietarios/" },
  { path: "/propietarios/venta/" },
  { path: "/propietarios/arriendo/" },
  { path: "/arrendatarios/" },
  { path: "/inmuebles/" }
];

function absoluteUrl(path: string) {
  return new URL(path, site.baseUrl).toString();
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const properties = await getPublishedProperties();
  const propertyDates = properties
    .map((property) => property.updatedAt)
    .filter((value): value is string => Boolean(value))
    .sort();
  const latestPropertyUpdate = propertyDates.at(-1);
  const urls: { path: string; lastmod?: string }[] = [
    ...staticPages.map((page) => ({
      ...page,
      // El listado cambia cuando cambia cualquier inmueble publicado.
      lastmod: page.path === "/inmuebles/" ? latestPropertyUpdate : undefined
    })),
    ...properties.map((property) => ({
      path: getPropertyHref(property),
      lastmod: property.updatedAt
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(absoluteUrl(url.path))}</loc>${url.lastmod ? `
    <lastmod>${escapeXml(url.lastmod)}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
