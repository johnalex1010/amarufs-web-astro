/**
 * Pre-genera en Cloudinary las variantes de imagen que usa el sitio construido.
 *
 * Cloudinary crea cada transformación (recorte, ancho, formato) la primera vez que
 * alguien la pide, lo que tarda 1-2 s por foto. Este script recorre `dist/`, toma
 * todas las URLs de res.cloudinary.com y las solicita una vez como Chrome, Safari y
 * Firefox (f_auto elige el formato según el navegador) para que los visitantes reciban
 * versiones ya generadas y cacheadas en la CDN.
 *
 * Uso: npm run build && npm run images:warm
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
// f_auto decide el formato (AVIF, WebP o JPEG) según el navegador que pide la imagen.
const browserProfiles = [
  {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
  },
  {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    accept: "image/webp,image/avif,image/jxl,image/heic,image/heic-sequence,video/*;q=0.8,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5"
  },
  {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0",
    accept: "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5"
  }
];
const concurrency = 6;

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(fullPath);
      return entry.name.endsWith(".html") ? [fullPath] : [];
    })
  );

  return files.flat();
}

function extractCloudinaryUrls(html) {
  // Las transformaciones llevan comas; en srcset los candidatos se separan con ", ".
  const matches = html.match(/https:\/\/res\.cloudinary\.com\/[^\s"'<>)]+/g) || [];
  return matches.map((url) => url.replace(/&amp;/g, "&").replace(/,+$/, ""));
}

async function warm(url) {
  const results = [];

  for (const profile of browserProfiles) {
    const started = Date.now();
    try {
      const response = await fetch(url, { headers: { Accept: profile.accept, "User-Agent": profile.userAgent } });
      await response.arrayBuffer();
      results.push({ ok: response.ok, ms: Date.now() - started });
    } catch {
      results.push({ ok: false, ms: Date.now() - started });
    }
  }

  return results;
}

let htmlFiles;

try {
  htmlFiles = await listHtmlFiles(distDir);
} catch {
  console.error("No existe dist/. Ejecuta primero: npm run build");
  process.exit(1);
}

const urls = new Set();

for (const file of htmlFiles) {
  extractCloudinaryUrls(await readFile(file, "utf8")).forEach((url) => urls.add(url));
}

const queue = [...urls];
let done = 0;
let failed = 0;

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const results = await warm(url);
    done += 1;

    if (results.some((result) => !result.ok)) {
      failed += 1;
      console.warn(`Falló: ${url}`);
    }
  }
}

console.info(`Variantes de Cloudinary encontradas en dist/: ${urls.size}`);
await Promise.all(Array.from({ length: concurrency }, worker));
console.info(`Variantes listas: ${done - failed}. Con error: ${failed}.`);
