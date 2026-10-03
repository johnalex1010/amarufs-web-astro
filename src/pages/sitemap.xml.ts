import { site } from "../data/site";
import { getPublishedProperties } from "../lib/properties";
import { getPropertyHref } from "../lib/property-utils";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/propietarios/", priority: "0.8", changefreq: "monthly" },
  { path: "/propietarios/venta/", priority: "0.8", changefreq: "monthly" },
  { path: "/propietarios/arriendo/", priority: "0.8", changefreq: "monthly" },
  { path: "/arrendatarios/", priority: "0.8", changefreq: "monthly" },
  { path: "/inmuebles/", priority: "0.9", changefreq: "daily" }
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
  const urls = [
    ...staticPages,
    ...properties.map((property) => ({
      path: getPropertyHref(property),
      priority: "0.7",
      changefreq: "weekly"
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(absoluteUrl(url.path))}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
