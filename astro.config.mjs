import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.amarufs.co/",
  output: "static",
  integrations: [react()]
});
