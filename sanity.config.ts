import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID ?? "3yxhmalj";
const dataset = process.env.SANITY_DATASET ?? "production";

export default defineConfig({
  name: "amarufs",
  title: "Amaru FS Inmobiliaria",
  projectId,
  dataset,
  plugins: [structureTool(), cloudinarySchemaPlugin()],
  schema: {
    types: schemaTypes
  }
});
