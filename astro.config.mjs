import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";

const sanityProjectId = process.env.SANITY_PROJECT_ID ?? "3yxhmalj";
const sanityDataset = process.env.SANITY_DATASET ?? "production";
const sanityApiVersion = process.env.SANITY_API_VERSION ?? "2026-08-01";

export default defineConfig({
  site: "https://www.amarufs.co/",
  output: "static",
  integrations: [
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      studioBasePath: "/studio"
    }),
    react()
  ]
});
